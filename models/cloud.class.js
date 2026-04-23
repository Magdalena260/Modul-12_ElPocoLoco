class cloud extends MovableObject {
    y = 20;
    width = 500;
    height = 250;
    speed = 0.15;

constructor() {
        super();
        this.loadImage('img/5_background/layers/4_clouds/1.png');

        this.x = Math.random() * 500;
        this.animate();
    }

    animate(){
   this.moveLeft();
    }

    moveLeft(){
        setInterval (() => {
        this.x -= 0.15;
    },1000 / 60); 
   

    }

}