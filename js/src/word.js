
goog.provide('wubbz.Word');


/**
 * @constructor
 * @param {string} name the word.
 * @param {string} definition an english description of the word.
 */
wubbz.Word = function(name, definition) {
  /** @type {string} */
  this.name = name;

  /** @type {string} */
  this.definition = definition;
};
