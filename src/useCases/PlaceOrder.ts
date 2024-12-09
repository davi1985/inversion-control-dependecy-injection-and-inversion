import { Order } from '../entities/Order';
import { DynamoDBMock, PutCommand } from '../infra-mock/dynamo';
import { SendEmailCommand, SESClient } from '../infra-mock/mail';
import { SendMessageCommand, SQSClient } from '../infra-mock/queue';

export class PlaceOrder {
  async execute() {
    const customerEmail = 'davisilvaphoto@gmail.com';
    const amount = Math.ceil(Math.random() * 1000);
    const order = new Order(customerEmail, amount);

    // Save order in database
    const dynamoClient = new DynamoDBMock({ region: 'us-east-1' });
    const putItemCommand = new PutCommand({
      TableName: 'Orders',
      Item: order,
    });

    await dynamoClient.send(putItemCommand);

    // Publish an message in queue to process payment
    const sqsClient = new SQSClient({ region: 'us-east-1' });
    const sendMessageCommand = new SendMessageCommand({
      QueueURL: 'fake-url',
      MessageBody: JSON.stringify({ orderId: order.id }),
    });

    await sqsClient.send(sendMessageCommand);

    // Send confirmation e-mail to customer
    const sesClient = new SESClient({ region: 'us-east-1' });
    const sendEmailCommand = new SendEmailCommand({
      Source: 'JStore <noreply@mateus.dev.br>',
      Destination: {
        toAddresses: [customerEmail],
      },
      Message: {
        Subject: {
          Charset: 'utf-8',
          Data: `Pedido #${order.id} confirmado.`,
        },
        Body: {
          Html: {
            Charset: 'utf-8',
            Data: `
              <h1>E ai Davi!</h1>
              <p>Passando aqui só avisar que o seu pedido já foi confirmado e em breve você receberá a confirmação do pagamento e a nota fiscal aqui no seu e-mail.</p>

              <small>{{ tabela com os itens do pedido }}</small>
            `,
          },
        },
      },
    });

    await sesClient.send(sendEmailCommand);

    return { orderId: order.id };
  }
}
