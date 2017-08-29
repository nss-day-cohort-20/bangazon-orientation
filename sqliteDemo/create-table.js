'use strict';

console.log('create table module');

const sqlite3 = require('sqlite3').verbose();

module.exports = () => {
  return new Promise( (resolve, reject) => {
    const db = new sqlite3.Database('company.sqlite', (err) => {
      console.log('Connected, createTable');
      db.run(`DROP TABLE IF EXISTS employees`);
      db.run("CREATE TABLE IF NOT EXISTS employees (id INT, first TEXT, last TEXT, salary INT, department TEXT)");
      console.log('table made?');
      resolve();
    });
  })
};

