const { assert: { equal, deepEqual, notEqual, isFunction, isObject } } = require('chai');
const { getCustomer, addCustomer } = require('../js/main');
const { createTables } = require('../js/make-table');


describe('main', () => {
  describe('getCustomer is cool', () => {
    it('should exist', () => {
      isFunction(getCustomer);
    });

    it('should return an object',  () => {
      getCustomer("615-555-5309")
      .then( (customer) => {
        isObject(customer, "Hooray! It's a bouncing baby obj")
      })
    });

    it("should return a customer's info", () => {
      getCustomer("615-555-5309")
      .then( (customer) => {
        deepEqual(customer, {first_name: "Danny", last_name: "Elfman"});
      });
    });
  }); //end get

  describe('add customer', () => {

    beforeEach( (done) => {
      createTables()
      .then( (idArr) => {
        console.log('idArr', idArr);
        done();
      });
    });

    it('should exist', () => {
      isFunction(addCustomer);
    });

    it('should return an object', () => {
      let newCust = {
        first_name: "Pat",
        last_name: "Smith",
        city: "Nowhere",
        state: "Alabama",
        zip: "22288",
        phone: "555-444-5555"
      }

      return addCustomer(newCust)
      .then( (response) => {
        isObject(response)
      });
    });

    it('should return a confirmation msg and id of new customer', () => {
      let newCust = {
        first_name: "Pat",
        last_name: "Smith",
        city: "Nowhere",
        state: "Alabama",
        zip: "22288",
        phone: "555-444-5555"
      };
      let expected = {msg: "New customer added", id: 9};

      return addCustomer(newCust)
      .then( (response) => {
        equal(response.msg, expected.msg);
      });
    });

    it.skip('should freak if you do not add a last name', () => {
      let expected = "Please include a last name";
      return addCustomer()
      .then( (response) => {
        equal(response.msg, expected.msg)
      });
    });
  });
});










// testing random stuff to get used to the syntax
// describe('Just a test', () => {
//   it('should be equal', () => {
//     let expected = 3;
//     let actual = 1 + 2;
//     equal(expected, actual);
//   });
// });

// describe('Just a test on an Array', () => {
//   describe('indexOf()', () => {
//     it('should return -1 when the val is not present', () => {
//       equal(-1, [1,2,3].indexOf(4))
//       equal(-1, [23456, "fred", true].indexOf("monkey"));
//     });

//     it('should return a positive index num when the val is present', () => {
//       equal(1, [1,2,3].indexOf(2));
//     });
//   });

  // describe('reverse()', () => {
  //   it('should......')
  // })
// });


