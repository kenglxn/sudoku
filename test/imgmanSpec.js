define(['imgman'], function (ImgMan) {

    describe('ImgMan', function () {
        it('should be defined', function () {
            expect(ImgMan).toBeDefined();
        });

        it("should load image", function () {
            var im = new ImgMan(), cb = jasmine.createSpy(), img;
            runs(function(){
                img = im.load('base/test/sample.png', cb);
            });
            waitsFor(function() {
                return cb.callCount == 1;
            });
            runs(function() {
                expect(cb).toHaveBeenCalled();
                expect(img).toBeDefined();
                expect(img instanceof HTMLImageElement).toBeTruthy();
                expect(img.complete).toBeTruthy();
            });
        });

        it("should timeout if image not loaded after some time", function () {
            jasmine.Clock.useMock();
            var im = new ImgMan(), chars, timeout = 100;
            runs(function(){
                chars = im.read('someNonExistentImage.png', timeout);
            });  
            runs(function() {
                jasmine.Clock.tick(timeout);
                expect(chars).not.toBeDefined();
            });
        });

        // it("should get cell values from image", function () {
        //     var im = new ImgMan();
        //     var chars = im.read('base/test/sample.png');
        //     expect(chars).toBeDefined();
        //     expect(chars.length).toBe(81);
        //     expect(chars[0]).toBe('');       // coord 0,0
        //     expect(chars[8]).toBe('2');     // coord 8,0
        //     expect(chars[40]).toBe('1');   // coord 4,4
        //     expect(chars[72]).toBe('3');   // coord 0,8
        //     expect(chars[80]).toBe('');     // coord 8,8
        // });        
    });
});