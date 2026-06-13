const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const scoreElement = document.getElementById("score");

const grid = 30;

let count = 0;
let score = 0;

let snake = {
    x: 300,
    y: 300,
    dx: grid,
    dy: 0,
    cells: [],
    maxCells: 4
};

let apple = {
    x: 450,
    y: 300
};

function randomInt(min,max){
    return Math.floor(Math.random() * (max-min)) + min;
}

function loop(){

    requestAnimationFrame(loop);

    if(++count < 6){
        return;
    }

    count = 0;

    ctx.clearRect(0,0,canvas.width,canvas.height);

    ctx.strokeStyle = "rgba(0,255,255,0.10)";
ctx.lineWidth = 1;

for(let x = 0; x < canvas.width; x += grid){

    ctx.beginPath();
    ctx.moveTo(x,0);
    ctx.lineTo(x,canvas.height);
    ctx.stroke();
}

for(let y = 0; y < canvas.height; y += grid){

    ctx.beginPath();
    ctx.moveTo(0,y);
    ctx.lineTo(canvas.width,y);
    ctx.stroke();
}

    snake.x += snake.dx;
    snake.y += snake.dy;
if (
    snake.x < 0 ||
    snake.x >= canvas.width ||
    snake.y < 0 ||
    snake.y >= canvas.height
) {
    gameOver();
    return;
}

    snake.cells.unshift({
        x:snake.x,
        y:snake.y
    });

    if(snake.cells.length > snake.maxCells){
        snake.cells.pop();
    }

    ctx.fillStyle="#ff00ff";

    ctx.fillRect(
        apple.x,
        apple.y,
        grid-2,
        grid-2
    );

ctx.fillStyle="#00ffff";

ctx.shadowBlur = 15;
ctx.shadowColor = "#00ffff";

    snake.cells.forEach((cell,index)=>{

        ctx.fillRect(
            cell.x,
            cell.y,
            grid-2,
            grid-2
        );

        if(cell.x === apple.x &&
           cell.y === apple.y){

            snake.maxCells++;

            score += 10;

            scoreElement.textContent = score;

            apple.x =
            randomInt(0,20)*grid;

            apple.y =
            randomInt(0,20)*grid;
        }

        for(let i=index+1;
            i<snake.cells.length;
            i++){

            if(cell.x === snake.cells[i].x &&
               cell.y === snake.cells[i].y){

                gameOver();
            }
        }
    });
}
ctx.shadowBlur = 0;
document.addEventListener("keydown",(e)=>{

    if(e.key==="ArrowLeft" && snake.dx===0){
        snake.dx=-grid;
        snake.dy=0;
    }

    else if(e.key==="ArrowUp" && snake.dy===0){
        snake.dy=-grid;
        snake.dx=0;
    }

    else if(e.key==="ArrowRight" && snake.dx===0){
        snake.dx=grid;
        snake.dy=0;
    }

    else if(e.key==="ArrowDown" && snake.dy===0){
        snake.dy=grid;
        snake.dx=0;
    }
});

requestAnimationFrame(loop);

function gameOver(){

    const jogarNovamente = confirm(
        `💀 GAME OVER

Pontuação Final: ${score}

Deseja jogar novamente?`
    );

    if(jogarNovamente){
        location.reload();
    }
    else{
        window.location.href = "index.html";
    }
}