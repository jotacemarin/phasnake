// Dependencies 
import { Scene } from 'phaser';

import configPhaser, { gameSettings } from "../config";
import Snake from '../models/snake';
import Food from '../models/food';
import Rotten from '../models/rotten';

export class PlayGame extends Scene {
    constructor() {
        super('playGame');
    }

    create() {
        this.background = this.add.tileSprite(0, 0, configPhaser.width, configPhaser.height, 'background');
        this.background.setOrigin(0, 0);

        this.snake = new Snake(this);
        this.food = new Food(this);
        this.rotten = new Rotten(this);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.label = this.add.text(4, 1, gameSettings.label + this.food.total, { font: '16px Cascadia Code SemiBold', fill: '#c5c106' });
        this.label.setDepth(10);

        this.physics.add.overlap(this.snake.body, this.food, this.collideWithFood, null, this);
        this.physics.add.overlap(this.snake.body, this.rotten, this.collideWithRotten, null, this);
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
        this.rotten.update(time);
    }

    collideWithFood() {
        const collideWithFood = this.snake.collideWithFood(this.snake, this.food);
        this.label.text = gameSettings.label + this.food.total;
        if (collideWithFood) {
            this.food.repositionFood(this.snake);
        }
    }

    collideWithRotten() {
        const collideWithRotten = this.snake.collideWithRotten(this.snake, this.rotten);
        if (collideWithRotten) {
            this.rotten.repositionRotten(this.snake);
        }
    }
}

export default PlayGame;
