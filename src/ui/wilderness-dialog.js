import { COLOURS } from './colours';

function drawDialogWildWarn() {
    let y = 97;

    this.surface.drawBox(86, 77, 340, 180, COLOURS.BLACK);
    this.surface.drawBoxEdge(86, 77, 340, 180, COLOURS.WHITE);

    this.surface.drawStringCenter(
        'Warning! Proceed with caution',
        256,
        y,
        4,
        COLOURS.RED
    );

    y += 26;

    this.surface.drawStringCenter(
        'If you go much further north you will ' + 'enter the',
        256,
        y,
        1,
        COLOURS.WHITE
    );

    y += 13;

    this.surface.drawStringCenter(
        'wilderness. This a very dangerous area where',
        256,
        y,
        1,
        COLOURS.WHITE
    );

    y += 13;

    this.surface.drawStringCenter(
        'other players can attack you!',
        256,
        y,
        1,
        COLOURS.WHITE
    );

    y += 22;

    this.surface.drawStringCenter(
        'The further north you go the more dangerous it',
        256,
        y,
        1,
        COLOURS.WHITE
    );

    y += 13;

    this.surface.drawStringCenter(
        'becomes, but the more treasure you will find.',
        256,
        y,
        1,
        COLOURS.WHITE
    );

    y += 22;

    this.surface.drawStringCenter(
        'In the wilderness an indicator at the bottom-right',
        256,
        y,
        1,
        COLOURS.WHITE
    );

    y += 13;

    this.surface.drawStringCenter(
        'of the screen will show the current level of danger',
        256,
        y,
        1,
        COLOURS.WHITE
    );

    y += 22;

    let textColour = COLOURS.WHITE;

    if (
        this.mouseY > y - 12 &&
        this.mouseY <= y &&
        this.mouseX > 181 &&
        this.mouseX < 331
    ) {
        textColour = COLOURS.RED;
    }

    this.surface.drawStringCenter(
        'Click here to close window',
        256,
        y,
        1,
        textColour
    );

    if (this.mouseButtonClick !== 0) {
        if (
            this.mouseY > y - 12 &&
            this.mouseY <= y &&
            this.mouseX > 181 &&
            this.mouseX < 331
        ) {
            this.showUiWildWarn = 2;
        }

        if (
            this.mouseX < 86 ||
            this.mouseX > 426 ||
            this.mouseY < 77 ||
            this.mouseY > 257
        ) {
            this.showUiWildWarn = 2;
        }

        this.mouseButtonClick = 0;
    }
}

module.exports = {
    showUiWildWarn: 0,
    drawDialogWildWarn
};
