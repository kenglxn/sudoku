define(['underscore'], function(_) {
    var board;
    var Solver = function(b) {
        board = b;
    };

    Solver.prototype.unsolvedCells = function () {
        return _.filter(board.cells(), function(cell){ return cell.val() == null; });
    };

    Solver.prototype.solve = function (inRecursion) {
        var valuesSet = 0;
        _.each(this.unsolvedCells(), function(cell) {
            var possibleValues = _.reduce(board.linkedCells(cell.x, cell.y), function(memo, rc) { 
                return _.without(memo, rc.val()) ;
            }, cell.possibleValues());
            if(possibleValues.length > 0) {
                cell.possibleValues(possibleValues);
            }
            if(cell.possibleValues().length == 1) {
                cell.val(cell.possibleValues()[0]);
                valuesSet++;
            }
        });
        _.each(this.unsolvedCells(), function(cell) {
            _.each(cell.possibleValues(), function(possibleValue) {
                if(!cell.val()) {
                    var isPossibleOnXSib = false, isPossibleOnYSib = false, isPossibleOnSubSib = false;
                    _.each(board.xSiblings(cell.x, cell.y), function (xSib) {
                        if(_.contains(xSib.possibleValues(), possibleValue)) {
                            isPossibleOnXSib = true;
                        }
                    });
                    _.each(board.ySiblings(cell.x, cell.y), function (ySib) {
                        if(_.contains(ySib.possibleValues(), possibleValue)) {
                            isPossibleOnYSib = true;
                        }
                    });
                    _.each(board.subgridSiblings(cell.x, cell.y), function (subSib) {
                        if(_.contains(subSib.possibleValues(), possibleValue)) {
                            isPossibleOnSubSib = true;
                        }
                    });
                    if(!isPossibleOnXSib || !isPossibleOnYSib || !isPossibleOnSubSib) {
                        cell.val(possibleValue);
                        valuesSet++;
                    }
                }
            });
        });
        if(valuesSet > 0) {
            this.solve(true);
        }
        return board;
    };

    return Solver;
});