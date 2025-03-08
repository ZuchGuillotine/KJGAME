/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 07/03/2025 - 22:19:49
    * 
    * MODIFICATION LOG
    * - Version         : 1.0.0
    * - Date            : 07/03/2025
    * - Author          : 
    * - Modification    : 
**/
import * as THREE from 'three';
import { Spaceship } from './spaceship.js';
import { SmallCraft } from './smallcraft.js';

export class Controls {
    constructor(camera, largeShip, physics) {
        this.camera = camera;
        this.largeShip = largeShip;
        this.activeCraft = largeShip;
        this.physics = physics;
        this.camera.position.set(0, 60, 20); // Above large ship
        this.camera.lookAt(this.largeShip.mesh.position);

        this.movement = { forward: 0, pitch: 0, yaw: 0, roll: 0 };

        document.addEventListener('keydown', this.onKeyDown.bind(this));
        document.addEventListener('keyup', this.onKeyUp.bind(this));
    }

    onKeyDown(event) {
        switch (event.key) {
            case 'w': this.movement.forward = 1; break;
            case 's': this.movement.forward = -1; break;
            case 'a': this.movement.yaw = 0.02; break;
            case 'd': this.movement.yaw = -0.02; break;
            case 'q': this.movement.roll = 0.02; break;
            case 'e': this.movement.roll = -0.02; break;
            case 'r': this.movement.pitch = 0.02; break;
            case 'f': this.movement.pitch = -0.02; break;
            case '1': if (this.activeCraft instanceof SmallCraft) this.activeCraft.setLaserColor('red'); break;
            case '2': if (this.activeCraft instanceof SmallCraft) this.activeCraft.setLaserColor('blue'); break;
            case '3': if (this.activeCraft instanceof SmallCraft) this.activeCraft.setLaserColor('green'); break;
            case ' ': // Spawn small craft
                if (this.activeCraft instanceof Spaceship) {
                    this.activeCraft = this.largeShip.spawnSmallCraft();
                    this.physics.addObject(this.activeCraft);
                    this.camera.position.set(0, 5, 5);
                }
                break;
            case 'Shift': // Fire laser
                if (this.activeCraft instanceof SmallCraft) {
                    this.activeCraft.fireLaser();
                }
                break;
        }
    }

    onKeyUp(event) {
        switch (event.key) {
            case 'w': case 's': this.movement.forward = 0; break;
            case 'a': case 'd': this.movement.yaw = 0; break;
            case 'q': case 'e': this.movement.roll = 0; break;
            case 'r': case 'f': this.movement.pitch = 0; break;
        }
    }

    update() {
        if (this.activeCraft instanceof SmallCraft) {
            this.activeCraft.accelerate(this.movement.forward);
            this.activeCraft.pitch(this.movement.pitch);
            this.activeCraft.yaw(this.movement.yaw);
            this.activeCraft.roll(this.movement.roll);
        }

        this.camera.position.copy(this.activeCraft.mesh.position);
        this.camera.position.y += 5;
        this.camera.position.z += 10;
        this.camera.lookAt(this.activeCraft.mesh.position);
    }
}