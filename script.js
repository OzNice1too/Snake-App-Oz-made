const grid=document.getElementById("grid");
const scoreDisplay=document.getElementById("score");
let squares=[];
let currentSnake=[11,12,13]
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