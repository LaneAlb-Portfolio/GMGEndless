class Credits extends Phaser.Scene {
    constructor() {
        super('credits');
    }

    create() {
        // score text flying across screen
        let gmg = this.add.text(centerX, gameH, `GMG Endless By:`, titleConfig).setOrigin(0.5);
        let peeps = this.add.text(centerX, gameH + txtSpacing*2, `Coding: Lane\nCoding and Sound: Josh\nArt and Sound: Mikayla`, bodyConfig).setOrigin(0.5);
        this.tweens.add({
            targets: [gmg],
            duration: 4000,
            y: { from: gameH, to: 0},
            alpha: { from: 1.0, to: 0 },
            onComplete: function() {
                gmg.destroy();
            }
        });
        this.tweens.add({
            targets: [peeps],
            duration: 4500,
            y: { from: gameH + txtSpacing*2, to: txtSpacing},
            alpha: { from: 1.0, to: 0 },
            onComplete: function() {
                peeps.destroy();
            }
        });
        this.time.delayedCall(5000, () => { this.scene.start('gameover'); });
    }
}