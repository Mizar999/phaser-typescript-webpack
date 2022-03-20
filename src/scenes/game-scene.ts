import "phaser";

export class GameScene extends Phaser.Scene {
    constructor() {
        super({
            key: "GameScene"
        });
    }

    preload(): void {
        this.load.spritesheet("space", "assets/simpleSpace_tilesheet.png", { frameWidth: 128, frameHeight: 128 });
    }

    create(): void {
        let count = Phaser.Math.Between(15, 20);
        while(count > 0) {
            this.addStar();
            count--;
        }
    }

    private addStar(): void {
        let size = 28;
        let x = Phaser.Math.Between(size / 2, 800 - size / 2);
        let y = Phaser.Math.Between(size / 2, 600 - size / 2);
        let id = Phaser.Math.Between(28, 31);
        let star = this.add.image(x, y, "space", id);
        star.setDisplaySize(size, size);
    }
}