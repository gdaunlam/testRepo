const assert = require("assert");
const proxyquire = require("proxyquire");
// const { Router } = require("express");

const {MongoLibMock,getAllStub} = require("../utils/mocks/mongoLib");
const {moviesMock} = require("../utils/mocks/movies");

// const testServer = require("../utils/testServer");

describe("services - movies",function (){
  const MoviesService =  proxyquire("../services/movies",{
    "../lib/mongoDB.js" : MongoLibMock
  }) 

  //al llamar al servicio luego delusar proxyquire a este se le reemplaza la libreria de mongo
  const moviesService = new MoviesService();

  describe("when getMovies methos is called", async function (){
    it("should call the getAll mongoLib method",async function() {
      await moviesService.getMovies({});
      assert.strictEqual(getAllStub.called,true);
    })

    it("should return an array of movies",async function() {
      const result = await moviesService.getMovies({});
      const expected = moviesMock;
      assert.deepStrictEqual(result,expected);
    })
  });

})