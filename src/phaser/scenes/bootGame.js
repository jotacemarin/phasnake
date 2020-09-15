import { Scene } from 'phaser';

class BootGame extends Scene {
    constructor() {
        super('bootGame');
    }

    preload() {
        this.load.image('body', 'http://localhost:8082/assets/images/body.png');
        this.load.image('tail', 'http://localhost:8082/assets/images/tail.png');
        this.load.image('food', 'http://localhost:8082/assets/images/food.png');
        this.load.audio('audio_pickup', ['http://localhost:8082/assets/sounds/pickup.ogg', 'http://localhost:8082/assets/sounds/pickup.mp3']);
    }

    create() {
        this.scene.start('playGame')
    }
}

export default BootGame;
