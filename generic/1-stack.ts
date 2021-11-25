{
  interface Stack<T> {
    readonly size: number;
    push(value: T): void;
    pop(): T;
  }

  type StackNode<T> = {
    readonly value: T;
    readonly next?: StackNode<T>;
  };

  class StackImpl<T> implements Stack<T> {
    private _size: number = 0;
    private head?: StackNode<T>;

    constructor(private capacity: number) { }
    get size(): number {
      return this._size;
    }
    push(value: T): void {
      if (this.size === this.capacity) throw new Error("더이상은 안대여 🤢")
      const node: StackNode<T> = { value, next: this.head };
      this.head = node;
      this._size++;
    }

    pop(): T {
      // head == null은 null/undefined까지 포함
      // head !== undefined
      if (this.head == null) throw new Error("값이 없습니당~~~ 😑");
      const node = this.head;
      this.head = node.next;
      this._size--;
      return node.value;
    }
  }

  const stack = new StackImpl(10);
  stack.push("내은 1");
  stack.push(2);
  stack.push({ name: "sodms" });

  while (stack.size !== 0) {
    console.log(stack.pop());
  }
}
