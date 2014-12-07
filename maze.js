(function() {
    var mazeApp = angular.module("maze", []);

    mazeApp.controller("MazeController", function() {
        var canvas = document.getElementById("mazecanvas");
        var context = canvas.getContext("2d");
        var currRectX = 10;
        var currRectY = 10;

        var PLAYER_SIZE = 15;

        drawMaze();
                movePlayer(0, 0, "#0000FF");
        window.addEventListener("keydown", handleKeyPress, true);

        function drawMaze() {
            makeWhite(0, 0, canvas.width, canvas.height);
            context.clearRect(currRectX, currRectY, PLAYER_SIZE, PLAYER_SIZE);
            context.beginPath();

            context.rect(0, 0, canvas.width, canvas.height);

            context.closePath();
            context.fillStyle = "black";
            context.fill();
        }


        function movePlayer(x, y, style) {
            context.clearRect(currRectX, currRectY, PLAYER_SIZE, PLAYER_SIZE);
            context.beginPath();

            currRectX += x;
            currRectY += y;
            context.rect(currRectX, currRectY, PLAYER_SIZE, PLAYER_SIZE);

            context.closePath();
            context.fillStyle = style;
            context.fill();
        }


        function handleKeyPress(e) {
            var newX = 0;
            var newY = 0;
            var movingAllowed;
            e = e || window.event;
            switch (e.keyCode) {
                case 38: // arrow up key
                case 87: // W key
                    newY = -PLAYER_SIZE;
                    break;
                case 37: // arrow left key
                case 65: // A key
                    newX = -PLAYER_SIZE;
                    break;
                case 40: // arrow down key
                case 83: // S key
                    newY = PLAYER_SIZE;
                    break;
                case 39: // arrow right key
                case 68: // D key
                    newX = PLAYER_SIZE;
                    break;
            }

            if (newX != 0 || newY != 0) {
                movePlayer(newX, newY, "#0000FF");
                event.preventDefault();
            }
        }


        function makeWhite(x, y, w, h) {
            context.beginPath();
            context.rect(x, y, w, h);
            context.closePath();
            context.fillStyle = "white";
            context.fill();
        }


    });
})();
