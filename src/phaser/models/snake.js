import {
    Geom,
    Math as PhaserMath,
    Actions as PhaserActions,
} from "phaser";
import { direction } from "../config";

export class Snake {
    constructor(scene, x, y) {
        this.headPos = new Geom.Point(x, y);
        this.body = scene.physics.add.group();
        this.head = this.body.create(x * 16, y * 16, 'tail');
        this.head.setOrigin(0);
        this.tail = new Geom.Point(x, y);
        this.alive = true;
        this.moveTime = 0;
        this.speed = 100;
        this.heading = direction.RIGHT;
        this.direction = direction.RIGHT;
    }

    update(time) {
        if (time >= this.moveTime) {
            return this.move(time);
        }
    }

    faceLeft() {
        if (this.direction === direction.UP || this.direction === direction.DOWN) {
            this.heading = direction.LEFT;
        }
    }

    faceRight() {
        if (this.direction === direction.UP || this.direction === direction.DOWN) {
            this.heading = direction.RIGHT;
        }
    }
    
    faceUp() {
        if (this.direction === direction.LEFT || this.direction === direction.RIGHT) {
            this.heading = direction.UP;
        }
    }

    faceDown() {
        if (this.direction === direction.LEFT || this.direction === direction.RIGHT) {
            this.heading = direction.DOWN;
        }
    }

    move(time) {
        if (!this.alive) return false;

        switch (this.heading) {
            case direction.LEFT:
                this.headPos.x = PhaserMath.Wrap(this.headPos.x - 1, 0, 40);
                break;
            case direction.RIGHT:
                this.headPos.x = PhaserMath.Wrap(this.headPos.x + 1, 0, 40);
                break;
            case direction.UP:
                this.headPos.y = PhaserMath.Wrap(this.headPos.y - 1, 0, 30);
                break;
            case direction.DOWN:
                this.headPos.y = PhaserMath.Wrap(this.headPos.y + 1, 0, 30);
                break;
        }
        this.direction = this.heading;
        PhaserActions.ShiftPosition(this.body.getChildren(), this.headPos.x * 16, this.headPos.y * 16, 1, this.tail)
        this.moveTime = time + this.speed;
        return true;
    }

    grow() {
        const newPart = this.body.create(this.tail.x, this.tail.y, 'tail');
        newPart.setOrigin(0);
    }

    collideWithFood(snake, food) {
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
                this.snake.alive = false;
            }
        }
    }

    updateGrid(grid) {
        this.body.children.each(segment => {
            var bx = segment.x / 16;
            var by = segment.y / 16;
            grid[by][bx] = false;
        });

        return grid;
    }
}

export default Snake;