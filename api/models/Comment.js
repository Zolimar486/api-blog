const mongoose = require('mongoose')

const CommentSchema = new mongoose.Schema({

    username : {
        type: String,
        required: true,
    },

    profilePic: {
        type: Object,
        
    },

    desc: {
     type: String,
     required: true,
    },

},{timestamps: true});

module.exports= mongoose.model("Comment", CommentSchema);