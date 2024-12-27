import { SendEmailCommand, SESClient } from '../infra-mock/mail';
import {
  IEmailGateway,
  SendEmailParams,
} from '../interfaces/gateways/IEmailGateway';

export class SESGateway implements IEmailGateway {
  private readonly client: SESClient;

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
