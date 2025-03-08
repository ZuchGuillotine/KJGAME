export class Physics {
    constructor(objects) {
        this.objects = objects; // Array of ships/craft
    }

    update() {
        // Update all objects
        for (const object of this.objects) {
            if (object && typeof object.update === 'function') {
                object.update();
            }
        }
    }
}