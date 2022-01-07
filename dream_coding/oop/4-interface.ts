{
  type CoffeeCup = {
    shots: number;
    beans: number;
    hasMilk: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  interface CommercialCoffeeMaker {
    fillCoffeeBeans(beans: number): void;
    clean(): void;
    makeCoffee(shots): CoffeeCup;
  }

  // implements 인터페이스
  // CoffeeMachine은 CoffeeMaker, CommercialCoffeeMaker안의 내용을 다 구현해야한다.
  class CoffeeMachine implements CoffeeMaker, CommercialCoffeeMaker {
    private static BEANS_GRAM_PER_SHOT = 7;
    private coffeeBeans = 0;

    private constructor(beans: number) {
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
    clean() {
      console.log("기계 청소 중 😎");
    }

    makeCoffee(shots: number): CoffeeCup {
      this.grindingBeans(shots);
      this.clean();

      return {
        shots,
        beans: this.coffeeBeans,
        hasMilk: false,
      };
    }
  }

  // 같은 machine을 받아서 사용하지만, interface에 허락된 함수만 class안에서 사용이 가능하다.
  class Ama {
    constructor(private machine: CoffeeMaker) {}
    makeCoffee() {
      // machine안에 fillCoffeeBeans함수가 있지만 interface에 없기때문에 사용할 수 없음
      const coffee = this.machine.makeCoffee(2);
      console.log(coffee);
    }
  }

  class Pro {
    constructor(private machine: CommercialCoffeeMaker) {}
    makeCoffee() {
      this.machine.fillCoffeeBeans(20);
      const coffee = this.machine.makeCoffee(2);
      console.log(coffee);
    }
  }

  const maker: CoffeeMachine = CoffeeMachine.makeMachine(40);
  const ama = new Ama(maker);
  const pro = new Pro(maker);

  ama.makeCoffee();
  pro.makeCoffee();
}
