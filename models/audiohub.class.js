/**
 * Central audio manager for the game.
 * Handles music, sound effects, mute control, and audio reset.
 */
class AudioHub {

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
    static allSounds = [
        AudioHub.MUSIC,
        AudioHub.JUMP,
        AudioHub.SNORING,
        AudioHub.COIN,
        AudioHub.THROW,
        AudioHub.CHICKEN_HIT,
        AudioHub.CHICKEN_DEATH,
        AudioHub.BOSS_HIT
        
    ];

    // ================= AUDIO UNLOCK =================

    static unlockAudio() {
        this.allSounds.forEach(sound => {
            try {
                sound.volume = 0;
                sound.play()
                    .then(() => {
                        sound.pause();
                        sound.currentTime = 0;
                        sound.volume = 1;
                    })
                    .catch(() => {});
            } catch (e) {}
        });
    }

    // ================= MUSIC =================

    static startMusic() {
        this.MUSIC.loop = true;
        this.MUSIC.volume = 0.2;

        this.MUSIC.play().catch(() => {});
    }

    static stopMusic() {
        try {
            this.MUSIC.pause();
            this.MUSIC.currentTime = 0;
        } catch (e) {}
    }

    // ================= PLAY (SAFE VERSION) =================

    /**
     * Plays a sound safely without cutting others off.
     */
    static play(sound, volume = 0.3) {
        if (!sound) return;

        try {
            const clone = sound.cloneNode(); // prevents cut-off bugs
            clone.volume = volume;
            clone.play().catch(() => {});
        } catch (e) {}
    }

    // ================= MUTE =================

    static setMuted(muted) {
        this.allSounds.forEach(s => s.muted = muted);
    }

    // ================= RESET =================

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