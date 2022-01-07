import { Request } from 'express'

import { NestError, NestErrorLevel } from '../plugin/error'

export const delegate = <
  T extends (req?: Request, err_code?: number) => Promise<U>,
  U
>(
  fn: T,
) => async (...args: Parameters<typeof fn>) =>
  await fn(args[0], args[1]).catch((e) => {
    console.error(e)

    if (e instanceof NestError)
      throw new NestError(e.level, e.code, e.message, e.result, e.error)

    throw new NestError(NestErrorLevel.ERROR, args[1], e.message, undefined, e)
  })
