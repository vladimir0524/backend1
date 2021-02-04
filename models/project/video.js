const mongoose = require("mongoose");

const VideoSchema = new mongoose.Schema({
    department: {
        type: String,
    },
    title: {
        type: String,
    },
    fileName: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = PVideo = mongoose.model('Pvideo', VideoSchema);