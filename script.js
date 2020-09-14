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
    const display = document.querySelector('.display');
    const buttons = document.querySelectorAll('#button');
    buttons.forEach(button => button.addEventListener('click', () => {
        let input = button.textContent;
        console.log(button.classlist);
        if (input === 'clr') {
            display.textContent = ''
            expression = [];
            num1 = 0;
            operator = '';
            num2 = 0;
        } else if (button.classList.contains('number')) {
            display.textContent+=input;
            expression.push(input);
        } else if (button.classList.contains('operator')) {
            display.textContent+=input;
            operator = input;
            if (num1 == 0) {
                num1 = Number(expression.join(''));
                expression = [];
            }     
            
        } else if (button.classList.contains('equalizer')) {
            num2 = Number(expression.join(''));
            display.textContent = `${operate(num1, operator, num2)}`;
            num1 = Number(display.textContent);
            operator = '';
            num2 = 0;
            expression = [];
        }
        console.log(expression);
        
        })
    )
   
}

calculator();