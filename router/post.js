const express = require("express");
const { v4: uuidv4 } = require("uuid");
const post = require("../models/post");
const Post = require("../models/post");
const router = express.Router();
const response = require("../services/response.service");

const multer = require("multer");
//Storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

//upload
const upload = multer({ storage: storage });
var type = upload.single("imageUrl");

router.post("/createNewPost", type, async (req, res) => {
  response(req, res, async () => {
    let newPost = new Post({
      _id: uuidv4(),
      userId: req.body.userId,
      imageUrl: req.file?.path,
      content: req.body.content,
      createdDate: new Date(),
    });
    console.log(newPost);
    const result = await newPost.save();

    res.status(200).json(result);
  });
});

router.get("/getAll", async (req, res) => {
  const posts = await Post.aggregate([
    {
      $lookup: {
        from: "users",
        localField: "userId",
        foreignField: "_id",
        as: "user",
      },
    },
    {
      $lookup: {
        from: "comments",
        localField: "_id",
        foreignField: "postId",
        as: "comments",
      },
    },   
    {
      $lookup:{
        from:"likeposts",
        localField:'_id',
        foreignField:"postId",
        as:"likes"
      }
    },
    {
      $sort: {
        createdDate: -1,
      },
    },
  ]);

  res.status(200).json({
    data: posts,
  });
});

module.exports = router;
