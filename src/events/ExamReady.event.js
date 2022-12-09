import { Event } from './Events.js';
import { transporter } from '../config/Mail.config.js';
import { loadTemplate } from '../utils/LoadView.util.js';

export const testAvailable = Event.on('test::ready', async (receiverEmail) => {
  let html = await loadTemplate('examReadyReview.html', {
    title: 'Test is ready for you!',
    disclaimer: 'This test is meant to be an evaluation test!',
  });
  transporter.sendMail({
    from: 'seekPeak@frakton.dev',
    to: receiverEmail,
    subject: 'Testing phase is waiting for you!',
    html: html,
  });
});
