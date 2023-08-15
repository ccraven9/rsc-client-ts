// shims https://docs.oracle.com/javase/7/docs/api/java/awt/Graphics.html

export class Graphics {
    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        const renderContext: CanvasRenderingContext2D | null = this.canvas.getContext('2d', { alpha: false });
        if (!renderContext || !(renderContext instanceof CanvasRenderingContext2D)) {
            throw new Error('Failed to get 2D context');
        }
        this.ctx = renderContext;
    }

    /**
    * Specifies the color, gradient, or pattern to use for a cavnas shape fillStyle and strokeStyle.
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
    * @param  { number } x -  The x-axis coordinate of the point at which to begin drawing the shape.
    * @param  { number } y -  The y-axis coordinate of the point at which to begin drawing the shape.
    * @param  { number } width -  Rectangle width.
    * @param  { number } height - Rectangle Height.
    */
    fillRect(x: number, y: number, width: number, height: number) {
        this.ctx.fillRect(x, y, width, height);
    }

    /**
    * Draws a rectangle that is stroked (outlined) according to the current strokeStyle and other context settings.
    * @param  { number } x -  The x-axis coordinate of the point at which to begin drawing the shape.
    * @param  { number } y -  The y-axis coordinate of the point at which to begin drawing the shape.
    * @param  { number } width -  Rectangle width.
    * @param  { number } height - Rectangle Height.
    */
    drawRect(x: number, y: number, width: number, height: number) {
        this.ctx.strokeRect(x, y, width, height);
    }

    /**
    * Specifies the current text style to use when drawing text.
    * @param  { number } x -  X coordinate.
    */
    setFont(font: { toCanvasFont: () => string; }) {
        this.ctx.font = font.toCanvasFont();
    }

    /**
     * Draws a text string at the specified coordinates, filling the string's characters with the current fillStyle
     * @param { string } s - A string specifying the text string to render into the context.
     * @param { number } x - The x-axis coordinate of the point at which to begin drawing the text, in pixels.
     * @param { number } y - The y-axis coordinate of the baseline on which to begin drawing the text, in pixels.
     */
    drawString(s: string, x: number, y: number) {
        this.ctx.fillText(s, x, y);
    }

    /**
     * Returns width of passed string in pixels.
     * @param { string } s - The text string to measure.
     * @returns { number }  Text width.
     */
    measureTextWidth(s: string): number {
        return this.ctx.measureText(s).width;
    }

    /**
     * Paints data from the given ImageData object onto the canvas.
     * @param image - An ImageData object containing the array of pixel values.
     * @param x - Horizontal position (x coordinate) at which to place the image data in the destination canvas.
     * @param y - Vertical position (y coordinate) at which to place the image data in the destination canvas.
     */
    drawImage(image: ImageData, x: number, y: number) {
        this.ctx.putImageData(image, x, y);
    }

    /**
     * Returns an ImageData object representing the underlying pixel data for a specified portion of the canvas.
     * @param width - The width of the rectangle from which the ImageData will be extracted. 
     * @param height - The height of the rectangle from which the ImageData will be extracted. 
     * @returns An Image data object for the given width and height of the canvas.
     */
    getImage(width: number, height: number): ImageData {
        return this.ctx.getImageData(0, 0, width, height);
    }
}
