/**
    * @description      : 
    * @author           : 
    * @group            : 
    * @created          : 07/03/2025 - 23:10:35
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

export class Physics {
    constructor(objects) {
        this.objects = objects; // Array of ships/craft
    }

    update() {
        this.objects.forEach(obj => {
            obj.update();

            // Keep large ships in orbit (Y > 40)
            if (obj instanceof Spaceship && obj.mesh.position.y < 40) {
                obj.mesh.position.y = 40;
            }

            // Small craft gravity pull towards planet
            if (obj instanceof SmallCraft) {
                const planetPos = new THREE.Vector3(0, -100, -200);
                const gravity = planetPos.clone().sub(obj.mesh.position).normalize().multiplyScalar(-0.001);
                obj.velocity.add(gravity);
            }
        });
    }

    addObject(obj) {
        this.objects.push(obj);
    }
}