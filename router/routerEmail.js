import express from 'express';
import nodemailer from 'nodemailer';

const route = express.Router();


route.post('/SendToEmail', (req, res) => {

    const { 
        nameFrom, 
        sendFrom, 
        password, 
        nameTo, 
        sendTo, 
        subject, 
        bodyHTML 
    } = req.body;
    

    const transporter = nodemailer.createTransport({
        port: 465,
        host: "smtp.gmail.com",
        auth: {
            user: sendFrom,
            pass: password,
        },
        secure: true, // upgrades later with STARTTLS -- change this based on the PORT
    });
    
    const mailData = {
        from: {
            name: nameFrom,
            address: sendFrom
        },
        to: {
            name: nameTo,
            address: sendTo
        },
        subject: subject,
        html: bodyHTML,
    };

    transporter.sendMail(mailData, (error, info) => {
        if (error) {
            return console.log(error);
        }
        res.status(200).send({ isSucceeded: true, message: "Mail send", response: info.envelope});
        
    });
})

export default route
