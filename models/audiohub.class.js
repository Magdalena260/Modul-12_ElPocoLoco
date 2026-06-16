/**
 * Central audio manager for the game.
 * Handles music, sound effects,
 * mute state and playback control.
 */
class AudioHub {

<<<<<<< HEAD
    // ================= MUSIC =================
    static MUSIC = new Audio('./assets/background_music.mp3');

    // ================= PLAYER =================
    static JUMP = new Audio('./assets/jump.mp3');
    static SNORING = new Audio('./assets/snoring.mp3');

    // ================= ITEMS =================
    static COIN = new Audio('./assets/coin_3.mp3');
    static THROW = new Audio('./assets/bottle_smash.mp3');

    // ================= ENEMIES =================
    static CHICKEN_HIT = new Audio('./assets/normal_chicken.mp3');
    static CHICKEN_DEATH = new Audio('./assets/normal_chicken.mp3');

    static BOSS_HIT = new Audio('./assets/endboss_chicken.mp3');
    static BOSS_DEATH = new Audio('./assets/endboss_chicken.mp3');

    // ================= SOUND LIST =================
=======
    static MUSIC = new Audio('./assets/background_music.mp3');

    static JUMP = new Audio('./assets/jump.mp3');
    static COIN = new Audio('./assets/coin_3.mp3');
    static THROW = new Audio('./assets/bottle_smash.mp3');
    static CHICKEN = new Audio('./assets/normal_chicken.mp3');
    static ENDBOSS = new Audio('./assets/endboss_chicken.mp3');
    static STEP = new Audio('./assets/step.mp3');

    /**
     * Global mute state.
     * Prevents reset bugs after restart.
     * @type {boolean}
     */
    static isMuted = false;

>>>>>>> aa281ad (Update)
    static allSounds = [
        AudioHub.MUSIC,
        AudioHub.JUMP,
        AudioHub.COIN,
        AudioHub.THROW,
<<<<<<< HEAD
        AudioHub.CHICKEN_HIT,
        AudioHub.CHICKEN_DEATH,
        AudioHub.BOSS_HIT
        
=======
        AudioHub.CHICKEN,
        AudioHub.ENDBOSS,
        AudioHub.STEP
>>>>>>> aa281ad (Update)
    ];

    static lastPlay = new Map();

<<<<<<< HEAD
=======
    /**
     * Unlocks audio on first user interaction.
     *
     * @returns {void}
     */
>>>>>>> aa281ad (Update)
    static unlockAudio() {

        this.allSounds.forEach(sound => {

            try {

                sound.volume = 0;
<<<<<<< HEAD
                sound.play()
                    .then(() => {
                        sound.pause();
                        sound.currentTime = 0;
                        sound.volume = 1;
                    })
                    .catch(() => {});
=======

                sound.play()
                    .then(() => {

                        sound.pause();

                        sound.currentTime = 0;

                        sound.volume = 1;

                    })
                    .catch(() => {});

>>>>>>> aa281ad (Update)
            } catch (e) {}
        });
    }

<<<<<<< HEAD
    // ================= MUSIC =================

=======
    /**
     * Starts background music safely.
     *
     * @returns {void}
     */
>>>>>>> aa281ad (Update)
    static startMusic() {

        this.MUSIC.loop = true;

        this.MUSIC.volume = 0.2;

<<<<<<< HEAD
        this.MUSIC.play().catch(() => {});
    }

=======
        this.MUSIC.muted = this.isMuted;

        this.MUSIC.play().catch(() => {});
    }

    /**
     * Stops background music.
     *
     * @returns {void}
     */
>>>>>>> aa281ad (Update)
    static stopMusic() {

        this.MUSIC.pause();

        this.MUSIC.currentTime = 0;
    }

<<<<<<< HEAD
    // ================= PLAY (SAFE VERSION) =================

    /**
     * Plays a sound safely without cutting others off.
=======
    /**
     * Plays a sound safely.
     * Includes anti-spam cooldown.
     *
     * @param {HTMLAudioElement} sound
     * @param {number} volume
     * @param {number} cooldown
     * @returns {void}
>>>>>>> aa281ad (Update)
     */
    static play(sound, volume = 0.3, cooldown = 0) {

        if (!sound) return;

        if (this.isMuted) return;

        const now = Date.now();

        /**
         * Anti spam protection.
         */
        if (cooldown > 0) {

            const last = this.lastPlay.get(sound);

            if (last && now - last < cooldown) {
                return;
            }

            this.lastPlay.set(sound, now);
        }

        try {
<<<<<<< HEAD
            const clone = sound.cloneNode(); // prevents cut-off bugs
            clone.volume = volume;
            clone.play().catch(() => {});
        } catch (e) {}
    }

    // ================= MUTE =================

=======

            sound.pause();

            sound.currentTime = 0;

            sound.volume = volume;

            sound.muted = this.isMuted;

            sound.play().catch(() => {});

        } catch (e) {}
    }

    /**
     * Updates mute state globally.
     *
     * @param {boolean} muted
     * @returns {void}
     */
>>>>>>> aa281ad (Update)
    static setMuted(muted) {

        this.isMuted = muted;

<<<<<<< HEAD
    static resetAll() {
        this.allSounds.forEach(s => {
            try {
                s.pause();
                s.currentTime = 0;
                s.muted = false;
            } catch (e) {}
=======
        this.allSounds.forEach(sound => {

            sound.muted = muted;
>>>>>>> aa281ad (Update)
        });
    }

    /**
     * Stops and resets all sounds safely.
     * Keeps mute state intact.
     *
     * @returns {void}
     */
    static resetAll() {

        this.allSounds.forEach(sound => {

            sound.pause();

            sound.currentTime = 0;

            /**
             * IMPORTANT:
             * keep current mute state
             */
            sound.muted = this.isMuted;
        });

        this.lastPlay.clear();
    }
}