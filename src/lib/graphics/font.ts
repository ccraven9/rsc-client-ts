export class Font {
    name: string;
    type: number;
    size: number;
    static BOLD: number = 1;

    constructor(name: string, type: number, size: number) {
        this.name = name;
        this.type = type;
        this.size = size;
    }


    /**
    * Returns the font properties for canvas text ( bold | italic | normal), size and name
    * as a single string.
    * @returns { string } Font properties string.
    */
    toCanvasFont(): string {
        return `${this.getType()} ${this.size}px ${this.name}`;
    }

    getType(): string {
        if (this.type === 1) {
            return 'bold';
        } else if (this.type === 2) {
            return 'italic';
        }

        return 'normal';
    }
}

