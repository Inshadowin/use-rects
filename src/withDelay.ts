import throttle from 'lodash.throttle';

export const withDelay = (func: (...args: any) => any, delay: number) => {
  return throttle(func, delay, {
    trailing: true,
    leading: true,
  }) as typeof func;
};
