import { randomUUID } from 'node:crypto';

export class Order {
  private readonly id: string;
  private email: string;
  private amount: number;

  constructor(email: string, amount: number) {
    this.validate(email, amount);
    this.id = randomUUID();
    this.email = email;
    this.amount = amount;
  }

  getId() {
    return this.id;
  }

  getEmail() {
    return this.email;
  }

  getAmount() {
    return this.amount;
  }

  private validate(email: string, amount: number): void {
    if (!email.includes('@')) {
      throw new Error('Invalid email format');
    }
    if (amount <= 0) {
      throw new Error('Amount must be greater than zero');
    }
  }
}
