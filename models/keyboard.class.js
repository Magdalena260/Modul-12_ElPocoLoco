<<<<<<< HEAD
=======
/**
 * Handles keyboard input for the game.
 * Tracks pressed movement and action keys.
 */
>>>>>>> aa281ad (Update)
class Keyboard {

    LEFT = false;
    RIGHT = false;
<<<<<<< HEAD
=======
    UP = false;
    DOWN = false;
>>>>>>> aa281ad (Update)
    SPACE = false;
    D = false;

    constructor() {
        this.bindEvents();
    }

    bindEvents() {

        window.addEventListener('keydown', (e) => {
            this.setKeyState(e.code, true);
        });

        window.addEventListener('keyup', (e) => {
            this.setKeyState(e.code, false);
        });
    }

    setKeyState(code, state) {

        switch (code) {

            case 'ArrowRight':
                this.RIGHT = state;
                break;

            case 'ArrowLeft':
                this.LEFT = state;
                break;

            case 'ArrowUp':
                this.UP = state;
                break;

            case 'ArrowDown':
                this.DOWN = state;
                break;

            case 'Space':
                this.SPACE = state;
                break;

            case 'KeyD':
                this.D = state;
                break;
        }
    }
}