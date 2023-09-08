let counter = 0;
const display = document.getElementById("counterDisplay");

const counterFunction = () => {
    counter += 1;
    display.innerHTML = `${counter}`;
}


// IN CLASS WORK BELOW
/*
console.log('hello world');

const string = "string";
const number = 3;
const boolean = true;
const string_not_boolean = "false";
const array = [1,2,3];
const object = {
    "key":"value",
    "key":"value"
};

const thing = 1;

// var apple = 0;
// let boat = 1;
// const car = 2;

// console.log('before tests:  ', apple, boat, car);

// // var apple = 'a';
// // let boat = 'b';
// // const car = 'c';

// // console.log('after redeclaration:  ', apple, boat, car);

// // reassignments testing
// apple = 'a';
// boat = 'b';
// car = 'c';

// console.log('after reassignments:  ', apple, boat, car);

const arrayTwo = ["one", "two", "three"];
const arrayThree = arrayTwo.forEach(d => d + "thing");
console.log(arrayTwo, arrayThree);

let changeableGlobal = true;
const constantGlobal = true;
const changeEmUp = () => {
    changeableGlobal = false;
    console.log('changeableGlobal', changeableGlobal);
}

changeEmUp();

const input = document.getElementById("cheese");
const label = document.getElementById("label");
// console.log('input', input);
let answer = null;

const shareAnswer = () => {
    answer = input.value;
    console.log(input.value);
    window.alert(`You feel this way about cheese: ${answer}`);
    label.innerHTML = `You said ${answer}. Do you want to change it?`;
}
*/