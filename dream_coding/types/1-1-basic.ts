{
  /**
   * JavaScript
   * Primitive: number, string, boolean, bigint, symbol, null, undefined
   * Object: function, array.....
   */

  // number
  const num: number = -6

  // string
  const str: string = "hello"

  // boolean
  const boal: boolean = false

  // undefined
  let name: undefined // 💩
  let age: number | undefined
  age = undefined
  age = 1
  function find(): number | undefined {
    return undefined
  }

  // null
  let person: null // 💩
  let person2: string | null

  // unknown 💩
  // 어떤 타입이 올지 예상할 수 없을 때 사용한다.
  // 가능하면 사용하지 않는 것을 추천
  let notSure: unknown = 0
  notSure = "he"
  notSure = true

  // any 💩
  let anything: any = 0
  anything = "hello"

  // void
  // 함수를 실행하고 리턴값이 없을 때 사용하는 타입
  function print(): void {
    console.log("hello")
    return
  }
  let unusable: void = undefined // 💩

  // never
  // error가 발생하거나, 무한 루프를 도는 함수일경우 아무런것도 리턴하지 않을 때 사용하는 타입
  function throwError(message: string): never {
    // message -> server (log)
    throw new Error(message)
    while (true) {}
  }
  let neverEnding: never // 💩

  // objet
  let obj: object // 💩
  function acceptSomeObject(obj: object) {}
  acceptSomeObject({ name: "ellie" })
  acceptSomeObject({ animal: "dog" })
}
