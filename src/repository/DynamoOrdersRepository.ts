import { Order } from '../entities/Order';
import { DynamoDBMock, PutCommand } from '../infra-mock/dynamo';

export class DynamoOrdersRepository {
  private readonly client: DynamoDBMock;

  constructor() {
    this.client = new DynamoDBMock({ region: 'us-east-1' });
  }

  async create(order: Order): Promise<void> {
    const command = new PutCommand({
      TableName: 'Orders',
      Item: {
        id: order.getId(),
        email: order.getEmail(),
        amount: order.getAmount(),
      },
    });

    await this.client.send(command);
  }
}
