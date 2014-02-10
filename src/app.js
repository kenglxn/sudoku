define(['jquery', 'drauwr', 'board'], function($, Drauwr, Board) {

    var App = function() {
        this.draw = new Drauwr($('#canvas'));
        this.board = new Board();
    };

    App.prototype.init = function() {
        $('#file').change(this.run);
    };

    App.prototype.run = function() {
        this.draw.emptyBoard();
        this.board.reset();

    };

    return App;

});
