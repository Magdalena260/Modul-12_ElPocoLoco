let canvas;
let world;
let keyboard;
let muted = false;

function init() {
    canvas = document.getElementById('canvas');
    keyboard = new Keyboard();
}

function startGame() {

    document.getElementById('startScreen').style.display = 'none';

    // World starten
    world = new World(canvas, keyboard);

    // 🔊 Audio sauber starten
    AudioHub.resetAll();
    AudioHub.startMusic();
}

// 🔊 MUTE BUTTON
function toggleMute() {

    muted = !muted;

    AudioHub.setMuted(muted);

    document.getElementById('muteBtn').innerText =
        muted ? '🔊 Sound an' : '🔇 Mute';
}

// Init beim Laden
window.addEventListener('load', init);
function showHowToPlay() {
    document.getElementById('howToPlayOverlay').style.display = 'flex';
}

function closeHowToPlay() {
    document.getElementById('howToPlayOverlay').style.display = 'none';
}