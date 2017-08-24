// Composition
const Pancreas = Object.create({});
Pancreas.init = function() {
  this.filtering = true;
};

const Liver = Object.create({});
Liver.init = function() {
  this.poisoned = false;
}

const Body = Object.create({});
Body.init = function() {
  this.the_pancreas = Object.create(Pancreas);
  this.the_liver = Object.create(Liver);
};

let myBody = Object.create(Body);
myBody.init();
console.log('myBody', myBody);

// aggregation
const Customer = Object.create({});
Customer.init = function(first, last, acct) {
  this.accountNumber = acct;
  this.firstName = first;
  this.lastname = last;
};

const Bank = Object.create({});
Bank.init = function(infoObj) {
  this.name = infoObj.name;
  this.address = infoObj.address;
  this.assets = infoObj.assets;

  this.customers = [];
};

const FirstTenn  = Object.create(Bank);
FirstTenn.init({
  name: "First Tenn Bank",
  address: "123 Sesame St",
  assets: "One Beeeelion dollars"
});

const steve = Object.create(Customer);
steve.init("Steve", "Brownlee", "0000000001");

const greg = Object.create(Customer);
greg.init("Greg", "Korte", "00000000002");

FirstTenn.customers.push(steve);
FirstTenn.customers.push(greg);

console.log('First tenn', FirstTenn);
