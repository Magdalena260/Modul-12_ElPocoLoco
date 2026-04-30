const level1 = new Level(

    // ENEMIES
    [
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Chicken(),
        new Endboss()
    ],

    // CLOUDS
    [
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud(),
        new Cloud()
    ],

    // BACKGROUND
    [
        new BackgroundObject('img/5_background/layers/air.png', -712),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -712),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -712),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -712),

        new BackgroundObject('img/5_background/layers/air.png', 0),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

        new BackgroundObject('img/5_background/layers/air.png', 712),
        new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 712),
        new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 712),
        new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 712),

        new BackgroundObject('img/5_background/layers/air.png', 712 * 2),
        new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 712 * 2),
        new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 712 * 2),
        new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 712 * 2),
    ],

    // COINS (NOW VISIBLE)
    [
        new Coin(200, 300),
        new Coin(400, 600),
        new Coin(600, 300),
         new Coin(800, 600),
        new Coin(750, 300),
        new Coin(600, 100),
         new Coin(150, 700),
        new Coin(300, 500),
         new Coin(350, 650),
        new Coin(250, 800),
        new Coin(600, 100),
        new Coin(900, 650),
        new Coin(900, 800),
        new Coin(1000, 100),
        new Coin(1100, 100),
        new Coin(1100, 400),
        new Coin(1100, 450),
        new Coin(1100, 550),
    ],

    // BOTTLES (NOW VISIBLE)
    [
        new Bottle(250, 350),
        new Bottle(500, 350),
        new Bottle(650, 350),
        new Bottle(400, 350),
        new Bottle(750, 350),
        new Bottle(650, 350),
        new Bottle(800, 350),
        new Bottle(830, 350),
        new Bottle(950, 350),
        new Bottle(1100, 350),
        new Bottle(1000, 350),
        new Bottle(1050, 350),
        new Bottle(1200, 350),
        new Bottle(1250, 350),
        new Bottle(1210, 350),
        new Bottle(1230, 350),
    ]
);

level1.level_end_x = 712 * 3;