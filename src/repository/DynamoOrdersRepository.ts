import { Inject } from '../di/Inject';
import { Order } from '../entities/Order';
import { DynamoDBMock, PutCommand } from '../infra-mock/dynamo';
import { ILogGateway } from '../interfaces/gateways/ILogGateway';
import { IOrderRepository } from '../interfaces/repositories/IOrdersRepository';

export class DynamoOrdersRepository implements IOrderRepository {
  private readonly client = new DynamoDBMock({
    region: 'us-east-1',
  });

  constructor(@Inject('LogGateway') private readonly logGateway: ILogGateway) {}

  async create(order: Order): Promise<void> {
    const command = new PutCommand({
      TableName: 'Orders',
      Item: {
        id: order.getId(),
        email: order.getEmail(),
        amount: order.getAmount(),
      },
    });

    await this.logGateway.log({ ...order });

    await this.client.send(command);
  }
}
