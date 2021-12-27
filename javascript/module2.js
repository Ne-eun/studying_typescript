import * as calculator from './module1';
// module1에서 export한 모듈을 calculator로 사용한다.
// html에서 js를 연결할 때는 type="module"로 설정해준다.
console.log(calculator.add(1, 2));
calculator.print();
calculator.number;
