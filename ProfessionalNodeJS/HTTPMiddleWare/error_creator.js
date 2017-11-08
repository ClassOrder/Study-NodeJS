/* Connect control error */
//function errorCreator(){
//    return function(req, res, next){
//        throw new Error("This is an error.");
//    }
//}
//
//module.exports = errorCreator;


/* Handling error in callback */
function errorCreator(){
    return function(req, res, next){
        next(new Error("This is a custom error."));
    }
}

module.exports = errorCreator;