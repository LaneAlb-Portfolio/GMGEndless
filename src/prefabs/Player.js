class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, velocity) {
        // call Phaser Physics Sprite constructor
        super(scene, x, y, texture, velocity); 
        // set up physics sprite
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add physics body
        this.setImmovable();    
        this.setCollideWorldBounds(true);
        this.setDepth(1); // set z height to 
        this.setBlendMode('SCREEN');
        this.setMaxVelocity(0,200);
        this.setDragY(0);
        this.setBounce(0);
        this.velocity = paddleVelocity;                   // base velocity value
        this.flipped = false;                  // check if sprite axis is flipped
        this.destroyed = false;                // destruction bool
        this.setVelocityY(this.velocity);      // can set velocity for X if we want side movement
        // debug flags
    }
    /* old setup for Paddle within play.js
    // set up player paddle (physics sprite) and set properties
        paddle = new Player(this, 32, centerY, 'paddle', 0);
        paddle.setCollideWorldBounds(true);
        paddle.setBounce(0);
        paddle.setImmovable();
        paddle.setMaxVelocity(0, 400);
        paddle.setDragY(0);
        paddle.setDepth(1);         // ensures that paddle z-depth remains above shadow paddles
        paddle.destroyed = false;   // custom property to track paddle life
        paddle.setBlendMode('SCREEN');
    */
    update() {
    }

    // flip sprite vertical axis
    flip(){
        this.flipY(!this.flipped);
    }
}