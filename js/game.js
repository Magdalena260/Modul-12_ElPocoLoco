let canvas;
let world;
let keyboard;

let gameStarted = false;

function init() {

    canvas = document.getElementById('canvas');
    keyboard = new Keyboard();

    // 🎮 Start Button Listener
    document.getElementById('startBtn').addEventListener('click', startGame);
}

function startGame() {

    if (gameStarted) return;
    gameStarted = true;

    // 🟡 Startscreen ausblenden
    let screen = document.getElementById('startScreen');
    if (screen) screen.style.display = 'none';

    // 🌍 World starten
    world = new World(canvas, keyboard);

    console.log("🎮 Game started");
}

/* =========================
   ⌨️ KEYBOARD INPUT
========================= */

window.addEventListener("keydown", (e) => {

    if (!keyboard) return;

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

    if (!keyboard) return;

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