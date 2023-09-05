class Scene01 extends Phaser.Scene {
    constructor() {
        super('Scene01')
    }

    preload() {
        this.load.image('background', 'img/background.jpg') // Carregando a imagem de background
    }

    create() {
        this.background = this.add.image(0, 0, 'background').setOrigin(0,0) // Adicionando a imagem de BG no jogo e ajustando o seu ponto de origem(canto superior esquerdo)
        this.background.displayWidth = 800 // Ajustando a largura da imagem para se adequar à tela
        this.background.displayHeight = 600 // A justando a altura da imagem para se adequar à tela
    }

    update() {}
}