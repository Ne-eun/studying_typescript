export enum NestErrorLevel {
  INFO = 0,
  WARNING = 1,
  ERROR = 2,
  CRITICAL = 3,
  DEBUG = 9,
}

export class NestError extends Error {
  public level: NestErrorLevel
  public code: number | string
  public result: { [key: string]: any } | undefined
  public error: Error | undefined

  constructor(
    level: NestErrorLevel,
    code: number | string,
    message?: string,
    result?: { [key: string]: any },
    error?: Error,
  ) {
    super(message)

    this.level = level
    this.code = code
    this.result = result
    this.error = error
  }
}
