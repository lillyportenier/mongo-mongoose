// var http = require("http");
var express = require("express");
var logger = require("morgan");
var mongoose = require("mongoose");
// var mongojs = require("mongojs");


var axios = require("axios");
var cheerio = require("cheerio");

var db = require("./models");


// var databaseUrl = "scraper";
// var collections = ["scrapedData"];

var PORT = process.env.PORT || 3000;

var app = express();


app.use(logger("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));



var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/dbMongo";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });


app.get("/scrape", function (req, res) {
  axios.get("https://www.nytimes.com/column/books-of-the-times").then(function (response) {
    var $ = cheerio.load(response.data);

    $("li.css-ye6x8s").each(function (i, element) {
      var result = {};

      result.title = $(this).find("a").find("h2").text();
      result.description = $(this).find("a").find("p").text();
      result.author = $(this).find("div.css-1nqbnmb").find("span").text();
      result.link = "https://www.nytimes.com/" + $(this).find("div.css-1l4spti").find("a").attr("href");

      db.Article.create(result)
        .then(function (dbArticle) {
          console.log(dbArticle);
        })
        .catch(function (err) {
          console.log(err)
        });
    });
    res.send("scrape Complete")
  });
});

app.get("/articles", function (req, res) {
  db.Article.find({})
  .then(function (dbArticle) {
    // console.log(dbArticle, "re josn")
    res.json(dbArticle)
    
  }).catch(function (err) {
    res.json(err);
  });
});

app.get("/articles/:id", function (req, res) {
  db.Article.find({ _id: req.params.id}).populate("note")
  .then(function (dbArticle){
    res.json(dbArticle);
  }).catch (function (err) {
    res.json(err);
  });
});

app.post("/article/:id", function (req, res) {
  db.Note.create(req.body)
  .then(function (dbNote){
    return db.Article.findOneAndUpdate({_id: mongojs.ObjectId(req.params.id)}, {$push: { note: dbNote._id }}, {new: true})
  })
  .then (function (dbArticle){
    res.json(dbArticle);
  })
  .catch(function(err) {
    res.json(err);
  });
});


// require("./routes/htmlRoutes")(app);

app.listen(PORT, function () {
  console.log("Server listening on: http://localhost:" + PORT);
});