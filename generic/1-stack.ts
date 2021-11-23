{
  interface Stack {
    readonly size: number;
    push(value: string): void;
    pop(): string;
  }

  type StackNode = {
    value: string;
    next?: StackNode;
  };

  class StackImpl implements Stack {
    private _size: number = 0;
    private head: StackNode;

    get size() {
      return this._size;
    }
    push(value: string) {
      const node: StackNode = { value, next: this.head.next };
      this.head = node;
      this._size++;
    }

    pop() {
      // head == null은 null/undefined까지 포함
      if (this.head == null) throw new Error("값이 없습니당~~~");
      const node: StackNode = this.head;
      this.head = node.next;
      this._size--;
      return node.value;
    }
  }

  const stack = new StackImpl();
  stack.push("내은 1");
  stack.push("내은 2");
  stack.push("내은 3");

  while (stack.size !== 0) {
    console.log(stack.pop());
  }
}
