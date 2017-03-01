/*=================================== brojevi==================================================*/

var writes = document.getElementById('screen');

var addNumbers = document.querySelector('.allNumbers');
var addEveryNumber = addNumbers.querySelectorAll('.number');


for (var i = 0; i <= addEveryNumber.length - 1; i++) {

    addEveryNumber[i].onclick = function() {

        writes.value += this.innerHTML;

        if (writes.value[0] === '0') {
            writes.value = "";
        }
        writes.focus();
    }
};

/*=================================== brojevi==================================================*/
/*=================================== operacije================================================*/

var addOperations = addNumbers.querySelectorAll('.operation');

for (var i = 0; i <= addOperations.length - 1; i++) {

    addOperations[i].onclick = function() {

        if (!isNaN(writes.value)) {
            writes.value += this.innerHTML;
        }
        if (writes.value[0] === '-' || writes.value[0] === '+' || writes.value[0] === 'x' || writes.value[0] === '/') {
            writes.value = "";
        }
        writes.focus();
    }
};

var btnEquality = document.getElementById("equality");

btnEquality.onclick = function() {

    var textLength = writes.value.length;
    for (var i = 0; i < textLength; i++) {
        if (writes.value[i] === '-') {
            writes.value1 = writes.value.substring(0, writes.value.indexOf('-'));
            writes.value2 = writes.value.substring(writes.value.indexOf('-') + 1);
            writes.value = writes.value1 - writes.value2;
        } else if (writes.value[i] === '+') {
            writes.value1 = writes.value.substring(0, writes.value.indexOf('+'));
            writes.value2 = writes.value.substring(writes.value.indexOf('+') + 1);
            writes.value = Number(writes.value1) + Number(writes.value2);
        } else if (writes.value[i] === 'x') {
            writes.value1 = writes.value.substring(0, writes.value.indexOf('x'));
            writes.value2 = writes.value.substring(writes.value.indexOf('x') + 1);
            writes.value = writes.value1 * writes.value2;
        } else if (writes.value[i] === '/') {
            writes.value1 = writes.value.substring(0, writes.value.indexOf('/'));
            writes.value2 = writes.value.substring(writes.value.indexOf('/') + 1);
            writes.value = writes.value1 / writes.value2;
        }
    }
    writes.focus();
};

/*=================================== operacije================================================*/
/*=================================== ostalo================================================*/

var btnDelete = document.getElementById("delete");

btnDelete.onclick = function() {
    writes.value = '';
};

var btnOneDelete = document.getElementById("oneDelete");

btnOneDelete.onclick = function() {
    writes.value = writes.value.substring(0, writes.value.length - 1);
    writes.focus();
};

var btnComa = document.getElementById("coma");

btnComa.onclick = function() {
    var textLength = writes.value.length;
    writes.value += '.';
    for (var i = 0; i < textLength; i++) {
        if (writes.value[i] === '.') {
            writes.value = writes.value.substring(0, writes.value.length - 1);
        }
        if (writes.value[i] === '-' || writes.value[i] === '+' || writes.value[i] === 'x' || writes.value[i] === '/') {
            writes.value += '.';

        }
    }
    writes.focus();
};

var btnSquareRoot = document.getElementById("Squareroot");

btnSquareRoot.onclick = function() {

    if (!isNaN(writes.value)) {
        writes.value = Math.sqrt(writes.value);
    }
    writes.focus();
};

var btnSquare = document.getElementById("Square");

btnSquare.onclick = function() {

    if (!isNaN(writes.value)) {
        writes.value = Math.pow(writes.value, 2);
    }
    writes.focus();
};

var btnPercent = document.getElementById("Percent");

btnPercent.onclick = function() {

    var textLength = writes.value.length;
    for (var i = 0; i < textLength; i++) {
        if (writes.value[i] === '/') {
            writes.value1 = writes.value.substring(0, writes.value.indexOf('/'));
            writes.value2 = writes.value.substring(writes.value.indexOf('/') + 1);
            writes.value = writes.value1 / writes.value2 * 100;
        }
    }
    writes.focus();
};