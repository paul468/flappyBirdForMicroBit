function CheckForCollisions () {
    for (let k = 0; k <= pipes.length - 1; k++) {
        let pipe = pipes[k]
        for (let l = 0; l <= pipe.obstacles.length - 1; l++) {
            if (pipe.obstacles[l].y() == player.y() && pipe.obstacles[l].x() == player.x()) {
                Die()
            }
            if (player.y() == 4){
                Die()
            }
        }
    }
}
function Die () {
    basic.showString("You have " + points.toString() + " points!", 70)
game.gameOver()
}
input.onButtonPressed(Button.A, function () {
    player.change(LedSpriteProperty.Y, -1)
})
input.onButtonPressed(Button.B, function () {
    changePlayer()
})
function changePlayer () {
    player.change(LedSpriteProperty.Y, 1)
}
let element: game.LedSprite = null
let pipe = 0
let queue_free : Pipe[] = []
let points = 0
let pipes : Pipe[] = []
let player : game.LedSprite = null
class Pipe {
    obstacles : game.LedSprite[]
    obstacleEmptyY:number
    constructor(){
        this.obstacleEmptyY = randint(0, 3)
        this.obstacles = []
        for (let i = 0; i <= 4; i++) {
            if (i != this.obstacleEmptyY)
                this.obstacles.push(game.createSprite(4, i))
        }
        pipes.push(this)

    }






    moveForward () {
        for (let j = 0; j < this.obstacles.length; j++){
            this.obstacles[j].change(LedSpriteProperty.X, -1)
            if (this.obstacles[j].x() == 0){
                this.Queue_for_Deletion()
            }
        }
    }

    Queue_for_Deletion(){
        queue_free.push(this)
    }

    getX(){
        return this.obstacles[0].x()
    }


}
player = game.createSprite(1, 2)
player.set(LedSpriteProperty.Blink, 300)
loops.everyInterval(2000, function () {
    let p = new Pipe()
points += 1
})
basic.forever(function () {
    for (let m = 0; m <= pipes.length - 1; m++) {
        pipes[m].moveForward()
    }
    changePlayer()
    CheckForCollisions()
    basic.pause(500)
    for (let n = 0; n <= queue_free.length - 1; n++) {
        for (let o = 0; o <= queue_free[n].obstacles.length - 1; o++) {
            element = queue_free[n].obstacles[o]
            element.delete()
        }
    }
})
