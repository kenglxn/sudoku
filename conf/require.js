requirejs.config({
    // Karma serves files from '/base'
    baseUrl: '/base/src',

    paths: {
        'ocrad': '../lib/ocrad',
        'jquery': '../lib/jquery',
        'underscore': '../lib/underscore',
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