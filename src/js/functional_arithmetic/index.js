var FunctionalArithmetic = FunctionalArithmetic || {};
(function (scope) {
    // Create all our numeric methods
    ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'].forEach(function (name, val) {
        scope[name] = function (op) {
            return (typeof op === 'undefined') ? val : op(val);
        };
    });

    var operations = {
        plus: function (x, y) { return x + y; },
        minus: function (x, y) { return x - y; },
        times: function (x, y) { return x * y; },
        dividedby: function (x, y) { return x / y; }
    };

    Object.keys(operations).forEach(function (op) {
        FunctionalArithmetic[op] = function (y) {
            return function (x) {
                return operations[op](x, y);
            };
        };
    });
})(FunctionalArithmetic);