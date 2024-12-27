/* eslint-disable @typescript-eslint/no-explicit-any */
import { Constructor } from '../types/utils';
import { Registry } from './Registry';

export const Injectable = (token: string) => (target: Constructor<any>) =>
  Registry.getInstance().register(token, target);
