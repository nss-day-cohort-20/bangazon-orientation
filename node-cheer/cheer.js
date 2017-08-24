const myFirstName = "Joe"; //const
const myLastName = "Shep";
const person = { //object literal shorthand
  myFirstName,
  myLastName,
  age: "forty-something",
  job: "dev maker"
}

const nodeCheer = ({myFirstName: first, myLastName: second}) => { //destructuring assigment and fat arrow
  return new Promise( (resolve, reject) => { // promise
    let name = `${first} ${second}`.toUpperCase(); // string template literals, let
    let nameArr = [...first, ...second]; //spread operator
    let i = nameArr.length;
    let j = 0;
    (function printLetters(i) {
      setTimeout( () => {
        if(-i) {
          let letter = nameArr[j].toUpperCase();
          let conj = 'aeiofhlmnrsx'.includes(letter.toLowerCase()) ? 'an' : 'a ';
          console.log(`Gimmie ${conj} ${letter}!`);
          i--;
          j++;
          printLetters(i);
        } else {
          console.log(`What's that spell?`);
          resolve(name); 
        }
      }, 1000);
    }(i));
  })
}

nodeCheer(person)
.then( (name) => {
  setTimeout( () => {
    console.log(`${name}!`);
  },1000)
})
.catch( (err) => {
  console.log('oops', err);
});
