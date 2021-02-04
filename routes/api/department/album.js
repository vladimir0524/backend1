let mongoose = require('mongoose');
let express = require('express');
let router = express.Router();
let AlbumSchema = require('../../../models/department/album');
const multer = require('multer');
const fs = require("fs");
const path = require("path");
const mkdirp = require("mkdirp")


router.route('/create-album').post((req, res, next) =>{
    AlbumSchema.findOne({headline:req.body.headline})
    .then(check =>{
        if(check){
            console.log("article already exist")
            return res.status(400).json({email:"article already exists"});
            
        }
        else{
            AlbumSchema.create(req.body, (error, data) => {
                if (error) {
                    return next(error)
                }
                else{
                    console.log(data)
                    res.json(data)
                }
        })
        }
         
           
   })
})

router.route('/get-albums').post((req, res) =>{
    AlbumSchema.find((error, data) => {
        if (error) {
            return next(error)
        }
        else{
            console.log("heheheh", data)
            res.json(data)
        }
    })
})

router.route('/get-photo-count').post((req, res) =>{
    
    var department_name = req.body.department;
    var albumname = req.body.album_id;
    var photo_dir = 'uploads/department/'+ department_name +'/album/'+albumname+'/photos';

    fs.access(photo_dir, function(error) {
        if (error) {
          console.log("Directory does not exist.")
        } else {
            fs.readdir(photo_dir, (err, files) => {
                if(files.length){
                    res.json(files.length)
                }
              });
        }
      })
      
})

router.post('/create-album-photos',multer({ dest: 'uploads' }).any(), async (req,res) => {
    console.log(req.body.department);
    
    if(req.files)
    {
        console.log('now good')
        var countOfFile=0;
        var albumname = req.body.album_id;
        var department_name = req.body.department;
        var new_folder = 'uploads/department/'+ department_name +'/album/'+albumname+'/photos';
        fs.mkdir(new_folder, { recursive: true }, function(err) {
            if (err) {
              console.log(err)
            } 
            else {
              console.log("New directory successfully created.")

              fs.readdir(new_folder, (err, files) => {
                  countOfFile = files.length;
              
              req.files.map((f) => {

                console.log("xxxxxxxxxxxxxx=",f)
                console.log("before")
                var old_path = f.path;
                // var save_path =  "avatar.jpg";
                fs.readFile(old_path, (err, data) => {
                      countOfFile = files.length;
                      var photo_id = parseInt(f.fieldname)+parseInt(countOfFile);
                  var new_path = 'uploads/department/'+ department_name +'/album/'+albumname+'/photos/'+photo_id+".jpg";
                    fs.writeFile(new_path, data, function(err) {
                      //   fs.unlink('uploads/'+department_name, async err => {
                            if(!err){
                               console.log("after") 
                            }
                            else {
                              console.log(err)
                            }
                    });
                });
              })
            })
      if(req.files.length){
          res.json("success")
      }
    }
})

    //       for(let i = 0; i<req.files.length; i++){
    //           console.log("news is good")
    //     var photo_id = req.files[i].fieldname;
    //     var new_path = 'uploads/'+ department_name +'/album/'+albumname+'/photos/'+photo_id+".jpg";
    //     var old_path = req.files[i].path;
    //     // var save_path =  "avatar.jpg";
    //     fs.readFile(old_path, function(err, data) {
    //         fs.writeFile(new_path, data, function(err) {
    //             fs.unlink('uploads/'+department_name, async err => {
    //                 if(!err){
    //                    console.log("success")
    //                    res.json(new_path);
                       
    //                 }
    //                 else {
    //                     res.json({
    //                         status : "error"
    //                     })
    //                 }
    //             })
    //         });
    //     });
    // }
}
})

router.route('/delete-album/:id').delete((req, res, next) =>{
    AlbumSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if(error){
            return next(error);
        }
        else{
            res.status(200).json(data);
        }
    })
})

module.exports = router;