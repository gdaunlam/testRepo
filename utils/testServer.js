const { Router } = require("express");
const express = require("express");
const supertest = require("supertest");

function testServer(router){
  const app = new express();
  router(app);
  return supertest(app);
}

module.exports = testServer;