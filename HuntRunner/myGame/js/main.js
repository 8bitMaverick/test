// "Endless Runner In-Progress Build" Assignment for UCSC CMPM 120 course
// Modified Bootstrap from First Phaser Game per instructions
// by Courtney Hunt 1592110 Due: Wednesday, April 18th @ 11:59PM via Canvas

// Instantiate & Initialize Local Variables --------------------------------

// create Phaser.Game object instance assigned to local variable 'game'
// set resolution to 800 x 600 pixels
// set rendering context to Phaser.AUTO
// set id of the DOM Element to default (blank)
var game = new Phaser.Game(800, 600, Phaser.AUTO, '');

// assign variables
var platforms;
var score = 0;
var scoreText;
var groundHeight = 86;
var playerWidth = 32;

// define MainMenu state and methods
var MainMenu = function(game) {};
MainMenu.prototype = {
	init: function() {
		this.level = 1;
	},
	preload: function() {
		console.log('MainMenu: preload');
	},
	create: function() {
		console.log('MainMenu: create');
		game.stage.backgroundColor = "#facade";
		console.log('level: ' + this.level);

		// State change instructions -----------------------------------------------
    	scoreText = game.add.text(16, 16, 'Press space to change State\nMain Menu State', { fontSize: '32px', fill: '#000' });
	},
	update: function() {
		// main menu logic
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			// pass this.level to next state
			game.state.start('GamePlay', true, false, this.level);
		}
	}
}

// define GamePlay state and methods
var GamePlay = function(game) {};
GamePlay.prototype = {
	init: function(lvl) {
		console.log('GamePlay: init');
		// grab lvl from previous state
		this.level = lvl+1;

		// initialize variables
		this.pcSprite = null;
		this.speed = 5;

	},
	preload: function() {
		console.log('GamePlay: preload');

		// Preload Assets -----------------------------------------------------

		// load a path to save us typing
		this.load.path = 'assets/img/';	
		// load image assets
		this.load.images(['sky', 'platform'], ['sky.png', 'platform.png']);

    	// preload sprite map
    	this.load.atlas('atlas', 'atlas.png', 'atlas.json');

	},
	create: function() {
		console.log('GamePlay: create');
		game.stage.backgroundColor = "#ccddaa";
		console.log('level: ' + this.level);

		// General Game Setup --------------------------------------------------

    	// enable Phaser's Arcade Physics system
    	game.physics.startSystem(Phaser.Physics.ARCADE);

    	// create background image
    	this.add.sprite(0, 0, 'sky');

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

		// add our sprite and set anchor so sprite flipping looks correct
		this.pcSprite = this.add.sprite(playerWidth + 10, game.world.height - groundHeight, 'atlas', 'walk0002');
		this.pcSprite.anchor.x = 0.5;
		this.pcSprite.anchor.y = 0.5;
		// define sprite animations
		// .add('key', [frames], frameRate, loop)
		// .generateFrameNames('prefix', start, stop, 'suffix', zeroPad) -> returns array
		// this handles atlas names in format: walk0001 - walk0011
		this.pcSprite.animations.add('walk', Phaser.Animation.generateFrameNames('walk', 1, 3, '', 4), 15, true);
		this.pcSprite.animations.add('idle', ['walk0002'], 30, false);

		// State change instructions -----------------------------------------------
    	scoreText = game.add.text(16, 16, 'Press space to change State\nGame State', { fontSize: '32px', fill: '#000' });

		// Score Text Creation -----------------------------------------------
    	scoreText = game.add.text(game.world.width - 136, 16, 'Score: 0\nLives: 3', { fontSize: '32px', fill: '#000' });

	},

	update: function() {
		// GamePlay logic
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('GameOver', true, false, this.level);
		}

		// Run Game Loop -------------------------------------------------------

		// check keyboard input and move sprite appropriately
		if(this.input.keyboard.isDown(Phaser.Keyboard.LEFT)) {
			this.pcSprite.x -= this.speed;
			this.pcSprite.scale.x = -1; 	// flip sprite
			this.pcSprite.animations.play('walk');
		} else if (this.input.keyboard.isDown(Phaser.Keyboard.RIGHT)) {
			this.pcSprite.x += this.speed;
			this.pcSprite.scale.x = 1; 	// re-orient sprite
			this.pcSprite.animations.play('walk');
		} else {
			this.pcSprite.animations.play('idle');
		} 	

	}
}

// define GameOver state and methods
var GameOver = function(game) {};
GameOver.prototype = {
	init: function(lvl) {
		this.level = lvl+1;
	},
	preload: function() {
		console.log('GameOver: preload');
	},
	create: function() {
		console.log('GameOver: create');
		game.stage.backgroundColor = "#bb11ee";
		console.log('level: ' + this.level);

		// State change instructions -----------------------------------------------
    	scoreText = game.add.text(16, 16, 'Press space to change State \nGame Over State', { fontSize: '32px', fill: '#000' });
	},
	update: function() {
		// GameOver logic
		if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)) {
			game.state.start('MainMenu');
		}
	}
}

// add states to StateManager and start MainMenu
game.state.add('MainMenu', MainMenu);
game.state.add('GamePlay', GamePlay);
game.state.add('GameOver', GameOver);
game.state.start('MainMenu');