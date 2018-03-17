var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// creates a new UserSchema object
var ArticleSchema = new Schema({
  
  dateoftrans: {
    type: String,
    required: true,
  },
  
  team: {
    type: String,
    required: true
  },
  player: {
    type: String,
    required: true
  },
  transaction: {
    type: String,
    required: true
  },
  saved: {
    type: Boolean,
    default: false
  },
  // This only saves one note's ObjectId, ref refers to the Note model
  note: [{
    type: Schema.Types.ObjectId,
    ref: "Note"
  }]
  
});

// creates model from article schema
var Article = mongoose.model("Article", ArticleSchema);

// exports model
module.exports = Article;
