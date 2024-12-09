import { SendEmailCommand, SESClient } from '../infra-mock/mail';

type SendEmailParams = {
  from: string;
  to: string[];
  subject: string;
  html: string;
};
export class SESGateway {
  private client: SESClient;

  constructor() {
    this.client = new SESClient({ region: 'us-east-1' });
  }

  async sendEmail({ from, to, subject, html }: SendEmailParams): Promise<void> {
    const command = new SendEmailCommand({
      Source: from,
      Destination: {
        toAddresses: to,
      },
      Message: {
        Subject: {
          Charset: 'utf-8',
          Data: subject,
        },
        Body: {
          Html: {
            Charset: 'utf-8',
            Data: html,
          },
        },
      },
    });

    await this.client.send(command);
  }
}
