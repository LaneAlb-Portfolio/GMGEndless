class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        this.load.path = './assets/';
        // load player from atlas
        this.load.atlas('player', 'img/spaceman.png', 'img/spaceman.json');
        // load graphical assets
        this.load.image('stars', 'img/spacebg.png');
        this.load.image('ship', 'img/spacefg.png');
        this.load.image('black','img/black.png');
        this.load.image('bolt', 'img/bolt.png');
        this.load.image('fire', 'img/Fire.png');
        // load meteor types
        this.load.image('meteor1', 'img/meteorsmall.png');
        this.load.image('meteor2', 'img/meteorsquare.png');
        this.load.image('meteor3', 'img/meteorbroken.png');
        // load wall types
        this.load.image('wall1', 'img/wall1.png');
        this.load.image('wall2', 'img/wall2.png');
        this.load.image('wall3', 'img/wall3.png');
        // load audio assets
        this.load.audio('bgm', 'audio/RunnerSong1mp3.mp3');
        this.load.audio('fDeath', 'audio/Fireball Death.mp3');
        this.load.audio('eDeath', 'audio/Electric Death.mp3');
        this.load.audio('invert', 'audio/Invert.mp3');
        // loading bar
        let width  = this.cameras.main.width;
        let height = this.cameras.main.height;

        this.loadingNum = 0;
        this.logoConfig = {fontFamily: 'Dagger', fontSize: '72px', backgroundColor: '#FFFFFF', color: '#000000'};
        let GMG = this.add.text(centerX, centerY - txtSpacing, ' GMG ', this.logoConfig).setOrigin(0.5);
        let loadingText = this.add.text(
            width / 2,
            height / 2 + 185,
            'Loading...',
            {fontFamily: 'Dagger',
            fontSize: '36px',
            color: '#FFFFFF'}
        );
        loadingText.setOrigin(0.5, 0.5);
        
        let percentText = this.add.text(
            width / 2,
            height / 2 + 215,
            '0%',
            {fontFamily: 'Dagger',
            fontSize: '24px',
            color: '#FFFFFF'      
        });
        percentText.setOrigin(0.5, 0.5);
                         
        this.load.on('progress', function (value) {
            percentText.setText(parseInt(value * 100) + '%'); 
        });
            
        this.load.on('complete', function () {
            loadingText.destroy();
            percentText.destroy();
        });

        for (let i = 0; i < 4000; i++) {
            this.load.image('black', 'img/black.png')
        }
    }

    update(){
        if(true){
        this.scene.start('titleScene');
        }
    }
}