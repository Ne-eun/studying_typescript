{
  type ToDo = {
    title: string
    description: string
  }

  // Readonly는 타입스크립트에만 있음
  // javascript는 없음
  function display(todo: Readonly<ToDo>) {
    // todo.title = 'jaja';
  }
}
