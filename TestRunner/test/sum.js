var sum = require('../client/sumClient');
var test = require('tap').test;

test('1 + 2', function(t){
    sum(1, 2, function(err, result){
        t.notOk(err, 'No error.');
        t.equal(result, 3, '1 + 2 should be 3');
        t.end();
    });
});

test('5 + 0', function(t){
    sum(5, 0, function(err, result){
        t.notOk(err, 'No error.');
        t.equal(result, 5, '5 + 0 should be 5');
        t.end();
    });
});

test('5 - 2', function(t){
    sum(5, -2, function(err, result){
        t.notOk(err, 'No error.');
        t.equal(result, 3, '5 - 2 should be 3');
        t.end()
    });
});