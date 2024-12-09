import { randomUUID } from 'node:crypto';

import { DynamoDBMock, PutCommand } from '../infra-mock/dynamo';
import { SendMessageCommand, SQSClient } from '../infra-mock/queue';
import { SendEmailCommand, SESClient } from '../infra-mock/mail';

export class PlaceOrder {
  async execute() {
    const customerEmail = 'davisilvaphoto@gmail.com';
    const amount = Math.ceil(Math.random() * 1000);
    const orderId = randomUUID();

    // Save order in database
    const dynamoClient = new DynamoDBMock({ region: 'us-east-1' });
    const putItemCommand = new PutCommand({
      TableName: 'Orders',
      Item: {
        id: orderId,
        email: customerEmail,
        amount,
      },
    });

    await dynamoClient.send(putItemCommand);

    // Publish an message in queue to process payment
    const sqsClient = new SQSClient({ region: 'us-east-1' });
    const sendMessageCommand = new SendMessageCommand({
      QueueURL: 'fake-url',
      MessageBody: JSON.stringify({ orderId }),
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
          Data: `Pedido #${orderId} confirmado.`,
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

    return { orderId };
  }
}
