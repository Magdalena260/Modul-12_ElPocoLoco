/**
 * Canvas-Element für das Spiel.
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * Instanz der Spielwelt.
 * @type {World}
 */
let world;

/**
 * Tastatur-Input Handler.
 * @type {Keyboard}
 */
let keyboard;

/**
 * Initialisiert das Spiel:
 * - Holt Canvas
 * - Erstellt Keyboard-Listener
 * - Aktiviert Mobile Controls
 * - Entsperrt Audio (Browser Autoplay Fix)
 */
function init() {
    canvas = document.getElementById("canvas");
    keyboard = new Keyboard();

    bindMobileControls();

    AudioHub.unlockAudio();
}

/**
 * Startet ein neues Spiel:
 * - Blendet Startscreen aus
 * - Erstellt neue World Instanz
 * - Startet Musik
 */
function startGame() {
    document.getElementById("startScreen").style.display = "none";
    document.getElementById("gameOverScreen").style.display = "none";
    document.getElementById("winScreen").style.display = "none";

    world = new World(canvas, keyboard);

    AudioHub.startMusic();
}

/**
 * Startet das Spiel neu nach Game Over / Win:
 * - Reset UI Screens
 * - Stoppt & resettet Audio
 * - Erstellt neue World
 * - Startet Musik erneut
 */
function restartGame() {
    document.getElementById("gameOverScreen").style.display = "none";
    document.getElementById("winScreen").style.display = "none";

    AudioHub.resetAll();

    world = new World(canvas, keyboard);

    AudioHub.startMusic();
}

/**
 * Schaltet Sound global an/aus.
 * Aktualisiert zusätzlich Button-Text im UI.
 */
function toggleMute() {
    let muted = !AudioHub.MUSIC.muted;
    AudioHub.setMuted(muted);

    document.getElementById("muteBtn").innerText = muted
        ? "🔇 Muted"
        : "🔊 Sound";
}

/**
 * Bindet Keyboard-Events für Desktop + Mobile Controls.
 * Steuert:
 * - Bewegung (links/rechts/hoch/runter)
 * - Aktionstaste D
 * - Sprung (Space)
 */
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

/**
 * Öffnet "How to Play" Overlay (nur Desktop).
 * Blockiert mobile Ansicht automatisch.
 */
function showHowToPlay() {
    if (window.innerWidth <= 950) return;

    document.getElementById("howToPlayOverlay").style.display = "flex";
}

/**
 * Schließt "How to Play" Overlay.
 */
function closeHowToPlay() {
    document.getElementById("howToPlayOverlay").style.display = "none";
}