class Character extends MovableObject {

    height = 300;
    y = 130;
    speed = 10;

    IMAGES_WALKING = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];

    world;
    currentImage = 0;

    constructor(world) {
        super();
        this.world = world;

        this.loadImage(this.IMAGES_WALKING[0]);
        this.loadImages(this.IMAGES_WALKING);

        this.animate();
    }

    move() {

        if (this.world.keyboard.RIGHT) {
            this.x += this.speed;
        }

        if (this.world.keyboard.LEFT) {
            this.x -= this.speed;
        }

        if (this.world.keyboard.SPACE) {
            this.jump();
        }
    }

    animate() {

        // Bewegung + Steuerung
        setInterval(() => {
            this.move();
            this.playAnimation();
        }, 1000 / 60);
    }

    playAnimation() {

        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {

            let i = this.currentImage % this.IMAGES_WALKING.length;
            let path = this.IMAGES_WALKING[i];

            this.img = this.imageCache[path];
            this.currentImage++;
        }
    }

    jump() {
        // kann später Gravity bekommen
    }
}