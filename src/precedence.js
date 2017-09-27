(function() {
    "use strict";

    function Precedence() {
        this.numbers = [];
        this.operations = [];
    }

    Precedence.prototype.calculateResult = function() {
        var temporaryResult = this.numbers[0];
        var finalResult = 0;
        for (var i = 0; i < this.operations.length; i++) {
            if (this.operations[i] === 'x') {
                temporaryResult *= this.numbers[i + 1];
            } else if (this.operations[i] === '/') {
                temporaryResult /= this.numbers[i + 1];
            } else {
                var sign = this.operations[i] === '+' ? 1 : -1;
                if (i !== this.operations.length - 1 && this.operations[i + 1] === '/' || this.operations[i + 1] === 'x') {
                    finalResult += temporaryResult;
                    temporaryResult = sign * this.numbers[i + 1];
                } else {
                     temporaryResult += sign * this.numbers[i + 1];
                }
            }
            if (i === this.operations.length - 1) {
                finalResult += temporaryResult;
            }
        }
        return finalResult;
    }
    Precedence.prototype.precedenceOn = function() {
        this.turnOn = true;
    }

    Precedence.prototype.addOperation = function(operation) {
        this.operations.push(operation);
    }

    Precedence.prototype.addNumber = function(number) {
        this.numbers.push(Number(number));
    };

    module.exports.Precedence = Precedence;

}());