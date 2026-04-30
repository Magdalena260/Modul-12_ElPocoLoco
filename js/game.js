let canvas;
let world;
let keyboard;

function init() {
    canvas = document.getElementById('canvas');
    keyboard = new Keyboard();

    console.log("✔ Init done");
}

function startGame() {

    console.log('🎮 Game started');

    document.getElementById('startScreen').style.display = 'none';

    // 🔥 SICHERHEITS-CHECK
    if (!canvas || !keyboard) {
        console.error("Canvas oder Keyboard fehlt!");
        return;
    }

    // 🔥 WORLD START
    world = new World(canvas, keyboard);

    console.log("🌍 World created");
}

// automatisch init beim Laden
window.addEventListener('load', init);