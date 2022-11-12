import { Event } from "./events.js";
import { transporter } from "../utils/default.js"
import { loadTemplate } from "../utils/loadView.js";

export const approved = Event.on("approved::user", async ( receiverEmail) => {
    let html = await loadTemplate("applicationReview.html", {
        answer: "Approved",
        reason: "You are a fit for us!"
    })
    transporter.sendMail({
        from: "seekPeak@frakton.dev",
        to: receiverEmail,
        subject: "Regarding your Application - Information",
        html: html,
    });
    console.log("approved email sent")
}
)

export const notApproved = Event.on("declined::user", async ( receiverEmail ) => {
    let html = await loadTemplate("applicationReview.html", {
        answer: "Declined",
        reason: "declined. Good luck!", 
    })
    transporter.sendMail({
        from: "seekPeak@frakton.dev",
        to: receiverEmail,
        subject: "Regarding your Application - Information",
        html: html
    });
    console.log("declined email sent")
})
