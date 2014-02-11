define(['ocrad'], function(OCRAD) {
    
    var ImgMan = function() {};

    ImgMan.prototype.load = function (wat, cb) {
        var imgman = this;
        if(wat.constructor == File) {
            var reader = new FileReader();
            reader.onload = function(){ imgman.load(reader.result, cb); }
            reader.readAsDataURL(wat)   
        } else {
            var img = document.createElement('img');
            img.onload = function () {
                cb(this);
            }
            img.src = wat;
        }
    };

    ImgMan.prototype.read = function (wat, onRead, onFinish) {
        var ctx,
             canvas,
             tiles = 9,
             tileWidth,
             tileHeight;
        this.load(wat, function(img) {
            canvas = document.createElement('canvas');
            ctx = canvas.getContext('2d');
            tileWidth = img.width / tiles;
            tileHeight = img.height / tiles;
            canvas.width = tileWidth;
            canvas.height = tileHeight;
            for(var x = 0; x < tiles; x++) {
                for(var y = 0; y < tiles; y++) {
                    var xOffset = x * tileWidth;
                    var yOffset = y * tileHeight;
                    ctx.drawImage(img, xOffset, yOffset, tileWidth, tileHeight, -(tileWidth / 9), -(tileHeight / 9), tileWidth, tileHeight);
                    var txt = OCRAD(canvas).replace(/\W/g,'').replace(/[Iuo_]/g, '').replace(/l/g, '1').replace(/e/g, '8').replace(/s/g, '6');
                    if(txt.length > 0) {
                        ctx.clearRect(0, 0, img.width, img.height);
                        onRead(x, y, parseInt(txt, 10));
                    }
                }
            }
            onFinish();
        });
    };

    return ImgMan;
});