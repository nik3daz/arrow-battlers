SPRITE_WIDTH = 130;
SPRITE_HEIGHT = 190;
PLAYER_SPRITE_FPS = 9;
/** 
 * Makes an animation object for Kinetic.Sprite.
 * Makes frames from start positon to end position.
 * Sprite sheet should be horizontal
 */
function makeSpriteAnimation(y, width, height, frames) {
    var anims = [];
    for (var i = 0; i < frames; i++) {
        anims.push({
            x: i * width,
            y: y,
            height: height,
            width: width,
        });
    }
    return anims;
}

//============== SPRITE DEFINITIONS ================

PlayerSprites = [
    "tron", "tronGood", "tronEvil", "fireTron", "iceTron", "greenTron",
    "brickman", "brickmanGreen", "brickmanRed", "brickmanBW",
    "lego", "legoMan", "legoMo", "legoSuit",
    "minecraft", "minecraftGreen", "minecraftOrange", "minecraftZombie",
    "redditAlien", "redditAlienG", "redditAlienP", "redditAlienR", "redditAlienY", 
    "samus", "samusRed", "samusPurp", "samusDark",
    "unknown",
];
var idleAnimation = makeSpriteAnimation(0, SPRITE_WIDTH, SPRITE_HEIGHT, 4);
idleAnimation = idleAnimation.concat(idleAnimation.slice().reverse());

PlayerSpriteAnimations = {
	idle: idleAnimation,
	attack: makeSpriteAnimation(190, SPRITE_WIDTH, SPRITE_HEIGHT, 7),
	hurt: makeSpriteAnimation(380, SPRITE_WIDTH, SPRITE_HEIGHT, 4),
}

