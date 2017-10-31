/**
* Study inform.
* Reference: Professional Node.js:Building JavaScript-Based Scalable Software.
**/

console.log('myModule init..');
module.exports = function(){
    console.log('Hello World~!');
};
console.log('myModule init complete..');

// Declaration new Buffer.
var buf = new Buffer('my Buffer content');

/**
* Access to 10th location of buf.
* @Confirmable byte value == 99.
**/
console.log(buf[10]);

var buffer = new Buffer("This is the content of my buffer");
var smallBuffer = buffer.slice(8,19);
console.log(smallBuffer.toString());

var buffer1 = new Buffer("this is the content of my buffer");
var buffer2 = new Buffer(11);

var targetStart = 0;
var sourceStart = 8;
var sourceEnd = 19;
buffer1.copy(buffer2, targetStart, sourceStart, sourceEnd);
console.log(buffer2.toString());