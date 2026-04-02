function makeGreeting(name) {
    function greet() {
        console.log("Hello, " + name + "!");
    }
    return greet;
}


const sayHelloToSam = makeGreeting("Sam");
sayHelloToSam();

const sayHelloToRitu = makeGreeting("Ritu");
sayHelloToRitu();

const sayHelloToJohn = makeGreeting("John");
sayHelloToJohn();

const sayHelloToJames = makeGreeting("James");
sayHelloToJames();


const counter = (function(){
    let count = 0;
    return function() {
        count ++;
        return count;
    };
})();
console.log(counter());
console.log(counter());
console.log(counter());


function doMath(a, b, callback) {
    const result = a + b;
    callback(result);
}

doMath(5, 10, function(result) {
    console.log ("the result is: " + result);
});


const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
numbers.forEach(function(number) {
    console.log(number * 2);
});


function waitAndRun(callback) {
    setTimeout(callback, 2000);
}
 
waitAndRun(() => {
    alert("Hello after 2 seconds!");
});


waitAndRun();


function filterEven(numbers, callback) {
    const evenNumbers = numbers.filter(num => num % 2 === 0);
    callback(evenNumbers);
}

filterEven([1, 2, 3, 4, 5, 6], function(result) {
    console.log(result);
});


function showAlert() {
    alert("Button was clicked!");
}
document.getElementById("myButton").addEventListener("click", showAlert);
