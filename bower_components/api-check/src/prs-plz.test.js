/*
 * Want to help develop apiCheck.js? Make a pull request that:
 *  1. moves one of the it statements out of this file to where it belongs
 *  2. makes the test pass
 *  3. keeps the tests passing
 *  4. maintains 100% code coverage :-)
 *
 * Thanks!
 */

/*jshint expr: true*/
/* jshint maxlen: 180 */
var expect = require('chai').expect;

/* istanbul ignore next */ // we're not running these tests...
describe.skip(`PRs PLEASE!`, () => {
  const apiCheck = require('./index');
  const apiCheckInstance = apiCheck();

  it(`should not show [Circular] when something is simply used in two places`, () => {
    const y = {foo: 'foo'};
    const x = {foo: y, bar: y};
    const result = apiCheckInstance(apiCheckInstance.string, x);
    expect(result.message).to.not.contain('[Circular]');
  });
});
