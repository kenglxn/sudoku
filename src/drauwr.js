define([], function () {
    var Drauwr = function(ctx) {
        this.ctx = ctx;
    };

    Drauwr.prototype.emptyBoard = function () {
        this.ctx.strokeRect(0, 0, 400, 400);
    };
    return Drauwr;
});

