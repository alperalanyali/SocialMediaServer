const express = require("express");
const router = express.Router();

const response = require("../services/response.service")

const ErrorLog = require('../models/error-log');
router.get('/getAll',async (req,res)=>{
   
    await response(req,res,async()=>{
        const errors = await ErrorLog.find().sort("-createdDate");
        
        res.status(200).json({success:true,errors});
    });
    
})


module.exports = router;