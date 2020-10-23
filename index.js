const express = require("express");

const app = new express();
const bodyParser = require("body-parser");
const {logErrors,errorHandler,wrapError} = require("./utils/middleware/errorHandlers");
const notFoundHandler = require("./utils/middleware/notFoundHandler");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//manejadores de errores

const moviesRouter = require("./router/router");
const config = require("./config/index");

moviesRouter(app);

app.use(logErrors);
app.use(wrapError);
app.use(errorHandler);
app.use(notFoundHandler);

app.listen(config.port, () => {
  console.log("Iniciado");
});
