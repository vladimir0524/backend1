const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const BlogSchema = new Schema({
  department: {
    type: String,
    required: true
    },
  headline: {
    type: String,
    required: true
  },
  summary: {
    type: String
    
  },
  body: {
    type: String
   
  },
  author: {
    type: String
    
  },
  publish: {
    type: String,
    required: true
  },
  expire: {
    type: String,
    required: true
  },
  featured: {
    type: String,
    required: true
  },
  anonymous: {
    type: String
    
  },
  reading: {
    type: String
    
  },
  image: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Blog = mongoose.model("blogs", BlogSchema);
