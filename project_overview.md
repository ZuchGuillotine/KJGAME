# Space Game Project Overview

## Introduction
This is a 3D space combat game built using Three.js and Vite. The game features spacecraft navigation, combat mechanics, and physics-based interactions in a Mars-based environment with realistic terrain generation.

## Technology Stack
- **Framework**: Three.js for 3D rendering
- **Build Tool**: Vite for modern development experience
- **Language**: JavaScript (ES6+)

## Project Structure
The project is organized into a modern Vite application structure, with the main game logic residing in the `my-threejs-project` directory. See `filestructure.md` for detailed file organization.

## Module System
The project uses ES6 modules with named exports/imports for better consistency and type safety:
- All class definitions use named exports: `export class ClassName`
- Imports use corresponding named imports: `import { ClassName } from './file.js'`
- No default exports are used to maintain consistency
- Example structure:
  ```javascript
  // Export
  export class GameScene { ... }
  
  // Import
  import { GameScene } from './scene.js';
  ```

## Core Components

### Scene Management
- `scene.js` - Handles the primary 3D environment setup
  - Exports: `{ GameScene }`
  - Procedural Mars terrain generation
    - Height mapping with multiple noise layers
    - Dynamic color variation system
    - Normal mapping for surface detail
    - Roughness mapping for material properties
    - Crater generation system
  - Advanced lighting system
    - Mars-appropriate ambient lighting
    - Atmospheric scattering simulation
    - Shadow mapping support
  - Environmental features
    - Dynamic sky gradient
    - Scattered rock formations
    - Varied surface materials

### Player Systems
- `game/spaceship.js` - Main player spacecraft implementation
  - Exports: `{ Spaceship }`
  - Handles spacecraft movement and state
  - Manages spacecraft properties and capabilities

- `game/controls.js` - Player input handling
  - Exports: `{ Controls }`
  - First-person perspective controls
  - Spacecraft piloting mechanics

### Combat Systems
- `game/weapons.js` - Weapon system implementation
  - Exports: `{ Weapons }`
  - Laser weapons
  - Combat mechanics

- `game/smallcraft.js` - Implementation of smaller spacecraft
  - Exports: `{ SmallCraft }`
  - AI-controlled craft
  - Enemy or allied vessels

### Game Mechanics
- `game/physics.js` - Physics system implementation
  - Exports: `{ Physics }`
  - Collision detection
  - Space movement physics

### Support Systems
- `game/utils.js` - Utility functions and helpers
- `style.css` - Global styling

## Environment Features

### Mars Terrain System
1. **Procedural Generation**
   - Multi-layered noise for natural terrain variation
   - Crater system for impact features
   - Dynamic height mapping

2. **Surface Materials**
   - Color variation system with four primary Mars colors:
     - Base Mars red (0xc1440e)
     - Lighter beige-red (0xd4845f)
     - Darker rust (0xa34b1f)
     - Light beige (0xe6c8a0)
   - Procedural blending between colors
   - Normal mapping for surface detail
   - Variable roughness mapping

3. **Rock Formations**
   - Procedurally placed rock formations
   - Multiple size variations
   - Color variations:
     - Brown (0xa0522d)
     - Lighter brown (0xb25d35)
     - Darker brown (0x8b4513)
     - Tan (0xcd853f)

4. **Atmospheric Effects**
   - Dynamic sky gradient
   - Mars-appropriate lighting
   - Atmospheric scattering simulation
   - Shadow mapping for enhanced realism

## Getting Started
1. Navigate to the `my-threejs-project` directory
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`

## Development Guidelines
1. All game-specific logic should be placed in the `src/game` directory
2. Maintain separation of concerns between scene management, controls, and game logic
3. Use the physics system for all movement and collision calculations
4. Document any new features or significant changes
5. Use named exports/imports consistently throughout the project
6. Avoid default exports to maintain codebase consistency

## Current Features
- Realistic Mars environment with procedural terrain
- Advanced material system with color variation
- Dynamic lighting and atmospheric effects
- Spacecraft control system
- Weapon systems
- Physics-based movement
- Multiple spacecraft types (main player ship and smaller craft)

## Future Development
Consider contributing to these areas:
- Enhanced combat mechanics
- Additional spacecraft types
- Mission/objective system
- Improved physics interactions
- Additional environmental features
- Sound effects and music
- Weather effects and dust storms
- Day/night cycle

## Contributing
1. Review the existing codebase structure
2. Follow the established patterns for new features
3. Test thoroughly, especially physics interactions
4. Update documentation for significant changes
5. Use named exports/imports for all new modules

## Project Status
Active development - Core systems implemented with standardized module system using named exports/imports. Enhanced Mars environment system with procedural terrain generation and realistic materials. Expanding features and gameplay elements. 