describe ('Funcional Arithmetic', function () {
    describe ('numeric operations', function () {
        beforeEach(function () {
            this.numbers = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
        });

        it('should have all numeric functions defined', function () {
            this.numbers.forEach(function (name) {
                assert.isDefined(FunctionalArithmetic[name], name + ' should be defined');
                assert.isFunction(FunctionalArithmetic[name], name + ' should be a function');
            });
        });

        it('should return its own value when no argument is passed', function () {
            this.numbers.forEach(function (name, val) {
                assert.equal(FunctionalArithmetic[name](), val, name + ' should return ' + val + ' when no argument is passed');
            });
        });

        it('should return the result of the function passed', function () {
            var spy = sinon.spy(function (n) {
                return { val: n };
            });

            this.numbers.forEach(function (name, val) {
                var res = FunctionalArithmetic[name](spy);
                assert.isTrue(spy.calledWith(val), 'callback should be executed with numeric value');
                assert.equal(res.val, val, 'returned value should match');
            });
        });
    });

    describe ('arithmetic operations', function () {
        beforeEach(function () {
            this.operations = ['plus', 'minus', 'times', 'dividedby'];
        });

        it ('should have all basic operations defined', function () {
            this.operations.forEach(function (name) {
                assert.isDefined(FunctionalArithmetic[name], name + ' should be defined');
                assert.isFunction(FunctionalArithmetic[name], name + ' should be a function');
                assert.isFunction(FunctionalArithmetic[name](0), name + ' should return a function');
            });
        });

        it ('should operate as expected', function () {
            var a = FunctionalArithmetic;
            assert.equal(a.plus(2)(1), 3, '1 + 2 should equal 3');
            assert.equal(a.plus(1)(2), 3, '2 + 1 should equal 3');
            assert.equal(a.minus(2)(5), 3, '5 - 2 should equal 3');
            assert.equal(a.minus(5)(2), -3, '2 - 5 should equal -3');
            assert.equal(a.times(2)(1), 2, '1 * 2 should equal 2');
            assert.equal(a.times(5)(3), 15, '3 * 5 should equal 15');
            assert.equal(a.dividedby(1)(5), 5, '5 / 1 should equal 5');
            assert.equal(a.dividedby(3)(15), 5, '15 / 3 should equal 5');
            assert.equal(a.dividedby(0)(3), Infinity, 'divide by zero should be Infinity');
        });
    });

    describe ('full functional tests', function () {
        it ('should accurately perform basic arithmetic', function () {
            var a = FunctionalArithmetic;
            // Add
            assert.equal(a.one(a.plus(a.two())), 1+2, 'one(plus(two())) should equal 3');
            assert.equal(a.two(a.plus(a.one())), 2+1, 'two(plus(one())) should equal 3');

            // Subtract
            assert.equal(a.one(a.minus(a.two())), 1-2, 'one(minus(two())) should equal -1');
            assert.equal(a.five(a.minus(a.three())), 5-3, 'five(minus(three())) should equal 2');

            // Multiply
            assert.equal(a.one(a.times(a.two())), 1*2, 'one(times(two())) should equal 2');
            assert.equal(a.three(a.times(a.five())), 3*5, 'three(times(five())) should equal 15');

            // Divide
            assert.equal(a.five(a.dividedby(a.one())), 5/1, 'five(dividedby(one())) should equal 5');
            assert.equal(a.nine(a.dividedby(a.three())), 9/3, 'nine(dividedby(three())) should equal 3');
            assert.equal(a.two(a.dividedby(a.zero())), 2/0, 'two(dividedby(zero())) should equal Infinity');
        });
    });
});