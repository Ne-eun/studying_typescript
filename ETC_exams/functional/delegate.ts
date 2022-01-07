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

  // 외부파일에서 임포트해서 사용하고, 계속해서 같은 파라미터를 필요료 할 때 사용함
  // (req: NextRequst, res: NextResponse, next: NextFunction) => () 처럼 계속해서 같은 파라미터가 필요한 경우