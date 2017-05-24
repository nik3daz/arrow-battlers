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
        this.charCostTexts = [];
        this.skillBoxes = [];
        this.cost = [];
        this.currentSelection = [];
        this.selectors = [];
        this.skinArrows = [];
        this.skinLock = [];
        this.skinCost = [];
        this.playerName = [];
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

        this.skinLock[playerId] = [];
        this.skinCost[playerId] = [];

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

            // lock
            this.skinLock[playerId][i] = centerOffset(new Kinetic.Rect({
                width:SKIN_ARROW_SIZE + 10,
                height:SKIN_ARROW_SIZE + 10,
                fill: {
                    image: images.lock,
                    offset: [0, 0],
                },
                x: centerX,
                y: SKIN_ARROW_Y_ANCHOR + i*SKIN_ARROW_HEIGHT + i *SKIN_GAP,
            }));
            playerLayer.add(this.skinLock[playerId][i]);
            this.skinLock[playerId][i].hide();

            this.skinCost[playerId][i] = centerOffset(new Kinetic.Text({
                text: "$"+ClassList.characters[i].price,
                align : "center",
                x: centerX,
                y: SKIN_ARROW_Y_ANCHOR + i*SKIN_ARROW_HEIGHT + i *SKIN_GAP + 55,
                width: 93,
                height: 64,
                textFill:"yellow",
                fontSize:7,
                fontFamily:GAME_FONT,
            }));

            playerLayer.add(this.skinCost[playerId][i]);
            this.skinCost[playerId][i].hide();
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

         //================== PLAYER NAME ======================
        this.playerName[playerId] = new Kinetic.Text({
            text: "TRON",
            align : "center",
            x: centerX,
            y: 280,
            width: stage.getWidth() / 2,
            height: 40,
            textFill:"black",
            fontFamily:GAME_FONT,
        });
        centerOffset(this.playerName[playerId]);
        menuLayer.add(this.playerName[playerId]);

        //================== SELECTORS ======================
        this.currentSelection[playerId] = 0;

        this.selectors[playerId] = new Selector(playerId, centerX);

        menuLayer.add(this.selectors[playerId].shape);

        //================== LOCKED CHAR BOXES ======================
        var SELECTOR_ANCHOR_X = 106;
        var SELECTOR_ANCHOR_Y = 106;
        var SELECTOR_ANCHOR_Y2 = 176;
        var CHAR_BOX_HEIGHT = 50;
        var CHAR_BOX_WIDTHS = [0, 106, 212.5];
        this.charBoxes[playerId] = [];
        this.charCostTexts[playerId] = [];
        this.skillBoxes[playerId] = [];
        for (var i = 0; i < 6; i++) {
            var w = 46;
            var o = ClassList.characters[0].skillShow[i];
            var r = new Kinetic.Rect({
                width:w,
                height:32,
                fill: "#BDBDBD",
                x:centerX - 140 + w * i,
                y:215,
                opacity: o,
            });
            this.skillBoxes[playerId].push(r);
            menuLayer.add(r);
        } 
        for (var i = 0; i < NUM_CHARACTERS; i++) {
            var offset = i % 3;
            var yOffset;

            if (i < 3) {
                yOffset = SELECTOR_ANCHOR_Y + 1;
            } else {
               yOffset = SELECTOR_ANCHOR_Y2;
            }

            this.charBoxes[playerId][i] = new Kinetic.Rect({
                width:93,
                height:65,
                fill: {
                    image: images.locked_char,
                    offset: [0,0],
                },
                x:centerX - SELECTOR_ANCHOR_X + CHAR_BOX_WIDTHS[offset],
                y:yOffset,
            });

            this.charCostTexts[playerId][i] = new Kinetic.Text({
                text: "$"+ClassList.characters[i].price,
                align : "center",
                x: centerX - SELECTOR_ANCHOR_X + CHAR_BOX_WIDTHS[offset],
                y: yOffset + 28,
                width: 93,
                height: 64,
                textFill:"yellow",
                fontSize:9,
                fontFamily:GAME_FONT,
            });

            centerOffset(this.charBoxes[playerId][i]);
            menuLayer.add(this.charBoxes[playerId][i]);
            this.charBoxes[playerId][i].moveDown();


            centerOffset(this.charCostTexts[playerId][i]);
            menuLayer.add(this.charCostTexts[playerId][i]);
            this.charCostTexts[playerId][i].moveDown();
            // make box invis if selected
            if (contains(players[playerId].unlockedChars, i)) {
                this.charCostTexts[playerId][i].hide();
                this.charBoxes[playerId][i].hide();
            }
        }



       
    }

    this.show = function() {
        keyFocus = null;
        fadeIn(function() {
            menu.reset();
            menuLayer.moveToTop();
            playerLayer.moveToTop();
            helpLayer.moveToTop();
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
    var property = menu.currentSkinSelection[playerId];
    players[playerId].skinIndex[property] += direction + ClassList.characters[players[playerId].selectedChar].skins.length;;
    players[playerId].skinIndex[property] %= ClassList.characters[players[playerId].selectedChar].skins.length;

    ClassList.characters[players[playerId].selectedChar][players[playerId].skinIndex[property]];

    // TODO: check if the player owns the skin and if not display a lock and price up
    var player = players[playerId];
    var property = menu.currentSkinSelection[playerId];
    if (contains(player.unlockedSkins[player.selectedChar][player.skinIndex[property]], property)) {
        // if unlocked
        menu.skinCost[playerId][property].hide();
        menu.skinLock[playerId][property].hide();

    } else {
        // if locked
        menu.skinCost[playerId][property].setText("$"+ClassList.characters[player.selectedChar].skinsCost[player.skinIndex[property]]);
        menu.skinCost[playerId][property].show();
        menu.skinLock[playerId][property].show();
    }

    players[playerId].updateSprite();
}

/** Called when a player has changed their selection (by hovering over a character) */
var onCharacterHover = function(playerId, charId) {
    // change the skill boxes
}

/** Selector Class */
function Selector(playerId, centerX) {
    var SELECTOR_ANCHOR_X = 106;
    var SELECTOR_ANCHOR_Y = 107;
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

            if (contains(players[playerId].unlockedChars,  menu.currentSelection[playerId])) {
                menu.playerName[playerId].setText(ClassList.characters[menu.currentSelection[playerId]].name);
            } else {
                menu.playerName[playerId].setText("UNKNOWN");
                players[playerId].updateSprite();
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
                //if (contains(players[playerId].unlockedChars,  menu.currentSelection[playerId])) {
                    players[playerId].selectChar(menu.currentSelection[playerId]);
                //}
                   
                
               
            }
        } else if (!this.isSkinSelected){
            // CHECK IF SKIN HAS BEEN BOUGHT BEFORE
            var player = players[playerId];
            var property = menu.currentSkinSelection[playerId];
            if (contains(player.unlockedSkins[player.selectedChar][player.skinIndex[property]], property)) {
                 // browse different skins
                if (menu.currentSkinSelection[playerId] != NUM_SKIN_ARROWS -1) {
                    menu.currentSkinSelection[playerId]++;
                }
            }
           
        }
    }


    /** */
    this.onArrowUp = function() {
        if (!this.isCharSelected) {
            // browse characters
             if (menu.currentSelection[playerId] - (NUM_CHARACTERS/CHAR_BOX_ROWS) >= 0) {
                menu.currentSelection[playerId] -= (NUM_CHARACTERS/CHAR_BOX_ROWS);
               // if (contains(players[playerId].unlockedChars,  menu.currentSelection[playerId])) {
                    players[playerId].selectChar(menu.currentSelection[playerId]);
                //}
            }
        } else if (!this.isSkinSelected){
            // CHECK IF SKIN HAS BEEN BOUGHT BEFORE
            var player = players[playerId];
            var property = menu.currentSkinSelection[playerId];
            if (contains(player.unlockedSkins[player.selectedChar][player.skinIndex[property]], property)) {
                 // browse different skins
                if (menu.currentSkinSelection[playerId] != 0) {
                    menu.currentSkinSelection[playerId]--;
                }
            }
        }
    }

    /** */
    this.onArrowLeft = function() {
        if (!this.isCharSelected) {
            // browse characters
            if (menu.currentSelection[playerId] - 1 >= 0) {
                menu.currentSelection[playerId]--;    
                //if (contains(players[playerId].unlockedChars,  menu.currentSelection[playerId])) {
                    players[playerId].selectChar(menu.currentSelection[playerId]);
                //}
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
                //if (contains(players[playerId].unlockedChars,  menu.currentSelection[playerId])) {
                    players[playerId].selectChar(menu.currentSelection[playerId]);
                //}
            }
        } else if (!this.isSkinSelected){
            getNextSkin(1,playerId);
        }
    }

    var flashMoney = function() {
        var flash = function(times) {
            if (times == 0) return;
            setTimeout(function() {
                menu.money[playerId].setTextFill("red");
                menuLayer.draw();
                setTimeout(function() {
                    menu.money[playerId].setTextFill("black");
                    menuLayer.draw();
                    flash(times - 1);
                }, 100);

            }, 100);
        }
        flash(3);
    }
    
    /** */
    this.onEnter = function() {
        if (!this.isCharSelected) {
            // IF CHARACTER IS UNLOCKED
            if (contains(players[playerId].unlockedChars,  menu.currentSelection[playerId])) {
                this.isCharSelected = true;
                players[playerId].selectChar(menu.currentSelection[playerId]);
                this.switchArrowImage(playerId, menu.currentSkinSelection[playerId], images.arrow_left_sel);
            } else {
                // PAY THE MONEY
                players[playerId].unlockCharacter(menu.currentSelection[playerId],
                    function() {
                        // failed
                        flashMoney();
                    },
                    function() {
                        // success
                        // unlock
                        menu.charBoxes[playerId][menu.currentSelection[playerId]].hide();
                        menu.charCostTexts[playerId][menu.currentSelection[playerId]].hide();
                        menu.money[playerId].setText("$"+players[playerId].money);
                        players[playerId].selectChar(menu.currentSelection[playerId]);
                        menuLayer.draw();
                    }
                );
            }
        } else if (!this.isSkinSelected) {
            var player = players[playerId];
            var property = menu.currentSkinSelection[playerId];
            if (contains(player.unlockedSkins[player.selectedChar][player.skinIndex[property]], property)) {
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
            } else {
                // try to buy the skin
                if (player.money >= ClassList.characters[player.selectedChar].skinsCost[player.skinIndex[property]]) {
                    player.unlockedSkins[player.selectedChar][player.skinIndex[property]].push(property);
                    player.money -= ClassList.characters[player.selectedChar].skinsCost[player.skinIndex[property]];
                    menu.money[playerId].setText("$"+players[playerId].money);

                    menu.skinCost[playerId][property].hide();
                    menu.skinLock[playerId][property].hide();

                    this.update();
                    menuLayer.draw();
                    playerLayer.draw();
                } else {
                    flashMoney();
                }
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
                if (!selector.isCharSelected) {
                    selector.shape.setOpacity(0.5);
                    selector.shape.setScale(1.1, 1.1);
                    menuLayer.draw();
                }
                
                setTimeout(function() {
                    if (!selector.isCharSelected) {
                        selector.shape.setOpacity(1);
                        selector.shape.setScale(1, 1);
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



