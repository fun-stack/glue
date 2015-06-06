
import { join } from 'path';

import { assert, expect } from 'chai';
import I from 'immutable';

import GlueConstructor from '../';

var Glue = GlueConstructor(__dirname);

describe('#Glue.register', function () {
  it('should have register function', function () {
    expect(Glue).have.property('register').and.be.instanceof(Function);
  });

  it('should register module by string name', function () {
    var moduleType;

    Glue.register('helloModule');

    moduleType = Glue.modules.get('helloModule');

    expect(moduleType).be.instanceof(I.Map);

    assert.equal(
      moduleType.get('name'),
      'helloModule',
      'Module name assertation'
    );

    assert.equal(
      moduleType.get('directory'),
      __dirname,
      'Module directory assertation'
    );
  });

  it('should register module by object', function () {
    var moduleType, modulePath = join(__dirname, 't');

    Glue.register({
      name: 'helloModule2',
      directory: modulePath
    });

    moduleType = Glue.modules.get('helloModule2');

    expect(moduleType).be.instanceof(I.Map);

    assert.equal(
      moduleType.get('name'),
      'helloModule2',
      'Module name assertation'
    );

    assert.equal(
      moduleType.get('directory'),
      modulePath,
      'Module directory assertation'
    );
  });

  it('error handling', function () {
    try {
      Glue.register({});
    } catch (err) {
      var modulePrint = JSON.stringify({}, null, 4),
          expectedError = new Error(
            `In module options not exists name property.Module: ${modulePrint}`
          );

      assert.equal(err.message, expectedError.message, 'Error assertation');
    }
  });
});
