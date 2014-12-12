(function() {
    "use strict";

    var canvas = document.getElementById("mazecanvas");
    var context = canvas.getContext("2d");
    var PLAYER_SIZE = 10;
    var maxX = canvas.width / PLAYER_SIZE;
    var maxY = canvas.height / PLAYER_SIZE;
    var currRectX = 0;
    var currRectY = 0;

    var maze = jsmaze.generateMaze(maxX, maxY);

    var PLAYER = -1;


    drawMaze();
    movePlayer(1, 0);
    window.addEventListener("keydown", handleKeyPress, true);

    function getStyle(blockType) {
        switch (blockType) {
            case maze.WALL : return "#484848";
            case maze.PATH : return "#FFFFFF";
            case maze.BOARDER : return "#11228F";
            case maze.ENTRANCE : return "#FF0000";
            case maze.EXIT : return "#00FF00";
            case PLAYER : return "#888888";
        }

        return "#FFFFFF";
    }

    function drawMaze() {
        for (var column = 0; column < maze.width; column++) {
            for (var row = 0; row < maze.height; row++) {
                drawBlock(column, row, maze.cells[column][row]);
            }
        }
    }

    function drawBlock(x, y, blockType) {
        context.beginPath();
        context.rect(x * PLAYER_SIZE, y * PLAYER_SIZE, PLAYER_SIZE, PLAYER_SIZE);
        context.closePath();
        context.fillStyle = getStyle(blockType);
        context.fill();
    }

    function isMoveValid(x, y) {
        return (maze.cells[currRectX + x][currRectY + y] == maze.PATH) || (maze.cells[currRectX + x][currRectY + y] == maze.EXIT) || (maze.cells[currRectX + x][currRectY + y] == maze.ENTRANCE);
    }

    function movePlayer(x, y) {
        if (isMoveValid(x, y)) {
            drawBlock(currRectX, currRectY, maze.cells[currRectX][currRectY]);

            currRectX += x;
            currRectY += y;
            drawBlock(currRectX, currRectY, PLAYER);

            if (maze.cells[currRectX][currRectY] == maze.EXIT) {
                alert("You made it!");
            }
        }
    }


    function handleKeyPress(e) {
        var newX = 0;
        var newY = 0;
        var movingAllowed;
        e = e || window.event;
        switch (e.keyCode) {
            case 38: // arrow up key
            case 87: // W key
                newY = -1;
                break;
            case 37: // arrow left key
            case 65: // A key
                newX = -1;
                break;
            case 40: // arrow down key
            case 83: // S key
                newY = 1;
                break;
            case 39: // arrow right key
            case 68: // D key
                newX = 1;
                break;
        }

        if (newX != 0 || newY != 0) {
            movePlayer(newX, newY);
            event.preventDefault();
        }
    }
})();
