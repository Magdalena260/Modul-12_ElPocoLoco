/**
 * Represents a game level containing all game entities.
 * Includes enemies, clouds, background objects, coins and bottles.
 */
class Level {

    /** @type {Array} list of enemies in the level */
    enemies;

    /** @type {Array} list of clouds in the level */
    clouds;

    /** @type {Array} background objects for parallax scenery */
    backgroundObjects;

    /** @type {Array} collectible coins */
    coins;

    /** @type {Array} collectible bottles */
    bottles;

    /** @type {number} x-coordinate marking the end of the level */
    level_end_x = 712 * 3;

    /**
     * Creates a Level instance with all game objects.
     * @param {Array} enemies - enemy objects
     * @param {Array} clouds - cloud objects
     * @param {Array} backgroundObjects - background layers
     * @param {Array} coins - coin collectibles
     * @param {Array} bottles - bottle collectibles
     */
    constructor(enemies, clouds, backgroundObjects, coins, bottles) {

        this.enemies = enemies;
        this.clouds = clouds;
        this.backgroundObjects = backgroundObjects;
        this.coins = coins;
        this.bottles = bottles;
    }
}