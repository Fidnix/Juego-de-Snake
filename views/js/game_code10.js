// ===================================================
// Elementos HTML
// ===================================================

// let game = document.querySelector("#game"),
// puntaje_snake_parrafo = document.querySelector("#puntaje_snake_parrafo"), 
// ctx = game.getContext("2d"), btn_play = document.querySelector("#btn_play"),
// direccion_snake_parrafo = document.querySelector("#direccion_snake_parrafo"),
// btn_stop = document.querySelector("#btn_stop"),
// puntaje_maximo_span = document.querySelector("#puntaje_maximo_span");

// ===================================================
// Request Animation Frame
// ===================================================

// ===================================================
// Clases
// ===================================================

class SnakeHead{
    constructor( x, y, directionX, directionY, xLim, yLim ){
        this.x = x;
        this.y = y;

        // Direction: object{x: int, y: int}
        this.directionX = directionX;
        this.directionY = directionY;
        this.tail = null;

        this.length = 1;

        this.xLim = xLim-1;
        this.yLim = yLim-1;
    }

    move(){
        if(this.tail) this.tail.move(this.x, this.y);
        this.x += this.directionX;
        this.y += this.directionY;
    }
    
    verifyDeathCollisions(){
        if ( this.x < 0 || this.x > this.xLim || this.y < 0 || this.y > this.yLim) return true;
        if(!this.tail) return false;
        let currentTail = this.tail.tail;
        while(currentTail){
            if(this.x == currentTail.x && this.y == currentTail.y) return true;
            currentTail = currentTail.tail;
        }
        return false;
    }
    verifyFoodCollision({x, y}){
        if(this.x == x && this.y == y){
            this.appendTail();
            return true;
        }
    }

    setDirection( input ){
        // console.log(typeof input)
        let directions  = {
            37: {x: -1, y: 0},
            38: {x: 0, y: -1},
            39: {x: 1, y: 0},
            40: {x: 0, y: 1},
        }
        this.directionX = directions[input].x
        this.directionY = directions[input].y
    }

    appendTail(){
        let newColor = this.selectColor(this.length)
        this.length++;

        if( !this.tail ){
            this.tail = new SnakeTail(this.x, this.y, 1, newColor);
            return;
        }
        this.tail.appendTail(newColor);
    }

    selectColor( position ){
        let colors = [
            ["#cc0000", "#990000"],
            ["#ff9900", "#cc6600"],
            ["#ffff00", "#ffcc00"],
            ["#00ff00", "#009933"],
            ["#33cccc", "#009999"],
            ["#cc00ff", "#6666ff"],
            ["#ff0066", "#99003d"],
        ]
    
        return colors[ position%7 ][0];
    }

    getLength(){
        return this.length;
    }

    getRenderData(size, margin){
        return {
            x: this.x*size + margin,
            y: this.y*size + margin,
            w: size - 2*margin,
            h: size - 2*margin,
            color: "#fff"
        }
    }
}

class SnakeTail{
    constructor(x, y, position, color){
        this.x = x;
        this.y = y;
        this.position = position;

        this.tail = null;
        this.colors = color;
    }

    move(prevX, prevY){
        if(this.tail){
            this.tail.move(this.x, this.y);
        }
        this.x = prevX;
        this.y = prevY;
    }

    appendTail(color){
        if( !this.tail ){
            // console.log("asdas")
            this.tail = new SnakeTail(this.x, this.y, this.position + 1, color);
            return;
        }
        // console.log("asdas2")
        this.tail.appendTail(color);
    }

    getRenderData(size, margin){
        return {
            x: this.x*size + margin,
            y: this.y*size + margin,
            w: size - 2*margin,
            h: size - 2*margin,
            color: this.colors
        }
    }
}

class Food{
    constructor(snakeObj, xLim, yLim){
        this.xLim = xLim-1;
        this.yLim = yLim-1;
        this.newFoodCoords(snakeObj);
    }
    
    newFoodCoords(snakeObj){
        let rndx, rndy;
        do{
            rndx = Math.ceil(Math.random()*this.xLim);
            rndy = Math.ceil(Math.random()*this.yLim);
        }while(this.moveVerification(rndx, rndy, snakeObj));
        this.x = rndx;
        this.y = rndy;
        // console.table([this.x, this.y])
    }

    moveVerification(rndx, rndy, snakeObj) {
        let currentSnake = snakeObj;
        do{
            if(currentSnake.x == rndx && currentSnake.y == rndy){
                return true;
            }
            currentSnake = currentSnake.child;
        } while( currentSnake )
        return false;
    }

    getCoords(){
        return {x: this.x, y: this.y}
    }

    getRenderData( size, margin ){
        return {
            x: this.x*size + margin,
            y: this.y*size + margin,
            w: size - 2*margin,
            h: size - 2*margin,
        }
    }
}

class Renderer{
    constructor(numTilesX, numTilesY){
        this.game = document.querySelector("#game")
        this.ctx = this.game.getContext("2d")

        this.width = this.game.width
        this.height = this.game.height

        this.numTilesX = numTilesX
        this.numTilesY = numTilesY

        this.tile = this.calculateTileSize();

        this.offsetX = 0;
        this.offsetY = 0;
        [this.offsetX, this.offsetY] = this.calculateOffsets()

        this.snakeMargin = 2;
        this.foodMargin = 3;

        this.imgApple = new Image();
        this.imgApple.src = "./views/images/snake_2d_apple.svg";
    }

    calculateTileSize(){
        let sizeX = this.width/this.numTilesX
        let sizeY = this.height/this.numTilesY
        return parseInt(Math.min(sizeX, sizeY))
    }

    calculateOffsets(){
        return [
            Math.abs(this.tile*this.numTilesX - this.width)/2,
            Math.abs(this.tile*this.numTilesY - this.height)/2
        ]
    }

    clear(){
        this.ctx.clearRect(0, 0, this.width, this.height);
    }

    renderBg(){
        this.ctx.fillStyle = "rgb(31, 39, 39)"
        this.renderRect(0, 0, this.tile*this.numTilesX, this.tile*this.numTilesY)
        this.ctx.fillStyle = "rgb(12, 15, 13)";
        for(let y = 0; y < this.numTilesY;y++){
            for( let x =  (y%2)? 0:1 ; x < this.numTilesX; x+=2){
                this.renderRect(x*this.tile, y*this.tile, this.tile, this.tile);
            }
        }
        // this.ctx.fillStyle = "rgb(23, 23, 23)";
        // this.ctx.fillRect(0, 140, 300, 2);
    }

    renderRect(x, y, w, h){
        this.ctx.fillRect(this.offsetX + x, this.offsetY + y, w, h);
    }

    renderSnakePart( { x, y, w, h, color } ){
        this.ctx.fillStyle = color;
        this.renderRect( x, y, w, h);
    }

    renderSnake(snake){
        let currentSnake = snake;
        while(currentSnake){
            this.renderSnakePart( currentSnake.getRenderData(this.tile, this.snakeMargin) )
            currentSnake = currentSnake.tail;
        }
    }

    renderAppleImg( {x, y, w, h} ){
        this.ctx.drawImage(this.imgApple, this.offsetX + x , this.offsetY + y, w, h);
    }

    renderFood(food){
        this.renderAppleImg(food.getRenderData(this.tile, this.foodMargin))
    }
}

class HTMLHandler{
    constructor(){
        // score
        this.maxScoreParagraph = document.querySelector("#max-score-p")
        this.scoreParagraph = document.querySelector("#score-p")

        // Direction
        this.arrowUp = document.querySelector(".arrow-up")
        this.arrowDown = document.querySelector(".arrow-down")
        this.arrowLeft = document.querySelector(".arrow-left")
        this.arrowRight = document.querySelector(".arrow-right")

        // control btns
        this.startBtn = document.querySelector("#play_btn")
        this.stopBtn = document.querySelector("#stop_btn")

        // Game over
        this.popup = document.querySelector(".popup-game-over")
    }

    disableGameOverPopup(){
        this.popup.classList.add("disabled")
    }
    enableGameOverPopup(){
        this.popup.classList.remove("disabled")
    }

    toggleBtns(){
        this.startBtn.disabled = !this.startBtn.disabled
        this.stopBtn.disabled = !this.stopBtn.disabled
    }

    setMaxScore(score){
        this.maxScoreParagraph.innerText = score
    }

    setScore(score){
        this.scoreParagraph.innerText = score
    }

    setDirectionDisplay(input){
        this.arrowUp.classList.remove("arrow-selected")
        this.arrowDown.classList.remove("arrow-selected")
        this.arrowRight.classList.remove("arrow-selected")
        this.arrowLeft.classList.remove("arrow-selected")
        
        switch (input){
            case 37:
                this.arrowLeft.classList.add("arrow-selected")
                break;
            case 38:
                this.arrowUp.classList.add("arrow-selected")
                break;
            case 40:
                this.arrowDown.classList.add("arrow-selected")
                break;
            case 39:
                this.arrowRight.classList.add("arrow-selected")
                break;
        }
    }
}

class SnakeGame{
    constructor(){
        this.numTilesX = 13;
        this.numTilesY = 8;

        this.render = new Renderer(this.numTilesX, this.numTilesY);
        this.snake = new SnakeHead( 0, 0, 1, 0, this.numTilesX, this.numTilesY )
        this.food = new Food(this.snake, this.numTilesX, this.numTilesY);
        this.htmlHandler = new HTMLHandler();

        this.frames = window.mozRequestAnimationFrame ||
            window.msRequestAnimationFrame ||
            window.webkitRequestAnimationFrame;

        this.session = true;
        this.nonStarted = true;

        // Config
        this.fps = 3;
        this.score = 0;

        this.render.renderBg();
        this.render.renderSnake(this.snake);
        this.render.renderFood(this.food);

        this.activateControl();

        this.animation = null
    }

    activateLoop(){
        this.htmlHandler.disableGameOverPopup();
        this.animation = setInterval(
            () => {this.loop()},
            1000/this.fps
        );
    }

    activateControl(){
        document.addEventListener("keydown", event=>{
            if(!this.session) return;

            
            let keyCode = event.keyCode

            if( keyCode < 37 || keyCode > 40 ) return;
            if(this.nonStarted){
                this.nonStarted = false
                this.activateLoop()
            };
            
            this.snake.setDirection(keyCode)
            this.htmlHandler.setDirectionDisplay( keyCode );
        });
    }

    loop(){
        // Game data
        this.snake.move();

        if( this.snake.verifyDeathCollisions() ) {
            this.gameOver();
            return;
        }
        
        if(this.snake.verifyFoodCollision(this.food.getCoords())){
            this.food.newFoodCoords(this.snake);
            this.score++;
            this.htmlHandler.setScore(this.score);
        }

        // Game render
        this.render.clear();
        this.render.renderBg();
        this.render.renderSnake(this.snake);
        this.render.renderFood(this.food);
    }

    gameOver() {
        clearInterval(this.animation);
        this.htmlHandler.toggleBtns();
        this.htmlHandler.enableGameOverPopup();
        this.render.clear();
        this.render.renderBg();

        let getMaxScorePromise = new Promise((resolve) => {
            let xhttpGetMaxScore = new XMLHttpRequest();
            xhttpGetMaxScore.open("get", "controller/get_max_score.php", true);
            xhttpGetMaxScore.onreadystatechange = function() {
                // console.table([this.readyState, this.status])
                if (this.readyState == 4 && this.status == 200) {
                    resolve(parseInt(xhttpGetMaxScore.responseText));
                }
            }
            xhttpGetMaxScore.send()
        })
        
        let postMaxScorePromise = new Promise((resolve, reject) => {
            let xhttpPost = new XMLHttpRequest();
    
            xhttpPost.open("post", "controller/update_score_controller.php", true);
            xhttpPost.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    
            xhttpPost.onreadystatechange = function(){
                // console.log("xd1");
                if (this.readyState == 4 && this.status == 200) {
                    // console.log("xd2");
                    resolve("Success!!")
                }
            }
            xhttpPost.send(`newpuntuacion=${this.score}`)
        })

        getMaxScorePromise.then(
            (maxScore) => {
                if(this.score > maxScore){
                    console.log(`Max Score: ${maxScore}`)
                    postMaxScorePromise.then(
                        (value) => {
                            console.log(`Update succesful: ${value}`)
                            this.htmlHandler.setMaxScore(this.score);
                        },
                        () => {}
                    )
                }
            }
        )
    }
}

let instanceGame = new SnakeGame();