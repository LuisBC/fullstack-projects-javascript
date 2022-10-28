const { Schema, model } = require("mongoose");

const schema = new Schema({
  title: { type: String, require: true },
  author: { type: String, require: true },
  isbn: { type: String, require: true },
  imagePath: { type: String, require: true },
  created_at: { type: String, default: new Date() },
});

module.exports = model("Book", schema);
