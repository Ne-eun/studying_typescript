import { asPromise, curry, delegate, pipe, resolve, resolveFunc, wrap } from './functional'
import { Singleton } from './singleton'

/**
 * 싱글톤 패턴 예제
 */
class Example extends Singleton {
  protected static instance: Example // 클래스를 생성하지 않아도 호출이 가능하다

  private constructor() { // 서브웨이 빵고르기: 요리를 만들기 위한 사전작업
    super('NODE_ENV_TEST_1', 'NODE_ENV_TEST_2') // 환경변수를 전역적으로 찾음 만약에 instance가 없을 경우 에러를 터트림
    // 라우터를 탈 때 해당 class가 실행된다.
    Example.instance = this
  }

  static getInstnace() { // OOP 클래스를 생성하지 않아도 호출가능한 method
    if (!Example.instance) {
      Example.instance = new Example() // 클래스 생성
    }

    return this.instance // 기존의 클래스 return
  }

  getNaver = () => this.axios({
    url: 'https://www.naver.com'
  })

  getNaverWithError = () => this.axios({
    url: 'https://www.naver12.co'
  })

  getUrl = this.delegateAxios((url: string) => ({
    url: url
  }))

  // aab = this.delegate(()=>{}) 클래스 사전에서 선언한 method를 사용할 수 있음
  // class안에서 prosess를 조회할 땐 this.prosess로 검색, 전역적으로 검색하지 않아도 된다.
}


const add = (a: number, b: number) => a + b;
const mul = (c: number, d: number) => c * d;

const curryAdd = curry(add);
const curryMul = curry(mul);

const pipeAddMul = (a: number, b: number, d: number) => pipe((c: number) => mul(c, d))(add(a, b));

const asyncAdd = wrap(add);
const asyncMul = wrap(mul);
const asyncThrow = async () => { throw new Error('오류 테스트 입니다.') }

const callbackAdd = <T>(a: number, b: number, callback: (err: Error, data: number) => T) => {
  try {
    return callback(undefined, add(a, b))
  }
  catch (err) {
    return callback(err, undefined)
  }
}

(async () => {
  // 예제 1번
  console.log('예제 1 - Singleton 패턴')

    // getNaver 호출
    console.log('예제 1-1:', (await Example.getInstnace().getNaver()(-9))[0] == '\n') // Example.getNaver 클래스안에 정의한 함수 실행
    // 김치찌개 레시피 => class이고, class는 메모리에 할당되지 않는다 Class 선언
    // 실제로 김치찌개를 제작했을 때 메모리에 할당이 된다. 객체생성
    // 한번 제작한 레시피는 프로그램이 종료되기 전에 다시 생성 할 수 없음
    // 만약 돼지고기김치찌개가 필요하다면 김치찌개 레시피를 복사해서 추가한 레시피를 만들어낼 수 있음 이 또한 그저 class선언일 뿐 메모리에 할당되지않는다.


    // getNaver 호출 (validator - 마이페이지 정보 찾기)
    //console.log('예제 1-2:', (await Example.getInstnace().getNaver()(-9, undefined, undefined, (data) => data.search('마이페이지') == -1, 'validator: 마이페이지 정보를 찾을 수 없습니다.')))

    // getNaver 호출 (validator - 마이페이지 정보 찾기, interceptor - url 정보 표기)
    //console.log('예제 1-3:', (await Example.getInstnace().getNaver()(-9, undefined, ({ url }) => console.log(`interceptor: 인자값 - ${url}`), (data) => data.search('마이페이지') == -1, 'validator: 마이페이지 정보를 찾을 수 없습니다.')))

    // getNaverWithError 호출
    //console.log('예제 1-10:', (await Example.getInstnace().getNaverWithError()(-9)))

    // getNaverWithError 호출 (오류 메시지 후킹)
    //console.log('예제 1-20:', (await Example.getInstnace().getNaverWithError()(-9, '오류 메시지 후킹')))

    // getNaverWithError 호출 (interceptor)
    //console.log('예제 1-30:', (await Example.getInstnace().getNaverWithError()(-9, undefined, ({ url }) => console.log(`interceptor: 인자값 - ${url}`))))

    // getNaverWithError 호출
    //console.log('예제 1-20:', await Example.getInstnace().getUrl('https://www.daum.net')(-9))


  // 함수형 프로그래밍
  console.log('예제 2 - 함수형 프로그래밍')

  // 커링 함수 호출
  console.log('예제 2-1:', curryAdd(1)(2), curryMul(3)(4)) //
  const curryone = curryAdd(1)
  curryone(2) // 미리 1의 값을 가지고 대기중인 함수를 실행함

  // 파이프 함수 호출
  console.log('예제 2-2:', pipeAddMul(1, 2, 4))

  // asyncAdd 호출
  console.log('예제 2-3:', await asyncAdd(1, 2))

  // asyncAdd 해결
  console.log('예제 2-10:', await delegate(async () => await asyncAdd(1, 2))())

  // asyncAdd 해결 응용
  console.log('예제 2-11:', await delegate(async (req, err_code) => await asyncAdd(1, 2))(undefined, 100))

  // asyncAdd resolver 사용
  console.log('예제 2-20:', resolve(await asyncAdd(0, 1))(-9)) //-9는 에러코드임

  // asyncMul resolverFunc 사용 (외부 인자 값 전달)
  console.log('예제 2-21:', await resolveFunc(async (a: number, b: number) => await asyncMul(a, b))(1, 2)(-9))

  // asyncThrow resolveFunc 사용
  //console.log('예제 2-22:', resolveFunc(asyncThrow)()(-9))

  // asyncThrow resolveFunc 사용 ()
  //console.log('예제 2-23:', resolveFunc(asyncThrow)()(-9, '오류 문구를 가로챘습니다.'))

  // asyncMul resolveFunc 사용 (validator)
  console.log('예제 2-24:', await resolveFunc(asyncMul)(1, 2)(-9, undefined, undefined, (value) => value == 0, 'validator: 결과 값은 0이 아니어야 합니다.'))

  // asyncMul resolveFunc 사용 (validator, interceptor)
  console.log('예제 2-25:', await resolveFunc(asyncMul)(1, 2)(-9, undefined, (a, b) => console.log(`interceptor: 원본 값은 ${a}, ${b} 입니다.`), (value) => value == 0, 'validator: 결과 값은 0이 아니어야 합니다.')) // resolve 의 Compose 타입순서대로 인자 순서임

  // asPromise를 사용한 callbackAdd 함수의 Promise화된 비동기 처리
  console.log('예제 2-30:', await asPromise(callbackAdd)(3, 4)) // callback지옥을 탈출하기위함 예전의 방식을 promise로 만들어주는 함수
})()

// resolveFunc, resolve, asPromise가 가장 많이 사용할 패턴임