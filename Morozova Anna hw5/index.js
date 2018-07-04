function Product(type) {
  this.type = type;
} 

Product.prototype.getType = function() {
  return this.type;
}
 
Product.prototype.getName = function() {
  return this.getType().name;
}

Product.prototype.calculatePrice = function() {
  return this.getType().price;
}

Product.prototype.calculateCalories = function() {
  return this.getType().calories;
}


function Hamburger(type, stuffing) {
  this.type = type;
  this.stuffing = stuffing;
}

Hamburger.prototype = Object.create(Product.prototype);
Hamburger.prototype.constructor = Hamburger;

Hamburger.SIZE_SMALL = {name: 'Small Burger', price: 50, calories: 20};
Hamburger.SIZE_LARGE = {name: 'Big Burger', price: 100, calories: 40};
Hamburger.STUFFING_CHEESE = {name: 'Stuffing/Cheese', price: 10, calories: 20};
Hamburger.STUFFING_SALAD  = {name: 'Stuffing/Salad', price: 20, calories: 5};
Hamburger.STUFFING_POTATO = {name: 'Stuffing/Potato', price: 15, calories: 10};

Hamburger.prototype.getStuffing = function() {
  return this.stuffing;
}
 
Hamburger.prototype.calculatePrice = function() {
  return this.getType().price + this.getStuffing().price;
}

Hamburger.prototype.calculateCalories = function() {
  return this.getType().calories + this.getStuffing().calories;
}


function Salad(type, weight) {
  this.type = type;
  this.weight = weight;
} 

Salad.prototype = Object.create(Product.prototype);
Salad.prototype.constructor = Salad;

Salad.CAESAR = {name: 'Caesar', price: 100, calories: 20};
Salad.OLIVIE = {name: 'Olivie', price: 50, calories: 80};
 
Salad.prototype.getWeight = function() {
  return this.weight;
}

Salad.prototype.calculatePrice = function() {
  return this.getType().price * this.getWeight() / 100;
}

Salad.prototype.calculateCalories = function() {
  return this.getType().calories * this.getWeight() / 100;
}


function Drink(type) {
  Product.apply(this, arguments);
} 

Drink.prototype = Object.create(Product.prototype);
Drink.prototype.constructor = Drink;

Drink.COKE = {name: 'Coke', price: 50, calories: 40};
Drink.COFFEE = {name: 'Coffee', price: 80, calories: 20};


function Order() {
  this.items = Array.prototype.slice.call(arguments);
} 

Order.prototype.totalOrder = function() {
  var order = [];
  this.items.forEach(function(item) {
    order.push(item.getName());
  });
  return order.join(', ');
}

Order.prototype.totalPrice = function() {
  var price = 0;
  this.items.forEach(function(item) {
    price += item.calculatePrice();
  });
  return price;
}

Order.prototype.totalCalories = function() {
  var calories = 0;
  this.items.forEach(function(item) {
    calories += item.calculateCalories();
  });
  return calories;
}

Order.prototype.addPosition = function(item) {
  if(!Object.isFrozen(this.items)) {
    this.items.push(item);
    console.log("Adding position: " + item.getName());
    return this.items;
  } else {
    console.log("Adding position: Sorry, your order has already been paid and can't be modified");
  }
}

Order.prototype.deletePosition = function(item) {
  if(!Object.isFrozen(this.items) && this.items.includes(item)) {
    for (var i = 0; this.items.length > i; i++) {
      if (this.items[i] === item) {
        this.items.splice(i--, 1);
        console.log("Removing position: " + item.getName());
      }
    } 
    return this.items;
  } else {
    console.log("Removing position: Sorry, your order has already been paid and can't be modified");
  }
}

Order.prototype.payOrder = function() {
  Object.freeze(this.items);
}


var hamburger = new Hamburger(Hamburger.SIZE_SMALL, Hamburger.STUFFING_CHEESE);
console.log("Name: " + hamburger.getName() +
            " price: "    + hamburger.calculatePrice() + 
            " calories: " + hamburger.calculateCalories());

var ceasar = new Salad(Salad.CAESAR, 200);
console.log("Name: " + ceasar.getName() +
            " price: "    + ceasar.calculatePrice() + 
            " calories: " + ceasar.calculateCalories());

var olivie = new Salad(Salad.OLIVIE, 150);
console.log("Name: " + olivie.getName() +
            " price: "    + olivie.calculatePrice() + 
            " calories: " + olivie.calculateCalories());

var drink = new Drink(Drink.COKE);
console.log("Name: " + drink.getName() +
            " price: "    + drink.calculatePrice() + 
            " calories: " + drink.calculateCalories());

var order = new Order(hamburger, ceasar, olivie, drink);


console.log("Your order: " + order.totalOrder());
console.log("Total bill: " + order.totalPrice() + "р");
console.log("Total caloric value: " + order.totalCalories());

order.deletePosition(olivie);

console.log("Your order: " + order.totalOrder());
console.log("Total bill: " + order.totalPrice() + "р");
console.log("Total caloric value: " + order.totalCalories());

var hamburger2 = new Hamburger(Hamburger.SIZE_LARGE, Hamburger.STUFFING_POTATO);
console.log("Name: " + hamburger2.getName() +
            " price: "    + hamburger2.calculatePrice() + 
            " calories: " + hamburger2.calculateCalories());

order.addPosition(hamburger2);
console.log("Your order: " + order.totalOrder());
console.log("Total bill: " + order.totalPrice() + "р");
console.log("Total caloric value: " + order.totalCalories());

order.payOrder();

order.deletePosition(ceasar);

order.addPosition(hamburger2);

console.log("Your order: " + order.totalOrder());
