function centerOffset(shape) {
    shape.setOffset([shape.getWidth() / 2, shape.getHeight() / 2]);
    return shape;
}

function contains(a, obj) {
    return a.indexOf(obj) > -1;
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
        rect.setFill({image: images["arrow"], repeat: 'no-repeat'});
    } else {
        rect.setFill({image: images["arrow_"+color], repeat: 'no-repeat'});
    }
    rect.setRotationDeg(rots[key]);
}

function shootSprite(config) {
    /*
    config = {
        x: 0,
        y: 50,
        dir: 1,
        animations: {
            a: makeSpriteAnimation(30, 30, 0, 30)
        },
        animation: "a",
        frameRate: 7,
        image: images.vader,
    };*/
    var shape = new Kinetic.Sprite({
        image: config.image,
        x: -config.dir * (stage.getWidth() / 2 + 30 + config.extraX),
        y: config.y,
        animations: config.animations,
        animation: config.animation,
        frameRate: config.frameRate,
        scale: [config.dir, 1],
    });
    /*
    var shape = new Kinetic.Rect({
        width: 100,
        height: 100,
        x: config.x,
        y: config.y,
        fill: "white",
    });*/
    playerLayer.add(shape);
    shape.start();

    var anim = new Kinetic.Animation({
        func: function(frame) {
            shape.setX(shape.getX() + config.dir * frame.timeDiff);
            if (Math.abs(shape.getX()) > (stage.getWidth() / 2 + 30 + config.extraX)) {
                anim.stop();
                playerLayer.remove(shape);
            }
        },
        node: playerLayer,
    });
    anim.start();


}
