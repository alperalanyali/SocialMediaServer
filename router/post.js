const express = require("express");
const stream = require("stream");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const post = require("../models/post");
const Post = require("../models/post");
const router = express.Router();
const response = require("../services/response.service");
const { google } = require("googleapis");
const multer = require("multer");

const KEYFILEPATH = path.join(__dirname, "credentials.json");
const SCOPES = ["https://www.googleapis.com/auth/drive"];

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
// const upload = multer({ storage: storage });
const upload = multer();
var type = upload.single("imageUrl");



const auth = new google.auth.GoogleAuth({
  keyFile: KEYFILEPATH,
  scopes: SCOPES,
});
const uploadFile = async (fileObject) => {
  const bufferStream = new stream.PassThrough();
  bufferStream.end(fileObject.buffer);
  const { data } = await google.drive({ version: "v3", auth }).files.create({
    media: {
      mimeType: fileObject.mimeType,
      body: bufferStream,
    },
    requestBody: {
      name: fileObject.originalname,
      parents: ["1IjpQ0vBrIQBmZD_97shVlxhNlZGUDeZ0"],
    },
    fields: "id,name",
  });
  console.log(`Uploaded file ${data.name} ${data.id}`);
  return data.id;
};

router.post("/createNewPost", type,async (req, res) => {
   let id = await uploadFile(req.file);
  console.log(id);
  response(req, res, async () => {
    let newPost = new Post({
      _id: uuidv4(),
      userId: req.body.userId,
      imageUrl: id,
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
          as: "users"
      }
  },
  {
      $lookup: {
          from: "likeposts",
          localField: "_id",
          foreignField: "postId",
          as: "likes"
      }
  },
  {
      $lookup: {
          from: "comments",
          let: { postId: "$_id" },
          pipeline: [
              {
                  $match: {
                      $expr: { $eq: ["$postId", "$$postId"] }
                  }
              },
              {
                  $lookup: {
                      from: "users",
                      localField: "commentUserId",
                      foreignField: "_id",
                      as: "user"
                  }
              },
              { $unwind: "$user" }
          ],
          as: "comments"
      }
  }
 ]).sort({createdDate:-1})

  

  res.status(200).json({
    data: posts,
  });
});

module.exports = router;
