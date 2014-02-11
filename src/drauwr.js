define([], function () {
    var Drauwr = function(canvas) {
        this.canvas = canvas;
        this.canvas.height = 400;
        this.canvas.width = 400;
    };

    Drauwr.prototype.emptyBoard = function () {
        var ctx = this.canvas.getContext("2d"), w = this.canvas.width, h = this.canvas.height;
        ctx.clearRect(0, 0, w, h);
        for (var x = 0; x < 10; x++) {
            ctx.beginPath();
            ctx.lineWidth = x % 3 === 0 ? 3 : 1;
            ctx.moveTo(x * (w/9), 0);
            ctx.lineTo(x * (w/9), h);
            ctx.stroke();
        }
        for (var y = 0; y < 10; y++) {
            ctx.beginPath();
            ctx.lineWidth = y % 3 === 0 ? 3 : 1;

            ctx.moveTo(0, y * (h/9));
            ctx.lineTo(w, y * (h/9));
            ctx.stroke();
        }
    };

    Drauwr.prototype.write = function (x, y, val, fillStyle) {
        var ctx = this.canvas.getContext("2d"), w = this.canvas.width, h = this.canvas.height;
        ctx.font = "33px sans-serif";
        ctx.fillStyle = fillStyle || 'black';
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.fillText(val, (w/9) * x + (w/9/2), (h/9) * y + (h/9/2));
    };

    return Drauwr;
});


