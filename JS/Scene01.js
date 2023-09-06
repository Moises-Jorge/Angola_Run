class Scene01 extends Phaser.Scene {
    constructor() {
        super('Scene01')
    }

     /**
     * Método responsável por carregar os recursos do jogo
     */
    preload() {
        // Carregando a imagem de background (DEPOIS SUBSTITUIR COM A IMAGEM ORIGINAL DO FUNDO PARA ESSE JOGO)
        this.load.image('background', 'img/sky.png') 

        // Carregando a imagem do personagem (spritesheet = contem várias posições)(DEPOIS SUBSTITUIR COM A IMAGEM ORIGINAL DO PERSONAGEM PARA ESSE JOGO)
        this.load.spritesheet('player', 'img/player.png', {frameWidth: 32, frameHeight: 32}) 
    }

    /**
     * Método usado para criar e configurar os objectos do jogo
     */
    create() {
        // Adicionando a imagem de fundo no jogo
        this.background = this.add.image(0, 0, 'background').setOrigin(0,0)
        this.background.displayWidth = 800
        this.background.displayHeight = 600

        // Adicionando o personagem no jogo e aumentando a sua escala
        this.player = this.physics.add.sprite(50, 500, 'player')
        .setCollideWorldBounds(true).setScale(2).setVelocityX(150)
    }

    /**
     * Método usado para actualizar o jogo, ou seja, alterar as carecterísticas padrão de alguns objectos
     */
    update() {}
}