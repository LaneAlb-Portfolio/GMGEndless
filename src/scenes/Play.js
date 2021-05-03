class Play extends Phaser.Scene {
    constructor() {
        super('playScene');
    }

    create() {
        // load background and forground
        this.stars = this.add.tileSprite(0,0, gameW, gameH, 'stars').setOrigin(0,0);
        this.ship  = this.add.tileSprite(0,0, gameW, gameH, 'ship').setOrigin(0,0);
        // reset parameters
        this.barrierSpeed = -350;
        this.meteorSpeed = -450;
        this.barrierSpeedMax = -1000;
        this.meteorSpeedMax = -2000;
        time = 0;
        this.floorDeath = false;
        this.ceilDeath = false;
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
        // line here
        let fire = new Phaser.Geom.Line(0, 0, 0, gameH);  
        // create particle manager
        this.particleManager = this.add.particles('cross');
        // add emitter and setup properties
        this.lineEmitter = this.particleManager.createEmitter({
            gravityX: 25,
            lifespan: 500,
            alpha: { start: 0.4, end: 0.01 },
            tint: [ 0xeb4034, 0xa8140a, 0xe39691, 0xe8b038, 0x96433e ], //red tints
            emitZone: { type: 'edge', source: fire, quantity: 100 },
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
            callback: this.timeCheck,
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
            //console.log(player.y);
            player.update();
            this.ship.tilePositionX += 2;
            if(Phaser.Input.Keyboard.JustDown(spacebar)){
                // figure out gravity settings
                player.setGravityY(player.velocity * 500);
            }
            // if collide with wall force player backwards
            // kill player on collide with object
            this.physics.world.collide(player, this.meteorGroup, this.playerCollision, null, this);
            this.physics.world.collide(player, this.barrierGroup, this.wallCollide, null, this);
            // if electricity is on kill player on contact
            if(this.floorDeath && player.y >= gameH - player.height){
                this.playerCollision();
            }
            if(this.ceilDeath && player.y <= player.height){
                this.playerCollision();
            }
        }
    }

    timeCheck() {
        time++;
        // ramp objects every 5 seconds
        // Nathan Altice's PaddleParkour3 has a similar idea
        // we like this
        if(time % 5 == 0) {
            //this.sound.play('clang', { volume: 0.55 });
            if(this.meteorSpeed >= this.meteorSpeedMax) {      // increase meteor speed
                this.meteorSpeedMax += 100;
                this.meteorSpeed += 25;
            }
            
            // flash time intervals on screen for a short duration before fading
            let timeTxt = this.add.text(centerX, txtSpacing, `${time}`, titleConfig).setOrigin(0, 0.5);
            timeTxt.setBlendMode('ADD').setTint(0xff00ff);
            this.tweens.add({
                targets: [timeTxt],
                duration: 2000,
                y: { from: txtSpacing, to: 0},
                alpha: { from: 0.9, to: 0 },
                onComplete: function() {
                    timeTxt.destroy();
                }
            });
        }

        // spawn more objects as time goes on
        if(time == 15) {
            this.place = "ceil";
            player.velocity += player.velocity;
            this.addMeteor();
            this.electricFloor(this.place);
        }
        // after 30 seconds invert sideways movement
        // make both floors untouchable
        if(time == 30) {
            this.place = "floor";
            player.velocity += 2*player.velocity;
            this.right    = cursors.right;
            cursors.right = cursors.left;
            cursors.left  = this.right;
            this.addMeteor();
            this.addBarrier();
            this.electricFloor(this.place);
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
            speed: { min: -25, max: 25 },
            lifespan: 1000,
            blendMode: 'ADD'
        });
        // store current paddle bounds so we can create a paddle-shaped death emitter
        let pBounds = player.getBounds();
        deathEmitter.setEmitZone({
            source: new Phaser.Geom.Ellipse(pBounds.x, pBounds.y, pBounds.width, pBounds.height),
            type: 'random',
            quantity: 50
        });
        // make it boom
        deathEmitter.explode(500);
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

    electricFloor(placement){
        if(placement == "floor"){
            let floorParticles = this.add.particles('cross');
            let floor = new Phaser.Geom.Line(0, gameH, gameW, gameH);  
            // add emitter and setup properties
            this.floorEmitter = floorParticles.createEmitter({
                setGravityY: -25,
                lifespan: 600,
                alpha: { start: 0.6, end: 0 },
                tint: [ 0xe6cf22, 0xf0df62, 0xbfab13, 0xfff821, 0xd4cd02 ], //yellow tints
                emitZone: { type: 'edge', source: floor, quantity: 50 },
                blendMode: 'ADD'
            });
            this.floorDeath = true;
        }
        if(placement == "ceil"){
            let ceilParticles = this.add.particles('cross');
            let ceil = new Phaser.Geom.Line(0, 0, gameW, 0);  
            // add emitter and setup properties
            this.ceilEmitter = ceilParticles.createEmitter({
                setGravityY: 25,
                lifespan: 600,
                alpha: { start: 0.6, end: 0 },
                tint: [ 0xe6cf22, 0xf0df62, 0xbfab13, 0xfff821, 0xd4cd02 ], //yellow tints
                emitZone: { type: 'edge', source: ceil, quantity: 50 },
                blendMode: 'ADD'
            });
            this.ceilDeath = true;
        }
        console.log(this.floorDeath + " Bools " + this.ceilDeath);
    }
}