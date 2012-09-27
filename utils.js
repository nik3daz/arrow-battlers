function centerOffset(shape) {
    shape.setOffset([shape.getWidth() / 2, shape.getHeight() / 2]);
    return shape;
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
        
