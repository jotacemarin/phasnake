// Dependencies 
import { Scene } from 'phaser';

import { gameSettings } from "../config";
import Snake from '../models/snake';
import Food from '../models/food';

export class PlayGame extends Scene {
    constructor() {
        super('playGame');
    }

    create() {
        this.snake = new Snake(this, 4, 4);
        this.food = new Food(this, 3, 4);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.label = this.add.text(4, 1, gameSettings.label + this.food.total, { font: '16px Cascadia Code SemiBold', fill: '#193300' });
        this.label.setDepth(10);

        this.physics.add.overlap(this.snake.body, this.food, this.collideWithFood, null, this);
        this.physics.add.collider(this.snake.body, this.snake.body, this.snake.collideWithSelf, null, this);
    }

    update(time) {
        if (!this.snake.alive) return;

        if (this.cursors.left.isDown) {
            this.snake.faceLeft();
        } else if (this.cursors.right.isDown) {
            this.snake.faceRight();
        } else if (this.cursors.up.isDown) {
            this.snake.faceUp();
        } else if (this.cursors.down.isDown) {
            this,this.snake.faceDown();
        }

        this.snake.update(time);
    }

    collideWithFood() {
        const collideWithFood = this.snake.collideWithFood(this.snake, this.food);
        this.label.text = gameSettings.label + this.food.total;
        if (collideWithFood) {
            this.food.repositionFood(this.snake);
        }
    }
}

export default PlayGame;