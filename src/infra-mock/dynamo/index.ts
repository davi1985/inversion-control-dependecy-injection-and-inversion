type ItemDB = { id: string; email: string; amount: number };
type Props = { region: string };

export class DynamoDBMock {
  private readonly items: Set<string> = new Set();

  constructor(private region: Props) {}

  async send(command: PutCommand) {
    this.items.add(JSON.stringify(command));

    console.log({ database: `Save order: ${command.props.Item.id}` });
  }
}

type PutCommandProps = {
  TableName: string;
  Item: ItemDB;
};

export class PutCommand {
  constructor(public props: PutCommandProps) {}
}
