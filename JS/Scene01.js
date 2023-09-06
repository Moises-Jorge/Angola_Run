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

        // Criando e adicionando funções às teclas (Para interagir com o personagem e para iniciar o jogo)
        this.player.canJump = true // variável que controla o salto do personagem
        this.keyBoard = this.input.keyboard.createCursorKeys()
    }

    /**
     * Método usado para actualizar o jogo, ou seja, alterar as carecterísticas padrão de alguns objectos
     */
    update() {
        // Movimentação do jogador no eixo "X": APENAS UM TESTE, DEPOIS REMOVER
        if (this.keyBoard.left.isDown) {
            this.player.setVelocityX(-150)
        } else {
            this.player.setVelocityX(150)
        }

        // Movimentação do jogador no eixo "Y": Saltar e baixar
        if (this.keyBoard.up.isDown && this.player.canJump) {
            this.player.setVelocityY(-500)
            this.player.canJump = false
        }
        // Recuperando o valor "True" para o personagem poder pular novamente
        if (!this.keyBoard.up.isDown && !this.player.canJump) {
            this.player.canJump = true
        }
    }
}