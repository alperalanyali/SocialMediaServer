const express = require('express');
const cors = require('cors');
const  morgan = require('morgan');

const connectMongDb = require("./database/db");
const app = express();

const authRouter = require("./router/auth");
const postRouter = require("./router/post");
const mailRouter = require("./router/mail");
const commentRouter = require("./router/comment");
const errorRouter = require('./router/error')
const baseUrl = "/api/v1/";
app.use(express.json());
app.use(morgan('dev'))
app.use(cors());

connectMongDb().then()
app.use(baseUrl+"auth/",authRouter);
app.use(baseUrl+"post/",postRouter);
app.use(baseUrl+"mail/",mailRouter);
app.use(baseUrl+"comment/",commentRouter);
app.use(baseUrl+"error/",errorRouter);
const port = process.env.PORT ||5001
app.listen(port,()=>{
    console.log(`Listening on ${port} port`);
})