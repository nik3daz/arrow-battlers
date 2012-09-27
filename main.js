/*
 * Copyright (c) 2012, Christopher Lam
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


// Protip: This code is really bad

/*
 * todo-list:
 *  fade green squares in
 *  undo-stack for moves
 *  don't attach functions to layers (displayMess)
 *  hint system
 */
GAME_FONT = "Calibri";
function start_game() {
    
    // Map Constants
    var mapMaxX = 22;
    var mapMaxY = 22;

    var mapList = [
        {
            level: 0,
            name: "Fishalicious",
            message: "Pink:WASD/Mouseover Pink",
            map: [
                "...   ",
                "...   ",
                ".0    ",
                "... ..",
                "...G..",
            ],
        },
        {
            level: 0,
            name: "Blehh",
            map: [
                ".    . ",
                "  .    ",
                "       ",
                ".     .",
                "..0  ..",
                "... ...",
                "...G...",
            ],
        },
        {
            level: 0,
            name: "Dryspin",
            map: [
                "         .. ",
                ".           ",
                "   .        ",
                "           .",
                "           0",
                "            ",
                "            ",
                "            ",
                "            ",
                "            ",
                "            ",
                ".G.         ",
            ],
        },
        /*
        {
            level: 0,
            name: "Pokemanzz",
            map: [
                "         .     ",
                "   .           ",
                "          .    ",
                " .             ",
                ".        .     ",
                "              .",
                "       .       ",
                "  .           G",
                "              .",
                "        .      ",
                "      .   .    ",
                "              0",
            ],
        },
        */
        {
            level: 1,
            name: "It's magic all up in here",
            message: "Walls: Click green squares",
            mp: 1,
            map: [
                "...   ..",
                ".       ",
                ".0      ",
                "... ....",
                "...G....",
            ],
        },
        {
            level: 1,
            name: "Loopy",
            message: "MP (top left) = Walls",
            mp: 1,
            map: [
                "...         ...",
                "...         ...",
                "...         ...",
                "...         ...",
                "...         ...",
                "...         ...",
                "...           G",
                "...         ...",
                "0           ...",
            ],
        },
        {
            level: 1,
            name: "Filler",
            mp: 1,
            map: [
                "...        ....",
                "...         ...",
                "...         ...",
                "...         ...",
                "...         ...",
                "...           G",
                "...         ...",
                "..0        ....",
                "..  ...........",
            ],
        },
        {
            level: 1,
            name: "Lrn2Stack",
            message: "Protip:Left hand for WASD/TFGH",
            mp: 2,
            map: [
                ".......      ...",
                ".......      ...",
                ".......      ...",
                ".......      ...",
                "...          ...",
                "...            G",
                "...          ...",
                "...          ...",
                "...          ...",
                "0            ...",
            ],
        },
        {
            level: 1,
            name: "Baby Steps",
            mp: 2,
            map: [
                ".       .",
                "        .",
                "       ..",
                "       ..",
                "       ..",
                "       ..",
                "        G",
                "       ..",
                "       ..",
                "      0..",
            ],
        },
        {
            level: 1,
            name: "Center Stage",
            mp: 2,
            map: [
                "0    ",
                "     ",
                "  G  ",
                "     ",
                "     ",
            ],
        },
        {
            level: 2,
            name: "I see my franzz",
            message: "Blue:Arrow Keys/TFGH/Mouse",
            mp: 0,
            map: [
                "...G....",
                "... ....",
                "...    1",
                "...   ..",
                ".0    ..",
                ".... ...",
                "....G...",
            ],
        },
        {
            level: 2,
            name: "Lean On Me",
            mp: 0,
            map: [
                "......G.....",
                "...... .....",
                "...... .....",
                "            ",
                "            ",
                "  0      1  ",
                "            ",
                "            ",
                "..... ......",
                "..... ......",
                ".....G......",
            ],
        },
        {
            level: 2,
            name: "Knight Time",
            mp: 1,
            map: [
                "     ..",
                "     ..",
                "  1  ..",
                "     ..",
                "     ..",
                "     ..",
                "     ..",
                "  0  ..",
                "     ..",
                ".... ..",
                "..G   G",
                ".... ..",
            ],
        },
        {
            level: 2,
            name: "Breaking and Entering",
            mp: 1,
            map: [
                "                  ",
                "                  ",
                "                 1",
                "                  ",
                "                  ",
                "              ....",
                "              .G  ",
                "              .   ",
                "              .   ",
                "                  ",
                "                  ",
                "              .   ",
                "              .   ",
                "              .  G",
                "              ....",
                "                  ",
                "                  ",
                "                 0",
                "                  ",
                "                  ",
            ],
        },
        {
            level: 2,
            name: "Worlds Apart",
            mp: 4,
            map: [
                "....    .     ...",
                "...     .     ...",
                "...  0  .     ...",
                "...     .     ...",
                "...     .     ...",
                "G       .       G",
                "...     .     ...",
                "...     .     ...",
                "...     .  1  ...",
                "...     .     ...",
                "...     .    ....",
            ],
        },
        {
            level: 0,
            name: "Back to Basics",
            map: [
                "          .    ",
                "   .           ",
                "       .     . ",
                "          .    ",
                ".    .G .      ",
                "  .   .       .",
                "         .     ",
                "    .          ",
                "        .   .  ",
                " .             ",
                "     .    .    ",
                "     0.        ",
            ],
        },
        {
            level: 2,
            name: "The Lonely Island",
            mp: 1,
            map: [
                "             1",
                "             .",
                "             .",
                "             .",
                "             .",
                "             .",
                "     ...     .",
                "     GG.     .",
                "     ...     .",
                "             .",
                "             .",
                "             .",
                "             .",
                "             0",
            ],
        },
        {
            level: 2,
            name: "2, 1, 2, 1, 2, 1",
            mp: 9,
            map: [
                "          .         ",
                "          .         ",
                "    .     .        .",
                "            .       ",
                "          .         ",
                "          .        .",
                "   .      .         ",
                "          .         ",
                "... ...  . ..... ...",
                "       ...  .       ",
                "       .G 1 .       ",
                "       ..   .       ",
                "        .....       ",
                "       .     . .....",
                "       .     .      ",
                ".... ...     .      ",
                "         .   .     G",
                "       .     .......",
                "       .           0",
                "       .            ",
            ],
        },
        {
            level: 2,
            name: "Lofty Goals",
            mp: 2,
            map: [
                "             1",
                "              ",
                "              ",
                "              ",
                "              ",
                "              ",
                "              ",
                "    G    G    ",
                "              ",
                "              ",
                "              ",
                "              ",
                "              ",
                "0             ",
            ],
        },
        {
            level: 2,
            name: "Mobius Double Reacharound",
            mp: 2,
            map: [
                ".....0         .....",
                "..... ........ .....",
                "..... ........ .....",
                "..... ........ .....",
                "..... ........ .....",
                ".                  .",
                ". ...          ... .",
                "  ...    .     ...  ",
                " ....  ...     .... ",
                " ....  .G  .   .... ",
                " ....   .  G.  .... ",
                " ....     ...  .... ",
                "  ...     .    ...  ",
                ". ...          ... .",
                ".1                 .",
                "..... ........ .....",
                "..... ........ .....",
                "..... ........ .....",
                "..... ........ .....",
                ".....          .....",
            ],
        },
        {
            level: 2,
            name: "Prison Break",
            mp: 2,
            map: [
                "......G......",
                "             ",
                " .... . .... ",
                " .1        . ",
                " . ... ... . ",
                " . .     . . ",
                "   .     .   ",
                " .         . ",
                "   .     .   ",
                " . .    0. . ",
                " . ... ... . ",
                " .         . ",
                " ..... ..... ",
                "             ",
                ".......G.....",
            ],
        },
        {
            level: 3,
            name: "Introverted",
            mp: 1,
            map: [
                "                  ",
                " . . .....  ... . ",
                "                  ",
                " .              . ",
                "             .  . ",
                " .  .           . ",
                " .              . ",
                " .                ",
                " .    ..   .    . ",
                " .    .G        . ",
                "      .. .      . ",
                "              . . ",
                " .                ",
                " .          .   . ",
                "    .           . ",
                " .              . ",
                "                  ",
                " . ... .. .  .. . ",
                "                  ",
                ".........0........",
            ],
        },
        {
            level: 3,
            name: "Starry Night",
            mp: 1,
            map: [
                "..............G.....",
                ".............. .....",
                ".........         ..",
                ".     .            .",
                ".       .           ",
                "  .            .    ",
                "                    ",
                "                    ",
                "  .        ..       ",
                "     .              ",
                "             .      ",
                "                    ",
                "                    ",
                "                .   ",
                "       .            ",
                "                    ",
                "          .         ",
                "      .   .       . ",
                "   .      .       . ",
                "0  .      .       . ",
            ],
        },
        {
            level: 3,
            name: "Lateral Stacking",
            mp: 3,
            map: [
                ".....             ",
                ".....             ",
                "                  ",
                "                  ",
                "  .               ",
                "                 .",
                "                 .",
                "                 .",
                "                 .",
                "                 .",
                "                 .",
                "                 .",
                "                 .",
                "                  ",
                "                  ",
                "                 0",
                "....  .. .........",
                "....  .. .........",
                "....  .. .........",
                "....  ..G.........",
            ],
        },
        {
            level: 3,
            name: "FUUUUUdalism",
            mp: 4,
            map: [
                ".......           ",
                ".......           ",
                " ..               ",
                "  .               ",
                "  .               ",
                "                 .",
                "                 .",
                "           .     .",
                "                 .",
                "                 .",
                "                 .",
                "..       .G.     .",
                "         ...     .",
                "                 .",
                "                 .",
                "  .              0",
                ".....   ..........",
                ".....   ..........",
                ".....   ..........",
                ".....   ..........",
            ],
        },
    ];

    // Tiles
    var tileSize = 30;
    var colors = {
        "." : "#96C5B2",
        " " : "#F4F7F7",
    }
    function makeTile(x, y, layer) {
        var r = new Kinetic.Rect({
                width : tileSize,
                height : tileSize,
                x : tileSize * x,
                y : tileSize * y,
                strokeWidth : 0,
            });
        r.reset = function() {
            r.canFreeze = false;
            r.hasPlayer = null;
            r.isGoal = false;
            r.moveSquare = false;
        }
        r.reset();
        r.x = x;
        r.y = y;

        // Tile functions
        r.setType = function(c) {
            this.type = c;
            this.setFill(colors[c]);
        }
        
        r.setFreeze = function(b) {
            if (this.type == " " && !this.isGoal && !this.hasPlayer) {
                this.canFreeze = b;
                if (b && mp > 0) {
                    this.setFill("#DBFF94");
                } else {
                    this.setFill(colors[this.type]);
                }
            }
        }
        r.eachAdjacent = function(cb) {
            var aoe = [
                    [0, -1],
                    [0, 1],
                    [-1, 0],
                    [1, 0],
                ];
            for (var i in aoe) {
                var d = aoe[i];
                var x = r.x + d[0];
                var y = r.y + d[1];
                if (valid(x, y))
                    cb(map[y][x]);
            }
            tileLayer.draw();
        };
        
        r.on("mouseover", function() {
/*            if (dragTile && dragTile != r) {
                var x = r.x - dragTile.x;
                var y = r.y - dragTile.y;
                if (Math.abs(x) > Math.abs(y)) {
                    if (x < 0)
                        keys[dragTile.hasPlayer.udlr[0][2]] = true;
                    else
                        keys[dragTile.hasPlayer.udlr[0][3]] = true;
                } else {
                    if (y < 0)
                        keys[dragTile.hasPlayer.udlr[0][0]] = true;
                    else
                        keys[dragTile.hasPlayer.udlr[0][1]] = true;
                }
                dragTile = null;
                move();
            }*/
            if (movePlayer && ready && !r.hasPlayer) {
                var clear = !r.moveSquare;
                r.eachAdjacent(function(b) {
                    if (b.moveSquare)
                        clear = false;
                });
                if (clear) {
                    clearMoveSquares();
                    setFreezesVisible(true);
                }
            }
        });
        r.on("mousedown", function () {
            if (r.moveSquare) {
                var p = movePlayer;
                var x = r.x - p.x;
                var y = r.y - p.y;
                if (Math.abs(x) > Math.abs(y)) {
                    if (x < 0)
                        keys[movePlayer.udlr[0][2]] = true;
                    else
                        keys[movePlayer.udlr[0][3]] = true;
                } else {
                    if (y < 0)
                        keys[movePlayer.udlr[0][0]] = true;
                    else
                        keys[movePlayer.udlr[0][1]] = true;
                }
                clearMoveSquares();
                move();
            } else if (ready &&
                    mp > 0 &&
                    r.canFreeze &&
                    !r.hasPlayer &&
                    r.type == " " && 
                    !r.isGoal
                    ) {
                mp--;
                writeMP(mp);
                ready = false;
                r.type = ".";
                r.fadeTo("#318060", function() {
                    if (mp <= 0) {
                        setFreezesVisible(false);
                    }
                    ready = true;
                });
            }
        });

        r.fadeTo = function(col, cb) {
            if (!cb) cb = function() {};
            if (!r.fading) {
                r.fading = true;
                var origC = toRGB(r.getFill());
                var destC = toRGB(col);
                var steps = 10;
                var dc = [];
                for (var x = 0; x < origC.length; x++) {
                    dc[x] = (destC[x] - origC[x]) / steps;
                }
                r.colorFadeStep = 0;
                var f = function () {
                    for (var x in origC) {
                        origC[x] += dc[x];
                    }
                    r.setFill('rgb(' + Math.round(origC[0]) + ','
                         + Math.round(origC[1]) + ','
                         + Math.round(origC[2]) + ')');
                    needsDrawing[r.getParent().getId()] = r.getParent();
                    if (r.colorFadeStep >= steps) {
                        r.setFill(col);
                        needsDrawing[r.getParent().getId()] = r.getParent();
                        r.fading = false;
                        cb();
                        return;
                    }
                    setTimeout(f, 40);
                    r.colorFadeStep++;
                };
                setTimeout(f, 40);
            } else {
                cb();
            }
        }
        
        layer.add(r);
        return r;
    }
    
    function setFreezesVisible(b) {
        for (var i in players) {
            var p = players[i];
            if (p.active) {
                p.eachAffected(function(r) {
                    r.setFreeze(b);
                });
            }
        }
    }
    
    function toRGB(hex) {
        var r = parseInt(hex.substr(1, 2), 16);
        var g = parseInt(hex.substr(3, 2), 16);
        var b = parseInt(hex.substr(5, 2), 16);
        return [r, g, b];
    }

    function samePosition(a, b) {
        return (a.x == b.x && a.y == b.y);
    }
    
    // Players
    var playerSize = tileSize / 2;

    function makePlayers() {
        players = [];
        players.push(
            makePlayer(
                "#FFB8F1",
                [[87, 83, 65, 68]],
                [
                    [0, -1],
                    [0, 1],
                    [-1, 0],
                    [1, 0],
                ])
        );
        players.push(
            makePlayer(
                "#86A8ED",
                [
                    [38, 40, 37, 39],
                    [84, 71, 70, 72],
                ],
                [
                    [1, -2],
                    [1, 2],
                    [2, 1],
                    [2, -1],
                    [-1, -2],
                    [-1, 2],
                    [-2, 1],
                    [-2, -1],
                ])
        );
        return players;
    }

    function makePlayer(color, udlr, aoe) {
        var p = new Kinetic.Rect({
                width : playerSize,
                height : playerSize,
                strokeWidth : 0,
                fill : color,
                centerOffset: [(playerSize - tileSize) / 2, (playerSize - tileSize) / 2],
            });
        p.setLocation = function (x, y) {
            this.x = parseFloat(x);
            this.y = parseFloat(y);
            this.setPosition({
                x : tileSize * x,
                y : tileSize * y,
            });
        }
        p.on("mouseover", function() {
            if (movePlayer == p) return;
            clearMoveSquares();
            if (ready) {
                moveSquares = [];
                movePlayer = p;
                map[p.y][p.x].eachAdjacent(function(r) {
                    if (r.type == " " && !r.hasPlayer) {
                        r.setFill(p.getFill());
                        moveSquares.push(r);
                        r.moveSquare = true;
                    }
                });
            }
        });
        p.move = function (x, y) {
            var duration = Math.abs(p.x - x + p.y - y) * 0.04;
            ready = false;
            setFreezesVisible(false);
            p.transitionTo({
                x : tileSize * x,
                y : tileSize * y,
                callback : function () {
                    p.x = x;
                    p.y = y;
                    ready = true;
                    var solved = true;
                    for (var i = 0; i < players.length; i++) {
                        var player = players[i];
                        if (player.active && !map[player.y][player.x].isGoal) {
                            solved = false;
                            break;
                        }
                    }
                    if (solved) {
                        victory();
                    } else {
                        if (!move()) {
                            setFreezesVisible(true);
                        }
                    }
                },
                duration : duration,
            });
        };
       
        p.eachAffected = function(cb) {
            for (var i in aoe) {
                var d = aoe[i];
                var x = p.x + d[0];
                var y = p.y + d[1];
                if (valid(x, y))
                    cb(map[y][x]);
            }
            tileLayer.draw();
        };
        p.removeFromLayer = function() {
            p.getParent().remove(p);
        };
        p.udlr = udlr;
        p.active = false;
        playerLayer.add(p);
        ready = false;
        return p;
    }

    // Goal
    var goalSize = playerSize * 1.5;
    function makeGoal() {
        var r = makePlayer("#FFEA59");
        r.setCenterOffset([(goalSize - tileSize) / 2, (goalSize - tileSize) / 2]);
        r.setWidth(goalSize);
        r.setHeight(goalSize);
        r.move = null;
        r.ready = null;
        r.moveToBottom();
        r.removeFromLayer();
        r.off("mousedown mouseover");
        tileLayer.add(r);
        return r;
    }
    
    // Keypress
    var keys = [];
    function doKeyDown(evt) {
        evt.preventDefault();
        keys[evt.keyCode] = true;
        if (!menuLayer.active)
            move();
    }
    
    function doKeyUp(evt){
        evt.preventDefault();
        keys[evt.keyCode] = false;
        if (!menuLayer.active)
            move();
    }

    function doMouseUp(evt){
        dragTile = null;
        keys = [];
    }

    function valid(x, y) {
        return (x >= 0 && y >= 0 && x < mapMaxX && y < mapMaxY)
    }

    function move() {
        var moved = false;
        for (var i = 0; i < players.length && !moved; i++) {
            var p = players[i];
            if (ready && p.active) {
                var dx = 0, dy = 0;
                if (keys[82]) {
                    fadeInMap(mapNum, false);
                    return false;
                } else if (keys[77]) {
                    showMenu();
                    return false;
                } else {
                    for (var k = 0; k < p.udlr.length; k++) {
                        if (keys[p.udlr[k][0]]) {
                            dx = 0;
                            dy = -1;
                        } else if (keys[p.udlr[k][1]]) {
                            dx = 0;
                            dy = 1;
                        } else if (keys[p.udlr[k][2]]) {
                            dx = -1;
                            dy = 0;
                        } else if (keys[p.udlr[k][3]]) {
                            dx = 1;
                            dy = 0;
                        }
                    }
                } 
                if (dx == 0 && dy == 0) continue;
                map[p.y][p.x].hasPlayer = null;
                var nx = p.x, ny = p.y;
                while (valid(nx, ny) && map[ny][nx].type != "." && !map[ny][nx].hasPlayer) {
                    nx += dx;
                    ny += dy;
                }
                nx -= dx;
                ny -= dy;
                if (p.x != nx || p.y != ny) {
                    checked = [];
                    //paintReachable(nx, ny);
                    p.move(nx, ny);
                    moved = true;
                    numMoves++;
                    writeMessage("Moves: " + numMoves, movesPosition);
                }
                map[ny][nx].hasPlayer = p;
            }
        }
        return moved;
    }

    function paintReachable(x, y) {
        var d = [[0,1],[0,-1],[-1,0],[1,0]];
        for (var i = 0; i < 4; i++) {
            var nx = x, ny = y;
            while (valid(nx, ny) && map[ny][nx].type != ".") {
                nx += d[i][0];
                ny += d[i][1];
            }
            nx -= d[i][0];
            ny -= d[i][1];
            if (!checked[nx+"," +ny]) {
                map[ny][nx].setFill("black");
                checked[nx+","+ny] = true;
                paintReachable(nx, ny);
            }
        }
    }

    // Maps
    function initMapLayer() {
        map = [];
        for (var i = 0; i < mapMaxY; i++) {
            var tArr = []
            for (var j = 0; j < mapMaxX; j++) {
                tArr.push(makeTile(j, i, tileLayer));
            }
            map.push(tArr);
        }
    }
    
    function loadMap(n) {
        // Hide players
        for (var i = 0; i < players.length; i++) {
            players[i].hide();
            players[i].active = false;
        }
        // Remove stray goals
        for (var i = 0; i < goals.length; i++) {
            goals[i].removeFromLayer();
        }
        goals = [];
        // Everything is a wall
        for (var i = 0; i < mapMaxY; i++) {
            for (var j = 0; j < mapMaxX; j++) {
                map[i][j].setType(".");
            }
        }
        // Clear messages
        messages = [];
        // Do MP
        mp = 0;
        writeMP("");
        if (mapList[n].mp != undefined) {
            mp = mapList[n].mp;
            writeMP(mp);
        }
        // Write name
        writeMessage((n + 1) + ". " + mapList[n].name, namePosition);
        // Load map string
        var mapStringArray = mapList[n].map;
        var xOffset = Math.floor(mapMaxX / 2 - mapStringArray[0].length / 2);
        var yOffset = Math.floor(mapMaxY / 2 - mapStringArray.length / 2);
        for (var i = 0; i < mapStringArray.length; i++) {
            var sArr = mapStringArray[i].split("");
            for (var j = 0; j < sArr.length; j++) {
                map[i + yOffset][j + xOffset].reset();
                if (sArr[j].match(/[0-9]/)) {
                    var p = players[parseInt(sArr[j])];
                    p.setLocation(j + xOffset, i + yOffset);
                    p.show();
                    p.active = true;
                    map[i + yOffset][j + xOffset].hasPlayer = p;
                    sArr[j] = " ";
                } else if (sArr[j] == "G") {
                    var g = makeGoal();
                    g.setLocation(j + xOffset, i + yOffset);
                    goals.push(g);
                    map[i + yOffset][j + xOffset].isGoal = true;
                    sArr[j] = " ";
                }
                map[i + yOffset][j + xOffset].setType(sArr[j]);
                map[i + yOffset][j + xOffset].setFreeze(false);
            }
        }
        setMenuButtons();
        setFreezesVisible(true);
        tileLayer.draw();
        playerLayer.draw();
    }

    function setMenuButtons() {
        writeMessage("(M)enu", [tileSize * (menuButtonCol + 1) + 5, tileSize - 10]);
        map[0][menuButtonCol].setFill("#FF7EA7");
        map[0][menuButtonCol].off("mousedown");
        map[0][menuButtonCol].on("mousedown", function() {
            showMenu();
        });
        writeMessage("(R)eset", [tileSize * (resetButtonCol + 1) + 5, tileSize - 10]);
        map[0][resetButtonCol].setFill("#FFA0ED");
        map[0][resetButtonCol].off("mousedown");
        map[0][resetButtonCol].on("mousedown", function() {
            fadeInMap(mapNum, false);
        });
    }
    
    function victory() {
        ready = false;
        mapNum++;
        saveGame();
        if (maxLevel < mapNum) {
            maxLevel = mapNum;
        }
        if (mapNum >= mapList.length) {
            dialogueLayer.displayMessage("A WINNER IS YOU", function () {
                showMenu();
            });
        } else {
            fadeInMap(mapNum);
        }
    }

    var numMoves = 0;

    function fadeInMap(m, showMessage) {
        numMoves = 0;
        ready = false;
        menuLayer.active = false;
        mapNum = m;
        if (showMessage == undefined) {
            showMessage = true;
        }
        fadeIn(function () {
            menuLayer.moveToBottom();
            loadMap(m);
            writeMessage("Moves: " + numMoves, movesPosition);
            if (showMessage && mapList[m].message) {
                dialogueLayer.displayMessage(mapList[m].message);
            } else {
                fadeOut(function() {
                    keys = [];
                    ready = true;
                });
            }
        });
    }
    
    // Fade layer functions
    function fadeIn(cb, alpha) {
        if (!cb)
            cb = function() {};
        if (!alpha)
            alpha = 1
        fadeLayer.moveToTop();
        fadeLayer.transitionTo({
            duration : 0.5,
            alpha : alpha,
            callback : cb,
        });
    }

    function fadeOut(cb) {
        if (!cb)
            cb = function() {};
        fadeLayer.transitionTo({
            duration : 0.5,
            alpha : 0,
            callback : function() {
                fadeLayer.moveToBottom();
                cb();
            },
        });
    }

    // Menu
    var levelXOffset = 3;
    var levelYOffset = 10;
    menu = [];
    levelNumbers = []
    function initMenu() {
        var r = new Kinetic.Rect({
            width: stage.getWidth(),
            height: stage.getHeight(),
            strokeWidth: 0,
            fill: "white"
        });
        menuLayer.add(r);

        menuLayer.levelRows = 4;
        menuLayer.levelCols = 6;
        var levelColors = ["#86A8ED", "#FFEA59", "#FFA0ED", "#FF7EA7"];
        for (var i = 0; i < mapMaxY; i++) {
            var tArr = []
            for (var j = 0; j < mapMaxX; j++) {
                var t = makeTile(j, i, menuLayer);
                if (i > 0 && i < mapMaxY - 1 && j > 0 && j < mapMaxX - 1) {
                    t.setType(" ");
                    bindShine(t);
                } else {
                    t.setType(".");
                }
                tArr.push(t);
            }
            menu.push(tArr);
        }
        for (var i = 0; i < menuLayer.levelRows; i++) {
            for (var j = 0; j < menuLayer.levelCols; j++) {
                var tileLevel = i * menuLayer.levelCols + j;
                if (tileLevel >= mapList.length) break;
                var x = j * 3 + levelXOffset;
                var y = i * 3 + levelYOffset;
                var r = menu[y][x];
                var t = new Kinetic.Text({
                    fontFamily : GAME_FONT,
                    fontSize : 8,
                    centerOffset: [-tileSize / 2, -tileSize / 2 + 3],
                    x: tileSize * x,
                    y: tileSize * y,
                    textFill: "black",
                    align: 'center',
                    text: tileLevel + 1,
                });
                levelNumbers[tileLevel] = t;
                menuLayer.add(t);
                r.setFill(levelColors[mapList[tileLevel].level]);
                r.off("mouseover mouseout");
                bindLevel(r, tileLevel);
                menu[y+1][x].levelTile = true;
                menu[y-1][x].levelTile = true;
                menu[y][x+1].levelTile = true;
                menu[y][x-1].levelTile = true;
            }
        }
        var creditsButton = menu[mapMaxY - 1][15];
        creditsButton.setFill("#FFA0ED");
        var creditsText = new Kinetic.Text({
            fontFamily : GAME_FONT,
            text : "Credits",
            fontSize : 8,
            x: tileSize * 16 + 10,
            y: tileSize * mapMaxY - 18,
            textFill: "black",
        });
        menuLayer.add(creditsText);
        var f = function() {
            fadeIn(function() {
                creditsLayer.moveToTop();
                creditsLayer.moveDown();
                creditsText.setText("Back");
                fadeOut(function() {
                    creditsButton.on("mousedown", function() {
                        fadeIn(function() {
                            creditsLayer.moveToBottom();
                            creditsText.setText("Credits");
                            fadeOut(function() {
                                creditsButton.on("mousedown", f);
                            });
                        });   
                    });
                });
            })
        };
        creditsButton.on("mousedown", f);
        var title = new Kinetic.Text({
                fontFamily : GAME_FONT,
                text : "slide",
                fontSize : 40,
                textFill : "black",
                x : 200,
                y : 160,
        });
        menuLayer.add(title);
    }

    function bindLevel(r, level) {
        r.levelTile = true;
        r.on("mousedown", function() {
            if (maxLevel >= level) {
                fadeInMap(level);
            }
        });
    }

    function bindShine(r) {
        r.on("mouseover", function() {
            r.setFill(colors["."]);
            needsDrawing[r.getParent().getId()] = r.getParent();
        });
        r.on("mouseout", function() {
            r.fadeTo(colors[" "]);
        });
    }

    function showMenu() {
        menuLayer.active = true;
        ready = false;
        fadeIn(function() {
            menuLayer.moveToTop();
            menuLayer.moveDown();
            for (var i = 0; i < menuLayer.levelRows; i++) {
                for (var j = 0; j < menuLayer.levelCols; j++) {
                    var tileLevel = i * menuLayer.levelCols + j;
                    if (tileLevel >= mapList.length) break;
                    var a = 0.3;
                    if (maxLevel >= tileLevel) {
                        a = 1;
                    }
                    menu[i * 3 + levelYOffset][j * 3 + levelXOffset].setAlpha(a);
                    levelNumbers[tileLevel].setAlpha(a);
                }
            }
            menuLayer.draw();
            fadeOut();
        });
        var f = function() {
            var x = Math.floor(Math.random() * (mapMaxX - 2) + 1);
            var y = Math.floor(Math.random() * (mapMaxY - 2) + 1);
            var r = menu[y][x];
            if (!menuLayer.active) {
                return;
            } else if (r.levelTile) {
                setTimeout(f, 500);
            } else {
                r.fadeTo(colors["."], function() {
                    r.fadeTo(colors[" "], function() {
                        if (menuLayer.active)
                            setTimeout(f, 500);
                    });
                });
            }
        }
        if (maxLevel >= mapList.length) {
            var cupCols = [2, 15];
            var cup = [
                "*.*.*",
                ".....",
                " ... ",
                "  .  ",
                " ... ",
            ];
            for (var c = 0; c < cupCols.length; c++) {
                for (var i = 0; i < cup.length; i++) {
                    for (j = 0; j < cup[0].length; j++) {
                        var t = menu[i + 3][j + cupCols[c]];
                        var col = "";
                        if (cup[i][j] == ".") {
                            col = "#FFEA59";
                        } else if (cup[i][j] == "*") {
                            col = "red";
                        }
                        if (col) {
                            t.setFill(col);
                            t.levelTile = true;
                            t.off("mouseover mouseout");
                        }
                    }
                }
            }
        }
            
        for (var i = 0; i < maxLevel + 5; i++) {
            setTimeout(f, (i % 5 + 1) * 100);
        }
    }
    
    // Dialogue
    function initLayers() {
        // Fade Layer
        var r = new Kinetic.Rect({
                width : stage.getWidth(),
                height : stage.getHeight(),
                strokeWidth : 0,
                fill : "#F4F7F7",
            });
        fadeLayer.add(r);
        fadeLayer.setAlpha(1);

        initDialogueLayer();
        initMapLayer();
        initMenu();
        initCredits();
    }

    function initCredits() {
        var r = new Kinetic.Rect({
            width: (mapMaxX - 2)* tileSize,
            height: (mapMaxY - 2)* tileSize,
            x: tileSize,
            y: tileSize,
            fill: colors[" "],
        });
        creditsLayer.add(r);
        var credits = [
            "Please rate the game and",
            "share it with friends",
            "",
            "Designed and Brogrammed by",
            "nik3daz",
            "",
            "Level Testers",
            "orgynow",
            "steven",
            "skilani",
            "jistar",
            "",
            "",
            "Thanks to all the dudes",
            "who encouraged me to",
            "make my first game",
            "",
            "",
            "No graphics, no music because",
            "this brogrammer cannot art",
            "",
            "Disclaimer:",
            "All typos and grammar mistakes",
            "are (poor) attempts at satire",
        ];

        for (var i = 0; i < credits.length; i++) {
            var t = new Kinetic.Text({
                    fontFamily : GAME_FONT,
                    text : credits[i],
                    fontSize : 12,
                    align : 'center',
                    textFill: "black",
                    x : stage.getWidth()/2,
                    y : 80 + i * 20,
            });
            creditsLayer.add(t);
        }
    }

    function initDialogueLayer() {
        var g = new Kinetic.Group({
                draggable : true
            });
        r = new Kinetic.Rect({
                width : 600,
                height : 200,
                strokeWidth : 10,
                fill : "#FFFFFF",
                stroke : "#AACDC5",
                lineJoin : "bevel",
                shadow : {
                    color : 'black',
                    blur : 10,
                    offset : [8, 8],
                },
            });
        g.add(r);
        r = new Kinetic.Rect({
                width : 590,
                height : 190,
                strokeWidth : 5,
                fill : "#FFFFFF",
                stroke : "#C4EDE4",
                x : 5,
                y : 5,
            });
        g.add(r);
        var okayButton = new Kinetic.Rect({
                width : 100,
                height : 30,
                centerOffset : [50, 10],
                strokeWidth : 5,
                fill : "#F4F7F7",
                stroke : "#F1D1FE",
                x : 300,
                y : 150,
            });
        g.add(okayButton);
        
        var t = new Kinetic.Text({
                fontFamily : GAME_FONT,
                text : "OK!",
                fontSize : 8,
                textFill : "black",
                x : 350,
                y : 162,
                align : 'center',
                centerOffset : [50, 10],
            });
        g.add(t);
        t = [];
        t = new Kinetic.Text({
                fontFamily : GAME_FONT,
                text : "",
                fontSize : 14,
                textFill : "black",
                align : 'center',
                x : 300,
                y : 70,
            });
        g.add(t);
        dialogueLayer.add(g);
        dialogueLayer.displayMessage = function (message, cb) {
            g.setPosition({
                x : stage.getWidth() / 2 - 290,
                y : stage.getHeight() / 2 - 70
            });
            okayButton.cb = cb;
            ready = false;
            fadeIn(function () {
                t.setText(message);
                dialogueLayer.moveToTop();
                dialogueLayer.transitionTo({
                    duration : 0.5,
                    alpha : 1,
                });
                g.transitionTo({
                    duration : 0.5,
                    x : stage.getWidth() / 2 - 300,
                    y : stage.getHeight() / 2 - 80,
                    callback: function() {
                        dialogueLayer.active = true;
                    },
                })
            }, 0.6);
        }
        dialogueLayer.fadeOutDialogue = function () {
            dialogueLayer.active = false;
            dialogueLayer.transitionTo({
                duration : 0.5,
                alpha : 0,
                callback : function () {
                    dialogueLayer.moveToBottom();
                    fadeOut();
                    ready = true;
                    if (okayButton.cb) {
                        okayButton.cb();
                    }
                }
            });
        };

        okayButton.on("mousedown", dialogueLayer.fadeOutDialogue);
        dialogueLayer.setAlpha(0);
    }
    
    // Mouse
    function clearMoveSquares() {
        movePlayer = null;
        for (var i = 0; i < moveSquares.length; i++) {
            if (moveSquares[i].type == " ") {
                moveSquares[i].setFill(colors[moveSquares[i].type]);
            }
            moveSquares[i].moveSquare = false;
        }
        tileLayer.draw();
    }
    
    // UI Constants
    var mpPosition = [15, tileSize - 10];
    var namePosition = [10, tileSize * mapMaxY - 10];
    var movesPosition = [tileSize * mapMaxX - 120, tileSize * mapMaxY - 10];
    var menuButtonCol = 18;
    var resetButtonCol = 14;

    // Globals
    var moveSquares = [];
    var movePlayer = null;
    stage = new Kinetic.Stage({
            container : "container",
            width : tileSize * mapMaxX,
            height : tileSize * mapMaxY,
        });
    var tileLayer = new Kinetic.Layer({id: "tileLayer"});
    var debugLayer = new Kinetic.Layer();
    var hudLayer = new Kinetic.Layer();
    var menuLayer = new Kinetic.Layer({id: "menuLayer"});
    var dialogueLayer = new Kinetic.Layer();
    var playerLayer = new Kinetic.Layer();
    var fadeLayer = new Kinetic.Layer();
    var creditsLayer = new Kinetic.Layer();

    needsDrawing = [];

    var messages = [];
    
    map = [];
    goals = [];
    players = makePlayers();
    mapNum = 0;
    mp = 0;
    maxLevel = 0;

    var saveGameKey = "nik3daz:slide:maxLevel";
    
    // Main
    loadGame();
    
    initLayers();
    
    

    stage.add(fadeLayer);
    stage.add(creditsLayer);
    stage.add(dialogueLayer);
    stage.add(tileLayer);
    stage.add(playerLayer);
    stage.add(hudLayer);
    stage.add(menuLayer);
    stage.add(debugLayer);
    
    showMenu();

    // Attach event listeners
    window.addEventListener('keydown', doKeyDown, false);
    window.addEventListener('keyup',doKeyUp, false);
    window.addEventListener('mouseup',doMouseUp, false);

    stage.onFrame(function(frame) {
        var size = 0;
        for (var l in needsDrawing) {
            needsDrawing[l].draw();
            size++;
        }
        if (size > 0)
            needsDrawing = [];
    });
    
    stage.start();

    // Save games
    function saveGame() {
        if (parent.kongregate) {
            parent.kongregate.stats.submit("Level_" + (mapNum), numMoves);
        }
        if (parent.kongregate && maxLevel >= 3) {
            parent.kongregate.stats.submit("maxLevel", maxLevel);
            if (mapNum == mapList.length) {
                parent.kongregate.stats.submit("gameCompleted", 1);
            }
        }
        if (typeof(window.localStorage) != 'undefined') {
            try {
                window.localStorage.setItem(saveGameKey, maxLevel);
            } catch(e) {
                mapList[1].message = "Can't save, check instructions";
            }
        }
    }

    function loadGame() {
        if (typeof(window.localStorage) != 'undefined') {
            maxLevel = parseInt(window.localStorage.getItem(saveGameKey));
            if (isNaN(maxLevel)) {
                maxLevel = 0;
            }
        }
    }

    // Debug
    function writeDebug(message) {
        var context = debugLayer.getContext();
        debugLayer.clear();
        debugLayer.moveToTop();
        context.font = "8pt " + GAME_FONT;
        context.fillStyle = "black";
        context.fillText(message, tileSize * mapMaxX, 25);
    }

    // UI Text
    function writeMessage(message, pos) {
        var context = hudLayer.getContext();
        messages[pos[0] + "," + pos[1]] = message;
        hudLayer.clear(); 
        context.font = "8pt " + GAME_FONT;
        context.fillStyle = "black";
        for (var m in messages) {
            var p = m.split(/,/);
            context.fillText(messages[m], p[0], p[1]);
        }
    }

    function writeMP(mp) {
        if (mp !== "") {
            writeMessage("MP: " + mp, mpPosition);
        }
    }
};