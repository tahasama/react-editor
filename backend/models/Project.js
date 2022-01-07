const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true, maxlength: 50 },
  code: {
    html: { type: String },
    css: { type: String },
    js: { type: String },
  },
});

module.exports = mongoose.model("Project", ProjectSchema);
