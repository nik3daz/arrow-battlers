function Menu() {
    this.init = function() {
        var background = new Kinetic.Rect({
            width: stage.getWidth(),
            height: stage.getHeight(),
            fill: {
                image: images["menu_bg"],
            },
            x: -stage.getWidth()/2,
        });
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

        var headText = new Kinetic.Text({
           text: "HEAD",
           align : "center",
           x: 0,
           y: SKIN_ARROW_Y_ANCHOR + 2,
           width: 50,
           height: 15,
           textFill:"black",
           fontFamily:GAME_FONT,
        });
        centerOffset(headText)
        menuLayer.add(headText);

        var bodyText = new Kinetic.Text({
           text: "BODY",
           align : "center",
           x: 0,
           y: SKIN_ARROW_Y_ANCHOR + 1*SKIN_ARROW_HEIGHT + 1 *SKIN_GAP + 2,
           width: 50,
           height: 15,
           textFill:"black",
           fontFamily:GAME_FONT,
        });
        centerOffset(bodyText)
        menuLayer.add(bodyText);

        var shoesText = new Kinetic.Text({
           text: "FEET",
           align : "center",
           x: 0,
           y: SKIN_ARROW_Y_ANCHOR + 2*SKIN_ARROW_HEIGHT + 2 *SKIN_GAP + 2,
           width: 50,
           height: 15,
           textFill:"black",
           fontFamily:GAME_FONT,
        });
        centerOffset(shoesText)
        menuLayer.add(shoesText);
        
        this.reset();
    }

    this.reset = function() {
        this.currentPlayersReady = 0;
        this.selectors[0].reset();
        this.selectors[1].reset();
        menuLayer.draw();
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

        //================== SKIN ARROWS ======================
        var skinArrows = [];

        var skinArrowsLeft = [];
        var skinArrowsRight = [];

        this.currentSkinSelection[playerId] = 0; 
        for (var i = 0; i < NUM_SKIN_ARROWS; i++) {
            skinArrowsLeft[i] = centerOffset(new Kinetic.Rect({
                width:SKIN_ARROW_SIZE,
                height:SKIN_ARROW_HEIGHT,

                fill: {
                    image: images.arrow_left,
                    offset: [0, 0],
                    repeat: 'no-repeat',
                },
                x: centerX - SKIN_ARROW_CENTER_DIST,
                y:SKIN_ARROW_Y_ANCHOR + i*SKIN_ARROW_HEIGHT + i *SKIN_GAP,
            }));

            skinArrowsRight[i] = centerOffset(new Kinetic.Rect({
                width:SKIN_ARROW_SIZE,
                height:SKIN_ARROW_HEIGHT,
                fill: {
                    image: images.arrow_left,
                    offset: [0, 0],
                    repeat: 'no-repeat',
                },
                x: centerX + SKIN_ARROW_CENTER_DIST,
                y:SKIN_ARROW_Y_ANCHOR + i*SKIN_ARROW_HEIGHT + i *SKIN_GAP,
            }));
            skinArrowsRight[i].setScale(-1);
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
            fill:{
                    image: images.ready_button,
                    offset: [0, 0],
                },
            x:centerX,
            y:stage.getHeight() - READY_MARGIN_BOTTOM,
        });
        centerOffset(this.readyButtons[playerId]);
        menuLayer.add(this.readyButtons[playerId]);

        //================== SELECTORS ======================
        this.currentSelection[playerId] = 0;

        this.selectors[playerId] = new Selector(playerId, centerX);

        menuLayer.add(this.selectors[playerId].shape);

        //================== LOCKED CHAR BOXES ======================
        for (var i = 0; i < NUM_CHARACTERS; i++) {
            
        }

        //================== PLAYER NAME ======================


    }

    this.show = function() {
        keyFocus = null;
        fadeIn(function() {
            menu.reset();
            menuLayer.moveToTop();
            playerLayer.moveToTop();
            players[0].reset();
            players[1].reset();
            players[0].toMenuPosition();
            players[1].toMenuPosition();
            fadeLayer.moveToTop();
            fadeOut(function() {
                keyFocus = menu;
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
    var property = menu.currentSkinSelection[playerId];
    players[playerId].skinIndex[property] += direction + ClassList.characters[players[playerId].selectedChar].skins.length;;
    players[playerId].skinIndex[property] %= ClassList.characters[players[playerId].selectedChar].skins.length;

    ClassList.characters[players[playerId].selectedChar][players[playerId].skinIndex[property]];
    players[playerId].updateSprite();
}

/** Called when a player has changed their selection (by hovering over a character) */
var onCharacterHover = function(playerId, charId) {
    // change the skill boxes
}

/** Selector Class */
function Selector(playerId, centerX) {
    var SELECTOR_ANCHOR_X = 106;
    var SELECTOR_ANCHOR_Y = 106;
    var SELECTOR_ANCHOR_Y2 = 176;
    var CHAR_BOX_HEIGHT = 50;
    var CHAR_BOX_WIDTHS = [0, 106, 212.5];

    /** Update shape changes */
    this.update = function() {
        if (!this.isCharSelected) {
            centerOffset(this.shape);
            var offset = (menu.currentSelection[playerId] % 3);
            if (menu.currentSelection[playerId] < 3) {
                this.shape.setPosition(centerX - SELECTOR_ANCHOR_X + CHAR_BOX_WIDTHS[offset], SELECTOR_ANCHOR_Y);
            } else {
                this.shape.setPosition(centerX - SELECTOR_ANCHOR_X + CHAR_BOX_WIDTHS[offset], SELECTOR_ANCHOR_Y2);
            }
        } else if (!this.isSkinSelected){
            // skins
            for (var i = 0 ; i < NUM_SKIN_ARROWS; i++) {
                this.switchArrowImage(playerId, i, images.arrow_left); 
            }
            this.switchArrowImage(playerId, menu.currentSkinSelection[playerId], images.arrow_left_sel); 
        } 
    }

    /** */
    this.onArrowDown = function() {
         if (!this.isCharSelected) {
            // browse characters
            if (menu.currentSelection[playerId] + (NUM_CHARACTERS/CHAR_BOX_ROWS) < NUM_CHARACTERS) {
                menu.currentSelection[playerId] += (NUM_CHARACTERS/CHAR_BOX_ROWS);
                players[playerId].selectChar(menu.currentSelection[playerId]);
            }
        } else if (!this.isSkinSelected){
            // browse different skins
            if (menu.currentSkinSelection[playerId] != NUM_SKIN_ARROWS -1) {
                menu.currentSkinSelection[playerId]++;
            }
        }
    }


    /** */
    this.onArrowUp = function() {
        if (!this.isCharSelected) {
            // browse characters
             if (menu.currentSelection[playerId] - (NUM_CHARACTERS/CHAR_BOX_ROWS) >= 0) {
                menu.currentSelection[playerId] -= (NUM_CHARACTERS/CHAR_BOX_ROWS);
                players[playerId].selectChar(menu.currentSelection[playerId]);
            }
        } else if (!this.isSkinSelected){
            // browse different skins
            if (menu.currentSkinSelection[playerId] != 0) {
                menu.currentSkinSelection[playerId]--;
            }
        }
    }

    /** */
    this.onArrowLeft = function() {
        if (!this.isCharSelected) {
            // browse characters
            if (menu.currentSelection[playerId] - 1 >= 0) {
                menu.currentSelection[playerId]--;    
                players[playerId].selectChar(menu.currentSelection[playerId]);
            }
        } else if (!this.isSkinSelected){
            // browse different skins
            getNextSkin(-1,playerId);
        }
    }

    /** */
    this.onArrowRight = function() {
        if (!this.isCharSelected) {
            // browse characters
            if (menu.currentSelection[playerId] + 1 < NUM_CHARACTERS) {
                menu.currentSelection[playerId]++; 
                players[playerId].selectChar(menu.currentSelection[playerId]);   
            }
        } else if (!this.isSkinSelected){
            getNextSkin(1,playerId);
        }
    }

    
    /** */
    this.onEnter = function() {
        if (!this.isCharSelected) {
            this.isCharSelected = true;
            players[playerId].selectChar(menu.currentSelection[playerId]);
            this.switchArrowImage(playerId, menu.currentSkinSelection[playerId], images.arrow_left_sel);
        } else if (!this.isSkinSelected){
            this.isSkinSelected = true;
            this.switchArrowImage(playerId, menu.currentSkinSelection[playerId], images.arrow_left);

            // fill the ready_button
            menu.readyButtons[playerId].setFill({
                    image: images.ready_button_red,
                    offset: [0, 0],
            });
            menu.currentPlayersReady++;
            if (menu.currentPlayersReady == 2){
                game.show();
            }
        } 
    }
    
    this.switchArrowImage = function(playerId, selection, image, level) {
        menu.skinArrows[playerId][0][selection].setFill({
            image: image,
            repeat: 'no-repeat',
        });
        menu.skinArrows[playerId][1][selection].setFill({
            image: image,
            repeat: 'no-repeat',
        });
    }
    
    this.reset = function() {
        this.isCharSelected = false;
        this.isSkinSelected = false;
        menu.readyButtons[playerId].setFill({
            image: images.ready_button,
        });
        var flash = function(selector) {
            setTimeout(function() {
                // first flash
                // TODO change from flashing stroke to flashing sprite
                if (!selector.isCharSelected) {
                    selector.shape.setOpacity(0.5);
                    menuLayer.draw();
                }
                
                // TODO change from flashing stroke to flashing sprite
                setTimeout(function() {
                    if (!selector.isCharSelected) {
                        selector.shape.setOpacity(1);
                        menuLayer.draw();
                        flash(selector);
                    }
                }, 500);

            }, 500);
        };

        flash(this);
        
    }
    
    this.shape = new Kinetic.Rect({
                width: 101,
                height: 64,
                fill: {
                    image: images["selector"],
                },
            });
    centerOffset(this.shape);
        
    
    this.reset();
    this.update();
}



