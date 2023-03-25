const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
    _id:String,
    userName:{
        type:String,    
        minlenght:4  
        
    },
    email:{
        type:String,
        unique:true,
        required:[true,"Eposta zorunlu alandır"],
        minlenght:4

    },
    password:{
        type:String,
        required:[true,"Şifre zorunlu alandır"],
        minlenght:6
    },
    phone:{
        type:String,    
    },
    createdDate:{
        type:Date,
        default: Date.now()
    }
})



module.exports = mongoose.model("User",userSchema);