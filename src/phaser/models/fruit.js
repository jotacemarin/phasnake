import { GameObjects, Math as PhaserMath } from "phaser";
import { gameSettings, COLS, ROWS, randomPos } from '../config';

const { pixelSize } = gameSettings;

export class Fruit extends GameObjects.Image {
    constructor(scene, type) {
        const { x, y } = randomPos();
        super(scene, x, y, type, 0);

        scene.physics.world.enableBody(this);
        scene.children.add(this);
        this.setOrigin(0);
        this.pickUpSound = scene.sound.add('audio_pickup');
    }

    eat() {
        this.pickUpSound.play();
        const { x, y } = randomPos();
        this.setPosition(x, y);
    }

    repositionFruit(snake) {
        if (!snake.alive) {
            this.active = false;
            this.destroy();
        }

        const grid = [];
        for (let y = 0; y < ROWS; y++) {
            grid[y] = [];
            for (let x = 0; x < COLS; x++) {
                grid[y][x] = true;
            }
        }
        const findSnake = snake.updateGrid(grid);

        const validLocations = [];
        for (let y = 0; y < ROWS; y++) {
            for (let x = 0; x < COLS; x++) {
                if (findSnake[y][x]) {
                    validLocations.push({ x: x, y: y });
                }
            }
        }

        if (validLocations.length > 0) {
            const pos = PhaserMath.RND.pick(validLocations);
            this.setPosition(pos.x * pixelSize, pos.y * pixelSize);
            return true;
        } else {
            return false;
        }
    }
}

export default Fruit;
