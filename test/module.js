
import { join } from 'path';

import { assert, expect } from 'chai';
import { List, Map, fromJS } from 'immutable';

import {
  atom,
  set,
  undo,
  redo,
  Module
} from '../lib/module';

describe('#Glue.module', function () {
  it('should return atom', function () {
    let moduleAtom = atom({});

    expect(moduleAtom).have.property('value');
    expect(moduleAtom).have.property('at').and.be.a('number');
    expect(moduleAtom).have.property('history').and.instanceof(List);
  });

  it('.Module should return module object', function () {
    let inst = Module({});

    expect(inst).have.property('atom');
    expect(inst).have.property('undo');
    expect(inst).have.property('redo');
    expect(inst).have.property('get');
    expect(inst).have.property('set');
  });

  it('.set should incerement of statement', function () {
    let inst = Module({});

    inst.set({hello: 'world'});
    assert(inst.atom.at, 1, 'Increment history state');
  });

  it('should store changes of atom', function () {
    let inst = Module({});

    inst.set({hello: 'world'});
    expect(inst.get()).to.eql({hello: 'world'});
    expect(inst.atom.history.count()).to.equal(2);

    expect(inst.atom.history.get(0).value).to.eql({});
    expect(inst.atom.history.get(1).value).to.eql({hello: 'world'});
  });

  it('should undo value', function () {
    let inst = Module({});

    inst.set({hello: 'world'});
    expect(inst.get()).to.eql({hello: 'world'});

    inst.undo();
    expect(inst.get()).to.eql({});
  });

  it('should redo value', function () {
    let inst = Module({});

    inst.set({hello: 'world'});
    expect(inst.get()).to.eql({hello: 'world'});

    inst.undo();
    expect(inst.get()).to.eql({});

    inst.redo();
    expect(inst.get()).to.eql({hello: 'world'});
  });
});
