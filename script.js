function add (num1, num2) {
	return num1 + num2;
}

function subtract (num1, num2) {
	return num1 - num2;
}

function multiply (num1, num2) {
	return num1 * num2
}

function divide(num1, num2) {
    return num1/num2;
}
//takes in two numbers and an operator and activate appropriate function
function operate(num1, operator, num2) {
    let answer = 0;
    if (operator === "+") {
        answer = add(num1, num2);
    } else if (operator === "-") {
        answer = subtract(num1, num2);
    } else if (operator === "x") {
        answer = multiply(num1, num2);
    } else if (operator === "/") {
        answer = divide(num1, num2);
    } else {
        console.log("error");
    } 
    return answer;
}

function calculator() {
    let expression = [];
    let num1 = 0;
    let operator = '';
    let num2 = 0;
    //display is the artifical calculator screen
    const display = document.querySelector('.display');
    const buttons = document.querySelectorAll('#button');
    // we add listeners for each button on calculator
    buttons.forEach(button => button.addEventListener('click', () => {
        //for simplicity we set the input value
        let input = button.textContent;
        //if the clear button is pressed we reset the display and reset all variables
        if (input === 'clr') {
            display.textContent = ''
            expression = [];
            num1 = 0;
            operator = '';
            num2 = 0;
        //if a number is pressed we display it and add it to the expression array    
        } else if (button.classList.contains('number')) {
            display.textContent+=input;
            expression.push(input);
        //if an operator is pressed in a string of calculations, the earlier expression is saved as num1     
        } else if (button.classList.contains('operator')&& operator!='') {
            display.textContent+=input;
            num2 = Number(expression.join(''));
            num1 = operate(num1, operator, num2)
            operator = input;
            expression = [];
        //if its the first instance of operator, add to display and add set num1 value    
        }  else if (button.classList.contains('operator')) {
            display.textContent+=input;
            operator = input;
            if (num1 == 0) {
                num1 = Number(expression.join(''));
                expression = [];
            }     
        //if equals button is pressed perform operation, return result to display    
        } else if (button.classList.contains('equalizer')) {
            num2 = Number(expression.join(''));
            display.textContent = `${operate(num1, operator, num2)}`;
            num1 = Number(display.textContent);
            operator = '';
            num2 = 0;
            expression = [];
        //if backspace is pressed remove last item from display    
        } else if (button.classList.contains('backspace')) {
            if (operator != '' && expression.length > 0) {
                expression.pop();
                display.textContent = display.textContent.slice(0, (display.textContent.length - 1));
            } else if (operator != '') {
                operator = '';
                display.textContent = display.textContent.slice(0, (display.textContent.length - 1));
            } else {
                expression.pop();
                display.textContent = expression.join('');
                
            }    
            
        }
        
        
        })
    )
   
}

calculator();