/**
 * Created by kbrann on 10/23/16.
 */

var Grid = (function gridIIFE(window, document) {

    var canvas = document.getElementById("myCanvas");
    var ctx = canvas.getContext("2d");

    // constants
    var GRID_SIZE = canvas.width/10;
    var CELL_COLOR = { // key is occupant type
        1: "#994C12",
        2: "#0095DD"
    };

    // private
    var cells = new Array(GRID_SIZE);
    var cell_occupants = [];

    // draw this single cell as a filled rectangle,
    // with color determined by cell type
    function drawCell(cell) {
        ctx.beginPath();
        ctx.rect(cell.x, cell.y, cell.w, cell.h);
        ctx.fillStyle = CELL_COLOR[cell.type];
        ctx.fill();
        ctx.closePath();
    }

    // expose the following
    return {
        GRID_SIZE: GRID_SIZE,
        // creates fresh, empty grid of size GRID_SIZE
        init: function init() {
            // initialize cells as a GRID_SIZE x GRID_SIZE array
            // of which each cells has a position, size, and type
            for (var x = 0; x < cells.length; x++) {
                cells[x] = new Array(GRID_SIZE);
                for (var y = 0; y < cells[x].length; y++) {
                    cells[x][y] = {
                        x: x*10,
                        y: y*10,
                        w: 10,
                        h: 10,
                        type: 0
                    };
                }
            }
        },

        // go through all cells and if the cell is occupied,
        // draw that cell with it's occupant's corresponding color
        draw: function drawGrid() {
            for (var i = 0; i < cell_occupants.length; i++) {
                drawCell(cells[cell_occupants[i].x][cell_occupants[i].y]);
            }
        },

        // takes an array of occupants each containing
        //    x: x position of the cell
        //    y: y position of the cell
        //    type: type of occupant
        addOccupants: function addOccupants(occupants) {
            for (var i = 0; i < occupants.length; i++) {
                if ((occupants[i].x < 0 || occupants[i].x > cells.length) ||
                    occupants[i].x < 0 || occupants[i].x > cells.length) {
                    throw newError("Out of bounds: could not add occupant to Grid, as its cell position is invalid");
                }
                cell_occupants.push({x: occupants[i].x, y: occupants[i].y });
                cells[occupants[i].x][occupants[i].y].type = occupants[i].type;
            }
        },

        getOccupantType: function getOccupant(x, y) {
            return cells[x][y].type;
        },

        removeOccupant: function removeOccupant(x, y) {
            cells[x][y].type = 0;
            for (var i = 0; i < cell_occupants.length; i++){
                if (cell_occupants[i].x == x && cell_occupants[i].y == y) {
                    cell_occupants.splice(i, 1);
                    return;
                }
            }
        }
    };

}(window, document));