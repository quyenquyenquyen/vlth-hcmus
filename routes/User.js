const express = require('express');
const userRouter = express.Router();
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
const User = require('../models/User');
const Todo = require('../models/Todo');
const bcrypt = require('bcrypt');


const signToken = userID => {
    return JWT.sign({
        iss: "NoobCoder",
        sub: userID
    }, "NoobCoder");
}

userRouter.post('/register', (req, res) => {
    const { username, password, role } = req.body;
    User.findOne({ username }, (err, user) => {
        if (err)
            res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
        if (user)
            res.status(400).json({ message: { msgBody: "Username is already taken", msgError: true } });
        else {
            const newUser = new User({ username, password, role });
            newUser.save(err => {
                if (err)
                    res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
                else
                    res.status(201).json({ message: { msgBody: "Account successfully created", msgError: false } });
            });
        }
    });
});



userRouter.post('/login', passport.authenticate('local', { session: false }), (req, res) => {
    if (req.isAuthenticated()) {
        const { _id, username, role } = req.user;
        const token = signToken(_id);
        console.log('TOKEN', req.user.password)
        res.cookie('access_token', token, { httpOnly: true, sameSite: true });
        res.status(200).json({ isAuthenticated: true, user: { username, role } });
    }
});

userRouter.put('/reset', passport.authenticate('jwt', { session: false }), async (req, res) => {

    try {
        const hashPassword = await bcrypt.hash(req.body.password, 10)

        var updateRecord = {
            password: hashPassword
        }
        User.findByIdAndUpdate({ _id: req.user._id }, { $set: updateRecord }, { new: true }, (err, docs) => {
            if (!err) {

                res.send(docs)
                console.log('put success')
            } else {
                console.log('Error while updating a record: ' + JSON.stringify(err, undefined, 2));
            }
        })
    } catch (e) {

        next(e)
    }

})

userRouter.get('/logout', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.clearCookie('access_token');
    res.json({ user: { username: "", role: "" }, success: true });
});

userRouter.post('/todo', passport.authenticate('jwt', { session: false }), (req, res) => {
    const todo = new Todo(req.body);
    todo.save(err => {
        if (err)
            res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
        else {
            req.user.todos.push(todo);
            req.user.save(err => {
                if (err)
                    res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
                else
                    res.status(200).json({ message: { msgBody: "Successfully created todo", msgError: false } });
            });
        }
    })
});



userRouter.get('/arr', passport.authenticate('jwt', { session: false }), (req, res) => {
    User.findById({ _id: req.user._id }).exec((err, document) => {
        if (err)
            res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } });
        else {
            res.send(document.arr)
        }
    });
});


userRouter.put('/putarr/',passport.authenticate('jwt', { session: false }), (req, res) => {

    const todo=new Todo({
        name:req.body.filename,
        fileId:req.body.fileId,
        subjectName:req.body.subjectName
    })
   

    User.findByIdAndUpdate(req.user._id, { $push: {arr:todo} },{ new: true }, (err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log('Error while updating a record: ' + JSON.stringify(err, undefined, 2));
        }
    })
})

userRouter.put('/resetarr/:subjectName',passport.authenticate('jwt', { session: false }), (req, res) => {

    const subjectName=req.params.subjectName

    User.findByIdAndUpdate(req.user._id, { $pull: { arr: {subjectName} } }, { new: true }, (err, docs) => {
        if (!err) {
            // res.send(docs)
            console.log('put subject success')
        } else {
            console.log('Error while updating a record: ' + JSON.stringify(err, undefined, 2));
        }
    })

    const todo=new Todo({
        name:req.body.name,
        fileId:req.body.fileId,
        subjectName:req.body.subjectName
    })
   

    User.findByIdAndUpdate(req.user._id, { $push: {arr:todo} },{ new: true }, (err, docs) => {
        if (!err) {
            res.send(docs)
        } else {
            console.log('Error while updating a record: ' + JSON.stringify(err, undefined, 2));
        }
    })
})




userRouter.get('/admin', passport.authenticate('jwt', { session: false }), (req, res) => {
    if (req.user.role === 'admin') {
        res.status(200).json({ message: { msgBody: 'You are an admin', msgError: false } });
    }
    else
        res.status(403).json({ message: { msgBody: "You're not an admin,go away", msgError: true } });
});

userRouter.get('/authenticated', passport.authenticate('jwt', { session: false }), (req, res) => {
    const { username, role,password } = req.user;
    res.status(200).json({ isAuthenticated: true, user: { username, role,password } });
});





module.exports = userRouter;