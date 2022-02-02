let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];
snake[0] = {
    x: 8 * box,
    y: 8 * box
}
let direction = "right";
let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}


function createBG() {
    context.fillStyle = "#E0ECF8";
    context.fillRect(0, 0, 16 * box, 16 * box);
}


function createSnake() {
    for (i = 0; i < snake.length; i++) {
        
        /* context.fillRect(snake[i].x, snake[i].y, box, box); */
       
        context.beginPath();
        context.arc(snake[i].x, snake[i].y, 18, 0, 2 * Math.PI);
        context.stroke();
        context.fillStyle = "#B40486";
        context.fill();
        context.strokeStyle  = "#B40486";
        context.stroke();
    }
}

function drawFood() {
    /* context.fillStyle = "#D0A9F5";
    context.fillRect(food.x, food.y, box, box); */

    context.beginPath();
        context.arc(food.x, food.y, 18, 0, 2 * Math.PI);
        context.stroke();
        context.fillStyle = "#D0A9F5";
        context.fill();
        context.strokeStyle  = "#D0A9F5";
        context.stroke();
}

document.addEventListener('keydown', update);

function update(e) {
    if (e.keyCode == 37 && direction != "right") direction = "left";
    if (e.keyCode == 38 && direction != "down") direction = "up";
    if (e.keyCode == 39 && direction != "left") direction = "right";
    if (e.keyCode == 40 && direction != "up") direction = "down";
}

function initialGame() {

    createBG();
    createSnake();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == "right") snakeX += box;
    if (direction == "left") snakeX -= box;
    if (direction == "up") snakeY -= box;
    if (direction == "down") snakeY += box;

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);

    if (snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if (snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if (snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if (snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    for (i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(game);
            alert('Game Over!')
        }
    }
}

let game = setInterval(initialGame, 100);

