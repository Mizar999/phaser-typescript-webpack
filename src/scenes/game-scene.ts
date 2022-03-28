import "phaser";

export class GameScene extends Phaser.Scene {
    stars: Phaser.GameObjects.Image[];
    asteroidFrames: number[];

    constructor() {
        super({
            key: "GameScene"
        });

        this.stars = [];
        this.asteroidFrames = [24, 25, 26, 27, 32, 33, 34, 35];
    }

    preload(): void {
        this.load.spritesheet("space", "assets/simpleSpace_tilesheet.png", { frameWidth: 128, frameHeight: 128 });
    }

    create(): void {
        this.matter.world.setBounds().disableGravity();

        let count = Phaser.Math.Between(30, 35);
        while (count > 0) {
            this.addStar();
            count--;
        }

        let asteroidSize = 78;
        let x, y: number;
        let sprite: Phaser.Physics.Matter.Sprite;
        for (let element of this.asteroidFrames) {
            x = Phaser.Math.Between(asteroidSize / 2, this.game.canvas.width - asteroidSize / 2);
            y = Phaser.Math.Between(asteroidSize / 2, this.game.canvas.height - asteroidSize / 2);
            sprite = this.matter.add.sprite(x, y, "space", element);
            if (element % 2 == 0) {
                sprite.setDisplaySize(asteroidSize, asteroidSize);
                sprite.setCircle(asteroidSize / 2.85);
            } else {
                sprite.setDisplaySize(asteroidSize - 15, asteroidSize - 15);
                sprite.setCircle(asteroidSize / 4.9);
            }
            
            console.log(this.matter.bodies);

            this.tweens.add({
                targets: sprite,
                angle: Phaser.Math.FloatBetween(0, 1) < 0.5 ? -360 : 360,
                loop: true,
                repeat: -1,
                onStart: function (tween) {
                    tween.timeScale = Phaser.Math.FloatBetween(0.3, 0.6);
                }
            });
        }

        let size = 25;
        let temp = this.add.rectangle(0, this.game.canvas.height - size, this.game.canvas.width, size, 0x005596, 0.4);
        temp.setOrigin(0, 0);
        this.matter.add.rectangle(temp.x, temp.y, temp.width, temp.height);
    }

    private addStar(): void {
        let size = 26;
        let id = Phaser.Math.Between(28, 31);
        let x, y: number;
        let alreadyExists: boolean;

        do {
            x = Phaser.Math.Between(size / 2, this.game.canvas.width - size / 2);
            y = Phaser.Math.Between(size / 2, this.game.canvas.height - size / 2);
            for (let element of this.stars) {
                alreadyExists = Math.abs(x - element.x) < size && Math.abs(y - element.y) < size;
                if (alreadyExists) {
                    break;
                }
            }
        } while (alreadyExists);

        let star = this.add.image(x, y, "space", id);
        star.setDisplaySize(size, size);
        this.stars.push(star);

        this.tweens.add({
            targets: star,
            alpha: Phaser.Math.FloatBetween(0.4, 0.7),
            delay: Phaser.Math.Between(0, 600),
            repeatDelay: 70,
            hold: Phaser.Math.Between(5000, 10000),
            ease: 'Back',
            repeat: -1,
            yoyo: true,
            onStart: function (tween) {
                tween.timeScale = Phaser.Math.FloatBetween(0.8, 2);
            },
            onYoyo: function (tween) {
                tween.timeScale = Phaser.Math.FloatBetween(0.6, 1.5);
            }
        });
    }
}