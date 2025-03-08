/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 07/03/2025 - 21:31:03
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 07/03/2025
    * - Author          : 
    * - Modification    : 
**/
import { GameScene } from './game/scene.js';
import { Spaceship } from './game/spaceship.js';
import { Controls } from './game/controls.js';
import { Physics } from './game/physics.js';
import * as THREE from 'three';
import { SmallCraft } from './game/smallcraft.js';

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