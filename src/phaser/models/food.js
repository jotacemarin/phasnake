import {
    GameObjects,
    Math as PhaserMath,
} from "phaser";
import configPhaser from '../config';

export class Food extends GameObjects.Image {
    constructor(scene, x, y) {
        super(scene, x * 16, y * 16, 'food', 0);
        this.setOrigin(0);
        this.total = 0;
        scene.physics.world.enableBody(this);
        scene.children.add(this);
        this.pickUpSound = scene.sound.add('audio_pickup');
    }

    eat() {
        this.total += 1;
        this.pickUpSound.play();
        const x = PhaserMath.Between(0, 39);
        const y = PhaserMath.Between(0, 29);
        this.setPosition(x * 16, y * 16);
    }

    repositionFood(snake) {
        const grid = [];
        const cols = configPhaser.width / 16;
        const rows = configPhaser.height / 16;
        for (let y = 0; y < rows; y++) {
            grid[y] = [];
            for (let x = 0; x < cols; x++) {
                grid[y][x] = true;
            }
        }
        const findSnake = snake.updateGrid(grid);

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
            this.setPosition(pos.x * 16, pos.y * 16);
            return true;
        } else {
            return false;
        }
    }
}

export default Food;