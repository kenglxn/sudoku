define(['ocrad'], function(OCRAD) {
    
    var ImgMan = function() {};

    ImgMan.prototype.load = function (url, cb) {
        var img = document.createElement('img');
        img.onload = function () {
            cb(this);
        }
        img.src = url;
    };

    ImgMan.prototype.read = function (imgUrl, cb) {
        var ctx,
             canvas,
             tileWidth,
             tileHeight,
             count = 0,
             chars = [], 
             tiles = 9;
        this.load(imgUrl, function(img) {
            canvas = document.createElement('canvas');
            document.body.appendChild(canvas);
            ctx = canvas.getContext('2d');
            tileWidth = img.width / tiles;
            tileHeight = img.height / tiles;
            canvas.width = tileWidth;
            canvas.height = tileHeight;
            for(var x = 0; x < tiles; x++) {
                for(var y = 0; y < tiles; y++) {
                    var xOffset = x * tileWidth;
                    var yOffset = y * tileHeight;
                    // ctx.clearRect(0, 0, img.width, img.height);
                    ctx.drawImage(img, xOffset, yOffset, tileWidth, tileHeight, -(tileWidth / 9), -(tileHeight / 9), tileWidth, tileHeight);
                    var txt = OCRAD(canvas).replace(/\W/g,'').replace(/[Iuo_]/g, '').replace(/l/g, '1');
                    chars[count++] = txt;
                }
            }
            cb(chars);
        });
    };

    return ImgMan;
});