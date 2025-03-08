import * as THREE from 'three';
import { GameScene } from './scene.js';
import { Spaceship } from './spaceship.js';
import { Physics } from './physics.js';
import { Controls } from './controls.js';

export class Game {
    constructor() {
        this.scene = new GameScene();
        this.largeShip = new Spaceship(this.scene);
        this.physics = new Physics([this.largeShip]);
        this.controls = new Controls(this.scene.camera, this.largeShip, this.physics);

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