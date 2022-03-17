const mongoose = require("mongoose");

const LanguageSchema = new mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    link: { type: String, unique: true, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Language", LanguageSchema);
