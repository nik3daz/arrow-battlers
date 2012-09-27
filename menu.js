

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
    	align : "center",
    	x: stage.getWidth() / 2 / 2,
    	y: MONEY_MARGIN_ABOVE_BELOW,
    	textFill:"black",
    	fontFamily:GAME_FONT,
    });

    menuLayer.add(p1Money);

        var p2Money = new Kinetic.Text({
    	text: "$" + players[0].money,
    	align : "center",
    	x: stage.getWidth() / 2 / 2 + stage.getWidth() / 2,
    	y: MONEY_MARGIN_ABOVE_BELOW,
    	textFill:"black",
    	fontFamily:GAME_FONT,
    });

    menuLayer.add(p2Money);
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
    		fill: {
                image: images.vader,
                offset: [-170, -50],
            },
                //"#CCC",
    		stroke:"black",
    		x:CHAR_BOX_MARGIN_SIDE + (horizontalOffset * CHAR_BOX_SIZE),   		
    		y:(CHAR_BOX_MARGIN_TOP + ((verticalOffset-1) * CHAR_BOX_SIZE)),
    	});

    	p2Chars[i] = new Kinetic.Rect({
    		width:CHAR_BOX_SIZE,
    		height:CHAR_BOX_SIZE,
    		fill: "#CCC",
    		stroke:"black",
    		x:stage.getWidth()/2 + CHAR_BOX_MARGIN_SIDE + (horizontalOffset * CHAR_BOX_SIZE),   		
    		y:CHAR_BOX_MARGIN_TOP + ((verticalOffset-1) * CHAR_BOX_SIZE),
    	});

    	menuLayer.add(p1Chars[i]);
    	menuLayer.add(p2Chars[i]);
    }

    //================== SKILL BOXES ======================
    var p1Skills = [];
    var p2Skills = [];

    var skillBoxSize = CHAR_BOX_SIZE * (NUM_CHARACTERS/CHAR_BOX_ROWS) / NUM_SKILLS;
    for (var i = 0; i < NUM_SKILLS; i++) {
    	p1Skills[i] = new Kinetic.Rect({
    		width: skillBoxSize,
    		height: skillBoxSize,
    		fill: "#444",
    		stroke:"black",
    		x:CHAR_BOX_MARGIN_SIDE + i * skillBoxSize,
    		y:p1Chars[NUM_CHARACTERS-1].getY() + p2Chars[NUM_CHARACTERS-1].getHeight(),
    	});

		p2Skills[i] = new Kinetic.Rect({
    		width: skillBoxSize,
    		height: skillBoxSize,
    		fill: "#444",
    		stroke:"black",
    		x:stage.getWidth()/2 + CHAR_BOX_MARGIN_SIDE + i * skillBoxSize,
    		y:p2Chars[NUM_CHARACTERS-1].getY() + 
    			p2Chars[NUM_CHARACTERS-1].getHeight(),
    	});

    	menuLayer.add(p1Skills[i]);
    	menuLayer.add(p2Skills[i]);
    }

    //================== READY BUTTONS ======================
    var readyButtons = [];

   
   	readyButtons[0] = new Kinetic.Rect({
   		width:READY_WIDTH,
   		height:READY_HEIGHT,
   		fill:"#444",
   		stroke:"black",
   		x:stage.getWidth()/2/2 - READY_WIDTH/2,
   		y:stage.getHeight() - READY_MARGIN_BOTTOM - READY_HEIGHT,
   	});

   	menuLayer.add(readyButtons[0]);

   	readyButtons[1] = new Kinetic.Rect({
   		width:READY_WIDTH,
   		height:READY_HEIGHT,
   		fill:"#444",
   		stroke:"black",
   		x:stage.getWidth()/2 + stage.getWidth()/2/2 - READY_WIDTH/2,
   		y:stage.getHeight() - READY_MARGIN_BOTTOM - READY_HEIGHT,
   	});

   	menuLayer.add(readyButtons[1]);
    

}


function showMenu() {
}




