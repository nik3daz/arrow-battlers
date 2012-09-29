function Menu() {
    this.init = function() {
        var background = new Kinetic.Rect({
            width: stage.getWidth(),
            height: stage.getHeight(),
            fill: "white",
        });
        centerOffset(background);
        menuLayer.add(background);

        this.money = [];
        this.charBoxes = [];
        this.skillBoxes = [];
        this.currentSelection = [];
        this.selectors = [];
        this.skinArrows = [];
        this.currentSkinSelection = [];
        this.readyButtons = [];

        this.initMenuForPlayer(0, -MENU_CENTER_DISTANCE);
        this.initMenuForPlayer(1, MENU_CENTER_DISTANCE);
    }

    this.initMenuForPlayer = function(playerId, centerX) {

        //=================== PLAYER MONEY ========================
        
        var money = new Kinetic.Text({
            text: "$" + players[playerId].money,
            align : "center",
            x: centerX,
            y: MONEY_Y_ANCHOR,
            width: stage.getWidth() / 2,
            height: 40,
            textFill:"black",
            fontFamily:GAME_FONT,
        });
        centerOffset(money);
        this.money[playerId] = money;
        menuLayer.add(money);

        //================== CHARACTER BOXES ======================

        this.charBoxes[playerId] = [];

        var verticalOffset = 0;
        var horizontalOffset = 0;

        for (var i = 0; i < NUM_CHARACTERS; i++) {  
            if (i % (NUM_CHARACTERS/CHAR_BOX_ROWS) == 0) {
                verticalOffset++;
                horizontalOffset = 0;
            } else {
                horizontalOffset++;
            }

            this.charBoxes[playerId][i] = centerOffset(new Kinetic.Rect({
                width: CHAR_BOX_SIZE,
                height: CHAR_BOX_SIZE,
                fill: {
                    image: images.vader,
                    offset: [-170, -50],
                },
                    //"#CCC",
                stroke:"black",
                x: centerX + (-1 + horizontalOffset) * CHAR_BOX_SIZE,        
                y:(CHAR_BOX_MARGIN_TOP + ((verticalOffset-1/2) * CHAR_BOX_SIZE)),
            }));

            menuLayer.add(this.charBoxes[playerId][i]);
        }

        //================== SKILL BOXES ======================

        var skills = [];

        for (var i = 0; i < NUM_SKILLS; i++) {
            skills[i] = new Kinetic.Rect({
                width: SKILL_BOX_SIZE,
                height: SKILL_BOX_SIZE,
                fill: "#444",
                stroke:"black",
                x:this.charBoxes[playerId][0].getX() - CHAR_BOX_SIZE/2 + i * SKILL_BOX_SIZE,
                y:this.charBoxes[playerId][NUM_CHARACTERS-1].getY() - CHAR_BOX_SIZE/2 + this.charBoxes[playerId][NUM_CHARACTERS-1].getHeight(),
            });
            menuLayer.add(skills[i]);
        }
        this.skillBoxes[playerId] = skills;

        //================== SKIN ARROWS ======================

        var skinArrows = [];

        var skinArrowsLeft = [];
        var skinArrowsRight = [];

        this.currentSkinSelection[playerId] = 0;

        for (var i = 0; i < NUM_SKIN_ARROWS; i++) {
            skinArrowsLeft[i] = centerOffset(new Kinetic.Rect({
                width:SKIN_ARROW_SIZE,
                height:SKIN_ARROW_SIZE,
                fill:"#000",
                x: centerX - SKIN_ARROW_CENTER_DIST,
                y:SKIN_ARROW_Y_ANCHOR + i*SKIN_ARROW_SIZE + i *SKIN_GAP,
            }));

            skinArrowsRight[i] = centerOffset(new Kinetic.Rect({
                width:SKIN_ARROW_SIZE,
                height:SKIN_ARROW_SIZE,
                fill:"#000",
                x: centerX + SKIN_ARROW_CENTER_DIST,
                y:SKIN_ARROW_Y_ANCHOR + i*SKIN_ARROW_SIZE + i *SKIN_GAP,
            }));

            menuLayer.add(skinArrowsLeft[i]);
            menuLayer.add(skinArrowsRight[i]);

        }

        skinArrows[0] = skinArrowsLeft;
        skinArrows[1] = skinArrowsRight;

        this.skinArrows[playerId] = skinArrows;

        //================== READY BUTTONS ======================

        this.readyButtons[playerId] = new Kinetic.Rect({
            width:READY_WIDTH,
            height:READY_HEIGHT,
            fill:"#444",
            stroke:"black",
            x:centerX,
            y:stage.getHeight() - READY_MARGIN_BOTTOM,
        });
        centerOffset(this.readyButtons[playerId]);
        menuLayer.add(this.readyButtons[playerId]);

        //================== SELECTORS ======================

        this.currentSelection[playerId] = 0;

        this.selectors[playerId] = new Selector(playerId);

        menuLayer.add(this.selectors[playerId].shape);

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

        flash(this.selectors[playerId]);
        
    }

    this.show = function() {
        keyFocus = null;
        fadeIn(function() {
            menuLayer.moveToTop();
            fadeLayer.moveToTop();
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
            this.shape.setWidth(CHAR_BOX_SIZE);
            this.shape.setHeight(CHAR_BOX_SIZE);
            centerOffset(this.shape);
            this.shape.setPosition(menu.charBoxes[playerId][menu.currentSelection[playerId]].getPosition());
        } else {
            // skins
            this.shape.setWidth(SKIN_ARROW_SIZE);
            this.shape.setHeight(SKIN_ARROW_SIZE);
            centerOffset(this.shape);
            this.shape.setPosition(menu.skinArrows[playerId][0][menu.currentSkinSelection[playerId]].getPosition());
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
    centerOffset(this.shape);

    var isCharSelected = false;
    this.update();
}



