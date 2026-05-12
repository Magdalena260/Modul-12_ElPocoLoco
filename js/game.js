let canvas;
let world;
let keyboard;

let muted = false;

function init() {

    canvas = document.getElementById("canvas");
    keyboard = new Keyboard();

    initLevel1();

    bindMobileControls();

    AudioHub?.unlockAudio?.();
}

function startGame() {

    resetGame();

    document.getElementById("startScreen").style.display = "none";
    document.getElementById("gameOverScreen").style.display = "none";
    document.getElementById("winScreen").style.display = "none";

    world = new World(canvas, keyboard);

    AudioHub?.startMusic?.();
}

function resetGame() {

    if (world) {
        world = null;
    }

    keyboard = new Keyboard();
    initLevel1();
}

function showHowToPlay() {
    document.getElementById("howToPlayOverlay").style.display = "flex";
}

function closeHowToPlay() {
    document.getElementById("howToPlayOverlay").style.display = "none";
}

function restartGame() {
    startGame();
}

// 🔊 FIXED TOGGLE
function toggleMute() {

    muted = !muted;

    AudioHub.setMuted(muted);

    const btn = document.getElementById("muteBtn");

    btn.innerText = muted ? "🔇 Sound OFF" : "🔊 Sound ON";
}