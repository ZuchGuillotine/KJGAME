import * as THREE from 'three';
import { Weapons } from './weapons.js';

class SmallCraft {
    constructor(scene, spawnPosition) {
        this.scene = scene;
        this.mesh = new THREE.Group();

        // Simple craft body
        const bodyGeometry = new THREE.ConeGeometry(2, 5, 16);
        const bodyMaterial = new THREE.MeshPhongMaterial({ color: 0xff0000 });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        this.mesh.add(body);

        this.mesh.position.copy(spawnPosition);
        this.mesh.position.y -= 5; // Exit below the large ship
        this.scene.addToScene(this.mesh);

        this.velocity = new THREE.Vector3(0, 0, 0);
        this.weapons = new Weapons(this);
    }

    update() {
        this.mesh.position.add(this.velocity);
        this.velocity.multiplyScalar(0.95); // Faster damping than large ship
        this.weapons.update();
    }

    fireLaser() {
        this.weapons.fireLaser();
    }
}

export { SmallCraft };