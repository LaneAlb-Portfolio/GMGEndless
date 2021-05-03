class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, texture, velocity) {
        // call Phaser Physics Sprite constructor
        super(scene, x, y, texture, velocity); 
        // set up physics sprite
        scene.add.existing(this);               // add to existing scene, displayList, updateList
        scene.physics.add.existing(this);       // add physics body
        this.setImmovable(false);    
        this.setCollideWorldBounds(true);
        this.setDepth(1); // set z height to 
        this.setBlendMode('SCREEN');
        this.setMaxVelocity(200,300);
        this.setDragY(0);
        this.setBounce(0);
        this.velocity = 200;                   // base velocity value
        this.flipped = false;                  // check if sprite axis is flipped
        this.destroyed = false;                // destruction bool
        this.setVelocityY(this.velocity);      // can set velocity for X if we want side movement
    }
    update() {
        // check for player input
        if(Phaser.Input.Keyboard.JustDown(spacebar)) { // invert velocity ONCE per presssss
            player.velocity = (-1)*player.velocity;
            player.setVelocityY(player.velocity);
            player.flip();
            // drag and gravity
            //console.log("Vel:" + paddle.velocity);
        }
        // use velocity instead?
        if(cursors.left.isDown){
            this.x -= 2;
        }
        if(cursors.right.isDown){
            this.x += 2;
        }
        // debugs
    }

    // flip sprite vertical axis
    flip(){
        // play animation ifneeded yada yada flipper
        this.flipped = !this.flipped;
        this.setFlipY(this.flipped);
    }
}