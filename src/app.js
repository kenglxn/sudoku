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
        var app = this;
        app.draw.emptyBoard();
        app.board.reset();
        app.imgMan.read(el.files[0], function(x,y,val) {
            app.cb(x,y,val);
        });
    };

    App.prototype.cb = function(x, y, val){
        this.board.cell(x, y).val(val);
        this.draw.write(x, y, val);
    };

    return App;

});
