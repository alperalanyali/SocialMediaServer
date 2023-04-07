const path = require("path");
const express = require('express');
const cors = require('cors');
const  morgan = require('morgan');

const connectMongDb = require("./database/db");
const app = express();

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


const authRouter = require("./router/auth");
const postRouter = require("./router/post");
const mailRouter = require("./router/mail");
const commentRouter = require("./router/comment");
const errorRouter = require('./router/error');
const likePostRouter = require('./router/likepost');
const baseUrl = "/api/v1/";
app.use(express.json());
app.use(morgan('dev'))
app.use(cors());

app.get("/uploads/:imageName",(req,res)=>{
    const resimAdi = req.params.resimAdi;
    const resimPath = path.join(__dirname, 'public', 'resimler', resimAdi);
    res.sendFile(resimPath);
})
connectMongDb().then();
app.use(baseUrl+"auth/",authRouter);
app.use(baseUrl+"post/",postRouter);
app.use(baseUrl+"mail/",mailRouter);
app.use(baseUrl+"comment/",commentRouter);
app.use(baseUrl+"error/",errorRouter);
app.use(baseUrl+"likes",likePostRouter);


const port = process.env.PORT ||5001
app.listen(port,()=>{
    console.log(`Listening on ${port} port`);
})