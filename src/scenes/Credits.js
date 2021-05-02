class Credits extends Phaser.Scene {
    constructor() {
        super('credits');
    }

    create() {
        // score text flying across screen
        let gmg = this.add.bitmapText(centerX, gameH, 'gem', `GMG Endless By:\nLane\nJosh\nMikayla`, 64, 1).setOrigin(0.5);
        this.tweens.add({
            targets: [gmg],
            duration: 4500,
            y: { from: gameH, to: 0},
            alpha: { from: 1.0, to: 0 },
            onComplete: function() {
                gmg.destroy();
            }
        });
        this.time.delayedCall(5000, () => { this.scene.start('gameover'); });
    }
}