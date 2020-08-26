//router
const express = require('express');
const passport = require('passport');
const User = require('../models/User');
const subjectRouter = express.Router();
const Subject = require('../models/Subject');
const Todo = require('../models/Todo');
const cors = require('cors')

subjectRouter.use(cors({ origin: 'http://localhost:3000' }))

//POST

subjectRouter.post('/create',passport.authenticate('jwt', { session: false }), (req, res) => {
    var newRecord = new Subject({
        subjectName: req.body.subjectName
    })
    newRecord.save((err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log('Error while post record: ' + JSON.stringify(err, undefined, 2));
        }
    })

    // User.updateOne({ _id: req.user._id }, { $push:  {arr: [{name: "",fileId:"",subjectName:req.body.subjectName}]} })
    // .then(result => {
    //     // res.redirect('/admin')
    //     // res.send({ result: result })
    // })
})

//GET

subjectRouter.get('/',passport.authenticate('jwt', { session: false }), (req, res) => {
    Subject.find().exec((err, docs) => {
        if (err)
            return res.status(400).send(err);
        res.send(docs)
    });
})

//GET by id

subjectRouter.get('/subTime/:id',passport.authenticate('jwt', { session: false }), (req, res) => {
    Subject.findById(req.params.id).exec((err, docs) => {
        if (err)
            return res.status(400).send(err);
        res.send(docs.subTime)
    });
})

subjectRouter.get('/subArr/:id',passport.authenticate('jwt', { session: false }), (req, res) => {
    Subject.findById(req.params.id).exec((err, docs) => {
        if (err)
            return res.status(400).send(err);
        res.send(docs.subjectArr)
    });
})

subjectRouter.get('/:id',passport.authenticate('jwt', { session: false }), (req, res) => {
    Subject.findById(req.params.id).exec((err, docs) => {
        if (err)
            return res.status(400).send(err);
        res.send(docs)
    });
})




//PUT

subjectRouter.put('/put/:id/:fileId',passport.authenticate('jwt', { session: false }), (req, res) => {

    const fileId = req.params.fileId
  
    Subject.updateOne ({ _id: req.params.id }, { $pull: { subjectArr: {fileId} } }, { new: true }, (err, docs) => {
        if (!err) {
            // res.send(docs)
            console.log('put subject success')
        } else {
            console.log('Error while updating a record: ' + JSON.stringify(err, undefined, 2));
        }
    })

    const todo = new Todo({
        name:req.body.name,
        contentType:req.body.contentType,
        fileId:req.params.fileId,
        user:req.body.user,
        timestamp:req.body.timestamp,
        point:req.body.point
    })

    Subject.updateOne ({ _id: req.params.id}, { $push: { subjectArr: todo } }, { new: true }, (err, docs) => {
        if (!err) {
            res.send(docs)
            console.log('put subject success')
        } else {
            console.log('Error while updating a record: ' + JSON.stringify(err, undefined, 2));
        }
    })
})

subjectRouter.put('/putdate/:id',passport.authenticate('jwt', { session: false }), (req, res) => {
   
    var updateRecord = {
        date:req.body.date,
        month:req.body.month,
        year:req.body.year,
        // hour:req.body.hour,
        // minute:req.body.minute,
        // seconds:req.body.seconds
    }

    Subject.findByIdAndUpdate(req.params.id, { $set: {subTime:updateRecord} },{ new: true }, (err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log('Error while updating a record: ' + JSON.stringify(err, undefined, 2));
        }
    })
})






module.exports = subjectRouter