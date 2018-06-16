

import { canvas } from '../../constants'


class Status {
  constructor(team){
    this.renderer = new PIXI.Container()
    this.renderer.x = 50
    this.renderer.y = 50
    this.team = team

    this.exp_bar = new PIXI.Graphics()
    this.renderer.addChild(this.exp_bar)

    if(this.team === 1) 
      this.avatar = new PIXI.Sprite(PIXI.loader.resources['fox_icon'].texture)
    else if(this.team === 2)
      this.avatar = new PIXI.Sprite(PIXI.loader.resources['panda_icon'].texture)

    this.avatar.scale.set(2)
    this.avatar.anchor.set(0.4)
    this.renderer.addChild(this.avatar)

    this.coin_icon = new PIXI.Sprite(PIXI.loader.resources['coin_icon'].texture)
    this.coin_icon.scale.set(0.4)
    this.coin_icon.anchor.set(0.5)
    this.coin_icon.x = 140
    this.coin_icon.y = -10
    this.renderer.addChild(this.coin_icon)

    const textStyle = new PIXI.TextStyle({ 
      fontSize: 18,
      fill: 0xEEEEEE,
      lineJoin: 'round',
      stroke: 0x0,
      strokeThickness: 5 
    })
    this.gold = new PIXI.Text('0', textStyle)
    this.gold.x = 153
    this.gold.y = -23
    this.renderer.addChild(this.gold)


    this.level = new PIXI.Text('LV. 1', textStyle)
    this.level.x = 40
    this.level.y = -22
    this.renderer.addChild(this.level)

    this.ap = new PIXI.Text('AP 0', textStyle)
    this.ap.x = 140
    this.ap.y = 20
    this.renderer.addChild(this.ap)

    this.render_exp_bar(0, 100)
  }
  render_exp_bar(exp, next_level_exp){
    const origin = { x: 0, y: 5 }, w = 200, h = 15, ratio = exp / next_level_exp

    this.exp_bar.clear()
    this.exp_bar.lineStyle(3, 0xCCCCCC)

    this.exp_bar.beginFill(0x333333)
    this.exp_bar.drawRect(origin.x, origin.y, w, h)
    this.exp_bar.lineStyle(0, 0)
    this.exp_bar.beginFill(0x8BC34A)
    this.exp_bar.drawRect(origin.x, origin.y, w  * ratio, h)
  }
  update(stats){
    this.gold.text = stats.gold.toString()
    this.level.text = `LV. ${stats.level}`
    this.ap.text = `AP ${stats.ap}`

    this.render_exp_bar(stats.exp, stats.next_level_exp)

  }
  
  
}

export default Status