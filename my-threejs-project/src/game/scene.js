import * as THREE from 'three';
import { SimplexNoise } from 'three/examples/jsm/math/SimplexNoise';

export class GameScene {
    constructor() {
        this.scene = new THREE.Scene();
        
        // Set up camera with better initial position
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        this.camera.position.set(0, 5, 10);
        this.camera.lookAt(0, 0, 0);
        
        // Set up renderer with better color handling
        this.renderer = new THREE.WebGLRenderer({ 
            antialias: true,
            logarithmicDepthBuffer: true 
        });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.0;
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        document.body.appendChild(this.renderer.domElement);
        
        // Load textures first, then create environment
        this.loadTextures().then(() => {
            this.createMarsEnvironment();
            this.setupLighting();
        });

        // Add window resize handler
        window.addEventListener('resize', () => this.resize());
    }

    async loadTextures() {
        const textureLoader = new THREE.TextureLoader();
        const loadTexture = (url) => new Promise((resolve) => textureLoader.load(url, resolve));
        
        // Generate procedural textures
        this.heightMap = this.generateHeightMap();
        this.normalMap = this.generateNormalMap(this.heightMap);
        this.roughnessMap = this.generateRoughnessMap();
        this.colorMap = this.generateColorMap();
    }

    generateHeightMap() {
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = 1024;
        const ctx = canvas.getContext('2d');
        const noise = new SimplexNoise();
        
        // Create height data
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        for (let y = 0; y < canvas.height; y++) {
            for (let x = 0; x < canvas.width; x++) {
                const i = (y * canvas.width + x) * 4;
                
                // Multiple layers of noise for more interesting terrain
                let value = 0;
                value += noise.noise(x * 0.005, y * 0.005) * 0.5;
                value += noise.noise(x * 0.01, y * 0.01) * 0.25;
                value += noise.noise(x * 0.02, y * 0.02) * 0.125;
                
                // Add some craters
                const craterValue = this.generateCraters(x, y, canvas.width, canvas.height);
                value = (value + craterValue) * 0.5;
                
                const color = Math.floor((value + 1) * 0.5 * 255);
                imageData.data[i] = color;
                imageData.data[i + 1] = color;
                imageData.data[i + 2] = color;
                imageData.data[i + 3] = 255;
            }
        }
        
        ctx.putImageData(imageData, 0, 0);
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        return texture;
    }

    generateCraters(x, y, width, height) {
        let value = 0;
        const craters = [
            { x: width * 0.3, y: height * 0.4, radius: 100, depth: 0.7 },
            { x: width * 0.7, y: height * 0.6, radius: 150, depth: 0.8 },
            { x: width * 0.5, y: height * 0.2, radius: 80, depth: 0.6 }
        ];
        
        craters.forEach(crater => {
            const dx = x - crater.x;
            const dy = y - crater.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            if (distance < crater.radius) {
                const craterDepth = Math.cos((distance / crater.radius) * Math.PI) * crater.depth;
                value -= craterDepth;
            }
        });
        
        return value;
    }

    generateNormalMap(heightMap) {
        // Create normal map from height map
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = 1024;
        const ctx = canvas.getContext('2d');
        
        // Draw height map to get pixel data
        ctx.drawImage(heightMap.image, 0, 0);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const normalData = ctx.createImageData(canvas.width, canvas.height);
        
        for (let y = 0; y < canvas.height; y++) {
            for (let x = 0; x < canvas.width; x++) {
                const i = (y * canvas.width + x) * 4;
                
                // Calculate height differences for normal
                const left = x > 0 ? imageData.data[i - 4] : imageData.data[i];
                const right = x < canvas.width - 1 ? imageData.data[i + 4] : imageData.data[i];
                const up = y > 0 ? imageData.data[i - canvas.width * 4] : imageData.data[i];
                const down = y < canvas.height - 1 ? imageData.data[i + canvas.width * 4] : imageData.data[i];
                
                // Calculate normal vector
                const dx = (right - left) / 255;
                const dy = (down - up) / 255;
                const dz = 0.5;
                
                // Normalize and convert to RGB
                const length = Math.sqrt(dx * dx + dy * dy + dz * dz);
                normalData.data[i] = ((dx / length) * 0.5 + 0.5) * 255;
                normalData.data[i + 1] = ((dy / length) * 0.5 + 0.5) * 255;
                normalData.data[i + 2] = ((dz / length) * 0.5 + 0.5) * 255;
                normalData.data[i + 3] = 255;
            }
        }
        
        ctx.putImageData(normalData, 0, 0);
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        return texture;
    }

    generateRoughnessMap() {
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = 1024;
        const ctx = canvas.getContext('2d');
        const noise = new SimplexNoise();
        
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        for (let y = 0; y < canvas.height; y++) {
            for (let x = 0; x < canvas.width; x++) {
                const i = (y * canvas.width + x) * 4;
                
                let value = noise.noise(x * 0.02, y * 0.02) * 0.5 + 0.5;
                value = Math.max(0.4, Math.min(0.9, value)); // Keep roughness between 0.4 and 0.9
                
                const color = Math.floor(value * 255);
                imageData.data[i] = color;
                imageData.data[i + 1] = color;
                imageData.data[i + 2] = color;
                imageData.data[i + 3] = 255;
            }
        }
        
        ctx.putImageData(imageData, 0, 0);
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        return texture;
    }

    generateColorMap() {
        const canvas = document.createElement('canvas');
        canvas.width = canvas.height = 1024;
        const ctx = canvas.getContext('2d');
        const noise = new SimplexNoise();
        
        const imageData = ctx.createImageData(canvas.width, canvas.height);
        
        // Mars colors
        const colors = [
            new THREE.Color(0xc1440e), // Base Mars red
            new THREE.Color(0xd4845f), // Lighter beige-red
            new THREE.Color(0xa34b1f), // Darker rust
            new THREE.Color(0xe6c8a0)  // Light beige
        ];
        
        for (let y = 0; y < canvas.height; y++) {
            for (let x = 0; x < canvas.width; x++) {
                const i = (y * canvas.width + x) * 4;
                
                // Create varied noise patterns for color mixing
                let noiseValue = noise.noise(x * 0.005, y * 0.005) * 0.5 + 0.5;
                // Add some smaller detail
                noiseValue += (noise.noise(x * 0.02, y * 0.02) * 0.25 + 0.25) * 0.3;
                
                // Mix colors based on noise
                let finalColor = new THREE.Color();
                if (noiseValue < 0.3) {
                    finalColor.lerpColors(colors[0], colors[1], noiseValue / 0.3);
                } else if (noiseValue < 0.6) {
                    finalColor.lerpColors(colors[1], colors[2], (noiseValue - 0.3) / 0.3);
                } else {
                    finalColor.lerpColors(colors[2], colors[3], (noiseValue - 0.6) / 0.4);
                }
                
                imageData.data[i] = Math.floor(finalColor.r * 255);
                imageData.data[i + 1] = Math.floor(finalColor.g * 255);
                imageData.data[i + 2] = Math.floor(finalColor.b * 255);
                imageData.data[i + 3] = 255;
            }
        }
        
        ctx.putImageData(imageData, 0, 0);
        const texture = new THREE.CanvasTexture(canvas);
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        return texture;
    }
    
    createMarsEnvironment() {
        // Create detailed ground geometry with more vertices for better detail
        const groundGeometry = new THREE.PlaneGeometry(1000, 1000, 256, 256);
        
        // Create material with detailed texturing
        const groundMaterial = new THREE.MeshStandardMaterial({
            map: this.colorMap, // Use our new color map
            roughnessMap: this.roughnessMap,
            normalMap: this.normalMap,
            normalScale: new THREE.Vector2(2, 2),
            displacementMap: this.heightMap,
            displacementScale: 30,
            displacementBias: -10,
            roughness: 0.8,
            metalness: 0.2,
            side: THREE.DoubleSide
        });

        const ground = new THREE.Mesh(groundGeometry, groundMaterial);
        ground.rotation.x = -Math.PI / 2;
        ground.position.y = -2;
        ground.receiveShadow = true;
        this.scene.add(ground);

        // Add some scattered rocks with varied colors
        this.addRocks();

        // Create sky gradient
        const verticalGradient = new THREE.Texture(this.generateMarsGradient());
        verticalGradient.needsUpdate = true;
        this.scene.background = verticalGradient;
    }

    addRocks() {
        const rockGeometries = [
            new THREE.DodecahedronGeometry(2, 1),
            new THREE.DodecahedronGeometry(1.5, 1),
            new THREE.DodecahedronGeometry(1, 1)
        ];

        // Add more color variation to rocks as well
        const rockColors = [
            0xa0522d, // Original brown
            0xb25d35, // Lighter brown
            0x8b4513, // Darker brown
            0xcd853f  // Tan
        ];

        // Add scattered rocks
        for (let i = 0; i < 50; i++) {
            const rockGeometry = rockGeometries[Math.floor(Math.random() * rockGeometries.length)];
            const rockMaterial = new THREE.MeshStandardMaterial({
                color: rockColors[Math.floor(Math.random() * rockColors.length)],
                roughness: 0.9,
                metalness: 0.1
            });
            
            const rock = new THREE.Mesh(rockGeometry, rockMaterial);
            
            // Random position within a radius
            const angle = Math.random() * Math.PI * 2;
            const radius = Math.random() * 100 + 20; // Between 20 and 120 units from center
            rock.position.x = Math.cos(angle) * radius;
            rock.position.z = Math.sin(angle) * radius;
            rock.position.y = -1;
            
            // Random rotation and scale
            rock.rotation.x = Math.random() * Math.PI;
            rock.rotation.y = Math.random() * Math.PI;
            rock.rotation.z = Math.random() * Math.PI;
            const scale = 0.5 + Math.random() * 1.5;
            rock.scale.set(scale, scale, scale);
            
            rock.castShadow = true;
            rock.receiveShadow = true;
            this.scene.add(rock);
        }
    }

    generateMarsGradient() {
        const canvas = document.createElement('canvas');
        canvas.width = 2;
        canvas.height = 512;
        const context = canvas.getContext('2d');
        
        // Create gradient
        const gradient = context.createLinearGradient(0, 0, 0, 512);
        gradient.addColorStop(0, '#1c1c2a'); // Dark space color at top
        gradient.addColorStop(0.4, '#5c2f1c'); // Transition color
        gradient.addColorStop(1, '#c1440e'); // Mars surface color at horizon
        
        context.fillStyle = gradient;
        context.fillRect(0, 0, 2, 512);
        
        return canvas;
    }
    
    setupLighting() {
        // Ambient light with Mars-like reddish tint
        const ambientLight = new THREE.AmbientLight(0xff8f66, 0.3);
        this.scene.add(ambientLight);
        
        // Main sunlight (dimmer than Earth due to Mars' distance from Sun)
        const sunLight = new THREE.DirectionalLight(0xffffff, 0.8);
        sunLight.position.set(50, 100, 50);
        this.scene.add(sunLight);
        
        // Add subtle atmospheric light scatter
        const hemisphereLight = new THREE.HemisphereLight(0xff8f66, 0x080820, 0.5);
        this.scene.add(hemisphereLight);
    }
    
    addToScene(object) {
        this.scene.add(object);
    }

    render() {
        this.renderer.render(this.scene, this.camera);
    }
    
    update() {
        // Add any scene updates here
    }
    
    resize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}