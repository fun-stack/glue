
import { basename } from 'path';

import I from 'immutable';
import R from 'ramda';

import Debug from './debug';

var GlueOptions = I.Map();

var Glue = {
  modules: I.Map(),
  register: register,
  debug: Debug
};

/**
 * Set new type by string
 *
 * @param {String}  typeName  Path to module type
 */
function registerStringType (typeName) {
  Glue.modules = Glue.modules.set(typeName, I.fromJS({
    name: typeName,
    directory: GlueOptions.get('rootDirectory')
  }));
}

/**
 * Set new type by object notation
 *
 * @param {String}  typeName  Path to module type
 */
function registerObjectType (options) {
  if (!options.name) {
    var modulePrint = JSON.stringify(options, null, 4);

    throw new Error(
      `In module options not exists name property.Module: ${modulePrint}`
    );
  }

  options.directory = options.directory || GlueOptions.get('rootDirectory');

  Glue.modules = Glue.modules.set(options.name, I.fromJS(options));
}

/**
 * Register new type of component
 *
 * @example
 * 		Glue.register('typename'); // Root directory for type will be root directory of glue
 * 		var options = { name: 'typename', directory: 'nameOFdirectory' };
 * 		Glue.register(options); // Root directory fo rtype will be 'nameOFdirectory', relative root directory of glue
 *
 * @param  {String | Object} type Options of new type. Can be Strong or Object.
 * @return {[type]}      [description]
 */
function register (type) {
  R.ifElse(
    R.curry(R.is(Object)),
    registerObjectType,
    registerStringType
  )(type);
}

/**
 * Glue constructor
 * @param  {String} [rootDirecotry] Root directory for glue components
 * @return {Object}                 Glue API
 */
module.exports = function (rootDirecotry) {
  var root = rootDirecotry;

  if (!rootDirecotry) {
    root = basename(module.parent.filename);
  }

  GlueOptions = GlueOptions.set('rootDirectory', root);

  return Glue;
};
