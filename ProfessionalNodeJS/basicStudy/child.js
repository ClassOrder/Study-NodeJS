var number = process.env.number;
console.log(typeof(number)); // -> String
number = parseInt(number, 10);
console.log(typeof(number)); // -> Number