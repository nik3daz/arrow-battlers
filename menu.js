function Menu() {
    this.init = function() {
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
        this.charBoxes = [];

        this.p1Chars = [];
        this.p2Chars = [];
        
        this.charBoxes[0] = this.p1Chars;
        this.charBoxes[1] = this.p2Chars;

        var verticalOffset = 0;
        var horizontalOffset = 0;

        for (var i = 0; i < NUM_CHARACTERS; i++) {  
            if (i % (NUM_CHARACTERS/CHAR_BOX_ROWS) == 0) {
                verticalOffset++;
                horizontalOffset = 0;
            } else {
                horizontalOffset++;
            }

            this.p1Chars[i] = new Kinetic.Rect({
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

            this.p2Chars[i] = new Kinetic.Rect({
                width:CHAR_BOX_SIZE,
                height:CHAR_BOX_SIZE,
                fill: "#CCC",
                stroke:"black",
                x:stage.getWidth()/2 + CHAR_BOX_MARGIN_SIDE + (horizontalOffset * CHAR_BOX_SIZE),           
                y:CHAR_BOX_MARGIN_TOP + ((verticalOffset-1) * CHAR_BOX_SIZE),
            });

            menuLayer.add(this.p1Chars[i]);
            menuLayer.add(this.p2Chars[i]);
        }

        //================== CHARACTER BOXES ======================
        this.currentSelection = [];
        this.currentSelection[0] = 0;
        this.currentSelection[1] = 0;

        this.selectors = [];
        this.selectors[0] = new Selector(0);

        menuLayer.add(this.selectors[0].shape);

        this.selectors[1] = new Selector(1);
        menuLayer.add(this.selectors[1].shape);

       
        var flash = function(selector) {
            setTimeout(function() {
                selector.shape.setStroke("#FF7777");
                menuLayer.draw();
                setTimeout(function() {
                    selector.shape.setStroke("#E83333");
                    menuLayer.draw();
                    flash(selector);
                }, 500);
            }, 500);
        };

        flash(this.selectors[0]);
        flash(this.selectors[1]);
        

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
                y:this.p1Chars[NUM_CHARACTERS-1].getY() + this.p2Chars[NUM_CHARACTERS-1].getHeight(),
            });

            p2Skills[i] = new Kinetic.Rect({
                width: skillBoxSize,
                height: skillBoxSize,
                fill: "#444",
                stroke:"black",
                x:stage.getWidth()/2 + CHAR_BOX_MARGIN_SIDE + i * skillBoxSize,
                y:this.p2Chars[NUM_CHARACTERS-1].getY() + 
                    this.p2Chars[NUM_CHARACTERS-1].getHeight(),
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



    this.setCharacter = function(character){
        // move the 'selector' down to the skin things

        // set the players character to the selected one
    };

    this.onKeyDown = function(player, key) {
        // check if the player is still selecting a character

    }

}

/** Selector Class */
function Selector(playerId) {
    this.shape = new Kinetic.Rect({
                width: CHAR_BOX_SIZE,
                height: CHAR_BOX_SIZE,
                stroke:"#E83333",
                x: menu.charBoxes[playerId][menu.currentSelection[playerId]].getX(),
                y: menu.charBoxes[playerId][menu.currentSelection[playerId]].getY(),
            });

    var isCharSelected = false;

    /** */
    this.onArrowDown = function() {
         if (!isCharSelected) {
            // browse characters
            if (menu.currentSelection[playerId] + (NUM_CHARACTERS/CHAR_BOX_ROWS) < NUM_CHARACTERS) {
                menu.currentSelection[playerId] += (NUM_CHARACTERS/CHAR_BOX_ROWS);
            }
        } else {
            // browse different skins
        }
    }


    /** */
    this.onArrowUp = function() {
        if (!isCharSelected) {
            // browse characters
             if (menu.currentSelection[playerId] - (NUM_CHARACTERS/CHAR_BOX_ROWS) >= 0) {
                menu.currentSelection[playerId] -= (NUM_CHARACTERS/CHAR_BOX_ROWS);
            }
        } else {
            // browse different skins
        }
    }

    /** */
    this.onArrowLeft = function() {
        if (!isCharSelected) {
            // browse characters
            if (menu.currentSelection[playerId] - 1 >= 0) {
                menu.currentSelection[playerId]--;    
            }
        } else {
            // browse different skins
        }

    }

    /** */
    this.onArrowRight = function() {
        if (!isCharSelected) {
            // browse characters
            if (menu.currentSelection[playerId] + 1 < NUM_CHARACTERS) {
                menu.currentSelection[playerId]++;    
            }
        } else {
            // TODO browse different skins
        }
    }

    /** */
    this.onEnter = function() {
        if (!isCharSelected) {
            isCharSelected = true;
        }
    }
}



