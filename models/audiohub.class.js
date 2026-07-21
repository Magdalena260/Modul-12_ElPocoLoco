class AudioHub {

    static MUSIC = new Audio('./assets/background_music.mp3');

    static JUMP = new Audio('./assets/jump.mp3');
    static COIN = new Audio('./assets/coin_3.mp3');
    static THROW = new Audio('./assets/bottle_smash.mp3');
    static CHICKEN = new Audio('./assets/normal_chicken.mp3');
    static ENDBOSS = new Audio('./assets/endboss_chicken.mp3');

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

    // ✅ FIX: MUSIC START
    static startMusic() {
        this.MUSIC.loop = true;
        this.MUSIC.volume = 0.2;
        this.MUSIC.play().catch(() => {});
    }

    static play(sound, volume = 0.3, cooldown = 0) {

        if (!sound || this.isMuted) return;

        const now = Date.now();

        if (cooldown > 0) {
            const last = this.lastPlay.get(sound);
            if (last && now - last < cooldown) return;
            this.lastPlay.set(sound, now);
        }

        sound.pause();
        sound.currentTime = 0;
        sound.volume = volume;
        sound.play().catch(() => {});
    }

    static setMuted(muted) {
        this.isMuted = muted;
        this.allSounds.forEach(s => s.muted = muted);
    }

    static resetAll() {
        this.allSounds.forEach(s => {
            s.pause();
            s.currentTime = 0;
            s.muted = this.isMuted;
        });

        this.lastPlay.clear();
    }
}