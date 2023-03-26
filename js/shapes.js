// (c) Saeed Mirjalili

/*jshint esversion: 6 */

// global variables
let x, y, h, w, shapeColor;
let ctx;
let moveStep;
let maze, mazeCellWidth, mazeCellHeight, currentMazeCellCol, currentMazeCellRow;
let mazeExitBottom, mazeExitTop;

function setup() {
    'use strict';

    const MAZE_ROWS = 10;
    const MAZE_COLS = 10;

    // setting the event handlers

    // set an event handler for all input boxes and select box (any element that has the class 'inValue')
    document.querySelectorAll('.inValue').forEach(function (item) {
        item.addEventListener('change', drawOnCanvas);
    });
    // set an event handler for all buttons (any button that has the class 'moveBtn')
    document.querySelectorAll('.moveBtn').forEach(function (item) {
        item.addEventListener('click', moveBtnClick);
    });

    document.getElementById('drawingBox1').addEventListener('keydown', canvasKeyDown);

    maze = generateMaze(MAZE_ROWS, MAZE_COLS);

    ctx = getCanvasContext('drawingBox1');

    drawMaze(ctx, maze);

    shapeColor = '#aaaaff';
    moveStep = mazeCellHeight;
    w = mazeCellWidth;
    h = mazeCellHeight;
    x = mazeExitBottom * w;
    y = (maze.length - 1) * mazeCellHeight;

    drawOnCanvas(ctx, drawHappyMonster, x, y, w, h, shapeColor);
}

function Maze() {
    let row, col, randDir;
    this.matrix = [
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 0]
    ];
    this.mazeCellWidth = ctx.canvas.width / maze[0].length;
    this.mazeCellHeight = ctx.canvas.height / maze.length;
    this.currentMazeCellCol = Math.round(this.x / this.mazeCellWidth);
    this.currentMazeCellRow = Math.round(this.y / this.mazeCellWidth);
    this.mazeExitBottom = 8;
    this.mazeExitTop = this.col;
    this.generate = function (rows, cols) {
        let row, col, randDir;
        this.matrix = new Array(rows);
        for (let i = 0; i < rows; i++) {
            this.matrix[i] = new Array(cols);
            this.matrix[i].fill(0);
        }

        row = rows - 1;
        col = Math.floor(Math.random() * cols);
        mazeExitBottom = col;
        this.matrix[row][col] = 1;

        do {
            randDir = Math.floor(Math.random() * 5);
            switch (randDir) {
                case 0:
                    col--;
                    if (col < 0)
                        col = 0;
                    break;
                case 1:
                    if (row >= 1)
                    this.matrix[row - 1][col] = 1;
                    row--;
                    col--;
                    if (row < 0)
                        row = 0;
                    if (col < 0)
                        col = 0;
                    break;
                case 2:
                    row--;
                    if (row < 0)
                        row = 0;
                    break;
                case 3:
                    if (row >= 1)
                        this.matrix[row - 1][col] = 1;
                    row--;
                    col++;
                    if (row < 0)
                        row = 0;
                    if (col >= cols)
                        col = cols - 1;
                    break;
                case 4:
                    col++;
                    if (col >= cols)
                        col = cols - 1;
                    break;

            }
            this.matrix[row][col] = 1;
        } while (row > 0);

        mazeExitTop = col;

    }


}

function generateMaze(rows, cols) {
    'use strict';

    let row, col, randDir;
    let maze = new Array(rows);
    for (let i = 0; i < rows; i++) {
        maze[i] = new Array(cols);
        maze[i].fill(0);
    }
    /*
    maze = [
        [0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
        [0, 0, 1, 1, 1, 1, 1, 1, 0, 0],
        [0, 0, 1, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 0, 1, 0, 0, 0, 0],
        [0, 0, 0, 1, 1, 1, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
        [0, 0, 0, 0, 0, 0, 1, 1, 1, 0]
    ];
    mazeExitBottom = 8;
    */
    row = rows - 1;
    col = Math.floor(Math.random() * cols);
    mazeExitBottom = col;
    maze[row][col] = 1;

    do {
        randDir = Math.floor(Math.random() * 5);
        switch (randDir) {
            case 0:
                col--;
                if (col < 0)
                    col = 0;
                break;
            case 1:
                if (row >= 1)
                    maze[row - 1][col] = 1;
                row--;
                col--;
                if (row < 0)
                    row = 0;
                if (col < 0)
                    col = 0;
                break;
            case 2:
                row--;
                if (row < 0)
                    row = 0;
                break;
            case 3:
                if (row >= 1)
                    maze[row - 1][col] = 1;
                row--;
                col++;
                if (row < 0)
                    row = 0;
                if (col >= cols)
                    col = cols - 1;
                break;
            case 4:
                col++;
                if (col >= cols)
                    col = cols - 1;
                break;

        }
        maze[row][col] = 1;
    } while (row > 0);

    mazeExitTop = col;

    return maze;
}

function drawMaze(ctx, maze) {
    'use strict';
    const MAZE_BLOCK_COLOR = '#000';
    const MAZE_PATH_COLOR = 'lightcyan';
    let cellColor;

    mazeCellWidth = ctx.canvas.width / maze[0].length;
    mazeCellHeight = ctx.canvas.height / maze.length;

    for (let row = 0; row < maze.length; row++) {
        for (var col = 0; col < maze[row].length; col++) {
            cellColor = maze[row][col] === 0 ? MAZE_BLOCK_COLOR : MAZE_PATH_COLOR;
            drawRectangle(ctx, col * mazeCellWidth, row * mazeCellHeight, mazeCellWidth, mazeCellHeight, cellColor, cellColor, 0);
        }
    }
}

function moveBtnClick(e) {
    let direction = e.currentTarget.id;

    if ((direction === 'N' && maze[currentMazeCellRow - 1][currentMazeCellCol] === 1) ||
        (direction === 'S' && maze[currentMazeCellRow + 1][currentMazeCellCol] === 1) ||
        (direction === 'E' && maze[currentMazeCellRow][currentMazeCellCol + 1] === 1) ||
        (direction === 'W' && maze[currentMazeCellRow][currentMazeCellCol - 1] === 1) ||
        (direction === 'NW' && maze[currentMazeCellRow - 1][currentMazeCellCol - 1] === 1) ||
        (direction === 'NE' && maze[currentMazeCellRow - 1][currentMazeCellCol + 1] === 1) ||
        (direction === 'SE' && maze[currentMazeCellRow + 1][currentMazeCellCol + 1] === 1) ||
        (direction === 'SW' && maze[currentMazeCellRow + 1][currentMazeCellCol - 1] === 1)) {

        moveShape(ctx, direction, moveStep);
    }
}

function canvasKeyDown(e) {
    'use strict';

    let direction;

    e.preventDefault();

    switch (e.code) {
        case 'ArrowUp':
            if (e.shiftKey)
                direction = 'NW';
            else if (e.ctrlKey)
                direction = 'NE';
            else
                direction = 'N';
            break;
        case 'ArrowDown':
            if (e.shiftKey)
                direction = 'SW';
            else if (e.ctrlKey)
                direction = 'SE';
            else
                direction = 'S';
            break;
        case 'ArrowLeft':
            direction = 'W';
            break;
        case 'ArrowRight':
            direction = 'E';
            break;
        default:
            if (e.shiftKey && e.ctrlKey && e.altKey) {
                direction = 'C';
            }
            break;
    }
    if ((direction === 'N' && maze[currentMazeCellRow - 1][currentMazeCellCol] === 1) ||
        (direction === 'S' && maze[currentMazeCellRow + 1][currentMazeCellCol] === 1) ||
        (direction === 'E' && maze[currentMazeCellRow][currentMazeCellCol + 1] === 1) ||
        (direction === 'W' && maze[currentMazeCellRow][currentMazeCellCol - 1] === 1) ||
        (direction === 'NW' && maze[currentMazeCellRow - 1][currentMazeCellCol - 1] === 1) ||
        (direction === 'NE' && maze[currentMazeCellRow - 1][currentMazeCellCol + 1] === 1) ||
        (direction === 'SE' && maze[currentMazeCellRow + 1][currentMazeCellCol + 1] === 1) ||
        (direction === 'SW' && maze[currentMazeCellRow + 1][currentMazeCellCol - 1] === 1)) {

        moveShape(ctx, direction, moveStep);
    }
}

function drawOnCanvas(ctx, shapeToBeDrawn, x, y, w, h, shapeColor) {
    'use strict';
    currentMazeCellCol = Math.round(x / mazeCellWidth);
    currentMazeCellRow = Math.round(y / mazeCellWidth);
    if (currentMazeCellRow < maze.length) {
        shapeToBeDrawn(ctx, x, y, w, h, shapeColor);
        ctx.canvas.focus();
    }
}

function moveShape(ctx, direction, moveStep) {
    "use strict";
    ctx.clearRect(x, y, w, h);
    switch (direction) {
        case 'NW':
            x -= moveStep;
            y -= moveStep;
            if (x < 0)
                x = 0;
            if (y < 0)
                y = 0;
            break;
        case 'N':
            y -= moveStep;
            if (y < 0)
                y = 0;
            break;
        case 'NE':
            x += moveStep;
            y -= moveStep;
            if (x > ctx.canvas.width - w)
                x = ctx.canvas.width - w;
            if (y < 0)
                y = 0;
            break;
        case 'W':
            x -= moveStep;
            if (x < 0)
                x = 0;
            break;
        case 'E':
            x += moveStep;
            if (x > ctx.canvas.width - w)
                x = ctx.canvas.width - w;
            break;
        case 'SW':
            x -= moveStep;
            y += moveStep;
            if (x < 0)
                x = 0;
            if (y > ctx.canvas.height - h)
                y = ctx.canvas.height - h;
            break;
        case 'S':
            y += moveStep;
            if (y > ctx.canvas.height - h)
                y = ctx.canvas.height - h;
            break;
        case 'SE':
            x += moveStep;
            y += moveStep;
            if (x > ctx.canvas.width - w)
                x = ctx.canvas.width - w;
            if (y > ctx.canvas.height - h)
                y = ctx.canvas.height - h;
            break;
        case 'C':
            x = (ctx.canvas.width - w) / 2;    // setting the x to the center of the canvas horizontally
            y = (ctx.canvas.height - h) / 2;   // setting the y to the center of the canvas vertically
            break;
        default:
            alert("Undefined direction!");
    }

    drawOnCanvas(ctx, drawHappyMonster, x, y, w, h, shapeColor);
}