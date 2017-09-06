'use strict';
const chai = require('chai');
const { assert, assert: { isFunction, equal, isObject, deepEqual } } = require('chai');
const chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);
const { 
  getToysByChild, 
  addToy, 
  getAllChildren, 
  removeItem,
  makeChildHappy
} = require('../lootbag');

describe("lootbag", () => {
  // Must be able to list all toys for a given child's name.
  describe('getToysByChild', () => {
    it('should be a function', () => {
      isFunction(getToysByChild);
    });

    let tests = [
      {child: "Timmy", expected: ["Furby", "soccer ball", "stuffed unicorn", "Bananagrams"], method: getToysByChild},
      {child: "Martha", expected: ["football", "cow"], method: getToysByChild},
      {child: "Danny", expected: [], method: getToysByChild}
    ];
    
    // Read these to better understand the two tests below
    // https://www.sitepoint.com/promises-in-javascript-unit-tests-the-definitive-guide/
    // https://github.com/domenic/chai-as-promised
    it('should output an array', () => Promise.all(tests.map( (test) => assert.eventually.isArray(test.method(test.child) ))));
  
    it("should output array of a child's toys", () => Promise.all(tests.map( (test) => assert.eventually.deepEqual(test.method(test.child), test.expected ))));

  }); //end of getToysByChild tests

  // Items can be added to bag.
  describe('addToy', () => {
    it('should be a function', () => {
      isFunction(addToy);
    });

    it(`should save an object that contains a name and a toy`, () => {
      return addToy("Barbie Doll", "Fred")
      .then( () => {
        return getToysByChild("Fred")
      })
      .then( (data) => {
        deepEqual(data, ["Barbie Doll"]);
      })
    });
  });

  // Must be able to list all children who are getting a toy.
  describe('getAllChildren', () => {
    it('should be a function', () => {
      isFunction(getAllChildren);
    });
  });

  // Items can be removed from bag, per child only. Removing ball from the bag should not be allowed. A child's name must be specified.
  describe('removeItem', () => {
    it('should be a function', () => {
      isFunction(removeItem);
    });
  });

  // Must be able to set the delivered property of a child, which defaults to false, to true.
  describe('makeChildHappy', () => {
    it('should be a function', () => {
      isFunction(makeChildHappy);
    });
  });

});
