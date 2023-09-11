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

        // Carregando a imagem das moedas
        this.load.spritesheet('coin', 'img/coin.png', {frameWidth: 32, frameHeight: 32})
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

        // Criando ANIMAÇÕES para o personagem
        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNumbers('player', {
                start: 0,
                end: 3
            }),
            frameRate: 8,
            repeat: -1
        })

        // Criando e adicionando funções às teclas (Para interagir com o personagem e para iniciar o jogo)
        this.player.canJump = true // variável que controla o salto do personagem
        this.keyBoard = this.input.keyboard.createCursorKeys()

        // Criando e add o Asfalto (através de um grupo de objectos que vão ser configurados da mesma forma)
        this.asphalts = this.physics.add.staticGroup()
        this.asphalts.create(0, 600, 'asphalt').setScale(5, 1).setOrigin(0, 1).refreshBody()

        // Criando e adicionando MOEDAS ao jogo
        this.coins = this.physics.add.group({
            key: 'coin',
            repeat: 30,
            setXY: {
                x: 300,
                y: -50,
                stepX: 50
            }
        })
        // Criando ANIMAÇÕES para as moedas
        this.anims.create({
            key: 'spin',
            frames: this.anims.generateFrameNumbers('coin', {
                start: 0,
                end: 4
            }),
            frameRate: 8,
            repeat: -1
        })
        // Adicionando efeito bounce e aplicando a animação nas moedas
        this.coins.children.iterate((c) => {
            c.setBounceY(0.3)
            c.anims.play('spin')
        })

        // Criando o colisor entre o Asfalto com o Personagem e as moedas
        this.physics.add.collider(this.player, this.asphalts)
        this.physics.add.collider(this.coins, this.asphalts)

        // Criando a colisão que permite o personagem apanhar as moedas
        this.physics.add.overlap(this.player, this.coins, this.collectCoin, null, this)

        // Criando e inserindo o placar de moedas na tela
        this.score = 0 // Contador de moedas
        this.txtScore = this.add.text(15, 15, `SCORE: ${this.score}`, {fontSize: '32px'}).setShadow(0, 0, '#000', 3).setScrollFactor(0)
        this.updateScore()

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
            // Chamando e adicionando a animação ao personagem
            this.player.anims.play('walk', true)
            this.player.flipX = true // Virar o corpo para a esquerda
            this.player.setVelocityX(-150)
        } else {
            // Chamando e adicionando a animação ao personagem
            this.player.anims.play('walk', true)
            this.player.flipX = false // Continuar virado para a frente
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
        // Chamando e adicionando a animação ao personagem
        if (!this.player.body.touching.down) {
            this.player.setFrame(
                this.player.body.velocity.y < 0 ? 1 : 3
            )
        }
    }

    /**
     * Método responsável pela coleta das moedas
     */
    collectCoin(player, coin) {
        // Eliminando a moeda quando o personagem toca na mesma
        coin.destroy()
        this.score++
        this.updateScore()
    }

    /**
     * Método responsável por actualizar o placar
     */
    updateScore() {
        // Verificação de dois dígitos de acordo com a quantidade de moedas coletadas
        this.txtScore.setText(this.score < 10 ? `SCORE: 0${this.score}` : `SCORE: ${this.score}`)
    }
}