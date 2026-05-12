class World {

    canvas;
    ctx;
    keyboard;
    character;
    level;

    camera_x = 0;

    statusBarHealth;
    statusBarCoins;
    statusBarBottles;
    statusBarEndboss;

    coinCount = 0;
    bottleCount = 3;

    throwables = [];

    state = "running";
    gameLoop;

    soundVolume = 0.1;

    coinSound = AudioHub.COIN;
    throwSound = AudioHub.THROW;
    chickenSound = AudioHub.CHICKEN_HIT;
    bossHitSound = AudioHub.BOSS_HIT;
    bossDeathSound = AudioHub.BOSS_DEATH;

    constructor(canvas, keyboard) {

        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;

        this.character = new Character();
        this.character.world = this;

        this.level = level1;

        this.initLevelEntities();
        this.initStatusBars();

        this.run();
        this.draw();
    }

    playSound(sound, volume = 1) {
        AudioHub.play(sound, this.soundVolume * volume);
    }

    initLevelEntities() {

        this.level.enemies.forEach(e => {
            e.world = this;

            if (e instanceof Endboss) {
                e.dead = false;
                e.energy = 100;
                e.activated = false;
                e.state = "alert";

                if (e.roarSound) {
                    e.roarSound.pause();
                    e.roarSound.currentTime = 0;
                    e.roarSound = null;
                }
            }
        });

        this.level.coins.forEach(c => c.world = this);
        this.level.bottles.forEach(b => b.world = this);
    }

    initStatusBars() {

        this.statusBarHealth = new StatusBar([
            'img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
            'img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
            'img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
            'img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
            'img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
            'img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
        ], 20, 20);

        this.statusBarCoins = new StatusBar([
            'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
            'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
            'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
            'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
            'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
            'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
        ], 20, 80);

        this.statusBarBottles = new StatusBar([
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
            'img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
        ], 20, 140);

        this.statusBarEndboss = new StatusBar([
            'img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
            'img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
            'img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
            'img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
            'img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
            'img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
        ], 500, 60);
    }

    run() {

        this.gameLoop = setInterval(() => {

            if (this.state !== "running") return;

            this.checkCoins();
            this.checkBottles();
            this.checkChicken();   // ✅ FIXED
            this.checkThrow();
            this.checkBottleHits();
            this.checkEndboss();
            this.updateUI();

        }, 100);
    }

    checkCoins() {
        this.level.coins.forEach((c, i) => {
            if (this.character.isColliding(c)) {
                this.level.coins.splice(i, 1);
                this.coinCount++;
                this.playSound(this.coinSound, 0.2);
            }
        });
    }

    checkBottles() {
        this.level.bottles.forEach((b, i) => {
            if (this.character.isColliding(b)) {
                this.level.bottles.splice(i, 1);
                this.bottleCount++;
            }
        });
    }

    // 🐔 FIXED: reliable stomp kill
    checkChicken() {

        for (let i = this.level.enemies.length - 1; i >= 0; i--) {

            let e = this.level.enemies[i];

            if (e instanceof Endboss) continue;
            if (e.dead) continue;

            if (!this.character.isColliding(e)) continue;

            let charBottom = this.character.y + this.character.height;
            let enemyTop = e.y + (e.offset?.top || 0);

            let falling = this.character.speedY > 0;

            let stomp =
                falling &&
                charBottom >= enemyTop &&
                charBottom <= enemyTop + 60;

            if (stomp) {

                e.dead = true;
                e.speed = 0;
                e.die?.();

                this.playSound(this.chickenSound, 0.15);

                this.character.speedY = 12;

                setTimeout(() => {
                    let index = this.level.enemies.indexOf(e);
                    if (index > -1) this.level.enemies.splice(index, 1);
                }, 300);

            } else {

                this.character.hit();

                if (this.character.isDead()) {
                    this.triggerGameOver();
                }
            }
        }
    }

    checkThrow() {

        if (this.keyboard.D && this.bottleCount > 0) {

            this.throwables.push(
                new ThrowableObject(
                    this.character.x + 50,
                    this.character.y + 100,
                    this.character.otherDirection ? 'left' : 'right'
                )
            );

            this.bottleCount--;
            this.playSound(this.throwSound, 0.3);
            this.keyboard.D = false;
        }
    }

    checkBottleHits() {

        for (let b = this.throwables.length - 1; b >= 0; b--) {

            let bottle = this.throwables[b];

            for (let e of this.level.enemies) {

                if (e instanceof Endboss) continue;
                if (e.dead) continue;

                if (bottle.isColliding(e)) {

                    e.die?.();
                    this.playSound(this.chickenSound, 0.2);

                    this.throwables.splice(b, 1);
                    break;
                }
            }
        }
    }

    checkEndboss() {

        let boss = this.level.enemies.find(e => e instanceof Endboss);
        if (!boss || boss.dead) return;

        for (let b = this.throwables.length - 1; b >= 0; b--) {

            let bottle = this.throwables[b];

            if (bottle.isColliding(boss)) {

                boss.hit();
                this.playSound(this.bossHitSound, 0.4);

                this.throwables.splice(b, 1);

                if (boss.isDead()) {
                    this.playSound(this.bossDeathSound, 0.3);
                    setTimeout(() => this.triggerWin(), 1200);
                }
            }
        }
    }

    updateUI() {

        this.statusBarHealth.setPercentage(this.character.energy);
        this.statusBarCoins.setPercentage(this.coinCount * 10);
        this.statusBarBottles.setPercentage(this.bottleCount * 10);

        let boss = this.level.enemies.find(e => e instanceof Endboss);
        if (boss) this.statusBarEndboss.setPercentage(boss.energy);
    }

    triggerGameOver() {
        this.state = "gameover";
        document.getElementById("gameOverScreen").style.display = "flex";
    }

    triggerWin() {
        this.state = "win";
        document.getElementById("winScreen").style.display = "flex";
    }

    draw() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.save();
        this.ctx.translate(this.camera_x, 0);

        this.addObjects(this.level.backgroundObjects);
        this.addObjects(this.level.clouds);
        this.addObjects(this.level.enemies);
        this.addObjects(this.level.coins);
        this.addObjects(this.level.bottles);
        this.addObjects(this.throwables);

        this.addToMap(this.character);

        this.ctx.restore();

        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);
        this.addToMap(this.statusBarEndboss);

        requestAnimationFrame(() => this.draw());
    }

    addObjects(arr) {
        arr.forEach(o => this.addToMap(o));
    }

    addToMap(mo) {

        if (!mo || !mo.img) return;

        this.ctx.save();

        if (mo instanceof Character && mo.otherDirection) {
            this.ctx.translate(mo.x + mo.width, 0);
            this.ctx.scale(-1, 1);
            this.ctx.drawImage(mo.img, 0, mo.y, mo.width, mo.height);
        } else {
            this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        }

        this.ctx.restore();
    }
}