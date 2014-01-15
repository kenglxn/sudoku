define(['underscore'], function(_) {

    var grid;
    
    var Board = function() {
        grid = [];
        for(var x=0; x<9; x++) {
            grid[x] = [];
            for(var y=0; y<9; y++) {
                grid[x][y] = '' + x + ',' + y;
            }
        }
    };

    Board.prototype.cell = function(x, y) {
        return grid[x][y];
    };

    Board.prototype.ySiblings = function(x, y) {
        var ySibs = grid[x].slice(0);
        ySibs.splice(y, 1);
        return ySibs;
    };

    Board.prototype.xSiblings = function(x, y) {
        var xSibs = [];
        for(var i = 0; i < 9; i++) {
            if(i != x) {
                xSibs.push(grid[i][y]);   
            }
        }
        return xSibs;
    };    

    Board.prototype.subgridSiblings = function(x, y) {
        return [];
    };

    Board.prototype.linkedCells = function(x, y) {
        var ySib = ySiblings(x, y);
        var xSib = xSiblings[x, y];
        return  xSib.concat(ySib);
    };

    return Board;

});