import { uid } from 'rand-token';

interface Handler {
    [key: string]: (args: any) => void;
}

export class WorkerSocket {
    worker: Worker
    id: string;
    handlers: Handler

    constructor(worker: Worker) {
        this.worker = worker;
        this.id = uid(64);

        this.worker.onmessage = (e) => {
            if (e.data.id !== this.id) {
                return;
            }

            if (e.data.type === 'data') {
                this.dispatchEvent('message', e.data);
            } else if (e.data.type === 'disconnect') {
                this.dispatchEvent('close');
            }
        };

        this.handlers = {};

        setTimeout(() => {
            this.worker.postMessage({ id: this.id, type: 'connect' });
            this.dispatchEvent('open');
        }, 1);
    }

    send(data: any) {
        this.worker.postMessage({
            id: this.id,
            type: 'data',
            data
        });
    }

    dispatchEvent(name: string | number, args?: any) {
        const cb = this.handlers[name];

        if (cb) {
            cb(args);
        }
    }

    addEventListener(name: string | number, cb: (args: any) => void) {
        this.handlers[name] = cb;
    }

    close() {
        postMessage({
            id: this.id,
            type: 'disconnect'
        });

        this.dispatchEvent('close');
    }
}
