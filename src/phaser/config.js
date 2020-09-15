import Phaser, { Math } from 'phaser';

const configPhaser = {
    type: Phaser.WEBGL,
    width: 640,
    height: 480,
    backgroundColor: '#000',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    },
};

export const gameSettings = {
    pixelSize: 16,
    playerSpeed: 100,
    label: 'Score: ',
};

export const COLS = configPhaser.width / gameSettings.pixelSize;
export const ROWS = configPhaser.height / gameSettings.pixelSize;

export const direction = {
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3,
};

export const randomPos = () => ({
    x: Math.Between(0, COLS - 1) * gameSettings.pixelSize,
    y: Math.Between(0, ROWS - 1) * gameSettings.pixelSize,
});

export default configPhaser;
