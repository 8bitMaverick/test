// Flavor prefab constructor function
function Flavor(game, key, frame, scale, rotation) {
	// call to Phaser.Sprite // new Sprite(game, x, y, key, frame)
	Phaser.Sprite.call(this, game, game.rnd.integerInRange(64,game.width-64), game.rnd.integerInRange(64,game.height-61), key, frame);

	// add custom properties
	var scaleX = game.rnd.integerInRange(1,5)
	var scaleY = game.rnd.integerInRange(1,5)
	this.anchor.set(0.5);
	this.scale.x = scaleX;
	this.scale.y = scaleY;

	// put some physics on it
	game.physics.enable(this);
	this.body.collideWorldBounds = false;
	game.world.setBounds(0, 0, 500, 500);
	this.body.velocity.x = game.rnd.integerInRange(1,200);
}
// explicitly define prefab's prototype (Phaser.Sprite) and constructor (Flavor)
Flavor.prototype = Object.create(Phaser.Sprite.prototype);
Flavor.prototype.constructor = Flavor;

// override Phaser.Sprite update (to spin the diamond)
Flavor.prototype.update = function() {
	game.world.wrap(this.body);
	if(game.input.keyboard.justReleased(Phaser.Keyboard.R)) {
		this.body.velocity.x *= -1;
	}
}

