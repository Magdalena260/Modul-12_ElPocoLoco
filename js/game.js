let canvas;
let world;
let keyboard;
let muted = false;

 // Funktionsaufruf Keyboard starten (Tastatur wird aktiviert)
function init() {
    canvas = document.getElementById('canvas');
    keyboard = new Keyboard();
}


 // Funktionsaufruf Keyboard starten (Tastatur wird aktiviert)
function startGame() {

    document.getElementById('startScreen').style.display = 'none';

    // World starten
    world = new World(canvas, keyboard);

    // 🔊 Audio sauber starten
    AudioHub.resetAll();
    AudioHub.startMusic();
}


// Mute Button Verknüpfung zu HTML
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