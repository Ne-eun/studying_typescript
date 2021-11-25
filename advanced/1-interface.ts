{
  /*interface와 type의 차이 */
  // interface는 구현제의 규격사항을 정의한다.
  // 해당 class/function은 인터페이스에 정의된 내용을 모두 구현해야한다.
  // interface가 있다면 이를 기반으로 작성된 class/function이 있다.

  // type은 데이터의 타입을 정의할 때 사용한다.

  type PositionType = {
    x: number
    y: number
  }
  interface PositionInterface {
    x: number
    y: number
  }

  // object ★ interface,type 둘다 구현 가능
  const obj1: PositionType = {
    x: 1,
    y: 1,
  }
  const obj2: PositionInterface = {
    x: 1,
    y: 1,
    z: 1,
  }

  // class ★ interface,type 둘다 구현 가능
  class Pos1 implements PositionType {
    x: number
    y: number
  }
  class Pos2 implements PositionInterface {
    x: number
    y: number
    z: number
  }

  // Extends interface,type 둘다 구현 가능
  // interface는 확장을 이용해서 만듬
  interface ZPositionInterface extends PositionInterface {
    z: number
  }
  // type는 &연산자로 만들 수 있음
  type ZPositionType = PositionType & { z: number }

  // 😆 only interfaces can be merged.
  // 위에 선언한 PositionInterface + 지금 선언한 PositionInterface를 모두 구현해야함
  interface PositionInterface {
    z: number
  }

  // 😆 Type aliases can use computed properties
  type Person = {
    name: string
    age: number
  }
  type Name = Person["name"] // string

  type NumberType = number
  type Direction = "left" | "right"
}
