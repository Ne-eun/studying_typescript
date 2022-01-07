export const asPromise = <T extends any[], U, V, W>(fn: (...args: [...T, (err: V, data: W) => any]) => U) => (...args: T) => new Promise((resolve, reject) => fn(...<T>(args as any), (err, data) => {
  if (err) return reject(err)
  return resolve(data)
}));