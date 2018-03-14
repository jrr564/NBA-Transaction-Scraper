var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var ArticleSchema = new Schema({
  
  date: {
    type: Date,
    default: Date.now,
    required: true,
  },
  
  player: {
    type: String,
    required: true
  },
  team: {
    type: String,
    required: true
  },
  transaction: {
    type: String,
    required: true
  },
  
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Article model
module.exports = Article;
