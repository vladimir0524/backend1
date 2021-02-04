const express = require("express");
const path = require("path");
const fs = require("fs");
const ffmpeg = require("fluent-ffmpeg");
const multer = require("multer");

const Video = require("../../../models/group/video");


const router = express.Router();

// @route    GET api/uploads
// @desc     Get video ids
// @access   Public
router.get('/', async (req, res) => {

    console.log("iti si ",req.query.department)
    try {
        const videos = await Video.find({department: req.query.department});
        console.log(videos)
        res.json(videos);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route    GET api/uploads/thumbnails/:filename
// @desc     Get thumbnails by name
// @access   Public
router.get('/thumbnails/:filename', async (req, res) => {
    let filename = req.params.filename;
    try {
        res.sendFile(path.join(__dirname, '../../../videos/thumbnails', filename + '.png'))
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

// @route    GET api/uploads/videos/:filename
// @desc     Get videos by name
// @access   Public
router.get('/videos/:filename', async (req, res) => {
    let filename = req.params.filename;
    try {
        const fPath = path.join(__dirname, '../../../videos/videos', filename)
        const stat = fs.statSync(fPath)
        const fileSize = stat.size
        const range = req.headers.range

        if (range) {
            const parts = range.replace(/bytes=/, "").split("-")
            const start = parseInt(parts[0], 10)
            const end = parts[1]
                ? parseInt(parts[1], 10)
                : fileSize - 1

            const chunksize = (end - start) + 1
            const file = fs.createReadStream(fPath, { start, end })
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            }

            res.writeHead(206, head)
            file.pipe(res)
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            }
            res.writeHead(200, head)
            fs.createReadStream(fPath).pipe(res)
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'videos/videos');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '.mp4');
    },
});
var upload = multer({ storage: storage }).single('videoFile');

// @route    POST api/uploads
// @desc     Upload video
// @access   Public
router.post('/', async (req, res) => {
    
    try {



        upload(req, res, async (err) => {
            if (err) {
                console.log("ssssssss is = ", err)
                res.send({
                    statue: 'error',
                    msg: 'Something went wrong!',
                    data: err,
                });
            } else {
                let videoItem = new Video({});
                let nowDate = new Date();
                videoItem.title = nowDate.toDateString();

                if (req.file) {
                    console.log(req.body.department)
                    const video = req.file.filename;
            
                    videoItem.fileName = video;
                    videoItem.department = req.body.department;

                    let drName = 'videos/videos/' + videoItem.fileName;
                    console.log(drName)

                    ffmpeg(drName)
                        .screenshots({
                            timestamps: ['50%'],
                            filename: videoItem.fileName + '.png',
                            folder: 'videos/thumbnails',
                            size: '480x300'
                        })
                        .on('end', async () => {
                            console.log('Screenshot Taken !');
                            await videoItem.save();
                            res.send('Uploaded!')
                        });
                }
            }
        })


    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
})
module.exports = router;
