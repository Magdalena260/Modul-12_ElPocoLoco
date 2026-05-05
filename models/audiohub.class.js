class AudioHub {

    // ================= SOUNDS =================

    static MUSIC = new Audio('./assets/background_music.mp3');
    static JUMP = new Audio('./assets/jump.mp3');
    static SNORING = new Audio('./assets/snoring.mp3');

    static COIN = new Audio('./assets/coin_3.mp3');


    static THROW = new Audio('./assets/bottle_smash.mp3');

    static CHICKEN = new Audio('./assets/normal_chicken.mp3');
    static ENDBOSS = new Audio('./assets/endboss_chicken.mp3');

    static allSounds = [
        AudioHub.MUSIC,
        AudioHub.JUMP,
        AudioHub.SNORING,
        AudioHub.COIN,
        AudioHub.THROW,
        AudioHub.CHICKEN,
        AudioHub.ENDBOSS
    ];

    // ================= AUDIO UNLOCK (WICHTIG!) =================
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
    static startMusic() {
        this.MUSIC.loop = true;
        this.MUSIC.volume = 0.2;

        this.MUSIC.play().catch(err => {
            console.log("Music blocked:", err);
        });
    }

    // ================= PLAY =================
    static play(sound, volume = 0.3) {
        if (!sound) return;

        try {
            sound.currentTime = 0;
            sound.volume = volume;
            sound.play().catch(() => {});
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