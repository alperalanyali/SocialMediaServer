const mongoose = require('mongoose');


const postSchema = mongoose.Schema({
    _id:String,
    imageUrl:{
        type:String,
        required:[true,"Fotoğraf eklemek zorunludur"]
    },
    
    userId:{
        type:String,
        ref:"User"
    },
    content:{
        type:String,
        required:true,
        maxlength:[200,"En fazla 200 karakter yazabilirsiniz"]
    },
    likes:{
        type:Number,
        default:0
    },
    comments:{
            type:String,
            ref:'Comment'
    } ,
    createdDate:{
        type:Date
    }   
});


module.exports = mongoose.model("Post",postSchema);