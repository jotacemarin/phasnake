// Dependencies
import { GameObjects } from 'phaser';

export class Beam extends GameObjects.Sprite {
    constructor(scene) {
        const x = scene.player.x;
        const y = scene.player.y - 16;
        super(scene, x, y, 'beam');

        scene.add.existing(this);
        this.play('beam_anim');
        scene.physics.world.enableBody(this);
        this.body.velocity.y = -250;
        scene.projectiles.add(this);
    }

    update() {
        if (this.y < 1) {
            this.destroy();
            console.log('beam destroyed');
        }
    }
}

export default Beam;