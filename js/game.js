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
    // Start Screen ausblenden
    document.getElementById("startScreen").style.display = "none";

    // Overlays verstecken
    document.getElementById("gameOverScreen").style.display = "none";
    document.getElementById("winScreen").style.display = "none";

    // 🧠 WICHTIG: alte World entfernen
    world = new World(canvas, keyboard);

    // 🔊 MUSIK START (FIX)
    AudioHub.startMusic();
}

function restartGame() {
    // Reset UI
    document.getElementById("gameOverScreen").style.display = "none";
    document.getElementById("winScreen").style.display = "none";

    // alte Sounds resetten
    AudioHub.resetAll();

    // neue World erstellen
    world = new World(canvas, keyboard);

    // 🔊 MUSIK WIEDER STARTEN (FIX)
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

function showHowToPlay() {
    document.getElementById("howToPlayOverlay").style.display = "flex";
}

function closeHowToPlay() {
    document.getElementById("howToPlayOverlay").style.display = "none";
}