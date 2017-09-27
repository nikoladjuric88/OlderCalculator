(function() {
    "use strict";

    function Screen(element) {
        this.element = element;
        this.reset = false;
    }

    Screen.prototype.resetOnNextInput = function() {
        this.reset = true;
    }

    Screen.prototype.resetOfNextInput = function() {
        this.reset = false;
    }

    Screen.prototype.setNumber = function(number) {
        this.element.value = number;
    }

    Screen.prototype.getNumber = function() {
        return this.element.value;
    };

    Screen.prototype.addDigit = function(digit) {

        if (this.reset === true) {
            this.element.value = digit;
            this.reset = false;
        } else {
            this.element.value += digit;
        }
    }
    
   module.exports.Screen = Screen;
}());