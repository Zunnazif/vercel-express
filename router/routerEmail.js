import express from 'express';
import nodemailer from 'nodemailer';

const route = express.Router();

const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.gmail.com",
    auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS,
    },
    secure: true, // upgrades later with STARTTLS -- change this based on the PORT
});

route.post('/SendToEmail', (req, res) => {
    const { sendTo, subject, bodyHTML } = req.body;
    
    const mailData = {
        from: process.env.EMAIL,
        to: sendTo,
        subject: subject,
        html: bodyHTML,
    };

    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ message: "Mail send", message_id: info.messageId});
        
        previewEmail(mailData)
        .then(data => {
            return res.status(200).send({email: data})
        })
        .catch(err => {
            return console.log(err)
        })
    });
})

export default route
