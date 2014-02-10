define(['jquery', 'drauwr', 'board', 'imgman'], function($, Drauwr, Board, ImgMan) {

    var App = function() {
        this.draw = new Drauwr(document.getElementById('canvas'));
        this.board = new Board();
        this.imgMan = new ImgMan();
    };

    App.prototype.init = function() {
        var app = this;
        $('#file').change(function( ) {
            app.run(this);
        });
    };

    App.prototype.run = function(el) {
        this.draw.emptyBoard();
        this.board.reset();
        this.imgMan.read(el.files[0]);
    };

    return App;

});
