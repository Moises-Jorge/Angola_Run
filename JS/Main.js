let game

window.onload = function () {
    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        scene: [StartScene,Scene01],

        // Configurando o motor de Física, que vai permitir ao personagem colidir com os outros objectos
        physics: {
            default: 'arcade', // Nome do motor de física que estamos usando
            arcade: { // Configurações do Arcade
                gravity: {y: 1000} // Estamos configurando apenas a gravidade no eixo "y"
            } 
        },
        pixelArt: true // Para manter a qualidade e a nitidez das imagens quando as suas escalas forem alteradas
    }

    game = new Phaser.Game(config)
}