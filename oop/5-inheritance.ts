{
  type CoffeeCup = {
    shots: number;
    beans: number;
    hasMilk: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GRAM_PER_SHOT = 7;
    private coffeeBeans = 0;

    constructor(beans: number) {
      this.coffeeBeans = beans;
    }

    static makeMachine(coffeeBeans: number): CoffeeMachine {
      return new CoffeeMachine(coffeeBeans);
    }

    fillCoffeeBeans(beans: number) {
      if (beans < 0) throw new Error("콩의 갯수는 0보다 커야 합니다.");
      console.log("콩 채우는 중 😛");
      this.coffeeBeans += beans;
    }

    private grindingBeans(shots: number) {
      if (this.coffeeBeans < CoffeeMachine.BEANS_GRAM_PER_SHOT * shots)
        throw new Error("not enough coffee beans ");
      console.log("커피 콩 가는 중...");
      this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAM_PER_SHOT;
    }
    protected clean() {
      console.log("기계 청소 중 😎");
    }

    makeCoffee(shots: number): CoffeeCup {
      this.grindingBeans(shots);

      return {
        shots,
        beans: this.coffeeBeans,
        hasMilk: false,
      };
    }
  }

  // class를 상속받아서 새로운 class를 생성 할 수 있음
  // 생성자가 private인 경우에는 상속할 수 없음
  class LatteCoffeeMachine extends CoffeeMachine {
    // 생성자를 추가 하기 위해선 super()를 넣어주고 그안에 부모에서 필요한 인자를 전달해 줘야한다.
    constructor(beans: number, readonly serialNumber: string) {
      super(beans); // 부모에서 필요한 생성자를 전달해줌
    }
    steamingMilk() {
      console.log("우유 가열 중 ... 🤗");
    }

    // 부모의 interface를 동일하게 따라야한다.
    // 부모의 interface를 따라가기 때문에 상속한 모든 class는 같은 interface를 갖는다. (polymorphism)
    makeCoffee(shots: number): CoffeeCup {
      // 부모 클래스의 함수를 실행할때는 super를 사용함
      const coffee = super.makeCoffee(shots);
      this.steamingMilk();
      //this로도 부모의 함수에 접근이 가능함..?
      this.clean();
      return {
        //부모의 return값을 받아서 원하는 부분을 수정함
        ...coffee,
        hasMilk: true,
      };
    }
  }

  const coffee = new CoffeeMachine(23).makeCoffee(2);
  const latteMachine = new LatteCoffeeMachine(30, "aa-2");
  const latteCoffee = latteMachine.makeCoffee(2);

  console.log("coffee", coffee);
  console.log("latte", latteCoffee);
  console.log("serial", latteMachine.serialNumber);
}
