{
  type Video = {
    title: string
    author: string
  }
  // [1, 2].map(item => item * item); // [1, 4]
  // for문/map처럼 루프를 돌면서 타입의 속성을 바꿀 수 있음

  //만들어진 타입을 readonly로 변경함
  type Optional<T> = {
    [P in keyof T]?: T[P] // for...in
  }
  type VideoOptional = Optional<Video>


  // 만들어놓은 타입을 readonly로 바꾸는 타입
  type ReadOnly<T> = {
    readonly [P in keyof T]: T[P]
  }
  const video: ReadOnly<Video> = {
    title: "hi",
    author: "ellie",
  }


  type Animal = {
    name: string
    age: number
  }
  const animal: Optional<Animal> = {
    name: "dog",
  }
  animal.name = "ellie"



  type Nullable<T> = { [P in keyof T]: T[P] | null }
  const obj2: Nullable<Video> = {
    title: "hi",
    author: null,
  }

  type Proxy<T> = {
    get(): T
    set(value: T): void
  }

  type Proxify<T> = {
    [P in keyof T]: Proxy<T[P]>
  }
}
