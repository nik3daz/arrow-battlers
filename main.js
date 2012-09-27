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
    var keys = [];
    function doKeyDown(evt) {
        evt.preventDefault();
        keys[evt.keyCode] = true;
    }
    
    function doKeyUp(evt){
        evt.preventDefault();
        keys[evt.keyCode] = false;
    }

    function initLayers() {
        // Fade Layer
        var r = new Kinetic.Rect({
                width : stage.getWidth(),
                height : stage.getHeight(),
                strokeWidth : 0,
                fill : "#F4F7F7",
		alpha: 1,
            });
        fadeLayer.add(r);

        initMenu();
    }

    // UI Constants
    var menuButtonCol = 18;
    var resetButtonCol = 14;

    // Globals
    var moveSquares = [];
    var movePlayer = null;
    stage = new Kinetic.Stage({
            container : "container",
            width : 800,
            height : 550,
        });
    debugLayer = new Kinetic.Layer();
    hudLayer = new Kinetic.Layer();
    menuLayer = new Kinetic.Layer({id: "menuLayer"});
    playerLayer = new Kinetic.Layer();
    bgLayer = new Kinetic.Layer();
    fadeLayer = new Kinetic.Layer();

    needsDrawing = [];

    var messages = [];
    
    // Main
    initLayers();

    stage.add(debugLayer);
    stage.add(fadeLayer);
    stage.add(bgLayer);
    stage.add(playerLayer);
    stage.add(hudLayer);
    stage.add(menuLayer);
    
    showMenu();

    // Attach event listeners
    window.addEventListener('keydown', doKeyDown, false);
    window.addEventListener('keyup',doKeyUp, false);
};
