{
  // Array
  const fruits: string[] = ["๐", "๐"]
  const scroes: Array<number> = [1, 3, 4]
  function printArray(fruits: readonly string[]) {} // readonly๋ ํจ๊ป์ฌ์ฉ์ด ๊ฐ๋ฅํ๊ฑด string[]๋ฐฉ์์ ํ์๋ง ๊ฐ๋ฅ

  // Tuple -> interface, type alias, class
  // ํํ ํ์์ ๊ฐ์ฅ ์ข์ ์๋ react์ useState์ด๋ค.
  // ๊ฐ๋ฅํ๋ฉด object๋ก ์ง์ ํด์ผ ๋ฐ์ดํฐ๋ฅผ ๊ฐ์์ ์ผ๋ก ํํํ  ์ ์๋ค.
  let student: [string, number]
  student = ["name", 123]
  student[0] // name ํด๋น ์์น์ ์ด๋ ํ ๋ฐ์ดํฐ๊ฐ ์๋์ง๋ ์คํ๋ฌธ์ด๋ ์ ์ธ๋ถ๋ฅผ ํ์ธํด์ผํ๋ ๋จ์ ์ด ์๋ค.
  student[1] // 123
  const [name, age] = student
}
