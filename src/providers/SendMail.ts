import nodemailer from 'nodemailer';

interface MailDTO {
  to: string;
  subject: string;
  body: string;
}

class SendMail {
  async sendMail({ to, subject, body }: MailDTO): Promise<void> {
    const account = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });
    const message = await transporter.sendMail({
      to,
      subject,
      html: body,
      from: 'NPS <noreply@npsmetter.com>',
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export default SendMail;
