define(['app', 'drauwr','board', 'jquery', 'underscore'], function(App, Drauwr, Board, $, _) {

    describe('App', function() {
        var app, sandbox = $('#sandbox'), fileInput;
        beforeEach(function () {
            fileInput = $('<input id="file" type="file" accept="image/*;capture=camera">');
            sandbox.append($());
            app = new App();
        });

        it('should be defined', function() {
            expect(App).toBeDefined();
        });

        it('should register change listener for file input on init', function() {
            spyOn($.fn, 'change');
            app.init();
            expect($.fn.change).toHaveBeenCalledWith(app.run);
            expect($.fn.change.calls[0].object.selector).toBe('#file');
        });

        it('should initialize board from image and solve', function() {
            spyOn(Drauwr.prototype, 'emptyBoard');
            spyOn(Board.prototype, 'reset');

            app.run();
            expect(Drauwr.prototype.emptyBoard).toHaveBeenCalled();
            expect(Board.prototype.reset).toHaveBeenCalled();
            // create board
            // read image into board
            // draw read board values
            // solve board
            // draw solved values in green
            
        });
    });

});
