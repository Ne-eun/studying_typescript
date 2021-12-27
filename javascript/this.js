/*
  다른 언어에서 this는 생성된 오브젝트 자기 자신을 가르킨다.
  자바스크립트에서의 this는 호출한 문맥에 따라 this가 변경된다.

  function으로 선언한 함수는 window객체에 등록이 되고 window에서 접근이 가능하다. (window는 생략 가능)
  const나 let으로 선언한 변수는 windwo객체에 등록되지 않는다
  var로 선언햔 변수는 window객체에 등록된다.
*/
console.log(this); //window

function simpleFunc() {
  console.log(this); 
}
window.simpleFunc(); // window에서 호출했기 떄문에 this는 window를 가르킨다.

console.clear();
class Counter {
  count = 0;
  increase = () => {
    console.log(this);
  };
}
const counter = new Counter();
counter.increase(); // Counter에서 호출 했기 때문 increase안에 있는 this는 Counter를 가르킨다. 
const caller = counter.increase; // this는 undefined : this의 정보를 caller에 할당하면서 this의 정보를 잃어버린다.

const callerBind = counter.increase.bind(counter); // Counter의 this를 직접 할당 할 수 있음 여기서의 this는 Counter를 가르킨다.
// 만약 Arrow함수로 구현되었다면 bind를 해주지 않아도 된다.
caller();

class Bob {}
const bob = new Bob();
bob.run = counter.increase; 
bob.run(); // increase안의 this는 bob을 가르킨다.
// 호출의 주체가 bob안에 있는 run이기 때문이다.
