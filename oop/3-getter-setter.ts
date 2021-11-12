{
  class UserWrongEx {
    firstName: string;
    lastName: string;
    fullName: string;

    constructor(firstName: string, lastName: string) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.fullName = `${this.firstName} ${this.lastName}`;
    }
  }
  const user = new UserWrongEx("Tera", "Park");
  console.log(user.fullName); // "Tera Park"
  user.firstName = "내은";
  // 한번 할당된 fullName은 새로 할당 되지 않는다. 새로 계산되도록 만들려면 get을 사용한다.
  console.log(user.fullName); // "Tera Park" 이전에 할당 된 값을 출력한다.

  class User {
    private internalAge = 7;
    // 생성자에 접근제어 자를 설정하면 바로 멤버 번수로 설정이 된다.
    // 위의 함수에 작성된 불필요한 코드를 없앨 수 있음
    constructor(private firstName: string, private lastName: string) {}

    // 외부에서 사용할 때는 함수처럼 사용하지 않고 변수처럼 사용한다.
    // ex: user.fullName
    // 할당 된 값을 새로 계산 해야할 때 get을 사용
    get fullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }

    get age(): number {
      return this.internalAge;
    }

    // 새로 값을 할당 할 때는 set을 사용
    set age(num: number) {
      if (num < 0) throw new Error("음수는 나이로 설정 할 수 없습니다.");
      this.internalAge = num;
    }

    //getter와 setter를 사용하면 외부에서 내부값을 변경할 때 유효성 체크에 유리함
  }
}
