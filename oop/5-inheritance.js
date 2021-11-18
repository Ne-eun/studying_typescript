var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
{
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
            return {
                shots: shots,
                beans: this.coffeeBeans,
                hasMilk: false
            };
        };
        CoffeeMachine.BEANS_GRAM_PER_SHOT = 7;
        return CoffeeMachine;
    }());
    // class를 상속받아서 새로운 class를 생성 할 수 있음
    // 생성자가 private인 경우에는 상속할 수 없음
    var LatteCoffeeMachine = /** @class */ (function (_super) {
        __extends(LatteCoffeeMachine, _super);
        function LatteCoffeeMachine(beans, serialNumber) {
            var _this = _super.call(this, beans) || this;
            _this.serialNumber = serialNumber;
            return _this;
        }
        LatteCoffeeMachine.prototype.steamingMilk = function () {
            console.log("우유 가열 중 ... 🤗");
        };
        LatteCoffeeMachine.prototype.makeCoffee = function (shots) {
            // 부모 클래스의 함수를 실행할때는 super를 사용함
            var coffee = _super.prototype.makeCoffee.call(this, shots);
            this.steamingMilk();
            //this로도 부모의 함수에 접근이 가능함..?
            this.clean();
            return __assign(__assign({}, coffee), { hasMilk: true });
        };
        return LatteCoffeeMachine;
    }(CoffeeMachine_1));
    var coffee = new CoffeeMachine_1(23).makeCoffee(2);
    var latteMachine = new LatteCoffeeMachine(30, "aa-2");
    var latteCoffee = latteMachine.makeCoffee(2);
    console.log("coffee", coffee);
    console.log("latte", latteCoffee);
    console.log("serial", latteMachine.serialNumber);
}
