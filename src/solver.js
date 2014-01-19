define(['underscore'], function(_) {
    var board;

    var Solver = function() {};

    var unsolvedCells = function (board) {
        return _.filter(board.cells(), function(cell){ return cell.val == null; });
    };

    Solver.prototype.solve = function (board) {
        var valuesSet = 0;
        console.log('starting iteration');
        _.each(unsolvedCells(board), function(cell) {
            if(!cell.possibleValues) {
                cell.possibleValues = [1,2,3,4,5,6,7,8,9];
            }
            var linkedCells = board.linkedCells(cell.x, cell.y);
            var reduced = _.reduce(linkedCells, function(memo, cell) { 
                console.log(memo, cell);
                return _.without(memo, cell.val) 
            }, cell.possibleValues);
            cell.possibleValues = reduced;
            if(reduced.length == 1) {
                console.log('setting value', reduced);
                cell.value = reduced[0];
                valuesSet++;
            } else {
                console.log('unable to reduce to single possible value.', reduced);
            }
        });
        if(valuesSet > 0) {
            this.solve(board);
        } else {
            console.log('processed all cells without being able to determine a value, need to implement guess to solve this one');
        }
        return board;
    };

    return Solver;
});