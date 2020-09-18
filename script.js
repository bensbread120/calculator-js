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

//------------------------------------------------------------------------
// Decides which operator to choose
//------------------------------------------------------------------------
function operate(num1, operator, num2) {
    let answer = 0;
    switch(operator) {
        case "+":
            answer = add(num1, num2);
            break
        case "-":
            answer = subtract(num1, num2);
            break
        case "x":
            answer = multiply(num1, num2);
            break
        case "/":
            answer = divide(num1, num2);
            break
        default:
            console.log("error");
    }
    return answer;
}
//------------------------------------------------------------------------
// Individual Button Functions
//------------------------------------------------------------------------
function clearButton(variables, display) {
    display.textContent = ''
        variables.expression = [];
        variables.num1 = 0;
        variables.operator = '';
        variables.num2 = 0;

}

function numberButton(variables, display) {
    display.textContent+=variables.input;
    variables.expression.push(variables.input);

}

function multiOperations(variables, display) {
    display.textContent+=variables.input;
    variables.num2 = Number(variables.expression.join(''));
    variables.num1 = operate(variables.num1, variables.operator, variables.num2)
    variables.operator = variables.input;
    variables.expression = [];

}

function operatorFirstPress(variables, display) {
    display.textContent+=variables.input;
    variables.operator = variables.input;
    if (variables.num1 == 0) {
        variables.num1 = Number(variables.expression.join(''));
        variables.expression = [];
    }     
    
}

function equalsButton(variables, display) {
    variables.num2 = Number(variables.expression.join(''));
    display.textContent = `${operate(variables.num1, variables.operator, variables.num2)}`;
    variables.num1 = Number(display.textContent);
    variables.operator = '';
    variables.num2 = 0;
    variables.expression = [];
    
}

function backspaceButton(variables, display) {
    if (variables.operator != '' && variables.expression.length > 0) {
        variables.expression.pop();
        display.textContent = display.textContent.slice(0, (display.textContent.length - 1));
    } else if (variables.operator != '') {
        variables.operator = '';
        display.textContent = display.textContent.slice(0, (display.textContent.length - 1));
    } else {
        variables.expression.pop();
        display.textContent = variables.expression.join('');
        
    }    
    
}

//------------------------------------------------------------------------
// Chooses the appropriate button function
//------------------------------------------------------------------------

function whatButton(variables, button, display) {
    if (variables.input === 'clr') {
        clearButton(variables, display);
    //if a number is pressed we display it and add it to the expression array    
    } else if (button.classList.contains('number')) {
        numberButton(variables, display);
    //if an operator is pressed in a string of calculations, the earlier expression is saved as num1     
    } else if (button.classList.contains('operator') && variables.operator!='') {
        multiOperations(variables, display);
    //if its the first instance of operator, add to display and add set num1 value    
    }  else if (button.classList.contains('operator')) {
        operatorFirstPress(variables, display);
    //if equals button is pressed perform operation, return result to display    
    } else if (button.classList.contains('equalizer')) {
        equalsButton(variables, display);
    //if backspace is pressed remove last item from display    
    } else if (button.classList.contains('backspace')) {
        backspaceButton(variables, display);
    }
    
}

//------------------------------------------------------------------------
// listen for any button activity
//------------------------------------------------------------------------

function buttonListener() {
    let variables = {expression : [], num1 : 0, operator : '', num2 : 0};
    //display is the artifical calculator screen
    const display = document.querySelector('.display');
    const buttons = document.querySelectorAll('#button');
    // we add listeners for each button on calculator
    buttons.forEach(button => button.addEventListener('click', () => {
        //for simplicity we set the input value
        variables.input = button.textContent;
        whatButton(variables, button, display);

        })
    )
   
}

buttonListener();