define(['solver', 'board'], function (Solver, Board) {

    describe('Solver', function(){
        it('should solve board', function () {
            var b = new Board();
            b.cell(1,0).value = 1;
            b.cell(3,0).value = 9;
            b.cell(4,0).value = 5;
            b.cell(6,0).value = 7;
            b.cell(1,1).value = 5;
            b.cell(4,1).value = 3;
            b.cell(1,2).value = 9;
            b.cell(3,2).value = 6;
            b.cell(8,2).value = 5;
            b.cell(0,3).value = 2;
            b.cell(2,3).value = 6;
            b.cell(5,3).value = 8;
            b.cell(2,4).value = 8;
            b.cell(6,4).value = 4;
            b.cell(3,5).value = 3;
            b.cell(6,5).value = 6;
            b.cell(8,5).value = 9;
            b.cell(0,6).value = 4;
            b.cell(5,6).value = 3;
            b.cell(7,6).value = 5;
            b.cell(4,7).value = 8;
            b.cell(7,7).value = 6;
            b.cell(2,8).value = 1;
            b.cell(4,8).value = 4;
            b.cell(5,8).value = 5;
            b.cell(7,8).value = 2;

            var sb = new Solver().solve(b);
            
            expect(sb.cell(1,0).value).toBe(1);
            expect(sb.cell(2,0).value).toBe();
            expect(sb.cell(3,0).value).toBe(9);
            expect(sb.cell(4,0).value).toBe(5);
            expect(sb.cell(5,0).value).toBe();
            expect(sb.cell(6,0).value).toBe(7);
            expect(sb.cell(7,0).value).toBe();
            expect(sb.cell(8,0).value).toBe();

            expect(sb.cell(1,1).value).toBe(5);
            expect(sb.cell(2,1).value).toBe();
            expect(sb.cell(3,1).value).toBe();
            expect(sb.cell(4,1).value).toBe(3);
            expect(sb.cell(5,1).value).toBe();
            expect(sb.cell(6,1).value).toBe();
            expect(sb.cell(7,1).value).toBe();
            expect(sb.cell(8,1).value).toBe();
            
            expect(sb.cell(0,2).value).toBe();
            expect(sb.cell(1,2).value).toBe(9);
            expect(sb.cell(2,2).value).toBe();
            expect(sb.cell(3,2).value).toBe(6);
            expect(sb.cell(4,2).value).toBe();
            expect(sb.cell(5,2).value).toBe();
            expect(sb.cell(6,2).value).toBe();
            expect(sb.cell(7,2).value).toBe();
            expect(sb.cell(8,2).value).toBe(5);

            expect(sb.cell(0,3).value).toBe(2);
            expect(sb.cell(1,3).value).toBe();
            expect(sb.cell(2,3).value).toBe(6);
            expect(sb.cell(3,3).value).toBe();
            expect(sb.cell(4,3).value).toBe();
            expect(sb.cell(5,3).value).toBe(8);
            expect(sb.cell(6,3).value).toBe();
            expect(sb.cell(7,3).value).toBe();
            expect(sb.cell(8,3).value).toBe();

            expect(sb.cell(0,4).value).toBe();
            expect(sb.cell(1,4).value).toBe();
            expect(sb.cell(2,4).value).toBe(8);
            expect(sb.cell(3,4).value).toBe();
            expect(sb.cell(4,4).value).toBe();
            expect(sb.cell(5,4).value).toBe();
            expect(sb.cell(6,4).value).toBe(4);
            expect(sb.cell(7,4).value).toBe();
            expect(sb.cell(8,4).value).toBe();

            expect(sb.cell(0,5).value).toBe();
            expect(sb.cell(1,5).value).toBe();
            expect(sb.cell(2,5).value).toBe();
            expect(sb.cell(3,5).value).toBe(3);
            expect(sb.cell(4,5).value).toBe();
            expect(sb.cell(5,5).value).toBe();
            expect(sb.cell(6,5).value).toBe(6);
            expect(sb.cell(7,5).value).toBe();
            expect(sb.cell(8,5).value).toBe(9);

            expect(sb.cell(0,6).value).toBe(4);
            expect(sb.cell(1,6).value).toBe();
            expect(sb.cell(2,6).value).toBe();
            expect(sb.cell(3,6).value).toBe();
            expect(sb.cell(4,6).value).toBe();
            expect(sb.cell(5,6).value).toBe(3);
            expect(sb.cell(6,6).value).toBe();
            expect(sb.cell(7,6).value).toBe(5);
            expect(sb.cell(8,6).value).toBe();

            expect(sb.cell(0,7).value).toBe();
            expect(sb.cell(1,7).value).toBe();
            expect(sb.cell(2,7).value).toBe();
            expect(sb.cell(3,7).value).toBe();
            expect(sb.cell(4,7).value).toBe(8);
            expect(sb.cell(5,7).value).toBe();
            expect(sb.cell(6,7).value).toBe();
            expect(sb.cell(7,7).value).toBe(6);
            expect(sb.cell(8,7).value).toBe();

            expect(sb.cell(0,8).value).toBe();
            expect(sb.cell(1,8).value).toBe();
            expect(sb.cell(2,8).value).toBe(1);
            expect(sb.cell(3,8).value).toBe();
            expect(sb.cell(4,8).value).toBe(4);
            expect(sb.cell(5,8).value).toBe(5);
            expect(sb.cell(6,8).value).toBe();
            expect(sb.cell(7,8).value).toBe(2);
            expect(sb.cell(8,8).value).toBe();

        });
    });
});