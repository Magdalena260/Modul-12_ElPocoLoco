class SmallChicken extends MovableObject {

    y = 370;
    height = 50;
    width = 45;

    speed = 1.6;

    dead = false;
    activated = false;

    IMAGES_WALKING = [/* unchanged */];
    IMAGES_DEAD = [/* unchanged */];

    constructor() {
        super();

        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_DEAD);

        this.x = 400 + Math.random() * 800;

        this.animate();
    }

    animate() {

        setInterval(() => {

            if (this.dead) return;

            if (!this.activated && this.world?.character) {
                let dist = Math.abs(this.world.character.x - this.x);
                if (dist < 800) this.activated = true;
            }

            if (this.activated) this.moveLeft();

        }, 1000 / 60);

        setInterval(() => {

            if (this.dead) {
                this.playAnimation(this.IMAGES_DEAD);
            } else {
                this.playAnimation(this.IMAGES_WALKING);
            }

        }, 200);
    }

    die() {

        if (this.dead) return;

        this.dead = true;
        this.speed = 0;

        AudioHub.play(AudioHub.CHICKEN_DEATH, 0.1); //
    }
}