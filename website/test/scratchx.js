(function () {
  'use strict';

  const ext = {};

  ext._getStatus = () => ({
    status: 2,
    msg: 'Ready'
  });

  ext.testReporter = () => Math.random();

  ext.testReporterWait = (delay, callback) => {
    setTimeout(() => {
      callback(Math.random());
    }, delay * 1000);
  };

  var descriptor = {
    blocks: [
      ['r', 'test reporter', 'testReporter'],
      ['R', 'test reporter 2 %n', 'testReporterWait', '1'],
    ],
  };

  ScratchExtensions.register('ScratchX Test', descriptor, ext);
}());
