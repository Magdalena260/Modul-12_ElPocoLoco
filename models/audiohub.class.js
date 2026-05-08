/**
 * Central audio manager for the game.
 * Handles music, sound effects, mute control, and audio reset.
 */
class AudioHub {

    // ================= SOUNDS =================

    /** Background music */
    static MUSIC = new Audio('./assets/background_music.mp3');

    /** Jump sound effect */
    static JUMP = new Audio('./assets/jump.mp3');

    /** Snoring sound effect */
    static SNORING = new Audio('./assets/snoring.mp3');

    /** Coin pickup sound */
    static COIN = new Audio('./assets/coin_3.mp3');

    /** Bottle throw sound */
    static THROW = new Audio('./assets/bottle_smash.mp3');

    /** Chicken hit sound */
    static CHICKEN = new Audio('./assets/normal_chicken.mp3');

    /** Endboss sound effect */
    static ENDBOSS = new Audio('./assets/endboss_chicken.mp3');

    /**
     * List of all sounds for global control.
     * @type {HTMLAudioElement[]}
     */
    static allSounds = [
        AudioHub.MUSIC,
        AudioHub.JUMP,
        AudioHub.SNORING,
        AudioHub.COIN,
        AudioHub.THROW,
        AudioHub.CHICKEN,
        AudioHub.ENDBOSS
    ];

    // ================= AUDIO UNLOCK =================

    /**
     * Unlocks audio playback for browsers (required for autoplay policies).
     */
    static unlockAudio() {
        this.allSounds.forEach(sound => {
            try {
                sound.volume = 0;
                sound.play().then(() => {
                    sound.pause();
                    sound.currentTime = 0;
                    sound.volume = 1;
                }).catch(() => {});
            } catch (e) {}
        });
    }

    // ================= MUSIC =================

    /**
     * Starts looping background music.
     */
    static startMusic() {
        this.MUSIC.loop = true;
        this.MUSIC.volume = 0.2;

        this.MUSIC.play().catch(err => {
            console.log("Music blocked:", err);
        });
    }

    /**
     * Stops background music and resets playback.
     */
    static stopMusic() {
        try {
            this.MUSIC.pause();
            this.MUSIC.currentTime = 0;
        } catch (e) {}
    }

    // ================= PLAY SOUND =================

    /**
     * Plays a sound effect.
     * @param {HTMLAudioElement} sound - Audio object to play.
     * @param {number} [volume=0.3] - Volume level.
     */
    static play(sound, volume = 0.3) {
        if (!sound) return;

        try {
            sound.currentTime = 0;
            sound.volume = volume;
            sound.play().catch(() => {});
        } catch (e) {}
    }

    // ================= MUTE =================

    /**
     * Mutes or unmutes all game sounds.
     * @param {boolean} muted
     */
    static setMuted(muted) {
        this.allSounds.forEach(s => s.muted = muted);
    }

    // ================= RESET =================

    /**
     * Stops and resets all sounds.
     */
    static resetAll() {
        this.allSounds.forEach(s => {
            try {
                s.pause();
                s.currentTime = 0;
                s.muted = false;
            } catch (e) {}
        });
    }
}