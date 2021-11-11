{
  // Array
  const fruits: string[] = ["🍅", "🍌"]
  const scroes: Array<number> = [1, 3, 4]
  function printArray(fruits: readonly string[]) {} // readonly랑 함께사용이 가능한건 string[]방식의 타입만 가능

  // Tuple -> interface, type alias, class
  // 튜플 타입의 가장 좋은 예는 react의 useState이다.
  // 가능하면 object로 지정해야 데이터를 가시적으로 표현할 수 있다.
  let student: [string, number]
  student = ["name", 123]
  student[0] // name 해당 위치에 어떠한 데이터가 있는지는 실행문이나 선언부를 확인해야하는 단점이 있다.
  student[1] // 123
  const [name, age] = student
}
