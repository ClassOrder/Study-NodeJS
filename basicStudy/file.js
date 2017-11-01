var path = require("path");

console.log(path.normalize("/foo/bar//baz/asdf/quux/.."));

console.log(path.join("foo","bar","baz/asdf","quux",".."));

console.log(path.resolve("/foo/bar","./baz"));
console.log(path.resolve("/foo/bar","/tmp/file/"));
console.log(path.resolve("wwwroot","static_files/png/","../gif/image.gif"));

console.log(path.relative("/data/orandea/test/aaa","/data/orandea/impl/bbb"));

console.log(path.dirname("/foo/bar/baz/asdf/quux.txt"));

console.log(path.basename("/foo/bar/baz/adsf/quux.html"));
console.log(path.basename("/foo/bar/baz/asdf/quux.html",".html"));

console.log(path.extname("/a/b/index.html"));
console.log(path.extname("/a/b.c/index"));
console.log(path.extname("/a/b.c/."));
console.log(path.extname("/a/b.c/d."));


var fs = require("fs");

fs.exists("/etc/passwd", function(exists){
    console.log("exists: ", exists);
});

fs.exists("/does_not_exist", function(exists){
    console.log("exists: ", exists);
});

console.log("ExistsSync: ",fs.existsSync("/etc/passwd"));

fs.stat("/etc/passwd", function(error, stats){
    if(error){throw error}
    console.log(stats);
});

/**
* Open File.
* @param filepath
* @param flag : ["r", "r+", "w", "w+", "a", "a+"]
* @param callback function()
*/
fs.open("/path/to/file", "r", function(error, fd){
   // Take over fd file Descriptor. 
});

/**
* Read File.
* @param filepath
* @param flag : ["r", "r+", "w", "w+", "a", "a+"]
* @param callback function()
*/
fs.open("./my_file.txt", "r", function opened(error, fd){
    if(error){ throw error; }
    var readBuffer = new Buffer(1024),
        bufferOffset = 0,
        bufferLength = readBuffer.length,
        filePosition = 100;
    fs.read(fd, 
        readBuffer, 
        bufferOffset, 
        bufferLength, 
        filePosition, 
        function read(error, readBytes){
            if(error){ throw error; }
            console.log("Readed Bytes: " + readBytes + "bytes")
            if(readBytes > 0) { console.log(readBuffer.slice(0, readBytes)); }
        });
});

/**
* Open File.
* @param filepath
* @param flag : ["r", "r+", "w", "w+", "a", "a+"]
* @param callback function()
*/
fs.open('./my_file.txt','a', function opened(error, fd){
    if (error) throw error;
    var writeBuffer = new Buffer('\nwriting this string'),
        bufferPosition = 0,
        bufferLength = writeBuffer.length,
        filePosition = null;
    
    /**
    * Write File.
    * @param    fd                  file
    * @param    writeBuffer         Data to write buffer.
    * @param    bufferPosition      Write starting position in buffer
    * @param    bufferLength        Length of be writed data
    * @param    filePosition        Path of writed file.
    * @param    afterWrite          after Write Callback function.
    */
    fs.write(fd,
            writeBuffer,
            bufferPosition,
            bufferLength,
            filePosition,
            function afterWrite(error, written){
        if(error) throw error;
        console.log('Wrote Bytes: '+ written + ' Bytes');
    });
    
});

/**
* Open and Write to System Log function
* This example show to close file carefully.
*/
function openAndWriteToSystemLog(writeBuffer, callback){
    
    fs.open('./my_file', 'a', function opened(error, fd){
        if (error) return callback(error);
        
        function notifyError(error){
            fs.close(fd, function(){
                callback(error);
            });
        }

        var bufferOffset = 0,
            bufferLength = writeBuffer.length,
            filePosition = null;
        fs.write(fd, writeBuffer, bufferOffset, bufferLength, filePosition,
                function afterWrite(error, written){
            if(error) return notifyError(error);
            fs.close(fd, function(){
                callback(error);
            });
        }); 
    });
}

openAndWriteToSystemLog(new Buffer('Writing this String\n'),
                       function done(error){
    if(error){
        console.log("When doing read and write, cause error: ", error.message);
        return;
    }
    console.log('Completed withour error.');
});

/**
* Learned Low Level file OPEN, READ, WRITE, CLOSE.
* Node provide High Level Structure like :WriteStream or :ReadStream.
*/









