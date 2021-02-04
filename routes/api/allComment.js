let mongoose = require('mongoose');
let express = require('express');
let router = express.Router();
let CommentSchema = require('../../models/allComments')


router.route('/leave-comment').post((req,res)=>{
    
            CommentSchema.create(req.body, (error, data) => {
                if (error) {
                    return next(error)
                }
                else{
                    console.log(data)
                    res.json(data)
                }
        })
 })

 router.route('/get-comments').post((req, res) =>{
    CommentSchema.find({comment: req.body.comment},(error, data) => {
        if (error) {
            return next(error)
        }
        else{
            res.json(data)
        }
    })
})

 module.exports = router;