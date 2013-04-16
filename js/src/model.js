
goog.provide('wubbz.Model');

goog.require('wubbz.Word');



/** @constructor */
wubbz.Model = function() {
  /** @type {Firebase} */
  this.firebase = new Firebase(wubbz.FIREBASE_URL);

  this.cache = {
    count: 0,
    letters: {},
    words: {}
  };

  /** @type {boolean} */
  this.authorized = false;

  /** Array.<Function> */
  this.countListeners = [];

  /** Map from letter to array of callbacks. */
  this.letterToListeners = {};

  /** Map from word to array of callbacks. */
  this.wordToListeners = {};
};


/**
 * Subscribe to words in the Model by exact match.
 * @param {string} word A potential Model word.
 * @param {Function} cb A function to call when we get new data.
 *     The callback will be called with a word and its definition.
 */
wubbz.Model.prototype.onWord = function(word, cb) {
  if (!this.wordToListeners.hasOwnProperty(word)) {
    this.wordToListeners[word] = [];
  }

  this.wordToListeners[word].push(cb);
  cb.call(null, word, this.cache.words[word]);
};


/**
 * Unsubscribe to words in the Model by exact match.
 * @param {string} word A potential Model word.
 * @param {Function} cb The function we passed to onWord.
 */
wubbz.Model.prototype.offWord = function(word, cb) {
  var listeners = this.wordToListeners[word];
  var tmp = [];
  for (var i = 0; i < listeners.length; i++) {
    var listener = listeners[i];
    if (cb !== listener) {
      tmp.push(listener);
    }
  }

  this.wordToListeners[word] = tmp;
};


/**
 * Subscribe to words in the Model that begin with some letter.
 * @param {string} letter that the words begin with.
 * @param {Function} cb A function to call when we get new data.
 *     The callback will be called with a map from words onto their defs.
 */
wubbz.Model.prototype.onLetter = function(letter, cb) {
  letter = letter.toUpperCase();
  if (!this.letterToListeners.hasOwnProperty(letter)) {
    this.letterToListeners[letter] = [];
  }

  this.letterToListeners[letter].push(cb);
  
  cb.call(null, this.cache.letters[letter]);
};


/**
 * Unsubscribe to words in the Model that begin with some letter.
 * @param {string} letter that the words begin with.
 * @param {Function} cb The function we passed to onLetter.
 */
wubbz.Model.prototype.offLetter = function(letter, cb) {
  letter = letter.toUpperCase();
  var listeners = this.letterToListeners[letter];
  var tmp = [];
  for (var i = 0; i < listeners.length; i++) {
    var listener = listeners[i];
    if (cb !== listener) {
      tmp.push(listener);
    }
  }

  this.wordToListeners[letter] = tmp;
};


/**
 * Subscribe to Model word count.
 * @param {Function} cb A function to call when we get new data.
 *     The callback will be called with a numeric count.
 */
wubbz.Model.prototype.onCount = function(cb) {
  this.countListeners.push(cb);
  cb.call(null, this.cache.count);
};


/**
 * Unsubscribe to Model word count.
 * @param {Function} cb A function to call when we get new data.
 */
wubbz.Model.prototype.offCount = function(cb) {
  var tmp = [];
  for (var i = 0; i < this.countListeners.length; i++) {
    var listener = this.countListeners[i];
    if (cb !== listener) {
      tmp.push(cb);
    }
  }

  this.countListeners = tmp;
};


/**
 * @param {Function} cb function callback.
 */
wubbz.Model.prototype.load = function(cb) {
  if (!this.authorized) {
    this.firebase.auth(wubbz.FIREBASE_TOKEN);
  }

  this.firebase.on('value', function(snapshot) {
    console.log(this);
    this.onValue(snapshot, cb);
  }.bind(this));
};


/**
 * @param {DataSnapshot} snapshot.
 * @param {Function=} opt_cb function callback.
 */
wubbz.Model.prototype.onValue = function(snapshot, opt_cb) {
  this.cache = snapshot.val();

  // Report count
  for (var i = 0; i < this.countListeners.length; i++) {
    var listener = this.countListeners[i];
    listener.call(null, this.cache.count);
  }

  // Report letters
  for (var letter in this.letterToListeners) {
    if (this.letterToListeners.hasOwnProperty(letter)) {
      var listeners = this.letterToListeners[letter];
      for (var i = 0; i < listeners.length; i++) {
        var listener = listeners[i];
        listener.call(null, this.cache.letters[letter]);
      }
    }
  }

  // Report words
  for (var word in this.wordToListeners) {
    if (this.wordToListeners.hasOwnProperty(word)) {
      var listeners = this.wordToListeners[word];
      for (var i = 0; i < listeners.length; i++) {
        var listener = listeners[i];
        listener.call(null, this.cache.words[word]);
      }
    }
  }

  if (opt_cb !== undefined) {
    opt_cb.call(null);
  }
};
