// Dependencies
import Phaser, {
    Scene,
    Math as PhaserMath,
} from 'phaser';

// Config
import configPhaser, {
    configPhaser as config,
    gameSettings as settings
} from '../config';

// Models
import Beam from '../models/beam';
import Explosion from '../models/explosion';

class Scene2 extends Scene {
    constructor() {
        super('playGame');
    }

    create() {
        this.background = this.add.tileSprite(0, 0, config.width, config.height, 'background');
        this.background.setOrigin(0, 0);

        this.add.text(40, 40, 'Playing game');

        this.ship1 = this.add.sprite(config.width / 2 - 50, config.height / 2, 'ship1');
        this.ship2 = this.add.sprite(config.width / 2, config.height / 2, 'ship2');
        this.ship3 = this.add.sprite(config.width / 2 + 50, config.height / 2, 'ship3');

        
        this.ship1.play('ship1_anim');
        this.ship2.play('ship2_anim');
        this.ship3.play('ship3_anim');
        
        this.ship1.setInteractive();
        this.ship2.setInteractive();
        this.ship3.setInteractive();

        this.input.on('gameobjectdown', this.destroyShip, this);

        this.powerUps = this.physics.add.group();
        const maxObjects = 4;
        for (let i = 0; i <= maxObjects; i++) {
            const powerUp = this.physics.add.sprite(16, 16, 'power-up');
            this.powerUps.add(powerUp);
            powerUp.setRandomPosition(0, 0, this.game.config.width, this.game.config.height);
            Math.random() > 0.5 ? powerUp.play('red') : powerUp.play('gray');
            powerUp.setVelocity(100, 100);
            powerUp.setCollideWorldBounds(true);
            powerUp.setBounce(1);
        }

        this.enemies = this.physics.add.group();
        this.enemies.add(this.ship1);
        this.enemies.add(this.ship2);
        this.enemies.add(this.ship3);

        this.cursorKeys = this.input.keyboard.createCursorKeys();

        this.player = this.physics.add.sprite(config.width / 2 - 8, config.height - 64, 'player');
        this.player.play('thrust');
        this.player.setCollideWorldBounds(true);

        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.projectiles = this.add.group();

        this.physics.add.collider(this.projectiles, this.powerUps, (projectile, powerUp) => {
            console.log(powerUp);
            projectile.destroy();
        });

        this.physics.add.overlap(this.player, this.powerUps, this.pickPowerUp, null, this);
        this.physics.add.overlap(this.player, this.enemies, this.hurtPlayer, null, this);
        this.physics.add.overlap(this.projectiles, this.enemies, this.hitEnemy, null, this);
    }

    update() {
        this.moveShip(this.ship1, 1);
        this.moveShip(this.ship2, 2);
        this.moveShip(this.ship3, 3);

        this.background.tilePositionY -= 0.5;

        this.movePlayerManager();

        if (this.player.active && Phaser.Input.Keyboard.JustDown(this.spacebar)) this.shootBeam();
        
        for (let i = 0; i < this.projectiles.getChildren().length; i++) {
            const beam = this.projectiles.getChildren()[i];
            beam.update();
        }
    }

    moveShip(ship, speed) {
        ship.y += speed;
        if (ship.y > config.height) this.resetShip(ship);
    }

    resetShip(ship) {
        ship.y = 0;
        ship.x = PhaserMath.Between(0, config.width);
    }

    destroyShip(pointer, gameObject) {
        gameObject.setTexture('explosion');
        gameObject.play('explode');
    }

    movePlayerManager() {
        if (this.cursorKeys.left.isDown) {
            this.player.setVelocityX(-settings.playerSpeed);
        } else if (this.cursorKeys.right.isDown) {
            this.player.setVelocityX(settings.playerSpeed);
        } else {
            this.player.setVelocityX(0);
        }
        if (this.cursorKeys.up.isDown) {
            this.player.setVelocityY(-settings.playerSpeed);
        } else if (this.cursorKeys.down.isDown) {
            this.player.setVelocityY(settings.playerSpeed);
        } else {
            this.player.setVelocityY(0);
        }
    }

    shootBeam() {
        const beam = new Beam(this);
        this.projectiles.add(beam);
    }

    pickPowerUp(player, powerUp) {
        powerUp.disableBody(true, true);
    }

    hurtPlayer(player, enemy) {
        this.resetShip(enemy);

        if (this.player.alpha < 1) return;

        player.x = config.width / 2 - 8;
        player.y = config.height - 64;
        new Explosion(this, player.x, player.y);
        player.disableBody(true, true);
        player.active = false;

        this.time.addEvent({
            delay: 1000,
            callback: this.resetPlayer,
            callbackScope: this,
            loop: false,
        });
    }

    hitEnemy(projectile, enemy) {
        new Explosion(this, enemy.x, enemy.y);
        projectile.destroy();
        this.resetShip(enemy);
    }

    resetPlayer() {
        const x = config.width / 2 - 8;
        const y = config.height + 64;
        this.player.enableBody(true, x, y, true, true);

        this.player.alpha = 0.5;

        this.tweens.add({
            targets: this.player,
            y: configPhaser.height - 64,
            ease: 'Power1',
            duration: 1500,
            repeat: 0,
            onComplete: function () {
                this.player.alpha = 1;
            },
            callbackScope: this,
        });
    }
}

export default Scene2;
