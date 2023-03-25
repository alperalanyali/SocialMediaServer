const mongoose = require('mongoose');


const connectMongDb = async()=>{
    try {
        const uri = "mongodb+srv://alanyalialper:12@socialmedia.q3cnnsd.mongodb.net/?retryWrites=true&w=majority";
        var result = await mongoose.connect(uri,{
            useNewUrlParser: true,
            useUnifiedTopology: true
        }); 
        console.log("MongoDb bağlantısı başarılı");
    } catch (error) {
        console.log("MongoDb bağlantısı sırasında bir hatayla karşılaştık. Hata: " + error);
    }
}

module.exports = connectMongDb;