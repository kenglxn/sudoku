define(['app', 'drauwr','board', 'imgman', 'jquery'], function(App, Drauwr, Board, ImgMan, $) {

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

        it('should have callback that can be used to write values to board and draw them to canvas', function() {
            var cellMock = {
                val: jasmine.createSpy()
            }, x = 1, y = 2, val = 3;
            spyOn(Drauwr.prototype, 'write');
            spyOn(Board.prototype, 'cell').andReturn(cellMock); 

            app.cb(x, y, val);
            expect(Board.prototype.cell).toHaveBeenCalledWith(x, y);
            expect(cellMock.val).toHaveBeenCalledWith(val);
            expect(Drauwr.prototype.write).toHaveBeenCalledWith(x, y, val);
        });

        it('should initialize board from image and solve', function() {
            spyOn(App.prototype, 'cb');
            spyOn(Drauwr.prototype, 'emptyBoard');
            spyOn(Board.prototype, 'reset');
            spyOn(ImgMan.prototype, 'read');
            var fileElMock = {
                files: ['foo']
            };
            app.run(fileElMock);
            expect(Drauwr.prototype.emptyBoard).toHaveBeenCalled();
            expect(Board.prototype.reset).toHaveBeenCalled();
            expect(ImgMan.prototype.read).toHaveBeenCalled();
            expect(ImgMan.prototype.read.calls[0].args[0]).toBe(fileElMock.files[0]);
            expect(App.prototype.cb).not.toHaveBeenCalled();
            ImgMan.prototype.read.calls[0].args[1]();
            expect(App.prototype.cb).toHaveBeenCalled();
            // solve board
            // draw solved values in green
            
        });
    });
});
