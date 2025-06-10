let NumCalculation = parseInt(prompt("How many number of calculations would you like to perform ?"));
if (isNaN(NumCalculation)){
    alert("Invalid number input. Please enter valid numbers");
}
let i = 0;
let counter = 0;

while (i < NumCalculation) {
    let result = 0;
    let num1 = parseFloat(prompt("Enter the first number:"));
    let num2 = parseFloat(prompt("Enter the second number:"));

    if (isNaN(num1) || isNaN(num2)) {
        alert("Invalid number input. Please enter valid numbers.");
        i++;
        counter++;
        continue;
    }

    let op = prompt("Choose an operator (+ , - , * , /):");

    if (op === "+") {
        result = num1 + num2;
    } else if (op === "-") {
        result = num1 - num2;
    } else if (op === "*") {
        result = num1 * num2;
    } else if (op === "/") {
        if (num2 === 0) {
            alert("Division by 0 is invalid");
            i++;
            counter++;
            continue;
        } else {
            result = num1 / num2;
        }
    } else {
        alert("You have entered an invalid operator");
        i++;
        counter++;
        continue;
    }

    alert("The result is: " + result);
    i++;
}

alert("The total number of completed calculations is: " + (NumCalculation - counter));
