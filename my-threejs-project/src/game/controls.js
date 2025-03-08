/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 07/03/2025 - 21:31:54
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 07/03/2025
    * - Author          : 
    * - Modification    : 
**/
import * as THREE from 'three';

export class Controls {
    constructor(camera, spaceship) {
        this.camera = camera;
        this.spaceship = spaceship;
        this.keys = {};
        
        // Set up event listeners
        window.addEventListener('keydown', (e) => this.keys[e.key] = true);
        window.addEventListener('keyup', (e) => this.keys[e.key] = false);
    }

    update() {
        // Basic movement controls
        const moveSpeed = 0.1;
        const rotateSpeed = 0.02;

        if (this.keys['ArrowUp']) {
            this.spaceship.setVelocity(0, moveSpeed, 0);
        } else if (this.keys['ArrowDown']) {
            this.spaceship.setVelocity(0, -moveSpeed, 0);
        } else {
            this.spaceship.setVelocity(0, 0, 0);
        }

        if (this.keys['ArrowLeft']) {
            this.spaceship.setRotation(0, 0, rotateSpeed);
        } else if (this.keys['ArrowRight']) {
            this.spaceship.setRotation(0, 0, -rotateSpeed);
        } else {
            this.spaceship.setRotation(0, 0, 0);
        }
    }
}