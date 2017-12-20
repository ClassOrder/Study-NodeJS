let echo = function(params, callback) {
    console.log('JSON-RPG echo 호출');
    console.dir(params);
    callback(null, params);
};

module.exports = echo;