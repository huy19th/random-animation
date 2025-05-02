export class Petal {
    x: number;
    y: number;
    w: number;
    h: number;
    opacity: number;
    flip: number;
    xSpeed: number;
    ySpeed: number;
    flipSpeed: number;

    constructor() {
        this.x = Math.random() * window.innerWidth;
        this.y = (Math.random() * window.innerHeight * 2) - window.innerHeight;
        this.w = 25 + Math.random() * 15;
        this.h = 20 + Math.random() * 10;
        this.opacity = this.w / 40;
        this.flip = Math.random();

        this.xSpeed = 1.5 + Math.random() * 2;
        this.ySpeed = 1 + Math.random() * 1;
        this.flipSpeed = Math.random() * 0.03;
    }

    get width() {
        return this.w * (0.6 + (Math.abs(Math.cos(this.flip)) / 3));
    }

    get height() {
        return this.h * (0.8 + (Math.abs(Math.sin(this.flip)) / 5));
    }

    fall() {
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        this.flip += this.flipSpeed;

        if (this.y > window.innerHeight || this.x > window.innerWidth) {
            this.x = -165; // 165 is image's width 
            this.y = (Math.random() * window.innerHeight * 2) - window.innerHeight;
            this.xSpeed = 1.5 + Math.random() * 2;
            this.ySpeed = 1 + Math.random() * 1;
            this.flip = Math.random();
        }
    }
}