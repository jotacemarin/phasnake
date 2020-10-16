import { Geom, Math as PhaserMath, Actions as PhaserActions } from "phaser";
import { direction, gameSettings, COLS, ROWS } from "../config";
import { matrizLayout } from '../utils';

const { playerSpeed, pixelSize } = gameSettings;
const { UP, DOWN, LEFT, RIGHT } = direction;

export class Snake {
    constructor(scene) {
        const x = PhaserMath.Between(0, COLS - 1);
        const y = PhaserMath.Between(0, ROWS - 1);
        this.headPos = new Geom.Point(x, y);
        this.body = scene.physics.add.group();
        this.head = this.body.create(x * pixelSize, y * pixelSize, 'body');
        this.head.setOrigin(0);
        this.tail = new Geom.Point(x, y);
        this.alive = true;
        this.moveTime = 0;
        this.speed = playerSpeed;
        this.heading = direction.RIGHT;
        this.direction = direction.RIGHT;
    }

    update(time) {
        if (time >= this.moveTime) {
            return this.move(time);
        }
    }

    faceLeft() {
        if (this.direction === UP || this.direction === DOWN) {
            this.heading = LEFT;
        }
    }

    faceRight() {
        if (this.direction === UP || this.direction === DOWN) {
            this.heading = RIGHT;
        }
    }
    
    faceUp() {
        if (this.direction === LEFT || this.direction === RIGHT) {
            this.heading = UP;
        }
    }

    faceDown() {
        if (this.direction === LEFT || this.direction === RIGHT) {
            this.heading = DOWN;
        }
    }

    move(time) {
        if (!this.alive) return false;

        switch (this.heading) {
            case LEFT:
                this.headPos.x = PhaserMath.Wrap(this.headPos.x - 1, 0, COLS);
                break;
            case RIGHT:
                this.headPos.x = PhaserMath.Wrap(this.headPos.x + 1, 0, COLS);
                break;
            case UP:
                this.headPos.y = PhaserMath.Wrap(this.headPos.y - 1, 0, ROWS);
                break;
            case DOWN:
                this.headPos.y = PhaserMath.Wrap(this.headPos.y + 1, 0, ROWS);
                break;
        }
        this.direction = this.heading;
        PhaserActions.ShiftPosition(this.body.getChildren(), this.headPos.x * pixelSize, this.headPos.y * pixelSize, 1, this.tail)
        this.moveTime = time + this.speed;
        return true;
    }

    grow() {
        const newPart = this.body.create(this.tail.x, this.tail.y, 'body');
        newPart.setOrigin(0);
    }

    collideWithFood(food) {
        if (this.head.x === food.x && this.head.y === food.y) {
            food.eat();
            if (this.speed > 20 && food.total % 5 === 0) {
                this.speed -= 5;
            }
            setTimeout(this.grow(), 80);
            return true;
        } else {
            return false;
        }
    }

    collideWithRotten(rotten) {
        if (rotten.active && this.head.x === rotten.x && this.head.y === rotten.y) {
            this.collitionWithActiveRotten();
            rotten.eat();
            return true;
        } else {
            return false;
        }
    }

    collideWithSelf(first, last) {
        const { x: xF, y: yF } = first;
        const { x: xL, y: yL } = last;
        const coords = [ xF, yF, xL, yL];
        const counts = {};
        coords.forEach(function(n) { counts[n] = (counts[n] || 0) + 1; });
        const keys = Object.keys(counts);
        if (keys.length === 2) {
            const [m, n] = keys;
            if (counts[m] === 2 && counts[n] === 2) {
                this.alive = false;
            }
        }
    }

    findSnake() {
        const grid = matrizLayout();

        this.body.children.each(segment => {
            const { x, y } = segment;
            const bx = x / pixelSize;
            const by = y / pixelSize;
            grid[by][bx] = false;
        });

        return grid;
    }

    validPositions() {
        const grid = this.findSnake();
        const validLocations = [];
        for (let y = 0; y < ROWS; y++) {
            for (let x = 0; x < COLS; x++) {
                if (grid[y][x]) {
                    validLocations.push({ x: x, y: y });
                }
            }
        }
        return validLocations;
    }

    collitionWithActiveRotten() {
        if (this.body.children.size <= 2) {
            this.alive = false;
        } else {
            this.removeTails();
        }
    }

    removeTails() {
        const array = this.body.children.getArray();
        array.reverse().forEach((item, i) => {
            if (i < 2) {
                this.body.remove(item);
                item.active = false;
                item.destroy();
            }
        });
    }

    collideWithBuildingBlock() {
        this.alive = false;
    }
}

export default Snake;
