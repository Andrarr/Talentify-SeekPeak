
import nodemailer from "nodemailer"

export const transporter = nodemailer.createTransport({
  host: "smtpmailhog.frakton.dev",
  port: 1025,
  username: null,
  password: null,
  from: "seekPeak@frakton.dev",
  encryption: null
});

//export const transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false,
//     auth: {
//         user: "andrra.rrustemi@frakton.com",
//         pass: "engnvimilzukktrw"
//     }
// });