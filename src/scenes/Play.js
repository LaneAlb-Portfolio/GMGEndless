class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
        // reset parameters
        this.barrierSpeed = -350;
        this.meteorSpeed = -450;
        this.barrierSpeedMax = -1000;
        this.meteorSpeedMax = -2000;
        time = 0;

        // set up audio, play bgm
        this.bgm = this.sound.add('beats', { 
            mute: false,
            volume: 1,
            rate: 1,
            loop: true 
        });
        this.bgm.play();

        // add snapshot of title screen 
        let titleSnap = this.add.image(centerX, centerY, 'titlesnapshot').setOrigin(0.5);
        this.tweens.add({
            targets: titleSnap,
            duration: 4500,
            alpha: { from: 1, to: 0 },
            scale: { from: 1, to: 0 },
            repeat: 0
        });

        // particle emitter
        // create line where player can die
        let line = new Phaser.Geom.Line(0, 0, 0, gameH);  
        // create particle manager
        this.particleManager = this.add.particles('cross');
        // add emitter and setup properties
        this.lineEmitter = this.particleManager.createEmitter({
            gravityX: 100,
            lifespan: 2000,
            alpha: { start: 0.5, end: 0.1 },
            tint: [ 0xba7e25, 0xf5b916, 0xed7955, 0xe8b038, 0xf04a18 ], //orange and red tints
            emitZone: { type: 'random', source: line, quantity: 75 },
            blendMode: 'ADD'
        });

        let fire = new Phaser.Geom.Triangle(0, gameH/2, 0, gameH, 25, gameH);  
        // create particle manager
        this.particleManager = this.add.particles('cross');
        // add emitter and setup properties
        this.lineEmitter = this.particleManager.createEmitter({
            gravityX: 150,
            lifespan: 1500,
            alpha: { start: 0.4, end: 0.01 },
            tint: [ 0xeb4034, 0xa8140a, 0xe39691, 0xe8b038, 0x96433e ], //red tints
            emitZone: { type: 'edge', source: fire, quantity: 25 },
            blendMode: 'ADD'
        });

        // set up player paddle (physics sprite) and set properties
        player = new Player(this, 64, centerY, 'PlayerSprite', 0);

        // set up barrier group
        this.barrierGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });

        // set up Meteor Group
        this.meteorGroup = this.add.group({
            runChildUpdate: true    // make sure update runs on group children
        });

        // wait awhile for wall spawns
        this.time.delayedCall(10000, () => { 
            this.addBarrier();
        });
        // wait slightly before meteors spawn
        this.time.delayedCall(2500, () => { 
            this.addMeteor();
        });

        // set up difficulty timer (triggers callback every second)
        this.difficultyTimer = this.time.addEvent({
            delay: 1000,
            callback: this.levelBump,
            callbackScope: this,
            loop: true
        });

        // set up spacebar
        spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        // set up cursor keys
        cursors = this.input.keyboard.createCursorKeys();
    }

    // create new barriers and add them to existing barrier group
    addBarrier() {
        let randSpeed =  Phaser.Math.Between(0, 50);
        let barrier = new Barrier(this, this.barrierSpeed - randSpeed);
        this.barrierGroup.add(barrier);
    }

    // create new death balls and add them to existing group
    addMeteor() {
        let randSpeed =  Phaser.Math.Between(0, 250);
        // subtract barrier speed from randSpeed since negative velocity
        let m = new Meteor(this, this.meteorSpeed - randSpeed);
        this.meteorGroup.add(m);
    }

    update() {
        // make sure player is still alive
        if(!player.destroyed) {
            player.update();
            if(Phaser.Input.Keyboard.JustDown(spacebar)){
                // figure out gravity settings
                player.setGravityY(player.velocity * 100);
            }
            // if collide with wall force player backwards
            // kill player on collide with object
            this.physics.world.collide(player, this.meteorGroup, this.playerCollision, null, this);
            this.physics.world.collide(player, this.barrierGroup, this.wallCollide, null, this);
        }
    }

    levelBump() {
        // increment level (ie, score)
        time++;
        // ramp objects every 10 seconds
        // Nathan Altice's PaddleParkou3 has a similar idea
        // we like this
        if(time % 5 == 0) {
            this.sound.play('clang', { volume: 0.55 });         // play clang to signal speed up
            if(this.meteorSpeed >= this.meteorSpeedMax) {     // increase meteor speed
                this.meteorSpeedMax += 100;
                this.meteorSpeed += 25;
            }
            
            // current time flash on screen
            let lvltxt01 = this.add.text(centerX, txtSpacing, `${time}`, titleConfig).setOrigin(0, 0.5);
            lvltxt01.setBlendMode('ADD').setTint(0xff00ff);
            this.tweens.add({
                targets: [lvltxt01],
                duration: 2000,
                y: { from: txtSpacing, to: 0},
                alpha: { from: 0.9, to: 0 },
                onComplete: function() {
                    lvltxt01.destroy();
                }
            });
        }

        // spawn more objects as time goes on
        if(time == 15) {
            player.velocity += player.velocity;
            this.addMeteor();
        }
        // after 30 seconds invert controls
        if(time == 30) {
            player.velocity += 2*player.velocity;
            this.right    = cursors.right;
            cursors.right = cursors.left;
            cursors.left  = this.right;
            this.addMeteor();
            this.addBarrier();
        }
        // after 45 seconds only let the player move backwards
        if(time == 45) {
            player.velocity += 2*player.velocity;
            cursors.right = cursors.left;
            cursors.left = cursors.right;
            this.addMeteor();
            this.addBarrier();
        }
    }

    playerCollision() {
        player.destroyed = true;                    // turn off collision checking
        this.difficultyTimer.destroy();             // shut down timer
        this.sound.play('death', { volume: 0.25 }); // play death sound
        this.cameras.main.shake(2500, 0.0075);      // camera death shake
        
        // cut audio
        this.bgm.volume = 0;

        // create particle explosion
        let deathParticleManager = this.add.particles('cross');
        let deathEmitter = deathParticleManager.createEmitter({
            alpha: { start: 1, end: 0 },
            scale: { start: 0.75, end: 0 },
            speed: { min: -100, max: 100 },
            lifespan: 2500,
            blendMode: 'ADD'
        });
        // store current paddle bounds so we can create a paddle-shaped death emitter
        let pBounds = player.getBounds();
        deathEmitter.setEmitZone({
            source: new Phaser.Geom.Ellipse(pBounds.x, pBounds.y, pBounds.width, pBounds.height),
            type: 'edge',
            quantity: 100
        });
        // make it boom
        deathEmitter.explode(1000);
        player.destroy();
        // switch states after timer expires
        this.time.delayedCall(2000, () => { this.scene.start('credits'); });
    }

    wallCollide(){
        //console.log("Vel: " + paddle.velocityX);
        player.x -= 4;
        // tentative collide with left hand screen
        // see if there are exceptions to worldBound Collide 
        // OR just live with player dying upon immediate left hand collision
        if(player.x <= player.width){
            this.playerCollision();
        }
    }
}