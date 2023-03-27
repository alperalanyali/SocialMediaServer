const mongoose = require("mongoose");

const errorLogSchema = new mongoose.Schema({   
    url: String, 
    token: String,
    request: Object,
    error: Object,
    createdDate: String
});

const ErrorLog = mongoose.model("ErrorLog", errorLogSchema);

module.exports = ErrorLog;