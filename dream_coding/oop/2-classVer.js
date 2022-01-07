{
    var CoffeeMaker_1 = /** @class */ (function () {
        function CoffeeMaker(beans) {
            this.coffeeBeans = 0;
            this.coffeeBeans = beans;
        }
        // 바로 클래스에 접근해서 함수 실행 가능
        CoffeeMaker.coffeeMaker = function (beans) {
            return new CoffeeMaker(beans);
        };
        CoffeeMaker.prototype.makeCoffee = function (shots) {
            if (this.coffeeBeans < CoffeeMaker.BEANS_GRAM_PER_SHOT * shots)
                throw new Error("not enough coffee beans ");
            this.coffeeBeans -= shots * CoffeeMaker.BEANS_GRAM_PER_SHOT;
            return {
                shots: shots,
                hasMilk: false
            };
        };
        CoffeeMaker.BEANS_GRAM_PER_SHOT = 7; //전역으로 사용할 변수
        return CoffeeMaker;
    }());
    var coffee = new CoffeeMaker_1(30);
    coffee.makeCoffee(2);
    console.log("coffee", coffee);
    var coffee2 = new CoffeeMaker_1(40);
    coffee2.makeCoffee(3);
    console.log("coffee2", coffee2);
    var coffee3 = CoffeeMaker_1.coffeeMaker(24);
    console.log("coffee3", coffee3);
}
