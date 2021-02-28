const numbersArr = document.getElementsByClassName("buttonNum");
const functionalBtnArray = document.getElementsByClassName("functional");

const numberAdd = document.getElementById("Add");
const numberSubtract = document.getElementById("Subtract");
const numberMultiply = document.getElementById("Multiply");
const numberDivide = document.getElementById("Divide");
const numberEquals = document.getElementById("Equals");
const numberCLS = document.getElementById("CLS");
const display = document.getElementById("display");
const comma = document.getElementById("pointer");

const buttonArr = Array.from(document.querySelectorAll(".button"));


function add(a,b) {
    return a+b;
}

function subtract(a,b) {
    return a-b;
}

function multiply(a,b) {
    return a*b;
}

function divide(a,b) {
    return a/b;
}

function operate(operator,firstNumber, secondNumber) {

    switch (operator) {
        case '+':
            return add(firstNumber, secondNumber);
        case '-':
            return subtract(firstNumber, secondNumber);
        case '*':
            return multiply(firstNumber, secondNumber);
        case '/':
            return divide(firstNumber, secondNumber);
            
        default:
            // alert('awaria');
            // break;
            return firstNumber;
    }
}



function operateDisplay(number, whatAmI) {
    if(whatAmI == "1stNumber")
    {
        if(number == "." && (result.includes('.')|| result.length == 0))
        {
            console.log("canIputcomma = false" );
            return;
        }
        else{            
            console.log("canIputcomma = true" );
            display.textContent += number;
            result += number;
        }
        // console.log("rsult= " + result);
    }else if(whatAmI == "operator"){
        let lastCharacter = (display.textContent.substr(-1,1));

        if(display.textContent.substr(display.textContent.length - 1,1)=="."){
            display.textContent += 0;
            result+=0;
        }
        if (lastCharacter == '+' || lastCharacter == '-' || lastCharacter == '/' || lastCharacter == '*'){
            display.textContent = display.textContent.substr(0,display.textContent.length - 1) + number;
        }else{
            display.textContent += number;
        }
        // console.log("ostatnia liczna = "  +display.textContent.substr(display.textContent.length - 2,1) + "whatAmI= " + whatAmI );


    }else  if (whatAmI == "2ndNumber"){

        // if(canIPutComma(number, secondNumber)==false)

        if(number == "." && ((secondNumber.includes('.') || secondNumber.length == 0)))
        {
            return;
        }
        else{
            display.textContent += number;
            secondNumber += number;
        }
        // console.log("secondNumber =" + secondNumber);

    }else if(whatAmI == "result"){
        display.textContent = number;
    }else{
        alert("cos zepsute w operateDisplay");
    }
}

function handleResult(operator) {
    opereatorCurrent = operator;
    operateDisplay(opereatorCurrent , "operator");

    // console.log("reult przed =" + result);
    result = operate(operatorInMemory,parseFloat(result),parseFloat(secondNumber));
    // console.log("reult  po =" + result);
    // console.log("secondNumber = " + secondNumber);

    secondNumber = '';
    whatAmI = "2ndNumber";
    operatorInMemory = operator;
}

var whatAmI = '1stNumber';
var currentResult = '';
var secondNumber = '' ;
var operatorInMemory = '';
var opereatorCurrent = '';
var result ='';

//buttons 1-9
var i;
for(i = 0; i<=9; i++){
    let btnContent = numbersArr[i].textContent;
        numbersArr[i].addEventListener("click",function() {operateDisplay(btnContent, whatAmI);
    });
}

//comma button
comma.addEventListener("click", ()=>{
    operateDisplay(".", whatAmI);
});

//add
functionalBtnArray[0].addEventListener("click", function(){
    // if(display.textContent.substr(0,display.textContent.length - 1)!="+")
    handleResult("+");
});
//subtract
functionalBtnArray[1].addEventListener("click", function(){
    handleResult("-");

});
//multiply
functionalBtnArray[2].addEventListener("click", function(){
    handleResult("*");
});
//divide
functionalBtnArray[3].addEventListener("click", function(){
    handleResult("/");
});

// =
numberEquals.addEventListener("click", ()=>{
    
    let lastCharacter = (display.textContent.substr(-1,1));
    if (!(lastCharacter == '+' || lastCharacter == '-' || lastCharacter == '/' || lastCharacter == '*')){
        result = operate(operatorInMemory,parseFloat(result),parseFloat(secondNumber));
        operateDisplay(result,"result");

        opereatorCurrent = "";
        secondNumber = '';
        whatAmI = "2ndNumber";
        operatorInMemory = "";
    }
});


//Clear
numberCLS.addEventListener("click", ()=>{
    display.textContent = '';
    result ='';
    whatAmI = '1stNumber';
    currentResult = '';
    secondNumber = '' ;
    operatorInMemory = '';
});


//kayboard compatybility

document.addEventListener("keydown", (event)=>{
    for (const number of numbersArr) {
        // console.log(number);
        if(event.key == number.textContent){
            number.click();
        }
    }

    for(const btn of buttonArr){
        if(event.key== btn.textContent){
            btn.click();
        }else if(event.key == "c" || event.key == "C"){
            buttonArr[1].click();
        }else if(event.key == "Enter"){
            buttonArr[4].click();
        }
        }
    
});
