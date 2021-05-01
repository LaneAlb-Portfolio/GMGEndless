// try out strict
'use strict';

// Phaser Game Settings
let config = {
    parent: 'myGame',
    type: Phaser.AUTO,
    height: 480,
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
let gameW = game.config.width;
let gameH = game.config.height;
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
let spacebar;
let cursors;
