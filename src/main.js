requirejs.config({
    baseUrl: "../",
    urlArgs: 'cb=' + Math.random(),
    paths: {
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        backbone: "lib/backbone",
        ocrad: 'lib/ocrad',
        imagediff: '../test/lib/imagediff'
    },

    shim: {
        'underscore': {
            exports: '_'
        },
        'ocrad': {
            exports: 'OCRAD'
        }
    }
});

define(['app'], function (App) {
    new App().init();
});
