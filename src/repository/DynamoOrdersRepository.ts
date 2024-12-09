import { Order } from '../entities/Order';
import { DynamoDBMock, PutCommand } from '../infra-mock/dynamo';

export class DynamoOrdersRepository {
  private client: DynamoDBMock;

  constructor() {
    this.client = new DynamoDBMock({ region: 'us-east-1' });
  }

  async create(order: Order): Promise<void> {
    const command = new PutCommand({
      TableName: 'Orders',
      Item: order,
    });

    await this.client.send(command);
  }
}
