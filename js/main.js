import { GameScene } from '../my-threejs-project/src/game/scene.js';
import { Spaceship } from '../my-threejs-project/src/game/spaceship.js';
import { Controls } from '../my-threejs-project/src/game/controls.js';
import { Physics } from '../my-threejs-project/src/game/physics.js';

class Game {
    constructor() {
        this.scene = new GameScene();
        this.largeShip = new Spaceship(this.scene);
        this.controls = new Controls(this.scene.camera, this.largeShip, null);
        this.physics = new Physics([this.largeShip]);

        this.animate = this.animate.bind(this);
        this.animate();
    }

    animate() {
        requestAnimationFrame(this.animate);
        this.physics.update();
        this.controls.update();
        this.scene.render();
    }
}

new Game();