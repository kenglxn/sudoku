define(['jquery', 'drauwr'], function($, Drauwr) {

    var App = function() {
        this.draw = new Drauwr($('#canvas'));
    };

    App.prototype.init = function() {
        $('#file').change(this.run);
    };

    App.prototype.run = function() {
        this.draw.emptyBoard();
        
    };

    return App;

});
