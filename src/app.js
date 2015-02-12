define(['jquery', 'drauwr', 'board', 'imgman', 'solver'], function($, Drauwr, Board, ImgMan, Solver) {

    var $file = $('#file'),
          $cog = $('#cog'),
          $info = $cog.find('.info'),
          $canvas = $('#canvas');

    var App = function() {
        this.draw = new Drauwr(document.getElementById('canvas'));
        this.board = new Board();
        this.imgMan = new ImgMan();
        this.solver = new Solver(this.board);
    };

    App.prototype.init = function() {
        var app = this;
        $file.change(function (ev) {
            app.run(this);
        });
    };

    App.prototype.run = function(el) {
        var app = this,
              file = el.files[0];
        $cog.show();
        $canvas.hide();
        app.draw.emptyBoard();
        app.board.reset();
        $info.text('preparing the board');
        app.imgMan.read(file, 
            function(x,y,val) {
                $canvas.show();
                app.board.cell(x, y).val(val);
                app.draw.write(x, y, val);
            },
            function() {
                app.solver.solve(function(x, y, txt) {
                    app.draw.write(x, y, txt, 'green');
                    $cog.hide();
                });
            }
        );
    };

    return App;

});
