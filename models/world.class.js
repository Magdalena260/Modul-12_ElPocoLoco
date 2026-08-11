/**
 * Represents the complete game world.
 * Connects all game objects, updates the
 * game logic, renders the scene, handles
 * collisions and controls the game state.
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

    /**
     * Creates a new game world.
     *
     * @param {HTMLCanvasElement} canvas
     * @param {Keyboard} keyboard
     */
    constructor(canvas, keyboard) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;

        this.character = new Character();
        this.level = level1;

        this.character.world = this;

        this.maxCoins = this.level.coins.length;
        this.maxBottles = this.level.bottles.length;

        this.connectWorld();
        this.initStatusBars();

        this.run();
        this.draw();
    }

    /**
     * Connects all game objects with the current world.
     *
     * @returns {void}
     */
    connectWorld() {
        this.level.enemies.forEach(enemy => enemy.world = this);
        this.level.coins.forEach(coin => coin.world = this);
        this.level.bottles.forEach(bottle => bottle.world = this);
    }

    /**
     * Creates all status bars.
     *
     * @returns {void}
     */
    initStatusBars() {
        this.initHealthBar();
        this.initCoinBar();
        this.initBottleBar();
        this.initEndbossBar();
    }

    /**
     * Creates the health status bar.
     *
     * @returns {void}
     */
    initHealthBar() {
        this.statusBarHealth = new StatusBar([
            'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/0.png',
            'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/20.png',
            'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/40.png',
            'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/60.png',
            'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/80.png',
            'assets/img/7_statusbars/1_statusbar/2_statusbar_health/green/100.png'
        ], 20, 20);
    }

    /**
     * Creates the coin status bar.
     *
     * @returns {void}
     */
    initCoinBar() {
        this.statusBarCoins = new StatusBar([
            'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
            'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
            'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
            'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
            'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
            'assets/img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png'
        ], 20, 80);
    }

    /**
     * Creates the bottle status bar.
     *
     * @returns {void}
     */
    initBottleBar() {
        this.statusBarBottles = new StatusBar([
            'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/0.png',
            'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/20.png',
            'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/40.png',
            'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/60.png',
            'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/80.png',
            'assets/img/7_statusbars/1_statusbar/3_statusbar_bottle/green/100.png'
        ], 20, 140);
    }

    /**
     * Creates the endboss status bar.
     *
     * @returns {void}
     */
    initEndbossBar() {
        this.statusBarEndboss = new StatusBar([
            'assets/img/7_statusbars/2_statusbar_endboss/blue/blue0.png',
            'assets/img/7_statusbars/2_statusbar_endboss/blue/blue20.png',
            'assets/img/7_statusbars/2_statusbar_endboss/blue/blue40.png',
            'assets/img/7_statusbars/2_statusbar_endboss/blue/blue60.png',
            'assets/img/7_statusbars/2_statusbar_endboss/blue/blue80.png',
            'assets/img/7_statusbars/2_statusbar_endboss/blue/blue100.png'
        ], 500, 60);
    }

    /**
     * Starts the main game loop.
     *
     * @returns {void}
     */
    run() {
        this.gameLoop = setSafeInterval(() => {
            if (this.state !== "running") return;

            this.checkGameLogic();
        }, 1000 / 60);
    }

    /**
     * Executes all recurring gameplay checks.
     *
     * @returns {void}
     */
    checkGameLogic() {
        this.checkCoins();
        this.checkBottles();
        this.checkChickenCollisions();
        this.checkThrow();
        this.checkBottleHits();
        this.checkEndboss();
        this.cleanup();
        this.updateUI();
    }

    /**
     * Checks whether Pepe collects coins.
     *
     * @returns {void}
     */
    checkCoins() {
        for (let i = this.level.coins.length - 1; i >= 0; i--) {
            const coin = this.level.coins[i];

            if (this.character.isColliding(coin)) {
                this.collectCoin(i);
            }
        }
    }

    /**
     * Collects a coin.
     *
     * @param {number} index
     * @returns {void}
     */
    collectCoin(index) {
        this.level.coins.splice(index, 1);
        this.coinCount++;

        AudioHub.play(AudioHub.COIN, 0.3);
    }

    /**
     * Checks whether Pepe collects bottles.
     *
     * @returns {void}
     */
    checkBottles() {
        for (let i = this.level.bottles.length - 1; i >= 0; i--) {
            const bottle = this.level.bottles[i];

            if (this.character.isColliding(bottle)) {
                this.level.bottles.splice(i, 1);
                this.bottleCount++;
            }
        }
    }

    /**
     * Damages Pepe and starts a short protection time.
     *
     * @returns {void}
     */
    damageCharacter() {
        if (!this.characterCanTakeDamage) return;

        this.characterCanTakeDamage = false;
        this.character.hit();

        this.startDamageCooldown();

        if (this.character.isDead()) {
            setTimeout(() => this.triggerGameOver(), 500);
        }
    }

    /**
     * Enables damage again after a short cooldown.
     *
     * @returns {void}
     */
    startDamageCooldown() {
        setTimeout(() => {
            this.characterCanTakeDamage = true;
        }, 500);
    }

    /**
     * Checks collisions with regular chickens.
     *
     * @returns {void}
     */
    checkChickenCollisions() {
        this.level.enemies.forEach(enemy => {
            if (!this.isActiveChicken(enemy)) return;
            if (!this.character.isColliding(enemy)) return;

            this.handleChickenCollision(enemy);
        });
    }

    /**
     * Checks whether an enemy is an active regular chicken.
     *
     * @param {MovableObject} enemy
     * @returns {boolean}
     */
    isActiveChicken(enemy) {
        return (
            !(enemy instanceof Endboss) &&
            !enemy.dead
        );
    }

    /**
     * Handles a collision between Pepe and a chicken.
     *
     * @param {MovableObject} enemy
     * @returns {void}
     */
    handleChickenCollision(enemy) {
        if (this.isStomp(enemy)) {
            this.defeatChicken(enemy);
        } else {
            this.damageCharacter();
        }
    }

    /**
     * Checks whether Pepe lands on a chicken from above.
     *
     * @param {MovableObject} enemy
     * @returns {boolean}
     */
    isStomp(enemy) {
        const charBottom =
            this.character.y +
            this.character.height -
            this.character.offset.bottom;

        const enemyTop = enemy.y + enemy.offset.top;

        return (
            this.character.speedY < -2 &&
            charBottom < enemyTop + 30
        );
    }

    /**
     * Defeats a chicken after a successful stomp.
     *
     * @param {MovableObject} enemy
     * @returns {void}
     */
    defeatChicken(enemy) {
        enemy.die();

        this.character.speedY = 14;

        AudioHub.play(AudioHub.CHICKEN, 0.3);
    }

    /**
     * Throws a bottle when possible.
     *
     * @returns {void}
     */
    checkThrow() {
        if (!this.canCreateBottle()) return;

        this.canThrow = false;

        this.character.wakeUp();

        const bottle = this.createThrowableBottle();

        this.throwables.push(bottle);
        this.bottleCount--;

        AudioHub.play(AudioHub.THROW, 0.3);

        this.resetThrowCooldown();
    }

    /**
     * Checks whether Pepe may throw a bottle.
     *
     * @returns {boolean}
     */
    canCreateBottle() {
        return (
            this.keyboard.D &&
            this.canThrow &&
            this.bottleCount > 0
        );
    }

    /**
     * Creates a throwable bottle.
     *
     * @returns {ThrowableObject}
     */
    createThrowableBottle() {
        const direction =
            this.character.otherDirection ? "left" : "right";

        const bottle = new ThrowableObject(
            this.character.x + 50,
            this.character.y + 110,
            direction
        );

        bottle.world = this;

        return bottle;
    }

    /**
     * Resets bottle throw cooldown.
     *
     * @returns {void}
     */
    resetThrowCooldown() {
        setTimeout(() => {
            this.canThrow = true;
        }, 300);
    }

    /**
     * Checks bottle hits against normal enemies.
     *
     * @returns {void}
     */
    checkBottleHits() {
        for (let i = this.throwables.length - 1; i >= 0; i--) {
            this.checkBottleAgainstEnemies(i);
        }
    }

    /**
     * Checks one bottle against all normal enemies.
     *
     * @param {number} bottleIndex
     * @returns {boolean}
     */
    checkBottleAgainstEnemies(bottleIndex) {
        const bottle = this.throwables[bottleIndex];

        for (const enemy of this.level.enemies) {
            if (!this.canBottleHitEnemy(enemy)) continue;

            if (bottle.isColliding(enemy)) {
                this.hitChickenWithBottle(enemy, bottle, bottleIndex);
                return true;
            }
        }

        return false;
    }

    /**
     * Checks whether an enemy can be hit by a bottle.
     *
     * @param {MovableObject} enemy
     * @returns {boolean}
     */
    canBottleHitEnemy(enemy) {
        return (
            !enemy.dead &&
            !(enemy instanceof Endboss)
        );
    }

    /**
     * Handles a bottle hit on a normal chicken.
     *
     * @param {MovableObject} enemy
     * @param {ThrowableObject} bottle
     * @param {number} index
     * @returns {void}
     */
    hitChickenWithBottle(enemy, bottle, index) {
        enemy.die();
        bottle.stopIntervals?.();

        this.throwables.splice(index, 1);
    }

    /**
     * Handles endboss checks.
     *
     * @returns {void}
     */
    checkEndboss() {
        const boss =
            this.level.enemies.find(enemy => enemy instanceof Endboss);

        if (!boss) return;

        this.updateBossBarVisibility();
        this.checkBossBottleHits(boss);
        this.checkBossCharacterHit(boss);
    }

    /**
     * Shows boss bar near the end of the level.
     *
     * @returns {void}
     */
    updateBossBarVisibility() {
        if (this.character.x > 1200) {
            this.endbossBarVisible = true;
        }
    }

    /**
     * Checks bottle collisions with boss.
     *
     * @param {Endboss} boss
     * @returns {void}
     */
    checkBossBottleHits(boss) {
        for (let i = this.throwables.length - 1; i >= 0; i--) {
            const bottle = this.throwables[i];

            if (bottle.isColliding(boss)) {
                this.hitBossWithBottle(boss, bottle, i);
            }
        }
    }

    /**
     * Damages boss with a bottle.
     *
     * @param {Endboss} boss
     * @param {ThrowableObject} bottle
     * @param {number} index
     * @returns {void}
     */
    hitBossWithBottle(boss, bottle, index) {
        boss.hit();
        bottle.stopIntervals?.();

        this.throwables.splice(index, 1);

        AudioHub.play(AudioHub.ENDBOSS, 0.3);

        if (boss.isDead()) {
            setTimeout(() => this.triggerWin(), 1000);
        }
    }

    /**
     * Checks collision between Pepe and boss.
     *
     * @param {Endboss} boss
     * @returns {void}
     */
    checkBossCharacterHit(boss) {
        if (boss.dead) return;
        if (!this.character.isColliding(boss)) return;

        this.damageCharacter();
    }

    /**
     * Updates all status bars.
     *
     * @returns {void}
     */
    updateUI() {
        this.updatePlayerBars();
        this.updateBossBar();
    }

    /**
     * Updates player status bars.
     *
     * @returns {void}
     */
    updatePlayerBars() {
        this.statusBarHealth.setPercentage(this.character.energy);

        const coinPercent =
            (this.coinCount / this.maxCoins) * 100;

        const bottlePercent =
            (this.bottleCount / this.maxBottles) * 100;

        this.statusBarCoins.setPercentage(
            Math.min(coinPercent, 100)
        );

        this.statusBarBottles.setPercentage(
            Math.min(bottlePercent, 100)
        );
    }

    /**
     * Updates boss status bar.
     *
     * @returns {void}
     */
    updateBossBar() {
        const boss =
            this.level.enemies.find(enemy => enemy instanceof Endboss);

        if (!boss || !this.endbossBarVisible) return;

        this.statusBarEndboss.setPercentage(boss.energy);
    }

    /**
     * Removes defeated enemies and destroyed bottles.
     *
     * @returns {void}
     */
    cleanup() {
        this.level.enemies = this.level.enemies.filter(enemy => {
            if (enemy instanceof Endboss) return true;

            return !enemy.removeFromWorld;
        });

        this.throwables = this.throwables.filter(
            bottle => !bottle.removeFromWorld
        );
    }

    /**
     * Shows game over screen.
     *
     * @returns {void}
     */
    triggerGameOver() {
        if (this.state !== "running") return;

        finishGame();

        this.state = "gameover";
        this.stopAll();

        document.getElementById(
            'gameOverScreen'
        ).style.display = 'flex';
    }

    /**
     * Shows victory screen.
     *
     * @returns {void}
     */
    triggerWin() {
        if (this.state !== "running") return;

        finishGame();

        this.state = "win";
        this.stopAll();

        document.getElementById(
            'winScreen'
        ).style.display = 'flex';
    }

    /**
     * Draws one complete frame.
     *
     * @returns {void}
     */
    draw() {
        if (this.state === "stopped") return;

        this.clearCanvas();
        this.updateCamera();

        this.drawBackgroundLayer();
        this.drawStatusBars();
        this.drawForegroundLayer();

        this.drawLoop =
            requestAnimationFrame(() => this.draw());
    }

    /**
     * Clears canvas.
     *
     * @returns {void}
     */
    clearCanvas() {
        this.ctx.clearRect(
            0,
            0,
            this.canvas.width,
            this.canvas.height
        );
    }

    /**
     * Updates horizontal camera position.
     *
     * @returns {void}
     */
    updateCamera() {
        this.camera_x = -this.character.x + 100;

        if (this.camera_x > 0) {
            this.camera_x = 0;
        }
    }

    /**
     * Draws scenery and collectibles.
     *
     * @returns {void}
     */
    drawBackgroundLayer() {
        this.ctx.save();
        this.ctx.translate(this.camera_x, 0);

        this.addObjects(this.level.backgroundObjects);
        this.addObjects(this.level.clouds);
        this.addObjects(this.level.coins);
        this.addObjects(this.level.bottles);

        this.ctx.restore();
    }

    /**
     * Draws fixed status bars.
     *
     * @returns {void}
     */
    drawStatusBars() {
        this.addToMap(this.statusBarHealth);
        this.addToMap(this.statusBarCoins);
        this.addToMap(this.statusBarBottles);

        if (this.endbossBarVisible) {
            this.addToMap(this.statusBarEndboss);
        }
    }

    /**
     * Draws Pepe, enemies and thrown bottles.
     *
     * @returns {void}
     */
    drawForegroundLayer() {
        this.ctx.save();
        this.ctx.translate(this.camera_x, 0);

        this.addToMap(this.character);
        this.addObjects(this.level.enemies);
        this.addObjects(this.throwables);

        this.ctx.restore();
    }

    /**
     * Draws all objects from an array.
     *
     * @param {MovableObject[]} objects
     * @returns {void}
     */
    addObjects(objects) {
        objects?.forEach(object => this.addToMap(object));
    }

    /**
     * Draws one object.
     *
     * @param {MovableObject} object
     * @returns {void}
     */
    addToMap(object) {
        if (!object || !object.img) return;

        this.ctx.save();

        if (object.otherDirection) {
            this.drawFlippedObject(object);
        } else {
            this.drawNormalObject(object);
        }

        this.ctx.restore();
    }

    /**
     * Draws object normally.
     *
     * @param {MovableObject} object
     * @returns {void}
     */
    drawNormalObject(object) {
        this.ctx.drawImage(
            object.img,
            object.x,
            object.y,
            object.width,
            object.height
        );
    }

    /**
     * Draws object horizontally flipped.
     *
     * @param {MovableObject} object
     * @returns {void}
     */
    drawFlippedObject(object) {
        this.ctx.translate(
            object.x + object.width,
            0
        );

        this.ctx.scale(-1, 1);

        this.ctx.drawImage(
            object.img,
            0,
            object.y,
            object.width,
            object.height
        );
    }

    /**
     * Stops all running game processes.
     *
     * @returns {void}
     */
    stopAll() {
        this.state = "stopped";

        clearInterval(this.gameLoop);
        cancelAnimationFrame(this.drawLoop);

        this.stopCharacter();
        this.stopEnemies();
        this.stopThrowables();

        AudioHub.resetAll();
    }

    /**
     * Stops character processes.
     *
     * @returns {void}
     */
    stopCharacter() {
        this.character.stopIntervals?.();
        this.character.stopGravity?.();
        this.character.stopSnoring?.();
    }

    /**
     * Stops enemy processes.
     *
     * @returns {void}
     */
    stopEnemies() {
        this.level.enemies.forEach(enemy => {
            enemy.stopIntervals?.();
            enemy.stopGravity?.();
        });
    }

    /**
     * Stops thrown bottles.
     *
     * @returns {void}
     */
    stopThrowables() {
        this.throwables.forEach(bottle => {
            bottle.stopIntervals?.();
            bottle.stopGravity?.();
        });

        this.throwables = [];
    }
}