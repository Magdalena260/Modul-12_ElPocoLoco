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
 * Stores all active interval IDs.
 *
 * @type {number[]}
 */
let activeIntervals = [];

/**
 * Initializes the game application.
 *
 * @returns {void}
 */
function init() {
    canvas = document.getElementById('canvas');

    if (!canvas) return;

    keyboard = new Keyboard();

    bindMobileControls();
    bindWindowEvents();

    loadMuteState();
    checkOrientation();
}

/**
 * Adds resize and orientation listeners.
 *
 * @returns {void}
 */
function bindWindowEvents() {
    window.addEventListener('resize', checkOrientation);
    window.addEventListener('orientationchange', checkOrientation);
}

/**
 * Starts a new game.
 *
 * @returns {void}
 */
function startGame() {
    if (!canvas || world) return;

    stopEverything();
    hideAllScreens();
    createNewWorld();

    gameStarted = true;

    AudioHub.startMusic();
    updateMobileControlsVisibility();

    document.activeElement?.blur();
}

/**
 * Restarts the game without reloading the page.
 *
 * @returns {void}
 */
function restartGame() {
    stopEverything();
    clearAllIntervals();
    hideAllScreens();

    AudioHub.resetAll();

    createNewWorld();

    gameStarted = true;

    AudioHub.startMusic();
    updateMobileControlsVisibility();

    document.activeElement?.blur();
}

/**
 * Creates the level and a new world.
 *
 * @returns {void}
 */
function createNewWorld() {
    createLevel1();

    world = new World(
        canvas,
        keyboard
    );
}

/**
 * Stops the current game.
 *
 * @returns {void}
 */
function stopEverything() {
    if (!world) {
        resetKeyboard();
        return;
    }

    world.state = 'stopped';
    world.stopAll();
    world = null;

    resetKeyboard();
}

/**
 * Resets all keyboard states.
 *
 * @returns {void}
 */
function resetKeyboard() {
    if (!keyboard) return;

    keyboard.LEFT = false;
    keyboard.RIGHT = false;
    keyboard.UP = false;
    keyboard.DOWN = false;
    keyboard.SPACE = false;
    keyboard.D = false;
}

/**
 * Creates a safe interval.
 *
 * @param {Function} fn
 * @param {number} time
 * @returns {number}
 */
function setSafeInterval(fn, time) {
    const id = setInterval(fn, time);

    activeIntervals.push(id);

    return id;
}

/**
 * Clears all registered intervals.
 *
 * @returns {void}
 */
function clearAllIntervals() {
    activeIntervals.forEach(clearInterval);

    activeIntervals = [];
}

/**
 * Hides all game screens.
 *
 * @returns {void}
 */
function hideAllScreens() {
    const screens = [
        'startScreen',
        'gameOverScreen',
        'winScreen',
        'howToPlayOverlay'
    ];

    screens.forEach(hideScreen);
}

/**
 * Hides one screen.
 *
 * @param {string} id
 * @returns {void}
 */
function hideScreen(id) {
    const element = document.getElementById(id);

    if (element) {
        element.style.display = 'none';
    }
}

/**
 * Toggles sound on and off.
 *
 * @returns {void}
 */
function toggleMute() {
    const muted = !AudioHub.isMuted;

    AudioHub.setMuted(muted);

    localStorage.setItem(
        'polloMuted',
        muted
    );

    updateMuteButton(muted);

    document.getElementById('muteBtn')?.blur();
}

/**
 * Loads saved mute state.
 *
 * @returns {void}
 */
function loadMuteState() {
    const muted =
        localStorage.getItem('polloMuted') === 'true';

    AudioHub.setMuted(muted);
    updateMuteButton(muted);
}

/**
 * Updates the mute button text.
 *
 * @param {boolean} muted
 * @returns {void}
 */
function updateMuteButton(muted) {
    const button =
        document.getElementById('muteBtn');

    if (!button) return;

    button.innerText =
        muted ? 'Muted' : 'Sound';
}

/**
 * Opens the How-to-Play screen.
 *
 * @returns {void}
 */
function showHowToPlay() {
    const overlay =
        document.getElementById('howToPlayOverlay');

    if (overlay) {
        overlay.style.display = 'flex';
    }
}

/**
 * Closes the How-to-Play screen.
 *
 * @returns {void}
 */
function closeHowToPlay() {
    hideScreen('howToPlayOverlay');
}

/**
 * Returns to the main menu.
 *
 * @returns {void}
 */
function goToMenu() {
    stopEverything();
    clearAllIntervals();
    AudioHub.resetAll();

    hideAllScreens();

    gameStarted = false;

    showStartScreen();
    updateMobileControlsVisibility();

    document.activeElement?.blur();
}

/**
 * Displays the start screen.
 *
 * @returns {void}
 */
function showStartScreen() {
    const start =
        document.getElementById('startScreen');

    if (start) {
        start.style.display = 'flex';
    }
}

/**
 * Marks the game as finished.
 * Used by win and game-over states.
 *
 * @returns {void}
 */
function finishGame() {
    gameStarted = false;

    resetKeyboard();
    updateMobileControlsVisibility();
}

/**
 * Prepares all mobile control buttons.
 *
 * @returns {void}
 */
function bindMobileControls() {
    document
        .querySelectorAll('.mobileBtn')
        .forEach(bindMobileButton);
}

/**
 * Prevents context menu and unwanted touch behaviour.
 *
 * @param {HTMLElement} button
 * @returns {void}
 */
function bindMobileButton(button) {
    button.addEventListener(
        'contextmenu',
        preventEvent
    );

    button.addEventListener(
        'touchstart',
        handleTouchStart,
        { passive: false }
    );
}

/**
 * Prevents the default browser event.
 *
 * @param {Event} event
 * @returns {void}
 */
function preventEvent(event) {
    event.preventDefault();
}

/**
 * Handles touch start on a mobile button.
 *
 * @param {TouchEvent} event
 * @returns {void}
 */
function handleTouchStart(event) {
    if (event.cancelable) {
        event.preventDefault();
    }

    event.currentTarget?.blur();
}

/**
 * Updates visibility of mobile controls.
 *
 * @returns {void}
 */
function updateMobileControlsVisibility() {
    const controls =
        document.getElementById('mobileControls');

    if (!controls) return;

    const shouldShow =
        gameStarted &&
        isMobileGameView();

    controls.style.display =
        shouldShow ? 'flex' : 'none';
}

/**
 * Checks whether mobile controls should be used.
 *
 * @returns {boolean}
 */
function isMobileGameView() {
    const smallScreen =
        window.innerWidth <= 950;

    const touchDevice =
        window.matchMedia(
            '(hover: none) and (pointer: coarse)'
        ).matches;

    return smallScreen || touchDevice;
}

/**
 * Checks device orientation.
 *
 * @returns {void}
 */
function checkOrientation() {
    const rotate =
        document.getElementById('rotateScreen');

    if (!rotate) return;

    rotate.style.display =
        shouldShowRotateScreen()
            ? 'flex'
            : 'none';

    updateMobileControlsVisibility();
}

/**
 * Checks whether the rotate message is required.
 *
 * @returns {boolean}
 */
function shouldShowRotateScreen() {
    return (
        window.innerWidth < 950 &&
        window.innerHeight > window.innerWidth
    );
}