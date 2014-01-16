define(['underscore'], function(_) {


    /** privates **/

    var grid;

    var newCell = function(x, y){
        return {x: x,y:y,val:null};
    };

    var matrix = function(xRange, yRange) {
        var matrix = [];
        _.each(xRange, function(x) {
            matrix[x] = [];
            _.each(yRange, function(y) {
                var cell = (_.isArray(grid) && _.isArray(grid[x])) ? grid[x][y] : newCell(x, y);
                matrix[x][y] = cell;
            });
        }); 
        return matrix;  
    };    

    /** publics **/

    var Board = function() {
        grid = matrix([0,1,2,3,4,5,6,7,8], [0,1,2,3,4,5,6,7,8]);
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
        var ySib = this.ySiblings(x, y);
        var xSib = this.xSiblings(x, y);
        var subSib = this.subgridSiblings(x, y);
        return  _.union(xSib, ySib, subSib);
    };

    return Board;

});