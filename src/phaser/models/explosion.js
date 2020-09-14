// Dependencies
import { GameObjects } from 'phaser';

export class Explosion extends GameObjects.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'explosion');
        scene.add.existing(this);
        this.play('explode');
    }
}

export default Explosion;