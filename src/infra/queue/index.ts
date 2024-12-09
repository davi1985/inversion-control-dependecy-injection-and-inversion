type Props = { region: string };

export class SQSClient {
  #items: Set<string> = new Set();

  constructor(private props: Props) {}

  async send(command: SendMessageCommand) {
    this.#items.add(JSON.stringify(command));
    console.log({ database: 'Publish message' });
  }
}

type PutCommandProps = {
  QueueURL: string;
  MessageBody: string;
};

export class SendMessageCommand {
  constructor(private props: PutCommandProps) {}
}
