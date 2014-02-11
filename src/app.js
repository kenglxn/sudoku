define(['jquery', 'drauwr', 'board', 'imgman', 'solver'], function($, Drauwr, Board, ImgMan, Solver) {

    var App = function() {
        this.draw = new Drauwr(document.getElementById('canvas'));
        this.board = new Board();
        this.imgMan = new ImgMan();
        this.solver = new Solver(this.board);
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

        app.imgMan.read(el.files[0], 
            function(x,y,val) {
                app.board.cell(x, y).val(val);
                app.draw.write(x, y, val);
            },
            function() {
                app.solver.solve(function(x, y, txt) {
                    app.draw.write(x, y, txt, 'green');
                });
            }
        );
    };

    return App;

});
