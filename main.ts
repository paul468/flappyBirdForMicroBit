let player : game.LedSprite = null

let pipes : Pipe[] = []
let points = 0
let queue_free : Pipe[] = []

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
        for (let i = 0; i < this.obstacles.length; i++){
            this.obstacles[i].change(LedSpriteProperty.X, -1)
            if (this.obstacles[i].x() == 0){
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


function CheckForCollisions (){
    for (let i = 0; i < pipes.length; i++){
        let pipe = pipes[i]
        for (let j = 0; j < pipe.obstacles.length; j++){
            if (pipe.obstacles[j].y() === player.y() && pipe.obstacles[j].x() === player.x()){
                Die()
            }
        }

    }
}

function Die (){
    basic.showString("You have " + points.toString() + " points!", 70)
    game.gameOver()
}

player = game.createSprite(1, 2)
player.set(LedSpriteProperty.Blink, 300)

basic.forever(function(){
    for (let i = 0; i < pipes.length; i++){
        pipes[i].moveForward()

    }
    CheckForCollisions()
    basic.pause(500)
    for (let i = 0; i < queue_free.length; i++){
        for (let j = 0; j < queue_free[i].obstacles.length; j++){
            let element = queue_free[i].obstacles[j]
            element.delete()
        }
    }
})

function changePlayer(){
    player.change(LedSpriteProperty.Y, 1)

}

input.onButtonPressed(Button.A, function(){
    player.change(LedSpriteProperty.Y, -1)
})

input.onButtonPressed(Button.B, function(){
changePlayer()
})

loops.everyInterval(2000, () => {
    let p = new Pipe()
    points++
})
