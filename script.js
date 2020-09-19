
//------------------------------------------------------------------------
// listen for any button activity
//------------------------------------------------------------------------

function buttonListener() {
    let expression = [];
    let num1 = 0;
    let operator = '';
    let num2 = 0;
    
    const display = document.querySelector('.display');
    const buttons = document.querySelectorAll('#button');
    // we add listeners for each button on calculator
    buttons.forEach(button => button.addEventListener('click', () => {
        //for simplicity we set the input value
        input = button.textContent;
        
        // ------------------------------------------------------------------------
        // Individual Operation Functions
        // ------------------------------------------------------------------------        
        let add = function() {
            return num1 + num2;
        }
        
        let subtract = function() {
            return num1 - num2;
        }
        
        let multiply = function() {
            return num1 * num2
        }
        
        let divide = function() {
            return num1/num2;
        }

        let bailout = function() {
            return console.log("error")
        }

        //------------------------------------------------------------------------
        // Decides which operator to choose
        //------------------------------------------------------------------------
        let operate = function() {
            const mapping = {
                '+': add,
                '-': subtract,
                'x': multiply,
                '/': divide,
                '': bailout                
            }
            return mapping[operator]();
        }
        
        //------------------------------------------------------------------------
        // Individual Button Functions
        //------------------------------------------------------------------------
        let clearButton = function() {
            display.textContent = ''
            expression = [];
            num1 = 0;
            operator = '';
            num2 = 0;
        
        }

        
        let numberButton = function() {
            display.textContent+=input;
            expression.push(input);
        }

        

        let multiOperations = function() {
            display.textContent+=input;
            num2 = Number(expression.join(''));
            num1 = operate(num1, operator, num2)
            operator = input;
            expression = [];
        
        }
        
        
        let operatorFirstPress = function() {
            display.textContent+=input;
            operator = input;
            if (num1 == 0) {
                num1 = Number(expression.join(''));
                expression = [];
            }     
            
        }
        
        
        let operations = function() {
            if (operator!='') {
                multiOperations(display);
            } else {
                operatorFirstPress(display);
            }
        }
        
        
        let equalsButton = function() {
    
            num2 = Number(expression.join(''));
            display.textContent = `${operate(num1, operator, num2)}`;
            num1 = Number(display.textContent);
            operator = '';
            num2 = 0;
            expression = [];
            
        
        }

        let backspaceButton = function() {
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
        // Chooses the appropriate button function
        //------------------------------------------------------------------------
        let whatButton = function() {
            const buttonsList = {
                'clear': clearButton,
                'number' : numberButton,
                'operator' : operations,
                'equalizer' : equalsButton,
                'backspace' : backspaceButton
            }
            return buttonsList[button.className]();
        }
        whatButton();
    })
    )
   
}

buttonListener();