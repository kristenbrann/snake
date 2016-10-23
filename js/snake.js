/**
 * Created by kbrann on 10/23/16.
 */
var Snake = (function SnakeIIFE(window, document) {

    // snakes move 1 cell at a time in whichever direction they are going
    var MOVE = {
        UP: {dx:0, dy:1},
        DOWN: {dx:0, dy:-1},
        LEFT: {dx:-1, dy:0},
        RIGHT: {dx:1 , dy:0}
    };
    // direction defaults to right for start of game
    var moveDirection = MOVE.RIGHT;

    // snake array to manage snake cells
    var snake;

    // returns random x and y coordinates within given grid size
    function getRandomPosition(grid_size) {
        return {
            x: Math.round(Math.random()*(grid_size-1)),
            y: Math.round(Math.random()*(grid_size-1))
        }
    }

    // generates food cell at random position on grid
    function generateFood() {
        var food_pos = getRandomPosition(Grid.GRID_SIZE);
        return { x: food_pos.x, y: food_pos.y, type: 1 };
    }

    // move the snake according to the current direction it is going
    function moveSnake() {
        // go head to tail and move each cell
        for (var s = 0; s < snake.length; s ++) {
            // empty it's past cell
            Grid.removeOccupant(snake[s].x, snake[s].y);

            // get snakes new coordinates
            snake[s].x += moveDirection.dx;
            snake[s].y += moveDirection.dy;
            if (!(snake[s].x < Grid.GRID_SIZE)) {
                snake[s].x = 0;
            }
            if (!(snake[s].y < Grid.GRID_SIZE)) {
                snake[s].y = 0;
            }
            if (snake[s].x < 0) {
                snake[s].x = Grid.GRID_SIZE-1;
            }
            if (snake[s].y < 0) {
                snake[s].y = Grid.GRID_SIZE-1;
            }

            // check if new coordinates are food
            if (Grid.getOccupantType(snake[s].x, snake[s].y) == 1) {
                Grid.removeOccupant(snake[s].x, snake[s].y);
                // the snake ate the food! must add more!
                Grid.addOccupants([generateFood()]);
            }
            // fill the snake's new cell
            Grid.addOccupants(snake);
        }
    }

    // event listeners for key presses to change direction of the snake
    document.addEventListener("keydown", keyDownHandler, false);
    function keyDownHandler(e) {
        if(e.keyCode == 39) {
            moveDirection = MOVE.RIGHT;
        }
        else if(e.keyCode == 37) {
            moveDirection = MOVE.LEFT;
        }
        else if(e.keyCode == 38) {
            moveDirection = MOVE.DOWN;
        }
        else if(e.keyCode == 40) {
            moveDirection = MOVE.UP;
        }
    }

    return {
        playSnake: function playSnake(canvas) {
            var ctx = canvas.getContext("2d");

            // initialize snake at random position on grid
            snake = new Array(1);
            var snake_start_pos = getRandomPosition(Grid.GRID_SIZE);
            for (var s = 0; s < snake.length; s++) {
                snake[s] = { x: snake_start_pos.x - s, y: snake_start_pos.y, type: 2 };
            }

            // initialize grid with snake and food
            Grid.init();
            Grid.addOccupants(snake);
            Grid.addOccupants([generateFood()]);

            // clear canvas and redraw every 100 milliseconds
            function draw() {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                Grid.draw();
                moveSnake();
            }
            setInterval(draw, 100);
        }
    };

})(window, document);
