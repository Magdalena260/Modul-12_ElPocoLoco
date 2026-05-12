/**
 * Represents a collectible bottle in the game world.
 * The bottle can be picked up or thrown by the player.
 */
class Bottle extends MovableObject {

    /**
     * Collision offset for more precise pickup detection
     */
    offset = {
        top: 15,
        left: 15,
        right: 15,
        bottom: 15
    };

    /**
     * Creates a bottle object at a given position.
     * @param {number} x - X position of the bottle.
     * @param {number} y - Y position of the bottle.
     */
    constructor(x, y) {
        super();

        this.x = x;
        this.y = y;

        this.width = 100;
        this.height = 100;

        this.loadImage('img/6_salsa_bottle/1_salsa_bottle_on_ground.png');
    }
}