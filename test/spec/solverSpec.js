define(['solver', 'board'], function (Solver, Board) {

    describe('Solver', function(){
        it('should solve board', function () {
            var b = new Board(), cb = jasmine.createSpy();
            b.cell(1,0).val(1);
            b.cell(3,0).val(9);
            b.cell(4,0).val(5);
            b.cell(6,0).val(7);

            b.cell(1,1).val(5);
            b.cell(4,1).val(3);
            
            b.cell(1,2).val(9);
            b.cell(3,2).val(6);
            b.cell(8,2).val(5);

            b.cell(0,3).val(2);
            b.cell(2,3).val(6);
            b.cell(5,3).val(8);

            b.cell(2,4).val(8);
            b.cell(6,4).val(4);

            b.cell(3,5).val(3);
            b.cell(6,5).val(6);
            b.cell(8,5).val(9);

            b.cell(0,6).val(4);
            b.cell(5,6).val(3);
            b.cell(7,6).val(5);

            b.cell(4,7).val(8);
            b.cell(7,7).val(6);

            b.cell(2,8).val(1);
            b.cell(4,8).val(4);
            b.cell(5,8).val(5);
            b.cell(7,8).val(2);

            var s = new Solver(b);
            var sb = s.solve(cb);
            
            expect(s.unsolvedCells().length).toBe(0);
            expect(sb.isValid()).toBe(true);
            expect(cb.callCount).toBe(55);
            _.each(cb.calls, function(call) {
                expect(call.args.length).toBe(3);
            });
        });
    });
});