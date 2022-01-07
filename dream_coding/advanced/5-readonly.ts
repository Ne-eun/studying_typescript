{
  type ToDo = {
    title: string
    description: string
  }

  // Readonly는 타입스크립트에만 있음
  // javascript는 없음
  // 값의 변경이 불가능함 오직 읽기만 가능함
  function display(todo: Readonly<ToDo>) {
    // todo.title = 'jaja';
  }
}
