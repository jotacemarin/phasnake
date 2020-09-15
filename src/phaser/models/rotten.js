import { Math as PhaserMath } from 'phaser';

import Fruit from "./fruit";

export class Rotten extends Fruit {
    constructor(scene) {
        super(scene, 'rotten', 0);
        this.active = false;
        this.visible = false;
    }

    eat() {
        this.setRottenActive(false, false);
        super.eat();
    }

    update(time) {
        const value = PhaserMath.RND.integerInRange(0, Math.round(time)) % 100 === 0;
        this.setRottenActive(value);
    }

    repositionRotten(snake) {
        super.repositionFruit(snake);
    }

    setRottenActive(value, external = true) {
        if (!value && external) return;
        this.active = value;
        this.visible = value;
    }
}

export default Rotten;
