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

    ImgMan.prototype.read = function (imgUrl, timeout) {
        var chars, loaded, timeout = timeout || new Date().getTime() + 2000;
        var img = this.load(imgUrl, function() {
            loaded = true;
        });
        while(!loaded && new Date().getTime() < timeout) {}
        // ctx.clearRect(0, 0, canvas.width, canvas.height); //clear canvas each iteration
        // create canvas with image
        // iterate through all 81 sections and pass the section to OCRAD
        // add result of OCRAD to chars []
        return chars;
    };

    return ImgMan;
});