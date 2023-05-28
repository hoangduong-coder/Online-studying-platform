/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */

import config from "./config";
import { createTransport } from "nodemailer";

const verificationHandler = async (email: string, subject: string, text: string) => {
  try {
    const transporter = createTransport({
      service: config.SERVICE,
      port: config.EMAIL_PORT,
      secure: config.SECURE,
      auth: {
        user: config.USER_EMAIL,
        pass: config.USER_PASS
      }
    });

    await transporter.sendMail({
      from: config.USER_EMAIL,
      to: email,
      subject: subject,
      text: text
    });

    console.log(`Email sent successfully to ${email}`);
  } catch (error) {
    console.log(`Email sent successfully to ${email}, error: ${error}`);
  }
};
export default verificationHandler;