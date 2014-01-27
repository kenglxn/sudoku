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
                expect(img instanceof HTMLImageElement).toBeTruthy();
                expect(img).toBeDefined();
                expect(img.complete).toBeTruthy();
            });
        });
    });
});