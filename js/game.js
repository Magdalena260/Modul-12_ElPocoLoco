/**
 * @type {HTMLCanvasElement}
 */
let canvas;

/**
 * @type {World}
 */
let world;

/**
 * @type {Keyboard}
 */
let keyboard;

/**
 * @type {boolean}
 */
let gameStarted = false;

/**
 * Stores all active interval IDs to allow full cleanup on restart.
 * @type {number[]}
 */
let activeIntervals = [];

/**
 * Initializes the game application.
 */
function init() {

    canvas = document.getElementById('canvas');

    if (!canvas) {
        console.error("Canvas not found!");
        return;
    }

    keyboard = new Keyboard();

    bindMobileControls();
    checkOrientation();

    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);

    AudioHub.unlockAudio();
    loadMuteState();

    updateMobileControlsVisibility();
}

/**
 * Starts game
 */
function startGame() {

    canvas = document.getElementById('canvas');
    if (!canvas) return;

    if (world) return;

    stopEverything();
    hideAllScreens();

    createLevel1();

    world = new World(canvas, keyboard);

    gameStarted = true;

    AudioHub.startMusic();

    updateMobileControlsVisibility();

    document.activeElement?.blur();
}

/**
 * Restart game
 */
function restartGame() {

    stopEverything();
    hideAllScreens();
    clearAllIntervals();

    AudioHub.resetAll();

    createLevel1();

    world = new World(canvas, keyboard);

    gameStarted = true;

    AudioHub.startMusic();

    updateMobileControlsVisibility();

    document.activeElement?.blur();
}

/**
 * Stop game
 */
function stopEverything() {

    if (!world) return;

    world.state = "stopped";
    world.stopAll();

    world = null;

    if (keyboard) {
        keyboard.LEFT = false;
        keyboard.RIGHT = false;
        keyboard.UP = false;
        keyboard.DOWN = false;
        keyboard.SPACE = false;
        keyboard.D = false;
    }

    window.focus();
}

/**
 * Safe interval
 */
function setSafeInterval(fn, time) {
    const id = setInterval(fn, time);
    activeIntervals.push(id);
    return id;
}

/**
 * Clear intervals
 */
function clearAllIntervals() {
    activeIntervals.forEach(clearInterval);
    activeIntervals = [];
}

/**
 * Hide screens
 */
function hideAllScreens() {

    ['startScreen', 'gameOverScreen', 'winScreen', 'howToPlayOverlay']
        .forEach(id => {
            const el = document.getElementById(id);
            if (el) el.style.display = 'none';
        });
}

/**
 * Mute toggle
 */
function toggleMute() {

    const muted = !AudioHub.MUSIC.muted;

    AudioHub.setMuted(muted);

    localStorage.setItem('polloMuted', muted);

    updateMuteButton(muted);

    document.getElementById('muteBtn')?.blur();
}

/**
 * Load mute
 */
function loadMuteState() {

    const muted = localStorage.getItem('polloMuted') === 'true';

    AudioHub.setMuted(muted);

    updateMuteButton(muted);
}

/**
 * Update mute UI
 */
function updateMuteButton(muted) {

    const btn = document.getElementById('muteBtn');
    if (!btn) return;

    btn.innerText = muted ? 'Muted' : 'Sound';
}

/**
 * Show help
 */
function showHowToPlay() {
    document.getElementById('howToPlayOverlay')?.style.setProperty('display', 'flex');
}

/**
 * Close help
 */
function closeHowToPlay() {
    document.getElementById('howToPlayOverlay')?.style.setProperty('display', 'none');
}

/**
 * Back to menu
 */
function goToMenu() {

    stopEverything();
    clearAllIntervals();
    AudioHub.resetAll();

    hideAllScreens();

    gameStarted = false;

    const start = document.getElementById('startScreen');
    if (start) start.style.display = 'flex';

    updateMobileControlsVisibility();

    document.activeElement?.blur();
}

/**
 * Bind mobile controls
 */
function bindMobileControls() {

    document.querySelectorAll('.mobileBtn').forEach(btn => {

        btn.addEventListener('contextmenu', e => e.preventDefault());

        btn.addEventListener('touchstart', e => {
            e.preventDefault();
            btn.blur?.();
        }, { passive: false });
    });
}

/**
 * MOBILE FIX (FINAL SAFE VERSION)
 */
function updateMobileControlsVisibility() {

    const controls = document.getElementById('mobileControls');
    if (!controls) return;

    const isSmallScreen = window.innerWidth <= 950;

    const isTouchDevice =
        window.matchMedia("(hover: none) and (pointer: coarse)").matches;

    const shouldShow = gameStarted && (isSmallScreen || isTouchDevice);

    controls.style.display = shouldShow ? 'flex' : 'none';
}

/**
 * Orientation check
 */
function checkOrientation() {

    const rotate = document.getElementById('rotateScreen');
    if (!rotate) return;

    if (window.innerWidth < 950 && window.innerHeight > window.innerWidth) {
        rotate.style.display = 'flex';
    } else {
        rotate.style.display = 'none';
    }

    updateMobileControlsVisibility();
}