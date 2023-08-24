
/**
 * Handles reading the .jag and .mem files located in /data204
 */
export class FileDownloadStream {

    url: string
    xhr: XMLHttpRequest = new XMLHttpRequest()
    buffer: Int8Array | null = null;
    pos = 0;

    constructor(file: File) {
        this.url = file.toString();
        this.xhr.responseType = 'arraybuffer';
        this.xhr.open('GET', this.url, true);
    }

    /**
    * Loads the resource bytes using an XMLHttpRequest.
    *
    * @private
    * @returns {Promise<Int8Array>} A Promise that resolves to an Int8Array containing the downloaded bytes.
    * @throws {Error} If the download fails or the response status code is not in the 2xx range.
    */
    private loadResBytes(): Promise<Int8Array> {
        return new Promise((resolve, reject) => {
            this.xhr.onerror = e => reject(e);

            this.xhr.onload = () => {
                if (!/^2/.test(String(this.xhr.status))) {
                    reject(new Error(`unable to download ${this.url}.
                        status code = ${this.xhr.status}`));
                } else {
                    resolve(new Int8Array(this.xhr.response));
                }
            };

            this.xhr.send();
        });
    }

    /**
     * Reads data from a file into the provided destination Int8Array.
     * @param dest - Destination Buffer.
     * @param off - Offset indicating where to start writing in the buffer.
     * @param len - Number of bytes to read. Defaults to the length of dest.
     */
    async readFully(dest: Int8Array, off = 0, len: number = dest.length) {
        if (!this.buffer) {
            this.buffer = await this.loadResBytes();
        }

        dest.set(this.buffer.slice(this.pos, this.pos + len), off);
        this.pos += len;
    }
}

