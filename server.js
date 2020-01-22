// var http = require("http");
var express = require("express");
var mongojs = require("mongojs");
var mongoose = require("mongoose");

var axios = require("axios");
var cheerio = require("cheerio");

var databaseUrl = "scraper";
var collections = ["scrapedData"];


var app = express();


var PORT = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

mongoose.connect("mongodb://localhost/dbMongo", { useNewUrlParser: true });
// function handleRequest(request, response) {
//   response.end("It Works!! Path Hit: " + request.url);
// }

// var server = http.createServer(handleRequest);

require("./routes/htmlRoutes")(app);

app.listen(PORT, function() {

  console.log("Server listening on: http://localhost:" + PORT);
});