import { Event } from "./events.js";
import { transporter } from "../utils/default.js"
import { loadTemplate } from "../utils/loadView.js";
import jwt from "jsonwebtoken";
import { Applicant } from "../model/applicants.js";

export const testAvailable = Event.on("test::ready", async (receiverEmail) => {
    let html = await loadTemplate("examReadyReview.html", {
        title: "Test is ready for you!"    
       })
    transporter.sendMail({
        from: "seekPeak@frakton.dev",
        to: receiverEmail,
        subject: "Testing phase is waiting for you!",
        html: html,
    });
    console.log("approved email sent")
})
