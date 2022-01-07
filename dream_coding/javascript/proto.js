/* 
  prototype은 객체지향프로그램에서 상속을 할 수 있게 해준다.
  재사용성을 높힐 수 있음
*/
const x = {};
const y = {};
// x, y 는 object라는 proto를 상속받았고,
console.log(x.toString()); // object안에있는 함수를 사용할 수 있음
console.log(x.__proto__ === y.__proto__);// x, y의 proto는 동일하다.

const array = [];
// array는 Array를 상속하고 Array는 object를 상속한다.
console.log(array);

function CoffeeMachine(beans) {
  this.beans = beans;
  // Instance member level 만들어진 오브젝트마다 있음
  /* this.makeCoffee = shots => {
    console.log('making... ☕️');
  }; */
}
// Prototype member level
// 초기에 선언해도 되고 아래처럼 함수를 만들 수 있음
CoffeeMachine.prototype.makeCoffee = shots => {
  console.log('making... ☕️');
};

// machinel은 CoffeeMachine을 상속하고 CoffeeMachine은 Object를 상속한다.
const machine1 = new CoffeeMachine(10);
// proto는 object
const machine2 = new CoffeeMachine(20);
console.log(machine1);
console.log(machine2);

function LatteMachine(milk) {
  this.milk = milk;
}

// LatteMachine의 prototype을 CoffeeMachine의 Prototype을 상속한다.
LatteMachine.prototype = Object.create(CoffeeMachine.prototype);
const latteMachine = new LatteMachine(123);
console.log(latteMachine);
latteMachine.makeCoffee(); // lateMachine에서도 makeCoffee함수를 사용할 수 있음

//위의 내용을 class방식으로 변경하면
class latteMachineClass extends CoffeeMachine {

}
// 이런식으로 간단히 사용 가능
