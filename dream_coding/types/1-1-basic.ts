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
  let name: undefined // π©
  let age: number | undefined
  age = undefined
  age = 1
  function find(): number | undefined {
    return undefined
  }

  // null
  let person: null // π©
  let person2: string | null

  // unknown π©
  // μ΄λ€ νμμ΄ μ¬μ§ μμν  μ μμ λ μ¬μ©νλ€.
  // κ°λ₯νλ©΄ μ¬μ©νμ§ μλ κ²μ μΆμ²
  let notSure: unknown = 0
  notSure = "he"
  notSure = true

  // any π©
  let anything: any = 0
  anything = "hello"

  // void
  // ν¨μλ₯Ό μ€ννκ³  λ¦¬ν΄κ°μ΄ μμ λ μ¬μ©νλ νμ
  function print(): void {
    console.log("hello")
    return
  }
  let unusable: void = undefined // π©

  // never
  // errorκ° λ°μνκ±°λ, λ¬΄ν λ£¨νλ₯Ό λλ ν¨μμΌκ²½μ° μλ¬΄λ°κ²λ λ¦¬ν΄νμ§ μμ λ μ¬μ©νλ νμ
  function throwError(message: string): never {
    // message -> server (log)
    throw new Error(message)
    while (true) {}
  }
  let neverEnding: never // π©

  // objet
  let obj: object // π©
  function acceptSomeObject(obj: object) {}
  acceptSomeObject({ name: "ellie" })
  acceptSomeObject({ animal: "dog" })
}
