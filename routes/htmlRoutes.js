var path = require("path");
var express = require("express");

var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");




module.exports = function (app) {
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/home.html"))
    });

    app.get("/scrape", function (req, res) {
        axios.get("https://www.nytimes.com/column/books-of-the-times").then(function (response) {


            var $ = cheerio.load(response.data);
            // console.log(response.data)
            // console.log("into /scrape")


            $("li.css-ye6x8s").each(function (i, element) {
                var results = {}; 


                // results.title = $(this).find("a").attr("href");
                results.title = $(this).find("a").find("h2").text();
                results.description = $(this).find("a").find("p").text();
                results.author = $(this).find("div.css-1nqbnmb").find("span").text();
                results.link = "https://www.nytimes.com/" + $(this).find("div.css-1l4spti").find("a").attr("href");

                 db.Article.create(results)
                    .then(function(dbArticle) {
                     console.log(dbArticle);
                 })
                    .catch(function (err){
                        console.log(err)
                    });
            });
            res.send("scrape consplete")
        });
    });

    app.get("/articles" , function (req, res) {
        db.Article.find({}).then(function (dbArticle){
            res.json(dbArticle)
        }) .catch(function (err) {
            res.json(err);
        });
    });

    
}

