import { throttle } from 'lodash';

export const withDelay = (func: (...args: any) => any, delay: number) => {
  return throttle(func, delay, {
    trailing: true,
    leading: true,
  }) as typeof func;
};
