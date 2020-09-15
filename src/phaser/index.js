import { Game } from 'phaser';

import config from './config';

import BootGame from './scenes/bootGame';
import PlayGame from './scenes/playGame';

export const launch = container => new Game({
    ...config,
    parent: container,
    scene: [
        BootGame,
        PlayGame,
    ],
});

export default launch;
