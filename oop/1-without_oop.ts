{
  type CoffeeCup = {
    shots: number;
    hasMilk: boolean;
  };

  const BEANS_GRAM_PER_SHOT = 7;
  let coffeeBeans = 0;

  function makeCoffee(shots: number): CoffeeCup {
    if (coffeeBeans < BEANS_GRAM_PER_SHOT * shots)
      throw new Error("not enough coffee beans ");
    coffeeBeans -= shots * BEANS_GRAM_PER_SHOT;
    return {
      shots,
      hasMilk: false,
    };
  }
  coffeeBeans += 30;
  makeCoffee(2);
}
