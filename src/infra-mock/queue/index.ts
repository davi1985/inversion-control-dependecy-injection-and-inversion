type Props = { region: string };

export class SQSClient {
  #items: Set<string> = new Set();

  constructor(private props: Props) {}

  async send(command: SendMessageCommand) {
    this.#items.add(JSON.stringify(command));

    console.log({
      queue: JSON.parse(command.props.MessageBody),
    });
  }
}

type PutCommandProps = {
  QueueURL: string;
  MessageBody: string;
};

export class SendMessageCommand {
  constructor(public props: PutCommandProps) {}
}
