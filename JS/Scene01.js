class Scene01 extends Phaser.Scene {
    constructor() {
        super('Scene01')
    }

    preload() {
        this.load.image('background', 'img/sky.png') // Carregando a imagem de background (DEPOIS SUBSTITUIR COM A IMAGEM ORIGINAL DO FUNDO PARA ESSE JOGO)

        this.load.spritesheet('player', 'img/player.png', {frameWidth: 32, frameHeight: 32}) // Carregando a spritesheet(imagem com várias posições) do jogador/personagem. O terceiro atributo refere-se ao tamanho das frames(o tamanho de cada imagem contida no sprite) (DEPOIS SUBSTITUIR COM A IMAGEM ORIGINAL DO PERSONAGEM PARA ESSE JOGO)
    }

    create() {
        // BACKGROUND
        this.background = this.add.image(0, 0, 'background').setOrigin(0,0) // Adicionando a imagem de BG no jogo e ajustando o seu ponto de origem(canto superior esquerdo)
        this.background.displayWidth = 800 // Ajustando a largura da imagem para se adequar à tela
        this.background.displayHeight = 600 // A justando a altura da imagem para se adequar à tela

        // PLAYER
        this.player = this.physics.add.sprite(50, 500, 'player') // Adicionando o jogador no jogo
        .setCollideWorldBounds(true) // Comando que permite que o personagem colida com o solo (pq devido a gravidade, ele pode simplesmente não parar na tela)
        .setScale(2, 2) // Alterando o tamanho do jogador
    }

    update() {}
}