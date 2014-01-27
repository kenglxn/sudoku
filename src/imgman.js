define(['underscore'], function(_) {
    
    var ImgMan = function() {};

    ImgMan.prototype.load = function (url, cb) {
        var img = new Image();
        img.onload = function () {
            cb();
        }
        img.src = url;
        return img;
    };

    return ImgMan;
});