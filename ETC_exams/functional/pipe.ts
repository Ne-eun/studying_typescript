export const pipe = <T, U>(
  ...funcs: ((...args: (T | Promise<T> | U | Promise<U>)[]) => U | Promise<U>)[]
) => (v: any) => {
  return funcs.reduce((res, func) => {
    if (res instanceof Promise)
      return res.then((v) => func(v)).catch((err) => err)

    return func(res)
  }, v)
}
