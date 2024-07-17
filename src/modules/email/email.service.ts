import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  constructor(private readonly configService: ConfigService) {}

  async sendEmail(to: string, subject: string, text: string) {
    const userEmail = process.env.EMAIL_USER; 
    const userPassword = process.env.EMAIL_PASS;
    if (!userEmail || !userPassword) {
      throw new Error('Email credentials not found');
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: userEmail,
        pass: userPassword,
      },
    });

    const mailOptions = {
      from: userEmail,
      to: to,
      subject: subject,
      text: text,
    };
    try {
      const info = await transporter.sendMail(mailOptions);
    } catch (error) {
      console.error("Error sending email:", error);
     
    }
  }
}
