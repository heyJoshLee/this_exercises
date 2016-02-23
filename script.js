  // this references the global object which is the window object in broswers
  console.log(this); // logs window object

  //Calling a function in the global scope, e.g. myFunction()
  // 'this' still references the window object becuase the function is a method
  //  of the global object
  //  whatIsThis() is the equivalent of window.whatIsThis and this.whatIsThis
  function whatIsThis() {
    console.log(this); // logs window object
  }

  //Calling a method on an explicitly stated obejct e.g. (object.method)
  // When the method runs it looks at what called the method and applies 'this'
  //  to that object
  var person = {
    first_name: "Josh",
    last_name: "Lee",
    fullName: function() {
      return this.first_name + " " + this.last_name;
    }
  }
  console.log(person.fullName()); // Logs "Josh Lee"

  //Calling a method that contains a function inside
  // Here 'this' in  'var = opinion' refers to the global object again which is the window
  //  this.color and this.make will return undefined unless you set the variables
  //  in the global scope.
  var car = {
    color: "red",
    make: "ford",
    info: function() {
      console.log("It's a " + this.color + " " + this.make); // logs: It's a red ford

      var opinion = function() {
        console.log("I really like " + this.color + " " + this.make + "s"); // These will return undefined unless set in the global scope
      }
      opinion();
    }
  }

  // You can fix this by setting a varibale to the 'this' value if you want to use it later
  var car2 = {
    color: "red",
    make: "ford",
    info: function() {
      console.log("It's a " + this.color + " " + this.make); // It's a red ford
      var self = this;
      var opinion = function() {
        console.log("I really like " + self.color + " " + self.make + "s"); // These will return 'red' abd 'ford'
      }
      opinion();
    }
  }

  //In object constructors

  function Dog(name, sound) {
    this.name = name;
    this.sound = sound;
    this.bark = function() {
      console.log(this.name + " says " + sound + "!");
    }
  }

  // The 'new' keyword creates an object in memory. 'this' now refers to that object
  var spot = new Dog("Spot", "bark");
  spot.bark(); // logs "Spot says bark", this is set to the 'spot' object

  // Here the 'new' keyword is missing so 'this' still refers to the global context
  //  window.name is set to 'Fido' and window.sound is set to 'Woof'
  var fido = Dog("Fido", "Woof");

  // .apply() and .call()
  //  .apply() and .call() allow you to specificly state what 'this' is

  function Cat(name) {
    this.name = name;
  }

  Cat.prototype.sayName = function() {
    console.log("My name is " + this.name)
  }

  var grumpy_cat = new Cat("Grumpy cat");
  // Here 'this' refers to the grumpy_cat object
  grumpy_cat.sayName(); // Logs "My name is Grumpy Cat"

  var not_cat = {
    name: "not_cat"
  }

  // We can use apply or call to set 'this' to whatever we want
  //  Both examples work, but the first is more clear where the method is
  //  coming from.
  Cat.prototype.sayName.apply(not_cat);
  grumpy_cat.sayName.apply(not_cat);

  //.apply() and .call() are the same except .apply() use can pass in params as an
  //  array, while call you use commas to seperate your params


/*********
jquery
*********/

  // When the selctor is clicked run the function
  //    Here 'this' is referencing the DOM element clicked
 $("#im_a_div").on("click", function() {
   console.log(this); // logs the DOM element selected because calling the 'on' method on the selector sets 'this' to the selector
   console.log($(this)); // logs jQuery collection containing the DOM element selected
 });

 // Becuase #inner_exists on page load we can also write $("im_a_div #inner_div") as the selctor
 $("#im_a_div").on("click", "#inner_div", function() {
   console.log(this); // logs the DOM element seletecd, here is #inner_div. The second param sets 'this' to a new selector
 });

 $("form").on("submit", function(e) {
    e.preventDefault();
    console.log(this); // logs form
 });
