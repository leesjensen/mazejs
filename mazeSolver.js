(function(global) {
    "use strict";

    var jsmaze = global.jsmaze;
    if (!jsmaze) {
        jsmaze = {};
        global.jsmaze = jsmaze;
    }

    jsmaze.solveMaze = function(maze) {
        var pos = createPos(1, 0);

        var pathStack = [];
        pathStack.push(pos);

        while (true) {
            maze.cells[pos.x][pos.y] = maze.TRACE;
            jsmaze.drawBlock(maze, pos.x, pos.y, maze.TRACE);
            var moves = getMoves(moveOperations, maze, pos);
            while (moves.length > 0) {
                pathStack.push(moves.pop());
            }

            pos = pathStack.pop();
            if (pos == undefined) {
                return false;
            } else if (maze.cells[pos.x][pos.y] == maze.EXIT) {
                return true;
            }
        }
    }


    function getMoves(operations, maze, pos) {
        var moves = [];
        for (var operationPos = 0; operationPos < operations.length; operationPos++) {
            var move = operations[operationPos](maze, pos);
            if (move != undefined) {
                moves.push(move);
            }
        }

        return moves;
    }


    var moveOperations = [
        function(maze, pos) {
            if (maze.cells[pos.x + 1][pos.y] & (maze.PATH | maze.EXIT)) {
                return createPos(pos.x + 1, pos.y);
            }
        },
        function(maze, pos) {
            if (maze.cells[pos.x][pos.y + 1] & (maze.PATH | maze.EXIT)) {
                return createPos(pos.x, pos.y + 1);
            }
        },
        function(maze, pos) {
            if (maze.cells[pos.x - 1][pos.y] & (maze.PATH | maze.EXIT)) {
                return createPos(pos.x - 1, pos.y);
            }
        },
        function(maze, pos) {
            if (maze.cells[pos.x][pos.y - 1] & (maze.PATH | maze.EXIT)) {
                return createPos(pos.x, pos.y - 1);
            }
        }
    ];


    function createPos(x, y) {
        return {
            'x': x,
            'y': y
        };
    }

})(this);
