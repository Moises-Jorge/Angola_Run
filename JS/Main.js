let game

window.onload = function () {
    const config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        scene: [Scene01]
    }

    game = new Phaser.Game(config)
}