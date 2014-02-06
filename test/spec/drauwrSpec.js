require(['drauwr', 'imagediff'], function (Drauwr, imagediff) {
  describe('Drauwr', function() {
    var draw, canvas = document.createElement('canvas');
    beforeEach(function () {
      this.addMatchers(imagediff.jasmine);
      draw = new Drauwr(canvas);
    });
    it('should be defined', function () {
      expect(Drauwr).toBeDefined();
    });

    it('should draw an empty sudoku board', function () {
      var img = document.createElement('img');
      runs(function () {
        img.src = 'resources/blank_board.png';
        draw.emptyBoard();
      });
       waitsFor(function () {
        return img.complete;
      }, 'image not loaded.', 2000);
      runs(function () {
        expect(canvas).toImageDiffEqual(img); 
      });
    });
    it('should draw text into correct cell given coordinate', function () {

    });
      
    // it('should convert be the same image', function () {
    //   var a, b;
    //   runs(function () {
    //     a = document.createElement('img');
    //     b = document.createElement('img');
    //     a.src = 'resources/sample.png';
    //     b.src = 'resources/superHardSample.png';
    //   });
    //   waitsFor(function () {
    //     return a.complete && b.complete;
    //   }, 'image not loaded.', 2000);
    //   runs(function () {
    //     expect(a).toImageDiffEqual(b); // imagediff expects Image, Canvas, CanvasRenderingContext2D or ImageData
    //   });
    // });

  });
});