var writes = document.getElementById('screen');
var currNumber = 0;
var result = 0;

var buttons = document.querySelector('.allButtons');
var numberButtons = buttons.querySelectorAll('.number');

for (var i = 0; i <= numberButtons.length - 1; i++) {

    numberButtons[i].onclick = function() {

        var buttonNumber = parseInt(this.innerHTML);

        currNumber = currNumber * 10 + buttonNumber

        writes.value = currNumber;

    }
};

var operationButtons = buttons.querySelectorAll('.operation');

for (var i = 0; i <= operationButtons.length - 1; i++) {
    var isInitialAction = true;
    var prevOperation;
    operationButtons[i].onclick = function() {

        var operation = this.innerHTML;

 /*===================================================================*/
     
     if (operation === this.innerHTML) {

            if (isInitialAction) {
                result = currNumber;
                currNumber = 0;
                writes.value = result;
                isInitialAction = false;
            }
        else {

                if (prevOperation === '+') {
                    result = result + currNumber;
                    currNumber = 0;
                    writes.value = result;
                }
                if (prevOperation === '-') {
                    result = result - currNumber;
                    currNumber = 0;
                    writes.value = result;
                }
                if (prevOperation === 'x') {
                    result = result * currNumber;
                    currNumber = 0;
                    writes.value = result;
                }
                if (prevOperation === '/') {
                    result = result / currNumber;
                    currNumber = 0;
                    writes.value = result;
                }
            }
          prevOperation = this.innerHTML;
        }
    }
}