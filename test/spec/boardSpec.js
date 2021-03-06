define(['board'], function(Board) {

    describe('Board', function() {

        it('should be defined', function() {
            expect(Board).toBeDefined();
        });

        it('should return cell object for given coordinate', function() {
            var b = new Board();
            for (var x = 0; x < 9; x++) {
                for (var y = 0; y < 9; y++) {
                    var cell = b.cell(x,y);
                    expect(cell).not.toBe(null);
                    expect(cell.x).toBe(x);
                    expect(cell.y).toBe(y);
                    expect(cell.val()).toBe(null);
                }
            }
        });

        it('should find ySiblings for a given coordinate', function() {
            var b = new Board();
            var ySibs = b.ySiblings(0, 0);
            expect(ySibs.length).toBe(8);
            expect(ySibs).toEqual([
                b.cell(0,1),b.cell(0,2),b.cell(0,3),b.cell(0,4),b.cell(0,5),b.cell(0,6),b.cell(0,7),b.cell(0,8)
            ]);
            ySibs = b.ySiblings(3, 3);
            expect(ySibs.length).toBe(8);
            expect(ySibs).toEqual([
                b.cell(3,0),b.cell(3,1),b.cell(3,2),b.cell(3,4),b.cell(3,5),b.cell(3,6),b.cell(3,7),b.cell(3,8)
            ]);
        });

        it('should find xSiblings for a given coordinate', function() {
            var b = new Board();
            var xSibs = b.xSiblings(0, 0);
            expect(xSibs.length).toBe(8);
            expect(xSibs).toEqual([
                b.cell(1,0),b.cell(2,0),b.cell(3,0),b.cell(4,0),b.cell(5,0),b.cell(6,0),b.cell(7,0),b.cell(8,0)
            ]);
            xSibs = b.xSiblings(3, 3);
            expect(xSibs.length).toBe(8);
            expect(xSibs).toEqual([
                b.cell(0,3),b.cell(1,3),b.cell(2,3),b.cell(4,3),b.cell(5,3),b.cell(6,3),b.cell(7,3),b.cell(8,3)
            ]);
        });

        it('should find subgridSiblings for a given coordinate', function(){
            var b = new Board();
            var subSibs = b.subgridSiblings(0, 0);
            expect(subSibs.length).toBe(8);
            expect(subSibs).toEqual([
                b.cell(0,1),b.cell(0,2),
                b.cell(1,0),b.cell(1,1),b.cell(1,2),
                b.cell(2,0),b.cell(2,1),b.cell(2,2)
            ]);
            var subSibs = b.subgridSiblings(3, 3);
            expect(subSibs.length).toBe(8);
            expect(subSibs).toEqual([
                b.cell(3,4),b.cell(3,5),
                b.cell(4,3),b.cell(4,4),b.cell(4,5),
                b.cell(5,3),b.cell(5,4),b.cell(5,5)
            ]);
        });

        it('should return all related cells for a coordinate', function () {
            var b = new Board();
            var linkedCells = b.linkedCells(0, 0);
            expect(linkedCells.length).toBe(20); 
            expect(linkedCells).toEqual([
                b.cell(1,0),b.cell(2,0),b.cell(3,0),b.cell(4,0),b.cell(5,0),b.cell(6,0),b.cell(7,0),b.cell(8,0),
                b.cell(0,1),b.cell(0,2),b.cell(0,3),b.cell(0,4),b.cell(0,5),b.cell(0,6),b.cell(0,7),b.cell(0,8),
                b.cell(1,1),b.cell(1,2),b.cell(2,1),b.cell(2,2)
            ]);
        });

        it('should preserve values set on cells', function () {
            var b = new Board();
            b.cell(5,5).val(9);
            expect(b.cell(5,5).val()).toBe(9);
            expect(b.cell(5,5).possibleValues()).toEqual([]); 
        });

        it('should not have shared state', function () {
            var b = new Board();
            b.cell(5,5).val(9);

            expect(new Board().cell(5,5).val()).toBe(null); 
        });

        it('should return all cells in order as a flat array', function() {
            var b = new Board();
            var cells = b.cells();
            expect(cells.length).toBe(81);
            expect(cells[0]).toBe(b.cell(0,0));
            expect(cells[40]).toBe(b.cell(4,4));
            expect(cells[80]).toBe(b.cell(8,8));
        });

        it('should be able to reset matrix', function() {
            var b = new Board();
            spyOn(Board.prototype, 'matrix');
            b.reset();

            expect(Board.prototype.matrix).toHaveBeenCalledWith([0,1,2,3,4,5,6,7,8], [0,1,2,3,4,5,6,7,8]);
        });

        it('should reset matrix on construction', function() {
            spyOn(Board.prototype, 'reset');
            new Board();
            expect(Board.prototype.reset).toHaveBeenCalled();
        });
    });

});
