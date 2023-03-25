const User = require("../models/user");
const { v4: uuidv4 } = require('uuid');
const express = require('express');
const router =express.Router();

router.post("/register",async(req,res)=>{
    let{email,username,password} = req.body;
    
    const newUser = new User({
        _id:uuidv4(),
        email: email,
        password: password
    });
     console.log(newUser)
    try{
        const result = await newUser.save();
        res.status(200).json(result);
    }catch(err){
        res.status(400).json({
            message:err.message
        })
    }
} )

router.post("/login",async (req,res)=>{
    try {
         let{email,password}= req.body;
    var result = await User.findOne({email:email,password:password});
    if(result != null){
        res.status(200).json(result);    
    }else {
        res.status(404).json({message:"Eposta adresi veya şifreniz yanlış"})
    }
    } catch (error) {
        res.status(400).json({
            message:error.message
        })
    }   
    
})


module.exports = router;

