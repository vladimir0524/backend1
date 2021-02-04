let mongoose = require('mongoose');
let express = require('express');
const multer = require('multer');
let router = express.Router();
const fs = require("fs");
let DepartmentSchema = require('../../../models/department/department');



router.post('/article/upload-image',multer({ dest: 'uploads' }).any(), async (req,res) => {
    console.log("It is "+req.files);
    if(req.files)
    {
        var filename = req.files[0].filename;
        var department_name = req.files[0].fieldname;
        var originalname = req.files[0].originalname;
        var originalname = originalname.split('.');
        var new_path = 'uploads/department/'+ department_name +'/article/'+filename+'/avatar.jpg';
        var new_folder = 'uploads/department/'+ department_name +'/article/'+filename;
        fs.mkdir(new_folder, { recursive: true }, function(err) {
            if (err) {
              console.log(err)
            } else {
              console.log("New directory successfully created.")
              console.log(new_path)
              var old_path = req.files[0].path;
              var save_path =  "avatar.jpg";
              fs.readFile(old_path, function(err, data) {
                  fs.writeFile(new_path, data, function(err) {
                      
                          if(!err){
                             res.json(new_path);
                             
                          }
                          else {
                              res.json({
                                  status : "error"
                              })
                          }
                     
                  });
              });
            }
          })
    }
})

router.post('/album/upload-album',multer({ dest: 'uploads' }).any(), async (req,res) => {
    console.log(req.files[0]);
    if(req.files)
    {
        console.log('now good')
        var filename = req.files[0].filename;
        var department_name = req.files[0].fieldname;
        var originalname = req.files[0].originalname;
        var originalname = originalname.split('.');
        var new_path = 'uploads/department/'+ department_name +'/album/'+filename+'/avatar.jpg';
        var new_folder = 'uploads/department/'+ department_name +'/album/'+filename;
        fs.mkdir(new_folder, { recursive: true }, function(err) {
            if (err) {
              console.log(err)
            } else {
              console.log("New directory successfully created.")
              console.log(new_path)
              var old_path = req.files[0].path;
              var save_path =  "avatar.jpg";
              fs.readFile(old_path, function(err, data) {
                  fs.writeFile(new_path, data, function(err) {
                     
                          if(!err){
                             console.log("success", new_path)
                             res.json(new_path);
                             
                          }
                          else {
                              res.json({
                                  status : "error"
                              })
                          }
                      
                  });
              });
            }
          })
       
    }
})

router.post('/blog/upload-image',multer({ dest: 'uploads' }).any(), async (req,res) => {
    console.log(req.files[0]);
    if(req.files)
    {
        console.log('now good')
        var filename = req.files[0].filename;
        var department_name = req.files[0].fieldname;
        var originalname = req.files[0].originalname;
        var originalname = originalname.split('.');
        var new_path = 'uploads/department/'+ department_name +'/blog/'+filename+'/avatar.jpg';
        var new_folder = 'uploads/department/'+ department_name +'/blog/'+filename;
        fs.mkdir(new_folder, { recursive: true }, function(err) {
            if (err) {
              console.log(err)
            } else {
              console.log("New directory successfully created.")
              console.log(new_path)
              var old_path = req.files[0].path;
              var save_path =  "avatar.jpg";
              fs.readFile(old_path, function(err, data) {
                  fs.writeFile(new_path, data, function(err) {
                      
                          if(!err){
                             console.log("success")
                             res.json(new_path);
                             
                          }
                          else {
                              res.json({
                                  status : "error"
                              })
                          }
                     
                  });
              });
            }
          })
    }
})


router.post('/article/upload-files',multer({ dest: 'uploads' }).any(), async (req,res) => {

    if(req.files)
    {
        console.log('now good');

        console.log(req.files);
       req.files.forEach(file=>{
        var filename = file.originalname.split('.').slice(0, -1).join('.');
        var originalname = file.originalname;
        var originalname = originalname.split('.');
        var new_path = 'uploads/department/article/attached_file/' + filename + '.' + originalname[originalname.length-1];
        var old_path = file.path;
        var save_path =  filename + '.' + originalname[originalname.length-1];
        fs.readFile(old_path, function(err, data) {
            fs.writeFile(new_path, data, function(err) {
              
                    if(!err){
                       console.log("success")
                     
                       res.json(new_path);
                       
                    }
                    else {
                        res.json({
                            status : "error"
                        })
                    }
               
            });
        });
       })
        
    }
})

router.post('/blog/upload-files',multer({ dest: 'uploads' }).any(), async (req,res) => {

    if(req.files)
    {
        console.log('now good');

        console.log(req.files);
       req.files.forEach(file=>{
        var filename = file.originalname.split('.').slice(0, -1).join('.');
        var originalname = file.originalname;
        var originalname = originalname.split('.');
        var new_path = 'uploads/blog/attached_file/' + filename + '.' + originalname[originalname.length-1];
        var old_path = file.path;
        var save_path =  filename + '.' + originalname[originalname.length-1];
        fs.readFile(old_path, function(err, data) {
            fs.writeFile(new_path, data, function(err) {
               
                    if(!err){
                       console.log("success")
                     
                       res.json(new_path);
                       
                    }
                    else {
                        res.json({
                            status : "error"
                        })
                    }
               
            });
        });
       })
        
    }
})


router.route('/create-department').post((req, res, next) => {
    DepartmentSchema.findOne({name:req.body.name})
    .then(check =>{
        if(check){
            console.log("department already exist")
            return res.status(400).json({email:"department already exists"});
            
        }
        else{
            DepartmentSchema.create(req.body, (error, data) => {
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

router.route('/get-department').post((req, res) =>{
    DepartmentSchema.find((error, data) => {
        if (error) {
            return next(error)
        }
        else{
            res.json(data)
        }
    })
})

module.exports = router;