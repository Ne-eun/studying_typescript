{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  // static 전역으로 사용할 값
  // puplic 공개적 설정
  // private 외부에서 볼 수도없고, 접근도 할 수 없음
  // protected 상속할 때 외부에서는 접근 할 수없지만 자식클래스에서는 접근가능

  class CoffeeMaker {
    static BEANS_GRAM_PER_SHOT = 7;
    coffeeBeans = 0;

    // 외부에서 직접 설정하지 못하고 내장함수를 사용해서 업데이트 하도록 private설정
    private constructor(beans: number) {
      this.coffeeBeans = beans;
    }

    // 바로 클래스에 접근해서 함수 실행 가능
    static coffeeMaker(beans: number): CoffeeMaker {
      return new CoffeeMaker(beans);
    }

    //encapsulation: 제한된 환경에서만 함수를 사용할 수 있도록 내부에 함수를 지정하고
    // 원하지 않는 행동은 제약을 걸어준다.
    // ex: beans의 갯수를 음수로 지정할 수 없게 한다.
    // 만약 이렇게 조건을 걸지 않으면 음수로 할당하여 예상치 못한 에러를 만들어 낼 수 있기 때문
    fillCoffeeBeans(beans: number) {
      if (beans < 0) throw new Error("콩의 갯수는 0보다 커야 합니다.");
      this.coffeeBeans += beans;
    }

    makeCoffee(shots: number): CoffeeCup {
      if (this.coffeeBeans < CoffeeMaker.BEANS_GRAM_PER_SHOT * shots)
        throw new Error("not enough coffee beans ");
      this.coffeeBeans -= shots * CoffeeMaker.BEANS_GRAM_PER_SHOT;
      return {
        shots,
        hasMilk: false,
      };
    }
  }
}
