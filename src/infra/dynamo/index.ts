type ItemDB = { id: string; email: string; amount: number };
type Props = { region: string };

export class DynamoDBMock {
  #items: Set<string> = new Set();

  constructor(private region: Props) {}

  async send(command: PutCommand) {
    this.#items.add(JSON.stringify(command));
    console.log({ database: 'Save order' });
  }
}

type PutCommandProps = {
  TableName: string;
  Item: ItemDB;
};

export class PutCommand {
  constructor(private props: PutCommandProps) {}
}
