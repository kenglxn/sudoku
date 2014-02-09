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
        expect(canvas).toImageDiffEqual(img, 1); 
      });
    });
    it('should draw text into correct cell given coordinate', function () {

    });  
  });
});