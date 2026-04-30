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

    coinCount = 0;
    bottleCount = 3;

    throwables = [];
    canThrow = true;

    constructor(canvas, keyboard) {

        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;

        this.character = new Character();
        this.level = level1;

        this.setWorld();

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

        this.run();
        this.draw();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {

        setInterval(() => {

            this.checkCoin();
            this.checkBottle();
            this.checkChicken();
            this.checkThrow();

        }, 100);
    }

    checkCoin() {
        this.level.coins.forEach((c, i) => {
            if (this.character.isColliding(c)) {
                this.level.coins.splice(i, 1);
                this.coinCount++;
            }
        });
    }

    checkBottle() {
        this.level.bottles.forEach((b, i) => {
            if (this.character.isColliding(b)) {
                this.level.bottles.splice(i, 1);
                this.bottleCount++;
            }
        });
    }

    checkChicken() {
        this.level.enemies.forEach((e, i) => {
            if (this.character.isColliding(e)) {

                let jumpKill =
                    this.character.speedY < 0 &&
                    this.character.y + this.character.height < e.y + 20;

                if (jumpKill) {
                    this.level.enemies.splice(i, 1);
                    this.character.speedY = 10;
                } else {
                    this.character.hit();
                }
            }
        });
    }

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

            setTimeout(() => {
                this.canThrow = true;
            }, 300);
        }
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

        requestAnimationFrame(() => this.draw());
    }

    addObjects(arr) {
        if (!arr) return;
        arr.forEach(o => this.addToMap(o));
    }

    addToMap(mo) {
        if (!mo || !mo.img) return;
        if (!mo.img.complete) return;
        if (mo.img.naturalWidth === 0) return;

        this.ctx.drawImage(mo.img, mo.x, mo.y, mo.width, mo.height);
    }
}