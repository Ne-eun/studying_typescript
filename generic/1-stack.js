{
    var StackImpl = /** @class */ (function () {
        function StackImpl() {
            this._size = 0;
        }
        Object.defineProperty(StackImpl.prototype, "size", {
            get: function () {
                return this._size;
            },
            enumerable: false,
            configurable: true
        });
        StackImpl.prototype.push = function (value) {
            var node = { value: value, next: this.head.next };
            this.head = node;
            this._size++;
        };
        StackImpl.prototype.pop = function () {
            // head == null은 null/undefined까지 포함
            if (this.head == null)
                throw new Error("값이 없습니당~~~");
            var node = this.head;
            this.head = node.next;
            this._size--;
            return node.value;
        };
        return StackImpl;
    }());
    var stack = new StackImpl();
    stack.push("내은 1");
    stack.push("내은 2");
    stack.push("내은 3");
    while (stack.size !== 0) {
        console.log(stack.pop());
    }
}
