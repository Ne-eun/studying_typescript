import axios, { AxiosRequestConfig } from 'axios'

import { resolveFunc, curry } from '../functional'

export abstract class Singleton {
  protected instance: Singleton
  protected env: { [key: string]: any }

  constructor(...envs: string[]) {
    this.instance = this

    if (
      envs.length != 0 &&
      envs.filter((env) => {
        if (typeof process.env[env] == 'undefined')
          console.log(`환경변수 누락: ${env}`)

        return typeof process.env[env] == 'undefined'
      }).length != 0
    )
      throw new Error(
        `인스턴스를 초기화하는데 실패했습니다. 확인 후 다시 시도해주세요.`,
      )

    this.env = {}
    envs.map((env) => {
      this.env[env] = process.env[env]
    })
  }

  protected delegate = <T extends any[], R>(
    func: (...args: T) => R | Promise<R>,
  ) => {
    if (!this.instance)
      throw new Error(
        `인스턴스를 초기화하는데 실패했습니다. 확인 후 다시 시도해주세요.`,
      )

    return curry(func)
  }

  protected resolve = resolveFunc
  protected axios = this.resolve((config: AxiosRequestConfig) =>
    axios({
      ...config,
    }),
  )

  protected delegateAxios = <T extends any[]>(fn: (...args: T) => any) => (
    ...args: Parameters<typeof fn>
  ) => this.axios(fn(...args))
}
