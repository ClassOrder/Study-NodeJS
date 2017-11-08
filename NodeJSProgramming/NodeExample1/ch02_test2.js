console.log('Property of argv\'s Parameter count: ' + process.argv.length);
console.dir(process.argv);

if(process.argv.length > 2){
    console.log('Value of third parameter: %s' + process.argv[2]);
}

process.argv.forEach(function(item, index){
    console.log(index + ':', item);
})

console.dir(process.env);
console.log('Value of OS env via: ' + process.env[OS]);