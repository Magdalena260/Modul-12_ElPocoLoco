class ThrowableObject extends MovableObject{

    constructor(x, y){
       super(). this.loadImage('img/7_statusbars/3_icons/icon_salsa_bottle.png');
        this.x = x;
        this.y = y;
        this.height = 60;
        this.width = 50;
        this.throw();
       
    }


    throw(x,y){

        this.x = x;
        this.y = y;
        this.speedY = 30;
        this.applyGravity();
        setInterval(() =>{
        this.x += 10;


        },25);
    }
}