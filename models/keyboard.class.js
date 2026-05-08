/**
 * Handles keyboard input for the game.
 * Tracks key states for movement and actions.
 */
class Keyboard {

    /** @type {boolean} move left key state */
    LEFT = false;

    /** @type {boolean} move right key state */
    RIGHT = false;

    /** @type {boolean} jump key state (spacebar) */
    SPACE = false;

    /** @type {boolean} action key state (D key) */
    D = false;

    /**
     * Creates a Keyboard instance and binds event listeners.
     */
    constructor() {
        this.bindEvents();
    }

    /**
     * Binds keydown and keyup events to update key states.
     */
    bindEvents() {

        window.addEventListener('keydown', (e) => {

            if (e.keyCode == 39) this.RIGHT = true;
            if (e.keyCode == 37) this.LEFT = true;
            if (e.keyCode == 32) this.SPACE = true;
            if (e.keyCode == 68) this.D = true;
        });

        window.addEventListener('keyup', (e) => {

            if (e.keyCode == 39) this.RIGHT = false;
            if (e.keyCode == 37) this.LEFT = false;
            if (e.keyCode == 32) this.SPACE = false;
            if (e.keyCode == 68) this.D = false;
        });
    }
}