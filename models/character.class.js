class Character extends MovableObject {

    height = 300;
    y = 80;
    speed = 5;

    world;

    IMAGES_WALKING = [

        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png'

    ];

    IMAGES_JUMPING = [

        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png'

    ];

    constructor() {

        super();

        this.loadImage(
            this.IMAGES_WALKING[0]
        );

        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);

        this.applyGravity();
        this.animate();

    }

    animate() {

        setInterval(() => {

            if (this.world.keyboard.RIGHT &&
                this.x < this.world.level.level_end_x) {

                this.moveRight();
                this.otherDirection = false;

            }

            if (this.world.keyboard.LEFT &&
                this.x > 0) {

                this.moveLeft();
                this.otherDirection = true;

            }

            if (this.world.keyboard.SPACE &&
                !this.isAboveGround()) {

                this.jump();

            }

            this.world.camera_x =
                -this.x + 100;

        }, 1000 / 60);


        setInterval(() => {

            if (this.isAboveGround()) {

                this.playAnimation(
                    this.IMAGES_JUMPING
                );

            } else {

                this.playAnimation(
                    this.IMAGES_WALKING
                );

            }

        }, 100);

    }

    jump() {

        this.speedY = 30;

    }

}