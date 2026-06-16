<<<<<<< HEAD
class Bottle extends MovableObject {

=======
/**
 * Represents a collectible salsa bottle in the game world.
 */
class Bottle extends MovableObject {

    /**
     * Collision offset.
     * Smaller hitbox = fairer pickup.
     *
     * Pepe collected bottles too early.
     *
     * @type {{
     * top:number,
     * left:number,
     * right:number,
     * bottom:number
     * }}
     */
    offset = {
        top: 25,
        left: 25,
        right: 25,
        bottom: 25
    };

    /**
     * Creates a collectible bottle.
     *
     * @param {number} x
     * @param {number} y
     */
>>>>>>> aa281ad (Update)
    constructor(x, y) {
        super();

        this.x = x;
        this.y = y;

        this.width = 80;
        this.height = 80;

        this.loadImage(
            'img/6_salsa_bottle/1_salsa_bottle_on_ground.png'
        );
    }
}