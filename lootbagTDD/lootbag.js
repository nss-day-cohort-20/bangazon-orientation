'use strict';

// Items can be added to bag.
// Items can be removed from bag, per child only. Removing ball from the bag should not be allowed. A child's name must be specified.
// Must be able to list all children who are getting a toy.
// Must be able to list all toys for a given child's name.
// Must be able to set the delivered property of a child, which defaults to false to true.

const { readFile, writeFile } = require('fs');
const toyDataFile = './data/toyData.json';

module.exports.getToysByChild = (name) => {
  return new Promise( (resolve, reject) => {
    if (name) { 
      console.log('name', name);
      // Initial return to make test pass
      // resolve(["ball", "hula hoop"]); 
      
      // refactor to actually return something from data
      readFile(toyDataFile, (err, data) => {
        console.log(`data ${name} toys`, JSON.parse(data).toys[name].toyList);
        if (err) return reject(err);
        let toys = JSON.parse(data).toys[name].toyList;
        console.log("toys is array?", toys);
        resolve(toys);
      }); 
    } else { 
      reject("Oops, need a name to work with"); 
    }
  });
};

module.exports.addToy = (toy, kid) => {
  return new Promise( (resolve, reject) => {
    readFile(toyDataFile, (err, data) => {
      if (err) reject(err);

      let toyData = JSON.parse(data);
      let toyList = toyData.toys[kid] ? toyData.toys[kid].toyList : null;

      // does child's list exist, and is the toy not in the list?
      if (toyList !== null && toyList.indexOf(toy) === -1) {
        // console.log("adding to existing array", toy );
        toyList.push(toy);
      } else {
        toyData.toys[kid] = {
          delivered: false,
          toyList: [toy]
        }
      }
      writeFile(toyDataFile, JSON.stringify(toyData), (err) => {
        if (err) reject(err);
        resolve("New toy added");
      });
    });
  });
};

module.exports.getAllChildren = () => {

};

module.exports.removeItem = () => {

};

module.exports.makeChildHappy = () => {
  
};
