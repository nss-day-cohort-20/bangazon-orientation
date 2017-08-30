'use strict';

const sqlite3 = require('sqlite3');
const db = new sqlite3.Database('acme.sqlite');
const { customers } = require('./customers');
const { orders } = require('./orders');

// db stuff ************************************************************
db.run(`DROP TABLE IF EXISTS customers`);
db.run(`DROP TABLE IF EXISTS orders`);

db.run("CREATE TABLE IF NOT EXISTS customers (id INTEGER PRIMARY KEY, firstName TEXT, lastname TEXT, address TEXT)");
db.run("CREATE TABLE IF NOT EXISTS orders (id INTEGER PRIMARY KEY, orderDate TEXT, amount DECIMAL, customerId INTEGER)");

setTimeout( () => {
  orders.forEach( ({orderDate, amount, customerId}) =>  {
    db.run(`INSERT INTO orders VALUES (null, "${orderDate}", ${amount}, ${customerId})`)
  });
  
  customers.forEach( ({firstName, lastName, address}) =>  {
    db.run(`INSERT INTO customers VALUES (null, "${firstName}", "${lastName}", "${address}")`)
  });
}, 500)
// end db stuff ************************************************************

// Find all orders placed by a particular customer.
setTimeout( () => {
  db.all(`SELECT orderDate, amount 
    FROM orders
    JOIN customers
    ON orders.customerId = customers.Id
    WHERE customers.id = 2`,
    (err, data) => {
      if (err) {
        return console.log('Dang', err.toString());
      }
      console.log('all orders placed by a cust with id of 2', data);  
    });

    // A list of those customers who placed an order and the details of the order they placed.
    db.all(`SELECT firstName, lastName, orderDate, amount
    FROM customers c
    JOIN orders
    ON c.id = customerId`,
    ( err, data ) => {
      console.log('customers who placed orders', data);
    });

    // or try this
    // SELECT firstName, lastName, c.id
    // FROM customers c
    // JOIN orders
    // ON c.id = customerId
    // GROUP BY c.id
    // ORDER BY orderDate

    // See orders and customers regardless of whether a customer placed an order or not
    SELECT firstName, lastName, orderDate, amount
    FROM customers c
    LEFT JOIN orders 
    ON c.id = customerId

    // to see JUST the null orders
    // SELECT firstName, lastName, orderDate, amount
    // FROM customers c
    // LEFT JOIN orders 
    // ON c.id = customerId
    // WHERE orderDate is null





}, 1000);






