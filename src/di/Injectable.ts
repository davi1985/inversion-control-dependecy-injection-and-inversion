import { Constructor } from '../types/utils';
import { Registry } from './Registry';

export const Injectable = (token: string) => (target: Constructor<unknown>) =>
  Registry.getInstance().register(token, target);
