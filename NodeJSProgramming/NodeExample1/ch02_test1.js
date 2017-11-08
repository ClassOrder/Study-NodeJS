var result = 0;

console.time('duration_sum');

for(var i = 1; i <= 1000; i++) {
    result += i;
}

console.timeEnd('duration_sum');
console.log('1 ~ 1000 Sum result: %d', result);

console.log('Currently launched file name: %s', __filename);
console.log('Currentle path launched file: %s', __dirname);

var Person = { name: "Girl's Generation", age: 20 };
console.dir(Person);