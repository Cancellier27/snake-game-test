const canvas = document.querySelector("#canvas")
const ctx = canvas.getContext("2d")
let animationFrame

const directions = []

const canvasX = 300
const canvasY = 200

let timeout1
let timeout2

const player1 = new Player({
  x: 245,
  y: 150,
  sizeX: 10,
  sizeY: 10,
  ctx: ctx,
  color: "red"
})

const enemy1 = new Enemy({
  x: 130,
  y: 50,
  sizeX: 10,
  sizeY: 10,
  ctx: ctx,
  color: "blue"
})

const enemy2 = new Enemy({
  x: 230,
  y: 20,
  sizeX: 10,
  sizeY: 10,
  ctx: ctx,
  color: "blue"
})

const enemy3 = new Enemy({
  x: 99,
  y: 80,
  sizeX: 10,
  sizeY: 10,
  ctx: ctx,
  color: "blue"
})

const enemy4 = new Enemy({
  x: 200,
  y: 100,
  sizeX: 10,
  sizeY: 10,
  ctx: ctx,
  color: "blue"
})

const coll = new Collision({
  player: player1,
  enemies: [enemy1, enemy2, enemy3, enemy4]
})

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    if (!directions.includes("right")) {
      directions.push("right")
    }
  }
  if (e.key === "ArrowLeft") {
    if (!directions.includes("left")) {
      directions.push("left")
    }
  }
  if (e.key === "ArrowUp") {
    if (!directions.includes("up")) {
      directions.push("up")
    }
  }
  if (e.key === "ArrowDown") {
    if (!directions.includes("down")) {
      directions.push("down")
    }
  }
})

document.addEventListener("keyup", (e) => {
  if (e.key === "ArrowRight") {
    if (directions.includes("right")) {
      directions.splice(directions.indexOf("right"), 1)
    }
  }
  if (e.key === "ArrowLeft") {
    if (directions.includes("left")) {
      directions.splice(directions.indexOf("left"), 1)
    }
  }
  if (e.key === "ArrowUp") {
    if (directions.includes("up")) {
      directions.splice(directions.indexOf("up"), 1)
    }
  }
  if (e.key === "ArrowDown") {
    if (directions.includes("down")) {
      directions.splice(directions.indexOf("down"), 1)
    }
  }
})

function start(fps) {
  let previousMs
  const step = 1 / fps

  const tick = (timestampMs) => {
    if (previousMs === undefined) {
      previousMs = timestampMs
    }

    let delta = (timestampMs - previousMs) / 1000

    while (delta >= step) {
      ctx.clearRect(0, 0, canvasX, canvasY)
      loop()
      delta -= step
    }

    previousMs = timestampMs - delta * 1000
    //Recapture the callback to be able to shut it off
    animationFrame = requestAnimationFrame(tick)
  }

  // Initial kickoff
  animationFrame = requestAnimationFrame(tick)
}

function changeScore() {
  document.querySelector(".score-text").innerHTML = player1.size - 1
}

function loop() {
  player1.walk()
  enemy1.draw()
  enemy2.draw()
  enemy3.draw()
  enemy4.draw()
  changeScore()
  coll.init()
}

function IncreaseDifficulty() {
  timeout1 = setTimeout(() => {
    player1.posBehind = 7
    player1.speed = 1.5
  }, 30000)

  timeout2 = setTimeout(() => {
    player1.posBehind = 5
    player1.speed = 2
  }, 90000)
}

function startGame() {
  start(60)
  IncreaseDifficulty()
  document.querySelector(".start-button").style.display = "none"
  player1.isRunning = true
}

function restart() {
  cancelAnimationFrame(animationFrame)
  clearTimeout(timeout1)
  clearTimeout(timeout2)
  player1.x = 245
  player1.y = 150
  player1.size = 1
  player1.speed = 1
  document.querySelector(".end-button").style.display = "none"
  document.querySelector(".start-button").style.display = "block"
}

document.addEventListener("touchstart", handleTouchStart, false)
document.addEventListener("touchmove", handleTouchMove, false)

var xDown = null
var yDown = null

function getTouches(evt) {
  return (
    evt.touches || // browser API
    evt.originalEvent.touches
  ) // jQuery
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0]
  xDown = firstTouch.clientX
  yDown = firstTouch.clientY
}

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return
  }

  var xUp = evt.touches[0].clientX
  var yUp = evt.touches[0].clientY

  var xDiff = xDown - xUp
  var yDiff = yDown - yUp

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    /*most significant*/
    if (xDiff > 0) {
      player1.lastDirection = "left"
    } else {
      player1.lastDirection = "right"
    }
  } else {
    if (yDiff > 0) {
      player1.lastDirection = "up"
    } else {
      player1.lastDirection = "down"
    }
  }
  /* reset values */
  xDown = null
  yDown = null
}
