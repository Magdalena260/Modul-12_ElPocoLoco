let canvas;
let world;
let keyboard;

/**
 * INIT SYSTEM
 */
function init() {

    canvas = document.getElementById("canvas");
    keyboard = new Keyboard();

    // 🔥 Level sicher initialisieren
    initLevel1();

    if (typeof bindMobileControls === "function") {
        bindMobileControls();
    }

    AudioHub?.unlockAudio?.();
}

/**
 * START GAME
 */
function startGame() {

    resetGame();

    document.getElementById("startScreen").style.display = "none";
    document.getElementById("gameOverScreen").style.display = "none";
    document.getElementById("winScreen").style.display = "none";

    // 🔥 World startet erst NACH Level-Init
    world = new World(canvas, keyboard);

    AudioHub?.startMusic?.();
}

/**
 * RESET GAME (clean)
 */
function resetGame() {

    if (world) {
        world.stopAllLoops?.();
        world = null;
    }

    keyboard = new Keyboard();

    // Level neu bauen nach Reset
    initLevel1();
}

/**
 * HOW TO PLAY
 */
function showHowToPlay() {
    const el = document.getElementById("howToPlayOverlay");
    if (el) el.style.display = "flex";
}

function closeHowToPlay() {
    const el = document.getElementById("howToPlayOverlay");
    if (el) el.style.display = "none";
}

/**
 * RESTART
 */
function restartGame() {
    startGame();
}

/**
 * MUTE
 */
function toggleMute() {
    const muted = !AudioHub.MUSIC.muted;
    AudioHub.setMuted(muted);
}