import {GameScene} from "./scenes/game-scene";
import {Types, Game} from "phaser";

const config: Types.Core.GameConfig = {
    title: "Starfall",
    width: 800,
    height: 600,
    parent: "game",
    scene: [GameScene], // List of scenes to create; 1st scene is the initial scene.
    physics: {
        default: "matter",
        matter: {
            debug: true
        }
    },
    backgroundColor: "#000000"
};

export class StarfallGame extends Game {
    constructor(config: Types.Core.GameConfig) {
        super(config);
    }
}

window.onload = () => {
    var game = new StarfallGame(config);
}