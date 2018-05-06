// "Prefab Armada" Assignment for UCSC CMPM 120 course
// Modified from Nathan's Prefab Lecture Code
// Added Flavortown style
// by Courtney Hunt 1592110

/* Dear Wonderful TA grader:
The assignment text read as:
"Within that folder will be index.html, main.js, and Armada.js files, your framework file,
and an asset folder containing your ship image. If you don't submit in this format, the
assignment will be marked late and you'll be asked to resubmit."
I took this file structure literally so that is why my file structure does NOT have the typical
folder breakdown Nathan has used in previous projects. I.E. the Framework having a folder,
or img/audio subfolders in assets. If I misinterpreted, please let me know.
*/

// global variables
var game;
var flavorTown;
var credits;

// wait for DOM to load before we start up Phaser
window.onload = function() {
	game = new Phaser.Game(500,500, Phaser.AUTO);
	game.state.add('Load', Load);
	game.state.add('Play', Play);
	game.state.start('Load');
}

var Load = function(game) {};
Load.prototype = {
	preload: function() {
		console.log('Load: preload');

		// load images, image atlas, and audio
		game.load.path = '../assets/img/';
		game.load.atlas('atlas', 'atlas.png', 'atlas.json');
		this.load.images(['fireBG', 'flavortown', 'menu'], ['firebg.jpg', 'flavortown.png', 'menu.png']);

		game.load.path = '../assets/audio/';
		game.load.audio('bgMusic', 'DD&D.mp3');
	},
	create: function() {
		console.log('Load: create');
		game.state.start('Play');

		// Load looped background music - for fun
		var bgMusic;
		bgMusic = game.add.audio('bgMusic');
		game.sound.setDecodedCallback(bgMusic, start, this);

		function start() {

   			bgMusic.loopFull(0.6);

		}
	}
};

var Play = function(game) {};
Play.prototype = {
	preload: function() {
		console.log('Play: preload');
	},
	create: function() {
		console.log('Play: create');

		// create background image - for fun
    	game.add.sprite(0, 117, 'fireBG');

    	// create title overlay image - for even more fun
    	game.add.sprite(140, 0, 'flavortown');

    	// add the 50 x flavors to flavorTown
		flavorTown = game.add.group();
		for (var i = 50; i > 0; i--) {
			flavorTown = new Flavor(game, 'atlas', 'fieri', 1, 0);
			game.add.existing(flavorTown);
		}

		// create menu overlay image - so the text is legible
    	game.add.sprite(0, 380, 'menu');

    	// create credit text - to add even MORE flavor in flavorTwon
		credits = game.add.text(5, 383, 'Press the R key to spread the flavor throughout Flavortown!\nCredits: (not that ANY of this is legal)\nArmada Image: Guy Fieri\'s ...Mother\?\nTitle Graphic: \"Straight Outta Generator\" (fontmeme.com)\nFire Graphic: Random news site that didn\'t credit anyone either\nMusic: \"Diners, Drive-Ins and Dives\" by Alex Helms (Soundcloud.com)', { fontSize: '12px', fill: '#fff' });

	},
	update: function() {
		// update
	}
};
