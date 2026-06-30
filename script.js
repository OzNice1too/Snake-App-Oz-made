const grid=document.getElementById("grid");
const scoreDisplay=document.getElementById("score");
let squares=[];
let currentSnake=[201,202,203]
let direction=1;
let appleIndex=0;
let score=0;
let timerId=0;
let intervelTime=200

function createBoard(){
    for(let i=0; i<400;i++){
        const square =document.createElement("div");
        grid.appendChild(square);
        squares.push(square);
    }
}
createBoard()


function startGame(){
    currentSnake.forEach(index => squares[index].classList.remove("snake"));
    squares[appleIndex].classList.remove("apple");
    clearInterval(timerId)
}

function hitCheck(){
    const hitBottom = (currentSnake[0]>=380 && direction === 20);
    const hitRight = (currentSnake[0] % 20 === 19 && direction === 1);
    const hitLeft = (currentSnake[0] % 20 === 0 && direction=== -1);
    const hitTop = (currentSnake[0] < 20 && direction === -20);
    const hitSelf = squares[currentSnake[0]+direction]?.classList.containts("snake")
}

function generApple(){
    do{
        appleIndex = Math.floor(Math.random()*squares.length);
    }   while (squares[appleIndex].classList.containts("snake"));
    squares[appleIndex].classList.add("apple");
}

function changeDir(inputedDir){
    if (direction + inputedDir !== 0){
        direction == inputedDir;
    }
}

document.addEventListener("keydown", (e) => {
    if (e.key === "arrowUp" || e.key === "w") changeDir(-20);
    if (e.key === "arrowDown" || e.key === "s") changeDir(20);
    if (e.key === "arrowLeft" || e.key === "a") changeDir(-1);
    if (e.key === "arrowRight" || e.key === "d") changeDir(1);
});





























































































































































































































