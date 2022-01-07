{
  type CoffeeCup = {
    shots: number;
    beans: number;
    hasMilk?: boolean;
  };

  interface CoffeeMaker {
    makeCoffee(shots: number): CoffeeCup;
  }

  // abstract는 추상화 클래스로 클래스를 선언만 하고, 구현체는 만들 수 없음
  // 자식에서 추상화클래스를 기본으로 작성해서 사용해야한다.
  abstract class CoffeeMachine implements CoffeeMaker {
    private static BEANS_GRAM_PER_SHOT = 7;
    private coffeeBeans = 0;

    constructor(beans: number) {
      this.coffeeBeans = beans;
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

    //extra함수를 자식클래스에서 필수로 구현해야한다.
    protected abstract extra(shots: number): CoffeeCup;

    makeCoffee(shots: number): CoffeeCup {
      this.grindingBeans(shots);

      return {
        shots,
        beans: this.coffeeBeans,
        hasMilk: false,
      };
    }
  }

  class MilkSteamer {
    private steamingMilk() {
      console.log("우유 데우는 중~~ 😍");
      return true;
    }

    addMilk() {
      const milk = this.steamingMilk();
      return milk;
    }
  }

  //부모의 클래스를 기반으로 우유를 추가하는 클래스를 만듬
  // milk부분은 어떠한 우유가 올 수 있도록 확장성 있게 만들어주는 것이 좋음
  // 차가운우유, 초코우유 등등 여러가지 우유가 올 수 있음
  class CoffeeLatteMachine extends CoffeeMachine {
    constructor(private beans: number, private milk: boolean) {
      super(beans);
    }

    extra(shots: number): CoffeeCup {
      const coffee = super.makeCoffee(shots);
      return {
        ...coffee,
        hasMilk: this.milk,
      };
    }
  }

  //abstract로 구현한 클래스는 객체로 만들 수 없음
  const steamMilk = new MilkSteamer().addMilk();
  const latte = new CoffeeLatteMachine(30, steamMilk).makeCoffee(2);
  console.log(latte);
}
