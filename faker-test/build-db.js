// const sqlite3 = require('sqlite3').verbose();
// const db = new sqlite3.Database('db/mediaStore.sqlite');
const { productTypes } = require('./prod-types');
const { generateCustomers } = require('./customers');
const { generateProducts } = require('./products');

// Create customer collection...
let customers = generateCustomers();
console.log('customers', customers);
// Then pass its length, and the product types' length, into the function to create products,
// so we can randomly assign customer and product type ids to each product 
let products = generateProducts(productTypes.length, customers.length);
console.log('products', products);
