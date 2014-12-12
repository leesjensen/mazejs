(function(global) {
    "use strict";

    var jsmaze = global.jsmaze;
    if (!jsmaze) {
        jsmaze = {};
        global.jsmaze = jsmaze;
    }

    jsmaze.generateMaze = function(mazeWidth, mazeHeight) {
        var maze = {
            BOARDER: 99,
            WALL: 0,
            EXIT: 1,
            ENTRANCE: 2,
            PATH: 3,

            cells: [],
            width: (typeof mazeWidth !== 'undefined' ? mazeWidth : 200),
            height: (typeof mazeHeight !== 'undefined' ? mazeHeight : 200)
        }

        initializeMaze(maze);

        return maze;
    }

    function initializeMaze(maze) {

        for (var column = 0; column < maze.width; column++) {
            maze.cells[column] = [];
            for (var row = 0; row < maze.height; row++) {
                var state = ((column == 0 || column == maze.width - 1 || row == 0 || row == maze.height - 1) ? maze.BOARDER : maze.WALL);
                maze.cells[column][row] = state;
            }
        }

        maze.cells[1][0] = maze.WALL;
        maze.cells[maze.width - 2][maze.height - 1] = maze.WALL;

        fillMaze(maze, 1, 0);

        maze.cells[1][0] = maze.ENTRANCE;
        maze.cells[maze.width - 2][maze.height - 1] = maze.EXIT;
    }

    function fillMaze(maze, x, y) {
        var pos = {
            'x': x,
            'y': y
        };

        var pathStack = [];
        pathStack.push(pos);
        maze.cells[pos.x][pos.y] = maze.PATH;

        while (pathStack.length != 0) {
            if (replaceBlock(generateRandomDirectionOperations(), maze, pos, maze.WALL, maze.PATH)) {
                pathStack.push({
                    'x': pos.x,
                    'y': pos.y
                });
            } else {
                pos = pathStack.pop();
            }
        }
    }


    function replaceBlock(operations, maze, pos, match, replace) {
        for (var operationPos = 0; operationPos < operations.length; operationPos++) {
            if (operations[operationPos](maze, pos, match, replace)) {
                return true;
            }
        }

        return false;
    }

    var directionOperations = [
        function(maze, pos, match, replace) {
            if (pos.x + 2 < maze.width && maze.cells[pos.x + 1][pos.y] == match && maze.cells[pos.x + 2][pos.y] == match) {
                maze.cells[pos.x + 1][pos.y] = replace;
                maze.cells[pos.x + 2][pos.y] = replace;
                pos.x += 2;
                console.log("+ right " + match);
                return true;
            }
            console.log("- right " + match);
        },
        function(maze, pos, match, replace) {
            if (pos.x - 2 >= 0 && maze.cells[pos.x - 1][pos.y] == match && maze.cells[pos.x - 2][pos.y] == match) {
                maze.cells[pos.x - 1][pos.y] = replace;
                maze.cells[pos.x - 2][pos.y] = replace;
                pos.x -= 2;
                console.log("+ left " + match);
                return true;
            }
            console.log("- left " + match);
        },
        function(maze, pos, match, replace) {
            if (pos.y + 2 < maze.height && maze.cells[pos.x][pos.y + 1] == match && maze.cells[pos.x][pos.y + 2] == match) {
                maze.cells[pos.x][pos.y + 1] = replace;
                maze.cells[pos.x][pos.y + 2] = replace;
                pos.y += 2;
                console.log("+ down " + match);
                return true;
            }
            console.log("- down " + match);
        },
        function(maze, pos, match, replace) {
            if (pos.y - 2 >= 0 && maze.cells[pos.x][pos.y - 1] == match && maze.cells[pos.x][pos.y - 2] == match) {
                maze.cells[pos.x][pos.y - 1] = replace;
                maze.cells[pos.x][pos.y - 2] = replace;
                pos.y -= 2;
                console.log("+ up " + match);
                return true;
            }
            console.log("- up " + match);
        }
    ];


    function shuffle(array) {
        var currentIndex = array.length,
            temporaryValue, randomIndex;

        while (0 !== currentIndex) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex -= 1;

            temporaryValue = array[currentIndex];
            array[currentIndex] = array[randomIndex];
            array[randomIndex] = temporaryValue;
        }

        return array;
    }


    function generateRandomDirectionOperations() {
        var directionArray = [];
        var directionOperationPos = randomIntFromInterval(0, 3);
        for (var generate = 0; generate < 4; generate++) {
            if (directionOperationPos >= 4) {
                directionOperationPos = 0;
            }

            directionArray.push(directionOperations[directionOperationPos]);

            directionOperationPos++;
        }

        return directionArray;
    }

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

})(this);
