define(['ocrad'], function(OCRAD) {

    var $cog = $('#cog'),
          $error = $('#error'), 
          $info = $cog.find('.info')
          $errTxt = $error.find('.text');
    
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
            $info.text('loading image');
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
             cell = 1,
             tiles = 9,
             padding,
             x = 0,
             y = 0,
             ocrTxt,
             txt,
             xOffset,
             yOffset,
             tileWidth,
             tileHeight,
             padding;
        $info.text('reading digits from image');
        canvas = document.createElement('canvas');
        // document.body.appendChild(canvas);
        ctx = canvas.getContext('2d');
        tileWidth = img.width / tiles;
        tileHeight = img.height / tiles;
        padding = tileWidth * 0.15;
        canvas.width = tileWidth;
        canvas.height = tileHeight;
        for(x = 0; x < tiles; x++) {
            for(y = 0; y < tiles; y++) {
                $info.text('processing cell #' + (cell++));
                xOffset = x * tileWidth;
                yOffset = y * tileHeight;
                try {
                    ctx.clearRect(0, 0, canvas.width, canvas.height);
                    ctx.drawImage
                    (
                        img, 
                        xOffset + padding, 
                        yOffset + padding, 
                        tileWidth - padding, 
                        tileHeight - padding, 
                        - padding, 
                        - padding, 
                        tileWidth, 
                        tileHeight
                    );
                    ocrTxt = OCRAD(canvas);
                } catch(e) {
                    $cog.hide();
                    $error.show();
                    $errTxt.text('error while processing. (' + e + '). ' + e.stack);
                    throw e;
                }
                txt = ocrTxt.replace(/[íl]/g, '1').replace(/e/g, '8').replace(/s/g, '6').replace(/[Iuo_\W]/g,'');
                if(txt.length === 1 && !isNaN(txt)) {
                    onRead(x, y, parseInt(txt, 10));
                }
            }
        }
        onFinish();
    };

    ImgMan.prototype.crop = function (img) {
        //TODO clean up this mess
        $info.text('autocropping the image');
        var canvas = document.createElement('canvas');
        // document.body.appendChild(canvas);
        var resize = img.width > 800 ? .5 : 1; 
        canvas.width = img.width * resize;
        canvas.height = img.height * resize;
        var croppedImg = document.createElement('img');
        var croppedCanvas = document.createElement('canvas');
        // document.body.appendChild(croppedCanvas);
        var context = canvas.getContext("2d");
        context.drawImage(img, 0, 0, canvas.width, canvas.height);
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
            var x, y, offset = fromTop ? 1 : -1;
            for(y = fromTop ? 0 : canvas.height - 1; fromTop ? (y < canvas.height) : (y > -1); y += offset) {
                for(x = 0; x < canvas.width; x++) {
                    if (!isOutside(getRBG(x, y))) {
                        return y;                        
                    }      
                }
            }
            return null; 
        };
        var scanX = function (fromLeft) {
            var x, y, offset = fromLeft? 1 : -1;
            for(x = fromLeft ? 0 : canvas.width - 1; fromLeft ? (x < canvas.width) : (x > -1); x += offset) {
                for(y = 0; y < canvas.height; y++) {
                    if (!isOutside(getRBG(x, y))) {
                        return x;                        
                    }      
                }
            }
            return null;
        };
    
        var cropTop = scanY(true),
            cropLeft = scanX(true),
            cropRight = scanX(false),
            cropWidth = cropRight - cropLeft,
            cropBottom = scanY(false),
            cropHeight = cropWidth;
    
        croppedCanvas.width = cropWidth;
        croppedCanvas.height = cropHeight;
        croppedCanvas.getContext("2d").drawImage(canvas, cropLeft, cropTop, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
        croppedImg.src = croppedCanvas.toDataURL();
        return croppedImg;
    };

    return ImgMan;
});