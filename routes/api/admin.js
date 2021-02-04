let mongoose = require('mongoose');
let express = require('express');
let router = express.Router();
let userSchema = require('../../models/User');


router.route('/getuser').post((req, res) =>{
    userSchema.find((error, data) => {
        if (error) {
            return next(error)
        }
        else{
            res.json(data)
        }
    })
})

router.route('/activeuser/:id').post((req, res, next) =>{
    userSchema.findByIdAndUpdate(req.params.id, {$set: {permission: "active"}}, (error, data) => {
        if (error) {
            return next(error)
        }
        else{
            res.json(data)
        }
    })
})

router.route('/deactiveuser/:id').post((req, res, next) =>{
    userSchema.findByIdAndUpdate(req.params.id, {$set: {permission: "deactive"}}, (err, data) => {
        if(err){
            return next(error)
        }
        else{
            res.json(data)
        }
    })
})

router.route('/deleteuser/:id').delete((req, res, next) =>{
    userSchema.findByIdAndRemove(req.params.id, (error, data) => {
        if(error){
            return next(error);
        }
        else{
            res.status(200).json(data);
        }
    })
})

module.exports = router;