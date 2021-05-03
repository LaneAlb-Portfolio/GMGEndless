class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        this.load.path = './assets/';
        // load graphics assets
        this.load.image('black','img/black.png')
        this.load.image('GMG','img/gmg_logo.png')
        this.load.image('paddle', 'img/paddle.png');
        this.load.image('circle', 'img/circle.png');
        this.load.image('fragment', 'img/fragment.png');
        this.load.image('cross', 'img/white_cross.png');
        // load audio assets
        this.load.audio('beats', ['audio/beats.mp3']);
        this.load.audio('clang', ['audio/clang.mp3']);
        this.load.audio('death', ['audio/death.mp3']);
        // load font
        
        // loading bar
        let width = this.cameras.main.width;
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