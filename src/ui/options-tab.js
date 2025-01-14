const clientOpcodes = require('../opcodes/client');
import { COLOURS } from './colours'; 


const MENU_WIDTH = 245;

const WIDTH = 196;
const HEIGHT = 265;
const LINE_BREAK = 15;

function drawUiTabOptions(noMenus) {
    let uiX = this.gameWidth - WIDTH - 3;
    let uiY = 36;

    if (this.options.mobile) {
        uiX = 35;
        uiY = (this.gameHeight / 2 - HEIGHT / 2) | 0;
    } else {
        this.surface._drawSprite_from3(
            this.gameWidth - MENU_WIDTH - 3,
            3,
            this.spriteMedia + 6
        );
    }

    this.uiOpenX = uiX;
    this.uiOpenY = uiY;
    this.uiOpenWidth = WIDTH;
    this.uiOpenHeight = HEIGHT;

    this.surface.drawBoxAlpha(uiX, uiY, WIDTH, 65, COLOURS.DARKGREY, 160);

    this.surface.drawBoxAlpha(
        uiX,
        uiY + 65,
        WIDTH,
        65,
        COLOURS.LIGHTGREY3,
        160
    );

    this.surface.drawBoxAlpha(uiX, uiY + 130, WIDTH, 95, COLOURS.DARKGREY, 160);

    this.surface.drawBoxAlpha(
        uiX,
        uiY + 225,
        WIDTH,
        40,
        COLOURS.LIGHTGREY3,
        160
    );

    const x = uiX + 3;
    let y = uiY + LINE_BREAK;

    this.surface.drawString(
        `Game options - ${this.options.mobile ? 'tap' : 'click'} to toggle`,
        x,
        y,
        1,
        COLOURS.BLACK
    );

    y += LINE_BREAK;

    this.surface.drawString(
        'Camera angle mode - ' +
            (this.optionCameraModeAuto ? '@gre@Auto' : '@red@Manual'),
        x,
        y,
        1,
        COLOURS.WHITE
    );

    y += LINE_BREAK;

    this.surface.drawString(
        this.options.mobile
            ? 'Single tap mode - ' +
                  (this.optionMouseButtonOne ? '@gre@on' : '@red@off')
            : 'Mouse buttons - ' +
                  (this.optionMouseButtonOne ? '@red@One' : '@gre@Two'),
        x,
        y,
        1,
        COLOURS.WHITE
    );

    y += LINE_BREAK;

    if (this.members) {
        this.surface.drawString(
            'Sound effects - ' +
                (this.optionSoundDisabled ? '@red@off' : '@gre@on'),
            x,
            y,
            1,
            COLOURS.WHITE
        );
    }

    y += LINE_BREAK;

    if (this.options.accountManagement) {
        y += 5;

        this.surface.drawString('Security settings', x, y, 1, 0);

        y += LINE_BREAK;

        let textColour = COLOURS.WHITE;

        if (
            this.mouseX > x &&
            this.mouseX < x + WIDTH &&
            this.mouseY > y - 12 &&
            this.mouseY < y + 4
        ) {
            textColour = COLOURS.YELLOW;
        }

        this.surface.drawString('Change password', x, y, 1, textColour);

        y += LINE_BREAK;

        textColour = COLOURS.WHITE;

        if (
            this.mouseX > x &&
            this.mouseX < x + WIDTH &&
            this.mouseY > y - 12 &&
            this.mouseY < y + 4
        ) {
            textColour = COLOURS.YELLOW;
        }

        this.surface.drawString(
            'Change recovery questions',
            x,
            y,
            1,
            textColour
        );

        y += LINE_BREAK * 2;
    } else {
        this.surface.drawString(
            'To change your contact details,',
            x,
            y,
            0,
            COLOURS.WHITE
        );

        y += LINE_BREAK;

        this.surface.drawString(
            'password, recovery questions, etc..',
            x,
            y,
            0,
            COLOURS.WHITE
        );

        y += LINE_BREAK;

        this.surface.drawString(
            "please select 'account management'",
            x,
            y,
            0,
            COLOURS.WHITE
        );

        y += LINE_BREAK;

        if (this.referID === 0) {
            this.surface.drawString(
                'from the runescape.com front page',
                x,
                y,
                0,
                COLOURS.WHITE
            );
        } else if (this.referID === 1) {
            this.surface.drawString(
                'from the link below the gamewindow',
                x,
                y,
                0,
                COLOURS.WHITE
            );
        } else {
            this.surface.drawString(
                'from the runescape front webpage',
                x,
                y,
                0,
                COLOURS.WHITE
            );
        }

        y += LINE_BREAK + 5;
    }

    this.surface.drawString(
        'Privacy settings. Will be applied to',
        uiX + 3,
        y,
        1,
        COLOURS.BLACK
    );

    y += LINE_BREAK;

    this.surface.drawString(
        'all people not on your friends list',
        uiX + 3,
        y,
        1,
        COLOURS.BLACK
    );

    y += LINE_BREAK;

    this.surface.drawString(
        'Block chat messages: ' +
            (!this.settingsBlockChat ? '@red@<off>' : '@gre@<on>'),
        uiX + 3,
        y,
        1,
        COLOURS.WHITE
    );

    y += LINE_BREAK;

    this.surface.drawString(
        'Block private messages: ' +
            (!this.settingsBlockPrivate ? '@red@<off>' : '@gre@<on>'),
        uiX + 3,
        y,
        1,
        COLOURS.WHITE
    );

    y += LINE_BREAK;

    this.surface.drawString(
        'Block trade requests: ' +
            (!this.settingsBlockTrade ? '@red@<off>' : '@gre@<on>'),
        uiX + 3,
        y,
        1,
        COLOURS.WHITE
    );

    y += LINE_BREAK;

    if (this.members) {
        this.surface.drawString(
            'Block duel requests: ' +
                (!this.settingsBlockDuel ? '@red@<off>' : '@gre@<on>'),
            uiX + 3,
            y,
            1,
            COLOURS.WHITE
        );
    }

    y += LINE_BREAK + 5;

    this.surface.drawString(
        'Always logout when you finish',
        x,
        y,
        1,
        COLOURS.BLACK
    );

    y += LINE_BREAK;

    let textColour = COLOURS.WHITE;

    if (
        this.mouseX > x &&
        this.mouseX < x + WIDTH &&
        this.mouseY > y - 12 &&
        this.mouseY < y + 4
    ) {
        textColour = COLOURS.YELLOW;
    }

    this.surface.drawString(
        `${this.options.mobile ? 'Tap' : 'Click'} here to logout`,
        uiX + 3,
        y,
        1,
        textColour
    );

    if (!noMenus) {
        return;
    }

    const mouseX = this.mouseX - uiX;
    const mouseY = this.mouseY - uiY;

    if (mouseX >= 0 && mouseY >= 0 && mouseX < 196 && mouseY < 265) {
        const x = uiX + 3;
        let y = uiY + 30;

        if (
            this.mouseX > x &&
            this.mouseX < x + WIDTH &&
            this.mouseY > y - 12 &&
            this.mouseY < y + 4 &&
            this.mouseButtonClick === 1
        ) {
            this.optionCameraModeAuto = !this.optionCameraModeAuto;
            this.packetStream.newPacket(clientOpcodes.SETTINGS_GAME);
            this.packetStream.putByte(0);
            this.packetStream.putByte(this.optionCameraModeAuto ? 1 : 0);
            this.packetStream.sendPacket();
        }

        y += LINE_BREAK;

        if (
            this.mouseX > x &&
            this.mouseX < x + WIDTH &&
            this.mouseY > y - 12 &&
            this.mouseY < y + 4 &&
            this.mouseButtonClick === 1
        ) {
            this.optionMouseButtonOne = !this.optionMouseButtonOne;
            this.packetStream.newPacket(clientOpcodes.SETTINGS_GAME);
            this.packetStream.putByte(2);
            this.packetStream.putByte(this.optionMouseButtonOne ? 1 : 0);
            this.packetStream.sendPacket();
        }

        y += LINE_BREAK;

        if (
            this.members &&
            this.mouseX > x &&
            this.mouseX < x + WIDTH &&
            this.mouseY > y - 12 &&
            this.mouseY < y + 4 &&
            this.mouseButtonClick === 1
        ) {
            this.optionSoundDisabled = !this.optionSoundDisabled;
            this.packetStream.newPacket(clientOpcodes.SETTINGS_GAME);
            this.packetStream.putByte(3);
            this.packetStream.putByte(this.optionSoundDisabled ? 1 : 0);
            this.packetStream.sendPacket();
        }

        if (this.options.accountManagement) {
            y += LINE_BREAK + 20;

            if (
                this.mouseX > x &&
                this.mouseX < x + WIDTH &&
                this.mouseY > y - 12 &&
                this.mouseY < y + 4 &&
                this.mouseButtonClick === 1
            ) {
                this.showChangePasswordStep = 6;
                this.inputTextCurrent = '';
                this.inputTextFinal = '';
            }

            y += LINE_BREAK;

            if (
                this.mouseX > x &&
                this.mouseX < x + WIDTH &&
                this.mouseY > y - 12 &&
                this.mouseY < y + 4 &&
                this.mouseButtonClick === 1
            ) {
                this.packetStream.newPacket(clientOpcodes.RECOVER_SET_REQUEST);
                this.packetStream.sendPacket();
            }

            y += LINE_BREAK * 2;
        } else {
            y += LINE_BREAK * 5;
        }

        let hasChangedSetting = false;

        y += 35;

        if (
            this.mouseX > x &&
            this.mouseX < x + WIDTH &&
            this.mouseY > y - 12 &&
            this.mouseY < y + 4 &&
            this.mouseButtonClick === 1
        ) {
            this.settingsBlockChat = 1 - this.settingsBlockChat;
            hasChangedSetting = true;
        }

        y += LINE_BREAK;

        if (
            this.mouseX > x &&
            this.mouseX < x + WIDTH &&
            this.mouseY > y - 12 &&
            this.mouseY < y + 4 &&
            this.mouseButtonClick === 1
        ) {
            this.settingsBlockPrivate = 1 - this.settingsBlockPrivate;
            hasChangedSetting = true;
        }

        y += LINE_BREAK;

        if (
            this.mouseX > x &&
            this.mouseX < x + WIDTH &&
            this.mouseY > y - 12 &&
            this.mouseY < y + 4 &&
            this.mouseButtonClick === 1
        ) {
            this.settingsBlockTrade = 1 - this.settingsBlockTrade;
            hasChangedSetting = true;
        }

        y += LINE_BREAK;

        if (
            this.members &&
            this.mouseX > x &&
            this.mouseX < x + WIDTH &&
            this.mouseY > y - 12 &&
            this.mouseY < y + 4 &&
            this.mouseButtonClick === 1
        ) {
            this.settingsBlockDuel = 1 - this.settingsBlockDuel;
            hasChangedSetting = true;
        }

        y += LINE_BREAK;

        if (hasChangedSetting) {
            this.sendPrivacySettings(
                this.settingsBlockChat,
                this.settingsBlockPrivate,
                this.settingsBlockTrade,
                this.settingsBlockDuel
            );
        }

        y += LINE_BREAK + 5;

        if (
            this.mouseX > x &&
            this.mouseX < x + WIDTH &&
            this.mouseY > y - 12 &&
            this.mouseY < y + 4 &&
            this.mouseButtonClick === 1
        ) {
            this.sendLogout();
        }

        this.mouseButtonClick = 0;
    }
}

module.exports = { drawUiTabOptions };
