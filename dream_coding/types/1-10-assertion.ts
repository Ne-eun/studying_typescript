{
  /**
   * Type Assertions ๐ฉ
   * optional๊ณผ ๋ฐ๋๋๋ !์
   * ํ์์ด union์ด์ง๋ง ๊ฐ์ ํ์์ ํ์  ํ  ์ ์๋ ๊ฒฝ์ฐ์ ์ฌ์ฉํ๋ค.
   */
  function jsStrFunc(): any {
    return 2;
  }
  const result = jsStrFunc();
  console.log((result as string).length);
  console.log((<string>result).length);

  const wrong: any = 5;
  console.log((wrong as Array<number>).push(1)); // ๐ฑ

  function findNumbers(): number[] | undefined {
    return undefined;
  }
  const numbers = findNumbers()!;
  numbers.push(2); // ๐ฑ ์ด๋ฐ๊ฒฝ์ฐ ์๋ฌ๋ฅผ ๋์ง๋ก ์ฃฝ์ด๋ฒ๋ฆผ

  const button = document.querySelector("class")!;
}
