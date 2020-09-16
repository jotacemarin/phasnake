import { GameObjects } from "phaser";
import { randomPos, setPosition } from '../utils';

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
            return false;
        }

        const validLocations = snake.validPositions();
        return setPosition(this, validLocations);
    }

    validPositions(grid) {
        const newGrid = grid.map(el => el);
        const { x, y } = this;
        newGrid[y][x] = false;
        return newGrid;
    }
}

export default Fruit;
