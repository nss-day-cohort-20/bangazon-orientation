// const { readFileSync } = require('fs');

// const fileArg = process.argv[2];

// if (fileArg) {
//   try {
//     const data = readFileSync(fileArg);
//     process.stdout.write(data.toString());
//   } catch(err) {
//     console.log('Error', err.stack); 
//   }
// } else {
//   process.exit();
// }

// console.log('This is the synchronous version');

// const { readFile } = require('fs');
// const fileArg = process.argv[2];

// if ( fileArg ) {
//   readFile(fileArg, (err, data) => {
//     if(err) return console.error(err);
//     process.stdout.write(data);
//   });
// } else {
//   process.exit();
// }

// console.log('this is the async version');

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


























