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

    // 🔥 Sicherheitscheck
    if (!canvas || !keyboard) {
        console.error("Canvas oder Keyboard fehlt!");
        return;
    }

    // 🌍 WORLD START
    world = new World(canvas, keyboard);

    console.log("🌍 World created");

    // 🔊 AUDIO FIX (WICHTIG!)
    enableAudio();
}

// 🎵 AUDIO FREISCHALTUNG (Browser-safe)
function enableAudio() {

    // einmaliger User-Klick = erlaubt Sound
    const unlock = () => {
        AudioHub.startMusic();

        console.log("🔊 Musik gestartet");

        document.removeEventListener("click", unlock);
    };

    document.addEventListener("click", unlock);
}

// automatisch init beim Laden
window.addEventListener('load', init);