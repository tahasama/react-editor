const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    title: { type: String, unique: true, required: true },
    description: { type: String, maxlength: 300 },
    code: {
      html: { type: String },
      css: { type: String },
      js: { type: String },
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", ProjectSchema);
