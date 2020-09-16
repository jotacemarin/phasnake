import { EventEmitter } from 'events';
import { Math } from 'phaser';
import { COLS, ROWS, gameSettings } from './config';

const { pixelSize } = gameSettings;

export const randomPos = () => ({
    x: Math.Between(0, COLS - 1) * pixelSize,
    y: Math.Between(0, ROWS - 1) * pixelSize,
});

export const matrizLayout = () => {
    const grid = [];

    for (let y = 0; y < ROWS; y++) {
        grid[y] = [];
        for (let x = 0; x < COLS; x++) {
            grid[y][x] = true;
        }
    }

    return grid;
};

export const setPosition = (gameObject, validLocations) => {
    if (validLocations.length > 0) {
        const { x, y } = Math.RND.pick(validLocations);
        gameObject.setPosition(x * pixelSize, y * pixelSize);
        return true;
    } else {
        return false;
    }
};

export const emitter = new EventEmitter();
