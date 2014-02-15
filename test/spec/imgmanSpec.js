define(['imgman'], function (ImgMan) {

    describe('ImgMan', function () {
        it('should be defined', function () {
            expect(ImgMan).toBeDefined();
        });

        it("should load image", function () {
            var im = new ImgMan(), cb = jasmine.createSpy(), img;
            runs(function(){
                im.load('resources/sample.png', cb);
            });
            waitsFor(function() {
                return cb.callCount == 1;
            });
            runs(function() {
                expect(cb.callCount).toBe(1);
                expect(cb.calls[0].args.length).toBe(1);
                img = cb.calls[0].args[0];
                expect(img).toBeDefined();
                expect(img instanceof HTMLImageElement).toBeTruthy();
                expect(img.complete).toBeTruthy();
            });
        });

        it('should load image from file', function() {
           var img,
                 mockFile,
                 im = new ImgMan(), 
                 cb = jasmine.createSpy('cb'), 
                 readAsDataURLSpy = jasmine.createSpy('readDataAsURL').andCallFake(function(file){
                    this.result = file.name;
                    this.onload();
                 });
            spyOn(window, "FileReader").andReturn({
                readAsDataURL: readAsDataURLSpy
            }),
            mockFile = {
                constructor: File,
                name: 'resources/sample.png'
            };

            runs(function(){
                im.load(mockFile, cb);
            });
            waitsFor(function() {
                return cb.callCount == 1;
            }, 5000);
            runs(function() {
                expect(readAsDataURLSpy).toHaveBeenCalledWith(mockFile);
                expect(cb.callCount).toBe(1);
                expect(cb.calls[0].args.length).toBe(1);
                img = cb.calls[0].args[0];
                expect(img).toBeDefined();
                expect(img instanceof HTMLImageElement).toBeTruthy();
                expect(img.complete).toBeTruthy();
            }); 
        });

        it('should call crop from load callback in read', function () {
            var img = 'img', 
                  onRead = 'onRead',
                  cropped = 'cropped',
                  onFinish = 'onFinish',
                  imgMan = new ImgMan();
            spyOn(imgMan, 'readDigitsFromImage');
            spyOn(imgMan, 'load').andCallFake(function (wat, cb) { cb(img); });
            spyOn(imgMan, 'crop').andCallFake(function() { return cropped });

            imgMan.read(null, onRead, onFinish);

            expect(imgMan.load).toHaveBeenCalled();
            expect(imgMan.crop).toHaveBeenCalledWith(img);
            expect(imgMan.readDigitsFromImage).toHaveBeenCalledWith(cropped, onRead, onFinish);
        });

        it("should get cell values from image", function () {
            this.addMatchers({
                argsToBe: function(x, y, val) {
                    return this.actual.args[0] === x 
                        &&  this.actual.args[1] === y 
                        && this.actual.args[2] === val;
                }
            });
            var im = new ImgMan(), onRead = jasmine.createSpy(), onFinish = jasmine.createSpy(), chars;
            runs(function(){
                im.read('resources/sample.png', onRead, onFinish);
            });
            waitsFor(function() {
                return onFinish.callCount == 1;
            });
            runs(function(){
                expect(onFinish.callCount).toBe(1);
                expect(onRead.callCount).toBe(35);
                expect(onRead.calls[0]).argsToBe(0, 0, 3);
                expect(onRead.calls[1]).argsToBe(0, 2, 2);
                expect(onRead.calls[2]).argsToBe(0, 3, 1);
                expect(onRead.calls[3]).argsToBe(0, 5, 7);
                expect(onRead.calls[4]).argsToBe(0, 6, 6);
                expect(onRead.calls[5]).argsToBe(1, 0, 1);
                expect(onRead.calls[6]).argsToBe(1, 2, 7);
                expect(onRead.calls[7]).argsToBe(1, 4, 3);
                expect(onRead.calls[8]).argsToBe(2, 4, 6);
                expect(onRead.calls[9]).argsToBe(2, 5, 2);
                expect(onRead.calls[10]).argsToBe(2, 8, 1);
                expect(onRead.calls[11]).argsToBe(3, 5, 4);
                expect(onRead.calls[12]).argsToBe(3, 6, 8);
                expect(onRead.calls[13]).argsToBe(3, 7, 3);
                expect(onRead.calls[14]).argsToBe(3, 8, 7);
                expect(onRead.calls[15]).argsToBe(4, 0, 4);
                expect(onRead.calls[16]).argsToBe(4, 1, 7);
                expect(onRead.calls[17]).argsToBe(4, 4, 1);
                expect(onRead.calls[18]).argsToBe(4, 7, 6);
                expect(onRead.calls[19]).argsToBe(4, 8, 9);
                expect(onRead.calls[20]).argsToBe(5, 0, 2);
                expect(onRead.calls[21]).argsToBe(5, 1, 3);
                expect(onRead.calls[22]).argsToBe(5, 2, 6);
                expect(onRead.calls[23]).argsToBe(5, 3, 7);
                expect(onRead.calls[24]).argsToBe(6, 0, 8);
                expect(onRead.calls[25]).argsToBe(6, 3, 2);
                expect(onRead.calls[26]).argsToBe(6, 4, 5);
                expect(onRead.calls[27]).argsToBe(7, 4, 9);
                expect(onRead.calls[28]).argsToBe(7, 6, 5);
                expect(onRead.calls[29]).argsToBe(7, 8, 6);
                expect(onRead.calls[30]).argsToBe(8, 2, 9);
                expect(onRead.calls[31]).argsToBe(8, 3, 3);
                expect(onRead.calls[32]).argsToBe(8, 5, 8);
                expect(onRead.calls[33]).argsToBe(8, 6, 1);
                expect(onRead.calls[34]).argsToBe(8, 8, 2);
                
            });
        });        
    });
});