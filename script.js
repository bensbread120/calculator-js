
//------------------------------------------------------------------------
// listen for any button activity
//------------------------------------------------------------------------

function buttonListener() {
    expression = [];
    num1 = 0;
    operator = '';
    num2 = 0;
    
    const buttons = document.querySelectorAll('#button');
    // we add listeners for each button on calculator
    buttons.forEach(button => button.addEventListener('click', () => {
        //for simplicity we set the input value
        input = button.textContent;
        whatButton(button);

        })
    )
   
}
//------------------------------------------------------------------------
// Chooses the appropriate button function
//------------------------------------------------------------------------

function whatButton(button) {
    const display = document.querySelector('.display');
    const buttonsList = {
        'clear': clearButton,
        'number' : numberButton,
        'operator' : operations,
        'equalizer' : equalsButton,
        'backspace' : backspaceButton
    }
    return buttonsList[button.className](display);
}

//------------------------------------------------------------------------
// Individual Button Functions
//------------------------------------------------------------------------
function clearButton(display) {
    display.textContent = ''
        expression = [];
        num1 = 0;
        operator = '';
        num2 = 0;

}

function numberButton(display) {
    display.textContent+=input;
    expression.push(input);

}

function operations(display) {
    if (operator!='') {
        multiOperations(display);
    } else {
        operatorFirstPress(display);
    }
}

function multiOperations(display) {
    display.textContent+=input;
    num2 = Number(expression.join(''));
    num1 = operate(num1, operator, num2)
    operator = input;
    expression = [];

}

function operatorFirstPress(display) {
    display.textContent+=input;
    operator = input;
    if (num1 == 0) {
        num1 = Number(expression.join(''));
        expression = [];
    }     
    
}

function equalsButton(display) {
    if (display.textContent != '') {
        num2 = Number(expression.join(''));
        display.textContent = `${operate(num1, operator, num2)}`;
        num1 = Number(display.textContent);
        operator = '';
        num2 = 0;
        expression = [];
    }

}

function backspaceButton(display) {
    if (operator != '' && expression.length > 0) {
        expression.pop();
        display.textContent = display.textContent.slice(0, (display.textContent.length - 1));
    } else if (operator != '') {
        operator = '';
        display.textContent = display.textContent.slice(0, (display.textContent.length - 1));
    } else if (num1>0) {
        display.textContent = '';
        num1 = 0
    }else {
        expression.pop();
        display.textContent = expression.join('');
        
    }    
    
}

//------------------------------------------------------------------------
// Decides which operator to choose
//------------------------------------------------------------------------

function operate(num1, operator, num2) {
    const mapping = {
        '+': add,
        '-': subtract,
        'x': multiply,
        '/': divide
    }
    return mapping[operator](num1, num2);
}

//------------------------------------------------------------------------
// Individual Operation Functions
//------------------------------------------------------------------------

function add(num1, num2) {
	return num1 + num2;
}

function subtract(num1, num2) {
	return num1 - num2;
}

function multiply(num1, num2) {
	return num1 * num2
}

function divide(num1, num2) {
    return num1/num2;
}


buttonListener();