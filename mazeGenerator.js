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
            NEWPATH: 4,

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

        maze.cells[1][0] = maze.ENTRANCE;
        maze.cells[maze.width - 2][maze.height - 1] = maze.EXIT;

        fillMaze(maze, 1, 0);
    }

    function fillMaze(maze, x, y) {
        var cells = maze.cells;
        var pos = { 'x':x, 'y':y };

        while (true) {
        	if (!replaceBlock(maze.cells, pos, maze.WALL, maze.NEWPATH)) {
	        	if (!replaceBlock(maze.cells, pos, maze.NEWPATH, maze.PATH)) {
	        		break;
	        	}
        	}
        }
    }


    function replaceBlock(cells, pos, match, replace) {
        if (cells[pos.x + 1][pos.y] == match && cells[pos.x + 2][pos.y] == match) {
            cells[pos.x + 1][pos.y] = replace;
            cells[pos.x + 2][pos.y] = replace;
            pos.x += 2;
        } else if (cells[pos.x - 1][pos.y] == match && cells[pos.x - 2][pos.y] == match) {
            cells[pos.x - 1][pos.y] = replace;
            cells[pos.x - 2][pos.y] = replace;
            pos.x -= 2;
        } else if (cells[pos.x][pos.y + 1] == match && cells[pos.x][pos.y + 2] == match) {
            cells[pos.x][pos.y + 1] = replace;
            cells[pos.x][pos.y + 2] = replace;
            pos.y += 2;
        } else if (cells[pos.x][pos.y - 1] == match && cells[pos.x][pos.y - 2] == match) {
            cells[pos.x][pos.y - 1] = replace;
            cells[pos.x][pos.y - 2] = replace;
            pos.y -= 2;
        } else {
            return false;
        }

        return true;
    }

})(this);
