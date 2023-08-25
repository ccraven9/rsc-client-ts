import { COLOURS } from './colours'; 


const WIDTH = 400;

function drawDialogServerMessage() {
    let height = 100;

    if (this.serverMessageBoxTop) {
        height = 450;
        height = 300;
    }

    this.surface.drawBox(
        256 - ((WIDTH / 2) | 0),
        167 - ((height / 2) | 0),
        WIDTH,
        height,
        COLOURS.BLACK
    );

    this.surface.drawBoxEdge(
        256 - ((WIDTH / 2) | 0),
        167 - ((height / 2) | 0),
        WIDTH,
        height,
        COLOURS.WHITE
    );

    this.surface.drawParagraph(
        this.serverMessage,
        256,
        167 - ((height / 2) | 0) + 20,
        1,
        COLOURS.WHITE,
        WIDTH - 40
    );

    const offsetY = 157 + ((height / 2) | 0);
    let textColour = COLOURS.WHITE;

    if (
        this.mouseY > offsetY - 12 &&
        this.mouseY <= offsetY &&
        this.mouseX > 106 &&
        this.mouseX < 406
    ) {
        textColour = COLOURS.RED;
    }

    this.surface.drawStringCenter(
        'Click here to close window',
        256,
        offsetY,
        1,
        textColour
    );

    if (this.mouseButtonClick === 1) {
        if (textColour === COLOURS.RED) {
            this.showDialogServerMessage = false;
        }

        if (
            (this.mouseX < 256 - ((WIDTH / 2) | 0) ||
                this.mouseX > 256 + ((WIDTH / 2) | 0)) &&
            (this.mouseY < 167 - ((height / 2) | 0) ||
                this.mouseY > 167 + ((height / 2) | 0))
        ) {
            this.showDialogServerMessage = false;
        }
    }

    this.mouseButtonClick = 0;
}

module.exports = {
    serverMessageBoxTop: false,
    drawDialogServerMessage
};
