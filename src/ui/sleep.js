const clientOpcodes = require('../opcodes/client');
import { COLOURS } from './colours'; 


function drawSleep() {
    this.surface.fadeToBlack();

    if (Math.random() <= 0.15) {
        this.surface.drawStringCenter(
            'ZZZ',
            (Math.random() * 80) | 0,
            (Math.random() * this.gameHeight) | 0,
            5,
            (Math.random() * COLOURS.WHITE) | 0
        );
    }

    if (Math.random() <= 0.15) {
        this.surface.drawStringCenter(
            'ZZZ',
            this.gameWidth - ((Math.random() * 80) | 0),
            (Math.random() * this.gameHeight) | 0,
            5,
            (Math.random() * COLOURS.WHITE) | 0
        );
    }

    this.surface.drawBox(
        ((this.gameWidth / 2) | 0) - 100,
        160,
        200,
        40,
        COLOURS.BLACK
    );

    this.surface.drawStringCenter(
        'You are sleeping',
        (this.gameWidth / 2) | 0,
        50,
        7,
        COLOURS.YELLOW
    );

    this.surface.drawStringCenter(
        `Fatigue: ${((this.fatigueSleeping * 100) / 750) | 0}%`,
        (this.gameWidth / 2) | 0,
        90,
        7,
        COLOURS.YELLOW
    );

    this.surface.drawStringCenter(
        'When you want to wake up just use your',
        (this.gameWidth / 2) | 0,
        140,
        5,
        COLOURS.WHITE
    );

    this.surface.drawStringCenter(
        'keyboard to type the word in the box below',
        (this.gameWidth / 2) | 0,
        160,
        5,
        COLOURS.WHITE
    );

    this.surface.drawStringCenter(
        this.inputTextCurrent + '*',
        (this.gameWidth / 2) | 0,
        180,
        5,
        COLOURS.CYAN
    );

    if (this.sleepingStatusText === null) {
        this.surface._drawSprite_from3(
            ((this.gameWidth / 2) | 0) - 127,
            230,
            this.spriteTexture + 1
        );
    } else {
        this.surface.drawStringCenter(
            this.sleepingStatusText,
            (this.gameWidth / 2) | 0,
            260,
            5,
            COLOURS.RED
        );
    }

    this.surface.drawBoxEdge(
        ((this.gameWidth / 2) | 0) - 128,
        229,
        257,
        42,
        COLOURS.WHITE
    );

    this.drawChatMessageTabs();

    this.surface.drawStringCenter(
        "If you can't read the word",
        (this.gameWidth / 2) | 0,
        290,
        1,
        COLOURS.WHITE
    );

    this.surface.drawStringCenter(
        `@yel@${
            this.options.mobile ? 'tap' : 'click'
        } here@whi@ to get a different one`,
        (this.gameWidth / 2) | 0,
        305,
        1,
        COLOURS.WHITE
    );

    this.surface.draw(this.graphics, 0, 0);
}

function handleSleepInput() {
    if (this.inputTextFinal.length > 0) {
        if (/^::lostcon$/i.test(this.inputTextFinal)) {
            this.packetStream.closeStream();
        } else if (/^::closecon$/.test(this.inputTextFinal)) {
            this.closeConnection();
        } else {
            this.packetStream.newPacket(clientOpcodes.SLEEP_WORD);
            this.packetStream.putString(this.inputTextFinal);

            if (!this.sleepWordDelay) {
                this.packetStream.putByte(0);
                this.sleepWordDelay = true;
            }

            this.packetStream.sendPacket();

            this.inputTextCurrent = '';
            this.inputTextFinal = '';
            this.sleepingStatusText = 'Please wait...';
        }
    }

    if (
        this.lastMouseButtonDown === 1 &&
        this.mouseY > 275 &&
        this.mouseY < 310 &&
        this.mouseX > 56 &&
        this.mouseX < 456
    ) {
        this.packetStream.newPacket(clientOpcodes.SLEEP_WORD);
        this.packetStream.putString('-null-');

        if (!this.sleepWordDelay) {
            this.packetStream.putByte(0);
            this.sleepWordDelay = true;
        }

        this.packetStream.sendPacket();

        this.inputTextCurrent = '';
        this.inputTextFinal = '';
        this.sleepingStatusText = 'Please wait...';
    }

    this.lastMouseButtonDown = 0;
}

module.exports = {
    drawSleep,
    handleSleepInput,
    isSleeping: false
};
