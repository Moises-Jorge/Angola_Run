class StartScene extends Phaser.Scene {
    constructor() {
        super('StartScene')
    }

    /**
     * Método responsável por carregar outros recursos do jogo (a TELA INICIAR)
     */
    preload() {
        this.load.image('startScreen', 'img/startScreen.jpg')
        this.load.image('startButton', 'img/startButton.jpg')
    }

    /**
     * Método responsável por criar e configurar a tela de início
     */
    create() {
        this.add.image(0, 0, 'startScreen').setOrigin(0)
        let startButton = this.add.image(320, 320, 'startButton').setOrigin(0)
        startButton.setInteractive()
        startButton.on('pointerdown', () => this.scene.start('Scene01'))
    }
}