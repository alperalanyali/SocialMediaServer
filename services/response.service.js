const logErrorResponse = require("./error-log.service");
// const removeFile = require("./remove-file.service");

const response = async (req,res, callBack) =>{
    try {
        await callBack();
    } catch (error) {
        await logErrorResponse(req,error);
        // removeFile([req.file]);
        res.status(500).json({message: `Hata: ${error.message}`});
    }
}

module.exports = response;