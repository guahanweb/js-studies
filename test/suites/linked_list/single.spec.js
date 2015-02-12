describe('LinkedList', function () {
    describe('Instantiation and additive behavior', function () {
        beforeEach(function () {
            this.ll = new LinkedList.single();
        });

        it ('should have a LinkedList defined', function () {
            assert.equal(typeof this.ll, 'object', 'not an object');
            assert.equal(typeof this.ll.length, 'number');
            assert.equal(typeof this.ll.add, 'function');
            assert.equal(this.ll.length, 0);
            assert.equal(this.ll.head, null);
        });

        it ('should be able to add nodes', function () {
            this.ll.add(1);
            this.ll.add(2);
            this.ll.add(3);

            assert.equal(typeof this.ll.head, 'object');
            assert.equal(this.ll.head.value, 1);
            assert.equal(this.ll.head.next.value, 2);
            assert.equal(this.ll.head.next.next.value, 3);
            assert.equal(this.ll.head.next.next.next, null);
        });
    });

    describe('Removing nodes', function () {
        beforeEach(function () {
            this.ll = new LinkedList.single();
            this.ll.add('what');
            this.ll.add('is');
            this.ll.add('your');
        });

        it ('should remove the first element', function () {
            this.ll.remove('what');

            assert.equal(this.ll.length, 2);
            assert.equal(this.ll.head.value, 'is');
            assert.equal(this.ll.head.next.value, 'your');
        });

        it ('should remove the last element', function () {
            this.ll.remove('your');

            assert.equal(this.ll.length, 2);
            assert.equal(this.ll.head.value, 'what');
            assert.equal(this.ll.head.next.value, 'is');
            assert.equal(this.ll.head.next.next, null);
        });

        it ('should remove middle elements', function () {
            this.ll.remove('is');

            assert.equal(this.ll.length, 2);
            assert.equal(this.ll.head.value, 'what');
            assert.equal(this.ll.head.next.value, 'your');
            assert.equal(this.ll.head.next.next, null);
        });

        it ('should be programmatically navigable', function () {
            this.ll.remove('is');
            this.ll.add('name?');

            var pieces = [];
            var current = this.ll.head;
            while (current) {
                pieces.push(current.value);
                current = current.next;
            }

            assert.equal(this.ll.length, 3);
            assert.equal(pieces.join(' '), 'what your name?');
        });
    });
});