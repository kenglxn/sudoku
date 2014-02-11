define(['underscore'], function(_) {
    var Solver = function(b) {
        this.board = b;
    };

    Solver.prototype.unsolvedCells = function () {
        return _.filter(this.board.cells(), function(cell){ return cell.val() == null; });
    };

    count = 1;
    Solver.prototype.solve = function (cb) {
        var s = this,
              valuesSet = 0;
        _.each(this.unsolvedCells(), function(cell) {
            var possibleValues = _.reduce(s.board.linkedCells(cell.x, cell.y), function(memo, rc) { 
                return _.without(memo, rc.val()) ;
            }, cell.possibleValues());
            if(possibleValues.length > 0) {
                cell.possibleValues(possibleValues);
            }
            if(cell.possibleValues().length == 1) {
                cell.val(cell.possibleValues()[0]);
                cb(cell.x, cell.y, cell.val());
                valuesSet++;
            }
        });
        _.each(this.unsolvedCells(), function(cell) {
            _.each(cell.possibleValues(), function(possibleValue) {
                if(!cell.val()) {
                    var isPossibleOnXSib = false, isPossibleOnYSib = false, isPossibleOnSubSib = false;
                    _.each(s.board.xSiblings(cell.x, cell.y), function (xSib) {
                        if(_.contains(xSib.possibleValues(), possibleValue)) {
                            isPossibleOnXSib = true;
                        }
                    });
                    _.each(s.board.ySiblings(cell.x, cell.y), function (ySib) {
                        if(_.contains(ySib.possibleValues(), possibleValue)) {
                            isPossibleOnYSib = true;
                        }
                    });
                    _.each(s.board.subgridSiblings(cell.x, cell.y), function (subSib) {
                        if(_.contains(subSib.possibleValues(), possibleValue)) {
                            isPossibleOnSubSib = true;
                        }
                    });
                    if(cell.applicable(possibleValue) && (!isPossibleOnXSib || !isPossibleOnYSib || !isPossibleOnSubSib)) {
                        cell.val(possibleValue);
                        cb(cell.x, cell.y, cell.val());
                        valuesSet++;
                    }
                }
            });
        });
        if(valuesSet > 0) {
            s.solve(cb);
        }
        return s.board;
    };

    return Solver;
});