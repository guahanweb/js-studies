var Base = require('./base');
var cursor = Base.cursor;
var color = Base.color;

exports = module.exports = BlanketReporter;

function BlanketReporter(runner) {
    Base.call(this, runner);

    runner.on('start', function () {
        blanket.setupCoverage();
    });

    runner.on('end', function () {
        blanket.onTestsDone();
    });

    runner.on('suite', function () {
        blanket.onModuleStart();
    });

    runner.on('test', function () {
        blanket.onTestStart();
    });

    runner.on('test end', function (test) {
        blanket.onTestDone(test.parent.tests.length, test.state === 'passed');
    });
}