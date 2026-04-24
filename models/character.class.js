class Character extends MovableObject {

    height = 300;
    y = 130;
    speed = 15;

    world;
    currentImage = 0;

    IMAGES = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];

    constructor(world) {
        super();
        this.world = world;

        this.loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);

        this.animate();
    }

    animate() {
        setInterval(() => {

            let moving = false;

            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.x += this.speed;
                this.otherDirection = false;
                moving = true;
            }

            if (this.world.keyboard.LEFT && this.x > -712) {
                this.x -= this.speed;
                this.otherDirection = true;
                moving = true;
            }

            this.world.camera_x = -(this.x - 100);

            if (moving) {
                this.playAnimation(this.IMAGES);
            }

        }, 1000 / 60);
    }
}