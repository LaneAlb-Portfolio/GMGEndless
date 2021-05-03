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
        this.load.bitmapFont('gem', 'font/gem.png', 'font/gem.xml');

        // loading bar
        
        this.limg = this.add.image(centerX,centerY,'GMG').setOrigin(0.5);
        
            let width = this.cameras.main.width;
            let height = this.cameras.main.height;

            this.loadingNum = 0;
            let loadingNumConfig = {
            fontFamily: 'Courier',
            fontSize: '48px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'left',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        //this.ltext = this.add.text(centerX,centerY,'G M G', loadingNumConfig).setOrigin(0.5);

            let loadingText = this.make.text({
                x: width / 2,
                y: height / 2 + 185,
                text: 'Loading...',
                style: {
                    font: '20px monospace',
                    fill: '#ffffff'
                }
            });
            loadingText.setOrigin(0.5, 0.5);
            
            let percentText = this.make.text({
                x: width / 2,
                y: height / 2 + 215,
                text: '0%',
                style: {
                    font: '18px monospace',
                    fill: '#ffffff'
                }
            });
            percentText.setOrigin(0.5, 0.5);
                         
            this.load.on('progress', function (value) {
                percentText.setText(parseInt(value * 100) + '%'); 
            });
            
 
            this.load.on('complete', function () {
                loadingText.destroy();
                percentText.destroy();
            });
            
            
            for (let i = 0; i < 3000; i++) {
                this.load.image('black', 'img/black.png')
            }
            



        
    }


    update(){
        if(true){
        this.scene.start('titleScene');
        }
    }
    
}