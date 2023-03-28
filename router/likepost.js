const express = require('express');
const LikePost = require('../models/LikePost');
const response = require('../services/response.service');

const router = express.Router();
const {v4: uuidv4} = require("uuid");

router.post("/likeOrUnlike", async(req,res)=>{
    response(req,res, async ()=>{
        const {userId, postId} = req.body;  
        console.log(postId,userId)      
        let likePost = await LikePost.findOne({userId: userId, postId: postId});                
        if(likePost == null){
            likePost = new LikePost({
                _id: uuidv4(),
                userId: userId,
                postId: postId
            });

            await likePost.save();     
            res.status(200).json({message:'Like saved'}) ; 
        }else{
            await LikePost.findByIdAndRemove(likePost._id);            
            res.status(200).json({message:'Like deleted'}) ;
        }
   

    });
})

module.exports = router;