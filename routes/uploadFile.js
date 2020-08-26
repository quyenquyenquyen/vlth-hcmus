const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const path = require('path')
const crypto = require('crypto')
const multer = require('multer')
const GridFsStorage = require('multer-gridfs-storage')
const Grid = require('gridfs-stream')
const methodOverride = require('method-override')
const cors = require('cors')
const User = require('../models/User')
const Todo = require('../models/Todo')
const Subject = require('../models/Subject')
const JWT = require('jsonwebtoken');
const passport = require('passport');
const moment = require('moment')

const app = express.Router();

//Middleware
app.use(bodyParser.json())
app.use(methodOverride('_method'))
app.use(cors({ origin: 'http://localhost:3000' }))



//Mongo URI

const mongoURI = 'mongodb://localhost:27017/ExamDb'
const conn = mongoose.createConnection(mongoURI, {
    useUnifiedTopology: true,
    useNewUrlParser: true

});

//init gfs

let gfs;
conn.once("open", () => {
    // init stream
    gfs = Grid(conn.db, mongoose.mongo)
    gfs.collection('uploads')
});

//Create storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    file: (req, file) => {
        return new Promise((resolve, reject) => {
            crypto.randomBytes(16, (err, buf) => {
                if (err) {
                    return reject(err);
                }
                // const filename = buf.toString("hex") + path.extname(file.originalname);
                const filename = file.originalname
                const fileInfo = {
                    filename: filename,
                    bucketName: "uploads"
                };
                resolve(fileInfo);
            });
        });
    }
});

const upload = multer({
    storage
});


//@route POST/
//@desc Uploads file to DB
app.post('/upload/:subjectName', upload.single('file'), passport.authenticate('jwt', { session: false }), (req, res) => {

    const todo = new Todo({ name: req.file.filename, contentType: req.file.contentType, fileId: req.file.id, user: req.user.username, timestamp: moment().format("YYYY-MM-DD") });

    const subjectName = req.params.subjectName
    // req.user.save();
    res.send([{ filename: req.file.filename, fileId: req.file.id, subjectName: req.params.subjectName }])

    Subject.updateOne({ subjectName: req.params.subjectName }, {
        $push: { subjectArr: todo }
    })
        .then((result, docs) => {
            // res.send(result)

        })
        .catch(err => res.status(400).json({ err: err.message }))


    User.findByIdAndUpdate(req.user._id, { $pull: { arr: { subjectName } } }, { new: true }, (err, docs) => {
        if (!err) {
            // res.send(docs)
            console.log('put subject success')
        } else {
            console.log('Error while updating a record: ' + JSON.stringify(err, undefined, 2));
        }
    })

    const putRecord = {
        name: req.file.filename,
        fileId: req.file.id,
        subjectName: subjectName
    }


    User.findByIdAndUpdate(req.user._id, { $push: { arr: putRecord } }, { new: true }, (err, docs) => {
        if (!err) {
            // res.send(docs)
        } else {
            console.log('Error while updating a record: ' + JSON.stringify(err, undefined, 2));
        }
    })

    // todo.save(err => {
    //     if (err)
    //         res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
    //     else {
    //         // req.user.todos.push(todo);
    //         req.user.arr.push(todo);
    //         req.user.save();
    //     }
    // })

})

app.put('/subject/:md5', passport.authenticate('jwt', { session: false }), (req, res) => {

    var Subject = {
        subjectName: req.body.subjectName,
        file: req.body.file,
        user: req.body.user
    }


    gfs.files.updateOne({ md5: req.params.md5 },
        { $push: { Subject } }, { new: true }, (err, docs) => {
            if (!err) {
                // User.updateOne({ _id: req.user._id }, {
                //     $push: {arr: {md5:'hello'} }
                // })
                //     .then(result => {
                //         res.redirect('/')

                //     })
                //     .catch(err => res.status(400).json({ err: err.message }))
                res.send(docs)
                console.log('put successs', Subject)
            } else {
                console.log('err', err)
            }
        })



    // (req.params.id, { $set: updateRecord },{ new: true }, (err, docs) => {
    //     if (!err) {
    //         res.send(docs)
    //     } else {
    //         console.log('Error while updating a record: ' + JSON.stringify(err, undefined, 2));
    //     }
    // })
})

//@route GET /file
//@desc Display all files in JSON
app.get('/files', (req, res) => {
    gfs.files.find().toArray((err, files) => {
        //Check if files
        if (!files || files.length === 0) {
            return res.status(404).json({
                err: 'No files exist'
            })
        }

        return res.json(files);
    })
})

//@route GET /file/:filename
//@desc Display all files in JSON
app.get('/files/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exist'
            })
        }
        //File exists
        return res.json(file);
    })
})


//@route GET /image/:filename
//@desc Display all files in JSON
app.get('/image/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exist'
            })
        }
        //Check if image
        if (file.contentType === 'image/jpeg' || file.contentType === 'image/png') {
            //Read output to browser
            const readstream = gfs.createReadStream(file.filename)
            readstream.pipe(res)
        } else {
            res.status(404).json({
                err: 'Not an image'
            })
        }
    })
})

//@route GET /text/:filename
//@desc Display all files in JSON
app.get('/text/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exist'
            })
        }
        //Check if image
        if (file.contentType === 'text/plain') {
            //Read output to browser
            const readstream = gfs.createReadStream(file.filename)
            readstream.pipe(res)
            console.log(res)
        } else {
            res.status(404).json({
                err: 'Not an file'
            })
        }
    })
})

//@route GET /doc/:filename
//@desc Display all files in JSON
app.get('/document/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exist'
            })
        }
        //Check if image
        if (file.contentType === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
            //Read output to browser
            const readstream = gfs.createReadStream(file.filename)
            readstream.pipe(res)
            console.log(res)
        } else {
            res.status(404).json({
                err: 'Not an file'
            })
        }
    })
})

//@route GET /doc/:filename
//@desc Display all files in JSON
app.get('/excel/:filename', (req, res) => {
    gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
        if (!file || file.length === 0) {
            return res.status(404).json({
                err: 'No file exist'
            })
        }
        //Check if image
        if (file.contentType === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet') {
            //Read output to browser
            const readstream = gfs.createReadStream(file.filename)
            readstream.pipe(res)
            console.log(res)
        } else {
            res.status(404).json({
                err: 'Not an file'
            })
        }
    })
})

//@route DELETE /files/:id
//@desc Delete file
app.delete('/files/:fileId/:subjectId', passport.authenticate('jwt', { session: false }), (req, res) => {

    const fileId = req.params.fileId;
    const subjectId = req.params.subjectId;


    gfs.remove({ _id: req.params.fileId, root: 'uploads' }, (err, gridStore) => {
        if (err) {
            console.log(err);
            return res.status(400).json({ err: err.message })
        }

        User.updateOne({ _id: req.user._id }, { $pull: { arr: { fileId } } })
            .then(result => {
                // res.redirect('/admin')
                res.send({ result: result })
            })

        Subject.updateOne({ _id: subjectId }, { $pull: { subjectArr: { fileId } } })
            .then(result => {
                // res.redirect('/admin')
                res.send({ result1: result })


            })
        res.redirect(`http://localhost:3000/subject/detail/${subjectId}`)

    })
})



module.exports = app;