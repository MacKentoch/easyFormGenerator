/*jshint expr: true*/
/* jshint maxlen: 180 */
var expect = require('chai').expect;
const {coveredFunction} = require('./test.utils');
describe('apiCheck', () => {
  const apiCheck = require('./index');
  const apiCheckInstance = apiCheck();
  const {getError, noop} = require('./apiCheckUtil');

  describe(`main export`, () => {
    const getApiCheck = require('./index');
    it(`should allow you to create instances of apiCheck that do not conflict`, () => {
      const apiCheck1 = getApiCheck({
        output: {
          prefix: 'apiCheck1'
        }
      });
      const apiCheck2 = getApiCheck({
        output: {
          prefix: 'apiCheck2'
        }
      });
      expect(apiCheck1(apiCheck1.string, 23).message).to.contain('apiCheck1');
      expect(apiCheck1(apiCheck1.string, 23).message).to.not.contain('apiCheck2');

      expect(apiCheck2(apiCheck2.string, 23).message).to.contain('apiCheck2');
      expect(apiCheck2(apiCheck2.string, 23).message).to.not.contain('apiCheck1');
    });

    it(`should throw an error when the config passed is improperly shaped`, () => {
      expect(() => getApiCheck({prefix: 'apiCheck1'})).to.throw(
        makeSpacedRegex('creating an apiCheck instance apiCheck failed! prefix apiCheck1')
      );
    });

    it(`should throw an error when the checkers passed are improperly shaped`, () => {
      const myImproperChecker = coveredFunction();
      myImproperChecker.type = false; // must be string or object
      expect(() => getApiCheck(null, {myChecker: myImproperChecker})).to.throw(
        makeSpacedRegex('creating an apiCheck instance apiCheck failed! myChecker')
      );
    });

    it(`should allow for specifying only default config`, () => {
      const docsBaseUrl = 'http://my.example.com';
      const apiCheck1 = getApiCheck({
        output: {docsBaseUrl}
      });
      expect(apiCheck1.config.output.docsBaseUrl).to.equal(docsBaseUrl);
    });

    it(`should allow for specifying both extra checkers and default config`, () => {
      const docsBaseUrl = 'http://my.example.com';
      const apiCheck1 = getApiCheck({
        output: {docsBaseUrl}
      }, {
        myChecker: coveredFunction
      });
      expect(apiCheck1.config.output.docsBaseUrl).to.equal(docsBaseUrl);
      expect(apiCheck1.myChecker).to.equal(coveredFunction);
    });
  });

  describe('#', () => {
    let ipAddressChecker;
    const ipAddressRegex = /(\d{1,3}\.){3}\d{1,3}/;
    beforeEach(() => {
      ipAddressChecker = (val, name, location) => {
        if (!ipAddressRegex.test(val)) {
          return getError(name, location, ipAddressChecker.type);
        }
      };
      ipAddressChecker.type = 'ipAddressString';
      ipAddressChecker.shortType = 'ipAddressString';
    });
    it('should handle a single argument type specification', () => {
      (function(a) {
        const message = apiCheckInstance(apiCheckInstance.string, a).message;
        expect(message).to.be.empty;
      })('hello');
    });

    it('should handle array with types', () => {
      (function(a, b, c) {
        var message = apiCheckInstance([apiCheckInstance.string, apiCheckInstance.number, apiCheckInstance.bool], arguments).message;
        expect(message).to.be.empty;
      })('a', 1, true);
    });

    it('should handle optional arguments', () => {
      (function(a, b, c) {
        var message = apiCheckInstance([apiCheckInstance.string, apiCheckInstance.number.optional, apiCheckInstance.bool], arguments).message;
        expect(message).to.be.empty;
      })('a', true);
    });

    it(`should handle an any.optional that's in the middle of the arg list`, () => {
      (function(a, b, c) {
        var message = apiCheckInstance([apiCheckInstance.string, apiCheckInstance.any.optional, apiCheckInstance.bool], arguments).message;
        expect(message).to.be.empty;
      })('a', true);
    });

    it(`should handle the crazy optional specifications`, () => {
      function crazyFunction() {
        var message = apiCheckInstance([
          apiCheckInstance.string.optional, apiCheckInstance.number.optional, apiCheckInstance.bool,
          apiCheckInstance.object.optional, apiCheckInstance.func.optional, apiCheckInstance.array,
          apiCheckInstance.string.optional, apiCheckInstance.func
        ], arguments).message;
        expect(message).to.be.empty;
      }
      crazyFunction('string', true, coveredFunction, [], coveredFunction);
      crazyFunction(32, false, {}, [], 'hey!', coveredFunction);
      crazyFunction(false, {}, [], coveredFunction);
    });

    it(`should handle a final two optional arguments`, () => {
      (function(a, b, c) {
        var message = apiCheckInstance([apiCheckInstance.string, apiCheckInstance.oneOfType([
          apiCheckInstance.arrayOf(apiCheckInstance.string),
          apiCheckInstance.shape({name: apiCheckInstance.string})
        ]).optional, apiCheckInstance.shape({
          prop1: apiCheckInstance.shape.onlyIf('prop2', apiCheckInstance.string).optional,
          prop2: apiCheckInstance.shape.onlyIf('prop1', apiCheckInstance.string).optional
        }).optional], arguments).message;
        expect(message).to.be.empty;
      })('a', ['1', '2', 'hey!']);
    });

    it(`should handle specifying an array instead of arguments`, () => {
      const result = apiCheckInstance([apiCheckInstance.string, apiCheckInstance.bool], ['hi', true]);
      expect(result.passed).to.be.true;
      expect(result.message).to.be.empty;
    });

    it(`should output a good message for a custom object`, () => {
      function Foo() {
        this.bar = 'baz';
        this.baz = 123;
        this.foobar = new Date();
      }
      const foo = new Foo();

      (function(a) {
        var message = apiCheckInstance(apiCheckInstance.number, a).message;
        expect(message).to.match(makeSpacedRegex('you passed bar "baz" baz 123 foobar with types string number date'));
      })(foo);
    });

    it(`should output the custom object's name if it has no properties`, () => {
      function Foo() {
      }
      const foo = new Foo();

      (function(a) {
        var message = apiCheckInstance(apiCheckInstance.number, a).message;
        expect(message).to.match(makeSpacedRegex('you passed {} with type Foo'));
      })(foo);
    });

    it(`should output a function with properties`, () => {
      const func = coveredFunction();
      func.foo = 'bar';

      (function(a) {
        var message = apiCheckInstance(apiCheckInstance.number, a).message;
        expect(message).to.match(makeSpacedRegex(`you passed ${func.name} with the type: Function with properties foo string`));
      })(func);
    });

    it(`should output an empty object`, () => {
      var message = apiCheckInstance(apiCheckInstance.number, {}).message;
      expect(message).to.match(makeSpacedRegex(`you passed {} with the type: object`));
    });

    it(`should output an empty array`, () => {
      var message = apiCheckInstance(apiCheckInstance.number, []).message;
      expect(message).to.match(makeSpacedRegex(`you passed \\[\\] with the type: array`));
    });

    it(`should handle circular references properly`, () => {
      var foo = {};
      var bar = {foo};
      foo.bar = bar;
      var message = apiCheckInstance(apiCheckInstance.number, foo).message;
      expect(message).to.match(makeSpacedRegex(`bar foo \\[circular ~\\] bar foo \\[circular\\]`));
    });

    describe(`custom checkers`, () => {
      it('should be accepted', () => {
        (function(a, b) {
          var message = apiCheckInstance([apiCheckInstance.string, ipAddressChecker], arguments).message;
          expect(message).to.be.empty;
        })('a', '127.0.0.1');


        (function(a, b) {
          var message = apiCheckInstance([apiCheckInstance.string, ipAddressChecker], arguments).message;
          expect(message).to.match(/argument.*?2.*?must.*?be.*?ipAddressString/i);
        })('a', 32);
      });

      it(`be accepted even if the function has no properties`, () => {
        expect(() => apiCheckInstance([() => ''], {length: 1, 0: ''})).to.not.throw();
      });
    });

    it('should handle when the api is an array and the arguments array is empty', () => {
      const error = /not.*?enough.*?arguments.*?requires.*?2.*?passed.*?0/i;
      (function(a, b) {
        expect(() => apiCheckInstance.throw([apiCheckInstance.string, apiCheckInstance.bool], arguments)).to.throw(error);
      })();
    });

    it(`should return an error even when a checker is optional and the last argument`, () => {
      (function(a, b) {
        const result = apiCheckInstance([apiCheckInstance.string, apiCheckInstance.bool.optional], arguments);
        expect(result.message).to.match(/argument 2.*must be.*boolean/i);
      })('hi', 32);
    });

    it(`should show the user what they provided in a good way`, () => {
      (function(a, b, c) {
        c(); // test coverage...
        const result = apiCheckInstance([apiCheckInstance.string, apiCheckInstance.func], arguments);
        expect(result.message).to.match(
          makeSpacedRegex('you passed coveredFunction false anonymous function types function boolean function')
        );
      })(coveredFunction, false, function() {});
    });


    describe(`api checking`, () => {
      const args = {length: 1, 0: '127.0.0.1'};
      it(`should throw an error when a checker is specified with an incorrect type property`, () => {
        ipAddressChecker.type = 32;
        expect(() => apiCheckInstance(ipAddressChecker, args)).to.throw();
      });

      it(`should not throw an error when a checker is specified with a string type property`, () => {
        ipAddressChecker.type = 'hey!';
        expect(() => apiCheckInstance(ipAddressChecker, args)).to.not.throw();
      });

      it(`should not throw an error when a checker is specified with the correct shape`, () => {
        ipAddressChecker.type = {
          __apiCheckData: {
            type: 'ipAddress',
            optional: false
          },
          ipAddress: ipAddressRegex.toString()
        };
        expect(() => apiCheckInstance(ipAddressChecker, args)).to.not.throw();
      });

      it(`should throw an error when a checker is specified with the incorrect shape`, () => {
        ipAddressChecker.type = {
          __apiCheckData: {
            type: 'ipAddress',
            optional: false
          }
        };
        expect(() => apiCheckInstance(ipAddressChecker, args)).to.throw();

        ipAddressChecker.type = {
          __apiCheckData: {
            type: 'ipAddress',
            optional: false
          },
          ipAddressChecker: 43
        };
        expect(() => apiCheckInstance(ipAddressChecker, args)).to.throw();

      });

      it(`should throw an error when specifying the api as an array, but the args is not an array`, () => {
        const api = [
          apiCheckInstance.string,
          apiCheckInstance.number
        ];

        expect(() => apiCheckInstance(api, 'foo')).to.throw(makeSpacedRegex(
          'if array api array args you passed "foo" with the type: string'
        ));
      });

    });

    describe(`helper text of a checker`, () => {
      describe(`as a string`, () => {
        it(`should be printed as is as part of the message`, () => {
          ipAddressChecker.help = 'This needs to be a valid IP address. Like 127.0.0.1';
          (function(a, b) {
            var message = apiCheckInstance([apiCheckInstance.string, ipAddressChecker], arguments).message;
            expect(message).to.contain(ipAddressChecker.help);
          })('a', 32);
        });
      });

      describe(`as a function`, () => {
        it(`should be invoked and the result added as part of the message`, () => {
          const suffix = ' is not a valid IP address. Like 127.0.0.1';
          ipAddressChecker.help = function(val) {
            return val + suffix;
          };
          (function(a, b) {
            var message = apiCheckInstance([apiCheckInstance.string, ipAddressChecker], arguments).message;
            expect(message).to.contain(suffix);
          })('a', 32);
        });
      });
    });
  });

  describe('#throw', () => {
    it('should not throw an error when the arguments are correct', () => {
      (function(a) {
        expect(apiCheckInstance.throw(apiCheckInstance.string, a)).to.not.throw;
      })('a');
    });

    it('should throw an error when the arguments are not correct', () => {
      (function(a) {
        expect(() => apiCheckInstance.throw(apiCheckInstance.number, a)).to.throw(/argument.*?1.*?must.*?be.*?number/i);
      })('a', 3);
    });
    it('should do nothing when disabled', () => {
      apiCheckInstance.config.disabled = true;
      (function(a) {
        expect(apiCheckInstance.throw(apiCheckInstance.number, a)).to.not.throw;
      })('a', 3);
      apiCheckInstance.config.disabled = false;
    });
  });

  describe('#warn', () => {
    var originalWarn;
    var warnCalls;
    beforeEach(() => {
      originalWarn = console.warn;
      warnCalls = [];
      console.warn = function() {
        warnCalls.push([...arguments]);
      };
    });

    it('should not warn when the arguments are correct', () => {
      (function(a) {
        apiCheckInstance.warn(apiCheckInstance.string, a);
      })('a');
      expect(warnCalls).to.have.length(0);
    });

    it('should warn when the arguments are not correct', () => {
      (function(a) {
        apiCheckInstance.warn(apiCheckInstance.string, a);
      })();
      expect(warnCalls).to.have.length(1);
      expect(warnCalls[0].join(' ')).to.match(/failed/i);
    });
    it('should do nothing when disabled', () => {
      apiCheckInstance.config.disabled = true;
      (function(a) {
        apiCheckInstance.warn(apiCheckInstance.string, a);
      })();
      expect(warnCalls).to.have.length(0);
      apiCheckInstance.config.disabled = false;
    });

    it(`should return the results`, () => {
      (function(a) {
        let message = apiCheckInstance.warn(apiCheckInstance.number, a).message;
        expect(message).to.match(makeSpacedRegex('you passed a the api calls for number'));
      })('a', 3);
    });

    afterEach(() => {
      console.warn = originalWarn;
    });
  });

  describe('#disable/enable', () => {
    it('should disable apiCheck, and results will always be null', () => {
      apiCheckInstance.config.disabled = true;
      check(apiCheckInstance, true);
      apiCheckInstance.config.disabled = false;
      check(apiCheckInstance, false);
    });

    it(`should not effect other instances of apiCheck`, () => {
      const anotherInstance = apiCheck();
      apiCheckInstance.config.disabled = true;
      check(apiCheckInstance, true);
      check(anotherInstance, false);
    });

    it(`should be able to disable and enable apiCheck globally`, () => {
      apiCheck.globalConfig.disabled = true;
      check(apiCheckInstance, true);
      apiCheck.globalConfig.disabled = false;
      check(apiCheckInstance, false);
    });

    it(`should use the noop version of checkers when initializing a new instance if globally disabled`, () => {
      apiCheck.globalConfig.disabled = true;
      const customInstance = apiCheck();
      check(customInstance, true);
      var checkers = [
        customInstance.string,
        customInstance.bool,
        customInstance.func,
        customInstance.array,
        customInstance.number,

        customInstance.object,
        customInstance.object.nullOk,

        customInstance.oneOf([null, 'foo']),
        customInstance.oneOfType([
          customInstance.string.optional,
          customInstance.bool.optional
        ]),

        customInstance.arrayOf(customInstance.string),
        customInstance.objectOf(customInstance.array),


        customInstance.instanceOf(Date),

        customInstance.shape({}),
        customInstance.shape.ifNot('foo'),
        customInstance.shape.onlyIf(['bar', 'baz']),

        customInstance.typeOrArrayOf(customInstance.string),

        customInstance.args,
        customInstance.any
      ];

      checkers.forEach(checker => {
        expect(checker.isNoop).to.be.true;
        expect(checker.optional.isNoop).to.be.true;
      });
    });

    function check(instance, disabled) {
      const error = /not.*?enough.*?arguments.*?requires.*?2.*?passed.*?1/i;
      (function(a, b) {
        var message = instance([instance.instanceOf(RegExp), instance.number], arguments).message;
        if (disabled) {
          expect(message).to.be.empty;
        } else {
          expect(message).to.match(error);
        }
      })('hey');
    }

    afterEach(function() {
      apiCheck.globalConfig.disabled = false;
      apiCheckInstance.config.disabled = false;
    });
  });

  describe('apiCheck api', () => {
    it('should throw an error when no api is passed', () => {
      (function(a) {
        expect(() => apiCheckInstance(null, arguments)).to.throw(/argument.*1.*must.*be.*typeOrArrayOf.*func\.withProperties/i);
      })('a');
    });
    it(`should throw an error when the wrong types are passed`, () => {
      (function(a) {
        var args = arguments;
        expect(() => apiCheckInstance(true, args)).to.throw(/argument.*1.*must.*be.*typeOrArrayOf.*func\.withProperties/i);
      })('a');
    });
  });

  describe('apiCheck config', () => {
    describe('output', () => {

      it('should fallback to an empty object is output is removed', () => {
        var original = apiCheckInstance.config.output;
        apiCheckInstance.config.output = null;
        expect(getFailureMessage).to.not.throw();
        apiCheckInstance.config.output = original;
      });

      describe('prefix', () => {
        var gPrefix = 'global prefix';
        beforeEach(() => {
          apiCheckInstance.config.output.prefix = gPrefix;
        });
        it('should prefix the error message', () => {
          expect(getFailureMessage()).to.match(new RegExp(`^${gPrefix}`));
        });

        it('should allow the specification of an additional prefix that comes after the global config prefix', () => {
          var prefix = 'secondary prefix';
          expect(getFailureMessage({prefix})).to.match(new RegExp(`^${gPrefix} ${prefix}`));
        });

        it(`should be overrideable by the specific call`, () => {
          const onlyPrefix = 'overriding prefix';
          const message = getFailureMessage({onlyPrefix});
          expect(message).to.match(new RegExp(`^${onlyPrefix}`));
          expect(message).to.not.contains(gPrefix);
        });

        afterEach(() => {
          apiCheckInstance.config.output.prefix = '';
        });
      });

      describe('suffix', () => {
        var gSuffix = 'global suffix';
        beforeEach(() => {
          apiCheckInstance.config.output.suffix = gSuffix;
        });
        it('should suffix the error message', () => {
          expect(getFailureMessage()).to.contain(`${gSuffix}`);
        });

        it('should allow the specification of an additional suffix that comes after the global config suffix', () => {
          var suffix = 'secondary suffix';
          expect(getFailureMessage({suffix})).to.contain(`${suffix} ${gSuffix}`);
        });

        it(`should be overrideable by the specific call`, () => {
          const onlySuffix = 'overriding suffix';
          const message = getFailureMessage({onlySuffix});
          expect(message).to.contain(onlySuffix);
          expect(message).to.not.contain(gSuffix);
        });

        afterEach(() => {
          apiCheckInstance.config.output.suffix = '';
        });
      });

      describe('url', () => {
        var docsBaseUrl = 'http://www.example.com/errors#';
        beforeEach(() => {
          apiCheckInstance.config.output.docsBaseUrl = docsBaseUrl;
        });
        it('should not be in the message if a url is not specified', () => {
          expect(getFailureMessage()).to.not.contain(docsBaseUrl);
          expect(getFailureMessage()).to.not.contain('undefined');
        });

        it('should be added to the message if a url is specified', () => {
          var urlSuffix = 'some-error-message';
          expect(getFailureMessage({urlSuffix})).to.contain(`${docsBaseUrl}${urlSuffix}`);
        });

        it(`should be overrideable by the specific call`, () => {
          const url = 'http://www.example.com/otherErrors#some-other-url';
          const message = getFailureMessage({url});
          expect(message).to.contain(url);
          expect(message).to.not.contain(docsBaseUrl);
        });

        afterEach(() => {
          apiCheckInstance.config.output.docsBaseUrl = '';
        });
      });

      it(`should throw an error if you include extra properties`, () => {
        expect(() => getFailureMessage({myProp: true})).to.throw(/argument 3.*?cannot have extra properties.*?myProp/i);
      });

      function getFailureMessage(output) {
        var message;
        (function(a) {
          message = apiCheckInstance(apiCheckInstance.string, a, output).message;
        })(1);
        return message;
      }

    });

  });


  describe('#getErrorMessage', () => {
    it('should say "nothing" when the args is empty', () => {
      expect(apiCheckInstance.getErrorMessage()).to.match(/nothing/i);
    });

    it('should say the values and types I passed', () => {
      const regex = makeSpacedRegex('hey! 3 true string number boolean');
      expect(apiCheckInstance.getErrorMessage([], ['Hey!', 3, true])).to.match(regex);
    });

    it('should show only one api when only no optional arguments are provided', () => {
      const result = apiCheckInstance.getErrorMessage([apiCheckInstance.object]);
      expect(result).to.match(/you passed(.|\n)*?the api calls for(.|\n)*?object/i);
    });

    it(`should show the user's arguments and types nicely`, () => {
      const result = apiCheckInstance.getErrorMessage([
        apiCheckInstance.object,
        apiCheckInstance.array.optional,
        apiCheckInstance.string
      ], [
        {a: 'a', r: new RegExp(), b: undefined},
        [23, false, null]
      ]);
      /* jshint -W101 */
      const regex = makeSpacedRegex(
        'you passed a a r {} [ 23 false null ] with the types: a string r regexp b undefined number boolean null ' +
        'the api calls for object array \\(optional\\) string'
      );
      expect(result).to.match(regex);
    });

    it('should be overrideable', () => {
      let originalGetErrorMessage = apiCheckInstance.getErrorMessage;
      let api = [apiCheckInstance.string, apiCheckInstance.shape({}), apiCheckInstance.array];
      let args;
      let output = {};
      apiCheckInstance.getErrorMessage = (_api, _args, _message, _output) => {
        expect(_api).to.equal(api);
        expect(_args).to.eql(Array.prototype.slice.call(args)); // only eql because the args are cloned
        expect(_message).to.have.length(3);
        expect(_output).to.equal(output);
      };
      (function(a, b, c) {
        args = arguments;
        apiCheckInstance(api, arguments, output);
      })(1, 2, 3);
      apiCheckInstance.getErrorMessage = originalGetErrorMessage;
    });


    describe(`verbose`, () => {

      const terseMessage = {
        __apiCheckData: {strict: false, optional: false, type: 'shape'},
        shape: {
          foo: {
            __apiCheckData: {strict: false, optional: false, type: 'shape'},
            shape: {
              foo1: 'String (optional)',
              foo2: 'Number'
            }
          },
          bar: {
            __apiCheckData: {
              strict: false, optional: false, type: 'func.withProperties', missing: 'MISSING THIS FUNC.WITHPROPERTIES'
            },
            'func.withProperties': {
              bar2: 'Boolean <-- YOU ARE MISSING THIS'
            }
          }
        }
      };

      const verboseMessage = {
        __apiCheckData: {strict: false, optional: false, type: 'shape'},
        shape: {
          foo: {
            __apiCheckData: {strict: false, optional: false, type: 'shape'},
            shape: {
              foo1: 'String (optional)',
              foo2: 'Number'
            }
          },
          bar: {
            __apiCheckData: {
              strict: false, optional: false, type: 'func.withProperties', missing: 'MISSING THIS FUNC.WITHPROPERTIES'
            },
            'func.withProperties': {
              bar1: 'String (optional)',
              bar2: 'Boolean <-- YOU ARE MISSING THIS'
            }
          },
          foobar: {
            __apiCheckData: {
              strict: false, optional: true, type: 'shape'
            },
            shape: {
              foobar1: 'String (optional)',
              foobar2: 'Date'
            }
          }
        }
      };

      it(`should return a terse message by default`, () => {
        testApiTypes(terseMessage);
      });

      it(`should return verbose message when verbose mode is enabled in the instance`, () => {
        apiCheckInstance.config.verbose = true;
        testApiTypes(verboseMessage);
      });

      it(`should return verbose message when verbose is enabled globally and not specified for the instance`, () => {
        apiCheck.globalConfig.verbose = true;
        testApiTypes(verboseMessage);
      });

      it(`should return verbose message when verbose is enabled globally and specified for the instance to be off`, () => {
        apiCheckInstance.config.verbose = false;
        apiCheck.globalConfig.verbose = true;
        testApiTypes(verboseMessage);
      });

      it(`should return a terse message when verbose is specified to be off globally even when specified on by the instance`, () => {
        apiCheckInstance.config.verbose = true;
        apiCheck.globalConfig.verbose = false;
        testApiTypes(terseMessage);
      });

      afterEach(() => {
        delete apiCheckInstance.config.verbose;
        delete apiCheck.globalConfig.verbose;
      });
    });


    function testApiTypes(resultApiTypes) {
      const optionsCheck = apiCheckInstance.shape({
        foo: apiCheckInstance.shape({
          foo1: apiCheckInstance.string.optional,
          foo2: apiCheckInstance.number
        }),
        bar: apiCheckInstance.func.withProperties({
          bar1: apiCheckInstance.string.optional,
          bar2: apiCheckInstance.bool
        }),
        foobar: apiCheckInstance.shape({
          foobar1: apiCheckInstance.string.optional,
          foobar2: apiCheckInstance.instanceOf(Date)
        }).optional
      });
      const myOptions = {
        foo: {
          foo1: 'specified',
          foo2: 3
        }
      };
      (function(a) {
        const {apiTypes} = apiCheckInstance(optionsCheck, a);
        expect(apiTypes).to.eql([resultApiTypes]);
      })(myOptions);
    }
  });

  describe('#handleErrorMessage', () => {
    it('should send the message to console.warn when the second argument is falsy', () => {
      var originalWarn = console.warn;
      var warnCalls = [];
      console.warn = function() {
        warnCalls.push([...arguments]);
      };
      apiCheckInstance.handleErrorMessage('message', false);
      expect(warnCalls).to.have.length(1);
      expect(warnCalls[0].join(' ')).to.equal('message');
      console.warn = originalWarn;
    });
    it('should throw the message when the second argument is truthy', () => {
      expect(() => apiCheckInstance.handleErrorMessage('message', true)).to.throw('message');
    });

    it('should be overrideable', () => {
      var originalHandle = apiCheckInstance.handleErrorMessage;
      apiCheckInstance.handleErrorMessage = (message, shouldThrow) => {
        expect(message).to.match(makeSpacedRegex('you passed undefined type undefined api calls for string'));
        expect(shouldThrow).to.be.true;
      };
      (function(a) {
        apiCheckInstance.throw(apiCheckInstance.string, a);
      })();
      apiCheckInstance.handleErrorMessage = originalHandle;
    });
  });

  describe(`#noop`, () => {
    it(`should return nothing`, () => {
      expect(noop()).to.be.undefined;
    });
  });

  function makeSpacedRegex(string) {
    return new RegExp(string.replace(/ /g, '(.|\\n)*?'), 'i');
  }
});
