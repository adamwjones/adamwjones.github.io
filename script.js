//Targeting HTML DOM elements to write to page
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

// Object to hold the functions to generate random letters and numbers
const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
};

// Event Handler to get values from user, then to write result into window
generateEl.addEventListener('click', () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked; 
    const hasUpper = uppercaseEl.checked; 
    const hasNumber = numbersEl.checked; 
    const hasSymbol = symbolsEl.checked; 

    resultEl.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbol, length);
});

//Generate Password Function
function generatePassword(lower, upper, number, symbol, length) {
    let generatedPassword = '';
    const typesCount = lower + upper + number + symbol; //equals the number of checked boxes

    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter (item => Object.values(item)[0]); 
    
    //Created an Array of objects with use of internal curly brackets, then used .filter to filter through objects in the array and if values are false then it should be filtered out of the array

    if(typesCount === 0){ //if nothing is selected, then return message 
    return 'Select at least one below';
    }

    for(let i = 0; i < length; i += typesCount){
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]()
        });
    }
    const finalPassword = (generatedPassword.slice(0, length));

    if(finalPassword.length < 8 || finalPassword.length > 128){ //if outside of 8-128 range, then return message
        return 'Password length must be between 8-128 characters';
    } 

    return finalPassword
}

//Generate Random Lowercase Letter function
function getRandomLower(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97); 
}

//Generate Random Uppercase Letter function
function getRandomUpper(){
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65); 
}

//Generate Random Number function
function getRandomNumber(){
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48); 
}

//Generate Random Symbol function
function getRandomSymbol(){
    const symbols = "!@#$%^&*(){}[]=<>/,.?"
    return symbols[Math.floor(Math.random() * symbols.length)]; 
}

// Bowser Character Set Reference: http://www.net-comber.com/charset.html

// RANDOM LETTERS: Set Math.random to generate random decimal number, muliplied by 26 to make it a random number between 1-26 based on 26 letters, wrapped method in Math.floor to round down to whole number, add either 97 for lowercase or 65 for uppercase to the random number between 1-26. In the Bowser Character Set lowercase letters start at position 97 and uppercase start at position 65.

// RANDOM NUMBERS: Same as LETTERS except, decimal number is multiplied by 10 to capture range of 0-9. In the Bowser Character Set, 0 starts at position 48.

// RANDOM SYMBOLs (i.e., Special Characters): Added a string of symbols for the return function to reference. Placed Math.random wrapped in Math.floor in the [] and multiplied by the lenth of string of symbols created.  