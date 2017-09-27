(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
(function() {
    "use strict";

    var modulePrecedence = require('./precedence');
    var precedence = new modulePrecedence.Precedence();

    var precedenceOps = document.getElementById('precedenceOps');
    precedenceOps.onclick = function() {
        document.getElementById('precedenceOps').style.backgroundColor = '#848484';
        precedence.precedenceOn();
    }

    var result = 0;
    var moduleScreen = require('./classScreen');
    var screen = new moduleScreen.Screen(document.getElementById('screen'));

    var buttons = document.querySelector('.allButtons');
    var numberButtons = buttons.querySelectorAll('.number');

    for (var i = 0; i <= numberButtons.length - 1; i++) {
        numberButtons[i].onclick = function() {
            var buttonDigit = parseInt(this.innerHTML);
            screen.addDigit(buttonDigit);
        }
    };

    var operationButtons = buttons.querySelectorAll('.operation');

    for (var i = 0; i < operationButtons.length; i++) {
        var isInitialAction = true;
        var prevOperation;

        operationButtons[i].onclick = function() {
            var currNumber = screen.getNumber();

            if (isInitialAction) {
                result = currNumber;
                isInitialAction = false;
            } else {
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
                    case '=':
                        result = currNumber;
                        break;
                }
            }

            if (precedence.turnOn === true) {
                var currOperation = this.innerHTML;
                screen.setNumber(currNumber);
                precedence.addNumber(currNumber);
                if (currOperation !== '=') {
                    precedence.addOperation(currOperation);
                } else {
                    var outcome = precedence.calculateResult();
                    screen.setNumber(outcome);
                }
            } else {
                screen.setNumber(result);
            }
            prevOperation = this.innerHTML;
            screen.resetOnNextInput();
        }
    }

    var moduleMemory = require('./classMemory');
    var memo = new moduleMemory.Memory();

    var memoryPlus = document.getElementById('memoryPlus');
    memoryPlus.onclick = function() {
        var currNumber = screen.getNumber();
        memo.Plus(Number(currNumber));
        screen.resetOnNextInput();
    }

    var memoryMinus = document.getElementById('memoryMinus');
    memoryMinus.onclick = function() {
        var currNumber = screen.getNumber();
        memo.Minus(Number(currNumber));
        screen.resetOnNextInput();
    }

    var memoryRecall = document.getElementById('memoryRecall');
    memoryRecall.onclick = function() {
        var currNumber = screen.getNumber();
        var callMemory = memo.Recall();
        if (callMemory === 0) {
            screen.setNumber(currNumber);
        } else {
            screen.setNumber(callMemory);
        }
    }

    var memoryClear = document.getElementById('memoryClear');
    memoryClear.onclick = function() {
        var noMemory = memo.Clear();
    }

})();
},{"./classMemory":1,"./classScreen":2,"./precedence":4}],4:[function(require,module,exports){
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
},{}]},{},[3])
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6XFxVc2Vyc1xcTmlkemFcXERlc2t0b3BcXDI4XFxub2RlX21vZHVsZXNcXGJyb3dzZXItcGFja1xcX3ByZWx1ZGUuanMiLCJDOi9Vc2Vycy9OaWR6YS9EZXNrdG9wLzI4L3NyYy9jbGFzc01lbW9yeS5qcyIsIkM6L1VzZXJzL05pZHphL0Rlc2t0b3AvMjgvc3JjL2NsYXNzU2NyZWVuLmpzIiwiQzovVXNlcnMvTmlkemEvRGVza3RvcC8yOC9zcmMvZmFrZV8xYzAxMzA0ZS5qcyIsIkM6L1VzZXJzL05pZHphL0Rlc2t0b3AvMjgvc3JjL3ByZWNlZGVuY2UuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt0aHJvdyBuZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpfXZhciBmPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChmLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGYsZi5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIoZnVuY3Rpb24oKSB7XHJcbiAgICBcInVzZSBzdHJpY3RcIjtcclxuXHJcbiAgICBmdW5jdGlvbiBNZW1vcnkoKSB7XHJcbiAgICAgICAgdGhpcy5udW0gPSAwO1xyXG4gICAgfVxyXG5cclxuICAgIE1lbW9yeS5wcm90b3R5cGUuUGx1cyA9IGZ1bmN0aW9uKG51bWJlcikge1xyXG4gICAgICAgIHRoaXMubnVtICs9IG51bWJlcjtcclxuICAgIH1cclxuXHJcbiAgICBNZW1vcnkucHJvdG90eXBlLk1pbnVzID0gZnVuY3Rpb24obnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5udW0gKz0gLW51bWJlcjtcclxuICAgIH1cclxuXHJcbiAgICBNZW1vcnkucHJvdG90eXBlLlJlY2FsbCA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm51bTtcclxuICAgIH1cclxuXHJcbiAgICBNZW1vcnkucHJvdG90eXBlLkNsZWFyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5udW0gPSAwO1xyXG4gICAgfVxyXG5cclxuICAgbW9kdWxlLmV4cG9ydHMuTWVtb3J5ID0gTWVtb3J5O1xyXG59KCkpOyIsIihmdW5jdGlvbigpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGZ1bmN0aW9uIFNjcmVlbihlbGVtZW50KSB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50ID0gZWxlbWVudDtcclxuICAgICAgICB0aGlzLnJlc2V0ID0gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgU2NyZWVuLnByb3RvdHlwZS5yZXNldE9uTmV4dElucHV0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5yZXNldCA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgU2NyZWVuLnByb3RvdHlwZS5yZXNldE9mTmV4dElucHV0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5yZXNldCA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIFNjcmVlbi5wcm90b3R5cGUuc2V0TnVtYmVyID0gZnVuY3Rpb24obnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy5lbGVtZW50LnZhbHVlID0gbnVtYmVyO1xyXG4gICAgfVxyXG5cclxuICAgIFNjcmVlbi5wcm90b3R5cGUuZ2V0TnVtYmVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZWxlbWVudC52YWx1ZTtcclxuICAgIH07XHJcblxyXG4gICAgU2NyZWVuLnByb3RvdHlwZS5hZGREaWdpdCA9IGZ1bmN0aW9uKGRpZ2l0KSB7XHJcblxyXG4gICAgICAgIGlmICh0aGlzLnJlc2V0ID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZWxlbWVudC52YWx1ZSA9IGRpZ2l0O1xyXG4gICAgICAgICAgICB0aGlzLnJlc2V0ID0gZmFsc2U7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5lbGVtZW50LnZhbHVlICs9IGRpZ2l0O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIFxyXG4gICBtb2R1bGUuZXhwb3J0cy5TY3JlZW4gPSBTY3JlZW47XHJcbn0oKSk7IiwiKGZ1bmN0aW9uKCkge1xyXG4gICAgXCJ1c2Ugc3RyaWN0XCI7XHJcblxyXG4gICAgdmFyIG1vZHVsZVByZWNlZGVuY2UgPSByZXF1aXJlKCcuL3ByZWNlZGVuY2UnKTtcclxuICAgIHZhciBwcmVjZWRlbmNlID0gbmV3IG1vZHVsZVByZWNlZGVuY2UuUHJlY2VkZW5jZSgpO1xyXG5cclxuICAgIHZhciBwcmVjZWRlbmNlT3BzID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3ByZWNlZGVuY2VPcHMnKTtcclxuICAgIHByZWNlZGVuY2VPcHMub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcmVjZWRlbmNlT3BzJykuc3R5bGUuYmFja2dyb3VuZENvbG9yID0gJyM4NDg0ODQnO1xyXG4gICAgICAgIHByZWNlZGVuY2UucHJlY2VkZW5jZU9uKCk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFyIHJlc3VsdCA9IDA7XHJcbiAgICB2YXIgbW9kdWxlU2NyZWVuID0gcmVxdWlyZSgnLi9jbGFzc1NjcmVlbicpO1xyXG4gICAgdmFyIHNjcmVlbiA9IG5ldyBtb2R1bGVTY3JlZW4uU2NyZWVuKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzY3JlZW4nKSk7XHJcblxyXG4gICAgdmFyIGJ1dHRvbnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYWxsQnV0dG9ucycpO1xyXG4gICAgdmFyIG51bWJlckJ1dHRvbnMgPSBidXR0b25zLnF1ZXJ5U2VsZWN0b3JBbGwoJy5udW1iZXInKTtcclxuXHJcbiAgICBmb3IgKHZhciBpID0gMDsgaSA8PSBudW1iZXJCdXR0b25zLmxlbmd0aCAtIDE7IGkrKykge1xyXG4gICAgICAgIG51bWJlckJ1dHRvbnNbaV0ub25jbGljayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICB2YXIgYnV0dG9uRGlnaXQgPSBwYXJzZUludCh0aGlzLmlubmVySFRNTCk7XHJcbiAgICAgICAgICAgIHNjcmVlbi5hZGREaWdpdChidXR0b25EaWdpdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfTtcclxuXHJcbiAgICB2YXIgb3BlcmF0aW9uQnV0dG9ucyA9IGJ1dHRvbnMucXVlcnlTZWxlY3RvckFsbCgnLm9wZXJhdGlvbicpO1xyXG5cclxuICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb3BlcmF0aW9uQnV0dG9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgIHZhciBpc0luaXRpYWxBY3Rpb24gPSB0cnVlO1xyXG4gICAgICAgIHZhciBwcmV2T3BlcmF0aW9uO1xyXG5cclxuICAgICAgICBvcGVyYXRpb25CdXR0b25zW2ldLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgdmFyIGN1cnJOdW1iZXIgPSBzY3JlZW4uZ2V0TnVtYmVyKCk7XHJcblxyXG4gICAgICAgICAgICBpZiAoaXNJbml0aWFsQWN0aW9uKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBjdXJyTnVtYmVyO1xyXG4gICAgICAgICAgICAgICAgaXNJbml0aWFsQWN0aW9uID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzd2l0Y2ggKHByZXZPcGVyYXRpb24pIHtcclxuICAgICAgICAgICAgICAgICAgICBjYXNlICcrJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gTnVtYmVyKHJlc3VsdCkgKyBOdW1iZXIoY3Vyck51bWJlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjYXNlICctJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gTnVtYmVyKHJlc3VsdCkgLSBOdW1iZXIoY3Vyck51bWJlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjYXNlICd4JzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gTnVtYmVyKHJlc3VsdCkgKiBOdW1iZXIoY3Vyck51bWJlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG5cclxuICAgICAgICAgICAgICAgICAgICBjYXNlICcvJzpcclxuICAgICAgICAgICAgICAgICAgICAgICAgcmVzdWx0ID0gTnVtYmVyKHJlc3VsdCkgLyBOdW1iZXIoY3Vyck51bWJlcik7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgJz0nOlxyXG4gICAgICAgICAgICAgICAgICAgICAgICByZXN1bHQgPSBjdXJyTnVtYmVyO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgaWYgKHByZWNlZGVuY2UudHVybk9uID09PSB0cnVlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY3Vyck9wZXJhdGlvbiA9IHRoaXMuaW5uZXJIVE1MO1xyXG4gICAgICAgICAgICAgICAgc2NyZWVuLnNldE51bWJlcihjdXJyTnVtYmVyKTtcclxuICAgICAgICAgICAgICAgIHByZWNlZGVuY2UuYWRkTnVtYmVyKGN1cnJOdW1iZXIpO1xyXG4gICAgICAgICAgICAgICAgaWYgKGN1cnJPcGVyYXRpb24gIT09ICc9Jykge1xyXG4gICAgICAgICAgICAgICAgICAgIHByZWNlZGVuY2UuYWRkT3BlcmF0aW9uKGN1cnJPcGVyYXRpb24pO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgb3V0Y29tZSA9IHByZWNlZGVuY2UuY2FsY3VsYXRlUmVzdWx0KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NyZWVuLnNldE51bWJlcihvdXRjb21lKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHNjcmVlbi5zZXROdW1iZXIocmVzdWx0KTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBwcmV2T3BlcmF0aW9uID0gdGhpcy5pbm5lckhUTUw7XHJcbiAgICAgICAgICAgIHNjcmVlbi5yZXNldE9uTmV4dElucHV0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHZhciBtb2R1bGVNZW1vcnkgPSByZXF1aXJlKCcuL2NsYXNzTWVtb3J5Jyk7XHJcbiAgICB2YXIgbWVtbyA9IG5ldyBtb2R1bGVNZW1vcnkuTWVtb3J5KCk7XHJcblxyXG4gICAgdmFyIG1lbW9yeVBsdXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVtb3J5UGx1cycpO1xyXG4gICAgbWVtb3J5UGx1cy5vbmNsaWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIGN1cnJOdW1iZXIgPSBzY3JlZW4uZ2V0TnVtYmVyKCk7XHJcbiAgICAgICAgbWVtby5QbHVzKE51bWJlcihjdXJyTnVtYmVyKSk7XHJcbiAgICAgICAgc2NyZWVuLnJlc2V0T25OZXh0SW5wdXQoKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgbWVtb3J5TWludXMgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVtb3J5TWludXMnKTtcclxuICAgIG1lbW9yeU1pbnVzLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgY3Vyck51bWJlciA9IHNjcmVlbi5nZXROdW1iZXIoKTtcclxuICAgICAgICBtZW1vLk1pbnVzKE51bWJlcihjdXJyTnVtYmVyKSk7XHJcbiAgICAgICAgc2NyZWVuLnJlc2V0T25OZXh0SW5wdXQoKTtcclxuICAgIH1cclxuXHJcbiAgICB2YXIgbWVtb3J5UmVjYWxsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ21lbW9yeVJlY2FsbCcpO1xyXG4gICAgbWVtb3J5UmVjYWxsLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgY3Vyck51bWJlciA9IHNjcmVlbi5nZXROdW1iZXIoKTtcclxuICAgICAgICB2YXIgY2FsbE1lbW9yeSA9IG1lbW8uUmVjYWxsKCk7XHJcbiAgICAgICAgaWYgKGNhbGxNZW1vcnkgPT09IDApIHtcclxuICAgICAgICAgICAgc2NyZWVuLnNldE51bWJlcihjdXJyTnVtYmVyKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBzY3JlZW4uc2V0TnVtYmVyKGNhbGxNZW1vcnkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICB2YXIgbWVtb3J5Q2xlYXIgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnbWVtb3J5Q2xlYXInKTtcclxuICAgIG1lbW9yeUNsZWFyLm9uY2xpY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICB2YXIgbm9NZW1vcnkgPSBtZW1vLkNsZWFyKCk7XHJcbiAgICB9XHJcblxyXG59KSgpOyIsIihmdW5jdGlvbigpIHtcclxuICAgIFwidXNlIHN0cmljdFwiO1xyXG5cclxuICAgIGZ1bmN0aW9uIFByZWNlZGVuY2UoKSB7XHJcbiAgICAgICAgdGhpcy5udW1iZXJzID0gW107XHJcbiAgICAgICAgdGhpcy5vcGVyYXRpb25zID0gW107XHJcbiAgICB9XHJcblxyXG4gICAgUHJlY2VkZW5jZS5wcm90b3R5cGUuY2FsY3VsYXRlUmVzdWx0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgdmFyIHRlbXBvcmFyeVJlc3VsdCA9IHRoaXMubnVtYmVyc1swXTtcclxuICAgICAgICB2YXIgZmluYWxSZXN1bHQgPSAwO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5vcGVyYXRpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm9wZXJhdGlvbnNbaV0gPT09ICd4Jykge1xyXG4gICAgICAgICAgICAgICAgdGVtcG9yYXJ5UmVzdWx0ICo9IHRoaXMubnVtYmVyc1tpICsgMV07XHJcbiAgICAgICAgICAgIH0gZWxzZSBpZiAodGhpcy5vcGVyYXRpb25zW2ldID09PSAnLycpIHtcclxuICAgICAgICAgICAgICAgIHRlbXBvcmFyeVJlc3VsdCAvPSB0aGlzLm51bWJlcnNbaSArIDFdO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNpZ24gPSB0aGlzLm9wZXJhdGlvbnNbaV0gPT09ICcrJyA/IDEgOiAtMTtcclxuICAgICAgICAgICAgICAgIGlmIChpICE9PSB0aGlzLm9wZXJhdGlvbnMubGVuZ3RoIC0gMSAmJiB0aGlzLm9wZXJhdGlvbnNbaSArIDFdID09PSAnLycgfHwgdGhpcy5vcGVyYXRpb25zW2kgKyAxXSA9PT0gJ3gnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmluYWxSZXN1bHQgKz0gdGVtcG9yYXJ5UmVzdWx0O1xyXG4gICAgICAgICAgICAgICAgICAgIHRlbXBvcmFyeVJlc3VsdCA9IHNpZ24gKiB0aGlzLm51bWJlcnNbaSArIDFdO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICAgdGVtcG9yYXJ5UmVzdWx0ICs9IHNpZ24gKiB0aGlzLm51bWJlcnNbaSArIDFdO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChpID09PSB0aGlzLm9wZXJhdGlvbnMubGVuZ3RoIC0gMSkge1xyXG4gICAgICAgICAgICAgICAgZmluYWxSZXN1bHQgKz0gdGVtcG9yYXJ5UmVzdWx0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmaW5hbFJlc3VsdDtcclxuICAgIH1cclxuICAgIFByZWNlZGVuY2UucHJvdG90eXBlLnByZWNlZGVuY2VPbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIHRoaXMudHVybk9uID0gdHJ1ZTtcclxuICAgIH1cclxuXHJcbiAgICBQcmVjZWRlbmNlLnByb3RvdHlwZS5hZGRPcGVyYXRpb24gPSBmdW5jdGlvbihvcGVyYXRpb24pIHtcclxuICAgICAgICB0aGlzLm9wZXJhdGlvbnMucHVzaChvcGVyYXRpb24pO1xyXG4gICAgfVxyXG5cclxuICAgIFByZWNlZGVuY2UucHJvdG90eXBlLmFkZE51bWJlciA9IGZ1bmN0aW9uKG51bWJlcikge1xyXG4gICAgICAgIHRoaXMubnVtYmVycy5wdXNoKE51bWJlcihudW1iZXIpKTtcclxuICAgIH07XHJcblxyXG4gICAgbW9kdWxlLmV4cG9ydHMuUHJlY2VkZW5jZSA9IFByZWNlZGVuY2U7XHJcblxyXG59KCkpOyJdfQ==
