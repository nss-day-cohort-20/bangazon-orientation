// run this file directly once to create the db
const sqlite3 = require('sqlite3');
const { createTables } = require('./make-table');

(function createDb() {
  new sqlite3.Database('acme.sqlite', createTables);
}());
