define(['imgman'], function (ImgMan) {

    describe('ImgMan', function () {
        it('should be defined', function () {
            expect(ImgMan).toBeDefined();
        });

        it("should load image", function () {
            var im = new ImgMan(), cb = jasmine.createSpy(), img;
            runs(function(){
                im.load('base/test/sample.png', cb);
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

        it("should get cell values from image", function () {
            this.addMatchers({
                argsToBe: function(x, y, txt) {
                    return this.actual.args[0] === x 
                        &&  this.actual.args[1] === y 
                        && this.actual.args[2] === txt;
                }
            });
            var im = new ImgMan(),cb = jasmine.createSpy(), chars;
            runs(function(){
                im.read('base/test/sample.png', cb);
            });
            waitsFor(function() {
                return cb.callCount == 35;
            });
            runs(function(){
                expect(cb.callCount).toBe(35);
                expect(cb.calls[0]).argsToBe(0, 0, '3');
                expect(cb.calls[1]).argsToBe(0, 2, '2');
                expect(cb.calls[2]).argsToBe(0, 3, '1');
                expect(cb.calls[3]).argsToBe(0, 5, '7');
                expect(cb.calls[4]).argsToBe(0, 6, '6');
                expect(cb.calls[5]).argsToBe(1, 0, '1');
                expect(cb.calls[6]).argsToBe(1, 2, '7');
                expect(cb.calls[7]).argsToBe(1, 4, '3');
                expect(cb.calls[8]).argsToBe(2, 4, '6');
                expect(cb.calls[9]).argsToBe(2, 5, '2');
                expect(cb.calls[10]).argsToBe(2, 8, '1');
                expect(cb.calls[11]).argsToBe(3, 5, '4');
                expect(cb.calls[12]).argsToBe(3, 6, '8');
                expect(cb.calls[13]).argsToBe(3, 7, '3');
                expect(cb.calls[14]).argsToBe(3, 8, '7');
                expect(cb.calls[15]).argsToBe(4, 0, '4');
                expect(cb.calls[16]).argsToBe(4, 1, '7');
                expect(cb.calls[17]).argsToBe(4, 4, '1');
                expect(cb.calls[18]).argsToBe(4, 7, '6');
                expect(cb.calls[19]).argsToBe(4, 8, '9');
                expect(cb.calls[20]).argsToBe(5, 0, '2');
                expect(cb.calls[21]).argsToBe(5, 1, '3');
                expect(cb.calls[22]).argsToBe(5, 2, '6');
                expect(cb.calls[23]).argsToBe(5, 3, '7');
                expect(cb.calls[24]).argsToBe(6, 0, '8');
                expect(cb.calls[25]).argsToBe(6, 3, '2');
                expect(cb.calls[26]).argsToBe(6, 4, '5');
                expect(cb.calls[27]).argsToBe(7, 4, '9');
                expect(cb.calls[28]).argsToBe(7, 6, '5');
                expect(cb.calls[29]).argsToBe(7, 8, '6');
                expect(cb.calls[30]).argsToBe(8, 2, '9');
                expect(cb.calls[31]).argsToBe(8, 3, '3');
                expect(cb.calls[32]).argsToBe(8, 5, '8');
                expect(cb.calls[33]).argsToBe(8, 6, '1');
                expect(cb.calls[34]).argsToBe(8, 8, '2');
                
            });
        });        
    });
});