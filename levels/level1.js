<<<<<<< HEAD
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
        new Endboss()
    ],

    // CLOUDS
    [
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
=======
/**
 * Stores the first game level instance.
 * @type {Level}
 */
let level1;

/**
 * Creates and configures the first level.
 * Contains enemies, clouds, background, coins and bottles.
 *
 * @returns {Level}
 */
function createLevel1() {

    level1 = new Level(

        // ================= ENEMIES =================
        [
            new Chicken(),
            new SmallChicken(),
            new Chicken(),
>>>>>>> aa281ad (Update)



<<<<<<< HEAD
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
    ],

    // BOTTLES (NOW VISIBLE)
    [
        new Bottle(250, 350),
        new Bottle(500, 350),
        new Bottle(650, 350),
        new Bottle(800, 350)
    ]
);

level1.level_end_x = 712 * 3;
=======
            new SmallChicken(),
            new SmallChicken(),
            new Chicken(),
            new SmallChicken(),

            new Chicken(),
            new SmallChicken(),
            new Chicken(),

            new Chicken(),
            new SmallChicken(),

            new Chicken(),
            new SmallChicken(),

            new Chicken(),

            new Endboss()
        ],

        // ================= CLOUDS =================
        Array.from({ length: 10 }, () => new Cloud()),

        // ================= BACKGROUND =================
        [
            new BackgroundObject('img/5_background/layers/air.png', -719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', -719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', -719),

            new BackgroundObject('img/5_background/layers/air.png', 0),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 0),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 0),

            new BackgroundObject('img/5_background/layers/air.png', 719),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 2),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 2),

            new BackgroundObject('img/5_background/layers/air.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/3_third_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/2_second_layer/2.png', 719 * 3),
            new BackgroundObject('img/5_background/layers/1_first_layer/2.png', 719 * 3),


            new BackgroundObject('img/5_background/layers/air.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/3_third_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/2_second_layer/1.png', 719 * 4),
            new BackgroundObject('img/5_background/layers/1_first_layer/1.png', 719 * 4),
        ],

        // ================= COINS =================
        [
            new Coin(220, 220),
            new Coin(380, 180),
           

            new Coin(720, 180),
            new Coin(860, 220),

            new Coin(1040, 180),
            new Coin(1180, 220),

            new Coin(1360, 180),
            new Coin(1520, 220),

            
            new Coin(1900, 220),
            new Coin(2100, 180)
        ],

        // ================= BOTTLES =================
        [
            new Bottle(180, 350),
            new Bottle(340, 350),
          

            new Bottle(680, 350),
            new Bottle(840, 350),

            new Bottle(1000, 350),
            new Bottle(1160, 350),

            new Bottle(1320, 350),
            new Bottle(1480, 350),

            new Bottle(1680, 350),
            new Bottle(1880, 350)
        ]
    );

    level1.level_end_x = 719 * 4;

    return level1;
}
>>>>>>> aa281ad (Update)
