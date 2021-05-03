class Title extends Phaser.Scene {
    constructor() {
        super('titleScene');
    }

    create() {
        // Title Txt
        let title01 = this.add.text(centerX, centerY - txtSpacing, 'GMG RUNNER', titleConfig).setOrigin(0.5).setTint(0xff0000);
        let title02 = this.add.text(centerX, centerY - txtSpacing, 'GMG RUNNER', titleConfig).setOrigin(0.5).setTint(0xff00ff).setBlendMode('SCREEN');
        let title03 = this.add.text(centerX, centerY - txtSpacing, 'GMG RUNNER', titleConfig).setOrigin(0.5).setTint(0xffff00).setBlendMode('ADD');
        // Body
        
        this.add.text(centerX, centerY, 'Use SPACE to invert your gravity', bodyConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + txtSpacing*0.5,'use LEFT and RIGHT arrows to move', bodyConfig).setOrigin(0.5);
        this.add.text(centerX, centerY + txtSpacing*2, 'Press UP ARROW to Start', bodyConfig).setOrigin(0.5);
        this.add.text(centerX, gameH - txtSpacing, 'GMG 2021', bodyConfig).setOrigin(0.5);

        // title text tween (Based on PaddleRunner)
        this.tweens.add({
            targets: title01,
            duration: 1500,
            angle: { from: -1, to: 1 },
            yoyo: true,
            repeat: -1,
            onYoyo: function() {
                this.cameras.main.shake(100, 0.0025);
            },
            onYoyoScope: this
        });
        this.tweens.add({
            targets: title02,
            duration: 1500,
            angle: { from: 1, to: -1 },
            yoyo: true,
            repeat: -1,
            onRepeat: function() {
                this.cameras.main.shake(100, 0.0025);
            },
            onRepeatScope: this
        });

        // set up cursor keys for title screen input
        cursors = this.input.keyboard.createCursorKeys();
    }

    update() {
        // try removing snapshot of the viewport and see what happens
        // check for UP input
        if (Phaser.Input.Keyboard.JustDown(cursors.up)) {
            // temp variables to maintain scope
            let textureManager = this.textures;
            let scene = this;
            // snapshot logic from Nathan Altices PaddleParkour3
            // https://github.com/nathanaltice/PaddleParkourP3
            this.game.renderer.snapshot(function(image) {
                // make sure an existing texture w/ that key doesn't already exist
                if(textureManager.exists('titlesnapshot')) {
                    textureManager.remove('titlesnapshot');
                }
                // take the snapshot img returned from callback and add to texture manager
                textureManager.addImage('titlesnapshot', image);
            });
            
            // start play scene
            this.scene.start('playScene');
        }
    }
}