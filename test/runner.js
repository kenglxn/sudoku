require.config({
    baseUrl: "../src",
    urlArgs: 'cb=' + Math.random(),
 
    paths: {
        // Libraries.
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        backbone: "lib/backbone",
        ocrad: 'lib/ocrad',
        imagediff: '../test/lib/imagediff',
        // Jasmine Testing: Folder Aliases
        spec: "../test/spec"
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
