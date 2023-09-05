class Scene01 extends Phaser.Scene {
    constructor() {
        super('Scene01')
    }

    preload() {
        this.load.image('mundo', 'img/sky.png')
    }

    create() {
        this.mundo = this.add.image(0, 0, 'mundo').setOrigin(0.0)
        this.mundo.displayWidth = 800
        this.mundo.displayHeight = 600
    }

    update() {}
}