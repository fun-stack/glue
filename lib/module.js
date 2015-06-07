
import I from 'immutable';
import R from 'ramda';

/**
 * Some shortcuts to ease immutable structs construction
 * https://github.com/tonsky/vec/blob/gh-pages/vec.js
 */

var list = function () { return I.List.of.apply(I.List, arguments); },
    map  = function () { return I.Map.apply(I, arguments); },
    fjs  = function () { return I.fromJS.apply(I, arguments); };

/**
 * Return new atom-module
 * @param {T} value Module value
 */
export function atom(value) {
  return {
    value: value,
    at: 0,
    history: list().push({ value: value })
  };
}

/**
 * Undo of atom
 * @param {atom}  atom  Atom for change value
 */
export function undo (atom) {
  return function () {
    if (atom.at <= 0) {
      return atom;
    }

    atom.value = atom.history.get(atom.at - 1).value;
    atom.at--;

    return atom;
  };
}

/**
 * Redo of atom
 * @param {atom}  atom  Atom for change value
 */
export function redo (atom) {
  return function () {
    var history = atom.history,
        at      = atom.at;

    if (at > history.size-1) {
      return atom;
    }

    atom.value = atom.history.get(atom.at+1).value;
    atom.at++;

    return atom;
  };
}

/**
 * Set new value for atom
 * @param   {atom}  atom  Atom, wich property
 * @param   {T}     value Value for set
 * @return  {atom}
 */
export function set(atom, value) {
  atom.history = atom.history.push({ value: value });
  atom.at++;

  atom.value = value;

  return atom;
}

/**
 * Get value from atom
 * @param   {atom}  atom  Atom, wich property
 */
export function get(atom) {
  return function (key) {
    if (!key) {
      return atom.value;
    }

    return atom.get(key);
  };
}

/**
 * Create new Immutability module
 * @param {T} value Glued module
 */
export function Module(value) {
  let newAtom = atom(value);

  return {
    atom: newAtom,
    undo: undo(newAtom),
    redo: redo(newAtom),
    get: get(newAtom),
    set: R.curry(set)(newAtom)
  };
}
