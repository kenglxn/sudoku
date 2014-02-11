define(['app', 'drauwr','board', 'imgman', 'solver','jquery'], function(App, Drauwr, Board, ImgMan, Solver, $) {

    describe('App', function() {
        var app, sandbox = $('#sandbox'), fileInput, canvas;
        beforeEach(function () {
            fileInput = $('<input id="file" type="file" accept="image/*;capture=camera">');
            canvas = $('<canvas id="canvas"></canvas>');
            sandbox.append(fileInput);
            sandbox.append(canvas);
            app = new App();
        });
        afterEach(function() {
            sandbox.empty();
        });

        it('should be defined', function() {
            expect(App).toBeDefined();
        });

        it('should register change listener for file input on init', function() {
            spyOn(App.prototype, 'run');
            spyOn($.fn, 'change');
            app.init();
            expect($.fn.change).toHaveBeenCalled();
            expect($.fn.change.calls[0].object.selector).toBe('#file');
            expect(App.prototype.run).not.toHaveBeenCalled();
            $.fn.change.calls[0].args[0]();
            expect(App.prototype.run).toHaveBeenCalled();

        });

        it('should solve board from image', function() {
            spyOn(Board.prototype, 'reset');
            spyOn(Drauwr.prototype, 'emptyBoard');
            spyOn(Drauwr.prototype, 'write');
            spyOn(ImgMan.prototype, 'read').andCallFake(function(file, onRead, onFinish) {
                onRead(1,2,3);
                onFinish();
            })
            spyOn(Solver.prototype, 'solve').andCallFake(function(cb) {
                cb();
            });
            var fileElMock = {
                files: ['foo']
            };
            app.run(fileElMock);
            expect(Drauwr.prototype.emptyBoard).toHaveBeenCalled();
            expect(Board.prototype.reset).toHaveBeenCalled();
            expect(ImgMan.prototype.read).toHaveBeenCalled();
            expect(ImgMan.prototype.read.calls[0].args[0]).toBe(fileElMock.files[0]);
            expect(Solver.prototype.solve).toHaveBeenCalled();
            expect(Drauwr.prototype.write).toHaveBeenCalled();
            
        });
    });
});
