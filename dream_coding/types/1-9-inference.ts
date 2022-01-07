/**
 * Type Inference
 * typescirpt가 타입을 자동으로 추론 해주긴 하지만
 * 가능하면 명확하게 입력해주는 걸 추천
 */
let text = "hello";
function print(message = "hello") {
  console.log(message);
}
print("hello");

function add(x: number, y: number): number {
  return x + y;
}
const result = add(1, 2);
