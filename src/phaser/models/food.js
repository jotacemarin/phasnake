import Fruit from "./fruit";

export class Food extends Fruit {
    constructor(scene) {
        super(scene, 'food', 0);
        this.total = 0;
    }

    eat() {
        this.total += 1;
        super.eat();
    }

    repositionFood(snake) {
        super.repositionFruit(snake);
    }
}

export default Food;
