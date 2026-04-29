class Character extends MovableObject {

    height = 280;
    width = 150;

    y = 150;
    speed = 6;

    world;

    lastMove = new Date().getTime();

    // 🎬 ALLE ANIMATIONEN (vollständig wie im Projekt gedacht)

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png'
    ];

    IMAGES_IDLE = [
        'img/2_character_pepe/1_idle/idle/I-1.png',
        'img/2_character_pepe/1_idle/idle/I-2.png',
        'img/2_character_pepe/1_idle/idle/I-3.png'
    ];

    IMAGES_SLEEP = [
        'img/2_character_pepe/1_idle/long_idle/I-11.png',
        'img/2_character_pepe/1_idle/long_idle/I-12.png',
        'img/2_character_pepe/1_idle/long_idle/I-13.png'
    ];

    IMAGES_JUMPING = [
        'img/2_character_pepe/3_jump/J-31.png'
    ];

    constructor() {

        super();

        this.loadImage(this.IMAGES_IDLE[0]);

        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_SLEEP);
        this.loadImages(this.IMAGES_JUMPING);

        this.applyGravity();
        this.animate();
    }

    animate() {

        // 🎮 MOVEMENT LOOP
        setInterval(() => {

            if (!this.world) return;

            let moving = false;

            // 👉 RIGHT
            if (this.world.keyboard.RIGHT &&
                this.x < this.world.level.level_end_x - this.width) {

                this.x += this.speed;
                this.otherDirection = false;
                moving = true;
            }

            // 👉 LEFT
            if (this.world.keyboard.LEFT &&
                this.x > 0) {

                this.x -= this.speed;
                this.otherDirection = true;
                moving = true;
            }

            // 🦘 JUMP
            if (
                this.world.keyboard.SPACE &&
                !this.isAboveGround()
            ) {

                this.jump();
            }

            // 📷 CAMERA FOLLOW
            this.world.camera_x = -this.x + 100;

            // ⏱ last move tracking
            if (moving ||
                this.world.keyboard.SPACE) {

                this.lastMove = new Date().getTime();
            }

        }, 1000 / 60);


        // 🎬 ANIMATION LOOP (FULL STATE MACHINE)

        setInterval(() => {

            let timePassed =
                new Date().getTime() - this.lastMove;

            // 🦘 JUMP (höchste Priorität)
            if (this.isAboveGround()) {

                this.playAnimation(this.IMAGES_JUMPING);
                return;
            }

            // 🚶 WALK
            if (
                this.world.keyboard.RIGHT ||
                this.world.keyboard.LEFT
            ) {

                this.playAnimation(this.IMAGES_WALKING);
                return;
            }

            // 😴 SLEEP (nach 5 Sekunden Inaktivität)
            if (timePassed > 5000) {

                this.playAnimation(this.IMAGES_SLEEP);
                return;
            }

            // 🙂 IDLE (Standard)
            this.playAnimation(this.IMAGES_IDLE);

        }, 120);
    }
}