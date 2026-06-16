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

    endbossBarVisible = false;

    coinCount = 0;
    bottleCount = 0;
    maxCoins = 0;
    maxBottles = 0;

    throwables = [];

    canThrow = true;
    characterCanTakeDamage = true;

    state = "running";

    gameLoop;
    drawLoop;

    constructor(canvas, keyboard) {

        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;

        this.character = new Character();
        this.level = level1;

        this.character.world = this;

<<<<<<< HEAD
        this.level.enemies.forEach(e => {
            e.world = this;

            // ENDBOSS RESET FIX
            if (e instanceof Endboss) {
                e.dead = false;
                e.energy = 100;
                e.y = 200;
            }
        });
=======
        this.maxCoins = this.level.coins.length;
        this.maxBottles = this.level.bottles.length;
>>>>>>> aa281ad (Update)

        this.connectWorld();
        this.initStatusBars();

        this.run();
        this.draw();
    }

    connectWorld() {

        this.level.enemies.forEach(e => e.world = this);
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
            this.checkChickenCollisions();
            this.checkThrow();
            this.checkBottleHits();
            this.checkEndboss();
            this.cleanup();
            this.updateUI();

        }, 1000 / 60);
    }

    checkCoins() {

        for (let i = this.level.coins.length - 1; i >= 0; i--) {

            let coin = this.level.coins[i];

            if (this.character.isColliding(coin)) {
                this.level.coins.splice(i, 1);
                this.coinCount++;
                AudioHub.play(AudioHub.COIN, 0.3);
            }
        }
    }

    checkBottles() {

        for (let i = this.level.bottles.length - 1; i >= 0; i--) {

            let bottle = this.level.bottles[i];

            if (this.character.isColliding(bottle)) {
                this.level.bottles.splice(i, 1);
                this.bottleCount++;
            }
        }
    }

    damageCharacter() {

        if (!this.characterCanTakeDamage) return;

        this.characterCanTakeDamage = false;
        this.character.hit();

        setTimeout(() => {
            this.characterCanTakeDamage = true;
        }, 500);

        if (this.character.isDead()) {
            setTimeout(() => this.triggerGameOver(), 500);
        }
    }

    checkChickenCollisions() {

        this.level.enemies.forEach(enemy => {

            if (enemy instanceof Endboss) return;
            if (enemy.dead) return;
            if (!this.character.isColliding(enemy)) return;

            let falling = this.character.speedY < 0;

            let charBottom =
                this.character.y +
                this.character.height -
                this.character.offset.bottom;

            let enemyTop = enemy.y + enemy.offset.top;

            let stomp =
                falling &&
                charBottom < enemyTop + 30 &&
                this.character.speedY < -2;

            if (stomp) {
                enemy.die();
                this.character.speedY = 14;
                AudioHub.play(AudioHub.CHICKEN, 0.3);
            } else {
                this.damageCharacter();
            }
        });
    }

    checkThrow() {

        if (this.keyboard.D && this.canThrow && this.bottleCount > 0) {

            this.canThrow = false;

<<<<<<< HEAD
            let dir = this.character.otherDirection ? 'left' : 'right';
=======
            let direction = this.character.otherDirection ? "left" : "right";
>>>>>>> aa281ad (Update)

            let bottle = new ThrowableObject(
                this.character.x + 50,
                this.character.y + 110,
                direction
            );

            bottle.world = this;
            this.throwables.push(bottle);

            this.bottleCount--;

            AudioHub.play(AudioHub.THROW, 0.3);

            setTimeout(() => {
                this.canThrow = true;
            }, 300);
        }
    }

    checkBottleHits() {

        for (let i = this.throwables.length - 1; i >= 0; i--) {

            let bottle = this.throwables[i];
            let b = bottle.getHitbox();

            for (let enemy of this.level.enemies) {

<<<<<<< HEAD
                if (e instanceof Endboss) continue;
=======
                if (enemy.dead) continue;
                if (enemy instanceof Endboss) continue;
>>>>>>> aa281ad (Update)

                let e = enemy.getHitbox();

                if (
                    b.x < e.x + e.width &&
                    b.x + b.width > e.x &&
                    b.y < e.y + e.height &&
                    b.y + b.height > e.y
                ) {
                    enemy.die();
                    bottle.stopIntervals?.();
                    this.throwables.splice(i, 1);
                    break;
                }
            }
        }
    }

    checkEndboss() {

        let boss = this.level.enemies.find(e => e instanceof Endboss);
        if (!boss) return;

        if (this.character.x > 1200) {
            this.endbossBarVisible = true;
        }

        this.checkBossBottleHits(boss);
        this.checkBossCharacterHit(boss);
    }

<<<<<<< HEAD
            if (
                bottle.x + bottle.width > boss.x + 50 &&
                bottle.x < boss.x + boss.width - 50 &&
                bottle.y + bottle.height > boss.y + 50 &&
                bottle.y < boss.y + boss.height - 50
            ) {
=======
    checkBossBottleHits(boss) {
>>>>>>> aa281ad (Update)

        for (let i = this.throwables.length - 1; i >= 0; i--) {

            let bottle = this.throwables[i];

            if (bottle.isColliding(boss)) {
                boss.hit();
                this.throwables.splice(i, 1);

                AudioHub.play(AudioHub.ENDBOSS, 0.3);

                if (boss.isDead()) {
<<<<<<< HEAD
                    setTimeout(() => this.triggerWin(), 1200);
                }
            }
        }

        if (this.character.isColliding(boss) && !boss.dead) {

            let now = new Date().getTime();

            if (now - boss.lastAttack > boss.attackCooldown) {

                boss.lastAttack = now;

                this.character.hit();

                if (this.character.isDead()) {
                    this.triggerGameOver();
=======
                    setTimeout(() => this.triggerWin(), 1000);
>>>>>>> aa281ad (Update)
                }
            }
        }
    }

    checkBossCharacterHit(boss) {

        if (!this.character.isColliding(boss)) return;
        if (boss.dead) return;

        this.damageCharacter();
    }

    updateUI() {

        this.statusBarHealth.setPercentage(this.character.energy);

        let coinPercent = (this.coinCount / this.maxCoins) * 100;
        let bottlePercent = (this.bottleCount / this.maxBottles) * 100;

        this.statusBarCoins.setPercentage(Math.min(coinPercent, 100));
        this.statusBarBottles.setPercentage(Math.min(bottlePercent, 100));

        let boss = this.level.enemies.find(e => e instanceof Endboss);

        if (boss && this.endbossBarVisible) {
            this.statusBarEndboss.setPercentage(boss.energy);
        }
    }

    cleanup() {

<<<<<<< HEAD
        this.level.enemies = this.level.enemies.filter(e => {
            if (e instanceof Endboss) return true;
            return !e.removeFromWorld;
        });
    }

    updateUI() {

        this.statusBarHealth.setPercentage(this.character.energy);

        this.statusBarCoins.setPercentage(this.coinCount * 20);

        this.statusBarBottles.setPercentage(this.bottleCount * 20);

        let boss = this.level.enemies.find(e => e instanceof Endboss);

        if (boss) {
            this.statusBarEndboss.setPercentage(boss.energy);
        }
=======
        this.level.enemies = this.level.enemies.filter(enemy =>
            (enemy instanceof Endboss) ? true : !enemy.dead
        );
>>>>>>> aa281ad (Update)
    }

    triggerGameOver() {

        if (this.state !== "running") return;

        this.state = "gameover";
        this.stopAll();

<<<<<<< HEAD
        AudioHub.stopMusic?.();

        document.getElementById("gameOverScreen").style.display = "flex";
=======
        document.getElementById('gameOverScreen').style.display = 'flex';
>>>>>>> aa281ad (Update)
    }

    triggerWin() {

        if (this.state !== "running") return;

        this.state = "win";
        this.stopAll();

<<<<<<< HEAD
        AudioHub.stopMusic?.();

        document.getElementById("winScreen").style.display = "flex";
=======
        document.getElementById('winScreen').style.display = 'flex';
>>>>>>> aa281ad (Update)
    }

    draw() {

<<<<<<< HEAD
        if (this.state === "gameover" || this.state === "win") return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

=======
        if (this.state === "stopped") return;

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.camera_x = -this.character.x + 100;

        if (this.camera_x > 0) {
            this.camera_x = 0;
        }

>>>>>>> aa281ad (Update)
        this.ctx.save();
        this.ctx.translate(this.camera_x, 0);


        this.addObjects(this.level.backgroundObjects);
this.addObjects(this.level.clouds);
this.addObjects(this.level.coins);
this.addObjects(this.level.bottles);

this.addToMap(this.character);
this.addObjects(this.level.enemies);
this.addObjects(this.throwables);

this.ctx.restore();

/* ✔ STATUSBARS FIX (immer sichtbar, keine Kamera) */
this.addToMap(this.statusBarHealth);
this.addToMap(this.statusBarCoins);
this.addToMap(this.statusBarBottles);

if (this.endbossBarVisible) {
    this.addToMap(this.statusBarEndboss);
}


<<<<<<< HEAD
    drawHearts() {

        this.hearts.forEach((h, i) => {

            let img = new Image();
            img.src = 'img/heart_red.png';

            this.ctx.drawImage(img, h.x, h.y, h.size, h.size);

            h.y -= 1;
            h.life--;

            if (h.life <= 0) this.hearts.splice(i, 1);
        });
    }

    addObjects(arr) {
        if (!arr) return;
        arr.forEach(o => this.addToMap(o));
=======
        this.drawLoop = requestAnimationFrame(() => this.draw());
    }

    addObjects(arr) {
        arr?.forEach(obj => this.addToMap(obj));
>>>>>>> aa281ad (Update)
    }

    addToMap(mo) {

        if (!mo || !mo.img) return;

        this.ctx.save();

        if (mo.otherDirection) {
            this.ctx.translate(mo.x + mo.width, 0);
            this.ctx.scale(-1, 1);
            this.ctx.drawImage(mo.img, 0, mo.y, mo.width, mo.height);
        } else {
            this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
        }

        this.ctx.restore();
    }

    stopAll() {
<<<<<<< HEAD
        clearInterval(this.gameLoop);
        this.throwables = [];
        this.hearts = [];
=======

        this.state = "stopped";

        clearInterval(this.gameLoop);
        cancelAnimationFrame(this.drawLoop);

        this.character.stopIntervals?.();
        this.character.stopGravity?.();
        this.character.stopSnoring?.();

        this.level.enemies.forEach(e => {
            e.stopIntervals?.();
            e.stopGravity?.();
        });

        this.throwables.forEach(t => {
            t.stopIntervals?.();
            t.stopGravity?.();
        });

        this.throwables = [];

        AudioHub.resetAll();
>>>>>>> aa281ad (Update)
    }
}