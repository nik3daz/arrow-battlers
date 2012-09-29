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
        this.skillBoxes = [];

        for (var i = 0; i < NUM_SKILLS; i++) {
            p1Skills[i] = new Kinetic.Rect({
                width: SKILL_BOX_SIZE,
                height: SKILL_BOX_SIZE,
                fill: "#444",
                stroke:"black",
                x:CHAR_BOX_MARGIN_SIDE + i * SKILL_BOX_SIZE,
                y:this.p1Chars[NUM_CHARACTERS-1].getY() + this.p2Chars[NUM_CHARACTERS-1].getHeight(),
            });

            p2Skills[i] = new Kinetic.Rect({
                width: SKILL_BOX_SIZE,
                height: SKILL_BOX_SIZE,
                fill: "#444",
                stroke:"black",
                x:stage.getWidth()/2 + CHAR_BOX_MARGIN_SIDE + i * SKILL_BOX_SIZE,
                y:this.p2Chars[NUM_CHARACTERS-1].getY() + 
                    this.p2Chars[NUM_CHARACTERS-1].getHeight(),
            });

            menuLayer.add(p1Skills[i]);
            menuLayer.add(p2Skills[i]);
        }
        this.skillBoxes[0] = p1Skills;
        this.skillBoxes[1] = p2Skills;

        //================== SKIN ARROWS ======================

        this.skinArrows = [];
        this.p1SkinArrows = [];
        this.p2SkinArrows = [];

        this.p1SkinArrowsLeft = [];
        this.p1SkinArrowsRight = [];
        this.p2SkinArrowsLeft = [];
        this.p2SkinArrowsRight = [];

        this.currentSkinSelection = [];
        var currentP1SkinSelection = 0;
        var currentP2SkinSelection = 1;
        this.currentSkinSelection[0] = currentP1SkinSelection;
        this.currentSkinSelection[1] = currentP2SkinSelection;

        for (var i = 0; i < NUM_SKIN_ARROWS; i++) {
            this.p1SkinArrowsLeft[i] = new Kinetic.Rect({
                width:SKIN_ARROW_SIZE,
                height:SKIN_ARROW_SIZE,
                fill:"#000",
                x:CHAR_BOX_MARGIN_SIDE + SKIN_ARROW_MARGIN_SIDE,
                y:SKIN_ARROW_Y_ANCHOR + i*SKIN_ARROW_SIZE + i *SKIN_GAP,
            });

            this.p1SkinArrowsRight[i] = new Kinetic.Rect({
                width:SKIN_ARROW_SIZE,
                height:SKIN_ARROW_SIZE,
                fill:"#000",
                x:CHAR_BOX_SIZE * (NUM_CHARACTERS / CHAR_BOX_ROWS) - SKIN_ARROW_MARGIN_SIDE,
                y:SKIN_ARROW_Y_ANCHOR + i*SKIN_ARROW_SIZE + i *SKIN_GAP,
            });

            this.p2SkinArrowsLeft[i] = new Kinetic.Rect({
                width:SKIN_ARROW_SIZE,
                height:SKIN_ARROW_SIZE,
                fill:"#000",
                x:stage.getWidth()/2 + CHAR_BOX_MARGIN_SIDE + SKIN_ARROW_MARGIN_SIDE,
                y:SKIN_ARROW_Y_ANCHOR + i*SKIN_ARROW_SIZE + i*SKIN_GAP,
            });

            this.p2SkinArrowsRight[i] = new Kinetic.Rect({
                width:SKIN_ARROW_SIZE,
                height:SKIN_ARROW_SIZE,
                fill:"#000",
                x:stage.getWidth()/2 + CHAR_BOX_SIZE * (NUM_CHARACTERS / CHAR_BOX_ROWS) - SKIN_ARROW_MARGIN_SIDE,
                y:SKIN_ARROW_Y_ANCHOR + i*SKIN_ARROW_SIZE + i *SKIN_GAP,
            });
        

            menuLayer.add(this.p1SkinArrowsLeft[i]);
            menuLayer.add(this.p1SkinArrowsRight[i]);

            menuLayer.add(this.p2SkinArrowsLeft[i]);
            menuLayer.add(this.p2SkinArrowsRight[i]);
        }

        this.p1SkinArrows[0] = this.p1SkinArrowsLeft;
        this.p1SkinArrows[1] = this.p1SkinArrowsRight;
        this.p2SkinArrows[0] = this.p2SkinArrowsLeft;
        this.p2SkinArrows[1] = this.p2SkinArrowsRight;

        this.skinArrows[0] = this.p1SkinArrows;
        this.skinArrows[1] = this.p2SkinArrows;


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

    this.show = function() {
        keyFocus = null;
        fadeIn(function() {
            menuLayer.moveToTop();
            fadeOut(function() {
                keyFocus = this;
            });
        });
    }

    this.onKeyDown = function(player, key) {
        // check if the player is still selecting a character
        if (key == KEY_U) {
            menu.selectors[player.id].onArrowUp();
        } else if (key == KEY_D) {
            menu.selectors[player.id].onArrowDown();
        } else if (key == KEY_L) {
            menu.selectors[player.id].onArrowLeft();
        } else if (key == KEY_R) {
            menu.selectors[player.id].onArrowRight();
        } else if (key == KEY_E) {
            menu.selectors[player.id].onEnter();
        }
        menu.selectors[player.id].update();
        menuLayer.draw();
    }

}



/** Gets the next skin for the current avatar. direction either -1 for left, 1 for right. 
    Requires the playerId for the player selecting the skin */
var getNextSkin = function(direction, playerId) {
    // TODO
}

/** Called when a player has changed their selection (by hovering over a character) */
var onCharacterHover = function(playerId, charId) {
    // change the skill boxes
}

/** Selector Class */
function Selector(playerId) {
    /** Update shape changes */
    this.update = function() {
        if (!isCharSelected) {
            this.shape.setX(menu.charBoxes[playerId][menu.currentSelection[playerId]].getX());
            this.shape.setY(menu.charBoxes[playerId][menu.currentSelection[playerId]].getY());
        } else {
            // skins
            this.shape.setX(menu.skinArrows[playerId][0][menu.currentSkinSelection[playerId]].getX());
            this.shape.setY(menu.skinArrows[playerId][0][menu.currentSkinSelection[playerId]].getY());
        } 
    }

    /** */
    this.onArrowDown = function() {
         if (!isCharSelected) {
            // browse characters
            if (menu.currentSelection[playerId] + (NUM_CHARACTERS/CHAR_BOX_ROWS) < NUM_CHARACTERS) {
                menu.currentSelection[playerId] += (NUM_CHARACTERS/CHAR_BOX_ROWS);
            }
        } else {
            // browse different skins
            if (menu.currentSkinSelection[playerId] != NUM_SKIN_ARROWS -1) {
                menu.currentSkinSelection[playerId]++;
            }
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
            if (menu.currentSkinSelection[playerId] != 0) {
                menu.currentSkinSelection[playerId]--;
            }
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
            getNextSkin(-1,playerId);
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
            getNextSkin(1,playerId);
        }
    }

    /** */
    this.onEnter = function() {
        if (!isCharSelected) {
            isCharSelected = true;

            this.shape = new Kinetic.Rect({
                width: SKIN_ARROW_SIZE,
                height: SKIN_ARROW_SIZE,
                stroke:"#E83333",
            });

            players[playerId].selectedChar = menu.currentSelection[playerId];
        } else {
            // TODO: do player ready
        } 
    }

    this.shape = new Kinetic.Rect({
                width: CHAR_BOX_SIZE,
                height: CHAR_BOX_SIZE,
                stroke:"#E83333",
            });

    var isCharSelected = false;
    this.update();
}



