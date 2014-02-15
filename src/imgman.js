define(['ocrad'], function(OCRAD) {
    
    var ImgMan = function() {};

    ImgMan.prototype.load = function (wat, cb) {
        var imgman = this;
        if(wat.constructor == File) {
            var reader = new FileReader();
            reader.onload = function(){
                imgman.load(reader.result, cb); 
            }
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
        var imgman = this;
        imgman.load(wat, function(img) {
            croppedImg = imgman.crop(img);
            imgman.readDigitsFromImage(croppedImg, onRead, onFinish);
        });
    };

    ImgMan.prototype.readDigitsFromImage = function(img, onRead, onFinish) {
        var ctx,
             canvas,
             tiles = 9,
             tileWidth,
             tileHeight;
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
                ctx.clearRect(0, 0, img.width, img.height);
                if(txt.length > 0) {
                    onRead(x, y, parseInt(txt, 10));
                }
            }
        }
        onFinish();
    };

    ImgMan.prototype.crop = function (img) {
        //TODO clean up this mess
        var canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        var croppedImg = document.createElement('img');
        var croppedCanvas = document.createElement('canvas');
        var context = canvas.getContext("2d");
        context.drawImage(img, 0, 0);
        var imageData = context.getImageData(0, 0, img.width, img.height);
        var data = imageData.data;
        var getRBG = function(x, y) {
            var offset = img.width * y + x;
            return {
                red:     data[offset * 4],
                green:   data[offset * 4 + 1],
                blue:    data[offset * 4 + 2],
                opacity: data[offset * 4 + 3]
            };
        };
        var isOutside = function (rgb) {
            return rgb.red > 40 && rgb.green > 40 && rgb.blue > 40;
        };
        var scanY = function (fromTop) {
            var offset = fromTop ? 1 : -1;
            for(var y = fromTop ? 0 : img.height - 1; fromTop ? (y < img.height) : (y > -1); y += offset) {
                for(var x = 0; x < img.width; x++) {
                    var rgb = getRBG(x, y);
                    if (!isOutside(rgb)) {
                        return y;                        
                    }      
                }
            }
            return null; 
        };
        var scanX = function (fromLeft) {
            var offset = fromLeft? 1 : -1;
            for(var x = fromLeft ? 0 : img.width - 1; fromLeft ? (x < img.width) : (x > -1); x += offset) {
                for(var y = 0; y < img.height; y++) {
                    var rgb = getRBG(x, y);
                    if (!isOutside(rgb)) {
                        return x;                        
                    }      
                }
            }
            return null;
        };
    
        var cropTop = scanY(true),
            cropBottom = scanY(false),
            cropLeft = scanX(true),
            cropRight = scanX(false),
            cropWidth = cropRight - cropLeft,
            cropHeight = cropBottom - cropTop;
    
        croppedCanvas.width = cropWidth;
        croppedCanvas.height = cropHeight;
    
        croppedCanvas.getContext("2d").drawImage(canvas, cropLeft, cropTop, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
        croppedImg.src = croppedCanvas.toDataURL();
        return croppedImg;
    };

    return ImgMan;
});