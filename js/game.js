let canvas;
let world;
let keyboard;

function init() {

    canvas = document.getElementById('canvas');
    keyboard = new Keyboard();

    world = new World(canvas, keyboard);

    console.log("Game started");
}

// 🔥 WICHTIG: global verfügbar machen
window.init = init;


// ⌨️ KEY INPUT
window.addEventListener("keydown", (e) => {

    switch (e.code) {

        case "ArrowRight":
            keyboard.RIGHT = true;
            break;

        case "ArrowLeft":
            keyboard.LEFT = true;
            break;

        case "Space":
            keyboard.SPACE = true;
            break;

        case "KeyD":
            keyboard.D = true;
            break;
    }
});

window.addEventListener("keyup", (e) => {

    switch (e.code) {

        case "ArrowRight":
            keyboard.RIGHT = false;
            break;

        case "ArrowLeft":
            keyboard.LEFT = false;
            break;

        case "Space":
            keyboard.SPACE = false;
            break;

        case "KeyD":
            keyboard.D = false;
            break;
    }
});

window.onload = init;