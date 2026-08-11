/**
 * Represents Pepe, the playable character.
 * Handles movement, jumping, animations
 * and idle behaviour.
 */
class Character extends MovableObject {

    height = 280;
    width = 150;
    y = 140;
    speed = 6;

    acceleration = 1.5;
    jumpPower = 23;

    world;
    lastMove = Date.now();

    movementInterval;
    animationInterval;

    snoringSound = null;
    snoringActive = false;

    SNORE_DELAY = 15000;

    isJumping = false;
    jumpAnimationPlayed = false;
    jumpLocked = false;

    offset = {
        top: 110,
        left: 35,
        right: 35,
        bottom: 15
    };

    IMAGES_WALKING = [
        'assets/img/2_character_pepe/2_walk/W-21.png',
        'assets/img/2_character_pepe/2_walk/W-22.png',
        'assets/img/2_character_pepe/2_walk/W-23.png',
        'assets/img/2_character_pepe/2_walk/W-24.png',
        'assets/img/2_character_pepe/2_walk/W-25.png',
        'assets/img/2_character_pepe/2_walk/W-26.png'
    ];

    IMAGES_JUMPING = [
        'assets/img/2_character_pepe/3_jump/J-31.png',
        'assets/img/2_character_pepe/3_jump/J-32.png',
        'assets/img/2_character_pepe/3_jump/J-33.png',
        'assets/img/2_character_pepe/3_jump/J-34.png',
        'assets/img/2_character_pepe/3_jump/J-35.png',
        'assets/img/2_character_pepe/3_jump/J-36.png',
        'assets/img/2_character_pepe/3_jump/J-37.png',
        'assets/img/2_character_pepe/3_jump/J-38.png',
        'assets/img/2_character_pepe/3_jump/J-39.png'
    ];

    IMAGES_HURT = [
        'assets/img/2_character_pepe/4_hurt/H-41.png',
        'assets/img/2_character_pepe/4_hurt/H-42.png',
        'assets/img/2_character_pepe/4_hurt/H-43.png'
    ];

    IMAGES_DEAD = [
        'assets/img/2_character_pepe/5_dead/D-51.png',
        'assets/img/2_character_pepe/5_dead/D-52.png',
        'assets/img/2_character_pepe/5_dead/D-53.png',
        'assets/img/2_character_pepe/5_dead/D-54.png',
        'assets/img/2_character_pepe/5_dead/D-55.png',
        'assets/img/2_character_pepe/5_dead/D-56.png',
        'assets/img/2_character_pepe/5_dead/D-57.png'
    ];

    IMAGES_IDLE = [
        'assets/img/2_character_pepe/1_idle/idle/I-1.png',
        'assets/img/2_character_pepe/1_idle/idle/I-2.png',
        'assets/img/2_character_pepe/1_idle/idle/I-3.png',
        'assets/img/2_character_pepe/1_idle/idle/I-4.png',
        'assets/img/2_character_pepe/1_idle/idle/I-5.png',
        'assets/img/2_character_pepe/1_idle/idle/I-6.png',
        'assets/img/2_character_pepe/1_idle/idle/I-7.png',
        'assets/img/2_character_pepe/1_idle/idle/I-8.png',
        'assets/img/2_character_pepe/1_idle/idle/I-9.png',
        'assets/img/2_character_pepe/1_idle/idle/I-10.png'
    ];

    IMAGES_LONG_IDLE = [
        'assets/img/2_character_pepe/1_idle/long_idle/I-11.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-12.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-13.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-14.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-15.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-16.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-17.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-18.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-19.png',
        'assets/img/2_character_pepe/1_idle/long_idle/I-20.png'
    ];

    /**
     * Creates Pepe and starts his game loops.
     */
    constructor() {
        super();

        this.loadCharacterImages();
        this.applyGravity();
        this.animate();
    }

    /**
     * Loads all character images.
     *
     * @returns {void}
     */
    loadCharacterImages() {
        this.loadImage(this.IMAGES_IDLE[0]);
        this.loadImages(this.IMAGES_WALKING);
        this.loadImages(this.IMAGES_JUMPING);
        this.loadImages(this.IMAGES_HURT);
        this.loadImages(this.IMAGES_DEAD);
        this.loadImages(this.IMAGES_IDLE);
        this.loadImages(this.IMAGES_LONG_IDLE);
    }

    /**
     * Starts movement and animation loops.
     *
     * @returns {void}
     */
    animate() {
        this.startMovementLoop();
        this.startAnimationLoop();
    }

    /**
     * Starts the character movement loop.
     *
     * @returns {void}
     */
    startMovementLoop() {
        this.movementInterval = setSafeInterval(() => {
            if (!this.canMove()) return;

            const moving = this.handleMovement();

            this.handleLanding();
            this.updateLastMove(moving);
            this.updateCamera();
        }, 1000 / 60);
    }

    /**
     * Checks whether Pepe may currently move.
     *
     * @returns {boolean}
     */
    canMove() {
        return (
            this.world &&
            this.world.state === 'running' &&
            !this.isDead()
        );
    }

    /**
     * Handles movement and jumping.
     *
     * @returns {boolean}
     */
    handleMovement() {
        let moving = false;

        moving = this.moveRightIfPossible() || moving;
        moving = this.moveLeftIfPossible() || moving;
        moving = this.jumpIfPossible() || moving;

        return moving;
    }

    /**
     * Moves Pepe right when allowed.
     *
     * @returns {boolean}
     */
    moveRightIfPossible() {
        if (!this.world.keyboard.RIGHT) return false;
        if (!this.canMoveRight()) return false;

        this.x += this.speed;
        this.otherDirection = false;

        return true;
    }

    /**
     * Checks the right level boundary.
     *
     * @returns {boolean}
     */
    canMoveRight() {
        return (
            this.x <
            this.world.level.level_end_x - this.width
        );
    }

    /**
     * Moves Pepe left when allowed.
     *
     * @returns {boolean}
     */
    moveLeftIfPossible() {
        if (!this.world.keyboard.LEFT) return false;
        if (this.x <= 0) return false;

        this.x -= this.speed;
        this.otherDirection = true;

        return true;
    }

    /**
     * Starts a jump when possible.
     *
     * One key press can only trigger one jump.
     *
     * @returns {boolean}
     */
    jumpIfPossible() {
        const pressed = this.jumpKeyPressed();

        if (!pressed) {
            this.jumpLocked = false;
            return false;
        }

        if (this.jumpLocked || this.isAboveGround()) {
            return false;
        }

        this.jumpLocked = true;

        this.jump();
        this.startJumpAnimation();

        AudioHub.play(AudioHub.JUMP, 0.3);

        return true;
    }

    /**
     * Makes Pepe jump with a smoother
     * and slower jump curve.
     *
     * @returns {void}
     */
    jump() {
        if (!this.isAboveGround()) {
            this.speedY = this.jumpPower;
        }
    }

    /**
     * Checks whether a jump key is pressed.
     *
     * @returns {boolean}
     */
    jumpKeyPressed() {
        return (
            this.world.keyboard.SPACE ||
            this.world.keyboard.UP
        );
    }

    /**
     * Prepares the jump animation.
     *
     * @returns {void}
     */
    startJumpAnimation() {
        this.isJumping = true;
        this.jumpAnimationPlayed = false;
        this.currentImage = 0;
    }

    /**
     * Resets jump state after landing.
     *
     * @returns {void}
     */
    handleLanding() {
        if (this.isAboveGround()) return;
        if (!this.isJumping) return;

        this.isJumping = false;
        this.jumpAnimationPlayed = false;
        this.currentImage = 0;
    }

    /**
     * Stores the latest movement time.
     *
     * @param {boolean} moving
     * @returns {void}
     */
    updateLastMove(moving) {
        if (!moving) return;

        this.lastMove = Date.now();
        this.stopSnoring();
    }

    /**
     * Wakes Pepe up after an action.
     *
     * @returns {void}
     */
    wakeUp() {
        this.lastMove = Date.now();
        this.currentImage = 0;
        this.stopSnoring();
    }

    /**
     * Updates the camera position.
     *
     * @returns {void}
     */
    updateCamera() {
        this.world.camera_x = -this.x + 100;
    }

    /**
     * Starts the character animation loop.
     *
     * @returns {void}
     */
    startAnimationLoop() {
        this.animationInterval = setSafeInterval(() => {
            if (!this.world || this.world.state !== 'running') return;

            this.playCurrentAnimation();
        }, 120);
    }

    /**
     * Chooses the correct character animation.
     *
     * @returns {void}
     */
    playCurrentAnimation() {
        if (this.playDeadAnimation()) return;
        if (this.playHurtAnimation()) return;
        if (this.playJumpAnimation()) return;
        if (this.playWalkAnimation()) return;

        this.playIdleAnimation();
    }

    /**
     * Plays the death animation when Pepe is dead.
     *
     * @returns {boolean}
     */
    playDeadAnimation() {
        if (!this.isDead()) return false;

        this.playAnimation(this.IMAGES_DEAD);
        this.stopSnoring();

        return true;
    }

    /**
     * Plays the hurt animation.
     *
     * @returns {boolean}
     */
    playHurtAnimation() {
        if (!this.isHurt()) return false;

        this.playAnimation(this.IMAGES_HURT);
        this.stopSnoring();

        return true;
    }

    /**
     * Plays the jump animation.
     *
     * @returns {boolean}
     */
    playJumpAnimation() {
        if (!this.isAboveGround()) return false;

        this.playAnimationOnce(this.IMAGES_JUMPING);

        return true;
    }

    /**
     * Plays walking animation while moving.
     *
     * @returns {boolean}
     */
    playWalkAnimation() {
        if (!this.isWalking()) return false;

        this.playAnimation(this.IMAGES_WALKING);

        return true;
    }

    /**
     * Checks whether a movement key is pressed.
     *
     * @returns {boolean}
     */
    isWalking() {
        return (
            this.world.keyboard.RIGHT ||
            this.world.keyboard.LEFT
        );
    }

    /**
     * Plays idle or sleeping animation.
     *
     * @returns {void}
     */
    playIdleAnimation() {
        const idleTime = Date.now() - this.lastMove;

        if (idleTime > this.SNORE_DELAY) {
            this.playLongIdle();
        } else {
            this.playNormalIdle();
        }
    }

    /**
     * Plays Pepe's sleeping animation.
     *
     * @returns {void}
     */
    playLongIdle() {
        this.playAnimation(this.IMAGES_LONG_IDLE);
        this.startSnoring();
    }

    /**
     * Plays Pepe's normal idle animation.
     *
     * @returns {void}
     */
    playNormalIdle() {
        this.playAnimation(this.IMAGES_IDLE);
        this.stopSnoring();
    }

    /**
     * Starts Pepe's snoring sound.
     *
     * @returns {void}
     */
    startSnoring() {
        if (this.snoringActive || AudioHub.isMuted) return;

        this.snoringActive = true;
        this.snoringSound = new Audio('./assets/sounds/snoring.mp3');

        this.configureSnoring();
        this.snoringSound.play().catch(() => {});
    }

    /**
     * Configures the snoring audio.
     *
     * @returns {void}
     */
    configureSnoring() {
        this.snoringSound.loop = true;
        this.snoringSound.volume = 0.05;
    }

    /**
     * Stops Pepe's snoring sound.
     *
     * @returns {void}
     */
    stopSnoring() {
        this.snoringActive = false;

        if (!this.snoringSound) return;

        this.snoringSound.pause();
        this.snoringSound = null;
    }

    /**
     * Stops all character intervals.
     *
     * @returns {void}
     */
    stopIntervals() {
        clearInterval(this.movementInterval);
        clearInterval(this.animationInterval);

        this.stopSnoring();
    }
}