/**
 * Represents the complete game world.
 * Handles rendering, collisions, UI and game logic.
 */
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

    state = "running";
    gameLoop;

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

    // ================= LEVEL RESET HELP =================

    initLevelEntities() {

        this.level.enemies.forEach(e => {
            e.world = this;

            if (e instanceof Endboss) {
                e.dead = false;
                e.energy = 100;
            }
        });
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
            'img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
        ], 500, 20);
    }

    // ================= GAME LOOP =================

    run() {

        this.gameLoop = setInterval(() => {

            if (this.state !== "running") return;

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

    // ================= RESET (MENTOR SAFE VERSION) =================

    restartGame() {

        // STOP EVERYTHING
        clearInterval(this.gameLoop);

        // RESET STATE
        this.state = "running";

        // RESET VALUES
        this.coinCount = 0;
        this.bottleCount = 3;
        this.throwables = [];
        this.hearts = [];

        // RESET WORLD CONTENT
        this.character = new Character();
        this.character.world = this;

        this.level = level1; // 👈 HIER entstehen deine neuen Hühner!

        this.level.enemies.forEach(e => {
            e.world = this;

            if (e instanceof Endboss) {
                e.dead = false;
                e.energy = 100;
            }
        });

        this.initStatusBars();

        // HIDE SCREENS
        document.getElementById("gameOverScreen").style.display = "none";
        document.getElementById("winScreen").style.display = "none";

        // RESTART LOOP
        this.run();
    }

    // ================= UI =================

    updateUI() {

        this.statusBarHealth.setPercentage(this.character.energy);
        this.statusBarCoins.setPercentage(this.coinCount * 10);
        this.statusBarBottles.setPercentage(this.bottleCount * 10);

        let boss = this.level.enemies.find(e => e instanceof Endboss);

        if (boss) {
            this.statusBarEndboss.setPercentage(boss.energy);
        }
    }

    // ================= STATE =================

    triggerGameOver() {

        this.state = "gameover";

        document.getElementById("gameOverScreen").style.display = "flex";
    }

    triggerWin() {

        this.state = "win";

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

    // (Rest bleibt wie bei dir – unverändert)
}