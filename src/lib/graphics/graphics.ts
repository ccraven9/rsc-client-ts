// shims https://docs.oracle.com/javase/7/docs/api/java/awt/Graphics.html

export class Graphics {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        const renderContext : CanvasRenderingContext2D | null = this.canvas.getContext('2d', { alpha: false });
        if (!renderContext || !(renderContext instanceof CanvasRenderingContext2D)) {
            throw new Error('Failed to get 2D context');
        }
        this.ctx = renderContext;
    }

    /**
    * Specifies the color, gradient, or pattern to use for a cavnas shape and its outline.
    * @param  { function(string | CanvasGradient | CanvasPattern ):string } color - Color to be set.
    */
    setColor(color: { toCanvasStyle: () => string | CanvasGradient | CanvasPattern; }) {
        this.ctx.fillStyle = color.toCanvasStyle();
        this.ctx.strokeStyle = color.toCanvasStyle();
    }

    /**
    * Draws a filled rectangle whose starting point is at (x, y) 
    * and whose size is specified by width and height. 
    * The fill style is determined by the current fillStyle attribute.
    * @param  { number } x -  X coordinate.
    * @param  { number } y -  Y coordinate.
    * @param  { number } width -  Rectangle width.
    * @param  { number } height - Rectangle Height.
    */
    fillRect(x: number, y: number, width: number, height: number) {
        this.ctx.fillRect(x, y, width, height);
    }

    drawRect(x: number, y: number, width: number, height: number) {
        this.ctx.strokeRect(x, y, width, height);
    }

    setFont(font: { toCanvasFont: () => string; }) {
        this.ctx.font = font.toCanvasFont();
    }

    drawString(s: string, x: number, y: number) {
        this.ctx.fillText(s, x, y);
    }

    measureTextWidth(s: string): number {
        return this.ctx.measureText(s).width;
    }

    drawImage(image: ImageData, x: number, y: number) {
        this.ctx.putImageData(image, x, y);
    }

    getImage(width: number, height: number): ImageData {
        return this.ctx.getImageData(0, 0, width, height);
    }
}
