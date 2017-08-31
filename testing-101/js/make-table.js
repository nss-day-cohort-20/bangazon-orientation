const sqlite3  = require('sqlite3');
const { customers } = require('../data/customers');
const db = new sqlite3.Database('acme.sqlite');

function createTables() {
  db.run(`DROP TABLE IF EXISTS customers`)
  .run(
    `CREATE TABLE IF NOT EXISTS customers (
    customer_id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT, last_name TEXT, city TEXT, street TEXT, state TEXT, zip TEXT, phone TEXT)`,
    insertRows // callback is a reference to insert Rows
    )
}

function insertRows() {  
  // Insert each of the customer objects into the database.
  customers.forEach( ({firstName, lastName, city, street, state, zip, phone}) => {
    db.run(`INSERT INTO customers VALUES (null, "${firstName}", "${lastName}", "${city}", "${street}", "${state}", "${zip}", "${phone}")`, () => {
      db.all(`SELECT customer_id, first_name FROM customers`, (err, data) => err ? `Error: ${err}` : console.log("customers added"));
    });
  });
}

module.exports = { createTables };
