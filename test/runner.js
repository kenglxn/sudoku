require.config({
    baseUrl: "../src",
    urlArgs: 'cb=' + Math.random(),
 
    paths: {
        // Libraries.
        jquery: "lib/jquery",
        underscore: "lib/underscore",
        backbone: "lib/backbone",
        ocrad: 'lib/ocrad',
        // Jasmine Testing: Folder Aliases
        spec: "../test/spec",
        helpers: "../test/helpers"
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
