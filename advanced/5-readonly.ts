{
  type ToDo = {
    title: string;
    description: string;
  };

  // 값의 변경이 불가능함 오직 읽기만 가능함
  function display(todo: Readonly<ToDo>) {
    // todo.title = 'jaja';
  }
}
