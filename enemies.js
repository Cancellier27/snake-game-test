class Enemy {
  constructor({x, y, sizeX, sizeY, ctx, color, speed}) {
    this.x = x
    this.y = y
    this.sizeX = sizeX || 10
    this.sizeY = sizeY || 10
    this.ctx = ctx
    this.color = color || "orange"
    this.isDestroyed = false
    this.repositioning = false
    this.isRunning = true
  }

  getPosition() {
    return [this.x, this.y]
  }

  draw() {
    if(!this.isDestroyed) {
      this.ctx.fillStyle = this.color
      this.ctx.fillRect(this.x, this.y, this.sizeX, this.sizeY)
    } else if (!this.repositioning) {
      // start repositioning
      this.replacing()
      this.repositioning = true
    }
  }

  replacing() {
    setTimeout( () => {
      this.x = Math.random() * (canvasX - 20)
      this.y = Math.random() * (canvasY - 20)
      this.isDestroyed = false
      this.repositioning = false
    } ,4000)
  }


}
