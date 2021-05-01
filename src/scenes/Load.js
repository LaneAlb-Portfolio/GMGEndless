class Load extends Phaser.Scene {
    constructor() {
        super('loadScene');
    }

    preload() {
        // to-do: loading bar

        this.load.path = './assets/';
        // load graphics assets
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
    }

    create() {
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
        this.ltext = this.add.text(centerX,centerY,'G M G', loadingNumConfig).setOrigin(0.5);
        this.progBar = this.add.graphics();
        this.progBox = this.add.graphics();
        this.progBox.fillStyle(0xFFFFFF, 0.8);
        this.progBox.fillRect(centerX - 125, centerY + 50, 250, 32);
    }

    update(){
        if(this.loadingNum > 0 && this.loadingNum < 100){
            this.updateLoadNum();
        } else{
            // go to Title scene
            this.progBox.destroy();
            this.progBar.destroy();
            this.scene.start('titleScene');
        }
    }

    updateLoadNum(){
        ++this.loadingNum;
        value = this.loadingNum;
        this.progBar.fillStyle(0x000000, 1.0);
        this.progBar.fillStyle(centerX - 125, centerY + 50, 240 * value, 22);
        console.log(value);
    }
}