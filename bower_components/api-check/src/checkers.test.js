/*jshint expr: true*/
var expect = require('chai').expect;
var _ = require('lodash-node');
const {coveredFunction} = require('./test.utils');
const {getCheckerDisplay} = require('./apiCheckUtil');

describe('checkers', () => {
  var checkers = require('./checkers');
  describe('typeOfs', () => {
    it('should check string', () => {
      expect(checkers.string('string')).to.be.undefined;
      expect(checkers.string(3)).to.be.an.instanceOf(Error);
    });
    it('should check bool', () => {
      expect(checkers.bool(true)).to.be.undefined;
      expect(checkers.bool('whatever')).to.be.an.instanceOf(Error);
    });
    it('should check number', () => {
      expect(checkers.number(234)).to.be.undefined;
      expect(checkers.number(234.42)).to.be.undefined;
      expect(checkers.number(false)).to.be.an.instanceOf(Error);
    });
    it('should check object', () => {
      expect(checkers.object({})).to.be.undefined;
      expect(checkers.object(null)).to.be.an.instanceOf(Error);
      expect(checkers.object([])).to.be.an.instanceOf(Error);
    });
    it('should check object.nullOk', () => {
      expect(checkers.object.nullOk({})).to.be.undefined;
      expect(checkers.object.nullOk(null)).to.be.undefined;
      expect(checkers.object.nullOk([])).to.be.an.instanceOf(Error);
    });
    it('should check array', () => {
      expect(checkers.array([])).to.be.undefined;
      expect(checkers.array({})).to.be.an.instanceOf(Error);
    });

    describe(`function`, () => {
      it('should check function', () => {
        expect(checkers.func(coveredFunction)).to.be.undefined;
        expect(checkers.func(null)).to.be.an.instanceOf(Error);
      });

      describe(`.withProperties`, () => {
        it(`should check for properties on a function`, () => {
          const myFuncWithProps = coveredFunction();

          const anotherFunctionWithProps = coveredFunction();
          anotherFunctionWithProps.aNumber = 32;

          myFuncWithProps.someProp = 'As a string';
          myFuncWithProps.anotherProp = {
            anotherFunction: anotherFunctionWithProps
          };

          const checker = checkers.func.withProperties({
            someProp: checkers.string,
            anotherProp: checkers.shape({
              anotherFunction: checkers.func.withProperties({
                aNumber: checkers.number
              })
            })
          });
          expect(checker(myFuncWithProps)).to.be.undefined;

          expect(checker(coveredFunction)).to.be.an.instanceOf(Error);
        });

        it(`should throw an error when the specified properties is not an object of functions`, () => {
          expect(() => {
            checkers.func.withProperties({
              thing1: checkers.bool,
              thing2: true
            });
          }).to.throw();
        });

      });
    });
  });

  describe('instanceof', () => {
    it('should check the instance of a class', () => {
      expect(checkers.instanceOf(RegExp)(/regex/)).to.be.undefined;
      expect(checkers.instanceOf(RegExp)({})).to.be.an.instanceOf(Error);
    });
  });

  describe('oneOf', () => {
    it('should pass when the value is one of the enums given', () => {
      expect(checkers.oneOf(['--,--`--,{@', '┐( ˘_˘)┌'])('┐( ˘_˘)┌')).to.be.undefined;
      expect(checkers.oneOf([null])(null)).to.be.undefined;
      expect(checkers.oneOf([5, false])(false)).to.be.undefined;
    });

    it('should fail when the value is not one of the enums given', () => {
      expect(checkers.oneOf([{}, 3.2])({})).to.be.an.instanceOf(Error);
      expect(checkers.oneOf(['ᕙ(⇀‸↼‶)ᕗ', '┬┴┬┴┤(･_├┬┴┬┴'])('(=^ェ^=)')).to.be.an.instanceOf(Error);
    });

    it(`should work with typeOrArrayOf and null`, () => {
      expect((checkers.oneOfType([
        checkers.oneOf([null, 'ehy', {a: 'b'}, undefined]), checkers.typeOrArrayOf(checkers.string)
      ]))(null)).to.be.undefined;
    });

  });

  describe('oneOfType', () => {
    it('should pass when the value type is one of the given types', () => {
      expect(checkers.oneOfType([checkers.bool, checkers.string])('hey')).to.be.undefined;
      expect(checkers.oneOfType([checkers.bool, checkers.string])(false)).to.be.undefined;
      expect(checkers.oneOfType([checkers.bool, checkers.instanceOf(RegExp)])(/regex/)).to.be.undefined;
      expect(checkers.oneOfType([checkers.bool, checkers.oneOf(['sup', 'Hey'])])('Hey')).to.be.undefined;
    });

    it('should fail when the value type is not one of the given types', () => {
      expect(checkers.oneOfType([checkers.object, checkers.string])(undefined)).to.be.an.instanceOf(Error);
      expect(checkers.oneOfType([checkers.object, checkers.string])(54)).to.be.an.instanceOf(Error);
    });

    it(`should have a type that can return a shortType`, () => {
      const check = checkers.oneOfType([checkers.object, checkers.func]);
      expect(check.type({short: true})).to.equal('oneOfType[Object, Function]');
    });

    it(`should have the full checker type of its children`, () => {
      const checker = checkers.oneOfType([
        checkers.shape({
          name: checkers.string,
          value: checkers.oneOfType([
            checkers.string, checkers.arrayOf(checkers.number).optional
          ]).optional
        }),
        checkers.func
      ]);
      expect(getCheckerDisplay(checker)).to.eql({
        __apiCheckData: {optional: false, type: 'oneOfType'},
        oneOfType: [
          {
            __apiCheckData: {optional: false, type: 'shape', strict: false},
            shape: {
              name: 'String',
              value: {
                __apiCheckData: {
                  optional: true,
                  type: 'oneOfType'
                },
                oneOfType: [
                  'String',
                  {
                    __apiCheckData: {
                      optional: true,
                      type: 'arrayOf'
                    },
                    arrayOf: 'Number'
                  }
                ]
              }
            }
          },
          'Function'
        ]
      });
    });
  });

  describe('arrayOf', () => {
    it('should pass when the array contains only elements of a type of the type given', () => {
      expect(checkers.arrayOf(checkers.bool)([true, false, true])).to.be.undefined;
      expect(checkers.arrayOf(checkers.arrayOf(checkers.number))([[1, 2, 3], [4, 5, 6]])).to.be.undefined;
    });
    it('should fail when the value is not an array', () => {
      expect(checkers.arrayOf(checkers.func)(32)).to.be.an.instanceOf(Error);
    });
    it('should fail when one of the values does not match the type', () => {
      expect(checkers.arrayOf(checkers.number)([1, 'string', 3])).to.be.an.instanceOf(Error);
    });
    it(`should have a type that can return a shortType`, () => {
      const check = checkers.arrayOf(checkers.object);
      expect(check.type({short: true})).to.equal('arrayOf[Object]');
    });
  });

  describe(`typeOrArrayOf`, () => {
    it(`should allow passing a single type`, () => {
      expect(checkers.typeOrArrayOf(checkers.bool)(false)).to.be.undefined;
      expect(checkers.typeOrArrayOf(checkers.number)(3)).to.be.undefined;
    });
    it(`should allow passing an array of types`, () => {
      expect(checkers.typeOrArrayOf(checkers.number)([3, 4])).to.be.undefined;
      expect(checkers.typeOrArrayOf(checkers.string)(['hi', 'there'])).to.be.undefined;
    });
    it(`should fail if an item in the array is wrong type`, () => {
      expect(checkers.typeOrArrayOf(checkers.string)(['hi', new Date()])).to.be.an.instanceOf(Error);
    });
    it(`should fail if the single item is the wrong type`, () => {
      expect(checkers.typeOrArrayOf(checkers.object)(true)).to.be.an.instanceOf(Error);
      expect(checkers.typeOrArrayOf(checkers.array)('not array')).to.be.an.instanceOf(Error);
    });
    it(`should have a type that can return a shortType`, () => {
      const check = checkers.typeOrArrayOf(checkers.object);
      expect(check.type({short: true})).to.equal('typeOrArrayOf[Object]');
    });
  });

  describe('objectOf', () => {
    it('should pass when the object contains only properties of a type of the type given', () => {
      expect(checkers.objectOf(checkers.bool)({a: true, b: false, c: true})).to.be.undefined;
      expect(checkers.objectOf(checkers.objectOf(checkers.number))({
        a: {a: 1, b: 2, c: 3},
        b: {a: 4, b: 5, c: 6}
      })).to.be.undefined;
    });
    it('should fail when the value is not an object', () => {
      expect(checkers.objectOf(checkers.func)(32)).to.be.an.instanceOf(Error);
    });
    it('should fail when one of the properties does not match the type', () => {
      expect(checkers.objectOf(checkers.number)({a: 1, b: 'string', c: 3})).to.be.an.instanceOf(Error);
    });

    it(`should have a type that can return a shortType`, () => {
      const check = checkers.objectOf(checkers.bool);
      expect(check.type({short: true})).to.equal('objectOf[Boolean]');
    });
  });

  describe('shape', () => {
    it('should pass when the object contains at least the properties of the types specified', () => {
      var check = checkers.shape({
        name: checkers.shape({
          first: checkers.string,
          last: checkers.string
        }),
        age: checkers.number,
        isOld: checkers.bool,
        walk: checkers.func,
        childrenNames: checkers.arrayOf(checkers.string)
      });
      var obj = {
        name: {
          first: 'Matt',
          last: 'Meese'
        },
        age: 27,
        isOld: false,
        walk: coveredFunction,
        childrenNames: []
      };
      expect(check(obj)).to.be.undefined;
    });

    it('should fail when the object is missing any of the properties specified', () => {
      var check = checkers.shape({
        scores: checkers.objectOf(checkers.number)
      });
      expect(check({sports: ['soccer', 'baseball']})).to.be.an.instanceOf(Error);
    });

    it('should have an optional function that does the same thing', () => {
      var check = checkers.shape({
        appliances: checkers.arrayOf(checkers.object)
      }).optional;
      expect(check({appliances: [{name: 'refridgerator'}]})).to.be.undefined;
    });

    it('should be false when passed a non-object', () => {
      var check = checkers.shape({
        friends: checkers.arrayOf(checkers.object)
      });
      expect(check([3])).to.be.an.instanceOf(Error);
    });

    it('should fail when the given object is missing properties', () => {
      var check = checkers.shape({
        mint: checkers.bool,
        chocolate: checkers.bool
      });
      expect(check({mint: true})).to.be.an.instanceOf(Error);
    });

    it('should pass when the given object is missing properties that are optional', () => {
      var check = checkers.shape({
        mint: checkers.bool,
        chocolate: checkers.bool.optional
      });
      expect(check({mint: true})).to.be.undefined;
    });

    it('should pass when it is strict and the given object conforms to the shape exactly', () => {
      var check = checkers.shape({
        mint: checkers.bool,
        chocolate: checkers.bool,
        milk: checkers.bool
      }).strict;
      expect(check({mint: true, chocolate: true, milk: true})).to.be.undefined;
    });

    it('should fail when it is strict and the given object has extra properties', () => {
      var check = checkers.shape({
        mint: checkers.bool,
        chocolate: checkers.bool,
        milk: checkers.bool
      }).strict;
      expect(check({mint: true, chocolate: true, milk: true, cookies: true})).to.be.an.instanceOf(Error);
    });

    it(`should fail when it is strict and it is an invalid shape`, () => {
      var check = checkers.shape({
        mint: checkers.bool,
        chocolate: checkers.bool,
        milk: checkers.bool
      }).strict;
      expect(check({mint: true, chocolate: true, milk: 42})).to.be.an.instanceOf(Error);
    });

    it(`should display the location of sub-children well`, () => {
      var obj = {
        person: {
          home: {
            location: {
              street: 324
            }
          }
        }
      };
      const check = checkers.shape({
        person: checkers.shape({
          home: checkers.shape({
            location: checkers.shape({
              street: checkers.string
            })
          })
        })
      });
      expect(check(obj).message).to.match(/street.*?at.*?person\/home\/location.*?must be.*?string/i);
    });

    it(`should add a helper when getting the type with addHelpers`, () => {
      const check = checkers.shape({
        mint: checkers.bool.optional,
        chocolate: checkers.bool,
        candy: checkers.arrayOf(checkers.shape({
          good: checkers.bool,
          bad: checkers.bool.optional
        }))});
      const obj = {
        mint: false,
        candy: [{}]
      };
      const typeTypes = check.type({terse: true, obj, addHelpers: true});
      expect(typeTypes).to.eql({
        chocolate: 'Boolean <-- YOU ARE MISSING THIS',
        mint: 'Boolean (optional)',
        candy: {
          __apiCheckData: {
            type: 'arrayOf', optional: false, error: 'THIS IS THE PROBLEM: `candy` must be `arrayOf[shape]`'
          },
          arrayOf: {
            __apiCheckData: {
              strict: false, optional: false, type: 'shape',
              // TODO make the output include this:
              //error: 'THIS IS THE PROBLEM: Required `good` not specified in `candy`. Must be `Boolean`'
            },
            shape: {
              good: 'Boolean <-- YOU ARE MISSING THIS'
            }
          }
        }
      });
    });

    it(`should handle a checker with no type and still look ok`, () => {
      const check = checkers.shape({
        voyager: checkers.shape({
          seasons: coveredFunction
        })
      });
      const obj = {
        voyager: {
          seasons: 7
        }
      };
      const typeTypes = check.type({terse: true, obj, addHelpers: true});
      expect(typeTypes).to.eql({
        voyager: {
          __apiCheckData: {type: 'shape', strict: false, optional: false},
          shape: {
            seasons: 'coveredFunction'
          }
        }
      });
    });

    it(`should handle a checker with no type and not break when there's a failure`, () => {
      const check = checkers.shape({
        voyager: checkers.shape({
          seasons: coveredFunction
        })
      });
      const obj = {
        voyager: 'failure!?'
      };
      const typeTypes = check.type({terse: true, obj, addHelpers: true});
      expect(typeTypes).to.eql({
        voyager: {
          __apiCheckData: {
            type: 'shape',
            strict: false,
            optional: false,
            error: 'THIS IS THE PROBLEM: `voyager` must be `Object`'
          },
          shape: {
            seasons: 'coveredFunction <-- YOU ARE MISSING THIS'
          }
        }
      });
    });

    it(`should add location/name if a location and name is provided`, () => {
      const check = checkers.shape({string: checkers.string});
      const result = check({string: 2}, 'name', 'location');
      expect(result.message).to.match(/`location\/name`/);
    });

    it(`should add the name if only a name is provided`, () => {
      const check = checkers.shape({string: checkers.string});
      const result = check({string: 2}, 'name');
      expect(result.message).to.match(/`name`/);
    });

    it(`should add the location if only a location is provided`, () => {
      const check = checkers.shape({string: checkers.string});
      const result = check({string: 2}, null, 'location');
      expect(result.message).to.match(/`location`/);
    });

    describe('ifNot', () => {

      it('should pass if the specified property exists but the other does not', () => {
        var check = checkers.shape({
          cookies: checkers.shape.ifNot('mint', checkers.bool),
          mint: checkers.shape.ifNot('cookies', checkers.bool)
        });
        expect(check({cookies: true})).to.be.undefined;
      });

      it('should fail if neither of the ifNot properties exists', () => {
        var check = checkers.shape({
          cookies: checkers.shape.ifNot('mint', checkers.bool),
          mint: checkers.shape.ifNot('cookies', checkers.bool)
        });
        expect(check({foo: true})).to.be.an.instanceOf(Error);
      });

      it('should pass if the specified array of properties do not exist', () => {
        var check = checkers.shape({
          cookies: checkers.shape.ifNot(['mint', 'chips'], checkers.bool)
        });
        expect(check({cookies: true})).to.be.undefined;
      });

      it('should fail if any of the specified array of properties exists', () => {
        var check = checkers.shape({
          cookies: checkers.shape.ifNot(['mint', 'chips'], checkers.bool)
        });
        expect(check({cookies: true, chips: true})).to.be.an.instanceOf(Error);
      });

      it('should fail even if both ifNots are optional', () => {
        var check = checkers.shape({
          cookies: checkers.shape.ifNot('mint', checkers.bool).optional,
          mint: checkers.shape.ifNot('cookies', checkers.bool).optional
        });
        expect(check({cookies: true, mint: true})).to.be.an.instanceOf(Error);
      });

      it('should fail if the specified property exists and the other does too', () => {
        var check = checkers.shape({
          cookies: checkers.shape.ifNot('mint', checkers.bool),
          mint: checkers.shape.ifNot('cookies', checkers.bool)
        });
        expect(check({cookies: true, mint: true})).to.be.an.instanceOf(Error);
      });

      it('should fail if it fails the specified checker', () => {
        var check = checkers.shape({
          cookies: checkers.shape.ifNot('mint', checkers.bool)
        });
        expect(check({cookies: 43})).to.be.an.instanceOf(Error);
      });

      it(`should have a legible type`, () => {
        var check = checkers.shape({
          name: checkers.shape({
            first: checkers.string,
            last: checkers.string
          }).strict,
          age: checkers.number,
          isOld: checkers.bool,
          walk: checkers.func,
          familyNames: checkers.objectOf(checkers.string),
          childrenNames: checkers.arrayOf(checkers.string),
          optionalStrictObject: checkers.shape({
            somethingElse: checkers.objectOf(checkers.shape({
              prop: checkers.func
            }).optional)
          }).strict.optional
        });
        expect(check.type.__apiCheckData).to.eql({
          strict: false, optional: false, type: 'shape'
        });
        expect(check.type()).to.eql({
          name: {
            __apiCheckData: {strict: true, optional: false, type: 'shape'},
            shape: {
              first: 'String',
              last: 'String'
            }
          },
          age: 'Number',
          isOld: 'Boolean',
          walk: 'Function',
          childrenNames: {
            __apiCheckData: {optional: false, type: 'arrayOf'},
            arrayOf: 'String'
          },
          familyNames: {
            __apiCheckData: {optional: false, type: 'objectOf'},
            objectOf: 'String'
          },
          optionalStrictObject: {
            __apiCheckData: {strict: true, optional: true, type: 'shape'},
            shape: {
              somethingElse: {
                __apiCheckData: {optional: false, type: 'objectOf'},
                objectOf: {
                  __apiCheckData: {optional: true, strict: false, type: 'shape'},
                  shape: {prop: 'Function'}
                }
              }
            }
          }
        });
      });


      it(`should show the properties it should not have`, () => {
        const check = checkers.shape({
          template: checkers.shape.ifNot('templateUrl', checkers.oneOfType([checkers.string, checkers.func])).optional,
          templateUrl: checkers.shape.ifNot('template', checkers.oneOfType([checkers.string, checkers.func])).optional
        });

        const error = check({template: 'foo', templateUrl: 'foo.html'});
        expect(error.message).to.eq('`template` must be `ifNot[templateUrl]`');
      });

      it(`should show the shortType checkers passed to it`, () => {
        const check = checkers.shape({
          template: checkers.shape.ifNot('templateUrl', checkers.oneOfType([checkers.string, checkers.func])).optional,
          templateUrl: checkers.shape.ifNot('template', checkers.oneOfType([checkers.string, checkers.func])).optional
        });

        const error = check({template: true});
        expect(error.message).to.eq('`template` must be `oneOfType[String, Function]`');
      });
    });

    describe('onlyIf', () => {
      it('should pass only if the specified property is also present', () => {
        var check = checkers.shape({
          cookies: checkers.shape.onlyIf('mint', checkers.bool)
        });
        expect(check({cookies: true, mint: true})).to.be.undefined;
      });

      it('should pass only if all specified properties are also present', () => {
        var check = checkers.shape({
          cookies: checkers.shape.onlyIf(['mint', 'chip'], checkers.bool)
        });
        expect(check({cookies: true, mint: true, chip: true})).to.be.undefined;
      });

      it('should fail if the specified property is not present', () => {
        var check = checkers.shape({
          cookies: checkers.shape.onlyIf('mint', checkers.bool)
        });
        expect(check({cookies: true})).to.be.an.instanceOf(Error);
      });

      it('should fail if any specified properties are not present', () => {
        var check = checkers.shape({
          cookies: checkers.shape.onlyIf(['mint', 'chip'], checkers.bool)
        });
        expect(check({cookies: true, chip: true})).to.be.an.instanceOf(Error);
      });

      it('should fail if all specified properties are not present', () => {
        var check = checkers.shape({
          cookies: checkers.shape.onlyIf(['mint', 'chip'], checkers.bool)
        });
        expect(check({cookies: true})).to.be.an.instanceOf(Error);
      });

      it('should fail if it fails the specified checker', () => {
        var check = checkers.shape({
          cookies: checkers.shape.onlyIf(['mint', 'chip'], checkers.bool)
        });
        expect(check({cookies: 42, mint: true, chip: true})).to.be.an.instanceOf(Error);
      });

      it(`should not throw an error if you specify onlyIf with a checker`, () => {
        const __apiCheckDataChecker = checkers.shape({
          type: checkers.oneOf(['shape']),
          strict: checkers.oneOf([false])
        });
        const shapeChecker = checkers.func.withProperties({
          type: checkers.oneOfType([
            checkers.func.withProperties({
              __apiCheckData: __apiCheckDataChecker
            }),
            checkers.shape({
              __apiCheckData: __apiCheckDataChecker
            })
          ])
        });
        const check = checkers.shape({
          oneChecker: checkers.shape.onlyIf('otherChecker', shapeChecker).optional,
          otherChecker: shapeChecker.optional
        });
        const invalidValue = {
          oneChecker: checkers.shape({})
        };
        expect(() => {
          const result = check(invalidValue);
          expect(result).to.be.an.instanceOf(Error);
          check.type({addHelpers: true, obj: invalidValue}); // this throws the error. Bug. reproduced. ᕙ(⇀‸↼‶)ᕗ
        }).to.not.throw();
      });
    });

    describe(`requiredIfNot`, () => {
      let checker;
      beforeEach(() => {
        checker = checkers.shape({
          foo: checkers.shape.requiredIfNot('bar', checkers.array),
          bar: checkers.string.optional,
          foobar: checkers.shape.requiredIfNot(['foobaz', 'baz'], checkers.bool),
          foobaz: checkers.object.optional,
          baz: checkers.string.optional
        });

      });

      it(`should pass when a value is specified and the other value(s) is/are not`, () => {
        const obj = {
          foo: [1, 2],
          foobar: true
        };
        expect(checker(obj)).to.be.undefined;
      });

      it(`should pass when a value is specified and the other value(s) is/are too`, () => {
        const obj = {
          foo: [1, 2],
          bar: 'hi',
          foobar: true,
          foobaz: {},
          baz: 'hey'
        };
        expect(checker(obj)).to.be.undefined;
      });

      it(`should fail when a value is not given and the other value(s) is/are not either`, () => {
        let obj = {
          foo: [1, 2]
          // missing foobar
        };
        expect(checker(obj)).to.be.an.instanceOf(Error);

        obj = {
          // missing foo
          foobar: true
        };
        expect(checker(obj)).to.be.an.instanceOf(Error);
      });

      it(`should pass if only one of the other values is specified`, () => {
        const obj = {
          bar: 'hi',
          baz: 'hey'
        };
        expect(checker(obj)).to.be.undefined;
      });

      describe(`all`, () => {

        beforeEach(() => {
          checker = checkers.shape({
            foobar: checkers.shape.requiredIfNot.all(['foobaz', 'baz'], checkers.bool),
            foobaz: checkers.object.optional,
            baz: checkers.string.optional
          });
        });

        it(`should pass if both the other values is specified`, () => {
          const obj = {
            bar: 'hi',
            foobaz: {},
            baz: 'hey'
          };
          expect(checker(obj)).to.be.undefined;
        });

        it(`should fail if only one of the other values is specified`, () => {
          const obj = {
            bar: 'hi',
            baz: 'hey'
          };
          expect(checker(obj)).to.be.an.instanceOf(Error);
        });

        it(`should pass if none of the values is specified`, () => {
          expect(checker({})).to.be.undefiend;
        });

        it(`should throw an error when trying to create an all with anything but an array`, () => {
          expect(
            () => checkers.shape.requiredIfNot.all('hi', checkers.bool)
          ).to.throw('requiredIfNot.all must be passed an array');
        });
      });
    });
  });

  describe(`arguments`, () => {
    it(`should pass when passing arguments or an arguments-like object`, () => {
      function foo() {
        expect(checkers.args(arguments)).to.be.undefined;
      }

      foo('hi');
      expect(checkers.args({length: 0})).to.be.undefined;
    });
    it(`should fail when passing anything else`, () => {
      expect(checkers.args('hey')).to.be.an.instanceOf(Error);
      expect(checkers.args([])).to.be.an.instanceOf(Error);
      expect(checkers.args({})).to.be.an.instanceOf(Error);
      expect(checkers.args(true)).to.be.an.instanceOf(Error);
      expect(checkers.args(null)).to.be.an.instanceOf(Error);
      expect(checkers.args({length: 'not number'})).to.be.an.instanceOf(Error);
    });
  });

  describe('any', () => {
    it('should (almost) always pass', () => {
      expect(checkers.any(false)).to.be.undefined;
      expect(checkers.any({})).to.be.undefined;
      expect(checkers.any(RegExp)).to.be.undefined;
    });

    it(`should fail when passed undefined and it's not optional`, () => {
      expect(checkers.any()).to.be.an.instanceOf(Error);
    });

    it(`should pass when passed undefined and it's optional`, () => {
      expect(checkers.any.optional()).to.be.undefined;
    });
  });

  describe(`null`, () => {
    it(`should pass with null`, () => {
      expect(checkers.null(null)).to.be.undefined;
    });

    it(`should fail with anything but null`, () => {
      expect(checkers.null('foo')).to.be.an.instanceOf(Error);
      expect(checkers.null(23)).to.be.an.instanceOf(Error);
      expect(checkers.null({})).to.be.an.instanceOf(Error);
      expect(checkers.null()).to.be.an.instanceOf(Error);
    });
  });

  describe(`range`, () => {
    it(`should pass when given an item within the specified range`, () => {
      expect(checkers.range(0, 10)(4)).to.be.undefined;
    });

    it(`should fail when given an item outisde the specified range`, () => {
      expect(checkers.range(0, 10)(15)).to.be.an.instanceOf(Error);
      expect(checkers.range(0, 10)(-5)).to.be.an.instanceOf(Error);
    });

    it(`should fail when given a non-number`, () => {
      expect(checkers.range(-10, 10)('hello')).to.be.an.instanceOf(Error);
    });
  });

  describe(`emptyObject`, () => {
    it(`should pass when given an empty object`, () => {
      expect(checkers.emptyObject({})).to.be.undefined;
    });

    it(`should fail when given anything but an empty object`, () => {
      expect(checkers.emptyObject({foo: 'bar'})).to.be.an.instanceOf(Error);
      expect(checkers.emptyObject(null)).to.be.an.instanceOf(Error);
      expect(checkers.emptyObject([])).to.be.an.instanceOf(Error);
      expect(checkers.emptyObject(coveredFunction())).to.be.an.instanceOf(Error);
    });
  });

  describe(`all checkers`, () => {

    const builtInCheckers = [
      checkers.array,
      checkers.bool,
      checkers.number,
      checkers.string,
      checkers.func,
      checkers.object,
      checkers.instanceOf(Date),
      checkers.oneOf([null]),
      checkers.oneOfType([checkers.bool]),
      checkers.arrayOf(checkers.string),
      checkers.objectOf(checkers.func),
      checkers.typeOrArrayOf(checkers.number),
      checkers.shape({}),
      checkers.args,
      checkers.any,
      checkers.null,
      checkers.range(1, 15),
      checkers.emptyObject
    ];

    it('should have an optional function', () => {
      _.each(builtInCheckers, shouldHaveOptional);
    });

    it(`should have a nullable function that can be optional`, () => {
      _.each(builtInCheckers, checker => {
        shouldHaveNullable(checker);
        shouldHaveOptional(checker.nullable);
      });
    });

    function shouldHaveNullable(checker) {
      expect(checker.nullable).to.be.a('function');
      expect(checker.nullable.isNullable).to.be.true;
      expect(checker.nullable.originalChecker).to.eq(checker);
      expect(checker.nullable(null)).to.be.undefined;
    }

    function shouldHaveOptional(checker) {
      expect(checker.optional).to.be.a('function');
      expect(checker.optional.isOptional).to.be.true;
      expect(checker.optional.originalChecker).to.eq(checker);
      expect(checker.optional()).to.be.undefined;
    }

    it(`should check the actual checker if nullable and not passed null`, () => {
      expect(checkers.bool.nullable(true)).to.be.undefined;
      expect(checkers.func.nullable(32)).to.be.an.instanceOf(Error);
    });


  });
});
