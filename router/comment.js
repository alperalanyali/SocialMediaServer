const express = require('express');
const Comment = require('../models/comment');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const response = require('../services/response.service')

router.post("/create",async (req,res)=>{

    await response(req,res,async ()=>{
           let {userId,comment,postId} = req.body;
    const newComment = new Comment({
        _id:uuidv4(),
        postId : postId,
        userId:userId,
        comment:comment,
        createdDate: new Date()
        
    })
    var result = await newComment.save();
    res.status(200).json({data:result});
    })   
});



module.exports = router;