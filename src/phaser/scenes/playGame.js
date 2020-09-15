// Dependencies 
import { Scene, Math as PhaserMath } from 'phaser';

// Models 
import Snake from '../models/snake';
import Food from '../models/food';
import configPhaser from '../config';

export class PlayGame extends Scene {
    constructor() {
        super('playGame');
    }

    create() {
        this.snake = new Snake(this, 4, 4);
        this.food = new Food(this, 3, 4);

        //  Create our keyboard controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.sound

        // Add Physics
        this.physics.add.overlap(this.snake.body, this.food, this.collideWithFood, null, this);
        this.physics.add.collider(this.snake.body, this.snake.body, this.collideWithSelf, null, this);
    }

    update(time) {
        if (!this.snake.alive) {
            return;
        }

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
        if (collideWithFood) {
            this.repositionFood();
        }
    }

    repositionFood() {
        const grid = [];
        const cols = configPhaser.width / 16;
        const rows = configPhaser.height / 16;
        for (let y = 0; y < rows; y++) {
            grid[y] = [];
            for (let x = 0; x < cols; x++) {
                grid[y][x] = true;
            }
        }
        const findSnake = this.snake.updateGrid(grid);

        const validLocations = [];
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                if (findSnake[y][x]) {
                    validLocations.push({ x: x, y: y });
                }
            }
        }

        if (validLocations.length > 0) {
            const pos = PhaserMath.RND.pick(validLocations);
            this.food.setPosition(pos.x * 16, pos.y * 16);
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
}

export default PlayGame;