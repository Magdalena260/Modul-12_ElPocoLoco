let canvas;
let world;

function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas);

    console.log('My Character is', world.character);
}

window.addEventListener("keypress",(e) =>{
    if(e.keycode == 39){
    keyboard.RIGHT = false;
    }

    if(e.keycode == 37){
    keyboard.LEFT = false;

    }
        if(e.keycode == 38){
    keyboard.UP = false;
    }

    if(e.keycode == 40){
    keyboard.DOWN = false;

    }

     if(e.keycode == 32{
    keyboard.SPACE = false;

    }


console.log(e);
});