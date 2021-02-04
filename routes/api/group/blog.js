let mongoose = require('mongoose');
let express = require('express');
let router = express.Router();
let BlogSchema = require('../../../models/group/blog');


router.route('/create-blog').post((req, res, next) =>{
    BlogSchema.findOne({headline:req.body.headline})
    .then(check =>{
        if(check){
            console.log("blog already exist")
            return res.status(400).json({email:"blog already exists"});
            
        }
        else{
            BlogSchema.create(req.body, (error, data) => {
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

router.route('/get-blogs').post((req, res) =>{
    BlogSchema.find((error, data) => {
        if (error) {
            return next(error)
        }
        else{
            res.json(data)
        }
    })
})

router.route('/get-fullblog/:id').post((req,res)=>{
    BlogSchema.findById(req.params.id)
    .then(check =>{
        if(check){
            res.json(check);
        }
    })
 })

// router.route('/activeuser/:id').post((req, res, next) =>{
//     ArticleSchema.findByIdAndUpdate(req.params.id, {$set: {permission: "active"}}, (error, data) => {
//         if (error) {
//             return next(error)
//         }
//         else{
//             res.json(data)
//         }
//     })
// })

// router.route('/deactiveuser/:id').post((req, res, next) =>{
//     ArticleSchema.findByIdAndUpdate(req.params.id, {$set: {permission: "deactive"}}, (err, data) => {
//         if(err){
//             return next(error)
//         }
//         else{
//             res.json(data)
//         }
//     })
// })

// router.route('/deleteuser/:id').delete((req, res, next) =>{
//     ArticleSchema.findByIdAndRemove(req.params.id, (error, data) => {
//         if(error){
//             return next(error);
//         }
//         else{
//             res.status(200).json(data);
//         }
//     })
// })

module.exports = router;