class Character extends MovableObject {

    height = 300;
    y = 130;
    speed = 5;

    world;
    currentImage = 0;

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];

    constructor() {

        super();

        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);

        this.animate();

    }

    animate() {

        setInterval(() => {

            if (this.world.keyboard.RIGHT) {

                this.moveRight();

                let i = this.currentImage % this.IMAGES_WALKING.length;
                let path = this.IMAGES_WALKING[i];

                this.img = this.imageCache[path];
                this.currentImage++;

            }

        }, 1000 / 10);

    }

}