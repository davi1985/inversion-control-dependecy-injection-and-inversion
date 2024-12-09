import { SendMessageCommand, SQSClient } from '../infra-mock/queue';

export class SQSGateway {
  private readonly client: SQSClient;

  constructor() {
    this.client = new SQSClient({ region: 'us-east-1' });
  }

  async publishMessage(message: Record<string, unknown>): Promise<void> {
    const command = new SendMessageCommand({
      QueueURL: 'fake-url',
      MessageBody: JSON.stringify(message),
    });

    await this.client.send(command);
  }
}
