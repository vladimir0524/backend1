const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const AlbumSchema = new Schema({
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
  author: {
    type: String
    
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
  }
},
{timestamps: true}
);

module.exports = GAlbum = mongoose.model("Galbums", AlbumSchema);
