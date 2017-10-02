(function() {
    "use strict";

    function Memory() {
        this.num = 0;
    }

    Memory.prototype.Plus = function(number) {
        this.num += number;
    }

    Memory.prototype.Minus = function(number) {
        this.num += -number;
    }

    Memory.prototype.Recall = function() {
        return this.num;
    }

    Memory.prototype.Clear = function() {
        this.num = 0;
    }

   module.exports.Memory = Memory;
}());