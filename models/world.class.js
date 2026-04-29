class World {

    canvas;
    ctx;
    keyboard;

    character;
    level;

    camera_x = 0;

    statusBar = new StatusBar();

    gameOver = false;

    constructor(canvas, keyboard) {

        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.keyboard = keyboard;

        this.character = new Character();
        this.level = level1;

        this.setWorld();

        this.run();
        this.draw();
    }

    setWorld() {
        this.character.world = this;
    }

    run() {

        setInterval(() => {

            if (!this.gameOver) {
                this.checkCollisions();
            }

        }, 50);
    }

    checkCollisions() {

        this.level.enemies.forEach((enemy) => {

            if (enemy.dead) return;

            if (this.character.isColliding(enemy)) {

                // 🐔 CHICKEN
                if (enemy instanceof Chicken) {

                    if (this.character.speedY < 0) {

                        enemy.die();
                        this.character.speedY = 15;

                    } else {

                        if (!this.character.isHurt()) {

                            this.character.hit();

                            this.statusBar.setPercentage(
                                this.character.energy
                            );
                        }
                    }
                }

                // 🐔 ENDBOSS → WIN
                if (enemy instanceof Endboss) {

                    this.showWinScreen();

                }
            }
        });
    }

    // 🏆 WIN SCREEN
    showWinScreen() {

        this.gameOver = true;

        // ❌ Spiel stoppen
        this.character.speed = 0;

        // 🖼 Overlay
        let div = document.createElement("div");

        div.style.position = "absolute";
        div.style.top = "0";
        div.style.left = "0";
        div.style.width = "100%";
        div.style.height = "100%";
        div.style.display = "flex";
        div.style.flexDirection = "column";
        div.style.alignItems = "center";
        div.style.justifyContent = "center";
        div.style.background = "rgba(0,0,0,0.85)";
        div.style.color = "gold";
        div.style.zIndex = "999";

        // TEXT
        let text = document.createElement("div");
        text.innerHTML = "YOU WIN!";
        text.style.fontFamily = "Rubik Gemstones, Arial";
        text.style.fontSize = "90px";
        text.style.marginBottom = "20px";

        // BILD
        let img = document.createElement("img");
        img.src = "img/win.png"; // dein Bild folgt noch!!!!
        img.style.width = "300px";

        div.appendChild(text);
        div.appendChild(img);

        document.body.appendChild(div);
    }

    // DRAW LOOP
    draw() {

        if (!this.gameOver) {

            this.ctx.clearRect(
                0,
                0,
                this.canvas.width,
                this.canvas.height
            );

            this.ctx.save();

            this.ctx.translate(
                this.camera_x,
                0
            );

            this.addObjectsToMap(this.level.backgroundObjects);
            this.addObjectsToMap(this.level.clouds);
            this.addObjectsToMap(this.level.enemies);

            this.addToMap(this.character);

            this.ctx.restore();

            this.addToMap(this.statusBar);

        }

        requestAnimationFrame(() => this.draw());
    }

    addObjectsToMap(objects) {

        objects.forEach(o => this.addToMap(o));

    }

    addToMap(mo) {

        if (!mo || !mo.img) return;

        if (mo.otherDirection) {

            this.ctx.save();

            this.ctx.translate(
                mo.x + mo.width,
                mo.y
            );

            this.ctx.scale(-1, 1);

            this.ctx.drawImage(
                mo.img,
                0,
                0,
                mo.width,
                mo.height
            );

            this.ctx.restore();

        } else {

            this.ctx.drawImage(
                mo.img,
                mo.x,
                mo.y,
                mo.width,
                mo.height
            );
        }
    }
}