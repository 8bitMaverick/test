// "Making Your First Phaser Game" Assignment for UCSC CMPM 120 course
// Tutorial followed & then code was modified per assignment requirements
// by Courtney Hunt 1592110 Due: Friday, April 13th @ 11:59PM via Canvas

// Instantiate & Initialize Local Variables --------------------------------

// create Phaser.Game object instance assigned to local variable 'game'
// set resolution to 600 x 800 pixels
// set rendering context to Phaser.AUTO
// set id of the DOM Element to default (blank)
// reference Phaser's essential functions (preload, create, & update)
var game = new Phaser.Game(600, 800, Phaser.AUTO, '',
		{ preload: preload, create: create, update: update });

// assign variables
var platforms;
var player;
var score = 0;
var scoreText;
var groundHeight = 125;

function preload() {

	// Preload Assets -----------------------------------------------------

	// preload solo image assets
	game.load.image('sky', 'assets/img/sky.png');
    game.load.image('platform', 'assets/img/platform.png');
    game.load.image('star', 'assets/img/star.png');
    game.load.image('diamond', 'assets/img/diamond.png');
    game.load.image('firstaid', 'assets/img/firstaid.png');

    // preload sprite maps
    game.load.spritesheet('dude', 'assets/img/dude.png', 32, 48);
    game.load.spritesheet('baddie', 'assets/img/baddie.png', 32, 32);

}

function create() {

	// General Game Setup --------------------------------------------------

    // enable Phaser's Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    // create background image
    game.add.sprite(0, 0, 'sky');

    // Platforms Group Creation --------------------------------------------

    // designate group
    platforms = game.add.group();

    // enable physics
    platforms.enableBody = true;

    // create initial object instance (ground)
    var platform = platforms.create(0, game.world.height - 64, 'platform');

	// prevent physics collision drop effect
    platform.body.immovable = true;

    // scale ground to fit game width (original: 400 x 32 px)
    platform.scale.setTo(2, 2);

    // Five Platforms Creation ---------------------------------------------
    // prevent physics collision drop effect for each ledge
    // vary sizes and screen arrangement via scaling and coordinates

    // ledge number 01
    var ledge = platforms.create(428, 70, 'platform');
	ledge.body.immovable = true;
    ledge.scale.setTo(.02, 1.5);

    // ledge number 02
    ledge = platforms.create(85, 200, 'platform');
    ledge.body.immovable = true;
    ledge.scale.setTo(.15, .25);

    // ledge number 03
    ledge = platforms.create(487, 250, 'platform');
    ledge.body.immovable = true;
    ledge.scale.setTo(.25, .5);

    // ledge number 04
    ledge = platforms.create(310, 550, 'platform');
    ledge.body.immovable = true;
    ledge.scale.setTo(.35, .75);

	// ledge number 05
    ledge = platforms.create(276, 350, 'platform');
    ledge.body.immovable = true;
    ledge.scale.setTo(.05, 7);

    // Player Creation and Settings ----------------------------------------

    // create player from sprite map (replace 'dude' with 'baddie')
    player = game.add.sprite(32, game.world.height - 150, 'baddie');

    //  enable player physics
    game.physics.arcade.enable(player);

    //  adjust physics properties to enable bounce effect
    player.body.bounce.y = 0.2;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    //  assign walking animations
    player.animations.add('left', [0, 1], 10, true);
    player.animations.add('right', [2, 3], 10, true);

	// Star Collectible Creation -------------------------------------------

    // designate group
    stars = game.add.group();

	// enable collisions
    stars.enableBody = true;

    // create 12 evenly spaced star objects
    for (var i = 0; i < 12; i++)
    {
        // Create a star inside of the 'stars' group
        var star = stars.create(i * 70, 0, 'star');

        // enable basic gravity
        star.body.gravity.y = 6;

        // adjust body to enable slight bounce effect
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

	// Diamond Collectible Creation ----------------------------------------

	// designate group
	/* (Note: This step seemed necessary in order for a single sprite to use
		game.physics.arcade.overlap(). I researched and attempted other methods
		from online resources. However, this was the only solution that worked.
		Please advise if there is another cleaner method for single images. I
		am eager to better myself. Thank you! */
    diamonds = game.add.group();

    // enable collisions
    diamonds.enableBody = true;

    // create a single diamond object located randomly onscreen upon reload
    var diamond = diamonds.create(game.rnd.integerInRange(0, game.world.width - 32), game.rnd.integerInRange(0, game.world.height - (28 + groundHeight)), 'diamond');

    // Score Text Creation -----------------------------------------------
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

}

function update() {

	// Run Game Loop -------------------------------------------------------

	//  collide player & stars with platforms
    var hitPlatform = game.physics.arcade.collide(player, platforms);

    //  reset player velocity
    player.body.velocity.x = 0;

    // create, designate, & assign velocity & animations to keyboard inputs
    cursors = game.input.keyboard.createCursorKeys();

    if (cursors.left.isDown)
    {
        //  Move to the left
        player.body.velocity.x = -150;

        player.animations.play('left');
    }
    else if (cursors.right.isDown)
    {
        //  Move to the right
        player.body.velocity.x = 150;

        player.animations.play('right');
    }
    else
    {
        //  Stand still
        player.animations.stop();

        player.frame = 4;
    }

    //  allow player jump if touching platforms or ground
    if (cursors.up.isDown && player.body.touching.down && hitPlatform)
    {
        player.body.velocity.y = -350;
    }

    // check for star & platform collision
    game.physics.arcade.collide(stars, platforms);

	// check for star & player overlap
	// if true: kill star asset & assign 10 point score
    game.physics.arcade.overlap(player, stars, collectStar, null, this);

	function collectStar (player, star) {

    	// Removes the star from the screen
    	star.kill();

    	//  Add and update the score
    	score += 10;
    	scoreText.text = 'Score: ' + score;

	}

	// check for diamond & player overlap
	// if true: kill diamond asset & assign 25 point score
    game.physics.arcade.overlap(player, diamonds, collectDiamond, null, this);

	function collectDiamond (player, diamond) {

    	// Removes the diamond from the screen
    	diamond.kill();

    	//  Add and update the score
    	score += 25;
    	scoreText.text = 'Score: ' + score;

	}

}