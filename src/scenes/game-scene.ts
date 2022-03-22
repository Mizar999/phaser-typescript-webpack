import "phaser";

export class GameScene extends Phaser.Scene {
    stars: Phaser.GameObjects.Image[];

    constructor() {
        super({
            key: "GameScene"
        });

        this.stars = [];
    }

    preload(): void {
        this.load.spritesheet("space", "assets/simpleSpace_tilesheet.png", { frameWidth: 128, frameHeight: 128 });
    }

    create(): void {
        let count = Phaser.Math.Between(30, 35);
        while (count > 0) {
            this.addStar();
            count--;
        }

        let size = 25;
        let temp = this.add.rectangle(0, this.game.canvas.height - size, this.game.canvas.width, size, 0x005596, 0.4);
        temp.setOrigin(0, 0);
    }

    private addStar(): void {
        let size = 26;
        let id = Phaser.Math.Between(28, 31);
        let y: number;
        let x: number;
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
            delay: Phaser.Math.Between(0, 800),
            repeatDelay: 70,
            hold: Phaser.Math.Between(5000, 10000),
            ease: 'Back',
            repeat: -1,
            yoyo: true,
            onStart: function (tween) {
                tween.timeScale = Phaser.Math.FloatBetween(1, 4);
            },
            onYoyo: function (tween) {
                tween.timeScale = Phaser.Math.FloatBetween(0.4, 1.5);
            }
        });
    }
}