/*jshint expr: true*/
/* jshint maxlen: 180 */
var expect = require('chai').expect;

describe(`fixed bugs`, () => {
  const apiCheck = require('./index');
  const apiCheckInstance = apiCheck();

  it(`should not show [Circular] on things that aren't actually circular`, () => {
    const y = [{foo: 'foo', bar: 'bar'}];
    const result = apiCheckInstance(apiCheckInstance.arrayOf(apiCheckInstance.string), y);
    expect(result.message).to.not.contain('[Circular]');
  });
});
