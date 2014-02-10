require(['drauwr', 'imagediff'], function (Drauwr, imagediff) {
  describe('Drauwr', function() {
    var draw, canvas = document.createElement('canvas'), timeout = 5000;
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
      }, 'image not loaded.', timeout);
      runs(function () {
        expect(canvas).toImageDiffEqual(img, 1); 
      });
    });
    it('should draw text into correct cell given coordinate with default fillStyle', function () {
      var img = document.createElement('img');
      runs(function () {
        img.src = 'resources/9_at_4_4_black.png';
        draw.emptyBoard();
        draw.write(9, 4, 4);
      });
      waitsFor(function () {
        return img.complete;
      }, 'image not loaded.', timeout);
      runs(function () {
        expect(canvas).toImageDiffEqual(img, 1); 
      });
    });  
    it('should draw text into correct cell given coordinate and override fillstyle', function () {
      var img = document.createElement('img');
      runs(function () {
        img.src = 'resources/1_at_2_3_red.png';
        draw.emptyBoard();
        draw.write(1, 2, 3, 'red');
      });
      waitsFor(function () {
        return img.complete;
      }, 'image not loaded.', timeout);
      runs(function () {
        expect(canvas).toImageDiffEqual(img, 1); 
      });
    });  
  });
});