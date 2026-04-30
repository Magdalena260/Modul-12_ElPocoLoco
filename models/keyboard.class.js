class Keyboard {

    LEFT = false;
    RIGHT = false;
    SPACE = false;
    D = false;

    constructor() {
        this.bindEvents();
    }

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