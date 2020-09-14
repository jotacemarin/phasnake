// Dependencies
import { GameObjects, Math as PhaserMath } from "phaser";

export class Food extends GameObjects.Image {
    constructor(scene, x, y) {
        super(scene, x * 16, y * 16, 'food', 0);
        this.setOrigin(0);
        this.total = 0;
        scene.physics.world.enableBody(this);
        scene.children.add(this);
    }

    eat() {
        this.total += 1;
        const x = PhaserMath.Between(0, 39);
        const y = PhaserMath.Between(0, 29);
        this.setPosition(x * 16, y * 16);
    }
}

export default Food;