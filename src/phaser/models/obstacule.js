import { Math } from 'phaser';
import { COLS, ROWS, gameSettings } from "../config";

const { pixelSize } = gameSettings;

export class Obstacle {
    constructor(scene) {
        this.body = scene.physics.add.group();
        this.complexity = 0;
    }

    update(scene) {
        const { food, rotten, snake } = scene;
        const { total: foodTotal } = food;
        if (foodTotal > 0 && foodTotal % 10 === 0) {
            const rottenLocations = this.validPositions(snake, food, rotten);
            this.buildObstacles(foodTotal, rottenLocations);
        }
    }

    validPositions(snake, food, rotten) {
        const snakeLocations = snake.validPositions();
        const foodLocations = food.validPositions(snakeLocations);
        return rotten.validPositions(foodLocations);
    }

    buildObstacles(foodTotal, rottenLocations) {
        const gridSize = ROWS * COLS;
        const buildBlocks = (gridSize * (foodTotal / 10)) / 100;
        for (let i = 0; i < buildBlocks; i++) {
            const { x, y } = Math.RND.pick(rottenLocations);
            const newBlock = this.body.create(x * pixelSize, y * pixelSize, 'block');
            newBlock.setOrigin(0);
        }
    }
}

export default Obstacle;