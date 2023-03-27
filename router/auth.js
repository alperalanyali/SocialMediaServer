const User = require("../models/user");
const { v4: uuidv4 } = require("uuid");
const express = require("express");

const response = require("../services/response.service");
const errorLog = require('../services/error-log.service');
const router = express.Router();

router.post("/register", async (req, res) => {
  let { email, username, password } = req.body;
  await response(req, res, async () => {
    const newUser = new User({
      _id: uuidv4(),
      email: email,
      password: password,
    });
    const result = await newUser.save();
    res.status(200).json(result);
  });
});

router.post("/login", async (req, res) => {
  let { email, password } = req.body;
  await response(req, res, async () => {
    var result = await User.findOne({ email: email, password: password });
    if (result != null) {
      res.status(200).json({ success: true, result });
    } else {
      res.status(200).json({
        success: false,
        message: "Eposta adresi veya şifreniz yanlış",
      });
    }
  });
});

router.get("/getUser/:id", async (req, res) => {
  await response(req, res, async () => {
    const userId = req.params.id;
    const user = await User.findById(userId);
    if (user != null) {
      console.log(user);
      res.status(200).json({ success: true, user });
    } else {
      res.status(200).json({ success: false });
      await errorLog(req,user)
      
    }
  });
});
module.exports = router;
