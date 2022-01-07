import {
  asPromise,
  curry,
  delegate,
  pipe,
  resolve,
  resolveFunc,
  wrap,
} from './functional'
import { Singleton } from './singleton'

import dotenv from 'dotenv'
dotenv.config({ path: `${__dirname}/.env/default.env` })

/**
 * 싱글톤 패턴 예제
 */
class Example extends Singleton {
  protected static instance: Example

  private constructor() {
    super('NODE_ENV_TEST_1', 'NODE_ENV_TEST_2')

    Example.instance = this
  }

  static getInstnace() {
    if (!Example.instance) {
      Example.instance = new Example()
    }

    return this.instance
  }

  getNaver = this.axios({
    url: 'https://www.naver.com',
  })

  getNaverWithError = this.axios({
    url: 'https://wwww.naver.com',
  })

  getUrl = this.delegateAxios((url: string) => ({
    url: url,
  }))
}

const add = (a: number, b: number) => a + b
const mul = (c: number, d: number) => c * d

const curryAdd = curry(add)
const curryMul = curry(mul)

const pipeAddMul = (a: number, b: number, d: number) =>
  pipe((c: number) => mul(c, d))(add(a, b))

const asyncAdd = wrap(add)
const asyncMul = wrap(mul)
const asyncThrow = async () => {
  throw new Error('오류 테스트 입니다.')
}

const callbackAdd = <T>(
  a: number,
  b: number,
  callback: (err: Error, data: number) => T,
) => {
  try {
    return callback(undefined, add(a, b))
  } catch (err) {
    return callback(err, undefined)
  }
}

;(async () => {
  // 예제 1번
  console.log('예제 1 - Singleton 패턴')

  // getNaver 호출
  console.log(
    '예제 1-1:',
    (await Example.getInstnace().getNaver(-9))[0] == '\n',
  )

  // getNaver 호출 (validator - 마이페이지 정보 찾기)
  //console.log('예제 1-2:', (await Example.getInstnace().getNaver(-9, undefined, undefined, (data) => data.search('마이페이지') == -1, 'validator: 마이페이지 정보를 찾을 수 없습니다.')))

  // getNaver 호출 (validator - 마이페이지 정보 찾기, interceptor - url 정보 표기)
  //console.log('예제 1-3:', (await Example.getInstnace().getNaver(-9, undefined, ({ url }) => console.log(`interceptor: 인자값 - ${url}`), (data) => data.search('마이페이지') == -1, 'validator: 마이페이지 정보를 찾을 수 없습니다.')))

  // getNaverWithError 호출
  //console.log('예제 1-10:', (await Example.getInstnace().getNaverWithError(-9)))

  // getNaverWithError 호출 (오류 메시지 후킹)
  //console.log('예제 1-20:', (await Example.getInstnace().getNaverWithError(-9, '오류 메시지 후킹')))

  // getNaverWithError 호출 (interceptor)
  //console.log('예제 1-30:', (await Example.getInstnace().getNaverWithError(-9, undefined, ({ url }) => console.log(`interceptor: 인자값 - ${url}`))))

  // getNaverWithError 호출
  //console.log('예제 1-20:', await Example.getInstnace().getUrl('https://www.daum.net')(-9))

  // 함수형 프로그래밍
  console.log('예제 2 - 함수형 프로그래밍')

  // 커링 함수 호출
  console.log('예제 2-1:', curryAdd(1)(2), curryMul(3)(4))

  // 파이프 함수 호출
  console.log('예제 2-2:', pipeAddMul(1, 2, 4))

  // asyncAdd 호출
  console.log('예제 2-3:', await asyncAdd(1, 2))

  // asyncAdd 해결
  console.log('예제 2-10:', await delegate(async () => await asyncAdd(1, 2))())

  // asyncAdd 해결 응용
  console.log(
    '예제 2-11:',
    await delegate(async (req, err_code) => await asyncAdd(1, 2))(
      undefined,
      100,
    ),
  )

  // asyncAdd resolver 사용
  console.log('예제 2-20:', resolve(await asyncAdd(0, 1))(-9))

  // asyncMul resolverFunc 사용 (외부 인자 값 전달)
  console.log(
    '예제 2-21:',
    await resolveFunc(async (a: number, b: number) => await asyncMul(a, b))(
      1,
      2,
    )(-9),
  )

  // asyncThrow resolveFunc 사용
  //console.log('예제 2-22:', resolveFunc(asyncThrow)()(-9))

  // asyncThrow resolveFunc 사용 ()
  //console.log('예제 2-23:', resolveFunc(asyncThrow)()(-9, '오류 문구를 가로챘습니다.'))

  // asyncMul resolveFunc 사용 (validator)
  console.log(
    '예제 2-24:',
    await resolveFunc(asyncMul)(1, 2)(
      -9,
      undefined,
      undefined,
      (value) => value == 0,
      'validator: 결과 값은 0이 아니어야 합니다.',
    ),
  )

  // asyncMul resolveFunc 사용 (validator, interceptor)
  console.log(
    '예제 2-25:',
    await resolveFunc(asyncMul)(1, 2)(
      -9,
      undefined,
      (a, b) => console.log(`interceptor: 원본 값은 ${a}, ${b} 입니다.`),
      (value) => value == 0,
      'validator: 결과 값은 0이 아니어야 합니다.',
    ),
  )

  // asPromise를 사용한 callbackAdd 함수의 Promise화된 비동기 처리
  console.log('예제 2-30:', await asPromise(callbackAdd)(3, 4))
})()
