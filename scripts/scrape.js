var request = require("request");
var cheerio = require("cheerio");

//scrapes articles from nba transaction data from cbssports
var scrape = function (callback) {
//empty array
  var articlesArr = [];

  request('https://www.cbssports.com/nba/transactions', function (error, response, html) {

    var $ = cheerio.load(html);

    //scrapes data
    $('tr.row1').each(function (i, element) {

      var result = {};
      //object
      var a = $(this);

      result.dateoftrans = a.find('td').eq(0).text();
      result.team = a.find('td').eq(1).text();
      result.player = a.find('td').eq(2).text();
      result.transaction = a.find('td').eq(3).text();
      //push data
      articlesArr.push(result);
      
    });
    callback(articlesArr);
  });

};

//exports scrape
module.exports = scrape;