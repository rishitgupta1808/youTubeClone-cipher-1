const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = mongoose.Schema({
    userid: {
        type:Schema.Types.ObjectId,
        ref: 'User'
    },
    username:{
        type:String,
    },
    title: {
        type:String,
        maxlength:50,
    },
    description: {
        type: String,
    },
    filePath : {
        type: String,
    },
    catogory: String,
    views : {
        type: Number,
        default: 0 
    },
    duration :{
        type: String
    },
    thumbnail: {
        type: String
    },
    likes :{
        type : Number,
        default:0
    }
}, { timestamps: true })


const Video = mongoose.model('Video', videoSchema);

module.exports =  Video 