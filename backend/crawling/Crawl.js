const cheerio = require('cheerio')
const axios = require('axios')
var URL = require('url-parse'); /// prob not being used
const express = require('express');
const app = express.Router();

var urlFinds = [];
var wordFinds = [];

var startStop = false;

function stopCrawling(){
  startStop = false;
  urlFinds = [];
  wordFinds = [];
  pagesToVisit=[];
}


function crawling(startUrl, searchWord){
  var pagesVisited = {};
  var numPagesVisited = 0;
  var pagesToVisit = [];
  var START_URL = startUrl;
  var currUrl = new URL(START_URL);
  var baseUrl = currUrl.protocol + "//" + currUrl.hostname;

  var SEARCH_WORD = searchWord;

  pagesToVisit.push(START_URL);


  startStop = true;


  var crawl = function(url){

    if(startStop){
      var nextPage = pagesToVisit.pop();
      if (nextPage in pagesVisited) {
        // We've already visited this page, so repeat the crawl
        crawl();
      } else {
        // New page we haven't visited
        visitPage(nextPage, crawl);
      }
    }

  }


  function visitPage(url, callback) {
    // Add page to our set
    pagesVisited[url] = true;
    numPagesVisited++;

    // Make the request
    console.log("Visiting page " + url);

    urlFinds.push(url);

    console.log(numPagesVisited);

    axios.get(url).then((response) => {
    // Load the web page source code into a cheerio instance
    const $ = cheerio.load(response.data);


      //console.log("CHEERIO == "+$('body'));
      var isWordFound = searchForWord($, SEARCH_WORD);
      if(isWordFound) {
        console.log('Word ' + SEARCH_WORD + ' found at page ' + url);
        wordFinds.push(SEARCH_WORD);
      }

      function searchForWord($, word) {
        var bodyText = $('html > body').text().toLowerCase();
        return(bodyText.indexOf(word.toLowerCase()) !== -1);
      }

    //console.log($);

    // The pre.highlight.shell CSS selector matches all `pre` elements
    // that have both the `highlight` and `shell` class
    const urlElems = $('div')

    
    var relativeLinks = $("a[href^='/']");
    //console.log(relativeLinks.length);

    relativeLinks.each(function() {
      pagesToVisit.push(baseUrl + $(this).attr('href'));
    });

    //console.log(pagesToVisit.length);

    if(response.statusCode !== 200) {
      callback(url);
      return;
    }


  }).catch((error) => {

    callback();
   
  });

  }


  crawl(START_URL);


}


app.get('/crawl', (req, res) => {
  
    console.log('HOLA');
    

    res.json('kak');
  
});


app.post('/crawl2', (req, res) => {
  
    console.log("SEARCH FOR WORD : "+req.body.word);

    if(req.body.start){
      console.log("starting? "+ req.body.start)
      crawling(req.body.url, req.body.word);
    }else{
      stopCrawling();
    }
    
   

    res.json({});


  
});


app.post('/results', (req, res) => {
  
  /// process it a bit here
  ///  receive the array as it is at the front
  /// and then compare here and only send what hasnt been sent yet.. 
  /// and same back at the front.. only include tha last ones in the view


  res.json({urls: urlFinds, words: wordFinds});
  
});


module.exports = app;