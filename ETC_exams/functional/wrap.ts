export const wrap = <T extends (...args: any[]) => any, U>(param: T | U) => {
  const result = <T>param //T로 가정하고 param을 result에 넣음

  if (typeof result === 'function') { //result가 함수인가? 확인
    if (result[Symbol.toStringTag] === 'AsyncFunction') return result //[Symbol.toStringTag] 디테일한 함수를 확인 할 수 있음
    return async (...a: Parameters<typeof result>) => result(...a) // 비동기가 아니라면 async를 달아준다 ...a는 result가 가지고있는 파라미터의 타입이다.
  }

  return async () => param
}

//aspromise랑 함께써야 활용도가 좋다.
// try, catch를 비동기로 통합시키기 위해서 해당 함수를 사용한다.
// 동일한 에러처리를 하기위해 ?