function centerOffset(shape) {
    shape.setOffset([shape.getWidth() / 2, shape.getHeight() / 2]);
    return shape;
}

function contains(a, obj) {
    for (var i = 0; i < a.length; i++) {
        if (a[i] === obj) {
            return true;
        }
    }
    return false;
}

/** 
 * Makes an animation object for Kinetic.Sprite.
 * Makes frames from start positon to end position.
 * Sprite sheet should be horizontal
 */
function makeSpriteAnimation(width, height, start, end) {
    var anims = [];
    for (var x = start; x < end; x += width) {
        anims.push({
            x: x,
            y: 0,
            height: height,
            width: width,
        });
    }
}

/**
 * Fades the fadeLayer in and calls cb when done
 * cb is optional.
 */
function fadeIn(cb, alpha) {
    if (!cb)
        cb = function() {};
    if (!alpha)
        alpha = 1
    fadeLayer.moveToTop();
    fadeLayer.transitionTo({
        duration : 0.5,
        opacity : alpha,
        callback : cb,
    });
}

/**
 * Fades the fadeLayer out and calls cb when done
 * cb is optional.
 */
function fadeOut(cb) {
    if (!cb)
        cb = function() {};
    fadeLayer.transitionTo({
        duration : 0.5,
        opacity : 0,
        callback : function() {
            fadeLayer.moveToBottom();
            cb();
        },
    });
}

/**
 * Creates an array filled with numbers from a to b-1
 */
function range(a, b) {
    var r = [];
    for (var i = a; i < b; i++) {
        r.push(i);
    }
    return r;
}
        

/**
 * Sets the arrow in the given rect to point in direction of KEY_X
 * color can be: "red", "green", "purple", "red", "yellow"
 */
function setArrowImage(rect, key, color) {
    if (key == null) {
        rect.setFill(null);
        return;
    }

    var rots = [90, 270, 180, 0];
    if (color == null) {
        rect.setFill({image: images["arrow"]});
    } else {
        rect.setFill({image: images["arrow_"+color]});
    }
    rect.setRotationDeg(rots[key]);
}
/*
function shootShape(shape, dir, x, y, speed, layer) {
	var anim = new Kinetic.Animation({
        	func: function(frame) {
			if (dir == -1){ //to left
				shape.setX(stage.getWidth()-frame.time)
			}
			else if (dir == 1){ //to right
				shape.setX(frame.time);
			}
			shape.setY(y);
			if ((shape.getX() < -shape.getWidth()) && dir == -1 ){
				//stop animation
				anim.stop();
				// remove from layer and delete	
					
			}
			if ((shape.getX() > (stage.getWidth()+shape.getWidth())) && dir == 1){
				// stop animation
				anim.stop();
				// remove from layer and delete
					
			}
				},
			});
	anim.start();


}*/
