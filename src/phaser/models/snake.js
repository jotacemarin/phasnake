/* eslint-disable no-unused-vars */

// Dependencies
import {
    Geom,
    Math as PhaserMath,
    Actions as PhaserActions,
    GameObjects,
} from "phaser";
import { direction } from "../config";

// Config

export class SnakeHead extends GameObjects.Image {
    constructor(scene, x, y) {
        super(scene, x * 16, y * 16, 'body', 0);
        this.setOrigin(0);
        scene.physics.world.enableBody(this);
        scene.children.add(this);
        this.alive = true;
        this.moveTime = 0;
        this.speed = 100;
        this.heading = direction.RIGHT;
        this.direction = direction.RIGHT; 
        this.headPos = new Geom.Point(x, y);
        /*
        this.body = scene.physics.add.group();
        this.head = this.body.create(x * 16, y * 16, 'body');
        this.tail = Geom.Point(x, y);
        */
    }

    update(time) {
        if (time >= this.moveTime) {
            // console.log(time);
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
        this.setX(this.headPos.x * 16);
        this.setY(this.headPos.y * 16);
        this.moveTime = time + this.speed;
        return true;
    }

    grow() {
        const newPart = this.body.create(this.tail.x, this.tail.y, 'body');
        newPart.setOrigin(0);
    }

    collideWithFood(snake, food) {
        if (this.head.x === food.x && this.head.y === food.y) {
            this.grow();
            food.eat();
            return true;
        } else {
            return false;
        }
    }
}

export default SnakeHead;