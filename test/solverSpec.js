define(['solver', 'board'], function (Solver, Board) {

    describe('Solver', function(){
        it('should solve board', function () {
            var b = new Board();
            b.cell(3,0).val = 9;
            b.cell(4,0).val = 5;
            b.cell(6,0).val = 7;
            b.cell(1,1).val = 5;
            b.cell(4,1).val = 3;
            b.cell(1,0).val = 1;
            b.cell(1,2).val = 9;
            b.cell(3,2).val = 6;
            b.cell(8,2).val = 5;
            b.cell(0,3).val = 2;
            b.cell(2,3).val = 6;
            b.cell(5,3).val = 8;
            b.cell(2,4).val = 8;
            b.cell(6,4).val = 4;
            b.cell(3,5).val = 3;
            b.cell(6,5).val = 6;
            b.cell(8,5).val = 9;
            b.cell(0,6).val = 4;
            b.cell(5,6).val = 3;
            b.cell(7,6).val = 5;
            b.cell(4,7).val = 8;
            b.cell(7,7).val = 6;
            b.cell(2,8).val = 1;
            b.cell(4,8).val = 4;
            b.cell(5,8).val = 5;
            b.cell(7,8).val = 2;

            var sb = new Solver().solve(b);
            
            expect(sb.cell(0,0).val).toBe(8);
            expect(sb.cell(1,0).val).toBe(1);
            expect(sb.cell(2,0).val).toBe(2);
            expect(sb.cell(3,0).val).toBe(9);
            expect(sb.cell(4,0).val).toBe(5);
            expect(sb.cell(5,0).val).toBe(4);
            expect(sb.cell(6,0).val).toBe(7);
            expect(sb.cell(7,0).val).toBe(3);
            expect(sb.cell(8,0).val).toBe(6);

            expect(sb.cell(0,1).val).toBe(6);
            expect(sb.cell(1,1).val).toBe(5);
            expect(sb.cell(2,1).val).toBe(4);
            expect(sb.cell(3,1).val).toBe(8);
            expect(sb.cell(4,1).val).toBe(3);
            expect(sb.cell(5,1).val).toBe(7);
            expect(sb.cell(6,1).val).toBe(2);
            expect(sb.cell(7,1).val).toBe(9);
            expect(sb.cell(8,1).val).toBe(1);
            
            expect(sb.cell(0,2).val).toBe(7);
            expect(sb.cell(1,2).val).toBe(9);
            expect(sb.cell(2,2).val).toBe(3);
            expect(sb.cell(3,2).val).toBe(6);
            expect(sb.cell(4,2).val).toBe(2);
            expect(sb.cell(5,2).val).toBe(1);
            expect(sb.cell(6,2).val).toBe(8);
            expect(sb.cell(7,2).val).toBe(4);
            expect(sb.cell(8,2).val).toBe(5);

            expect(sb.cell(0,3).val).toBe(2);
            expect(sb.cell(1,3).val).toBe(7);
            expect(sb.cell(2,3).val).toBe(6);
            expect(sb.cell(3,3).val).toBe(4);
            expect(sb.cell(4,3).val).toBe(9);
            expect(sb.cell(5,3).val).toBe(8);
            expect(sb.cell(6,3).val).toBe(5);
            expect(sb.cell(7,3).val).toBe(1);
            expect(sb.cell(8,3).val).toBe(3);

            expect(sb.cell(0,4).val).toBe(9);
            expect(sb.cell(1,4).val).toBe(3);
            expect(sb.cell(2,4).val).toBe(8);
            expect(sb.cell(3,4).val).toBe(5);
            expect(sb.cell(4,4).val).toBe(1);
            expect(sb.cell(5,4).val).toBe(6);
            expect(sb.cell(6,4).val).toBe(4);
            expect(sb.cell(7,4).val).toBe(7);
            expect(sb.cell(8,4).val).toBe(2);

            expect(sb.cell(0,5).val).toBe(1);
            expect(sb.cell(1,5).val).toBe(4);
            expect(sb.cell(2,5).val).toBe(5);
            expect(sb.cell(3,5).val).toBe(3);
            expect(sb.cell(4,5).val).toBe(7);
            expect(sb.cell(5,5).val).toBe(2);
            expect(sb.cell(6,5).val).toBe(6);
            expect(sb.cell(7,5).val).toBe(8);
            expect(sb.cell(8,5).val).toBe(9);

            expect(sb.cell(0,6).val).toBe(4);
            expect(sb.cell(1,6).val).toBe(8);
            expect(sb.cell(2,6).val).toBe(9);
            expect(sb.cell(3,6).val).toBe(2);
            expect(sb.cell(4,6).val).toBe(6);
            expect(sb.cell(5,6).val).toBe(3);
            expect(sb.cell(6,6).val).toBe(1);
            expect(sb.cell(7,6).val).toBe(5);
            expect(sb.cell(8,6).val).toBe(7);

            expect(sb.cell(0,7).val).toBe(5);
            expect(sb.cell(1,7).val).toBe(2);
            expect(sb.cell(2,7).val).toBe(7);
            expect(sb.cell(3,7).val).toBe(1);
            expect(sb.cell(4,7).val).toBe(8);
            expect(sb.cell(5,7).val).toBe(9);
            expect(sb.cell(6,7).val).toBe(3);
            expect(sb.cell(7,7).val).toBe(6);
            expect(sb.cell(8,7).val).toBe(4);

            expect(sb.cell(0,8).val).toBe(3);
            expect(sb.cell(1,8).val).toBe(6);
            expect(sb.cell(2,8).val).toBe(1);
            expect(sb.cell(3,8).val).toBe(7);
            expect(sb.cell(4,8).val).toBe(4);
            expect(sb.cell(5,8).val).toBe(5);
            expect(sb.cell(6,8).val).toBe(9);
            expect(sb.cell(7,8).val).toBe(2);
            expect(sb.cell(8,8).val).toBe(8);

        });
    });
});