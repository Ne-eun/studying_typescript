{
  /**
   * 타입을 보면 이 함수가 어떠한 값을 필요로 하는지와 함수가 완료됬을 때 어떠한 결과가 나오는지 예상이 가능하다.
   */

  // JavaScript 💩
  function jsAdd(num1, num2) {
    return num1 + num2
  }

  // TypeScript ✨
  function add(num1: number, num2: number): number {
    return num1 + num2
  }

  // JavaScript 💩
  function jsFetchNum(id) {
    // code ...
    // code ...
    // code ...
    return new Promise((resolve, reject) => {
      resolve(100)
    })
  }

  // TypeScript ✨
  function fetchNum(id: string): Promise<number> {
    // code ...
    // code ...
    // code ...
    return new Promise((resolve, reject) => {
      resolve(100)
    })
  }

  // JavaScript ✨ => TypeScript
  // Optional parameter
  // 해당 위치에 인자값에 아무런 값을 넣지 않아도 사용이 가능하다.

  function printName(firstName: string, lastName?: string) {
    console.log(firstName)
    console.log(lastName) // undefined
  }
  printName("Steve", "Jobs")
  printName("Ellie")
  printName("Anna")

  // Optional parameter는 값을 입력하지 않아도 되지만 아래의 함수는 꼭 undefined나 string의 인자를 입력해야 한다. 💩
  function XprintName(firstName: string, lastName: string | undefined) {
    console.log(firstName)
    console.log(lastName)
  }
  XprintName("steve", undefined)

  // Default parameter
  // 인자 값을 전달하지 않으면 기본 값으로 함수가 동작한다.
  function printMessage(message: string = "default message") {
    console.log(message)
  }
  printMessage()

  // Rest parameter
  // 타입이 같은 인자를 여러개 받을 수 있고, 이를 []로 변경하여 사용할 수 있음
  function addNumbers(...numbers: number[]): number {
    return numbers.reduce((a, b) => a + b)
  }
  console.log(addNumbers(1, 2))
  console.log(addNumbers(1, 2, 3, 4))
  console.log(addNumbers(1, 2, 3, 4, 5, 0))
}
