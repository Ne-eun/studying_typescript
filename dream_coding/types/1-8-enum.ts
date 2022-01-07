{
  /**
   * Enum
   * 시작하는 값이 number이면 순차적으로 1씩 늘어나고, string으로 지정할 경우 모두 type을 지정해 주어야 한다.
   * 다른 언어에서는 유용하게 사용하지만, typesciprt에서는 union타입으로 대부분 대체가 가능하다.
   * 가능 하면 union타입으로 사용하고, 다른 디바이스에 전송해야하는 json경우에서만 주로 사용한다.
   * enum을 union으로 대체해서 사용하는 이유는 다른 값을 할당 할 수 있음 (*1-1)
   */
  // JavaScript
  const MAX_NUM = 6;
  const MAX_STUDENTS_PER_CLASS = 10;
  const MONDAY = 0;
  const TUESDAY = 1;
  const WEDNESDAY = 2;
  const DAYS_ENUM = Object.freeze({ MONDAY: 0, TUESDAY: 1, WEDNESDAY: 2 });
  const dayOfToday = DAYS_ENUM.MONDAY;

  // TypeScript
  type DaysOfWeek = "Monday" | "Tuesday" | "Wednesday";
  enum Days {
    Monday,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday,
  }
  console.log(Days.Monday);
  let day: Days = Days.Saturday;
  day = Days.Tuesday;
  day = 10; //*1-1 day는 days의 타입만 가져야 한다고 선언했지만 다른 값을 넣을 수 있음
  console.log(day);

  let dayOfweek: DaysOfWeek = "Monday";
  dayOfweek = "Wednesday";
}
