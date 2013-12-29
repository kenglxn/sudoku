define(function() {

    var App = function(el) {
        this.el = el;
    };

    App.prototype.initBoard = function() {
        this.el.html('BOARD');
    };

    return App;

});
