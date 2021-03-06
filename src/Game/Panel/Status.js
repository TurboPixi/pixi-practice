

import { canvas } from '../../constants'
import StatIcon from './StatIcon'



class Status {
  constructor(team){
    this.renderer = new PIXI.Container()
    this.renderer.x = 50
    this.renderer.y = 50
    this.team = team

    const textStyle = new PIXI.TextStyle({ 
      fontSize: 18,
      fill: 0xEEEEEE,
      lineJoin: 'round',
      stroke: 0x0,
      strokeThickness: 5 
    })

    this.exp_bar = new PIXI.Graphics()
    this.renderer.addChild(this.exp_bar)

    this.ap = new PIXI.Text('AP 0', textStyle)
    this.ap.x = 120
    this.ap.y = -23
    this.renderer.addChild(this.ap)

    this.coin_icon = new PIXI.Sprite(PIXI.loader.resources['coin_icon'].texture)
    this.coin_icon.scale.set(0.4)
    this.coin_icon.anchor.set(0.5)
    this.coin_icon.x = 210
    this.coin_icon.y = -10
    this.renderer.addChild(this.coin_icon)


    this.gold = new PIXI.Text('0', textStyle)
    this.gold.x = 228
    this.gold.y = -23
    this.renderer.addChild(this.gold)

    this.level = new PIXI.Text('LV. 1', textStyle)
    this.level.x = 40
    this.level.y = -22
    this.renderer.addChild(this.level)


    if(this.team === 1) 
      this.avatar = new PIXI.Sprite(PIXI.loader.resources['fox_big_icon'].texture)
    else if(this.team === 2)
      this.avatar = new PIXI.Sprite(PIXI.loader.resources['panda_big_icon'].texture)

    this.avatar.anchor.set(0.5)
    this.renderer.addChild(this.avatar)

    this.render_exp_bar(0, 100)
  	this.set_stat_icons()
  }
  render_exp_bar(exp, next_level_exp){
    const origin = { x: 0, y: 5 }, w = 300, h = 15, ratio = exp / next_level_exp

    this.exp_bar.clear()
    this.exp_bar.lineStyle(3, 0xCCCCCC)

    this.exp_bar.beginFill(0x333333)
    this.exp_bar.drawRect(origin.x, origin.y, w, h)
    this.exp_bar.lineStyle(0, 0)
    this.exp_bar.beginFill(0x039BE5)
    this.exp_bar.drawRect(origin.x, origin.y, w  * ratio, h)
  }
  update(stats, abilites){
    this.gold.text = stats.gold.toString()
    this.level.text = `LV. ${stats.level}`
    this.ap.text = `AP ${stats.ap}`
    abilites.forEach((lv, i) => {
      this.stats[i].level = lv
      this.stats[i].can_upgrade = (stats.ap > 0)
    })
    this.render_exp_bar(stats.exp, stats.next_level_exp)
  }
  set_stat_icons(){
    const stats = [ 'attack_damage', 'speed', 'max_hp', 'attack_speed', 'reachable_range' ]

    this.stats = stats.map((name, index) => {
      let icon = new StatIcon(name, index)
      icon.renderer.x = -20 
      icon.renderer.y = 40 * (index + 1)
      this.renderer.addChild(icon.renderer)
      return icon
    })
  }
  
  
}

export default Status