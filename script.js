const grid=document.getElementById("grid");
const scoreDisplay=document.getElementById("score");
let squares=[];
let currentSnake=[0,1,2]
let direction=1;
let appleIndex=0;
let score=0;
let timerId=0;
let intervelTime=200;
let nextDirection=1;
let gameOn = false

function createBoard(){
    for(let i=0; i<400;i++){
        const square =document.createElement("div");
        grid.appendChild(square);
        squares.push(square);
    }
}
createBoard()


function startGame(){
    clearInterval(timerId)
    direction=nextDirection;
    currentSnake.forEach(index => squares[index].classList.remove("snake"));
    currentSnake.forEach(index => squares[index].classList.remove("head"));
    squares[appleIndex].classList.remove("apple");
    currentSnake = [2,1,0];
    score=0; direction=1; intervelTime=200;
    scoreDisplay.textContent = score;
    currentSnake.forEach(index => squares[index].classList.add("snake"));
    squares[currentSnake[0]].classList.add("head");
    generApple()
    timerId = setInterval(move,intervelTime);
}

function endGame(){
    clearInterval(timerId)
    nextDirection=1
}

function generApple(){
    do{
        appleIndex = Math.floor(Math.random()*squares.length);}
    while (squares[appleIndex].classList.contains("snake"));
    squares[appleIndex].classList.add("apple");
}

function move(){
    direction=nextDirection
    const hitBottom = (currentSnake[0] + 20 >= 400 && direction === 20);
    const hitRight = (currentSnake[0] % 20 === 19 && direction === 1);
    const hitLeft = (currentSnake[0] % 20 === 0 && direction=== -1);
    const hitTop = (currentSnake[0] - 20 < 0 && direction === -20);
    const hitSelf = squares[currentSnake[0]+direction]?.classList.contains("snake");

    if(hitBottom || hitLeft || hitRight || hitSelf || hitTop){
        return endGame();

        }

    squares[currentSnake[0]].classList.remove("head");

    const tail = currentSnake.pop();
    squares[tail].classList.remove("snake");
    const newHead = currentSnake[0] + direction;
    currentSnake.unshift(newHead);
    squares[newHead].classList.add("snake");
    squares[newHead].classList.add("head")

    if (squares[newHead].classList.contains("apple")) {
        squares[newHead].classList.remove("apple");
        squares[tail].classList.add("snake");
        currentSnake.push(tail);
        score++; 
        scoreDisplay.textContent = score;
        generApple();
    document.addEventListener("touchstart", e => {
        touchStartX=e.changedTouches[0].screenX;
        touchStartY=e.changedTouches[0].screenY;
    }, false)
    document.addEventListener("touchend", e => {
        touchEndX=e.changedTouches[0].screenX;
        touchEndY=e.changedTouches[0].screenY;
        handleSwipe()
    }, false)

    }

}

function changeDir(inputedDir){
    if (direction + inputedDir !== 0){
        nextDirection = inputedDir;
    }
}


function handleSwipe(){
    const dx = touchStartX - touchEndX;
    const dy = touchStartY - touchEndY;

    const absDx = Math.abs(dx);
    const absDy = Math.abs(dy);

    if (Math.max(absDx,absDy) > 30){
        if (absDx > absDy){
            if (dx > 0) changeDir(-1);
            else  changeDir(1);
        } else{
            if(dy>0) changeDir(-20);
            else changeDir(20)
        }
    }
}

document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowUp" ) changeDir(-20);
    if (e.key === "ArrowDown" ) changeDir(20);
    if (e.key === "ArrowLeft" ) changeDir(-1);
    if (e.key === "ArrowRight" ) changeDir(1);
    if (e.key === "w" ) changeDir(-20);
    if (e.key === "s" ) changeDir(20);
    if (e.key === "a" ) changeDir(-1);
    if (e.key === "d" ) changeDir(1);
});

startGame();