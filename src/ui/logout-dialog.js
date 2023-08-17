// const colours = require('./_colours');
import { COLOURS } from './colours';

function drawDialogLogout() {
    this.surface.drawBox(126, 137, 260, 60, COLOURS.BLACK);
    this.surface.drawBoxEdge(126, 137, 260, 60, COLOURS.WHITE);
    this.surface.drawStringCenter('Logging out...', 256, 173, 5, COLOURS.WHITE);
}

module.exports = { drawDialogLogout };
