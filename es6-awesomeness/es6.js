
// name will be hoisted, but NOT its value, meaning name will exist but it will be undefined if we tried to console.log it on line 1 of this file
var name = "Fred";
// newName and newerName would not be hoisted, so logging them earlier than they are defined would error, saying they are not defined (which is different from undefined)
let newName = "Frederica";
const newerName = "Freddie";
newName = "Larry"; // let can be reassigned, but not redefined
// let newName = "Joan" // so this will fail
// newerName = "Mona"; // will error. Can't reassign consts

// console.log(name);
// console.log(newName);
// console.log(newerName);

// ************************************************
// object literal shorthand
const wow = "Hi there";
const es6 = "ES6";
const myNum = () => console.log(23);

let myOldObj = {
  wow: wow,
  es6: es6,
  myNum: myNum
};

let myNewObj = { wow, es6, myNum };
// console.log('myNew Obj number', myNewObj.wow);

// ************************************************
// destructuring assignment
const dog = {
  color: "multi",
  name: { firstName: "Murph"},
  breed: "Aussie",
  speak: () => "woof"
}

// old way
let myDogColor = dog.color;
let myDogbreed = dog.breed;

// new way
const { name: {firstName}, speak, color } = dog;
console.log('name of my dog, really?', firstName );
console.log("My dog says", speak());

// You can even pass in an obj as an argument and destructure it 
function dogStuff({name: {firstName}, breed}) {
  console.log(`My dog's name is ${firstName}, and he is an ${breed}`);
}
dogStuff(dog);

// You can do it with arrays, too
const myArr = [1,2,3,4,5,6,7,8];
const [a,b] = myArr;
// console.log('a, b', a, b);

const [,,,,,,c,d] = myArr;
// console.log('c and d', c, d);

// Spread syntax
let countries = ["Moldova", "USA"];
let otherCountries = ["Ukraine", "Canada"];

let meldedCountries = [...countries, ...otherCountries];
// console.log('melded', meldedCountries);

// WTF?
let junkBox = ['1', 'Fred', '5'];

let funkyObject = junkBox.entries();
console.log('funky', funkyObject);

// For of loop
for (let [index, elem] of funkyObject) {
  console.log(index, elem );
}

// ************************************************
// combining objects
const doggy = {
  awesome: true,
  name: "Rover",
  color: "All"
};

const cat = {
  cool: false,
  sneezy: true,
  killsBirds: true,
  name: "Evil Incarnate"
};

const UnholyAlliance = Object.assign(doggy, cat);
// const Wow = {...doggy, ...cat}
// console.log('Oh, boy', UnholyAlliance);

const DogCopy = Object.assign({}, doggy);
// console.log('NewDog', DogCopy );

// ************************************************
// Map and Set kinda like Object and Array
// Set
const awesomeSet = new Set();

awesomeSet.add(10);
awesomeSet.add(6);
awesomeSet.add("Back or front?");
// console.log('awesomeSet', awesomeSet.has(10));
// console.log('awesomeSet size', awesomeSet.size );
awesomeSet.delete(6);

let JasonArr = [6,10];
awesomeSet.add([6,10]);
// console.log('Awesome set', awesomeSet);

// console.log('awe', awesomeSet.has(JasonArr));
JasonArr.push(20);
// console.log('Awesome set', awesomeSet);

let hungrySet = new Set();
hungrySet.add("Lunch");

awesomeSet.add(hungrySet);
console.log('awesome nest', awesomeSet);

// Map
let user = {
  name: "Linda",
  age: 34,
  height: "short",
  happy: true,
  saymyName: () => "My name is user.name",
};

function sayMyLastName() {
  return "Shep";
}

let myMap = new Map();
myMap.set("name", "Larry");
console.log("myMap", myMap.values());
console.log("myMap", myMap.keys());
