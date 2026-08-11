/**
 * Central audio manager for the game.
 * Handles music, sound effects and mute state.
 */
class AudioHub {

    static MUSIC = new Audio('./assets/sounds/background_music.mp3');

    static JUMP = new Audio('./assets/sounds/jump.mp3');
    static COIN = new Audio('./assets/sounds/coin_3.mp3');
    static THROW = new Audio('./assets/sounds/bottle_smash.mp3');
    static CHICKEN = new Audio('./assets/sounds/normal_chicken.mp3');
    static ENDBOSS = new Audio('./assets/sounds/endboss_chicken.mp3');

    static isMuted = false;
    static lastPlay = new Map();

    static allSounds = [
        AudioHub.MUSIC,
        AudioHub.JUMP,
        AudioHub.COIN,
        AudioHub.THROW,
        AudioHub.CHICKEN,
        AudioHub.ENDBOSS
    ];

    /**
     * Starts the background music.
     *
     * @returns {void}
     */
    static startMusic() {
        this.MUSIC.loop = true;
        this.MUSIC.volume = 0.2;
        this.MUSIC.muted = this.isMuted;

        this.MUSIC.play().catch(() => {});
    }

    /**
     * Plays a sound effect.
     *
     * @param {HTMLAudioElement} sound
     * @param {number} volume
     * @param {number} cooldown
     * @returns {void}
     */
    static play(sound, volume = 0.3, cooldown = 0) {
        if (!sound || this.isMuted) return;
        if (!this.canPlaySound(sound, cooldown)) return;

        sound.pause();
        sound.currentTime = 0;
        sound.volume = volume;
        sound.play().catch(() => {});
    }

    /**
     * Checks whether a sound may be played.
     *
     * @param {HTMLAudioElement} sound
     * @param {number} cooldown
     * @returns {boolean}
     */
    static canPlaySound(sound, cooldown) {
        if (cooldown <= 0) return true;

        const now = Date.now();
        const last = this.lastPlay.get(sound);

        if (last && now - last < cooldown) return false;

        this.lastPlay.set(sound, now);

        return true;
    }

    /**
     * Mutes or unmutes all registered sounds.
     *
     * @param {boolean} muted
     * @returns {void}
     */
    static setMuted(muted) {
        this.isMuted = muted;

        this.allSounds.forEach(sound => {
            sound.muted = muted;
        });
    }

    /**
     * Stops and resets all registered sounds.
     *
     * @returns {void}
     */
    static resetAll() {
        this.allSounds.forEach(sound => {
            sound.pause();
            sound.currentTime = 0;
            sound.muted = this.isMuted;
        });

        this.lastPlay.clear();
    }
}