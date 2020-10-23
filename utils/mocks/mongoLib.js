const sinon = require("sinon");
const {MoviesServiceMock, filteredMoviesMocks, moviesMock} = require("./movies");

const getAllStub = sinon.stub();
getAllStub.withArgs("movies").resolves(moviesMock);

const tagQuery = { tags: {$in: ["Drama"]}};
getAllStub.withArgs("movies",tagQuery).resolves(filteredMoviesMocks("Drama"));

const createStub = sinon.stub().resolves(filteredMoviesMocks("Drama"));

class MongoLibMock{
  getAll(collection, query){
    return getAllStub(collection,query);
  }
  create(collection, query){
    return createStub(collection,query);
  }
}

module.exports = {
  getAllStub,
  createStub,
  MongoLibMock
}