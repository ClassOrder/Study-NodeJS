process.stdin.resume();
process.stdin.on('data', function(data){
    var number;
    try{
        number = parseInt(data.toString(),10);
        number+=1;
        process.stdout.write(number + "\n");
    } catch(error){
        process.stderr.write(error.message + "\n");
    }
});