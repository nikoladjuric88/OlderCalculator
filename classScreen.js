(function(global) {
	 "use strict";

function Screen() {
        this._element = document.getElementById('screen');
        this.reset = false;
    }

    Screen.prototype.resetOnNextInput = function() {
        this.reset = true;
    }

    Screen.prototype.setNumber = function(number) {
        this._element.value = number;
    }

    Screen.prototype.getNumber = function() {
        return this._element.value;

    };

    Screen.prototype.addDigit = function(digit) {

        if (this.reset) {
            this._element.value = digit;
            this.reset = false;
        } else {
            this._element.value += digit;
        }
    }

    var screen = new Screen();

	global.screen = screen;

}(window));	 
