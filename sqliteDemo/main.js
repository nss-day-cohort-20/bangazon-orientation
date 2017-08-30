"use strict";

const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('company.sqlite', (err) => {
  console.log('Connected, main');
  require('./create-table')()
  .then( () => {
    populateEmployees();
    getEmployeesAndDoStuff();
  });
});

// db.run('INSERT INTO employees VALUES (1, "Fred", "Jones", 23000, "Janitorial")');
// db.run('INSERT INTO employees VALUES (2, "Linda", "Mack", 83000, "CTO")');
const populateEmployees = () => {
  const { list } = require('./employees.json');
  return new Promise ( (resolve, reject) => {
    list.forEach( (employee) => {
      db.run(`INSERT INTO employees VALUES(
        ${employee.id},
        "${employee.firstName}",
        "${employee.lastName}",
        ${employee.salary},
        "${employee.dept}")`
      )
    });
  }); 
};

const getEmployeesAndDoStuff = () => {
  console.log('getEmployees called');
  
  // Gets one result, even if we ask for all ( * )
  db.get('SELECT * FROM employees', (err, {id, first, last, department, salary}) => {
    console.log('from db.get');
    console.log(`${id} ${first} ${last} ${department} ${salary}`); // only logs first employee
  });

  // gives us back an array of results
  db.all('SELECT * FROM employees', (err, allRows) => {
    if (err) {
      return console.log('err', err.toString());
    }
    console.log('all rows all', allRows);

    // sort alphabetically by first name
    // make array of emps who make > 50k
    // make array of person's first and last names and salary
    // allRows.sort( (a,b) => a.first.localeCompare(b.first) )
    // .filter( (emp) => emp.salary > 50000)
    // .map( (emp) => `${emp.first} ${emp.last}'s salary: ${emp.salary}`)
    // .forEach( (emp) => console.log(emp));
  });

  // Does what the above stuff does, but we're filtering in our query instead 
  // db.all(`SELECT first, last, salary 
  //         FROM employees
  //         WHERE salary > 50000 
  //         ORDER BY first`, 
  //         (err, allRows) => {
  //   console.log('all rows', allRows);
  // });

  // .each() is a nice compromise between the above 2 options
  // db.each('SELECT * FROM employees', (err, { id, first, last, department, salary}) => {
  //   if (err) {
  //     return console.log(err.toString());
  //   }
  //   console.log(`${id} ${first} ${last}`);
  // });
};

