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
            fontSize: '28px',
            backgroundColor: '#F3B141',
            color: '#843605',
            align: 'right',
            padding: {
                top: 5,
                bottom: 5,
            },
            fixedWidth: 0
        }
        
        this.add.text(centerX,centerY,`Loading: ${this.loadingNum}`, loadingNumConfig)

        // check for local storage browser support
        if(window.localStorage) {
            console.log('Local storage supported');
        } else {
            console.log('Local storage not supported');
        }

        
    }

    update(){
        if(this.loadingNum > 0 && this.loadingNum < 100){
            this.updateLoadNum();

        } else{
            setTimeout(()=>{
            // go to Title scene
            this.scene.start('titleScene');
            },500);
        }
    }

    updateLoadNum(){
        setTimeout(()=>{
            this.loadingNum += 1;
            },250);


    }
}