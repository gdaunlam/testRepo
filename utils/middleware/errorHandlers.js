const boom = require("@hapi/boom");
const {config} = require("../../config/index");

function withErrorStack(error, stack){
    //caso de entorno de desarrollo
    // caso de entorno produccion, deberia validar eso, no true
    // if(true){
    //     return {...error,stack};
    // }
    
    // caso de entorno produccion
    //CON BOOM ERROR TRAE STATUS CODE ERROR Y MENSAJE
    return {...error};
}

//boom setea su propio formato de errores
function wrapError(err,req,res,next){
  if(!err.isBoom){
    next(boom.badImplementation(err));
  }
  next(err);
}

//middleware1
function logErrors(err,req,res,next){
    console.log(err)
    next(err);
}
//middleware2
function errorHandler(err,req,res,next){
    const {output: {statusCode,payload}} = err;
    res.status(statusCode);
    res.json(withErrorStack(payload,err.stack));
}

module.exports = {
    logErrors,
    errorHandler,
    wrapError
}
//AUNQUE EXISTAN PARAMETROS SIN USO COMO NEXT, ESTOS ESTAN PUES ASI EXPRESS DETERMINA QUE SE TRATA DE UN MIDDLEWARE