var scrape = require("../scripts/scrape");
var Article = require("../models/Article");

module.exports = {
  fetch: function(callback) {

    scrape(function(data) {

      var articlesArr = data;
      // Make sure each article object has a date and is not saved by default
      for (var i = 0; i < articlesArr.length; i++) {
        articlesArr[i].saved = false;
        articlesArr[i].note = [];
      }

    });
  },
  get: function(query, cb) {
    Article.find(query)
      .sort({
        _id: -1
      })
      .exec(function(err, doc) {
        //send saved transaction back to routes to be rendered
        cb(doc);
      });
  },
  update: function(query, cb) {
    //saves or unsaves depending on user
    Article.update({ _id: query.id }, {
      $set: {saved: query.saved}
    }, {}, cb);
  },
  addNote: function(query, cb) {
    //adds note
    Article.findOneAndUpdate({_id: query.id }, {
      $push: {note: query.note}
    }, {}, cb);
  }
};