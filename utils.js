function centerOffset(shape) {
    shape.setOffset([shape.getWidth() / 2, shape.getHeight() / 2]);
}

// Sprite sheet should be horizontal
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
