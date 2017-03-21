(function() {
    "use strict";
    var result = 0;

    var buttons = document.querySelector('.allButtons');
    var numberButtons = buttons.querySelectorAll('.number');

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

    for (var i = 0; i <= numberButtons.length - 1; i++) {

        numberButtons[i].onclick = function() {
            var buttonDigit = parseInt(this.innerHTML);
            screen.addDigit(buttonDigit);
        }
    };

    var operationButtons = buttons.querySelectorAll('.operation');

    for (var i = 0; i <= operationButtons.length - 1; i++) {
        var isInitialAction = true;
        var prevOperation;
        var currNumber;
        operationButtons[i].onclick = function() {

            if (isInitialAction) {

                currNumber = screen.getNumber();
                result = currNumber;
                isInitialAction = false;

            } else {
                currNumber = screen.getNumber();

                switch (prevOperation) {

                    case '+':
                        result = Number(result) + Number(currNumber);
                        break;

                    case '-':
                        result = Number(result) - Number(currNumber);
                        break;

                    case 'x':
                        result = Number(result) * Number(currNumber);
                        break;

                    case '/':
                        result = Number(result) / Number(currNumber);
                        break;
                }
                screen.setNumber(result);
            }

            screen.resetOnNextInput();
            prevOperation = this.innerHTML;
        }
    }
})();
