import * as THREE from 'three';

export class Spaceship {
    constructor(scene, position = new THREE.Vector3(0, 50, 0)) {
        this.scene = scene;
        this.mesh = new THREE.Group();

        // Imperial Star Destroyer-inspired geometry (wedge shape)
        const bodyGeometry = new THREE.BufferGeometry();
        const vertices = new Float32Array([
            0, 0, 20,   // Nose
            -15, -5, -20, // Bottom left rear
            15, -5, -20,  // Bottom right rear
            -10, 5, -15,  // Top left rear
            10, 5, -15    // Top right rear
        ]);
        const indices = [
            0, 1, 2,  // Bottom triangle
            0, 3, 4,  // Top triangle
            0, 1, 3,  // Left side
            0, 2, 4,  // Right side
            1, 2, 3,  // Rear bottom
            2, 3, 4   // Rear top
        ];
        bodyGeometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        bodyGeometry.setIndex(indices);
        const bodyMaterial = new THREE.MeshPhongMaterial({
            color: 0x1a1a1a, // Dark gray
            shininess: 50,
            emissive: 0x111111 // Subtle dark glow
        });
        const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
        this.mesh.add(body);

        // Add a subtle red glow (like engine exhausts)
        const glowGeometry = new THREE.SphereGeometry(2, 16, 16);
        const glowMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        glow.position.set(0, -5, -20);
        this.mesh.add(glow);

        this.mesh.position.copy(position);
        this.scene.addToScene(this.mesh);

        this.rotationSpeed = 0.001; // Slow X-axis rotation
        this.smallCraft = null;
    }

    update() {
        // Hover in orbit with slight X-axis rotation
        this.mesh.rotation.x += this.rotationSpeed;
    }

    spawnSmallCraft() {
        const spawnPos = this.mesh.position.clone();
        spawnPos.y -= 10; // Spawn below the ship
        this.smallCraft = new SmallCraft(this.scene, spawnPos);
        return this.smallCraft;
    }
}