define(['ocrad'], function(OCRAD) {
    
    var ImgMan = function() {};

    ImgMan.prototype.load = function (wat, cb) {
        console.log('load', wat, cb.identity);
        var imgman = this;
        if(wat.constructor == File) {
            var reader = new FileReader();
            reader.onload = function(){ imgman.load(reader.result, cb); }
            reader.readAsDataURL(wat)   
        } else {
            var img = document.createElement('img');
            img.onload = function () {
                console.log('onload', cb.identity);
                cb(this);
            }
            img.src = wat;
            console.log('set src');
        }
    };

    ImgMan.prototype.read = function (wat, cb) {
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
                    var txt = OCRAD(canvas).replace(/\W/g,'').replace(/[Iuo_]/g, '').replace(/l/g, '1');
                    if(txt.length > 0) {
                        ctx.clearRect(0, 0, img.width, img.height);
                        cb(x, y, txt);
                    }
                }
            }
        });
    };

    return ImgMan;
});