class GameOver extends Phaser.Scene {
    constructor() {
        super('gameover');
    }

    create() {
        // Highscore logic from Nathan Altices PaddleParkour3
        // https://github.com/nathanaltice/PaddleParkourP3
        if(localStorage.getItem('hiscore') != null) {
            let storedScore = parseInt(localStorage.getItem('hiscore'));
            // see if current score is higher than stored score
            if(time > storedScore) {
                localStorage.setItem('hiscore', time.toString());
                highScore = time;
                newHighScore = true;
            } else {
                highScore = parseInt(localStorage.getItem('hiscore'));
                newHighScore = false;
            }
        } else {
            //console.log('No high score stored. Creating new.');
            highScore = time;
            localStorage.setItem('hiscore', highScore.toString());
            newHighScore = true;
        }

        // add GAME OVER text
        if(newHighScore) {
            this.add.text(centerX, centerY - txtSpacing, 'New Hi-Score!', titleConfig).setOrigin(0.5);
        }
        this.add.text(centerX, centerY, `Running Time ${time}s`, titleConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + txtSpacing, `Your Best Score: ${highScore}s`, bodyConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + txtSpacing*2, `Press UP ARROW to Restart`, subConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + txtSpacing*2.5, `Press Down ARROW for Menu`, subConfig).setOrigin(0.5);
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
        if (Phaser.Input.Keyboard.JustDown(cursors.down)) {
            this.scene.start('titleScene');
        }
    }
}