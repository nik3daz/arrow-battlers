/*
 * Copyright (c) 2012, Christopher Lam, Nicholas Cellini, Rhys Davis, Esther Mosad
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met: 
 * 
 * 1. Redistributions of source code must retain the above copyright notice, this
 *    list of conditions and the following disclaimer. 
 * 2. Redistributions in binary form must reproduce the above copyright notice,
 *    this list of conditions and the following disclaimer in the documentation
 *    and/or other materials provided with the distribution. 
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE FOR
 * ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 * 
 * The views and conclusions contained in the software and documentation are those
 * of the authors and should not be interpreted as representing official policies, 
 * either expressed or implied, of the FreeBSD Project.
 */

GAME_FONT = "Calibri";
function start_game() {
    
    // Keypress
    function doKeyDown(evt) {
        if (!keyFocus) return;
        var key = -1;
        var i;
        for (i = 0; i < 2; i++) {
            key = players[i].getUdlre(evt);
            if (key != -1) break;
        }
        if (key != -1)
            keyFocus.onKeyDown(players[i], key);
    }
    
    function doKeyUp(evt){
    }

    function initLayers() {
    	var background = new Kinetic.Rect({
                width: stage.getWidth(),
                height: stage.getHeight(),
                fill: {
                    image: images.battle_bg,
                    //offset: [-170, -50],
                },
            });
            bgLayer.add(background);

    }
    
    // Key Constants
    KEY_U = 0;
    KEY_D = 1;
    KEY_R = 2;
    KEY_L = 3;
    KEY_E = 4;

    chars = [
        {
            
        },
        {
            // CHAR 2
        },
        {
            // CHAR 3
        },
        {
            // CHAR 4
        },
        {
            // CHAR 5
        },
        {
            // CHAR 6
        },
    ];

    // Battle Constants
    SKILL_QUEUE_SIZE = 4;

    // Game Constants
    NUM_CHARACTERS = chars.length;
    NUM_SKILLS = 6;
    SKILL_MAX_LENGTH = 6;

    // Menu UI Constants
    MONEY_Y_ANCHOR = 35;   
    MENU_CENTER_DISTANCE = 178.5;

    CHAR_BOX_MARGIN_TOP = 40; 
    CHAR_BOX_ROWS = 2;
    CHAR_BOX_MARGIN_SIDE = 50;
    CHAR_BOX_SIZE = (stage.getWidth()/2 - 2 * CHAR_BOX_MARGIN_SIDE) / 
        (NUM_CHARACTERS/CHAR_BOX_ROWS);

    SKILL_BOX_SIZE = CHAR_BOX_SIZE * (NUM_CHARACTERS/CHAR_BOX_ROWS) / NUM_SKILLS;

    READY_WIDTH = images.ready_button.width;
    READY_HEIGHT = images.ready_button.height;
    READY_MARGIN_BOTTOM = 10 + READY_HEIGHT / 2;

    /** Number of skin arrows (body, hair, shoes means 3 skin arrows)*/
    NUM_SKIN_ARROWS = 3;
    SKIN_ARROW_TOP_MARGIN = 40;
    SKIN_ARROW_SIZE = images.arrow_left.width-1;
    SKIN_ARROW_HEIGHT = images.arrow_left.height-1;
    SKIN_ARROW_BOTTOM_MARGIN = 20;
    SKIN_ARROW_CENTER_DIST = 100;
    SKIN_ARROW_Y_ANCHOR = CHAR_BOX_MARGIN_TOP + CHAR_BOX_SIZE * CHAR_BOX_ROWS + SKILL_BOX_SIZE + SKIN_ARROW_TOP_MARGIN;
    SKIN_ARROW_Y_ANCHOR_BOTTOM = READY_HEIGHT + READY_MARGIN_BOTTOM + SKIN_ARROW_TOP_MARGIN;
    SKIN_GAP = 27;

    HUD_CENTER_DISTANCE = MENU_CENTER_DISTANCE + 20;


    // TODO: make an array of characters or something that I can access by number
    CLASS_SPRITE_SHEET_PAGE_BORDER_SIZE = 2;
    CLASS_SPRITE_SHEET_FRAME_PADDING = 1;
    CLASS_SPRITE_SHEET_FRAME_HEIGHT = 120;
    CLASS_SPRITE_SHEET_FRAME_WIDTH = 70;

    // Globals
    SkillList = new getSkillList();
    ClassList = new ClassList();

    players = [];
    
    // Main
    game = new Game();
    
    initLayers();
    menu = new Menu();
    menu.init();

    battle = new Battle();
    battle.initBattle(players);

    keyFocus = game;

    debugLayer.draw();
    bgLayer.draw();
    playerLayer.draw();
    hudLayer.draw();
    menuLayer.draw();
    
    // Attach event listeners
    window.addEventListener('keydown', doKeyDown, false);
    window.addEventListener('keyup',doKeyUp, false);
};

/** Uses config input
    id: id of class
    name: written name of class
    spritesheet: image file for the sprite sheet */
function Class(config) {
    this.id = config.id;
    this.name = config.name;
    this.spritesheet = config.spritesheet;
    this.sprite = new Kinetic.Sprite({

    })
}

/** Create and add all layers to the stage */
function makeLayers() {
    debugLayer = new Kinetic.Layer();
    hudLayer = new Kinetic.Layer({x: stage.getWidth() / 2});
    menuLayer = new Kinetic.Layer({id: "menuLayer", x: stage.getWidth() / 2});
    playerLayer = new Kinetic.Layer({x: stage.getWidth() / 2});
    bgLayer = new Kinetic.Layer();
    fadeLayer = new Kinetic.Layer();

    stage.add(debugLayer);
    stage.add(bgLayer);
    stage.add(hudLayer);
    stage.add(menuLayer);
    stage.add(playerLayer);
    stage.add(fadeLayer);
}

/** Preload all images and call start_game() when done */
function load_assets() {
    stage = new Kinetic.Stage({
            container : "container",
            width : 800,
            height : 550,
        });

    makeLayers();
    initFadeLayer();

    var BAR_WIDTH = 200;
    var BAR_HEIGHT = 20;
    var BAR_Y = 500;
    var loadLayer = new Kinetic.Layer();
    loadLayer.add(centerOffset(new Kinetic.Rect({
        width: BAR_WIDTH,
        height: BAR_HEIGHT,
        x: stage.getWidth() / 2,
        y: BAR_Y,
        stroke:"black",
        strokeWidth: 4,
    })));
    var loadBar = new Kinetic.Rect({
        width: 0,
        height: BAR_HEIGHT,
        x: (stage.getWidth() - BAR_WIDTH) / 2,
        y: BAR_Y - BAR_HEIGHT / 2,
        fill:"black",
    });
    loadLayer.add(loadBar);
    stage.add(loadLayer);

    var loader = new PxLoader();
    //TODO remove
    // preloader test
    /*
    var baseUrl = 'http://thinkpixellab.com/pxloader' + 
            '/slowImage.php?delay=1time=' + new Date;
    for(var i=0; i < 10; i++) { 
        // this time we'll create a PxLoaderImage instance instead of just 
        // giving the loader the image url 
        var pxImage = new PxLoaderImage(baseUrl + '&i=' + i); 
     
        // we can add our own properties for later use 
        pxImage.imageNumber = i + 1; 
     
        loader.add(pxImage); 
    }*/
    //TODO end remove

    //TODO call loader.addImage("url") to load images
    // Image cache
    images = [];
    images["battle_bg"] = loader.addImage("battle_bg.png");
    images["ready_button_red"] = loader.addImage("ready_button_red.png");
    images["arrow_left"] = loader.addImage("arrow_left.png");
    images["arrow_left_sel"] = loader.addImage("arrow_left_sel.png");
    images["ready_button"] = loader.addImage("ready_button.png");
    images["arrow"] = loader.addImage("arrow.png");
    images["arrow_blue"] = loader.addImage("arrow-blue.png");
    images["arrow_complete"] = loader.addImage("arrow-selected.png");
    images["arrow_white"] = loader.addImage("arrow-white.png");
    images["arrow_green"] = loader.addImage("arrow-green.png");
    images["arrow_magenta"] = loader.addImage("arrow-magenta.png");
    images["arrow_red"] = loader.addImage("arrow-red.png");
    images["arrow_yellow"] = loader.addImage("arrow-yellow.png");
    images["health_bar"] = loader.addImage("health-bar.png");
    images["attack"] = loader.addImage("abilities/attack.png");
    images["dot"] = loader.addImage("abilities/dot.png");
    images["magic"] = loader.addImage("abilities/magic.png");
    images["defend"] = loader.addImage("abilities/defend.png");
    images["heal"] = loader.addImage("abilities/heal.png");
    images["menu_bg"] = loader.addImage("menu-bg.png");
    images["selector"] = loader.addImage("character-cursor.png");

    for (var i = 0; i < PlayerSprites.length; i++) {
        var x = PlayerSprites[i];
        images[x + "_head"] = loader.addImage("sprites/" + x + "-head-sheet.png");
        images[x + "_body"] = loader.addImage("sprites/" + x + "-body-sheet.png");
        images[x + "_feet"] = loader.addImage("sprites/" + x + "-feet-sheet.png");
    }

    loader.addProgressListener(function(e) {
        loadBar.setWidth(e.completedCount / e.totalCount * BAR_WIDTH);
        loadLayer.draw();
    });
    loader.addCompletionListener(function() {

        generateDoTSprites();

        fadeIn(function() {
            stage.remove(loadLayer);
            start_game();
            players[0].toMenuPosition();
            players[1].toMenuPosition();
            fadeOut();
            keyFocus = menu;
        });
    });
    loader.start();
}

function generateDoTSprites() {
    for (var i = 0; i < PlayerSprites.length; i++) {
        var x = PlayerSprites[i];
        greenify(images[x + "_head"], x + "_head_dot");
        greenify(images[x + "_body"], x + "_body_dot");
        greenify(images[x + "_feet"], x + "_feet_dot");
    }
}

function greenify(image, key) {
    // Comment to enable color change. Requires http:// access (not file:// access)
    images[key] = image; return;


    var gimg = new Kinetic.Image({image:image});
    gimg.applyFilter({
        filter: function(imageData) {
            var data = imageData.data;
            for(var i = 0; i < data.length; i += 4) {
                // red
                data[i] += 100;
                // green
                data[i + 1] *= 0.8;
                // blue
                data[i + 2] += 100;
                // i+3 is alpha (the fourth element)
            }
        },
        callback: function() {
            images[key] = gimg.getImage();
        },
    });
}

/** Set up the fade layer */
function initFadeLayer() {
    // Fade Layer
    var r = new Kinetic.Rect({
            width : stage.getWidth(),
            height : stage.getHeight(),
            strokeWidth : 0,
            fill : "white",
            alpha: 1,
    });
    fadeLayer.add(r);
}
