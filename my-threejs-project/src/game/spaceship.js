import * as THREE from 'three';

export class Spaceship {
    constructor(gameScene) {
        // Create a simple spaceship geometry (temporary placeholder)
        const geometry = new THREE.ConeGeometry(1, 2, 8);
        const material = new THREE.MeshPhongMaterial({ 
            color: 0x00ff00,
            flatShading: true
        });
        
        this.mesh = new THREE.Mesh(geometry, material);
        this.mesh.rotation.x = Math.PI / 2; // Rotate to point forward
        
        // Add to scene
        gameScene.scene.add(this.mesh);
        
        // Initialize position and velocity
        this.position = this.mesh.position;
        this.velocity = new THREE.Vector3();
        this.rotation = new THREE.Euler();
    }

    update() {
        // Update position based on velocity
        this.position.add(this.velocity);
        this.mesh.rotation.copy(this.rotation);
    }

    // Add methods for movement
    setVelocity(x, y, z) {
        this.velocity.set(x, y, z);
    }

    setRotation(x, y, z) {
        this.rotation.set(x, y, z);
    }
}