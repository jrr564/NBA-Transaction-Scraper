var mongoose = require("mongoose");

// saves to the Schema constructor
var Schema = mongoose.Schema;

// creats new NoteSchema object
var NoteSchema = new Schema({
  // body is of type String
  body: String
});

// creates model from note schema
var Note = mongoose.model("Note", NoteSchema);

// export the Note model
module.exports = Note;
