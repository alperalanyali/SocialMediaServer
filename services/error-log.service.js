const ErrorLog = require('../models/error-log')

const logErrorResponse = async (req,error) =>{
    const nowDate = new Date().setHours(new Date().getUTCHours() + 3);
    const date = new Date(nowDate);
    const errorLog = new ErrorLog({
        url: req.originalUrl, 
        token: req.headers.authorization,       
        request: req.body,
        error: error,
        createdDate: date
    });

    await errorLog.save();
}

module.exports = logErrorResponse;