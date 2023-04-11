const { google } = require("googleapis");
const stream = require("stream");
const path = require("path");
const KEYFILEPATH = path.join(__dirname, "credentials.json");
const SCOPES = ["https://www.googleapis.com/auth/drive"];

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
  module.exports = {
    uploadFile
  }