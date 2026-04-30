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

    world = new World(canvas, keyboard);

    AudioHub.resetAll();

    setTimeout(() => {
        AudioHub.startMusic();
    }, 200);
}

// 🔇 MUTE BUTTON
function toggleMute() {
    muted = !muted;

    AudioHub.setMuted(muted);

    document.getElementById('muteBtn').innerText =
        muted ? '🔊 Sound an' : '🔇 Mute';
}

window.addEventListener('load', init);