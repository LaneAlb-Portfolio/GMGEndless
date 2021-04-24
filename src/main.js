// Nathan Altice
// Paddle Parkour P3
// An endless dodging game (ported from Phaser CE)
// Barrier prefab adapted from Travis Faas, An Introduction to HTML5 Game Development with Phaser.js (2017)
// Original: 4/20/17
// Updated: 7/6/20

// keep me honest
'use strict';

// define and configure main Phaser game object
let config = {
    parent: 'myGame',
    type: Phaser.AUTO,
    height: 640,
    width: 960,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    scene: [ Load, Title, Play, GameOver ]
}

// comment the following line if you need to NOT purge local storage data
localStorage.clear();

// define game
let game = new Phaser.Game(config);

// define globals
let centerX = game.config.width/2;
let centerY = game.config.height/2;
let w = game.config.width;
let h = game.config.height;
const textSpacer = 64;
//. these are useless after we create a sprite
let paddle = null;
const paddleWidth = 16;
const paddleHeight = 128;
const paddleVelocity = 150;
//
let level;
let highScore;
let newHighScore = false;
<<<<<<< HEAD
let spacebar;
let cursors;
=======
let cursors;
>>>>>>> dda84debff39faf750748cab56e75abe079a552d
