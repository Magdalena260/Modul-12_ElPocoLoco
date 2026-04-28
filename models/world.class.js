class World {

    canvas;
    ctx;
    keyboard;

    camera_x = 0;

    level;
    character;

    statusBar = new StatusBar();
    throwableObjects = [];

    level_start_x = -712;
    level_end_x = 712 * 2.5;

    lastThrow = 0;
    gameStopped = false;

    constructor(canvas, keyboard) {

        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;

        this.character = new Character();
        this.level = level1;

        this.character.world = this;

        this.draw();
        this.run();
    }

    run() {

        // 🐔 COLLISION
        setInterval(() => {

            if (this.gameStopped) return;

            this.level.enemies.forEach(enemy => {

                if (!enemy.dead && this.character.isColliding(enemy)) {

                    if (this.character.speedY < 0) {
                        enemy.die();
                    } else {
                        this.character.hit();
                        this.statusBar.setPercentage(this.character.energy);
                    }
                }
            });

        }, 50);

        // 🍾 THROW
        setInterval(() => {

            if (this.gameStopped) return;

            if (this.keyboard.D) {
                this.throwBottle();
            }

        }, 100);

        // 💥 COLLISION
        setInterval(() => {

            if (this.gameStopped) return;

            this.throwableObjects.forEach((bottle, i) => {

                if (!bottle) return;

                this.level.enemies.forEach(enemy => {

                    if (!enemy.dead && bottle.isColliding(enemy)) {

                        enemy.die();

                        setTimeout(() => {
                            if (bottle.clear) bottle.clear();
                            this.throwableObjects.splice(i, 1);
                        }, 0);
                    }
                });
            });

        }, 50);

        // 👹 END BOSS CHECK
        setInterval(() => {

            let boss = this.level.enemies.find(e => e instanceof Endboss);

            if (boss && boss.energy <= 0) {
                this.winGame();
            }

        }, 200);
    }

    throwBottle() {

        let now = new Date().getTime();
        if (now - this.lastThrow < 500) return;

        this.lastThrow = now;

        this.throwableObjects.push(
            new ThrowableObject(
                this.character.x + 60,
                this.character.y + 120
            )
        );
    }

    winGame() {
        this.gameStopped = true;
        alert("🎉 YOU WIN!");
        location.reload();
    }

    draw() {

        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.ctx.save();

        // 📍 CAMERA LIMIT
        let maxCam = -(this.level_end_x - this.canvas.width);

        this.camera_x = -this.character.x + 100;

        // ⛔ links
        if (this.camera_x > 0) this.camera_x = 0;

        // ⛔ rechts (bis Endboss)
        if (this.camera_x < maxCam) this.camera_x = maxCam;

        this.ctx.translate(this.camera_x, 0);

        this.addObjects(this.level.backgroundObjects);
        this.addObjects(this.level.clouds);
        this.addObjects(this.level.enemies);
        this.addObjects(this.throwableObjects);

        this.addToMap(this.character);

        this.ctx.restore();

        this.addToMap(this.statusBar);

        requestAnimationFrame(() => this.draw());
    }

    addObjects(arr) {
        arr.forEach(o => this.addToMap(o));
    }

    addToMap(mo) {

        if (!mo || !mo.img) return;

        this.ctx.drawImage(
            mo.img,
            mo.x,
            mo.y,
            mo.width,
            mo.height
        );
    }
}