const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
    subjectArr: [],
    subjectName:{
        type:String
    },
    subTime:{
        date:Number,
        month:Number,
        year:Number,
        hour:Number,
        minute:Number,
        seconds:Number
    }
});

module.exports = mongoose.model('Subject',SubjectSchema,'Subject');