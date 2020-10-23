const mongoLib = require("../lib/mongoDB");

class MoviesService{
  constructor(){
    this.collection = "movies";
    this.mongoDB = new mongoLib();
  }

  async getMovies({tags}){
    const query = tags && {tags:{$in,tags}}
    //mongo recibe en sus metodos por defecto diferentes argumentos
    const movies = await this.mongoDB.getAll(this.collection,query);
    return movies || [];
  }
  async getMovie({movieId}){
    const movie = await this.mongoDB.get(this.collection,movieId);
    return movie || [];
  }
  async createMovie({movie}){
    const createdMovieId = await this.mongoDB.create(this.collection,movie);
    return {movie}; 
  }
  async updateMovie({movieId,movie} = {}){
    const updatedMovieId = await this.mongoDB.update(this.collection,movieId,movie);
    return updatedMovieId;
  }
  // async updateExistentMovie(){
  //   //TODO verificar que existe
  //   const updatedMovieId = await Promise.resolve(moviesMock[0]);
  //   return updatedMovieId;
  // }
  async deleteMovie({movieId}){
    const deletedMovieId = await this.mongoDB.delete(this.collection,movieId);
    return deletedMovieId;
  }
}

module.exports = MoviesService;