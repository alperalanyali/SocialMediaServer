const express = require('express');
const cors = require('cors');
const connectMongDb = require("./database/db");
const app = express();

const authRouter = require("./router/auth");
const postRouter = require("./router/post");
const mailRouter = require("./router/mail");
const commentRouter = require("./router/comment");
const baseUrl = "/api/v1/";
app.use(express.json());

app.use(cors());

connectMongDb().then()
app.use(baseUrl+"auth/",authRouter);
app.use(baseUrl+"post/",postRouter);
app.use(baseUrl+"mail/",mailRouter);
app.use(baseUrl+"comment/",commentRouter);

const port = process.env.PORT ||6000
app.listen(port,()=>{
    console.log(`Listening on ${port} port`);
})