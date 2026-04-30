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
    canThrow = true;

    hearts = [];

    gameOver = false;

    stepCooldown = false;

    constructor(canvas, keyboard) {

        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;

        this.character = new Character();
        this.level = level1;

        this.character.world = this;

        this.level.enemies.forEach(e => e.world = this);

        this.initStatusBars();

        this.run();
        this.draw();
    }

    // ================= STATUS BARS =================
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
            'img/7_statusbars/2_statusbar_endboss/blue/blue100.png',
        ], 500, 20);
    }

    // ================= GAME LOOP =================
    run() {

        setInterval(() => {

            if (this.gameOver) return;

            this.checkCoins();
            this.checkBottles();
            this.checkChicken();
            this.checkThrow();
            this.checkBottleHits();
            this.checkEndboss();
            this.cleanup();
            this.updateUI();

            this.checkStepSound();

        }, 100);
    }

    // ================= HEART =================
    spawnHeart(x, y) {
        this.hearts.push({
            x: x,
            y: y,
            size: 40,
            life: 30
        });
    }

    // ================= COINS =================
    checkCoins() {
        this.level.coins.forEach((c, i) => {
            if (this.character.isColliding(c)) {
                this.level.coins.splice(i, 1);
                this.coinCount++;

                AudioHub.play(AudioHub.COIN, 0.3);
            }
        });
    }

    // ================= BOTTLES =================
    checkBottles() {
        this.level.bottles.forEach((b, i) => {
            if (this.character.isColliding(b)) {
                this.level.bottles.splice(i, 1);
                this.bottleCount++;
            }
        });
    }

    // ================= CHICKEN =================
    checkChicken() {

        for (let e of this.level.enemies) {

            if (e instanceof Endboss) continue;
            if (!this.character.isColliding(e)) continue;

            let falling = this.character.speedY > 0;

            let jumpKill =
                falling &&
                this.character.y + this.character.height >= e.y &&
                this.character.y + this.character.height <= e.y + 60;

            if (jumpKill) {
                e.die();
                this.character.speedY = 10;

                AudioHub.play(AudioHub.CHICKEN, 0.3);

                this.character.energy = Math.min(100, this.character.energy + 20);
                this.spawnHeart(e.x, e.y);

            } else {
                this.character.hit();

                if (this.character.isDead()) {
                    this.triggerGameOver();
                }
            }
        }
    }

    // ================= THROW =================
    checkThrow() {

        if (this.keyboard.D && this.canThrow && this.bottleCount > 0) {

            this.canThrow = false;

            let dir = this.character.otherDirection ? 'left' : 'right';

            this.throwables.push(
                new ThrowableObject(
                    this.character.x + 50,
                    this.character.y + 100,
                    dir
                )
            );

            this.bottleCount--;

            AudioHub.play(AudioHub.THROW, 0.3);

            setTimeout(() => this.canThrow = true, 300);
        }
    }

    // ================= BOTTLE HITS =================
    checkBottleHits() {

        for (let b = this.throwables.length - 1; b >= 0; b--) {

            let bottle = this.throwables[b];

            for (let e of this.level.enemies) {

                if (e instanceof Endboss) continue;

                if (
                    bottle.x < e.x + e.width &&
                    bottle.x + bottle.width > e.x &&
                    bottle.y < e.y + e.height &&
                    bottle.y + bottle.height > e.y
                ) {
                    e.die();

                    AudioHub.play(AudioHub.CHICKEN, 0.3);

                    this.character.energy = Math.min(100, this.character.energy + 20);
                    this.spawnHeart(e.x, e.y);

                    this.throwables.splice(b, 1);
                    break;
                }
            }
        }
    }

    // ================= ENDBOSS =================
    checkEndboss() {

        let boss = this.level.enemies.find(e => e instanceof Endboss);
        if (!boss) return;

        for (let b = this.throwables.length - 1; b >= 0; b--) {

            let bottle = this.throwables[b];

            if (
                bottle.x < boss.x + boss.width &&
                bottle.x + bottle.width > boss.x &&
                bottle.y < boss.y + boss.height &&
                bottle.y + bottle.height > boss.y
            ) {
                boss.hit();

                AudioHub.play(AudioHub.ENDBOSS, 0.3);

                this.throwables.splice(b, 1);

                if (boss.isDead()) this.triggerWin();
            }
        }

        if (this.character.isColliding(boss) && !boss.dead) {

            let now = new Date().getTime();

            if (now - boss.lastAttack > boss.attackCooldown) {

                boss.lastAttack = now;

                this.character.hit();

                if (this.character.x < boss.x) {
                    this.character.x -= 50;
                } else {
                    this.character.x += 50;
                }

                if (this.character.isDead()) {
                    this.triggerGameOver();
                }
            }
        }
    }

    // ================= STEP SOUND =================
    checkStepSound() {

        if (this.keyboard.RIGHT || this.keyboard.LEFT) {

            if (!this.stepCooldown) {
                this.stepCooldown = true;

                AudioHub.play(AudioHub.STEP, 0.1);

                setTimeout(() => {
                    this.stepCooldown = false;
                }, 300);
            }
        }
    }

    cleanup() {
        this.level.enemies = this.level.enemies.filter(e => !e.removeFromWorld);
    }

    updateUI() {
        this.statusBarHealth.setPercentage(this.character.energy);
        this.statusBarCoins.setPercentage(this.coinCount * 10);
        this.statusBarBottles.setPercentage(this.bottleCount * 10);

        let boss = this.level.enemies.find(e => e instanceof Endboss);
        if (boss) {
            this.statusBarEndboss.setPercentage(boss.energy);
        }
    }

    triggerGameOver() {
        this.gameOver = true;
        document.getElementById("gameOverScreen").style.display = "flex";
    }

    triggerWin() {
        this.gameOver = true;
        document.getElementById("winScreen").style.display = "flex";
    }

    // ================= DRAW =================
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

        this.drawHearts();

        requestAnimationFrame(() => this.draw());
    }

    drawHearts() {

        this.hearts.forEach((h, i) => {

            let img = new Image();
            img.src = 'img/heart_red.png';

            this.ctx.drawImage(img, h.x, h.y, h.size, h.size);

            h.y -= 1;
            h.life--;

            if (h.life <= 0) {
                this.hearts.splice(i, 1);
            }
        });
    }

    addObjects(arr) {
        if (!arr) return;
        arr.forEach(o => this.addToMap(o));
    }

    addToMap(mo) {
        if (!mo || !mo.img) return;
        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
}