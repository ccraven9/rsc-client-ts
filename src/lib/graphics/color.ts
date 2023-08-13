export class Color {
    r: number;
    g: number;
    b: number;
    a: number;
    
    static white = new Color(255, 255, 255);
    static WHITE = Color.white;
    
    static lightGray = new Color(192, 192, 192);
    static LIGHT_GRAY = Color.lightGray;
    
    static gray = new Color(128, 128, 128);
    static GRAY = Color.gray;
    
    static darkGray = new Color(64, 64, 64);
    static DARK_GRAY = Color.darkGray;
    
    static black = new Color(0, 0, 0);
    static BLACK = Color.black;
    
    static red = new Color(255, 0, 0);
    static RED = Color.red;
    
    static pink = new Color(255, 175, 175);
    static PINK = Color.pink;
    
    static orange = new Color(255, 200, 0);
    static ORANGE = Color.orange;
    
    static yellow = new Color(255, 255, 0);
    static YELLOW = Color.yellow;
    
    static green = new Color(0, 255, 0);
    static GREEN = Color.green;
    
    static magenta = new Color(255, 0, 255);
    static MAGENTA = Color.magenta;
    
    static cyan = new Color(0, 255, 255);
    static CYAN = Color.cyan;
    
    static blue = new Color(0, 0, 255);
    static BLUE = Color.blue;

    constructor(r: number, g: number, b: number, a = 255) {
        this.r = r;
        this.g = g;
        this.b = b;
        this.a = a;
    }

    toCanvasStyle(): string {
        return `rgba(${this.r},${this.g}, ${this.b}, ${this.a})`;
    }
}

