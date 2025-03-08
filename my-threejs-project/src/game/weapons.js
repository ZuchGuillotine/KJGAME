import * as THREE from 'three';

class Weapons {
    constructor(craft) {
        this.craft = craft;
        this.scene = craft.scene;
        this.lasers = [];
    }

    fireLaser() {
        // Create laser beam
        const laserGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2);
        const laserMaterial = new THREE.MeshPhongMaterial({ 
            color: 0x00ff00,
            emissive: 0x00ff00
        });
        const laser = new THREE.Mesh(laserGeometry, laserMaterial);
        
        // Position laser at craft's position
        laser.position.copy(this.craft.mesh.position);
        laser.rotation.x = Math.PI / 2; // Point forward
        
        this.scene.addToScene(laser);
        this.lasers.push({
            mesh: laser,
            velocity: new THREE.Vector3(0, 0, -2), // Forward velocity
            lifetime: 60 // frames before removal
        });
    }

    update() {
        // Update laser positions and remove old ones
        this.lasers = this.lasers.filter(laser => {
            laser.mesh.position.add(laser.velocity);
            laser.lifetime--;
            
            if (laser.lifetime <= 0) {
                this.scene.scene.remove(laser.mesh);
                return false;
            }
            return true;
        });
    }
}

export { Weapons };
