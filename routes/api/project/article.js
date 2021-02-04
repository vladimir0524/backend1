let mongoose = require('mongoose');
let express = require('express');
let router = express.Router();
let ArticleSchema = require('../../../models/project/article');


router.route('/create-article').post((req, res, next) =>{
    ArticleSchema.findOne({headline:req.body.headline})
    .then(check =>{
        if(check){
            console.log("article already exist")
            return res.status(400).json({email:"article already exists"});
            
        }
        else{
            ArticleSchema.create(req.body, (error, data) => {
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

router.route('/get-articles').post((req, res) =>{
    ArticleSchema.find((error, data) => {
        if (error) {
            return next(error)
        }
        else{
            res.json(data)
        }
    })
})

router.route('/get-fullarticle/:id').post((req,res)=>{
    ArticleSchema.findById(req.params.id)
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