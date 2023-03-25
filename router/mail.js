const express = require("express");
const router = express.Router();
const nodemailer = require("nodemailer");

//e posta göndermek için kullanılacak hesap bilgileri
const transporter = nodemailer.createTransport({
    host: "smtp.sendgrid.net",
    port: 465,
    secure: true,
    html: true,
    auth:{
        user: "apikey",
        pass:""
    },
    tls:{
        ciphers: "SSLv3",
        rejectUnauthorized: false
    }
});
const mailOptions = {
    from: "alanyalialper@gmail.com",
    to: "alanyalialper@gmail.com",
    subject: "Test Email",
    html: "<h1>Merhaba Dünya!</h1><p>HTML içerikli bir mail gönderiyorum.</p>"
}

router.get("/mails", async (req, res) =>{
    try {
        const result = await transporter.sendMail(mailOptions);
        res.json(result);
    } catch (err) {
        res.status(400).json({message: err});
    }
})

module.exports = router;