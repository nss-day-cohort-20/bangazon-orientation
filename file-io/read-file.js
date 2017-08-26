// SECTION ONE: READFILE ****************************************

// #1: Synchronous file reading
const { readFileSync } = require('fs');

const fileArg = process.argv[2];

if (fileArg) {
  try {
    const data = readFileSync(fileArg);
    process.stdout.write(data.toString());
  } catch(err) {
    console.log('Error', err.stack); 
  }
} else {
  process.exit();
}

console.log('This is the synchronous version');

// #2: asynchronous file reading
const { readFile } = require('fs');
const fileArg = process.argv[2];

if ( fileArg ) {
  readFile(fileArg, (err, data) => {
    if(err) return console.error(err);
    process.stdout.write(data);
  });
} else {
  process.exit();
}

console.log('this is the async version');

// SECTION TWO: STREAMS ****************************************
const { createReadStream, createWriteStream, appendFile, writeFile } = require('fs');
const { Transform, Writable } = require('stream');
const upperCaseify = Transform();
const writeStream = Writable();

// console.log('uppercaseifys tramsform',  upperCaseify._transform );

upperCaseify._transform = (buffer, _, callback) => {
  callback(null, buffer.toString().toUpperCase());
};

writeStream._write = (buffer, _, next) => {
  writeFile('messageUppercase.txt', buffer, (err) => {
    if (err) throw err;
    console.log("The data to write was added to file!");
  });
  next();
};

createReadStream("message.txt").pipe(upperCaseify).pipe(writeStream);

// SECTION THREE: MORE ADVANCED STREAMS ******************************
// This works if there are 10 or more matches, or 0 matches. But what if there are < 10 matches?
// Can you figure out how to refactor to fix it?

const { createReadStream } = require('fs');
const { Writable } = require('stream');
const { map, split } = require('event-stream');
const limitToTen = require('./limit-ten')();

const userInput = process.argv[2] ? process.argv[2].toLowerCase() : null;
const writeStream = Writable();
const wordListStream = createReadStream("/usr/share/dict/words");

writeStream._write = (word, _, next) => {
  if (word.toString() === "limit reached") {
    console.log('Limit reached');
    process.exit();
  }
  process.stdout.write(word);
  next();
};

if(!userInput) {
  console.log('Usage: ./word-search [search term]');
  process.exit();
};

wordListStream
.pipe(split())
.pipe(map( (word, next) => {
    word.toString().toLowerCase().includes(userInput) ? next(null, word + "\n") : next();
  })
)
.pipe(limitToTen)
.pipe(writeStream);

// The `end` event will only be fired if we get no matches, because `writeStream` will exit the process once
// the list reaches ten words, keeping the `end` event from firing
wordListStream.on('end', () => {
  console.log("No matches found, dude");
});
