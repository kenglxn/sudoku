define(['jquery'], function($) {

    var App = function() {};

    App.prototype.init = function() {
        $('#file').change(this.run);
    };

    App.prototype.run = function() {};

    return App;

});
