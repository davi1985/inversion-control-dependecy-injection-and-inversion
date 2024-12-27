import { Inject } from '../di/Inject';
import { Order } from '../entities/Order';
import { IEmailGateway } from '../interfaces/gateways/IEmailGateway';
import { IQueueGateway } from '../interfaces/gateways/IQueueGateway';
import { IOrderRepository } from '../interfaces/repositories/IOrdersRepository';

export class PlaceOrder {
  constructor(
    @Inject('OrdersRepository')
    private readonly ordersRepository: IOrderRepository,
    @Inject('QueueGateway') private readonly queueGateway: IQueueGateway,
    @Inject('EmailGateway') private readonly emailGateway: IEmailGateway
  ) {}

  async execute() {
    const customerEmail = 'davisilvaphoto@gmail.com';
    const amount = Math.ceil(Math.random() * 1000);
    const order = new Order(customerEmail, amount);

    await this.ordersRepository.create(order);
    await this.queueGateway.publishMessage({ orderId: order.getId() });
    await this.emailGateway.sendEmail({
      from: 'JStack <noreplay@mateus.dev.br>',
      to: [customerEmail],
      subject: `Pedido #${order.getId()} confirmado.`,
      html: `
        <h1>E ai Davi!</h1>
        <p>Passando aqui só avisar que o seu pedido já foi confirmado e em breve você receberá a confirmação do pagamento e a nota fiscal aqui no seu e-mail.</p>

        <small>{{ tabela com os itens do pedido }}</small>`,
    });

    return { orderId: order.getId() };
  }
}
