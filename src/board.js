define(['underscore'], function(_) {

    var Board = function() {
        this.grid = this.matrix([0,1,2,3,4,5,6,7,8], [0,1,2,3,4,5,6,7,8]);
    };
    
    Board.prototype.newCell = function(x, y){
        var that = this;
        return (function (){
            var val = null;
            var possibleValues = [1,2,3,4,5,6,7,8,9];
            return {
                x: x,
                y:y,
                val: function (newVal) {
                    if(newVal) {
                        if(!_.contains(possibleValues, newVal) ) {
                            throw 'illegal value, not in possibleValues';
                        }
                        if(_.contains(_.map(that.linkedCells(x, y), function(cell) {cell.val()}), newVal)) {
                            throw 'illegal value, exists in linked cell'
                        }
                        val = newVal;
                        possibleValues = [];
                    }
                    return val;
                },
                possibleValues: function(newValues) { 
                    if(newValues) {
                        possibleValues = newValues;
                    }
                    return possibleValues; 
                }
            };
        }());
    };

    Board.prototype.matrix = function(xRange, yRange) {
        var matrix = [], that = this;
        _.each(xRange, function(x) {
            matrix[x] = [];
            _.each(yRange, function(y) {
                var cell = (_.isArray(that.grid) && _.isArray(that.grid[x])) ? that.grid[x][y] : that.newCell(x, y);
                matrix[x][y] = cell;
            });
        }); 
        return matrix;  
    };    

    Board.prototype.cell = function(x, y) {
        return this.grid[x][y];
    };

    Board.prototype.cells = function() {
        return _.flatten(this.grid);
    };

    Board.prototype.ySiblings = function(x, y) {
        return _.without(this.grid[x], this.cell(x, y));
    };

    Board.prototype.xSiblings = function(x, y) {
        var xSibs = [];
        for(var i = 0; i < 9; i++) {
            xSibs.push(this.grid[i][y]);   
        }
        return _.without(xSibs, this.cell(x, y));
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
        return _.without(_.flatten(this.matrix(xRange, yRange)), this.cell(x, y)); 
    };

    Board.prototype.linkedCells = function(x, y) {
        var ySib = this.ySiblings(x, y);
        var xSib = this.xSiblings(x, y);
        var subSib = this.subgridSiblings(x, y);
        return  _.union(xSib, ySib, subSib);
    };

    Board.prototype.isValid = function() {
        var that = this;
        _.each(that.cells(), function (cell) {
                var linkedCells = that.linkedCells(cell.x, cell.y);
                var valueExistsInLinkedCell = _.contains(_.map(linkedCells, function(lc) {lc.val()}), cell.val());
                if (valueExistsInLinkedCell) {
                    return false;
                }
        });
        return true;
    };

    return Board;

});