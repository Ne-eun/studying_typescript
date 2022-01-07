import { AxiosPromise, AxiosResponse } from 'axios'

import { NestError, NestErrorLevel } from '../plugin/error'

type NoneNullable<T> = T extends null | undefined ? never : T

export type Compose = <V, W>(
  err_code: number,
  err_message?: string,
  interceptor?: (...args: any[]) => V,
  verifier?: (...args: any[]) => boolean,
  verifier_message?: string,
) => Promise<W>

const resolveBody = <T>(
  result: AxiosPromise<T> | Promise<T> | T,
  ...args: any[]
) => (...composeArgs: Parameters<Compose>) => {
  try {
    const verifier = (parameter: T) => {
      if (composeArgs[3] && composeArgs[3](parameter))
        throw new NestError(
          NestErrorLevel.WARNING,
          composeArgs[0],
          composeArgs[4]
            ? composeArgs[4]
            : `알 수 없는 오류로 해당 요청에 실패했습니다. 확인 후 다시 시도해주세요.`,
        )
    }

    if (result instanceof Promise) {
      return result
        .then((res: AxiosResponse<T> | T) => {
          const data = <AxiosResponse>res

          if (data.data) {
            verifier(data.data)
            return <NoneNullable<T>>data.data
          }

          verifier(<T>res)
          return <NoneNullable<T>>res
        })
        .catch(async (err) => {
          if (composeArgs[2])
            args.length == 0 ? composeArgs[2](result) : composeArgs[2](...args)

          throw new NestError(
            NestErrorLevel.WARNING,
            composeArgs[0],
            composeArgs[1]
              ? composeArgs[1]
              : err.response
              ? err.response.data.message
                ? err.response.data.message
                : err.response.data.error.message ??
                  err.response.data.errors.message
              : err.message,
            undefined,
            err,
          )
        })
    }

    verifier(result)
    return <NoneNullable<T>>result
  } catch (err) {
    if (composeArgs[2])
      args.length == 0 ? composeArgs[2](result) : composeArgs[2](...args)

    throw new NestError(
      NestErrorLevel.WARNING,
      composeArgs[0],
      composeArgs[1]
        ? composeArgs[1]
        : err.response
        ? err.response.data.message
          ? err.response.data.message
          : err.response.data.error.message ?? err.response.data.errors.message
        : err.message,
      undefined,
      err,
    )
  }
}

export const resolve = <T>(result: AxiosPromise<T> | Promise<T> | T) =>
  resolveBody(result)

export const resolveFunc = <T extends any[], U>(
  fn: (...args: T) => AxiosPromise<U> | Promise<U> | U,
) => (...args: Parameters<typeof fn>) => resolveBody(fn(...args), ...args)
