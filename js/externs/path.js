
var Path = {
  core: {}
};


Path.listen = function() {};


/**
 * @param {string} path the urlpath.
 * @return {Path.core.route}
 */
Path.map = function(path) {};


/**
 * @param {string} root the root path.
 */
Path.root = function(root) {};


/**
 * @constructor
 * @param {string} path the urlpath.
 */
Path.core.route = function(path) {};


/**
 * @param {Function} fn the function that the path should point to.
 * @return {Path.core.route}
 */
Path.core.route.prototype.to = function(fn) {};


/**
 * @param {Function|Array} fns any functions to call on entering this path.
 * @return {Path.core.route}
 */
Path.core.route.prototype.enter = function(fns) {};


/**
 * @param {Function|Array} fns any functions to call on exiting this path.
 * @return {Path.core.route}
 */
Path.core.route.prototype.exit = function(fns) {};
