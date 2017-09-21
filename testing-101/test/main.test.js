const { assert: { equal, deepEqual, notEqual, isFunction, isObject } } = require('chai');
const { getCustomer, addCustomer } = require('../js/main');
const { createTables, insertRows } = require('../js/make-table');


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
      .catch( (err) => {
        console.log('erroe getting customer', err);
      });
    });

    it("should return a customer's info", () => {
      getCustomer("615-555-5309")
      .then( (customer) => {
        deepEqual(customer, {first_name: "Danny", last_name: "Elfman"});
      })
      .catch( (err) => {
        console.log("err getting cust info", err)
      });
    });
  }); //end get

  describe('addCustomer', () => {
    beforeEach( (done) => {
      createTables()
      .then( (msg) => {
        console.log('Create Then', msg );
        return insertRows()
      })
      .then( (idArr) => {
        console.log('idArr', idArr);
        done();
      });
    });

    it('should exist', () => {
      isFunction(addCustomer);
    });

    it(`should return a object w/confirmation msg and last ID`, () => {
      let newCust = {
        first_name: "Pat",
        last_name: "Smith",
        street: "123 Sesame St",
        city: "Nowhere",
        state: "Alabama",
        zip: "22222",
        phone: "222-444-5555"
      }

      let expected = {msg: "New customer added", custId: 9}
      return addCustomer(newCust)
      .then( ( result ) => {
        deepEqual(result, expected);
      });
    });
  }); // end of addCustomer block

  describe(`delete customer`, () => {
    // This beforeEach feels repetitive, since we also added it to the 'add' describe block.
    // Maybe just put at top level describe block? But it's not really necessary
    // before the 'get' tests What do you think?
    beforeEach( (done) => {
      createTables()
      .then( (msg) => {
        console.log('Create Then', msg );
        return insertRows()
      })
      .then( (idArr) => {
        console.log('idArr', idArr);
        done();
      });
    });

    // Have a test here that fails. What next?
    it(`should return an object`, () => {
      deleteCustomer()
      .then( (result) => {
        isObject(result);
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


