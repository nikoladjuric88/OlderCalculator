var writes = document.getElementById('screen');
var account = '';

var buttons = document.querySelector('.allButtons');
var numberButtons = buttons.querySelectorAll('.number');

for (var i = 0; i <= numberButtons.length - 1; i++) {

    numberButtons[i].onclick = function() {

        account += this.innerHTML;

        if (account[0] === '0') {
            account = "";
        }
        writes.value = account;
        writes.focus();
        console.log(account);
        /*======================================================================================================================*/
        var first = account.indexOf("-");
        var second = account.indexOf("-", 1);

        if (account[first] === '-' && account[second] === '-') {
            num1 = account.substring(0, second);
            num2 = account.substring(second + 1);

            console.log(num1);

            writes.value = num2;
        }

        var textLength = account.length;

        for (var i = 0; i < textLength; i++) {

            if (account[i] === '+') {
                num1 = account.substring(0, account.indexOf('+'));
                num2 = account.substring(account.indexOf('+') + 1);

                console.log(num1);

                writes.value = num2;
            }

            if (account[i] === 'x') {
                num1 = account.substring(0, account.indexOf('x'));
                num2 = account.substring(account.indexOf('x') + 1);

                console.log(num1);

                writes.value = num2;
            }

            if (account[i] === '/') {
                num1 = account.substring(0, account.indexOf('/'));
                num2 = account.substring(account.indexOf('/') + 1);

                console.log(num1);

                writes.value = num2;
            }
        }
    }
};
/*======================================================================================================================*/
var operationButtons = buttons.querySelectorAll('.operation');

for (var i = 0; i <= operationButtons.length - 1; i++) {

    operationButtons[i].onclick = function() {

        if (!isNaN(account)) {
            account += this.innerHTML;
            console.log(account);

        }
        if (account[0] === '+' || account[0] === 'x' || account[0] === '/') {
            account = "";

        }

        if (account[first] === '-' && account[second] === '-') {

            writes.value = num1;
        }

        var textLength = account.length;
        for (var j = 0; j < textLength; j++) {

            if (account[j] === '+') {

                writes.value = num1;
            }

            if (account[i] === 'x') {

                writes.value = num2;
            }

            if (account[i] === '/') {

                writes.value = num2;
            }
        }
        writes.focus();
    }
};

var btnEquality = document.getElementById("equality");

btnEquality.onclick = function() {

    var textLength = account.length;
    var first = account.indexOf("-");
    var second = account.indexOf("-", 1);

    if (account[first] === '-' && account[second] === '-') {
        num1 = account.substring(0, second);
        num2 = account.substring(second + 1);
        account = num1 - num2;
        writes.value = account;
    }
    for (var i = 0; i < textLength; i++) {

        if (account[i] === '+') {

            account = Number(num1) + Number(num2);
            writes.value = account;
        }

        if (account[i] === 'x') {
            account = num1 * num2;
            writes.value = account;
        }
        if (account[i] === '/') {
            account = num1 / num2;
            writes.value = account;
        }
    }
    writes.focus();
};
/*===================================================================================================================================*/

var btnDelete = document.getElementById("delete");

btnDelete.onclick = function() {
    writes.value = '';

};

var btnOneDelete = document.getElementById("oneDelete");

btnOneDelete.onclick = function() {
    account = account.substring(0, account.length - 1);
    writes.value = account;
    writes.focus();
};


var btnComa = document.getElementById("coma");

btnComa.onclick = function() {

    var textLength = account.length;

    if (!isNaN(account[textLength - 1])) {
        account += '.';
    }
    writes.value = num2;
    writes.focus();
};

var btnSquareRoot = document.getElementById("Squareroot");

btnSquareRoot.onclick = function() {

    if (!isNaN(account)) {
        account = Math.sqrt(account);
        writes.value = account;
    }
    writes.focus();
};


var btnSquare = document.getElementById("Square");

btnSquare.onclick = function() {

    if (!isNaN(account)) {
        account = Math.pow(account, 2);
        writes.value = account;
    }
    writes.focus();
};

var btnPercent = document.getElementById("Percent");

btnPercent.onclick = function() {

    var textLength = account.length;
    for (var i = 0; i < textLength; i++) {
        if (account[i] === '/') {
            account = num1 / num2 * 100;
            writes.value = account;
        }
    }
    writes.focus();
};