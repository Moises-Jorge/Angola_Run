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
        
        // Carregando a imagem que vai servir de asfalto (platform)
        this.load.image('asphalt', 'img/platform.png')
    }

    /**
     * Método usado para criar e configurar os objectos do jogo
     */
    create() {
        // Adicionando a imagem de fundo no jogo
        this.background = this.add.image(0, 0, 'background').setOrigin(0,0)
        this.background.displayWidth = 2000
        this.background.displayHeight = 600

        // Adicionando o personagem no jogo e aumentando a sua escala
        this.player = this.physics.add.sprite(50, 500, 'player')
        .setCollideWorldBounds(true).setScale(2).setVelocityX(150)

        // Criando e adicionando funções às teclas (Para interagir com o personagem e para iniciar o jogo)
        this.player.canJump = true // variável que controla o salto do personagem
        this.keyBoard = this.input.keyboard.createCursorKeys()

        // Criando e add o Asfalto (através de um grupo de objectos que vão ser configurados da mesma forma)
        this.asphalts = this.physics.add.staticGroup()
        this.asphalts.create(0, 600, 'asphalt').setScale(5, 1).setOrigin(0, 1).refreshBody()

        // Criando o colisor entre o Asfalto e o Personagem
        this.physics.add.collider(this.player, this.asphalts)

        // Redimensionando o Mundo de Jogo (aumentando a fronteira) e configurando a câmera para seguir o personagem
        this.physics.world.setBounds(0, 0, 2000, 600)
        this.cameras.main.startFollow(this.player).setBounds(0, 0, 2000, 600)
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
        if (this.keyBoard.up.isDown && this.player.canJump && this.player.body.touching.down) {
            this.player.setVelocityY(-500)
            this.player.canJump = false
        }
        // Recuperando o valor "True" para o personagem poder pular novamente
        if (!this.keyBoard.up.isDown && !this.player.canJump && this.player.body.touching.down) {
            this.player.canJump = true
        }
    }
}