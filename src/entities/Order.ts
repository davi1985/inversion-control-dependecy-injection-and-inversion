import { randomUUID } from 'node:crypto';

export class Order {
  #id: string;

  constructor(public readonly email: string, public amount: number) {
    this.#id = randomUUID();
  }

  get id() {
    return this.#id;
  }
}
