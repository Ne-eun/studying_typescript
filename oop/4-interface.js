{
    // CoffeeMachine은 CoffeeMaker, CommercialCoffeeMaker안의 인터페이스가 모두 있어야 한다.
    var CoffeeMachine_1 = /** @class */ (function () {
        function CoffeeMachine(beans) {
            this.coffeeBeans = 0;
            this.coffeeBeans = beans;
        }
        CoffeeMachine.makeMachine = function (coffeeBeans) {
            return new CoffeeMachine(coffeeBeans);
        };
        CoffeeMachine.prototype.fillCoffeeBeans = function (beans) {
            if (beans < 0)
                throw new Error("콩의 갯수는 0보다 커야 합니다.");
            console.log("콩 채우는 중 😛");
            this.coffeeBeans += beans;
        };
        CoffeeMachine.prototype.grindingBeans = function (shots) {
            if (this.coffeeBeans < CoffeeMachine.BEANS_GRAM_PER_SHOT * shots)
                throw new Error("not enough coffee beans ");
            console.log("커피 콩 가는 중...");
            this.coffeeBeans -= shots * CoffeeMachine.BEANS_GRAM_PER_SHOT;
        };
        CoffeeMachine.prototype.clean = function () {
            console.log("기계 청소 중 😎");
        };
        CoffeeMachine.prototype.makeCoffee = function (shots) {
            this.grindingBeans(shots);
            this.clean();
            return {
                shots: shots,
                beans: this.coffeeBeans,
                hasMilk: false
            };
        };
        CoffeeMachine.BEANS_GRAM_PER_SHOT = 7;
        return CoffeeMachine;
    }());
    var Ama = /** @class */ (function () {
        function Ama(machine) {
            this.machine = machine;
        }
        Ama.prototype.makeCoffee = function () {
            var coffee = this.machine.makeCoffee(2);
            console.log(coffee);
        };
        return Ama;
    }());
    var Pro = /** @class */ (function () {
        function Pro(machine) {
            this.machine = machine;
        }
        Pro.prototype.makeCoffee = function () {
            this.machine.fillCoffeeBeans(20);
            var coffee = this.machine.makeCoffee(2);
            console.log(coffee);
        };
        return Pro;
    }());
    var maker = CoffeeMachine_1.makeMachine(40);
    var ama = new Ama(maker);
    var pro = new Pro(maker);
    ama.makeCoffee();
    pro.makeCoffee();
}
