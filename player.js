class Player {
  constructor({x, y, sizeX, sizeY, ctx, color, speed}) {
    this.x = x
    this.y = y
    this.sizeX = sizeX || 10
    this.sizeY = sizeY || 10
    this.ctx = ctx
    this.color = color || "orange"
    this.speed = speed || 1
    this.size = 1
    this.xyPrevLocation = []
    this.lastDirection = "right"
    this.posBehind = 10
    this.isRunning = false
  }

  walk() {
    if(!this.isRunning) {
      this.draw()
      return
    }

    let dir

    if (directions.length === 0 && this.lastDirection != null) {
      dir = this.lastDirection
    } else {
      dir = directions[directions.length - 1]
    }

    if (
      (dir === "right" && this.lastDirection === "left") ||
      (dir === "left" && this.lastDirection === "right") ||
      (dir === "up" && this.lastDirection === "down") ||
      (dir === "down" && this.lastDirection === "up")
    ) {
      // Not allow go to walk behind
      dir = this.lastDirection
    }

    if (dir === "right") {
      this.lastDirection = "right"
      if (this.x >= canvasX) {
        this.x = -9
      } else {
        this.x = this.x + this.speed
      }
    }
    if (dir === "left") {
      this.lastDirection = "left"
      if (this.x <= -9) {
        this.x = canvasX
      } else {
        this.x = this.x - this.speed
      }
    }
    if (dir === "up") {
      this.lastDirection = "up"
      if (this.y <= -9) {
        this.y = canvasY
      } else {
        this.y = this.y - this.speed
      }
    }
    if (dir === "down") {
      this.lastDirection = "down"
      if (this.y >= canvasY) {
        this.y = -9
      } else {
        this.y = this.y + this.speed
      }
    }

    this.xyPrevLocation.unshift(`${this.x},${this.y}`)
    if (this.xyPrevLocation.length > 1000) {
      this.xyPrevLocation.length = 1000
    }
    this.draw()
  }

  getPosition() {
    return [this.x, this.y]
  }

  draw() {
    this.ctx.fillStyle = this.color
    this.ctx.fillRect(this.x, this.y, this.sizeX, this.sizeY)

    if (this.size > 1) {
      this.ctx.fillStyle = "orange"
      for (let i = 1; i < this.size; i++) {
        this.ctx.fillRect(
          Number(this.xyPrevLocation[i * this.posBehind].split(",")[0]),
          Number(this.xyPrevLocation[i * this.posBehind].split(",")[1]),
          this.sizeX,
          this.sizeY
        )
      }
    }
  }


}
