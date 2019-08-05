import Phaser from 'phaser'

class playGame extends Phaser.Scene {
  TIMELIMIT = 10

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
    this.crates = this.add.group()
    this.texts = this.add.group()

    this.timerText = this.add.bitmapText(2, 0, 'font', this.timeLimit)
    this.shouldDetectCollision = false

    this.timer = this.time.addEvent({
      delay: 1000,
      callback: this.tick,
      callbackScope: this,
      loop: true
    })

    this.input.on('pointerup', (pointer) => {
      if(this.finish) {
        //this.restartGame()
      } else {
        if(this.crate.visible) {
          this.createCrate()
        }
      }
    })

    this.matter.world.on("collisionstart", event => {
      event.pairs.forEach(pair => {
        const { bodyA, bodyB } = pair
        if(bodyA.id == this.currentId || bodyB.id == this.currentId) {
          if(!this.crate.visible) {
            this.crateTween.resume()
            this.crate.setVisible(true)
            this.shouldDetectCollision = false
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
    this.timeLimit = this.timeLimit - 1
    this.timerText.text = this.timeLimit

    if(this.timeLimit <= 0) {
      this.timerText.text = 0
      this.stopGame()
    }
  }

  stopGame() {
    this.finish = true
    this.crateTween.pause()

    if(this.bodiesStopMoving()) {
      this.timer.paused = true

      let height = this.calcStackHeight()

      this.texts.addMultiple([
        this.add.bitmapText(this.game.config.width / 2, 170, 'font', `Your score: ${height}`).setOrigin(0.5).setScale(0.7),
        this.add.bitmapText(this.game.config.width / 2, 200, 'font', 'Posting to leaderboard...').setOrigin(0.5).setScale(0.7),
        this.add.bitmapText(this.game.config.width / 2, 250, 'font', 'Please wait...').setOrigin(0.5).setScale(0.7)
      ])
    }
  }

  bodiesStopMoving() {
    const bodies = this.matter.world.engine.world.bodies
    const total = bodies.reduce( (total, body) => total + body.velocity.x + body.velocity.y, 0)
    return total > -1 && total < 1
  }

  calcStackHeight() {
    let height = this.game.config.height
    this.crates.children.each(crate => {
      const pos = crate.y
      if(height > crate.y) {
        height = crate.y
      }
    })
    height = this.game.config.height - height
    return Math.ceil(height).toFixed(0)
  }

  restartGame() {
    this.timeLimit = this.TIMELIMIT
    this.timerText.text = this.timeLimit
    this.timer.paused = false
    this.crateTween.resume()
    this.crate.setVisible(true)
    this.texts.clear(true, true)
    this.crates.clear(true, true)
    this.finish = false
  }

  createCrate() {
    this.crateTween.pause()
    this.crate.setVisible(false)

    const sprite = this.matter.add.sprite(this.crate.x, this.crate.y, 'crate')
    sprite.setScale(0.5)
    this.crates.add(sprite)

    this.currentId = sprite.body.id
    this.shouldDetectCollision = true
  }
}

export default playGame;