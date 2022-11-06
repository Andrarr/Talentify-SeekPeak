import { Event } from "./events.js";
import { transporter } from "../utils/default.js"


export const approved = Event.on("approved::user", async (receiverEmail) => {

    await transporter.sendMail({
        from: "seekPeak@frakton.dev",
        to: receiverEmail,
        subject: "application approved",
        html: "<b>Hi there!</b> <br> Your application has been approved!"
    });
    console.log("approved email sent")
}
)

export const notApproved = Event.on("declined::user", async (receiverEmail) => {

    await transporter.sendMail({
        from: "seekPeak@frakton.dev",
        to: receiverEmail,
        subject: "application not approved",
        html: '<b>We are sorry! </b><br> Your application has been declined!'
    });
    console.log("declined email sent")
})

