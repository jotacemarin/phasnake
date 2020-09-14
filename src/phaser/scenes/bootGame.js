import { Scene } from 'phaser';

class BootGame extends Scene {
    constructor() {
        super('bootGame');
    }

    preload() {
        this.load.image('body', 'http://localhost:8082/assets/body.png');
        this.load.image('food', 'http://localhost:8082/assets/food.png');
    }

    create() {
        this.scene.start('playGame')
    }
}

export default BootGame;
