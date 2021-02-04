const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const https = require('https');
const http = require('http');
const fs = require('fs');
const cors = require('cors')

const users = require("./routes/api/users");
const admin = require("./routes/api/admin");
const department = require("./routes/api/department/department")
const article = require("./routes/api/department/article")
const blog = require("./routes/api/department/blog")
const album = require("./routes/api/department/album")
const video = require("./routes/api/department/video")
//group
const group = require("./routes/api/group/department")
const Garticle = require("./routes/api/group/article")
const Gblog = require("./routes/api/group/blog")
const Galbum = require("./routes/api/group/album")
const Gvideo = require("./routes/api/group/video")
//project
const project = require("./routes/api/project/department")
const Particle = require("./routes/api/project/article")
const Pblog = require("./routes/api/project/blog")
const Palbum = require("./routes/api/project/album")
const Pvideo = require("./routes/api/project/video")

const comments = require("./routes/api/allComment")

const app = express();

var key = fs.readFileSync(__dirname + '/selfsigned.key');
var cert = fs.readFileSync(__dirname + '/selfsigned.crt');

var options = {
  key: key,
  cert: cert
};
console.log(__dirname)

app.use(cors())
app.use(express.static(__dirname + '/'));
app.use(bodyParser.json({limit: "50mb"}));
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:50000}));

// Bodyparser middleware
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(bodyParser.json());

// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(
    db,
    { useNewUrlParser: true }
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);
app.use('/api/admin', admin);
//department
app.use('/api/department', department);
app.use('/api/article', article);
app.use('/api/blog', blog);
app.use('/api/album', album);
app.use('/api/video', video);
//group
app.use('/api/group', group);
app.use('/api/g-article', Garticle);
app.use('/api/g-blog', Gblog);
app.use('/api/g-album', Galbum);
app.use('/api/g-video', Gvideo);
//project
app.use('/api/project', project);
app.use('/api/p-article', Particle);
app.use('/api/p-blog', Pblog);
app.use('/api/p-album', Palbum);
app.use('/api/p-video', Pvideo);
app.use('/api/comments', comments);

const httpServer = http.createServer(app);
var server = https.createServer(options, app);

httpServer.listen(5000, () => console.log(`Server111 up and running on port ${port} !`));

server.listen(443, () => console.log(`Server up and running on port ${port} !`));
