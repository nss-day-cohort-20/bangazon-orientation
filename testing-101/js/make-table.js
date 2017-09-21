const sqlite3  = require('sqlite3');
const { customers } = require('../data/customers');
const db = new sqlite3.Database('acme.sqlite');

function createTables() {
  return new Promise( (resolve, reject) => {
    db.run(`DROP TABLE IF EXISTS customers`)
    .run(
      `CREATE TABLE IF NOT EXISTS customers (
      customer_id INTEGER PRIMARY KEY AUTOINCREMENT, first_name TEXT, last_name TEXT NOT NULL, city TEXT, street TEXT, state TEXT, zip TEXT, phone TEXT)`, (err) => {
        if (err) return reject(err);
        resolve(insertRows());
      });
  });
}

function insertRows() {
  // Insert each of the customer objects into the database.
  return Promise.all(customers.map( ({firstName, lastName, city, street, state, zip, phone}) => {
    return new Promise( (resolve, reject) => {
      db.run(`INSERT INTO customers VALUES (null, "${firstName}", "${lastName}", "${city}", "${street}", "${state}", "${zip}", "${phone}")`, function (err) {
        if (err) return reject(err);
        resolve(this.lastID);
      });
    });
  }));
}

module.exports = { createTables };
