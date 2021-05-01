class GameOver extends Phaser.Scene {
    constructor() {
        super('gameOverScene');
    }

    create() {
        // Highscore logic from Nathan Altices PaddleParkour3
        // https://github.com/nathanaltice/PaddleParkourP3
        if(localStorage.getItem('hiscore') != null) {
            let storedScore = parseInt(localStorage.getItem('hiscore'));
            //console.log(`storedScore: ${storedScore}`);
            // see if current score is higher than stored score
            if(level > storedScore) {
                //console.log(`New high score: ${level}`);
                localStorage.setItem('hiscore', level.toString());
                highScore = level;
                newHighScore = true;
            } else {
                //console.log('No new high score :/');
                highScore = parseInt(localStorage.getItem('hiscore'));
                newHighScore = false;
            }
        } else {
            //console.log('No high score stored. Creating new.');
            highScore = level;
            localStorage.setItem('hiscore', highScore.toString());
            newHighScore = true;
        }

        // add GAME OVER text
        if(newHighScore) {
            this.add.bitmapText(centerX, centerY - txtSpacing, 'gem', 'New Hi-Score!', 32).setOrigin(0.5);
        }
        this.add.bitmapText(centerX, centerY, 'gem', `Running Time ${level}s`, 48).setOrigin(0.5);
        this.add.bitmapText(centerX, centerY + txtSpacing, 'gem', `Your Best Score: ${highScore}s`, 24).setOrigin(0.5);
        this.add.bitmapText(centerX, centerY + txtSpacing*2, 'gem', `Press UP ARROW to Restart`, 36).setOrigin(0.5);

        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        // wait for UP input to restart game
        if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
            // temp variables to maintain scope
            let textureManager = this.textures;
            let scene = this;
            // take snapshot of the entire game viewport
            // https://photonstorm.github.io/phaser3-docs/Phaser.Renderer.WebGL.WebGLRenderer.html#snapshot__anchor
            this.game.renderer.snapshot(function(image) {
                // make sure an existing texture w/ that key doesn't already exist
                if(textureManager.exists('titlesnapshot')) {
                    textureManager.remove('titlesnapshot');
                }
                // take the snapshot img returned from callback and add to texture manager
                textureManager.addImage('titlesnapshot', image);
            });

            // start next scene
            this.scene.start('playScene');
        }
    }
}