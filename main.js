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
        var key = -1;
        var i;
        for (i = 0; i < 2; i++) {
            key = players[i].getUdlre(evt);
            if (key != -1) break;
        }
        if (key != -1)
            keyFocus.onKeyDown(player[i], key);
    }
    
    function doKeyUp(evt){
    }

    function initLayers() {

        initMenu();
    }
    
    // Key Constants
    KEY_U = 0;
    KEY_D = 1;
    KEY_R = 2;
    KEY_L = 3;
    KEY_E = 4;

    // Battle Constants
    SKILL_QUEUE_SIZE = 4;

    // Game Constants
    NUM_CHARACTERS = 6;
    NUM_SKILLS = 6;

    // Menu UI Constants
    MONEY_MARGIN_ABOVE_BELOW = 15;   
    MONEY_TEXT_HEIGHT = 10;

    CHAR_BOX_MARGIN_TOP = MONEY_MARGIN_ABOVE_BELOW * 2 + MONEY_TEXT_HEIGHT;
    CHAR_BOX_ROWS = 2;
    CHAR_BOX_MARGIN_SIDE = 50;
    CHAR_BOX_SIZE = (stage.getWidth()/2 - 2 * CHAR_BOX_MARGIN_SIDE) / 
        (NUM_CHARACTERS/CHAR_BOX_ROWS);


    READY_MARGIN_BOTTOM = 10;
    READY_WIDTH = 100;
    READY_HEIGHT = 40;

    // Globals
    SkillList = getSkillList();
    players = [];
    
    // Main
    game = new Game();
    initLayers();

    keyFocus = game;

    debugLayer.draw();
    bgLayer.draw();
    playerLayer.draw();
    hudLayer.draw();
    menuLayer.draw();
    
    showMenu();

    // Attach event listeners
    window.addEventListener('keydown', doKeyDown, false);
    window.addEventListener('keyup',doKeyUp, false);
};

/** Create and add all layers to the stage */
function makeLayers() {
    debugLayer = new Kinetic.Layer();
    hudLayer = new Kinetic.Layer();
    menuLayer = new Kinetic.Layer({id: "menuLayer"});
    playerLayer = new Kinetic.Layer({x: stage.getWidth() / 2});
    bgLayer = new Kinetic.Layer();
    fadeLayer = new Kinetic.Layer();

    stage.add(debugLayer);
    stage.add(bgLayer);
    stage.add(playerLayer);
    stage.add(hudLayer);
    stage.add(menuLayer);
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
    images["vader"] = loader.addImage("http://www.html5canvastutorials.com/demos/assets/darth-vader.jpg");
    loader.addProgressListener(function(e) {
        loadBar.setWidth(e.completedCount / e.totalCount * BAR_WIDTH);
        loadLayer.draw();
    });
    loader.addCompletionListener(function() {
        console.log("GO");
        fadeIn(function() {
            stage.remove(loadLayer);
            start_game();
            fadeOut();
        })
    });
    loader.start();
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
