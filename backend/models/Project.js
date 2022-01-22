const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    uid: { type: String, required: true },
    email: { type: String, required: true },
    username: { type: String },
    title: { type: String, required: true },
    description: { type: String, maxlength: 300 },
    code: {
      html: { type: String },
      css: { type: String },
      js: { type: String },
    },
    reactCode: { type: String },
    star: { type: Array },
    type: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Project", ProjectSchema);
