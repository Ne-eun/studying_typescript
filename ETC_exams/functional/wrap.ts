export const wrap = <T extends (...args: any[]) => any, U>(param: T | U) => {
  const result = <T>param

  if (typeof result === 'function') {
    if (result[Symbol.toStringTag] === 'AsyncFunction') return result
    return async (...a: Parameters<typeof result>) => result(...a)
  }

  return async () => param
}
