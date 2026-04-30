class AudioHub {

    // 🎵 MUSIC
    static MUSIC = new Audio('./assets/background_music.mp3');

    // 👣 PLAYER
    static STEP = new Audio('./assets/walking_pepe.mp3');
    static JUMP = new Audio('./assets/jump.mp3');

    // 🪙 COIN
    static COIN = new Audio('./assets/coin_3.mp3');

    // 🐔 ENEMIES
    static CHICKEN = new Audio('./assets/normal_chicken.mp3');
    static ENDBOSS = new Audio('./assets/endboss_chicken.mp3');

    static allSounds = [
        AudioHub.MUSIC,
        AudioHub.STEP,
        AudioHub.JUMP,
        AudioHub.COIN,
        AudioHub.CHICKEN,
        AudioHub.ENDBOSS
    ];

    // 🎵 MUSIC START
    static startMusic() {
        this.MUSIC.loop = true;
        this.MUSIC.volume = 0.2;
        this.MUSIC.play().catch(() => {});
    }

    // 🔊 PLAY SOUND
    static play(sound, volume = 0.3) {
        if (!sound) return;

        try {
            sound.currentTime = 0;
            sound.volume = volume;
            sound.play().catch(() => {});
        } catch (e) {}
    }

    // 🔇 MUTE SYSTEM (WICHTIG)
    static setMuted(muted) {
        this.allSounds.forEach(s => {
            s.muted = muted;
        });
    }

    // 🔄 RESET
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