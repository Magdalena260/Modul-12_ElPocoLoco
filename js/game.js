let canvas;
let world;
let keyboard;

function init() {
    canvas = document.getElementById('canvas');
    keyboard = new Keyboard();

    world = new World(canvas, keyboard);

    console.log("Game started");
}

// KEYDOWN
window.addEventListener("keydown", (e) => {
    if (e.keyCode == 39) keyboard.RIGHT = true;
    if (e.keyCode == 37) keyboard.LEFT = true;
    if (e.keyCode == 32) keyboard.SPACE = true;
});

// KEYUP
window.addEventListener("keyup", (e) => {
    if (e.keyCode == 39) keyboard.RIGHT = false;
    if (e.keyCode == 37) keyboard.LEFT = false;
    if (e.keyCode == 32) keyboard.SPACE = false;
});