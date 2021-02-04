const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const DepartmentSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: false
  },
  type: {
    type: String,
    required: true
  },
  moderate: {
    type: String,
    required: true
  },
  article: {
    type: String,
    required: true
  },
  blog: {
    type: String,
    required: true
  },
  poll: {
    type: String,
    required: true
  },
  survey: {
    type: String,
    required: true
  },
  discussion: {
    type: String,
    required: true
  },
  event: {
    type: String,
    required: true
  },
  uploadFile: {
    type: String,
    required: true
  },
  idea: {
    type: String,
    required: true
  },
  album: {
    type: String,
    required: true
  },
  gamification: {
    type: String,
    required: true
  },
  uploadVideo: {
    type: String,
    required: true
  },
  wiki: {
    type: String,
    required: true
  },
  form: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Group = mongoose.model("group", DepartmentSchema);
