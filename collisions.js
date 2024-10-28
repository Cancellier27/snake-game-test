class Collision {
  constructor(props) {
    this.player = props.player
    this.enemies = props.enemies
  }

  collisionCheck() {
    let pp = this.player.getPosition()
    
    this.enemies.forEach(enemy => {
      let ep = enemy.getPosition()
      
      if(!enemy.isDestroyed) {
        if(pp[0] >= ep[0] && pp[0] <= ep[0]+10 && pp[1] >= ep[1] && pp[1] <= ep[1]+10 ||
          pp[0]+10 >= ep[0] && pp[0]+10 <= ep[0]+10 && pp[1] >= ep[1] && pp[1] <= ep[1]+10 ||
          pp[0] >= ep[0] && pp[0] <= ep[0]+10 && pp[1]+10 >= ep[1] && pp[1]+10 <= ep[1]+10 ||
          pp[0]+10 >= ep[0] && pp[0]+10 <= ep[0]+10 && pp[1]+10 >= ep[1] && pp[1]+10 <= ep[1]+10
        ) {
          // Colliding!
          let audioPoint = new Audio("./songs/point-collection.mp3")
          audioPoint.play()
          this.player.size++
          enemy.isDestroyed = true
        } 
      }
    });
  }

  itselfCollision() {
    let posCheck = this.player.xyPrevLocation.slice(10, this.player.size * this.player.posBehind)
    let plaPorString = `${this.player.x},${this.player.y}`
         
    if(posCheck.includes(plaPorString) && this.player.isRunning) {
      this.player.isRunning = false
      document.querySelector(".end-button").style.display = "block"
      console.log("test")
      audioStart.pause()
      audioStart.currentTime = 0
      let audioOver = new Audio("./songs/game-over.mp3")
      audioOver.play()
    }
  }

  init() {
    this.collisionCheck()
    this.itselfCollision()
  }
}