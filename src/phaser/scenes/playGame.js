// Dependencies 
import { Scene } from 'phaser';
import configPhaser from "../config";
import { emitter } from '../utils';
import Snake from '../models/snake';
import Food from '../models/food';
import Rotten from '../models/rotten';
import Obstacle from '../models/obstacule';

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
        this.obstacule = new Obstacle(this);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.physics.add.overlap(this.snake.body, this.food, this.collideWithFood, null, this);
        this.physics.add.overlap(this.snake.body, this.rotten, this.collideWithRotten, null, this);
        this.physics.add.collider(this.snake.body, this.snake.body, this.snakeCollideWithSelf, null, this);
        this.physics.add.collider(this.snake.body, this.obstacule.body, this.collideWithBuildingBlock, null, this);

        emitter.emit('eat_food', this.food.total);
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
        const collideWithFood = this.snake.collideWithFood(this.food);
        if (collideWithFood) {
            emitter.emit('eat_food', this.food.total);
            this.food.repositionFood(this.snake);
            this.obstacule.update(this);
        }
    }

    collideWithRotten() {
        const collideWithRotten = this.snake.collideWithRotten(this.rotten);
        if (collideWithRotten) {
            this.rotten.repositionRotten(this.snake);
            this.sendEventGameOver('eat rotten fruit');
        }
    }

    snakeCollideWithSelf(first, last) {
        const { alive } = this.snake;
        if (alive) {
            this.snake.collideWithSelf(first, last);
            this.sendEventGameOver('eat hermself');
        }
    }
    
    collideWithBuildingBlock(snake, block) {
        this.snake.collideWithBuildingBlock(block);
        this.sendEventGameOver('stamp with wall');
    }

    sendEventGameOver(reason) {
        const { alive } = this.snake;
        if (!alive) {
            const { total } = this.food;
            emitter.emit('game_over', { reason, points: total });
        }
    }
}

export default PlayGame;
