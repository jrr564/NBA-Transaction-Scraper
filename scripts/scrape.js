var request = require("request");
var cheerio = require("cheerio");

//scrapes articles from nba transaction data from cbssports
var scrape = function (callback) {
//empty array
  var articlesArr = [];

  request('https://www.cbssports.com/nba/transactions', function (error, response, html) {

    var $ = cheerio.load(html);

    //scrapes data
    $("tr.TableBase-bodyTr ").each(function (i, element) {

      var result = {};
      //object
      var a = $(this);
    
      result.dateoftrans = a.parent().parent().parent().parent().parent().find("h4").text();
      result.team = a.find("span.CellLogoNameLockup-name").text();
      result.player = a.find("span.CellPlayerName--long").text();
      result.transaction = a.children().next().next().text();
      //push data
      articlesArr.push(result);
      console.log(result);
    });
    callback(articlesArr);
  });

};

//exports scrape
module.exports = scrape;

// $("div.Page-colMain").each(function (i, element) {

//   var result = {};
//   //object
//   var a = $(this);

//   result.dateoftrans = a.find("h4").eq(0).text();
//   result.team = a.children("div").find("td").find("span.CellLogoNameLockup-name").text();
//   result.player = a.children("div").find("td").find("span.CellPlayerName--long").text();
//   result.transaction = a.children("div").find("td").next().next().text();
//   //push data
//   articlesArr.push(result);
  
// });