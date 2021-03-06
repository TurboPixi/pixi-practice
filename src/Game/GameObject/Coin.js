
import GameObject from './index.js'
import { animations } from '../../Effects/animations'

import Game from '../index'


class Coin extends GameObject {
  constructor (initialize, id){
    super()
    this.object_type = 'coin'

    this.renderer.position.x = initialize.x   
    this.renderer.position.y = initialize.y
    this.value = initialize.value
    this.id = id

    this.sprite = new PIXI.extras.AnimatedSprite(animations.coin)
    this.sprite.anchor.set(0.5)
    this.sprite.animationSpeed = 0.2
    this.sprite.play()

    this.renderer.addChild(this.sprite)
  }
}

export default Coin
