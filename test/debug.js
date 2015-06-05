
var chai = require('chai'),
  assert = chai.assert,
  expect = chai.expect;

var debug = require('../lib/debug');

describe('#Glue.debug', function () {
  it('should have correct api', function () {
    var propsInfo = [
      { name: 'isEnable', type: Function },
      { name: 'isDisable', type: Function },
      { name: 'enable', type: Function },
      { name: 'disable', type: Function }
    ];

    propsInfo.forEach(function (prop) {
      expect(debug).to.have.property(prop.name).and.instanceof(prop.type);
    });
  });

  it('should be disabled by default', function () {
    assert.equal(debug.isDisable(), true, "Debug should be disabled");
    assert.equal(debug.isEnable(), false, "Debug should be disabled");
  });

  it('enable method', function () {
    debug.enable();
    assert.equal(debug.isDisable(), false, "Debug should be enabled");
    assert.equal(debug.isEnable(), true, "Debug should be enabled");
  });

  it('disable method', function () {
    debug.disable();
    assert.equal(debug.isDisable(), true, "Debug should be disabled");
    assert.equal(debug.isEnable(), false, "Debug should be disabled");
  });
});
