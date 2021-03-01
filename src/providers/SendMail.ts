import nodemailer from 'nodemailer';
import fs from 'fs';
import handlebards from 'handlebars';

interface MailDTO {
  to: string;
  subject: string;
  path: string;
  variables: object; // eslint-disable-line
}

class SendMail {
  async sendMail({ to, subject, path: templatePath, variables }: MailDTO): Promise<void> {
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

    const fileContent = fs.readFileSync(templatePath).toString('utf-8');

    const mailtTemplateParser = handlebards.compile(fileContent);

    const html = mailtTemplateParser(variables);

    const message = await transporter.sendMail({
      to,
      subject,
      html,
      from: 'NPS <noreply@npsmetter.com>',
    });

    console.log('Message sent: %s', message.messageId);
    console.log('Preview URL: %s', nodemailer.getTestMessageUrl(message));
  }
}

export default SendMail;
