import * as nodemailer from 'nodemailer';
import { template } from './template';
export const sendMail = async (to: string, subject: string, text: string) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'minhnct0319@dhv.edu.vn',
      pass: 'Hvuh@123',
    },
  });

  const mailOptions = {
    from: 'minhnct0319@dhv.edu.vn',
    to,
    subject,
    text,
    html: template(text),
  };

  await transporter.sendMail(mailOptions);
};
