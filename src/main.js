// lets try strict
'use strict';

// Phaser Game Settings
let config = {
    parent: 'Endless Runner',
    type: Phaser.AUTO,
    height: 480,
    width: 960,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { // no x gravity
                x: 0
            }
        }
    },
    scene: [ Load, Title, Play, GameOver, Credits ]
}

// purge local storage on startup
localStorage.clear();
// define game
let game = new Phaser.Game(config);

let centerX = game.config.width/2;
let centerY = game.config.height/2;
let gameW = game.config.width;
let gameH = game.config.height;
let txtSpacing = 64;
let player; // this makes referencing player object a bit cleaner
let time;   // time in game aka the score
let highScore;
let newHighScore = false;
let spacebar;  // spacebar global key var
let cursors;   // global var for cursor keys()
