import { WindowSize } from '../../common/types';
import { distance } from '../../common/utils';
import { BrickBreakerSettings } from './settings';

export class Brick {
    x: number;
    y: number;
    fill: string;
    width: number;
    height: number;
    constructor(
        {x, y, fill, width, height}:
        {x:number,y: number,fill: string, width: number, height: number}
    ) {
        this.x = x;
        this.y = y;
        this.fill = fill;
        this.width = width;
        this.height = height;
    }

    get topEdge() {
        return this.y;
    }

    get bottomEdge() {
        return this.y + this.height;
    }

    get leftEdge() {
        return this.x;
    }

    get rightEdge() {
        return this.x + this.width;
    }
}

export class Ball {
    x: number;
    y: number;
    fill: string;
    radius: number;
    speed: number;
    dx: number;
    dy: number;

    constructor(
        { x, y, fill, radius, speed }:
            { x: number, y: number, fill: string, radius: number, speed: number }
    ) {

        this.x = x;
        this.y = y;
        this.fill = fill;
        this.radius = radius;
        this.speed = speed;
        this.dx = speed - Math.random() * 3; // Change in x-coordinate per frame
        this.dy = - Math.sqrt(this.speed ** 2 - this.dx ** 2); // Change in y-coordinate per frame
    }

    move() {
        this.x += this.dx;
        this.y += this.dy;

        // Bounce off the canvas boundaries
        if (this.x - this.radius <= 0) {
            this.dx = Math.abs(this.dx);
        }
        if (this.x + this.radius >= window.innerWidth) {
            this.dx = -Math.abs(this.dx);
        }
        if (this.y - this.radius <= 0) {
            this.dy = Math.abs(this.dy);
        }
        if (this.y + this.radius >= window.innerHeight) {
            this.dy = -Math.abs(this.dy);
        }
    }

    detectCollision(brick: Brick) {
        if (this.fill != brick.fill) return;
        let collided = true;
        // collide with upper edge
        if (
            this.x >= brick.leftEdge &&
            this.x <= brick.rightEdge &&
            this.y >= brick.topEdge - this.radius &&
            this.y <= brick.topEdge
        ) {
            this.dy *= -1;
        }
        // collide with right edge
        else if (
            this.x >= brick.rightEdge &&
            this.x <= brick.rightEdge + this.radius &&
            this.y >= brick.topEdge &&
            this.y <= brick.bottomEdge
        ) {
            this.dx *= -1;
        }
        // collide with bottom edge
        else if (
            this.x >= brick.leftEdge &&
            this.x <= brick.rightEdge &&
            this.y >= brick.bottomEdge &&
            this.y <= brick.bottomEdge + this.radius
        ) {
            this.dy *= -1;
        }
        // collide with left edge
        else if (
            this.x >= brick.leftEdge - this.radius &&
            this.x <= brick.leftEdge &&
            this.y >= brick.topEdge &&
            this.y <= brick.bottomEdge
        ) {
            this.dx *= -1;
        }
        // point collision detection
        else if (
            this.radius >= distance(this.x, this.y, brick.leftEdge, brick.topEdge) ||
            this.radius >= distance(this.x, this.y, brick.rightEdge, brick.topEdge) ||
            this.radius >= distance(this.x, this.y, brick.rightEdge, brick.bottomEdge) ||
            this.radius >= distance(this.x, this.y, brick.leftEdge, brick.bottomEdge)
        ) {
            if (Math.abs(this.x - brick.leftEdge) > Math.abs(this.y - brick.topEdge)) {
                this.dx *= -1;
            }
            else {
                this.dy *= -1;
            }
        }
        else {
            collided = false;
        }
        if (collided) {
            const { light, dark } = BrickBreaker.Color;
            brick.fill = brick.fill === light ? dark : light;
        }
    }

}

export class BrickBreaker {

    static Color = {
        light: BrickBreakerSettings.value.color.light,
        dark: BrickBreakerSettings.value.color.dark
    }

    balls: Ball[] = [];
    bricks: Brick[] = [];
    windowSize: WindowSize;

    constructor(settings = BrickBreakerSettings.value, windowSize: WindowSize) {
        BrickBreaker.Color = settings.color;
        this.windowSize = windowSize;
        this.createBricks(settings);
        this.createBalls(settings);
    }

    createBalls(settings: typeof BrickBreakerSettings.value) {
        const { color, ball } = settings;
        const marginX = window.innerWidth / 16;
        const marginY = window.innerHeight / 16;
        const rangeX = window.innerWidth / 8;
        const rangeY = window.innerHeight * 7 / 8;
        for (let i = 0; i < ball.pair; i++) {
            const darkBall = new Ball({
                x: Math.floor(Math.random() * rangeX + marginX),
                y: Math.floor(Math.random() * rangeY + marginY),
                fill: color.dark,
                radius: ball.radius,
                speed: ball.speed
            });
            const lightBall = new Ball({
                x: Math.floor(- Math.random() * rangeX + window.innerWidth - marginX),
                y: Math.floor(Math.random() * rangeY + marginY),
                fill: color.light,
                radius: ball.radius,
                speed: ball.speed
            });
            this.balls.push(lightBall, darkBall);
        }
    }

    animate() {
        for (const ball of this.balls) {
            for (const brick of this.bricks) {
                ball.detectCollision(brick);
            }
            ball.move();
        }
    }

    createBricks(settings: typeof BrickBreakerSettings.value) {
        const { brick: { width, height }, color } = settings;
        const totalBrickHorizontally = Math.ceil(window.innerWidth / width);
        const totalBrickVertically = Math.ceil(window.innerHeight / height);
        const Ox = (window.innerWidth - width * totalBrickHorizontally) / 2;
        const Oy = (window.innerHeight - height * totalBrickVertically) / 2;
        for (let i = 0; i < totalBrickVertically; i++) {
            const lightBrickCount = Math.floor(totalBrickHorizontally / 2) - 5 + Math.floor(Math.random() * 11);
            for (let j = 0; j < totalBrickHorizontally; j++) {
                this.bricks.push(new Brick({
                    x: Ox + j * width,
                    y: Oy + i * height,
                    fill: j < lightBrickCount ? color.light : color.dark,
                    width: width + 1,
                    height: height + 1,
                }));
            }
        }
    }
}