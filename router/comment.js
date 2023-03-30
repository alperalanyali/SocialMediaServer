const express = require("express");
const Comment = require("../models/comment");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const response = require("../services/response.service");

router.post("/create", async (req, res) => {
  await response(req, res, async () => {
    let { commentUserId, comment, postId } = req.body;
    console.log(commentUserId, comment, postId);
    const newComment = new Comment({
      _id: uuidv4(),
      postId: postId,
      commentUserId: commentUserId,
      comment: comment,
      createdDate: new Date(),
    });
    var result = await newComment.save();
    res.status(200).json({ data: result });
  });
});

module.exports = router;
