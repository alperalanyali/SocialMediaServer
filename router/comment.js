const express = require('express');
const Comment = require('../models/comment');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
router.post("/create",async (req,res)=>{

    let {userId,comment,postId} = req.body;
    const newComment = new Comment({
        _id:uuidv4(),
        postId : postId,
        userId:userId,
        comment:comment,
        createdDate: new Date()
        
    })
    try{
        var result = await newComment.save();
        res.status(200).json({data:result});
    }catch(err){
        res.status(400).json({message:err.message});
    }
    
});



module.exports = router;