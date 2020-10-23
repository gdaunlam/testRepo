const { Router } = require("express");
const assert = require("assert");
const proxyquire = require("proxyquire");

const {moviesMock,MoviesServiceMock} = require("../utils/mocks/movies");
const testServer = require("../utils/testServer");


describe("routes - movies",function (){
  const route =  proxyquire("../router/router",{
    "../services/movies" : MoviesServiceMock
  }) 
  const request = testServer(route);

  describe("GET /movie",function (){
    it("sholud respond with status 200", function(done){
        request.get("/api/movies/").expect(200,done);
    })

    it("sholud respond with the list of movies", function(done){
      request.get("/api/movies/").end((err,res)=>{
        
        const expected = {
          data : moviesMock,
          messege: 'movieslisted'
        };

        assert.deepStrictEqual(res.body,expected);
        done();
      });
    })
  });
})