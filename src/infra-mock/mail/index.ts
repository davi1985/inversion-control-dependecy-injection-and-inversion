type Props = { region: string };

export class SESClient {
  #items: Set<string> = new Set();

  constructor(private props: Props) {}

  async send(command: SendEmailCommand) {
    this.#items.add(JSON.stringify(command));
    console.log({ database: 'Send e-mail' });
  }
}

type SendEmailCommandProps = {
  Source: string;
  Destination: {
    toAddresses: string[];
  };
  Message: {
    Subject: {
      Charset: string;
      Data: string;
    };
    Body: {
      Html: {
        Charset: string;
        Data: string;
      };
    };
  };
};
export class SendEmailCommand {
  constructor(private props: SendEmailCommandProps) {}
}
