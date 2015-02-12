requirejs.config({
    baseUrl: "src/",
    // urlArgs: 'cb=' + Math.random(),
    paths: {
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        backbone: "lib/backbone",
        ocrad: 'lib/ocrad',
        imagediff: '../test/lib/imagediff' //TODO move to lib under src, not  test
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
