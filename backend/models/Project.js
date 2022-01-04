const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  code: {
    html: { type: String },
    css: { type: String },
    js: { type: String },
  },
});

module.exports = mongoose.model("Project", ProjectSchema);
