class Character extends MovableObject {

    height = 300;
    y = 80;
    speed = 15;
    otherDirection = false;

    world;
    currentImage = 0;
    speedY = 0;
    accelation = 2.5;



    IMAGES = [
        'img/2_character_pepe/2_walk/W-21.png',
        'img/2_character_pepe/2_walk/W-22.png',
        'img/2_character_pepe/2_walk/W-23.png',
        'img/2_character_pepe/2_walk/W-24.png',
        'img/2_character_pepe/2_walk/W-25.png',
        'img/2_character_pepe/2_walk/W-26.png',
    ];

    IMGAGES_JUMPING =[

        'img/2_character_pepe/3_jump/J-31.png',
        'img/2_character_pepe/3_jump/J-32.png',
        'img/2_character_pepe/3_jump/J-33.png',
        'img/2_character_pepe/3_jump/J-34.png',
        'img/2_character_pepe/3_jump/J-35.png',
        'img/2_character_pepe/3_jump/J-36.png',
        'img/2_character_pepe/3_jump/J-37.png',
        'img/2_character_pepe/3_jump/J-39.png',
        
    ]

    constructor(world) {
        super();
        this.world = world;

        this.loadImage(this.IMAGES[0]);
        this.loadImages(this.IMAGES);
        this.loadImages(this.IMAGES.WALKING);
        this.loadImages(this.IMAGES.JUMPING);
        this.applyGravity();
        this.animate();
        
    }

  animate() {

    setInterval(() => {

        let moving = false;

       
        if (this.isAboveGround()) {

            this.playAnimation(this.IMAGES_JUMPING);

        } else {

        setInterval(() => {
            this.walking_sound.pause();
            
            if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
                this.moveRight();
                this.otherDirection = false;
                this.walking_sound.play();
            }

              if (this.world.keyboard.LEFT && this.x < this.world.level.level_end_x) {
                this.moveLeft();
                this.walking_sound.play();
                this.otherDirection = true;
            }


            console.log('this.speedY', this.speedY);

            if(this.world.keyboard.UP){
                this.speedY = 20;

            }
            if(this.world.keyboard.UP && !this.isAboveGround()){
                this.jump();

            }

            
            if (this.world.keyboard.LEFT && this.x > -712) {
                this.x -= this.speed;
                this.otherDirection = true;
                moving = true;
            }

          
            this.world.camera_x = - this.x + 100;
        }, 1000 / 60);

            if (moving) {
                this.playAnimation(this.IMAGES);
            }

        }

    }, 1000 / 60);
}

           setInterval(() => {
            if (this.isAboveGround()){


            }
            
}