var request = require("request");
var cheerio = require("cheerio");

//scrape articles from the New YorK Times
var scrape = function(callback) {

  var articlesArr = [];

  request('https://www.cbssports.com/nba/transactions', function(error, response, html) {

      var $ = cheerio.load(html);

        //scrapes data
      $('tr.row1').each(function(i, element) {
        
        var result = {};
        //object
        var a = $(this);
        
        result.date = a.find('td').eq(0).text();
        result.player = a.find('td').eq(1).text();
        result.team = a.find('td').eq(2).text();
        result.transaction = a.find('td').eq(3).text();
        // result.date2 = a.next().find('td').eq(0).text();
        // result.player2 = a.next().find('td').eq(1).text();
        // result.team2 = a.next().find('td').eq(2).text();
        // result.transaction2 = a.next().find('td').eq(3).text();


          if (result.title !== "" && result.link !== "") {
              articlesArr.push(result);
          }
      });
      //scraped data in array
      callback(articlesArr);
  });

};

//exports scraped
module.exports = scrape;