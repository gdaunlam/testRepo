const boom = require("@hapi/boom");

//sin next, este se ejecuta al final de las rutas
function notFoundHandler(req,res){
    const{output : {statusCode, payload}} = boom.notFound();

    res.status(statusCode).json(payload);
}

module.exports = notFoundHandler;