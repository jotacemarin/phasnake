import Phaser from 'phaser';

export const configPhaser = {
    type: Phaser.WEBGL,
    width: 640,
    height: 480,
    backgroundColor: '#bfcc00',
    pixelArt: true,
    physics: {
        default: 'arcade',
        arcade: { debug: false }
    },
};

export const gameSettings = {
    playerSpeed: 100,
    label: 'Score: '
};

export const direction = {
    UP: 0,
    DOWN: 1,
    LEFT: 2,
    RIGHT: 3,
};

export default configPhaser;