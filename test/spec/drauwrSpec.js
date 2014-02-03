define(['drauwr'], function (Drauwr) {
    describe('Drauwr', function() {
        var draw, ctx = {};
        beforeEach(function() {
            // this.addMatchers(imagediff.jasmine);
            ctx.strokeRect = jasmine.createSpy();
            draw = new Drauwr(ctx);
 
        });
        it('should be defined', function() {
            expect(Drauwr).toBeDefined();
        });

        it('should draw an empty sudoku board', function() {
            draw.emptyBoard();
            expect(ctx.strokeRect).toHaveBeenCalledWith(0, 0, 400, 400);
        });
        it('should draw text into correct cell given coordinate', function() {

        });
        
  // it('should convert be the same image', function () {

  //   var a = document.createElement('img'),
  //        b = document.createElement('img');
  //   a.src = 'base/test/samples/sample.png';
  //   b.src = 'base/test/samples/superHardSample.png';

  //   waitsFor(function () {
  //     return a.complete & b.complete;
  //   }, 'image not loaded.', 2000);

  //   runs(function () {
  //     expect(a).toImageDiffEqual(b); // imagediff expects Image, Canvas, CanvasRenderingContext2D or ImageData
  //   });
  // });
    });
});