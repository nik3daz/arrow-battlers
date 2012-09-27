

function initMenu() {
    var background = new Kinetic.Rect({
        width: stage.getWidth(),
        height: stage.getHeight(),
        fill: "white",
    });

    menuLayer.add(background);

    //=================== PLAYER MONEY ========================
    var p1Money = new Kinetic.Text({
    	text: "$" + players[0].money,
    	align : center,
    	x: stage.getWidth() / 2 / 2,
    	y: MONEY_MARGIN_ABOVE_BELOW,
    });

    menuLayer.add(p1Money);
    //================== CHARACTER BOXES ======================
    var p1Chars = [];
    var p2Chars = [];
    var verticalOffset = 0;
    var horizontalOffset = 0;

    for (var i = 0; i < NUM_CHARACTERS; i++) {	
    	if (i % (NUM_CHARACTERS/CHAR_BOX_ROWS) == 0) {
    		verticalOffset++;
    		horizontalOffset = 0;
    	} else {
    		horizontalOffset++;
    	}

    	p1Chars[i] = new Kinetic.Rect({
    		width: CHAR_BOX_SIZE,
    		height: CHAR_BOX_SIZE,
    		fill: "#cccccc",
    		stroke:"black",
    		x:CHAR_BOX_MARGIN_SIDE + (horizontalOffset * CHAR_BOX_SIZE),   		
    		y:(CHAR_BOX_MARGIN_TOP + ((verticalOffset-1) * CHAR_BOX_SIZE)),
    	});

    	p2Chars[i] = new Kinetic.Rect({
    		width:CHAR_BOX_SIZE,
    		height:CHAR_BOX_SIZE,
    		fill: "#cccccc",
    		stroke:"black",
    		x:stage.getWidth()/2 + CHAR_BOX_MARGIN_SIDE + (horizontalOffset * CHAR_BOX_SIZE),   		
    		y:CHAR_BOX_MARGIN_TOP + ((verticalOffset-1) * CHAR_BOX_SIZE),
    	});

    	menuLayer.add(p1Chars[i]);
    	menuLayer.add(p2Chars[i]);
    }


}


function showMenu() {
}




