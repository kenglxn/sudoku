define(['app', 'jquery', 'underscore'], function(App, $, _) {

    describe('App', function() {

        it('should be defined', function() {
            expect(App).toBeDefined();
        });

        it('should be constructed by passing an element', function() {
            var app = new App($('<div></div>'));
            
            expect(app).toBeDefined();
        });

        it('should initialize sudoku board', function() {
            var el = $('<div></div>');
            var app = new App(el);
            app.initBoard();

            expect(el.text()).toEqual('BOARD');
        });
    });

});
