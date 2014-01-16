define(['underscore'], function(_) {

    var grid;

    var Board = function() {
        grid = matrix([0,1,2,3,4,5,6,7,8], [0,1,2,3,4,5,6,7,8]);
    };

    var cell = function(x, y){
        return '' + x + ',' + y;
    };

    var matrix = function(xRange, yRange) {
        var matrix = [];
        for(x in xRange) {
            matrix[x] = [];
            for(y in yRange) {
                matrix[x][y] = cell(x, y);
            }
        }; 
        return matrix;  
    };    

    Board.prototype.cell = function(x, y) {
        return grid[x][y];
    };

    Board.prototype.ySiblings = function(x, y) {
        return grid[x];
    };

    Board.prototype.xSiblings = function(x, y) {
        var xSibs = [];
        for(var i = 0; i < 9; i++) {
            xSibs.push(grid[i][y]);   
        }
        return xSibs;
    };    

    Board.prototype.subgridSiblings = function(x, y) {
        _.each([[0,1,2],[3,4,5],[6,7,8]], function(range) {
            if(_.contains(range, x)) {
                xRange = range;
            }
            if(_.contains(range, y)) {
                yRange = range;
            }
        });
        return _.flatten(matrix(xRange, yRange));
    };

    Board.prototype.linkedCells = function(x, y) {
        var ySib = ySiblings(x, y);
        var xSib = xSiblings[x, y];
        return  xSib.concat(ySib);
    };

    return Board;

});