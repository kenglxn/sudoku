requirejs.config({
    paths: {
        'jquery': '../lib/jquery',
        'underscore': '../lib/underscore',
        'OCRAD': '../lib/ocrad'
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

define(['app', 'jquery'], function (App, $) {
    var app = new App($('body'));
    //app.initBoard();
});
