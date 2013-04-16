
goog.provide('wubbz.App');

goog.require('goog.dom');
goog.require('goog.events');
goog.require('goog.events.EventType');
goog.require('soy');
goog.require('wubbz');
goog.require('wubbz.Model');


/** @define {number} GOAL the target word count. */
wubbz.App.GOAL = 100;


/** @define {string} FIREBASE_TOKEN token to auth with firebase. */
wubbz.FIREBASE_TOKEN = 'lLrP441hjGKxp3y51qdgrr1ZF0ES6iqEbMeOmr34';


/** @define {string} FIREBASE_URL url for firebase requests. */
wubbz.FIREBASE_URL = 'https://wubbz.firebaseio.com';


/** Main function */
wubbz.App.init = function() {
  /**
   * Render the progress template.
   * @param {number} count
   * @param {number} percent
   */
  var renderProgress = function(count, percent) {
    var progress = document.createElement('section');
    soy.renderElement(progress, wubbz.progress, {
      goal: wubbz.App.GOAL,
      percent: percent,
      width: Math.max(1, percent)
    });

    var container = goog.dom.getElementByClass('container-progress');
    goog.dom.appendChild(container, progress);
  };

  /**
   * Render this word.
   * @param {string} name The name of the word.
   * @param {string} def What the word means.
   */
  var renderWord = function(name, def) {
    var container = goog.dom.getElementByClass('container-wordlist');
    var el = document.createElement('div');
    soy.renderElement(el, wubbz.word, {
      name: name,
      definition: def
    });

    goog.dom.appendChild(container, el);
  };

  /** Remove all of the children of the main container */
  var resetContainer = function() {
    var container = goog.dom.getElementByClass('container-wordlist');
    goog.dom.removeChildren(container);
  };

  var model = new wubbz.Model();
  model.load(function() {
    model.onCount(function(count) {
      var percent = Math.ceil(100 * (count / wubbz.App.GOAL));
      renderProgress(count, percent);
    });

    Path.map('#!/browse/:letter').to(function() {
      var letter = this['params']['letter'];
      model.onLetter(letter, function(wordToDef) {
        for (var word in wordToDef) {
          if (wordToDef.hasOwnProperty(word)) {
            renderWord(word, wordToDef[word]);
          }
        }
      });
    }).enter(resetContainer);

    var searchBtn = goog.dom.getElementByClass('btn-search');
    goog.events.listen(searchBtn, goog.events.EventType.CLICK, function(e) {
      resetContainer();
      var word = goog.dom.getElementByClass('search-query').value;
      model.onWord(word, function(word, def) {
        renderWord(word, def);
      });
    });

    Path.listen();
  });
};
goog.exportSymbol('wubbz.App.init', wubbz.App.init);
