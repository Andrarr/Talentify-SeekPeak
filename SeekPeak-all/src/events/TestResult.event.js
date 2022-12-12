import { transporter } from '../config/Mail.config.js'
import { loadTemplate } from '../utils/LoadView.util.js'
import { Event } from './Events.js'

export const passed = Event.on('passedTest::true', async (receiverEmail) => {
    
    let html = await loadTemplate('passedTestEmail.html', {
        answer: 'Passed your test',
        text: 'We are very happy to have you in our team!'
    })
    transporter.sendMail({
        from: 'seekPeak@frakton.dev',
        to: receiverEmail,
        subject: 'Acceptance Answer',
        html: html,
    })
    console.log('passedTest email sent')
})

export const failed = Event.on('passedTest::false', async (receiverEmail) => {
    let html = await loadTemplate('passedTestEmail.html', {
        answer: 'You did not pass your test',
        text: 'We wish you good luck!'
    })
    transporter.sendMail({
        from: 'seekPeak@frakton.dev',
        to: receiverEmail,
        subject: 'Acceptance Answer',
        html: html,
    });
    console.log('failedTest email sent')
}
)
