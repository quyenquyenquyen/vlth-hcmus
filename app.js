const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
app.use(cookieParser());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/ExamDb',{useNewUrlParser : true,useUnifiedTopology: true},()=>{
    console.log('successfully connected to database');
});

const userRouter = require('./routes/User');
const uploadFile = require('./routes/uploadFile');
const subjectRouter = require('./routes/Subject')
app.use('/user',userRouter);
app.use('/up',uploadFile)
app.use('/subject',subjectRouter)

app.listen(5000,()=>{
    console.log('express server started');
});