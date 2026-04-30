class AudioHub {

    // 🎵 MUSIC
    static MUSIC = new Audio('./assets/background_music.mp3');

    // 👣 PLAYER SOUNDS
    static STEP = new Audio('./assets/walking_pepe.mp3');
    static JUMP = new Audio('./assets/jump.mp3');
    static SLEEP = new Audio('./assets/snoring.mp3');

    // 🍾 THROW
    static THROW = new Audio('./assets/bottle_smash.mp3');

    // 🪙 ITEMS
    static COIN = new Audio('./assets/coin_3.mp3');

    // 🐔 ENEMIES
    static CHICKEN = new Audio('./assets/normal_chicken.mp3');
    static ENDBOSS = new Audio('./assets/endboss_chicken.mp3');

    // 📦 ALL SOUNDS
    static allSounds = [
        AudioHub.MUSIC,
        AudioHub.STEP,
        AudioHub.JUMP,
        AudioHub.SLEEP,
        AudioHub.THROW,
        AudioHub.COIN,
        AudioHub.CHICKEN,
        AudioHub.ENDBOSS
    ];

    // 🎵 START MUSIC (loop)
    static startMusic() {
        this.MUSIC.loop = true;
        this.MUSIC.volume = 0.2;
        this.MUSIC.play();
    }

    // 🔊 PLAY SOUND ONCE
    static play(sound, volume = 0.3) {
        if (!sound) return;
        sound.volume = volume;
        sound.currentTime = 0;
        sound.play();
    }

    // ⛔ STOP ALL SOUNDS
    static stopAll() {
        this.allSounds.forEach(sound => {
            sound.pause();
            sound.currentTime = 0;
        });
    }

    // 🔇 MUTE ALL
    static mute() {
        this.allSounds.forEach(sound => {
            sound.volume = 0;
        });
    }

    // 🔊 UNMUTE DEFAULT
    static unmute() {
        this.MUSIC.volume = 0.2;
    }
}