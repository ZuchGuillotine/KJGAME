# Space Game Project Overview

## Introduction
This is a 3D space combat game built using Three.js and Vite. The game features spacecraft navigation, combat mechanics, and physics-based interactions in a space environment.

## Technology Stack
- **Framework**: Three.js for 3D rendering
- **Build Tool**: Vite for modern development experience
- **Language**: JavaScript (ES6+)

## Project Structure
The project is organized into a modern Vite application structure, with the main game logic residing in the `my-threejs-project` directory. See `filestructure.md` for detailed file organization.

## Core Components

### Scene Management
- `scene.js` - Handles the primary 3D environment setup
- `game/scene.js` - Manages game-specific scene elements and state

### Player Systems
- `game/spaceship.js` - Main player spacecraft implementation
  - Handles spacecraft movement and state
  - Manages spacecraft properties and capabilities

- `game/controls.js` - Player input handling
  - First-person perspective controls
  - Spacecraft piloting mechanics

### Combat Systems
- `game/weapons.js` - Weapon system implementation
  - Laser weapons
  - Combat mechanics

- `game/smallcraft.js` - Implementation of smaller spacecraft
  - AI-controlled craft
  - Enemy or allied vessels

### Game Mechanics
- `game/physics.js` - Physics system implementation
  - Collision detection
  - Space movement physics

- `game/counter.js` - Game scoring and statistics
  - Score tracking
  - Game state metrics

### Support Systems
- `game/utils.js` - Utility functions and helpers
- `style.css` - Global styling

## Getting Started
1. Navigate to the `my-threejs-project` directory
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`

## Development Guidelines
1. All game-specific logic should be placed in the `src/game` directory
2. Maintain separation of concerns between scene management, controls, and game logic
3. Use the physics system for all movement and collision calculations
4. Document any new features or significant changes

## Current Features
- 3D space environment
- Spacecraft control system
- Weapon systems
- Physics-based movement
- Score tracking
- Multiple spacecraft types (main player ship and smaller craft)

## Future Development
Consider contributing to these areas:
- Enhanced combat mechanics
- Additional spacecraft types
- Mission/objective system
- Improved physics interactions
- Visual effects and particles
- Sound effects and music

## Contributing
1. Review the existing codebase structure
2. Follow the established patterns for new features
3. Test thoroughly, especially physics interactions
4. Update documentation for significant changes

## Project Status
Active development - Core systems implemented, expanding features and gameplay elements. 