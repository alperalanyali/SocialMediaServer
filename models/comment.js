const mongoose = require('mongoose');

const commentSchema = mongoose.Schema({
    _id:String,
    userId:{
        type:String,
        ref:"Users"
    },
    comment:{
        type:String,
        required:[true,"Yorum girilmesi zorunludur"]
    },
    postId:{
        type:String,
        ref:"Posts"
    },
    likes:Number,
    createadDate:{
        type:Date,
        default:Date.now()
    }
});

module.exports= mongoose.model("Comments",commentSchema);