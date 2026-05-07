let canvas;
let world;
let keyboard;

function init() {
    canvas = document.getElementById("canvas");
    keyboard = new Keyboard();

    bindMobileControls();

    AudioHub.unlockAudio();
}

function startGame() {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("gameOverScreen").style.display = "none";
    document.getElementById("winScreen").style.display = "none";

    world = new World(canvas, keyboard);

    AudioHub.startMusic();
}

function restartGame() {
    document.getElementById("gameOverScreen").style.display = "none";
    document.getElementById("winScreen").style.display = "none";

    AudioHub.resetAll();

    world = new World(canvas, keyboard);

    AudioHub.startMusic();
}

function toggleMute() {
    let muted = !AudioHub.MUSIC.muted;
    AudioHub.setMuted(muted);

    document.getElementById("muteBtn").innerText = muted
        ? "🔇 Muted"
        : "🔊 Sound";
}

function bindMobileControls() {

    document.addEventListener("keydown", (e) => {
        if (e.keyCode === 39) keyboard.RIGHT = true;
        if (e.keyCode === 37) keyboard.LEFT = true;
        if (e.keyCode === 38) keyboard.UP = true;
        if (e.keyCode === 40) keyboard.DOWN = true;
        if (e.keyCode === 68) keyboard.D = true;
        if (e.keyCode === 32) keyboard.SPACE = true;
    });

    document.addEventListener("keyup", (e) => {
        if (e.keyCode === 39) keyboard.RIGHT = false;
        if (e.keyCode === 37) keyboard.LEFT = false;
        if (e.keyCode === 38) keyboard.UP = false;
        if (e.keyCode === 40) keyboard.DOWN = false;
        if (e.keyCode === 68) keyboard.D = false;
        if (e.keyCode === 32) keyboard.SPACE = false;
    });
}

/* =========================
   FIX: HOW TO PLAY MOBILE BLOCK
========================= */
function showHowToPlay() {

    // ❌ IM RESPONSIVE NICHT ÖFFNEN
    if (window.innerWidth <= 950) return;

    document.getElementById("howToPlayOverlay").style.display = "flex";
}

function closeHowToPlay() {
    document.getElementById("howToPlayOverlay").style.display = "none";
}