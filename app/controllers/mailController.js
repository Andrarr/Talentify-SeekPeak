import { engine } from "express-handlebars"
import { Router } from "express"
import bodyParser from "body-parser"
import express from "express"
import { transporter } from "../utils/default.js"

const app = express()
const router = express.Router()


transporter.verify(function (error) {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take our emails!');
    }
});

export const emailTransport = (req, res)=>{
    console.log(req.body)
    const { to, sub, body } = req.body;
    let obj = transporter.sendMail({
        from: "seekPeak@frakton.dev",
        to: to,
        subject: sub,
        text: body,
        html: '<b>Hey there! </b><br> This is testing email sent with Nodemailer!'
    });

    
    if (!obj) {
        res.status(500).json({
            status: "internal server error",
            message: "error sending message"
        });
    }
    else {
        res.status(201).json({
            status: "create",
            message: "message sent"
        });
    }
}
export { router }