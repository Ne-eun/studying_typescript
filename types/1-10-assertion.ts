{
  /**
   * Type Assertions 💩
   * optional과 반되대는 !임
   * 타입이 union이지만 값의 타입을 확신 할 수 있는 경우에 사용한다.
   */
  function jsStrFunc(): any {
    return 2;
  }
  const result = jsStrFunc();
  console.log((result as string).length);
  console.log((<string>result).length);

  const wrong: any = 5;
  console.log((wrong as Array<number>).push(1)); // 😱

  function findNumbers(): number[] | undefined {
    return undefined;
  }
  const numbers = findNumbers()!;
  numbers.push(2); // 😱 이런경우 에러를 던지로 죽어버림

  const button = document.querySelector("class")!;
}
