(function (scope) {
    'use strict';

    function LinkedList() {
        this.head = null;
        this.length = 0;
    }

    LinkedList.prototype.add = function (val) {
        var node = {
            value: val,
            next: null
        };

        if (!this.head) {
            this.head = node;
        } else {
            var current = this.head;
            while (current.next) {
                current = current.next;
            }
            current.next = node;
        }

        ++this.length;
    };

    LinkedList.prototype.remove = function (val) {
        var current = this.head;

        if (current.value == val) {
            // Removing the head element
            this.head = (current.next) ? current.next : null;
            --this.length;
            return;
        }

        while (current.next) {
            if (current.next.value == val) {
                current.next = (current.next.next) ? current.next.next : null;
                --this.length;
                return;
            }
            current = current.next;
        }
    };

    scope.LinkedList = LinkedList;
})(window);