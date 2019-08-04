import Phaser from 'phaser'

class playGame extends Phaser.Scene {
  TIMELIMIT = 3

  constructor() {
    super('CryptoStacker')
    this.timeLimit = this.TIMELIMIT
  }

  preload() {
    this.load.image('crate', require('../../img/crate.png'))
    this.load.bitmapFont('font', require('../../fonts/smallfont.png'), require('../../fonts/smallfont.fnt'))
  }

  create() {
    this.matter.world.setBounds(0, -200, this.game.config.width, this.game.config.height + 200)
    this.gameObjects = this.add.group()

    this.timerText = this.add.bitmapText(2, 0, 'font', this.timeLimit)

    this.timer = this.time.addEvent({
      delay: 1000,
      callback: this.tick,
      callbackScope: this,
      loop: true
    })

    this.input.on('pointerup', (pointer) => {
      if(this.finish) {
        this.restartGame()
      } else {
        if(this.crate.visible) {
          this.createCrate()
        }
      }
    })

    this.matter.world.on("collisionstart", event => {
      if(this.finish) return

      event.pairs.forEach(pair => {
        const { bodyA, bodyB } = pair
        if(bodyA.id == this.currentId || bodyB.id == this.currentId) {
          if(!this.crate.visible) {
            this.crateTween.resume()
            this.crate.setVisible(true)
          }
        }
      })
    })

    this.crate = this.add.image(50, 50, 'crate')
    this.crate.setScale(0.5)
    this.crateTween = this.tweens.add({
      targets: this.crate,
      x: this.game.config.width - 50,
      duration: 500,
      yoyo: true,
      loop: -1
    })
  }

  tick() {
    if(this.finish) return

    this.timeLimit = this.timeLimit - 1
    this.timerText.text = this.timeLimit

    if(this.timeLimit == 0) {
      this.stopGame()
    }
  }

  stopGame() {
    this.finish = true
    this.crateTween.pause()
    this.timer.paused = true

    // calc score and post to leaderboard
    this.gameObjects.addMultiple([
      this.add.bitmapText(this.game.config.width / 2, 200, 'font', 'Posting to leaderboard...').setOrigin(0.5).setScale(0.7),
      this.add.bitmapText(this.game.config.width / 2, 250, 'font', 'Please wait...').setOrigin(0.5).setScale(0.7)
    ])
  }

  restartGame() {
    this.timeLimit = this.TIMELIMIT
    this.timerText.text = this.timeLimit
    this.timer.paused = false
    this.crateTween.resume()
    this.crate.setVisible(true)
    this.gameObjects.clear(true, true)
    this.finish = false
  }

  createCrate() {
    this.crateTween.pause()
    this.crate.setVisible(false)

    const sprite = this.matter.add.sprite(this.crate.x, this.crate.y, 'crate')
    sprite.setScale(0.5)
    this.gameObjects.add(sprite)

    this.currentId = sprite.body.id
  }
}

export default playGame;