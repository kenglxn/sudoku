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
            var im = new ImgMan(),cb = jasmine.createSpy(), chars;
            runs(function(){
                im.read('base/test/sample.png', cb);
            });
            waitsFor(function() {
                return cb.callCount == 1;
            });
            runs(function(){
                expect(cb.callCount).toBe(1);
                expect(cb.calls[0].args.length).toBe(1);
                chars = cb.calls[0].args[0];
                expect(chars).toBeDefined();
                expect(chars.length).toBe(81);
                expect(chars[0]).toBe('3');
                expect(chars[1]).toBe('');
                expect(chars[2]).toBe('2');
                expect(chars[3]).toBe('1');
                expect(chars[4]).toBe('');
                expect(chars[5]).toBe('7');
                expect(chars[6]).toBe('6');
                expect(chars[7]).toBe('');
                expect(chars[8]).toBe('');
                expect(chars[9]).toBe('1');
                expect(chars[10]).toBe('');
                expect(chars[11]).toBe('7');
                expect(chars[12]).toBe('');
                expect(chars[13]).toBe('3');
                expect(chars[14]).toBe('');
                expect(chars[15]).toBe('');
                expect(chars[16]).toBe('');
                expect(chars[17]).toBe('');
                expect(chars[18]).toBe('');
                expect(chars[19]).toBe('');
                expect(chars[20]).toBe('');
                expect(chars[21]).toBe('');
                expect(chars[22]).toBe('6');
                expect(chars[23]).toBe('2');
                expect(chars[24]).toBe('');
                expect(chars[25]).toBe('');
                expect(chars[26]).toBe('1');
                expect(chars[27]).toBe('');
                expect(chars[28]).toBe('');
                expect(chars[29]).toBe('');
                expect(chars[30]).toBe('');
                expect(chars[31]).toBe('');
                expect(chars[32]).toBe('4');
                expect(chars[33]).toBe('8');
                expect(chars[34]).toBe('3');
                expect(chars[35]).toBe('7');
                expect(chars[36]).toBe('4');
                expect(chars[37]).toBe('7');
                expect(chars[38]).toBe('');
                expect(chars[39]).toBe('');
                expect(chars[40]).toBe('1');
                expect(chars[41]).toBe('');
                expect(chars[42]).toBe('');
                expect(chars[43]).toBe('6');
                expect(chars[44]).toBe('9');
                expect(chars[45]).toBe('2');
                expect(chars[46]).toBe('3');
                expect(chars[47]).toBe('6');
                expect(chars[48]).toBe('7');
                expect(chars[49]).toBe('');
                expect(chars[50]).toBe('');
                expect(chars[51]).toBe('');
                expect(chars[52]).toBe('');
                expect(chars[53]).toBe('');
                expect(chars[54]).toBe('8');
                expect(chars[55]).toBe('');
                expect(chars[56]).toBe('');
                expect(chars[57]).toBe('2');
                expect(chars[58]).toBe('5');
                expect(chars[59]).toBe('');
                expect(chars[60]).toBe('');
                expect(chars[61]).toBe('');
                expect(chars[62]).toBe('');
                expect(chars[63]).toBe('');
                expect(chars[64]).toBe('');
                expect(chars[65]).toBe('');
                expect(chars[66]).toBe('');
                expect(chars[67]).toBe('9');
                expect(chars[68]).toBe('');
                expect(chars[69]).toBe('5');
                expect(chars[70]).toBe('');
                expect(chars[71]).toBe('6');
                expect(chars[72]).toBe('');
                expect(chars[73]).toBe('');
                expect(chars[74]).toBe('9');
                expect(chars[75]).toBe('3');
                expect(chars[76]).toBe('');
                expect(chars[77]).toBe('8');
                expect(chars[78]).toBe('1');
                expect(chars[79]).toBe('');
                expect(chars[80]).toBe('2');
            });
        });        
    });
});