function Product(name, price, calories) {
	//this.args = Array.prototype.slice.call(arguments);
  this.name = name;
  this.price = price;
  this.calories = calories;
  // подозреваю, что здесь должно быть совсем не это)
} 

//Product.prototype.calculatePrice = function() {}
//Product.prototype.calculateCalories = function() {}

function Hamburger(size, stuffing) {
	this.size = size;
	this.stuffing = stuffing;
}

Hamburger.prototype = Object.create(Product.prototype);
Hamburger.prototype.constructor = Hamburger;

Hamburger.SIZE_SMALL = {name: 'Small Burger', price: 50, calories: 20};
Hamburger.SIZE_LARGE = {name: 'Big Burger', price: 100, calories: 40};
Hamburger.STUFFING_CHEESE = {name: 'Stuffing/Cheese', price: 10, calories: 20};
Hamburger.STUFFING_SALAD  = {name: 'Stuffing/Salad', price: 20, calories: 5};
Hamburger.STUFFING_POTATO = {name: 'Stuffing/Potato', price: 15, calories: 10};

Hamburger.prototype.getSize = function() {
	return this.size;
}

Hamburger.prototype.getStuffing = function() {
	return this.stuffing;
}

Hamburger.prototype.getName = function() {
	this.name = this.getSize().name;
	return this.name;
}

Hamburger.prototype.calculatePrice = function() {
	var price;
  var size = this.getSize().price;
  var stuffing = this.getStuffing().price;
  price = size + stuffing;
  return price;
}

Hamburger.prototype.calculateCalories = function() {
	var calories;
  var size = this.getSize().calories;
  var stuffing = this.getStuffing().calories;
  calories = size + stuffing;
  return calories;
}


function Salad(type, weight) {
	this.type = type;
	this.weight = weight;
} 

Salad.prototype = Object.create(Product.prototype);
Salad.prototype.constructor = Salad;

Salad.CAESAR = {name: 'Caesar', price: 100, calories: 20};
Salad.OLIVIE = {name: 'Olivie', price: 50, calories: 80};
 
Salad.prototype.getType = function() {
	return this.type;
}

Salad.prototype.getWeight = function() {
	return this.weight;
}

Salad.prototype.getName = function() {
	this.name = this.getType().name;
	return this.name;
}

Salad.prototype.calculatePrice = function() {
	var price;
  var type = this.getType().price;
  var weight = this.getWeight();
  price = type * weight / 100;
  return price;
}

Salad.prototype.calculateCalories = function() {
	var calories;
  var type = this.getType().calories;
  var weight = this.getWeight();
  calories = type * weight / 100;
  return calories;
}


function Drink(type) {
	this.type = type;
} 

Drink.prototype = Object.create(Product.prototype);
Drink.prototype.constructor = Drink;

Drink.COKE = {name: 'Coke', price: 50, calories: 40};
Drink.COFFEE = {name: 'Coffee', price: 80, calories: 20};

Drink.prototype.getType = function() {
  return this.type;
}

Drink.prototype.getName = function() {
	this.name = this.getType().name;
	return this.name;
}

Drink.prototype.calculatePrice = function() {
	var price = this.getType().price;
  return price;
}

Drink.prototype.calculateCalories = function() {
	var calories = this.getType().calories;
  return calories;
}



function Order() {
	this.items = Array.prototype.slice.call(arguments);
  this.paid = false;
} 

Order.prototype.totalOrder = function() {
	var order = [];
  this.items.forEach(function(item) {
    order.push(item.getName());
	});
  order = order.join(', ');
	return order;
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
  if(!this.paid) {
  	this.items.push(item);
    console.log("Adding position: " + item.getName());
		return this.items;
  } else {
  	console.log("Adding position: Sorry, your order has already been paid and can't be modified");
  }
}

Order.prototype.deletePosition = function(item) {
	if(!this.paid) {
  	if(this.items.includes(item)) {
    	for (var i = 0; this.items.length > i; i++) {
    		if (this.items[i] === item) {
        	this.items.splice(i--, 1);
        	console.log("Removing position: " + item.getName());
    		}
			} 
  		return this.items;
    }
  } else {
  	console.log("Removing position: Sorry, your order has already been paid and can't be modified");
  }
}

Order.prototype.payOrder = function() {
  this.paid = true;
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

