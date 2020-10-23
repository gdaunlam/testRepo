const express = require("express");
const MoviesService = require("../services/movies");
const {movieIdSchema,createMovieSchema,updateMovieSchema} = require("../utils/schemas/movies");
const validationHandler = require("../utils/middleware/validationHandler")

//NO USO DE RUTAS SINO DE ROUTER

function crudMovies(app){
  const router = express.Router();
  app.use("/api/movies",router);

  const moviesService = new MoviesService();
  
  router.get("/",async function(req,res,next){
    //----------EJEMPLOS DE ERRORES
    // express captura el eror por si solos
    // throw new Error("Error getting movies");

    // express no captura el error asincrono
    // setTimeout(() => {
    //   throw new Error("Error getting movies");
    // }, 300);
    
    // Para errores desde funciones asíncronas invocadas
    // es necesario pasar el error como argumento a la función next(), 
    // de esta manera Express capturará el error y lo procesará
    // fs.readFile("/file-does-not-exist", function(err, data) {
    //   if (err) {
    //     next(err); // Se debe pasar el error a Express.
    //   } else {
    //     res.send(data);
    //   }
    // });
    
    //bloque try permite manejar errores asincronos si then ni catch
    // setTimeout(function() {
    //   try {
    //     throw new Error("BROKEN");
    //   } catch (err) {
    //     next(err);
    //   }
    // }, 100);

    try {
      const {tag} = req.query;
      const movies = await moviesService.getMovies({tag});
      res.status(200).json({
        data:movies,
        messege:"movieslisted"
      });
    } catch (error) {
      next(error);
    }
  });
  router.get("/:movieId",validationHandler({movieId:movieIdSchema},"params"),async function(req,res,next){
    try {
      const {movieId} = req.params;
      const movies = await moviesService.getMovie({movieId});
      res.status(200).json({
        data:movies,
        messege:"movieRetrieve"
      });
    } catch (error) {
      next(error);
    }
  });
  router.post("/",validationHandler(createMovieSchema),async function(req,res,next){
    try {
      const {body : movie} = req;
      const createdMovieID = await moviesService.createMovie({movie});
      res.status(201).json({
        data:createdMovieID,
        messege:"movieCreated"
      });
    } catch (error) {
      next(error);
    }
  });
  router.put("/:movieId",
    validationHandler({movieId:movieIdSchema},"params"),
    validationHandler(updateMovieSchema),
    async function(req,res,next)
  {
    try {
      const {body : movie} = req;
      const {movieId} = req.params;
      const updatedMovieID = await moviesService.updateMovie({movieId,movie});
      res.status(200).json({
        data:updatedMovieID,
        messege:"movieUpdated"
      });
    } catch (error) {
      next(error);
    }
  });
  router.patch("/:movieId",async function(req,res,next){
    try {
      const {body : movie} = req;
      const {movieId} = req.params;
      const updatedMovieID = await moviesService.updateExistentMovie({movieId,movie});
      res.status(200).json({
        data:updatedMovieID,
        messege:"movieUpdated"
      });
    } catch (error) {
      next(error);
    }
  });
  router.delete("/:movieId",
    validationHandler({movieId:movieIdSchema},"params"),
    async function(req,res,next)
  {
    try {
      const {movieId} = req.params;
      const updatedDeletedID = await moviesService.deleteMovie({movieId});
      res.status(200).json({
        data:updatedDeletedID,
        messege:"movieDeleted"
      });
    } catch (error) {
      next(error);
    }
  });
}

module.exports = crudMovies;