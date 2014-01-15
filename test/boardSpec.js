define(['board'], function(Board) {

    describe('Board', function() {

        it('should be defined', function() {
            expect(Board).toBeDefined();
        });

        it('should return cell object for given coordinate', function() {
            board = new Board();
            for (var x = 0; x < 9; x++) {
                for (var y = 0; y < 9; y++) {
                    var cell = board.cell(x,y);
                    expect(cell).not.toBe(null);
                    expect(cell).toBe('' + x + ',' + y);
                }
            }
        });

        it('should find ySiblings for a given coordinate', function() {
            board = new Board();
            var ySibs = board.ySiblings(0, 0);
            expect(ySibs).not.toContain('0,0')
            expect(ySibs.length).toBe(8);
            expect(ySibs).toEqual([
                '0,1','0,2','0,3','0,4','0,5','0,6','0,7','0,8'
            ]);
            ySibs = board.ySiblings(3, 3);
            expect(ySibs).not.toContain('3,3')
            expect(ySibs.length).toBe(8);
            expect(ySibs).toEqual([
                '3,0','3,1','3,2','3,4','3,5','3,6','3,7','3,8'
            ]);
        });

        it('should find xSiblings for a given coordinate', function() {
            board = new Board();
            var xSibs = board.xSiblings(0, 0);
            expect(xSibs).not.toContain('0,0')
            expect(xSibs.length).toBe(8);
            expect(xSibs).toEqual([
                '1,0','2,0','3,0','4,0','5,0','6,0','7,0','8,0'
            ]);
            xSibs = board.xSiblings(3, 3);
            expect(xSibs).not.toContain('3,3')
            expect(xSibs.length).toBe(8);
            expect(xSibs).toEqual([
                '0,3','1,3','2,3','4,3','5,3','6,3','7,3','8,3'
            ]);
        });

        xit('should find subgridSiblings for a given coordinate', function(){
            board = new Board();
            var subSibs = board.subgridSiblings(0, 0);
            expect(subSibs).not.toContain('0,0')
            expect(subSibs.length).toBe(4);
            expect(xSibs).toEqual([
                '1,1','1,2','2,1','2,2'
            ]);
        });

        xit('should return all related cells for a coordinate', function () {
            board = new Board();
            var linkedCells = board.linkedCells(0,0);
            expect(linkedCells).not.toContain('0,0')
            expect(linkedCells.length).toBe(21);
            expect(linkedCells).toBe([
                '0,1','0,2','0,3','0,4','0,5','0,6','0,7','0,8',
                '1,0','2,0','3,0','4,0','5,0','6,0','7,0','8,0',
                '1,1','1,2','2,1','2,2'
            ]);
        });

    });

});
