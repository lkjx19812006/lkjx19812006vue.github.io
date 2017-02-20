/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 56);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
module.exports = function() {
	var list = [];

	// return the list of modules as css string
	list.toString = function toString() {
		var result = [];
		for(var i = 0; i < this.length; i++) {
			var item = this[i];
			if(item[2]) {
				result.push("@media " + item[2] + "{" + item[1] + "}");
			} else {
				result.push(item[1]);
			}
		}
		return result.join("");
	};

	// import a list of modules into the list
	list.i = function(modules, mediaQuery) {
		if(typeof modules === "string")
			modules = [[null, modules, ""]];
		var alreadyImportedModules = {};
		for(var i = 0; i < this.length; i++) {
			var id = this[i][0];
			if(typeof id === "number")
				alreadyImportedModules[id] = true;
		}
		for(i = 0; i < modules.length; i++) {
			var item = modules[i];
			// skip already imported module
			// this implementation is not 100% perfect for weird media query combinations
			//  when a module is imported multiple times with different media queries.
			//  I hope this will never occur (Hey this way we have smaller bundles)
			if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
				if(mediaQuery && !item[2]) {
					item[2] = mediaQuery;
				} else if(mediaQuery) {
					item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
				}
				list.push(item);
			}
		}
	};
	return list;
};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

module.exports = function normalizeComponent (
  rawScriptExports,
  compiledTemplate,
  scopeId,
  cssModules
) {
  var esModule
  var scriptExports = rawScriptExports = rawScriptExports || {}

  // ES6 modules interop
  var type = typeof rawScriptExports.default
  if (type === 'object' || type === 'function') {
    esModule = rawScriptExports
    scriptExports = rawScriptExports.default
  }

  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (compiledTemplate) {
    options.render = compiledTemplate.render
    options.staticRenderFns = compiledTemplate.staticRenderFns
  }

  // scopedId
  if (scopeId) {
    options._scopeId = scopeId
  }

  // inject cssModules
  if (cssModules) {
    var computed = options.computed || (options.computed = {})
    Object.keys(cssModules).forEach(function (key) {
      var module = cssModules[key]
      computed[key] = function () { return module }
    })
  }

  return {
    esModule: esModule,
    exports: scriptExports,
    options: options
  }
}


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/

var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

var listToStyles = __webpack_require__(53)

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

module.exports = function (parentId, list, _isProduction) {
  isProduction = _isProduction

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = { css: css, media: media, sourceMap: sourceMap }
    if (!newStyles[id]) {
      part.id = parentId + ':0'
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      part.id = parentId + ':' + newStyles[id].parts.length
      newStyles[id].parts.push(part)
    }
  }
  return styles
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[data-vue-ssr-id~="' + obj.id + '"]')
  var hasSSR = styleElement != null

  // if in production mode and style is already provided by SSR,
  // simply do nothing.
  if (hasSSR && isProduction) {
    return noop
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = styleElement || createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (!hasSSR) {
    update(obj)
  }

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),
/* 3 */
/***/ (function(module, exports) {

/*
	MIT License http://www.opensource.org/licenses/mit-license.php
	Author Tobias Koppers @sokra
*/
var stylesInDom = {},
	memoize = function(fn) {
		var memo;
		return function () {
			if (typeof memo === "undefined") memo = fn.apply(this, arguments);
			return memo;
		};
	},
	isOldIE = memoize(function() {
		return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
	}),
	getHeadElement = memoize(function () {
		return document.head || document.getElementsByTagName("head")[0];
	}),
	singletonElement = null,
	singletonCounter = 0,
	styleElementsInsertedAtTop = [];

module.exports = function(list, options) {
	if(typeof DEBUG !== "undefined" && DEBUG) {
		if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
	}

	options = options || {};
	// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
	// tags it will allow on a page
	if (typeof options.singleton === "undefined") options.singleton = isOldIE();

	// By default, add <style> tags to the bottom of <head>.
	if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

	var styles = listToStyles(list);
	addStylesToDom(styles, options);

	return function update(newList) {
		var mayRemove = [];
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			domStyle.refs--;
			mayRemove.push(domStyle);
		}
		if(newList) {
			var newStyles = listToStyles(newList);
			addStylesToDom(newStyles, options);
		}
		for(var i = 0; i < mayRemove.length; i++) {
			var domStyle = mayRemove[i];
			if(domStyle.refs === 0) {
				for(var j = 0; j < domStyle.parts.length; j++)
					domStyle.parts[j]();
				delete stylesInDom[domStyle.id];
			}
		}
	};
}

function addStylesToDom(styles, options) {
	for(var i = 0; i < styles.length; i++) {
		var item = styles[i];
		var domStyle = stylesInDom[item.id];
		if(domStyle) {
			domStyle.refs++;
			for(var j = 0; j < domStyle.parts.length; j++) {
				domStyle.parts[j](item.parts[j]);
			}
			for(; j < item.parts.length; j++) {
				domStyle.parts.push(addStyle(item.parts[j], options));
			}
		} else {
			var parts = [];
			for(var j = 0; j < item.parts.length; j++) {
				parts.push(addStyle(item.parts[j], options));
			}
			stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
		}
	}
}

function listToStyles(list) {
	var styles = [];
	var newStyles = {};
	for(var i = 0; i < list.length; i++) {
		var item = list[i];
		var id = item[0];
		var css = item[1];
		var media = item[2];
		var sourceMap = item[3];
		var part = {css: css, media: media, sourceMap: sourceMap};
		if(!newStyles[id])
			styles.push(newStyles[id] = {id: id, parts: [part]});
		else
			newStyles[id].parts.push(part);
	}
	return styles;
}

function insertStyleElement(options, styleElement) {
	var head = getHeadElement();
	var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
	if (options.insertAt === "top") {
		if(!lastStyleElementInsertedAtTop) {
			head.insertBefore(styleElement, head.firstChild);
		} else if(lastStyleElementInsertedAtTop.nextSibling) {
			head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
		} else {
			head.appendChild(styleElement);
		}
		styleElementsInsertedAtTop.push(styleElement);
	} else if (options.insertAt === "bottom") {
		head.appendChild(styleElement);
	} else {
		throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
	}
}

function removeStyleElement(styleElement) {
	styleElement.parentNode.removeChild(styleElement);
	var idx = styleElementsInsertedAtTop.indexOf(styleElement);
	if(idx >= 0) {
		styleElementsInsertedAtTop.splice(idx, 1);
	}
}

function createStyleElement(options) {
	var styleElement = document.createElement("style");
	styleElement.type = "text/css";
	insertStyleElement(options, styleElement);
	return styleElement;
}

function createLinkElement(options) {
	var linkElement = document.createElement("link");
	linkElement.rel = "stylesheet";
	insertStyleElement(options, linkElement);
	return linkElement;
}

function addStyle(obj, options) {
	var styleElement, update, remove;

	if (options.singleton) {
		var styleIndex = singletonCounter++;
		styleElement = singletonElement || (singletonElement = createStyleElement(options));
		update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
		remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
	} else if(obj.sourceMap &&
		typeof URL === "function" &&
		typeof URL.createObjectURL === "function" &&
		typeof URL.revokeObjectURL === "function" &&
		typeof Blob === "function" &&
		typeof btoa === "function") {
		styleElement = createLinkElement(options);
		update = updateLink.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
			if(styleElement.href)
				URL.revokeObjectURL(styleElement.href);
		};
	} else {
		styleElement = createStyleElement(options);
		update = applyToTag.bind(null, styleElement);
		remove = function() {
			removeStyleElement(styleElement);
		};
	}

	update(obj);

	return function updateStyle(newObj) {
		if(newObj) {
			if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
				return;
			update(obj = newObj);
		} else {
			remove();
		}
	};
}

var replaceText = (function () {
	var textStore = [];

	return function (index, replacement) {
		textStore[index] = replacement;
		return textStore.filter(Boolean).join('\n');
	};
})();

function applyToSingletonTag(styleElement, index, remove, obj) {
	var css = remove ? "" : obj.css;

	if (styleElement.styleSheet) {
		styleElement.styleSheet.cssText = replaceText(index, css);
	} else {
		var cssNode = document.createTextNode(css);
		var childNodes = styleElement.childNodes;
		if (childNodes[index]) styleElement.removeChild(childNodes[index]);
		if (childNodes.length) {
			styleElement.insertBefore(cssNode, childNodes[index]);
		} else {
			styleElement.appendChild(cssNode);
		}
	}
}

function applyToTag(styleElement, obj) {
	var css = obj.css;
	var media = obj.media;

	if(media) {
		styleElement.setAttribute("media", media)
	}

	if(styleElement.styleSheet) {
		styleElement.styleSheet.cssText = css;
	} else {
		while(styleElement.firstChild) {
			styleElement.removeChild(styleElement.firstChild);
		}
		styleElement.appendChild(document.createTextNode(css));
	}
}

function updateLink(linkElement, obj) {
	var css = obj.css;
	var sourceMap = obj.sourceMap;

	if(sourceMap) {
		// http://stackoverflow.com/a/26603875
		css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
	}

	var blob = new Blob([css], { type: "text/css" });

	var oldSrc = linkElement.href;

	linkElement.href = URL.createObjectURL(blob);

	if(oldSrc)
		URL.revokeObjectURL(oldSrc);
}


/***/ }),
/* 4 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),
/* 5 */
/***/ (function(module, exports) {

module.exports = "data:application/vnd.ms-fontobject;base64,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"

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(47)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(27),
  /* template */
  __webpack_require__(41),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\Users\\Administrator\\Desktop\\Vue点餐\\src\\components\\userInfo.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] userInfo.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-0aaacb77", Component.options)
  } else {
    hotAPI.reload("data-v-0aaacb77", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(29);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(3)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/autoprefixer-loader/index.js!./animation.css", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/autoprefixer-loader/index.js!./animation.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(30);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(3)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/autoprefixer-loader/index.js!./base.css", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/autoprefixer-loader/index.js!./base.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(31);
if(typeof content === 'string') content = [[module.i, content, '']];
// add the styles to the DOM
var update = __webpack_require__(3)(content, {});
if(content.locals) module.exports = content.locals;
// Hot Module Replacement
if(false) {
	// When the styles change, update the <style> tags
	if(!content.locals) {
		module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/autoprefixer-loader/index.js!./iconfont.css", function() {
			var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/autoprefixer-loader/index.js!./iconfont.css");
			if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
			update(newContent);
		});
	}
	// When the module is disposed, remove the <style> tags
	module.hot.dispose(function() { update(); });
}

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports = "data:application/vnd.ms-fontobject;base64,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"

/***/ }),
/* 11 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiID4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8bWV0YWRhdGE+CkNyZWF0ZWQgYnkgRm9udEZvcmdlIDIwMTIwNzMxIGF0IFNhdCBGZWIgMTggMjA6NDg6MTAgMjAxNwogQnkgYWRtaW4KPC9tZXRhZGF0YT4KPGRlZnM+Cjxmb250IGlkPSJpY29uZm9udCIgaG9yaXotYWR2LXg9IjEwMjQiID4KICA8Zm9udC1mYWNlIAogICAgZm9udC1mYW1pbHk9Imljb25mb250IgogICAgZm9udC13ZWlnaHQ9IjUwMCIKICAgIGZvbnQtc3RyZXRjaD0ibm9ybWFsIgogICAgdW5pdHMtcGVyLWVtPSIxMDI0IgogICAgcGFub3NlLTE9IjIgMCA2IDMgMCAwIDAgMCAwIDAiCiAgICBhc2NlbnQ9Ijg5NiIKICAgIGRlc2NlbnQ9Ii0xMjgiCiAgICB4LWhlaWdodD0iNzkyIgogICAgYmJveD0iMCAtMjAwIDExMTQgODk2LjAxNCIKICAgIHVuZGVybGluZS10aGlja25lc3M9IjAiCiAgICB1bmRlcmxpbmUtcG9zaXRpb249IjAiCiAgICB1bmljb2RlLXJhbmdlPSJVKzAwNzgtRTY4QyIKICAvPgo8bWlzc2luZy1nbHlwaCAKIC8+CiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0iLm5vdGRlZiIgCiAvPgogICAgPGdseXBoIGdseXBoLW5hbWU9Ii5ub3RkZWYiIAogLz4KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSIubnVsbCIgaG9yaXotYWR2LXg9IjAiIAogLz4KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJub25tYXJraW5ncmV0dXJuIiBob3Jpei1hZHYteD0iMzQxIiAKIC8+CiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0ieCIgdW5pY29kZT0ieCIgaG9yaXotYWR2LXg9IjEwMDEiIApkPSJNMjgxIDU0M3EtMjcgLTEgLTUzIC0xaC04M3EtMTggMCAtMzYuNSAtNnQtMzIuNSAtMTguNXQtMjMgLTMydC05IC00NS41di03Nmg5MTJ2NDFxMCAxNiAtMC41IDMwdC0wLjUgMThxMCAxMyAtNSAyOXQtMTcgMjkuNXQtMzEuNSAyMi41dC00OS41IDloLTEzM3YtOTdoLTQzOHY5N3pNOTU1IDMxMHYtNTJxMCAtMjMgMC41IC01MnQwLjUgLTU4dC0xMC41IC00Ny41dC0yNiAtMzB0LTMzIC0xNnQtMzEuNSAtNC41cS0xNCAtMSAtMjkuNSAtMC41CnQtMjkuNSAwLjVoLTMybC00NSAxMjhoLTQzOWwtNDQgLTEyOGgtMjloLTM0cS0yMCAwIC00NSAxcS0yNSAwIC00MSA5LjV0LTI1LjUgMjN0LTEzLjUgMjkuNXQtNCAzMHYxNjdoOTExek0xNjMgMjQ3cS0xMiAwIC0yMSAtOC41dC05IC0yMS41dDkgLTIxLjV0MjEgLTguNXExMyAwIDIyIDguNXQ5IDIxLjV0LTkgMjEuNXQtMjIgOC41ek0zMTYgMTIzcS04IC0yNiAtMTQgLTQ4cS01IC0xOSAtMTAuNSAtMzd0LTcuNSAtMjV0LTMgLTE1dDEgLTE0LjUKdDkuNSAtMTAuNXQyMS41IC00aDM3aDY3aDgxaDgwaDY0aDM2cTIzIDAgMzQgMTJ0MiAzOHEtNSAxMyAtOS41IDMwLjV0LTkuNSAzNC41cS01IDE5IC0xMSAzOWgtMzY4ek0zMzYgNDk4djIyOHEwIDExIDIuNSAyM3QxMCAyMS41dDIwLjUgMTUuNXQzNCA2aDE4OHEzMSAwIDUxLjUgLTE0LjV0MjAuNSAtNTIuNXYtMjI3aC0zMjd6IiAvPgogICAgPGdseXBoIGdseXBoLW5hbWU9ImNhaWRhbiIgdW5pY29kZT0iJiN4MzQzNTsiIGhvcml6LWFkdi14PSIxMDAwIiAKZD0iTTAgODAwaDEwMDB2LTEwMDBoLTEwMDB2MTAwMHYwek03NzggNTc4aC01NTZxLTIzIDAgLTM5IC0xNi41dC0xNiAtMzkuNXQxNiAtMzl0MzkgLTE2aDU1NnEyMyAwIDM5IDE2dDE2IDM5dC0xNiAzOS41dC0zOSAxNi41djB6TTc3OCAzNTZoLTU1NnEtMjMgMCAtMzkgLTE2LjV0LTE2IC0zOS41dDE2IC0zOS41dDM5IC0xNi41aDU1NnEyMyAwIDM5IDE2LjV0MTYgMzkuNXQtMTYgMzkuNXQtMzkgMTYuNXYwek03NzggMTMzaC01NTYKcS0yMyAwIC0zOSAtMTZ0LTE2IC0zOXQxNiAtMzkuNXQzOSAtMTYuNWg1NTZxMjMgMCAzOSAxNi41dDE2IDM5LjV0LTE2IDM5dC0zOSAxNnYwek03NzggMTMzeiIgLz4KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJqaWEiIHVuaWNvZGU9IiYjeDM0NjA7IiBob3Jpei1hZHYteD0iMTAwMCIgCmQ9Ik04MjEgMzQ1aC0yNzh2Mjc4cTAgMTggLTEyLjUgMzAuNXQtMzAuNSAxMi41dC0zMC41IC0xMi41dC0xMi41IC0zMC41di0yNzhoLTI3OHEtMTggMCAtMzAuNSAtMTIuNXQtMTIuNSAtMzAuNXQxMi41IC0zMXQzMC41IC0xM2gyNzh2LTI3N3EwIC0xOCAxMi41IC0zMXQzMC41IC0xM3QzMC41IDEzdDEyLjUgMzF2Mjc3aDI3OHExOCAwIDMwLjUgMTN0MTIuNSAzMXQtMTIuNSAzMC41dC0zMC41IDEyLjV6IiAvPgogICAgPGdseXBoIGdseXBoLW5hbWU9ImRpbmd3ZWkiIHVuaWNvZGU9IiYjeGU2MDM7IiAKZD0iTTc4OCA0NzJxMCAxMTQgLTgxIDE5NC41dC0xOTUgODAuNXQtMTk0LjUgLTgwLjV0LTgwLjUgLTE5NC41cTAgLTc0IDM3IC0xMzh2MGwyMzggLTQ4MmwyMzkgNDgyaC0xcTM4IDY0IDM4IDEzOHpNNTEyIDM5MHEtNDggMCAtODEuNSAzNHQtMzMuNSA4MnQzMy41IDgxLjV0ODEuNSAzMy41dDgyIC0zMy41dDM0IC04MS41dC0zNCAtODJ0LTgyIC0zNHoiIC8+CiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0iamlhbiIgdW5pY29kZT0iJiN4ZTY2MzsiIApkPSJNOTUgMzM2aDgzM3YtNzJoLTgzM3Y3MnoiIC8+CiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0iemhlbmdxdWUiIHVuaWNvZGU9IiYjeGU2MTM7IiAKZD0iTTUxMiA2ODNxLTEwNCAwIC0xOTIuNSAtNTF0LTEzOS41IC0xMzkuNXQtNTEgLTE5Mi41dDUxIC0xOTIuNXQxMzkuNSAtMTM5LjV0MTkyLjUgLTUxdDE5Mi41IDUxdDEzOS41IDEzOS41dDUxIDE5Mi41dC01MSAxOTIuNXQtMTM5LjUgMTM5LjV0LTE5Mi41IDUxek03NTMgNDI2bC0yODYgLTI4NnEtNyAtNyAtMTcgLTd0LTE3IDdsLTE2MSAxNjFxLTcgNyAtNyAxN3Q3IDE3dDE2LjUgN3QxNi41IC03bDE0NSAtMTQ0bDI2OSAyNjlxNyA3IDE3IDcKdDE3IC03dDcgLTE3dC03IC0xN3oiIC8+CiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0iZmFuaHVpIiB1bmljb2RlPSImI3hlNjNkOyIgCmQ9Ik04MDEgMzk1cTQyIC0yNSA4Mi41IC04NHQ1OS41IC0xMzFxMjIgLTg0IDIyIC0xOTBxLTM0IDU1IC00OCA3NXEtMTEgMTUgLTI4IDM0dC01NS41IDQ5LjV0LTgwLjUgNDkuNXEtNDAgMTkgLTEwMC41IDI3LjV0LTEwMS41IDcuNWgtNDF2LTE3NWwtNDE5IDI5N2w0MTkgMjk3di0xNzZxMTAxIC04IDE1NCAtMTlxMzkgLTggNzMuNSAtMjMuNXQ0OC41IC0yNy41eiIgLz4KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJrb25nZ291d3VjaGUiIHVuaWNvZGU9IiYjeGU2MjA7IiAKZD0iTTgxMSAzcS0zOSAwIC02Ni41IC0yOHQtMjcuNSAtNjYuNXQyNy41IC02Ni41dDY2LjUgLTI4dDY2LjUgMjh0MjcuNSA2N3QtMjcuNSA2Ni41dC02Ni41IDI3LjV6TTM4OCAzcS0zOSAwIC02Ni41IC0yOHQtMjcuNSAtNjYuNXQyNy41IC02Ni41dDY2LjUgLTI4dDY2LjUgMjh0MjcuNSA2N3QtMjcuNSA2Ni41dC02Ni41IDI3LjV6TTEwMTQgNjM3cS0xNiAyNCAtNDggMjhoLTNoLTc0N3EtNyAzMiAtOSA0M3EtNiAyMyAtMTYgMzh0LTIxIDIxCnQtMTguNSA4dC0xNC41IDJoLTExNHEtMTAgMCAtMTYuNSAtNi41dC02LjUgLTE2dDYuNSAtMTZ0MTYuNSAtNi41aDExNHExNiAwIDI2IC0zNXEyIC0xMCAxMSAtNTl2MHEyNCAtMTI3IDg5IC00OTJsNiAtMzJxMyAtMTkgMTkuNSAtMzMuNXQ1Mi41IC0xNC41aDU4MHExMCAwIDE2LjUgNi41dDYuNSAxNnQtNi41IDE2dC0xNS41IDYuNWgtNTgxcS0yNSAwIC0yNyAxMWwtNiAzMXEtMSA2IC0xNyA5Nmg1NjRxNDAgMCA2My41IDIydDI5LjUgNDYKcTAgMSAxNSA1NXQzMi41IDExOS41dDI0LjUgODcuNXExMCAzNCAtNiA1OHoiIC8+CiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0id29kZSIgdW5pY29kZT0iJiN4ZTYwNTsiIGhvcml6LWFkdi14PSIxMTE1IiAKZD0iTTY2OSAtMTE4cS04NyAwIC0xNjMuNSA3dC0xMjYuNSAxNy41dC04Ni41IDIzdC01Mi41IDIzdC0xNiAxOC41cTAgMTI2IDY0LjUgMjM0dDE3MS41IDE2NnE1IDMgOCA1cTEwMiAtNzIgMjA0IC03MnQyMDMgNzFxOSAtNCAyMiAtMTJxOTkgLTYxIDE1OCAtMTY2LjV0NTkgLTIyNS41cTAgLTggLTE2IC0xOC41dC01MiAtMjN0LTg2IC0yM3QtMTI2LjUgLTE3LjV0LTE2NC41IC03djB6TTE3MiAtMTI4ek02NzYgODk2CnEtMTE4IDAgLTIwMS41IC04NHQtODMuNSAtMjAyLjV0ODMuNSAtMjAydDIwMS41IC04My41dDIwMiA4My41dDg0IDIwMnQtODQgMjAyLjV0LTIwMiA4NHpNNDg3IDUyM3EtNiAtNyAtMTUuNSAtN3QtMTYgNi41dC02LjUgMTZ0NyAxNi41cTYgNiAxNS41IDZ0MTUuNSAtNnE3IC03IDcgLTE2dC03IC0xNnpNNjYzIDgwMXEtNzQgMCAtMTI1LjUgLTUydC01MS41IC0xMjVxMCAtOSAtNi41IC0xNS41dC0xNS41IC02LjV0LTE1LjUgNi41CnQtNi41IDE1LjVxMCA5MiA2NC41IDE1N3QxNTYuNSA2NXE5IDAgMTUuNSAtNi41dDYuNSAtMTZ0LTYuNSAtMTZ0LTE1LjUgLTYuNXoiIC8+CiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0iZGluZ2RhbiIgdW5pY29kZT0iJiN4ZTYwNDsiIApkPSJNNjI3IDUxMXEtMTcgMCAtMzQgMTd0LTE3IDM0djI3MmgtMzcwcS0zOCAwIC02NSAtMjd0LTI3IC02NXYtNzIxcTAgLTM2IDI1LjUgLTYxLjV0NjEuNSAtMjUuNWg2MTBxMzYgMCA2MS41IDI1LjV0MjUuNSA2MS41djQ5MGgtMjcxek03MDMgMTYxcTAgLTE0IC05LjUgLTIzdC0yMi41IC05aC0zMThxLTEzIDAgLTIyLjUgOXQtOS41IDIzdjRxMCAxMyA5LjUgMjIuNXQyMi41IDkuNWgzMThxMTMgMCAyMi41IC05LjV0OS41IC0yMi41di00egpNNzAzIDI4OXEwIC0xMyAtOS41IC0yMi41dC0yMi41IC05LjVoLTMxOHEtMTMgMCAtMjIuNSA5LjV0LTkuNSAyMi41djRxMCAxMyA5LjUgMjIuNXQyMi41IDkuNWgzMThxMTMgMCAyMi41IC05LjV0OS41IC0yMi41di00ek03MDMgNDE2cTAgLTEzIC05LjUgLTIyLjV0LTIyLjUgLTkuNWgtMzE4cS0xMyAwIC0yMi41IDkuNXQtOS41IDIyLjV2NHEwIDEzIDkuNSAyMi41dDIyLjUgOS41aDMxOHExMyAwIDIyLjUgLTkuNXQ5LjUgLTIyLjV2LTR6Ck02NDQgODE3di0yMzhoMjM3cS0yMzEgMjMwIC0yMzcgMjM4eiIgLz4KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJ0dWJpYW8xMSIgdW5pY29kZT0iJiN4ZTYxNTsiIApkPSJNMjQwIDg5NWgxNjRxNjYgMCA2NiAtNjZ2LTM0MHEtMSAtMzEgLTE3LjUgLTQ3dC00Ni41IC0xNnEtMTUxIC0xIC0zNDAgMHEtNjYgMSAtNjUgNjdxMCAxODkgLTEgMzM0cTAgNjkgNzAgNjhoMTcwdjB6TTc5NiA4OTZoMTU4cTcwIDEgNzAgLTY4cS0xIC0xNTYgMCAtMzM0cTAgLTY4IC03MSAtNjhoLTMyOHEtNzIgLTEgLTcxIDc0djMyMnEwIDM3IDE3IDU1LjV0NTUgMTcuNWgxNzB2MXpNMjMwIDM0MWgxNjRxNzYgMiA3NiAtNzB2LTMyOQpxMCAtMzUgLTE2LjUgLTUyLjV0LTUyLjUgLTE2LjVxLTE1MyAxIC0zMzUgMHEtNjUgLTEgLTY1IDY1djE2OHYxNjdxMCA2OSA3MSA2OHE1IC0xIDc5IC0wLjV0NzkgMC41ek0xMDIzIDEwNXYtNTMuNXYtNjN2LTUzLjVxMCAtNjIgLTYyIC02MmgtMzQwcS02NiAtMSAtNjYgNjVxLTEgMTMwIC0xIDMzNHEwIDY5IDcwIDY5aDMzNHE2NiAwIDY1IC02NnYtMTcweiIgLz4KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJzaG91eWUtc2hvdXllIiB1bmljb2RlPSImI3hlNjA2OyIgCmQ9Ik05MzcgNDM0cS0xIDIxIC0xNCA0MGwtMzE5IDM0MnEtMzMgMzQgLTgwIDM0djFoLTAuNWgtMWgtMWgtMC41di0xcS00OCAwIC04MSAtMzRxLTMxNiAtMzM5IC0zMTggLTM0MnEtMTQgLTE5IC0xNCAtNDB2LTZxMCAtMzUgMjQuNSAtNTkuNXQ1OS41IC0yNC41aDIwdi0zMDBxMCAtMzcgMjguNSAtNjN0NjkgLTI2dDY5LjUgMjZ0MjkgNjN2MzAwaDIyOXYtMzAwcTAgLTM3IDI4LjUgLTYzdDY5LjUgLTI2dDY5LjUgMjZ0MjguNSA2M3YzMDBoMjAKcTM1IDAgNTkuNSAyNC41dDI0LjUgNTkuNXYwLjV2MC41djV6TTgxMiA3MzZ2MGw2MyAtNjdxNyAtNyAxNi41IC03dDE2LjUgNmgxbDEgMXE0IDUgNSAxMXEwIDEgMSAzdjNsNyAxMjRxMSAxMyAtOCAyM3YwdjBoLTF2MHEtOSAxMCAtMjIgMTBoLTEyNHEtMiAtMSAtMyAtMWgtM3EtNyAtMSAtMTEgLTVsLTEgLTF2MHEtNyAtNyAtNy41IC0xNi41dDYuNSAtMTYuNXoiIC8+CiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0iY3Vvd3UiIHVuaWNvZGU9IiYjeGU2OGM7IiAKZD0iTTg4OCA1NDJxLTMxIDczIC04NyAxMjkuNXQtMTI5IDg3LjVxLTc2IDMyIC0xNTkgMzJxLTgyIDAgLTE1OCAtMzJxLTczIC0zMSAtMTI5IC04Ny41dC04NyAtMTI5LjVxLTMyIC03NSAtMzIgLTE1OHEwIC04MiAzMiAtMTU4cTMxIC03MyA4NyAtMTI5LjV0MTI5IC04Ny41cTc1IC0zMSAxNTggLTMxdDE1OSAzMXE3MyAzMSAxMjkgODcuNXQ4NyAxMjkuNXEzMiA3NSAzMiAxNTh0LTMyIDE1OHpNNjgzIDI1MXE5IC05IDkgLTIxdC04LjUgLTIwLjUKdC0yMC41IC04LjV0LTIxIDhsLTEzMiAxMzNsLTEzMyAtMTMzcS04IC04IC0yMCAtOHQtMjAuNSA4LjV0LTguNSAyMC41dDggMjBsMTMzIDEzM2wtMTMzIDEzMnEtOCA5IC04IDIxdDggMjAuNXQyMC41IDguNXQyMC41IC05bDEzMyAtMTMybDEzMiAxMzJxOCA5IDIwLjUgOXQyMSAtOC41dDguNSAtMjAuNXQtOSAtMjFsLTEzMiAtMTMyeiIgLz4KICA8L2ZvbnQ+CjwvZGVmcz48L3N2Zz4K"

/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = "data:application/x-font-ttf;base64,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"

/***/ }),
/* 13 */
/***/ (function(module, exports) {

module.exports = "data:application/font-woff;base64,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"

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(48)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(22),
  /* template */
  __webpack_require__(42),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\Users\\Administrator\\Desktop\\Vue点餐\\src\\App.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] App.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-2d9cca06", Component.options)
  } else {
    hotAPI.reload("data-v-2d9cca06", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(51)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(23),
  /* template */
  __webpack_require__(45),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\Users\\Administrator\\Desktop\\Vue点餐\\src\\components\\cart.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] cart.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-794316fe", Component.options)
  } else {
    hotAPI.reload("data-v-794316fe", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(49)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(24),
  /* template */
  __webpack_require__(43),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\Users\\Administrator\\Desktop\\Vue点餐\\src\\components\\menu.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] menu.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-54e279bd", Component.options)
  } else {
    hotAPI.reload("data-v-54e279bd", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(52)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(25),
  /* template */
  __webpack_require__(46),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\Users\\Administrator\\Desktop\\Vue点餐\\src\\components\\order.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] order.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-e492db40", Component.options)
  } else {
    hotAPI.reload("data-v-e492db40", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {


/* styles */
__webpack_require__(50)

var Component = __webpack_require__(1)(
  /* script */
  __webpack_require__(26),
  /* template */
  __webpack_require__(44),
  /* scopeId */
  null,
  /* cssModules */
  null
)
Component.options.__file = "C:\\Users\\Administrator\\Desktop\\Vue点餐\\src\\components\\user.vue"
if (Component.esModule && Object.keys(Component.esModule).some(function (key) {return key !== "default" && key !== "__esModule"})) {console.error("named exports are not supported in *.vue files.")}
if (Component.options.functional) {console.error("[vue-loader] user.vue: functional components are not supported with templates, they should use render functions.")}

/* hot reload */
if (false) {(function () {
  var hotAPI = require("vue-hot-reload-api")
  hotAPI.install(require("vue"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-68fd3a29", Component.options)
  } else {
    hotAPI.reload("data-v-68fd3a29", Component.options)
  }
})()}

module.exports = Component.exports


/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*!
 * vue-resource v1.2.0
 * https://github.com/pagekit/vue-resource
 * Released under the MIT License.
 */



/**
 * Promises/A+ polyfill v1.1.4 (https://github.com/bramstein/promis)
 */

var RESOLVED = 0;
var REJECTED = 1;
var PENDING  = 2;

function Promise$1(executor) {

    this.state = PENDING;
    this.value = undefined;
    this.deferred = [];

    var promise = this;

    try {
        executor(function (x) {
            promise.resolve(x);
        }, function (r) {
            promise.reject(r);
        });
    } catch (e) {
        promise.reject(e);
    }
}

Promise$1.reject = function (r) {
    return new Promise$1(function (resolve, reject) {
        reject(r);
    });
};

Promise$1.resolve = function (x) {
    return new Promise$1(function (resolve, reject) {
        resolve(x);
    });
};

Promise$1.all = function all(iterable) {
    return new Promise$1(function (resolve, reject) {
        var count = 0, result = [];

        if (iterable.length === 0) {
            resolve(result);
        }

        function resolver(i) {
            return function (x) {
                result[i] = x;
                count += 1;

                if (count === iterable.length) {
                    resolve(result);
                }
            };
        }

        for (var i = 0; i < iterable.length; i += 1) {
            Promise$1.resolve(iterable[i]).then(resolver(i), reject);
        }
    });
};

Promise$1.race = function race(iterable) {
    return new Promise$1(function (resolve, reject) {
        for (var i = 0; i < iterable.length; i += 1) {
            Promise$1.resolve(iterable[i]).then(resolve, reject);
        }
    });
};

var p$1 = Promise$1.prototype;

p$1.resolve = function resolve(x) {
    var promise = this;

    if (promise.state === PENDING) {
        if (x === promise) {
            throw new TypeError('Promise settled with itself.');
        }

        var called = false;

        try {
            var then = x && x['then'];

            if (x !== null && typeof x === 'object' && typeof then === 'function') {
                then.call(x, function (x) {
                    if (!called) {
                        promise.resolve(x);
                    }
                    called = true;

                }, function (r) {
                    if (!called) {
                        promise.reject(r);
                    }
                    called = true;
                });
                return;
            }
        } catch (e) {
            if (!called) {
                promise.reject(e);
            }
            return;
        }

        promise.state = RESOLVED;
        promise.value = x;
        promise.notify();
    }
};

p$1.reject = function reject(reason) {
    var promise = this;

    if (promise.state === PENDING) {
        if (reason === promise) {
            throw new TypeError('Promise settled with itself.');
        }

        promise.state = REJECTED;
        promise.value = reason;
        promise.notify();
    }
};

p$1.notify = function notify() {
    var promise = this;

    nextTick(function () {
        if (promise.state !== PENDING) {
            while (promise.deferred.length) {
                var deferred = promise.deferred.shift(),
                    onResolved = deferred[0],
                    onRejected = deferred[1],
                    resolve = deferred[2],
                    reject = deferred[3];

                try {
                    if (promise.state === RESOLVED) {
                        if (typeof onResolved === 'function') {
                            resolve(onResolved.call(undefined, promise.value));
                        } else {
                            resolve(promise.value);
                        }
                    } else if (promise.state === REJECTED) {
                        if (typeof onRejected === 'function') {
                            resolve(onRejected.call(undefined, promise.value));
                        } else {
                            reject(promise.value);
                        }
                    }
                } catch (e) {
                    reject(e);
                }
            }
        }
    });
};

p$1.then = function then(onResolved, onRejected) {
    var promise = this;

    return new Promise$1(function (resolve, reject) {
        promise.deferred.push([onResolved, onRejected, resolve, reject]);
        promise.notify();
    });
};

p$1.catch = function (onRejected) {
    return this.then(undefined, onRejected);
};

/**
 * Promise adapter.
 */

if (typeof Promise === 'undefined') {
    window.Promise = Promise$1;
}

function PromiseObj(executor, context) {

    if (executor instanceof Promise) {
        this.promise = executor;
    } else {
        this.promise = new Promise(executor.bind(context));
    }

    this.context = context;
}

PromiseObj.all = function (iterable, context) {
    return new PromiseObj(Promise.all(iterable), context);
};

PromiseObj.resolve = function (value, context) {
    return new PromiseObj(Promise.resolve(value), context);
};

PromiseObj.reject = function (reason, context) {
    return new PromiseObj(Promise.reject(reason), context);
};

PromiseObj.race = function (iterable, context) {
    return new PromiseObj(Promise.race(iterable), context);
};

var p = PromiseObj.prototype;

p.bind = function (context) {
    this.context = context;
    return this;
};

p.then = function (fulfilled, rejected) {

    if (fulfilled && fulfilled.bind && this.context) {
        fulfilled = fulfilled.bind(this.context);
    }

    if (rejected && rejected.bind && this.context) {
        rejected = rejected.bind(this.context);
    }

    return new PromiseObj(this.promise.then(fulfilled, rejected), this.context);
};

p.catch = function (rejected) {

    if (rejected && rejected.bind && this.context) {
        rejected = rejected.bind(this.context);
    }

    return new PromiseObj(this.promise.catch(rejected), this.context);
};

p.finally = function (callback) {

    return this.then(function (value) {
            callback.call(this);
            return value;
        }, function (reason) {
            callback.call(this);
            return Promise.reject(reason);
        }
    );
};

/**
 * Utility functions.
 */

var debug = false;
var util = {};
var ref = {};
var hasOwnProperty = ref.hasOwnProperty;

var ref$1 = [];
var slice = ref$1.slice;

var inBrowser = typeof window !== 'undefined';

var Util = function (Vue) {
    util = Vue.util;
    debug = Vue.config.debug || !Vue.config.silent;
};

function warn(msg) {
    if (typeof console !== 'undefined' && debug) {
        console.warn('[VueResource warn]: ' + msg);
    }
}

function error(msg) {
    if (typeof console !== 'undefined') {
        console.error(msg);
    }
}

function nextTick(cb, ctx) {
    return util.nextTick(cb, ctx);
}

function trim(str) {
    return str ? str.replace(/^\s*|\s*$/g, '') : '';
}

function toLower(str) {
    return str ? str.toLowerCase() : '';
}

function toUpper(str) {
    return str ? str.toUpperCase() : '';
}

var isArray = Array.isArray;

function isString(val) {
    return typeof val === 'string';
}



function isFunction(val) {
    return typeof val === 'function';
}

function isObject(obj) {
    return obj !== null && typeof obj === 'object';
}

function isPlainObject(obj) {
    return isObject(obj) && Object.getPrototypeOf(obj) == Object.prototype;
}

function isBlob(obj) {
    return typeof Blob !== 'undefined' && obj instanceof Blob;
}

function isFormData(obj) {
    return typeof FormData !== 'undefined' && obj instanceof FormData;
}

function when(value, fulfilled, rejected) {

    var promise = PromiseObj.resolve(value);

    if (arguments.length < 2) {
        return promise;
    }

    return promise.then(fulfilled, rejected);
}

function options(fn, obj, opts) {

    opts = opts || {};

    if (isFunction(opts)) {
        opts = opts.call(obj);
    }

    return merge(fn.bind({$vm: obj, $options: opts}), fn, {$options: opts});
}

function each(obj, iterator) {

    var i, key;

    if (isArray(obj)) {
        for (i = 0; i < obj.length; i++) {
            iterator.call(obj[i], obj[i], i);
        }
    } else if (isObject(obj)) {
        for (key in obj) {
            if (hasOwnProperty.call(obj, key)) {
                iterator.call(obj[key], obj[key], key);
            }
        }
    }

    return obj;
}

var assign = Object.assign || _assign;

function merge(target) {

    var args = slice.call(arguments, 1);

    args.forEach(function (source) {
        _merge(target, source, true);
    });

    return target;
}

function defaults(target) {

    var args = slice.call(arguments, 1);

    args.forEach(function (source) {

        for (var key in source) {
            if (target[key] === undefined) {
                target[key] = source[key];
            }
        }

    });

    return target;
}

function _assign(target) {

    var args = slice.call(arguments, 1);

    args.forEach(function (source) {
        _merge(target, source);
    });

    return target;
}

function _merge(target, source, deep) {
    for (var key in source) {
        if (deep && (isPlainObject(source[key]) || isArray(source[key]))) {
            if (isPlainObject(source[key]) && !isPlainObject(target[key])) {
                target[key] = {};
            }
            if (isArray(source[key]) && !isArray(target[key])) {
                target[key] = [];
            }
            _merge(target[key], source[key], deep);
        } else if (source[key] !== undefined) {
            target[key] = source[key];
        }
    }
}

/**
 * Root Prefix Transform.
 */

var root = function (options$$1, next) {

    var url = next(options$$1);

    if (isString(options$$1.root) && !url.match(/^(https?:)?\//)) {
        url = options$$1.root + '/' + url;
    }

    return url;
};

/**
 * Query Parameter Transform.
 */

var query = function (options$$1, next) {

    var urlParams = Object.keys(Url.options.params), query = {}, url = next(options$$1);

    each(options$$1.params, function (value, key) {
        if (urlParams.indexOf(key) === -1) {
            query[key] = value;
        }
    });

    query = Url.params(query);

    if (query) {
        url += (url.indexOf('?') == -1 ? '?' : '&') + query;
    }

    return url;
};

/**
 * URL Template v2.0.6 (https://github.com/bramstein/url-template)
 */

function expand(url, params, variables) {

    var tmpl = parse(url), expanded = tmpl.expand(params);

    if (variables) {
        variables.push.apply(variables, tmpl.vars);
    }

    return expanded;
}

function parse(template) {

    var operators = ['+', '#', '.', '/', ';', '?', '&'], variables = [];

    return {
        vars: variables,
        expand: function expand(context) {
            return template.replace(/\{([^\{\}]+)\}|([^\{\}]+)/g, function (_, expression, literal) {
                if (expression) {

                    var operator = null, values = [];

                    if (operators.indexOf(expression.charAt(0)) !== -1) {
                        operator = expression.charAt(0);
                        expression = expression.substr(1);
                    }

                    expression.split(/,/g).forEach(function (variable) {
                        var tmp = /([^:\*]*)(?::(\d+)|(\*))?/.exec(variable);
                        values.push.apply(values, getValues(context, operator, tmp[1], tmp[2] || tmp[3]));
                        variables.push(tmp[1]);
                    });

                    if (operator && operator !== '+') {

                        var separator = ',';

                        if (operator === '?') {
                            separator = '&';
                        } else if (operator !== '#') {
                            separator = operator;
                        }

                        return (values.length !== 0 ? operator : '') + values.join(separator);
                    } else {
                        return values.join(',');
                    }

                } else {
                    return encodeReserved(literal);
                }
            });
        }
    };
}

function getValues(context, operator, key, modifier) {

    var value = context[key], result = [];

    if (isDefined(value) && value !== '') {
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            value = value.toString();

            if (modifier && modifier !== '*') {
                value = value.substring(0, parseInt(modifier, 10));
            }

            result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
        } else {
            if (modifier === '*') {
                if (Array.isArray(value)) {
                    value.filter(isDefined).forEach(function (value) {
                        result.push(encodeValue(operator, value, isKeyOperator(operator) ? key : null));
                    });
                } else {
                    Object.keys(value).forEach(function (k) {
                        if (isDefined(value[k])) {
                            result.push(encodeValue(operator, value[k], k));
                        }
                    });
                }
            } else {
                var tmp = [];

                if (Array.isArray(value)) {
                    value.filter(isDefined).forEach(function (value) {
                        tmp.push(encodeValue(operator, value));
                    });
                } else {
                    Object.keys(value).forEach(function (k) {
                        if (isDefined(value[k])) {
                            tmp.push(encodeURIComponent(k));
                            tmp.push(encodeValue(operator, value[k].toString()));
                        }
                    });
                }

                if (isKeyOperator(operator)) {
                    result.push(encodeURIComponent(key) + '=' + tmp.join(','));
                } else if (tmp.length !== 0) {
                    result.push(tmp.join(','));
                }
            }
        }
    } else {
        if (operator === ';') {
            result.push(encodeURIComponent(key));
        } else if (value === '' && (operator === '&' || operator === '?')) {
            result.push(encodeURIComponent(key) + '=');
        } else if (value === '') {
            result.push('');
        }
    }

    return result;
}

function isDefined(value) {
    return value !== undefined && value !== null;
}

function isKeyOperator(operator) {
    return operator === ';' || operator === '&' || operator === '?';
}

function encodeValue(operator, value, key) {

    value = (operator === '+' || operator === '#') ? encodeReserved(value) : encodeURIComponent(value);

    if (key) {
        return encodeURIComponent(key) + '=' + value;
    } else {
        return value;
    }
}

function encodeReserved(str) {
    return str.split(/(%[0-9A-Fa-f]{2})/g).map(function (part) {
        if (!/%[0-9A-Fa-f]/.test(part)) {
            part = encodeURI(part);
        }
        return part;
    }).join('');
}

/**
 * URL Template (RFC 6570) Transform.
 */

var template = function (options) {

    var variables = [], url = expand(options.url, options.params, variables);

    variables.forEach(function (key) {
        delete options.params[key];
    });

    return url;
};

/**
 * Service for URL templating.
 */

function Url(url, params) {

    var self = this || {}, options$$1 = url, transform;

    if (isString(url)) {
        options$$1 = {url: url, params: params};
    }

    options$$1 = merge({}, Url.options, self.$options, options$$1);

    Url.transforms.forEach(function (handler) {
        transform = factory(handler, transform, self.$vm);
    });

    return transform(options$$1);
}

/**
 * Url options.
 */

Url.options = {
    url: '',
    root: null,
    params: {}
};

/**
 * Url transforms.
 */

Url.transforms = [template, query, root];

/**
 * Encodes a Url parameter string.
 *
 * @param {Object} obj
 */

Url.params = function (obj) {

    var params = [], escape = encodeURIComponent;

    params.add = function (key, value) {

        if (isFunction(value)) {
            value = value();
        }

        if (value === null) {
            value = '';
        }

        this.push(escape(key) + '=' + escape(value));
    };

    serialize(params, obj);

    return params.join('&').replace(/%20/g, '+');
};

/**
 * Parse a URL and return its components.
 *
 * @param {String} url
 */

Url.parse = function (url) {

    var el = document.createElement('a');

    if (document.documentMode) {
        el.href = url;
        url = el.href;
    }

    el.href = url;

    return {
        href: el.href,
        protocol: el.protocol ? el.protocol.replace(/:$/, '') : '',
        port: el.port,
        host: el.host,
        hostname: el.hostname,
        pathname: el.pathname.charAt(0) === '/' ? el.pathname : '/' + el.pathname,
        search: el.search ? el.search.replace(/^\?/, '') : '',
        hash: el.hash ? el.hash.replace(/^#/, '') : ''
    };
};

function factory(handler, next, vm) {
    return function (options$$1) {
        return handler.call(vm, options$$1, next);
    };
}

function serialize(params, obj, scope) {

    var array = isArray(obj), plain = isPlainObject(obj), hash;

    each(obj, function (value, key) {

        hash = isObject(value) || isArray(value);

        if (scope) {
            key = scope + '[' + (plain || hash ? key : '') + ']';
        }

        if (!scope && array) {
            params.add(value.name, value.value);
        } else if (hash) {
            serialize(params, value, key);
        } else {
            params.add(key, value);
        }
    });
}

/**
 * XDomain client (Internet Explorer).
 */

var xdrClient = function (request) {
    return new PromiseObj(function (resolve) {

        var xdr = new XDomainRequest(), handler = function (ref) {
            var type = ref.type;


            var status = 0;

            if (type === 'load') {
                status = 200;
            } else if (type === 'error') {
                status = 500;
            }

            resolve(request.respondWith(xdr.responseText, {status: status}));
        };

        request.abort = function () { return xdr.abort(); };

        xdr.open(request.method, request.getUrl());

        if (request.timeout) {
            xdr.timeout = request.timeout;
        }

        xdr.onload = handler;
        xdr.onabort = handler;
        xdr.onerror = handler;
        xdr.ontimeout = handler;
        xdr.onprogress = function () {};
        xdr.send(request.getBody());
    });
};

/**
 * CORS Interceptor.
 */

var SUPPORTS_CORS = inBrowser && 'withCredentials' in new XMLHttpRequest();

var cors = function (request, next) {

    if (inBrowser) {

        var orgUrl = Url.parse(location.href);
        var reqUrl = Url.parse(request.getUrl());

        if (reqUrl.protocol !== orgUrl.protocol || reqUrl.host !== orgUrl.host) {

            request.crossOrigin = true;
            request.emulateHTTP = false;

            if (!SUPPORTS_CORS) {
                request.client = xdrClient;
            }
        }
    }

    next();
};

/**
 * Body Interceptor.
 */

var body = function (request, next) {

    if (isFormData(request.body)) {

        request.headers.delete('Content-Type');

    } else if (isObject(request.body) || isArray(request.body)) {

        if (request.emulateJSON) {
            request.body = Url.params(request.body);
            request.headers.set('Content-Type', 'application/x-www-form-urlencoded');
        } else {
            request.body = JSON.stringify(request.body);
        }
    }

    next(function (response) {

        Object.defineProperty(response, 'data', {

            get: function get() {
                return this.body;
            },

            set: function set(body) {
                this.body = body;
            }

        });

        return response.bodyText ? when(response.text(), function (text) {

            var type = response.headers.get('Content-Type') || '';

            if (type.indexOf('application/json') === 0 || isJson(text)) {

                try {
                    response.body = JSON.parse(text);
                } catch (e) {
                    response.body = null;
                }

            } else {
                response.body = text;
            }

            return response;

        }) : response;

    });
};

function isJson(str) {

    var start = str.match(/^\[|^\{(?!\{)/), end = {'[': /]$/, '{': /}$/};

    return start && end[start[0]].test(str);
}

/**
 * JSONP client (Browser).
 */

var jsonpClient = function (request) {
    return new PromiseObj(function (resolve) {

        var name = request.jsonp || 'callback', callback = request.jsonpCallback || '_jsonp' + Math.random().toString(36).substr(2), body = null, handler, script;

        handler = function (ref) {
            var type = ref.type;


            var status = 0;

            if (type === 'load' && body !== null) {
                status = 200;
            } else if (type === 'error') {
                status = 500;
            }

            if (status && window[callback]) {
                delete window[callback];
                document.body.removeChild(script);
            }

            resolve(request.respondWith(body, {status: status}));
        };

        window[callback] = function (result) {
            body = JSON.stringify(result);
        };

        request.abort = function () {
            handler({type: 'abort'});
        };

        request.params[name] = callback;

        if (request.timeout) {
            setTimeout(request.abort, request.timeout);
        }

        script = document.createElement('script');
        script.src = request.getUrl();
        script.type = 'text/javascript';
        script.async = true;
        script.onload = handler;
        script.onerror = handler;

        document.body.appendChild(script);
    });
};

/**
 * JSONP Interceptor.
 */

var jsonp = function (request, next) {

    if (request.method == 'JSONP') {
        request.client = jsonpClient;
    }

    next();
};

/**
 * Before Interceptor.
 */

var before = function (request, next) {

    if (isFunction(request.before)) {
        request.before.call(this, request);
    }

    next();
};

/**
 * HTTP method override Interceptor.
 */

var method = function (request, next) {

    if (request.emulateHTTP && /^(PUT|PATCH|DELETE)$/i.test(request.method)) {
        request.headers.set('X-HTTP-Method-Override', request.method);
        request.method = 'POST';
    }

    next();
};

/**
 * Header Interceptor.
 */

var header = function (request, next) {

    var headers = assign({}, Http.headers.common,
        !request.crossOrigin ? Http.headers.custom : {},
        Http.headers[toLower(request.method)]
    );

    each(headers, function (value, name) {
        if (!request.headers.has(name)) {
            request.headers.set(name, value);
        }
    });

    next();
};

/**
 * XMLHttp client (Browser).
 */

var SUPPORTS_BLOB = typeof Blob !== 'undefined' && typeof FileReader !== 'undefined';

var xhrClient = function (request) {
    return new PromiseObj(function (resolve) {

        var xhr = new XMLHttpRequest(), handler = function (event) {

            var response = request.respondWith(
                'response' in xhr ? xhr.response : xhr.responseText, {
                    status: xhr.status === 1223 ? 204 : xhr.status, // IE9 status bug
                    statusText: xhr.status === 1223 ? 'No Content' : trim(xhr.statusText)
                }
            );

            each(trim(xhr.getAllResponseHeaders()).split('\n'), function (row) {
                response.headers.append(row.slice(0, row.indexOf(':')), row.slice(row.indexOf(':') + 1));
            });

            resolve(response);
        };

        request.abort = function () { return xhr.abort(); };

        if (request.progress) {
            if (request.method === 'GET') {
                xhr.addEventListener('progress', request.progress);
            } else if (/^(POST|PUT)$/i.test(request.method)) {
                xhr.upload.addEventListener('progress', request.progress);
            }
        }

        xhr.open(request.method, request.getUrl(), true);

        if (request.timeout) {
            xhr.timeout = request.timeout;
        }

        if (request.credentials === true) {
            xhr.withCredentials = true;
        }

        if (!request.crossOrigin) {
            request.headers.set('X-Requested-With', 'XMLHttpRequest');
        }

        if ('responseType' in xhr && SUPPORTS_BLOB) {
            xhr.responseType = 'blob';
        }

        request.headers.forEach(function (value, name) {
            xhr.setRequestHeader(name, value);
        });

        xhr.onload = handler;
        xhr.onabort = handler;
        xhr.onerror = handler;
        xhr.ontimeout = handler;
        xhr.send(request.getBody());
    });
};

/**
 * Http client (Node).
 */

var nodeClient = function (request) {

    var client = __webpack_require__(55);

    return new PromiseObj(function (resolve) {

        var url = request.getUrl();
        var body = request.getBody();
        var method = request.method;
        var headers = {}, handler;

        request.headers.forEach(function (value, name) {
            headers[name] = value;
        });

        client(url, {body: body, method: method, headers: headers}).then(handler = function (resp) {

            var response = request.respondWith(resp.body, {
                    status: resp.statusCode,
                    statusText: trim(resp.statusMessage)
                }
            );

            each(resp.headers, function (value, name) {
                response.headers.set(name, value);
            });

            resolve(response);

        }, function (error$$1) { return handler(error$$1.response); });
    });
};

/**
 * Base client.
 */

var Client = function (context) {

    var reqHandlers = [sendRequest], resHandlers = [], handler;

    if (!isObject(context)) {
        context = null;
    }

    function Client(request) {
        return new PromiseObj(function (resolve) {

            function exec() {

                handler = reqHandlers.pop();

                if (isFunction(handler)) {
                    handler.call(context, request, next);
                } else {
                    warn(("Invalid interceptor of type " + (typeof handler) + ", must be a function"));
                    next();
                }
            }

            function next(response) {

                if (isFunction(response)) {

                    resHandlers.unshift(response);

                } else if (isObject(response)) {

                    resHandlers.forEach(function (handler) {
                        response = when(response, function (response) {
                            return handler.call(context, response) || response;
                        });
                    });

                    when(response, resolve);

                    return;
                }

                exec();
            }

            exec();

        }, context);
    }

    Client.use = function (handler) {
        reqHandlers.push(handler);
    };

    return Client;
};

function sendRequest(request, resolve) {

    var client = request.client || (inBrowser ? xhrClient : nodeClient);

    resolve(client(request));
}

/**
 * HTTP Headers.
 */

var Headers = function Headers(headers) {
    var this$1 = this;


    this.map = {};

    each(headers, function (value, name) { return this$1.append(name, value); });
};

Headers.prototype.has = function has (name) {
    return getName(this.map, name) !== null;
};

Headers.prototype.get = function get (name) {

    var list = this.map[getName(this.map, name)];

    return list ? list[0] : null;
};

Headers.prototype.getAll = function getAll (name) {
    return this.map[getName(this.map, name)] || [];
};

Headers.prototype.set = function set (name, value) {
    this.map[normalizeName(getName(this.map, name) || name)] = [trim(value)];
};

Headers.prototype.append = function append (name, value){

    var list = this.getAll(name);

    if (list.length) {
        list.push(trim(value));
    } else {
        this.set(name, value);
    }
};

Headers.prototype.delete = function delete$1 (name){
    delete this.map[getName(this.map, name)];
};

Headers.prototype.deleteAll = function deleteAll (){
    this.map = {};
};

Headers.prototype.forEach = function forEach (callback, thisArg) {
        var this$1 = this;

    each(this.map, function (list, name) {
        each(list, function (value) { return callback.call(thisArg, value, name, this$1); });
    });
};

function getName(map, name) {
    return Object.keys(map).reduce(function (prev, curr) {
        return toLower(name) === toLower(curr) ? curr : prev;
    }, null);
}

function normalizeName(name) {

    if (/[^a-z0-9\-#$%&'*+.\^_`|~]/i.test(name)) {
        throw new TypeError('Invalid character in header field name');
    }

    return trim(name);
}

/**
 * HTTP Response.
 */

var Response = function Response(body, ref) {
    var url = ref.url;
    var headers = ref.headers;
    var status = ref.status;
    var statusText = ref.statusText;


    this.url = url;
    this.ok = status >= 200 && status < 300;
    this.status = status || 0;
    this.statusText = statusText || '';
    this.headers = new Headers(headers);
    this.body = body;

    if (isString(body)) {

        this.bodyText = body;

    } else if (isBlob(body)) {

        this.bodyBlob = body;

        if (isBlobText(body)) {
            this.bodyText = blobText(body);
        }
    }
};

Response.prototype.blob = function blob () {
    return when(this.bodyBlob);
};

Response.prototype.text = function text () {
    return when(this.bodyText);
};

Response.prototype.json = function json () {
    return when(this.text(), function (text) { return JSON.parse(text); });
};

function blobText(body) {
    return new PromiseObj(function (resolve) {

        var reader = new FileReader();

        reader.readAsText(body);
        reader.onload = function () {
            resolve(reader.result);
        };

    });
}

function isBlobText(body) {
    return body.type.indexOf('text') === 0 || body.type.indexOf('json') !== -1;
}

/**
 * HTTP Request.
 */

var Request = function Request(options$$1) {

    this.body = null;
    this.params = {};

    assign(this, options$$1, {
        method: toUpper(options$$1.method || 'GET')
    });

    if (!(this.headers instanceof Headers)) {
        this.headers = new Headers(this.headers);
    }
};

Request.prototype.getUrl = function getUrl (){
    return Url(this);
};

Request.prototype.getBody = function getBody (){
    return this.body;
};

Request.prototype.respondWith = function respondWith (body, options$$1) {
    return new Response(body, assign(options$$1 || {}, {url: this.getUrl()}));
};

/**
 * Service for sending network requests.
 */

var COMMON_HEADERS = {'Accept': 'application/json, text/plain, */*'};
var JSON_CONTENT_TYPE = {'Content-Type': 'application/json;charset=utf-8'};

function Http(options$$1) {

    var self = this || {}, client = Client(self.$vm);

    defaults(options$$1 || {}, self.$options, Http.options);

    Http.interceptors.forEach(function (handler) {
        client.use(handler);
    });

    return client(new Request(options$$1)).then(function (response) {

        return response.ok ? response : PromiseObj.reject(response);

    }, function (response) {

        if (response instanceof Error) {
            error(response);
        }

        return PromiseObj.reject(response);
    });
}

Http.options = {};

Http.headers = {
    put: JSON_CONTENT_TYPE,
    post: JSON_CONTENT_TYPE,
    patch: JSON_CONTENT_TYPE,
    delete: JSON_CONTENT_TYPE,
    common: COMMON_HEADERS,
    custom: {}
};

Http.interceptors = [before, method, body, jsonp, header, cors];

['get', 'delete', 'head', 'jsonp'].forEach(function (method$$1) {

    Http[method$$1] = function (url, options$$1) {
        return this(assign(options$$1 || {}, {url: url, method: method$$1}));
    };

});

['post', 'put', 'patch'].forEach(function (method$$1) {

    Http[method$$1] = function (url, body$$1, options$$1) {
        return this(assign(options$$1 || {}, {url: url, method: method$$1, body: body$$1}));
    };

});

/**
 * Service for interacting with RESTful services.
 */

function Resource(url, params, actions, options$$1) {

    var self = this || {}, resource = {};

    actions = assign({},
        Resource.actions,
        actions
    );

    each(actions, function (action, name) {

        action = merge({url: url, params: assign({}, params)}, options$$1, action);

        resource[name] = function () {
            return (self.$http || Http)(opts(action, arguments));
        };
    });

    return resource;
}

function opts(action, args) {

    var options$$1 = assign({}, action), params = {}, body;

    switch (args.length) {

        case 2:

            params = args[0];
            body = args[1];

            break;

        case 1:

            if (/^(POST|PUT|PATCH)$/i.test(options$$1.method)) {
                body = args[0];
            } else {
                params = args[0];
            }

            break;

        case 0:

            break;

        default:

            throw 'Expected up to 2 arguments [params, body], got ' + args.length + ' arguments';
    }

    options$$1.body = body;
    options$$1.params = assign({}, options$$1.params, params);

    return options$$1;
}

Resource.actions = {

    get: {method: 'GET'},
    save: {method: 'POST'},
    query: {method: 'GET'},
    update: {method: 'PUT'},
    remove: {method: 'DELETE'},
    delete: {method: 'DELETE'}

};

/**
 * Install plugin.
 */

function plugin(Vue) {

    if (plugin.installed) {
        return;
    }

    Util(Vue);

    Vue.url = Url;
    Vue.http = Http;
    Vue.resource = Resource;
    Vue.Promise = PromiseObj;

    Object.defineProperties(Vue.prototype, {

        $url: {
            get: function get() {
                return options(Vue.url, this, this.$options.url);
            }
        },

        $http: {
            get: function get() {
                return options(Vue.http, this, this.$options.http);
            }
        },

        $resource: {
            get: function get() {
                return Vue.resource.bind(this);
            }
        },

        $promise: {
            get: function get() {
                var this$1 = this;

                return function (executor) { return new Vue.Promise(executor, this$1); };
            }
        }

    });
}

if (typeof window !== 'undefined' && window.Vue) {
    window.Vue.use(plugin);
}

module.exports = plugin;


/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process) {/**
  * vue-router v2.2.0
  * (c) 2017 Evan You
  * @license MIT
  */


/*  */

function assert (condition, message) {
  if (!condition) {
    throw new Error(("[vue-router] " + message))
  }
}

function warn (condition, message) {
  if (!condition) {
    typeof console !== 'undefined' && console.warn(("[vue-router] " + message));
  }
}

var View = {
  name: 'router-view',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render (h, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    data.routerView = true;

    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent) {
      if (parent.$vnode && parent.$vnode.data.routerView) {
        depth++;
      }
      if (parent._inactive) {
        inactive = true;
      }
      parent = parent.$parent;
    }
    data.routerViewDepth = depth;

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      return h(cache[name], data, children)
    }

    var matched = route.matched[depth];
    // render empty node if no matched route
    if (!matched) {
      cache[name] = null;
      return h()
    }

    var component = cache[name] = matched.components[name];

    // inject instance registration hooks
    var hooks = data.hook || (data.hook = {});
    hooks.init = function (vnode) {
      matched.instances[name] = vnode.child;
    };
    hooks.prepatch = function (oldVnode, vnode) {
      matched.instances[name] = vnode.child;
    };
    hooks.destroy = function (vnode) {
      if (matched.instances[name] === vnode.child) {
        matched.instances[name] = undefined;
      }
    };

    // resolve props
    data.props = resolveProps(route, matched.props && matched.props[name]);

    return h(component, data, children)
  }
};

function resolveProps (route, config) {
  switch (typeof config) {
    case 'undefined':
      return
    case 'object':
      return config
    case 'function':
      return config(route)
    case 'boolean':
      return config ? route.params : undefined
    default:
      warn(false, ("props in \"" + (route.path) + "\" is a " + (typeof config) + ", expecting an object, function or boolean."));
  }
}

/*  */

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function (c) { return '%' + c.charCodeAt(0).toString(16); };
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more comformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function (str) { return encodeURIComponent(str)
  .replace(encodeReserveRE, encodeReserveReplacer)
  .replace(commaRE, ','); };

var decode = decodeURIComponent;

function resolveQuery (
  query,
  extraQuery
) {
  if ( extraQuery === void 0 ) extraQuery = {};

  if (query) {
    var parsedQuery;
    try {
      parsedQuery = parseQuery(query);
    } catch (e) {
      process.env.NODE_ENV !== 'production' && warn(false, e.message);
      parsedQuery = {};
    }
    for (var key in extraQuery) {
      parsedQuery[key] = extraQuery[key];
    }
    return parsedQuery
  } else {
    return extraQuery
  }
}

function parseQuery (query) {
  var res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0
      ? decode(parts.join('='))
      : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res
}

function stringifyQuery (obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return ''
    }

    if (val === null) {
      return encode(key)
    }

    if (Array.isArray(val)) {
      var result = [];
      val.slice().forEach(function (val2) {
        if (val2 === undefined) {
          return
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&')
    }

    return encode(key) + '=' + encode(val)
  }).filter(function (x) { return x.length > 0; }).join('&') : null;
  return res ? ("?" + res) : ''
}

/*  */

var trailingSlashRE = /\/?$/;

function createRoute (
  record,
  location,
  redirectedFrom
) {
  var route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: location.query || {},
    params: location.params || {},
    fullPath: getFullPath(location),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom);
  }
  return Object.freeze(route)
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
});

function formatMatch (record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res
}

function getFullPath (ref) {
  var path = ref.path;
  var query = ref.query; if ( query === void 0 ) query = {};
  var hash = ref.hash; if ( hash === void 0 ) hash = '';

  return (path || '/') + stringifyQuery(query) + hash
}

function isSameRoute (a, b) {
  if (b === START) {
    return a === b
  } else if (!b) {
    return false
  } else if (a.path && b.path) {
    return (
      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query)
    )
  } else if (a.name && b.name) {
    return (
      a.name === b.name &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query) &&
      isObjectEqual(a.params, b.params)
    )
  } else {
    return false
  }
}

function isObjectEqual (a, b) {
  if ( a === void 0 ) a = {};
  if ( b === void 0 ) b = {};

  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.every(function (key) { return String(a[key]) === String(b[key]); })
}

function isIncludedRoute (current, target) {
  return (
    current.path.replace(trailingSlashRE, '/').indexOf(
      target.path.replace(trailingSlashRE, '/')
    ) === 0 &&
    (!target.hash || current.hash === target.hash) &&
    queryIncludes(current.query, target.query)
  )
}

function queryIncludes (current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false
    }
  }
  return true
}

/*  */

// work around weird flow bug
var toTypes = [String, Object];
var eventTypes = [String, Array];

var Link = {
  name: 'router-link',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render (h) {
    var this$1 = this;

    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(this.to, current, this.append);
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;
    var classes = {};
    var activeClass = this.activeClass || router.options.linkActiveClass || 'router-link-active';
    var compareTarget = location.path ? createRoute(null, location) : route;
    classes[activeClass] = this.exact
      ? isSameRoute(current, compareTarget)
      : isIncludedRoute(current, compareTarget);

    var handler = function (e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location);
        } else {
          router.push(location);
        }
      }
    };

    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) { on[e] = handler; });
    } else {
      on[this.event] = handler;
    }

    var data = {
      class: classes
    };

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = { href: href };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var extend = _Vue.util.extend;
        var aData = a.data = extend({}, a.data);
        aData.on = on;
        var aAttrs = a.data.attrs = extend({}, a.data.attrs);
        aAttrs.href = href;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default)
  }
};

function guardEvent (e) {
  // don't redirect with control keys
  if (e.metaKey || e.ctrlKey || e.shiftKey) { return }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) { return }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) { return }
  // don't redirect if `target="_blank"`
  if (e.target && e.target.getAttribute) {
    var target = e.target.getAttribute('target');
    if (/\b_blank\b/i.test(target)) { return }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true
}

function findAnchor (children) {
  if (children) {
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === 'a') {
        return child
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child
      }
    }
  }
}

var _Vue;

function install (Vue) {
  if (install.installed) { return }
  install.installed = true;

  _Vue = Vue;

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get () { return this.$root._router }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get () { return this.$root._route }
  });

  Vue.mixin({
    beforeCreate: function beforeCreate () {
      if (this.$options.router) {
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      }
    }
  });

  Vue.component('router-view', View);
  Vue.component('router-link', Link);

  var strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.created;
}

/*  */

var inBrowser = typeof window !== 'undefined';

/*  */

function resolvePath (
  relative,
  base,
  append
) {
  if (relative.charAt(0) === '/') {
    return relative
  }

  if (relative.charAt(0) === '?' || relative.charAt(0) === '#') {
    return base + relative
  }

  var stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/');
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === '.') {
      continue
    } else if (segment === '..') {
      stack.pop();
    } else {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/')
}

function parsePath (path) {
  var hash = '';
  var query = '';

  var hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  }
}

function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

/*  */

function createRouteMap (
  routes,
  oldPathMap,
  oldNameMap
) {
  var pathMap = oldPathMap || Object.create(null);
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathMap, nameMap, route);
  });

  return {
    pathMap: pathMap,
    nameMap: nameMap
  }
}

function addRouteRecord (
  pathMap,
  nameMap,
  route,
  parent,
  matchAs
) {
  var path = route.path;
  var name = route.name;
  if (process.env.NODE_ENV !== 'production') {
    assert(path != null, "\"path\" is required in a route configuration.");
    assert(
      typeof route.component !== 'string',
      "route config \"component\" for path: " + (String(path || name)) + " cannot be a " +
      "string id. Use an actual component instead."
    );
  }

  var record = {
    path: normalizePath(path, parent),
    components: route.components || { default: route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props: route.props == null
      ? {}
      : route.components
        ? route.props
        : { default: route.props }
  };

  if (route.children) {
    // Warn if route is named and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (process.env.NODE_ENV !== 'production') {
      if (route.name && route.children.some(function (child) { return /^\/?$/.test(child.path); })) {
        warn(
          false,
          "Named Route '" + (route.name) + "' has a default child route. " +
          "When navigating to this named route (:to=\"{name: '" + (route.name) + "'\"), " +
          "the default child route will not be rendered. Remove the name from " +
          "this route and use the name of the default child route for named " +
          "links instead."
        );
      }
    }
    route.children.forEach(function (child) {
      var childMatchAs = matchAs
        ? cleanPath((matchAs + "/" + (child.path)))
        : undefined;
      addRouteRecord(pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (route.alias !== undefined) {
    if (Array.isArray(route.alias)) {
      route.alias.forEach(function (alias) {
        var aliasRoute = {
          path: alias,
          children: route.children
        };
        addRouteRecord(pathMap, nameMap, aliasRoute, parent, record.path);
      });
    } else {
      var aliasRoute = {
        path: route.alias,
        children: route.children
      };
      addRouteRecord(pathMap, nameMap, aliasRoute, parent, record.path);
    }
  }

  if (!pathMap[record.path]) {
    pathMap[record.path] = record;
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if (process.env.NODE_ENV !== 'production' && !matchAs) {
      warn(
        false,
        "Duplicate named routes definition: " +
        "{ name: \"" + name + "\", path: \"" + (record.path) + "\" }"
      );
    }
  }
}

function normalizePath (path, parent) {
  path = path.replace(/\/$/, '');
  if (path[0] === '/') { return path }
  if (parent == null) { return path }
  return cleanPath(((parent.path) + "/" + path))
}

var index$1 = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

var isarray = index$1;

/**
 * Expose `pathToRegexp`.
 */
var index = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment;
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}

index.parse = parse_1;
index.compile = compile_1;
index.tokensToFunction = tokensToFunction_1;
index.tokensToRegExp = tokensToRegExp_1;

/*  */

var regexpCache = Object.create(null);

function getRouteRegex (path) {
  var hit = regexpCache[path];
  var keys, regexp;

  if (hit) {
    keys = hit.keys;
    regexp = hit.regexp;
  } else {
    keys = [];
    regexp = index(path, keys);
    regexpCache[path] = { keys: keys, regexp: regexp };
  }

  return { keys: keys, regexp: regexp }
}

var regexpCompileCache = Object.create(null);

function fillParams (
  path,
  params,
  routeMsg
) {
  try {
    var filler =
      regexpCompileCache[path] ||
      (regexpCompileCache[path] = index.compile(path));
    return filler(params || {}, { pretty: true })
  } catch (e) {
    if (process.env.NODE_ENV !== 'production') {
      warn(false, ("missing param for " + routeMsg + ": " + (e.message)));
    }
    return ''
  }
}

/*  */

function normalizeLocation (
  raw,
  current,
  append
) {
  var next = typeof raw === 'string' ? { path: raw } : raw;
  // named target
  if (next.name || next._normalized) {
    return next
  }

  // relative params
  if (!next.path && next.params && current) {
    next = assign({}, next);
    next._normalized = true;
    var params = assign(assign({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params;
    } else if (current.matched) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params, ("path " + (current.path)));
    } else if (process.env.NODE_ENV !== 'production') {
      warn(false, "relative params navigation requires a current route.");
    }
    return next
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = (current && current.path) || '/';
  var path = parsedPath.path
    ? resolvePath(parsedPath.path, basePath, append || next.append)
    : (current && current.path) || '/';
  var query = resolveQuery(parsedPath.query, next.query);
  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  }
}

function assign (a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a
}

/*  */

function createMatcher (routes) {
  var ref = createRouteMap(routes);
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes (routes) {
    createRouteMap(routes, pathMap, nameMap);
  }

  function match (
    raw,
    currentRoute,
    redirectedFrom
  ) {
    var location = normalizeLocation(raw, currentRoute);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        warn(record, ("Route with name '" + name + "' does not exist"));
      }
      var paramNames = getRouteRegex(record.path).keys
        .filter(function (key) { return !key.optional; })
        .map(function (key) { return key.name; });

      if (typeof location.params !== 'object') {
        location.params = {};
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      if (record) {
        location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""));
        return _createRoute(record, location, redirectedFrom)
      }
    } else if (location.path) {
      location.params = {};
      for (var path in pathMap) {
        if (matchRoute(path, location.params, location.path)) {
          return _createRoute(pathMap[path], location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }

  function redirect (
    record,
    location
  ) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function'
        ? originalRedirect(createRoute(record, location))
        : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = { path: redirect };
    }

    if (!redirect || typeof redirect !== 'object') {
      process.env.NODE_ENV !== 'production' && warn(
        false, ("invalid redirect option: " + (JSON.stringify(redirect)))
      );
      return _createRoute(null, location)
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];
      if (process.env.NODE_ENV !== 'production') {
        assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."));
      }
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location)
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record);
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""));
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location)
    } else {
      warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))));
      return _createRoute(null, location)
    }
  }

  function alias (
    record,
    location,
    matchAs
  ) {
    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""));
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location)
    }
    return _createRoute(null, location)
  }

  function _createRoute (
    record,
    location,
    redirectedFrom
  ) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location)
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs)
    }
    return createRoute(record, location, redirectedFrom)
  }

  return {
    match: match,
    addRoutes: addRoutes
  }
}

function matchRoute (
  path,
  params,
  pathname
) {
  var ref = getRouteRegex(path);
  var regexp = ref.regexp;
  var keys = ref.keys;
  var m = pathname.match(regexp);

  if (!m) {
    return false
  } else if (!params) {
    return true
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) { params[key.name] = val; }
  }

  return true
}

function resolveRecordPath (path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true)
}

/*  */


var positionStore = Object.create(null);

function setupScroll () {
  window.addEventListener('popstate', function (e) {
    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  });

  window.addEventListener('scroll', saveScrollPosition);
}

function handleScroll (
  router,
  to,
  from,
  isPop
) {
  if (!router.app) {
    return
  }

  var behavior = router.options.scrollBehavior;
  if (!behavior) {
    return
  }

  if (process.env.NODE_ENV !== 'production') {
    assert(typeof behavior === 'function', "scrollBehavior must be a function");
  }

  // wait until re-render finishes before scrolling
  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior(to, from, isPop ? position : null);
    if (!shouldScroll) {
      return
    }
    var isObject = typeof shouldScroll === 'object';
    if (isObject && typeof shouldScroll.selector === 'string') {
      var el = document.querySelector(shouldScroll.selector);
      if (el) {
        position = getElementPosition(el);
      } else if (isValidPosition(shouldScroll)) {
        position = normalizePosition(shouldScroll);
      }
    } else if (isObject && isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }

    if (position) {
      window.scrollTo(position.x, position.y);
    }
  });
}

function saveScrollPosition () {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function getScrollPosition () {
  var key = getStateKey();
  if (key) {
    return positionStore[key]
  }
}

function getElementPosition (el) {
  var docRect = document.documentElement.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left,
    y: elRect.top - docRect.top
  }
}

function isValidPosition (obj) {
  return isNumber(obj.x) || isNumber(obj.y)
}

function normalizePosition (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  }
}

function isNumber (v) {
  return typeof v === 'number'
}

/*  */

var supportsPushState = inBrowser && (function () {
  var ua = window.navigator.userAgent;

  if (
    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
    ua.indexOf('Mobile Safari') !== -1 &&
    ua.indexOf('Chrome') === -1 &&
    ua.indexOf('Windows Phone') === -1
  ) {
    return false
  }

  return window.history && 'pushState' in window.history
})();

// use User Timing api (if present) for more accurate key precision
var Time = inBrowser && window.performance && window.performance.now
  ? window.performance
  : Date;

var _key = genKey();

function genKey () {
  return Time.now().toFixed(3)
}

function getStateKey () {
  return _key
}

function setStateKey (key) {
  _key = key;
}

function pushState (url, replace) {
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history;
  try {
    if (replace) {
      history.replaceState({ key: _key }, '', url);
    } else {
      _key = genKey();
      history.pushState({ key: _key }, '', url);
    }
    saveScrollPosition();
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState (url) {
  pushState(url, true);
}

/*  */

function runQueue (queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

/*  */


var History = function History (router, base) {
  this.router = router;
  this.base = normalizeBase(base);
  // start with a route object that stands for "nowhere"
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
};

History.prototype.listen = function listen (cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady (cb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
  }
};

History.prototype.transitionTo = function transitionTo (location, onComplete, onAbort) {
    var this$1 = this;

  var route = this.router.match(location, this.current);
  this.confirmTransition(route, function () {
    this$1.updateRoute(route);
    onComplete && onComplete(route);
    this$1.ensureURL();

    // fire ready cbs once
    if (!this$1.ready) {
      this$1.ready = true;
      this$1.readyCbs.forEach(function (cb) {
        cb(route);
      });
    }
  }, onAbort);
};

History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
    var this$1 = this;

  var current = this.current;
  var abort = function () { onAbort && onAbort(); };
  if (
    isSameRoute(route, current) &&
    // in the case the route map has been dynamically appended to
    route.matched.length === current.matched.length
  ) {
    this.ensureURL();
    return abort()
  }

  var ref = resolveQueue(this.current.matched, route.matched);
    var updated = ref.updated;
    var deactivated = ref.deactivated;
    var activated = ref.activated;

  var queue = [].concat(
    // in-component leave guards
    extractLeaveGuards(deactivated),
    // global before hooks
    this.router.beforeHooks,
    // in-component update hooks
    extractUpdateHooks(updated),
    // in-config enter guards
    activated.map(function (m) { return m.beforeEnter; }),
    // async components
    resolveAsyncComponents(activated)
  );

  this.pending = route;
  var iterator = function (hook, next) {
    if (this$1.pending !== route) {
      return abort()
    }
    hook(route, current, function (to) {
      if (to === false) {
        // next(false) -> abort navigation, ensure current URL
        this$1.ensureURL(true);
        abort();
      } else if (typeof to === 'string' || typeof to === 'object') {
        // next('/') or next({ path: '/' }) -> redirect
        (typeof to === 'object' && to.replace) ? this$1.replace(to) : this$1.push(to);
        abort();
      } else {
        // confirm transition and pass on the value
        next(to);
      }
    });
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];
    var isValid = function () { return this$1.current === route; };
    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    // wait until async components are resolved before
    // extracting in-component enter guards
    runQueue(enterGuards, iterator, function () {
      if (this$1.pending !== route) {
        return abort()
      }
      this$1.pending = null;
      onComplete(route);
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) { return cb(); });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute (route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};

function normalizeBase (base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = baseEl ? baseEl.getAttribute('href') : '/';
    } else {
      base = '/';
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base;
  }
  // remove trailing slash
  return base.replace(/\/$/, '')
}

function resolveQueue (
  current,
  next
) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  }
}

function extractGuards (
  records,
  name,
  bind,
  reverse
) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);
    if (guard) {
      return Array.isArray(guard)
        ? guard.map(function (guard) { return bind(guard, instance, match, key); })
        : bind(guard, instance, match, key)
    }
  });
  return flatten(reverse ? guards.reverse() : guards)
}

function extractGuard (
  def,
  key
) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }
  return def.options[key]
}

function extractLeaveGuards (deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
}

function extractUpdateHooks (updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
}

function bindGuard (guard, instance) {
  return function boundRouteGuard () {
    return guard.apply(instance, arguments)
  }
}

function extractEnterGuards (
  activated,
  cbs,
  isValid
) {
  return extractGuards(activated, 'beforeRouteEnter', function (guard, _, match, key) {
    return bindEnterGuard(guard, match, key, cbs, isValid)
  })
}

function bindEnterGuard (
  guard,
  match,
  key,
  cbs,
  isValid
) {
  return function routeEnterGuard (to, from, next) {
    return guard(to, from, function (cb) {
      next(cb);
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
    })
  }
}

function poll (
  cb, // somehow flow cannot infer this is a function
  instances,
  key,
  isValid
) {
  if (instances[key]) {
    cb(instances[key]);
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}

function resolveAsyncComponents (matched) {
  return flatMapComponents(matched, function (def, _, match, key) {
    // if it's a function and doesn't have Vue options attached,
    // assume it's an async component resolve function.
    // we are not using Vue's default async resolving mechanism because
    // we want to halt the navigation until the incoming component has been
    // resolved.
    if (typeof def === 'function' && !def.options) {
      return function (to, from, next) {
        var resolve = once(function (resolvedDef) {
          match.components[key] = resolvedDef;
          next();
        });

        var reject = once(function (reason) {
          warn(false, ("Failed to resolve async component " + key + ": " + reason));
          next(false);
        });

        var res = def(resolve, reject);
        if (res && typeof res.then === 'function') {
          res.then(resolve, reject);
        }
      }
    }
  })
}

function flatMapComponents (
  matched,
  fn
) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) { return fn(
      m.components[key],
      m.instances[key],
      m, key
    ); })
  }))
}

function flatten (arr) {
  return Array.prototype.concat.apply([], arr)
}

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
function once (fn) {
  var called = false;
  return function () {
    if (called) { return }
    called = true;
    return fn.apply(this, arguments)
  }
}

/*  */


var HTML5History = (function (History$$1) {
  function HTML5History (router, base) {
    var this$1 = this;

    History$$1.call(this, router, base);

    var expectScroll = router.options.scrollBehavior;

    if (expectScroll) {
      setupScroll();
    }

    window.addEventListener('popstate', function (e) {
      this$1.transitionTo(getLocation(this$1.base), function (route) {
        if (expectScroll) {
          handleScroll(router, route, this$1.current, true);
        }
      });
    });
  }

  if ( History$$1 ) HTML5History.__proto__ = History$$1;
  HTML5History.prototype = Object.create( History$$1 && History$$1.prototype );
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go (n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, this$1.current, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, this$1.current, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL (push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation () {
    return getLocation(this.base)
  };

  return HTML5History;
}(History));

function getLocation (base) {
  var path = window.location.pathname;
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + window.location.search + window.location.hash
}

/*  */


var HashHistory = (function (History$$1) {
  function HashHistory (router, base, fallback) {
    History$$1.call(this, router, base);
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return
    }
    ensureSlash();
  }

  if ( History$$1 ) HashHistory.__proto__ = History$$1;
  HashHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  HashHistory.prototype.constructor = HashHistory;

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  HashHistory.prototype.setupListeners = function setupListeners () {
    var this$1 = this;

    window.addEventListener('hashchange', function () {
      if (!ensureSlash()) {
        return
      }
      this$1.transitionTo(getHash(), function (route) {
        replaceHash(route.fullPath);
      });
    });
  };

  HashHistory.prototype.push = function push (location, onComplete, onAbort) {
    this.transitionTo(location, function (route) {
      pushHash(route.fullPath);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    this.transitionTo(location, function (route) {
      replaceHash(route.fullPath);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HashHistory.prototype.go = function go (n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL (push) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    return getHash()
  };

  return HashHistory;
}(History));

function checkFallback (base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(
      cleanPath(base + '/#' + location)
    );
    return true
  }
}

function ensureSlash () {
  var path = getHash();
  if (path.charAt(0) === '/') {
    return true
  }
  replaceHash('/' + path);
  return false
}

function getHash () {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  return index === -1 ? '' : href.slice(index + 1)
}

function pushHash (path) {
  window.location.hash = path;
}

function replaceHash (path) {
  var i = window.location.href.indexOf('#');
  window.location.replace(
    window.location.href.slice(0, i >= 0 ? i : 0) + '#' + path
  );
}

/*  */


var AbstractHistory = (function (History$$1) {
  function AbstractHistory (router, base) {
    History$$1.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if ( History$$1 ) AbstractHistory.__proto__ = History$$1;
  AbstractHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
      this$1.index++;
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(location, function (route) {
      this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
      onComplete && onComplete(route);
    }, onAbort);
  };

  AbstractHistory.prototype.go = function go (n) {
    var this$1 = this;

    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(route, function () {
      this$1.index = targetIndex;
      this$1.updateRoute(route);
    });
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/'
  };

  AbstractHistory.prototype.ensureURL = function ensureURL () {
    // noop
  };

  return AbstractHistory;
}(History));

/*  */

var VueRouter = function VueRouter (options) {
  if ( options === void 0 ) options = {};

  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || []);

  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState;
  if (this.fallback) {
    mode = 'hash';
  }
  if (!inBrowser) {
    mode = 'abstract';
  }
  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break
    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break
    default:
      if (process.env.NODE_ENV !== 'production') {
        assert(false, ("invalid mode: " + mode));
      }
  }
};

var prototypeAccessors = { currentRoute: {} };

VueRouter.prototype.match = function match (
  raw,
  current,
  redirectedFrom
) {
  return this.matcher.match(raw, current, redirectedFrom)
};

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current
};

VueRouter.prototype.init = function init (app /* Vue component instance */) {
    var this$1 = this;

  process.env.NODE_ENV !== 'production' && assert(
    install.installed,
    "not installed. Make sure to call `Vue.use(VueRouter)` " +
    "before creating root instance."
  );

  this.apps.push(app);

  // main app already initialized.
  if (this.app) {
    return
  }

  this.app = app;

  var history = this.history;

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation());
  } else if (history instanceof HashHistory) {
    var setupHashListener = function () {
      history.setupListeners();
    };
    history.transitionTo(
      history.getCurrentLocation(),
      setupHashListener,
      setupHashListener
    );
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach (fn) {
  this.beforeHooks.push(fn);
};

VueRouter.prototype.afterEach = function afterEach (fn) {
  this.afterHooks.push(fn);
};

VueRouter.prototype.onReady = function onReady (cb) {
  this.history.onReady(cb);
};

VueRouter.prototype.push = function push (location, onComplete, onAbort) {
  this.history.push(location, onComplete, onAbort);
};

VueRouter.prototype.replace = function replace (location, onComplete, onAbort) {
  this.history.replace(location, onComplete, onAbort);
};

VueRouter.prototype.go = function go (n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back () {
  this.go(-1);
};

VueRouter.prototype.forward = function forward () {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
  var route = to
    ? this.resolve(to).route
    : this.currentRoute;
  if (!route) {
    return []
  }
  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key]
    })
  }))
};

VueRouter.prototype.resolve = function resolve (
  to,
  current,
  append
) {
  var location = normalizeLocation(to, current || this.history.current, append);
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  }
};

VueRouter.prototype.addRoutes = function addRoutes (routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties( VueRouter.prototype, prototypeAccessors );

function createHref (base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path
}

VueRouter.install = install;
VueRouter.version = '2.2.0';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

module.exports = VueRouter;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4)))

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(process, global) {/*!
 * Vue.js v2.1.10
 * (c) 2014-2017 Evan You
 * Released under the MIT License.
 */


/*  */

/**
 * Convert a value to a string that is actually rendered.
 */
function _toString (val) {
  return val == null
    ? ''
    : typeof val === 'object'
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert a input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Remove an item from an array
 */
function remove$1 (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether the object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Check if value is primitive
 */
function isPrimitive (value) {
  return typeof value === 'string' || typeof value === 'number'
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /([^-])([A-Z])/g;
var hyphenate = cached(function (str) {
  return str
    .replace(hyphenateRE, '$1-$2')
    .replace(hyphenateRE, '$1-$2')
    .toLowerCase()
});

/**
 * Simple bind, faster than native
 */
function bind$1 (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }
  // record original fn length
  boundFn._length = fn.length;
  return boundFn
}

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
var toString = Object.prototype.toString;
var OBJECT_STRING = '[object Object]';
function isPlainObject (obj) {
  return toString.call(obj) === OBJECT_STRING
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/**
 * Perform no operation.
 */
function noop () {}

/**
 * Always return false.
 */
var no = function () { return false; };

/**
 * Return same value
 */
var identity = function (_) { return _; };

/**
 * Generate a static keys string from compiler modules.
 */
function genStaticKeys (modules) {
  return modules.reduce(function (keys, m) {
    return keys.concat(m.staticKeys || [])
  }, []).join(',')
}

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    return JSON.stringify(a) === JSON.stringify(b)
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/*  */

var config = {
  /**
   * Option merge strategies (used in core/util/options)
   */
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Whether to enable devtools
   */
  devtools: process.env.NODE_ENV !== 'production',

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * List of asset types that a component can own.
   */
  _assetTypes: [
    'component',
    'directive',
    'filter'
  ],

  /**
   * List of lifecycle hooks.
   */
  _lifecycleHooks: [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed',
    'activated',
    'deactivated'
  ],

  /**
   * Max circular updates allowed in a scheduler flush cycle.
   */
  _maxUpdateCount: 100
};

/*  */

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = /[^\w.$]/;
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  } else {
    var segments = path.split('.');
    return function (obj) {
      for (var i = 0; i < segments.length; i++) {
        if (!obj) { return }
        obj = obj[segments[i]];
      }
      return obj
    }
  }
}

/*  */
/* globals MutationObserver */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = UA && UA.indexOf('android') > 0;
var isIOS = UA && /iphone|ipad|ipod|ios/.test(UA);

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return /native code/.test(Ctor.toString())
}

/**
 * Defer a task to execute it asynchronously.
 */
var nextTick = (function () {
  var callbacks = [];
  var pending = false;
  var timerFunc;

  function nextTickHandler () {
    pending = false;
    var copies = callbacks.slice(0);
    callbacks.length = 0;
    for (var i = 0; i < copies.length; i++) {
      copies[i]();
    }
  }

  // the nextTick behavior leverages the microtask queue, which can be accessed
  // via either native Promise.then or MutationObserver.
  // MutationObserver has wider support, however it is seriously bugged in
  // UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
  // completely stops working after triggering a few times... so, if native
  // Promise is available, we will use it:
  /* istanbul ignore if */
  if (typeof Promise !== 'undefined' && isNative(Promise)) {
    var p = Promise.resolve();
    var logError = function (err) { console.error(err); };
    timerFunc = function () {
      p.then(nextTickHandler).catch(logError);
      // in problematic UIWebViews, Promise.then doesn't completely break, but
      // it can get stuck in a weird state where callbacks are pushed into the
      // microtask queue but the queue isn't being flushed, until the browser
      // needs to do some other work, e.g. handle a timer. Therefore we can
      // "force" the microtask queue to be flushed by adding an empty timer.
      if (isIOS) { setTimeout(noop); }
    };
  } else if (typeof MutationObserver !== 'undefined' && (
    isNative(MutationObserver) ||
    // PhantomJS and iOS 7.x
    MutationObserver.toString() === '[object MutationObserverConstructor]'
  )) {
    // use MutationObserver where native Promise is not available,
    // e.g. PhantomJS IE11, iOS7, Android 4.4
    var counter = 1;
    var observer = new MutationObserver(nextTickHandler);
    var textNode = document.createTextNode(String(counter));
    observer.observe(textNode, {
      characterData: true
    });
    timerFunc = function () {
      counter = (counter + 1) % 2;
      textNode.data = String(counter);
    };
  } else {
    // fallback to setTimeout
    /* istanbul ignore next */
    timerFunc = function () {
      setTimeout(nextTickHandler, 0);
    };
  }

  return function queueNextTick (cb, ctx) {
    var _resolve;
    callbacks.push(function () {
      if (cb) { cb.call(ctx); }
      if (_resolve) { _resolve(ctx); }
    });
    if (!pending) {
      pending = true;
      timerFunc();
    }
    if (!cb && typeof Promise !== 'undefined') {
      return new Promise(function (resolve) {
        _resolve = resolve;
      })
    }
  }
})();

var _Set;
/* istanbul ignore if */
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = (function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

var warn = noop;
var formatComponentName;

if (process.env.NODE_ENV !== 'production') {
  var hasConsole = typeof console !== 'undefined';

  warn = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.error("[Vue warn]: " + msg + " " + (
        vm ? formatLocation(formatComponentName(vm)) : ''
      ));
    }
  };

  formatComponentName = function (vm) {
    if (vm.$root === vm) {
      return 'root instance'
    }
    var name = vm._isVue
      ? vm.$options.name || vm.$options._componentTag
      : vm.name;
    return (
      (name ? ("component <" + name + ">") : "anonymous component") +
      (vm._isVue && vm.$options.__file ? (" at " + (vm.$options.__file)) : '')
    )
  };

  var formatLocation = function (str) {
    if (str === 'anonymous component') {
      str += " - use the \"name\" option for better debugging messages.";
    }
    return ("\n(found in " + str + ")")
  };
}

/*  */


var uid$1 = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid$1++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove$1(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.target) {
    Dep.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stablize the subscriber list first
  var subs = this.subs.slice();
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// the current target watcher being evaluated.
// this is globally unique because there could be only one
// watcher being evaluated at any time.
Dep.target = null;
var targetStack = [];

function pushTarget (_target) {
  if (Dep.target) { targetStack.push(Dep.target); }
  Dep.target = _target;
}

function popTarget () {
  Dep.target = targetStack.pop();
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);[
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]
.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var arguments$1 = arguments;

    // avoid leaking arguments:
    // http://jsperf.com/closure-with-arguments
    var i = arguments.length;
    var args = new Array(i);
    while (i--) {
      args[i] = arguments$1[i];
    }
    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
        inserted = args;
        break
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * By default, when a reactive property is set, the new value is
 * also converted to become reactive. However when passing down props,
 * we don't want to force conversion because the value may be a nested value
 * under a frozen data structure. Converting it would defeat the optimization.
 */
var observerState = {
  shouldConvert: true,
  isSettingProps: false
};

/**
 * Observer class that are attached to each observed
 * object. Once attached, the observer converts target
 * object's property keys into getter/setters that
 * collect dependencies and dispatches updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    var augment = hasProto
      ? protoAugment
      : copyAugment;
    augment(value, arrayMethods, arrayKeys);
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through each property and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i], obj[keys[i]]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment an target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment an target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value)) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    observerState.shouldConvert &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;

  var childOb = observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.target) {
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
        }
        if (Array.isArray(value)) {
          dependArray(value);
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if (process.env.NODE_ENV !== 'production' && customSetter) {
        customSetter();
      }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set$1 (obj, key, val) {
  if (Array.isArray(obj)) {
    obj.length = Math.max(obj.length, key);
    obj.splice(key, 1, val);
    return val
  }
  if (hasOwn(obj, key)) {
    obj[key] = val;
    return
  }
  var ob = obj.__ob__;
  if (obj._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return
  }
  if (!ob) {
    obj[key] = val;
    return
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (obj, key) {
  var ob = obj.__ob__;
  if (obj._isVue || (ob && ob.vmCount)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(obj, key)) {
    return
  }
  delete obj[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (process.env.NODE_ENV !== 'production') {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;
  var keys = Object.keys(from);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set$1(to, key, fromVal);
    } else if (isPlainObject(toVal) && isPlainObject(fromVal)) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (typeof childVal !== 'function') {
      process.env.NODE_ENV !== 'production' && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        childVal.call(this),
        parentVal.call(this)
      )
    }
  } else if (parentVal || childVal) {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm)
        : undefined;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
};

/**
 * Hooks and param attributes are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  return childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal
}

config._lifecycleHooks.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (parentVal, childVal) {
  var res = Object.create(parentVal || null);
  return childVal
    ? extend(res, childVal)
    : res
}

config._assetTypes.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (parentVal, childVal) {
  /* istanbul ignore if */
  if (!childVal) { return parentVal }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key in childVal) {
    var parent = ret[key];
    var child = childVal[key];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key] = parent
      ? parent.concat(child)
      : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.computed = function (parentVal, childVal) {
  if (!childVal) { return parentVal }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  extend(ret, childVal);
  return ret
};

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    var lower = key.toLowerCase();
    if (isBuiltInTag(lower) || config.isReservedTag(lower)) {
      warn(
        'Do not use built-in or reserved HTML elements as component ' +
        'id: ' + key
      );
    }
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (process.env.NODE_ENV !== 'production') {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  }
  options.props = res;
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def = dirs[key];
      if (typeof def === 'function') {
        dirs[key] = { bind: def, update: def };
      }
    }
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (process.env.NODE_ENV !== 'production') {
    checkComponents(child);
  }
  normalizeProps(child);
  normalizeDirectives(child);
  var extendsFrom = child.extends;
  if (extendsFrom) {
    parent = typeof extendsFrom === 'function'
      ? mergeOptions(parent, extendsFrom.options, vm)
      : mergeOptions(parent, extendsFrom, vm);
  }
  if (child.mixins) {
    for (var i = 0, l = child.mixins.length; i < l; i++) {
      var mixin = child.mixins[i];
      if (mixin.prototype instanceof Vue$2) {
        mixin = mixin.options;
      }
      parent = mergeOptions(parent, mixin, vm);
    }
  }
  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if (process.env.NODE_ENV !== 'production' && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */

function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // handle boolean props
  if (isType(Boolean, prop.type)) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (!isType(String, prop.type) && (value === '' || value === hyphenate(key))) {
      value = true;
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldConvert = observerState.shouldConvert;
    observerState.shouldConvert = true;
    observe(value);
    observerState.shouldConvert = prevShouldConvert;
  }
  if (process.env.NODE_ENV !== 'production') {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if (isObject(def)) {
    process.env.NODE_ENV !== 'production' && warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm[key] !== undefined) {
    return vm[key]
  }
  // call factory function for non-Function types
  return typeof def === 'function' && prop.type !== Function
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }
  if (!valid) {
    warn(
      'Invalid prop: type check failed for prop "' + name + '".' +
      ' Expected ' + expectedTypes.map(capitalize).join(', ') +
      ', got ' + Object.prototype.toString.call(value).slice(8, -1) + '.',
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

/**
 * Assert the type of a value
 */
function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (expectedType === 'String') {
    valid = typeof value === (expectedType = 'string');
  } else if (expectedType === 'Number') {
    valid = typeof value === (expectedType = 'number');
  } else if (expectedType === 'Boolean') {
    valid = typeof value === (expectedType = 'boolean');
  } else if (expectedType === 'Function') {
    valid = typeof value === (expectedType = 'function');
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match && match[1]
}

function isType (type, fn) {
  if (!Array.isArray(fn)) {
    return getType(fn) === getType(type)
  }
  for (var i = 0, len = fn.length; i < len; i++) {
    if (getType(fn[i]) === getType(type)) {
      return true
    }
  }
  /* istanbul ignore next */
  return false
}



var util = Object.freeze({
	defineReactive: defineReactive$$1,
	_toString: _toString,
	toNumber: toNumber,
	makeMap: makeMap,
	isBuiltInTag: isBuiltInTag,
	remove: remove$1,
	hasOwn: hasOwn,
	isPrimitive: isPrimitive,
	cached: cached,
	camelize: camelize,
	capitalize: capitalize,
	hyphenate: hyphenate,
	bind: bind$1,
	toArray: toArray,
	extend: extend,
	isObject: isObject,
	isPlainObject: isPlainObject,
	toObject: toObject,
	noop: noop,
	no: no,
	identity: identity,
	genStaticKeys: genStaticKeys,
	looseEqual: looseEqual,
	looseIndexOf: looseIndexOf,
	isReserved: isReserved,
	def: def,
	parsePath: parsePath,
	hasProto: hasProto,
	inBrowser: inBrowser,
	UA: UA,
	isIE: isIE,
	isIE9: isIE9,
	isEdge: isEdge,
	isAndroid: isAndroid,
	isIOS: isIOS,
	isServerRendering: isServerRendering,
	devtools: devtools,
	nextTick: nextTick,
	get _Set () { return _Set; },
	mergeOptions: mergeOptions,
	resolveAsset: resolveAsset,
	get warn () { return warn; },
	get formatComponentName () { return formatComponentName; },
	validateProp: validateProp
});

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (process.env.NODE_ENV !== 'production') {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      "referenced during render. Make sure to declare reactive data " +
      "properties in the data option.",
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' &&
    Proxy.toString().match(/native code/);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) || key.charAt(0) === '_';
      if (!has && !isAllowed) {
        warnNonPresent(target, key);
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        warnNonPresent(target, key);
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.functionalContext = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
};

var prototypeAccessors = { child: {} };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function () {
  var node = new VNode();
  node.text = '';
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    vnode.children,
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isCloned = true;
  return cloned
}

function cloneVNodes (vnodes) {
  var res = new Array(vnodes.length);
  for (var i = 0; i < vnodes.length; i++) {
    res[i] = cloneVNode(vnodes[i]);
  }
  return res
}

/*  */

var hooks = { init: init, prepatch: prepatch, insert: insert, destroy: destroy$1 };
var hooksToMerge = Object.keys(hooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (!Ctor) {
    return
  }

  var baseCtor = context.$options._base;
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  if (typeof Ctor !== 'function') {
    if (process.env.NODE_ENV !== 'production') {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  if (!Ctor.cid) {
    if (Ctor.resolved) {
      Ctor = Ctor.resolved;
    } else {
      Ctor = resolveAsyncComponent(Ctor, baseCtor, function () {
        // it's ok to queue this on every render because
        // $forceUpdate is buffered by the scheduler.
        context.$forceUpdate();
      });
      if (!Ctor) {
        // return nothing if this is indeed an async component
        // wait for the callback to trigger parent update.
        return
      }
    }
  }

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  data = data || {};

  // extract props
  var propsData = extractProps(data, Ctor);

  // functional component
  if (Ctor.options.functional) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  data.on = data.nativeOn;

  if (Ctor.options.abstract) {
    // abstract components do not keep anything
    // other than props & listeners
    data = {};
  }

  // merge component management hooks onto the placeholder node
  mergeHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children }
  );
  return vnode
}

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  context,
  children
) {
  var props = {};
  var propOptions = Ctor.options.props;
  if (propOptions) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData);
    }
  }
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var _context = Object.create(context);
  var h = function (a, b, c, d) { return createElement(_context, a, b, c, d, true); };
  var vnode = Ctor.options.render.call(null, h, {
    props: props,
    data: data,
    parent: context,
    children: children,
    slots: function () { return resolveSlots(children, context); }
  });
  if (vnode instanceof VNode) {
    vnode.functionalContext = context;
    if (data.slot) {
      (vnode.data || (vnode.data = {})).slot = data.slot;
    }
  }
  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent, // activeInstance in lifecycle state
  parentElm,
  refElm
) {
  var vnodeComponentOptions = vnode.componentOptions;
  var options = {
    _isComponent: true,
    parent: parent,
    propsData: vnodeComponentOptions.propsData,
    _componentTag: vnodeComponentOptions.tag,
    _parentVnode: vnode,
    _parentListeners: vnodeComponentOptions.listeners,
    _renderChildren: vnodeComponentOptions.children,
    _parentElm: parentElm || null,
    _refElm: refElm || null
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (inlineTemplate) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnodeComponentOptions.Ctor(options)
}

function init (
  vnode,
  hydrating,
  parentElm,
  refElm
) {
  if (!vnode.componentInstance || vnode.componentInstance._isDestroyed) {
    var child = vnode.componentInstance = createComponentInstanceForVnode(
      vnode,
      activeInstance,
      parentElm,
      refElm
    );
    child.$mount(hydrating ? vnode.elm : undefined, hydrating);
  } else if (vnode.data.keepAlive) {
    // kept-alive components, treat as a patch
    var mountedNode = vnode; // work around flow
    prepatch(mountedNode, mountedNode);
  }
}

function prepatch (
  oldVnode,
  vnode
) {
  var options = vnode.componentOptions;
  var child = vnode.componentInstance = oldVnode.componentInstance;
  child._updateFromParent(
    options.propsData, // updated props
    options.listeners, // updated listeners
    vnode, // new parent vnode
    options.children // new children
  );
}

function insert (vnode) {
  if (!vnode.componentInstance._isMounted) {
    vnode.componentInstance._isMounted = true;
    callHook(vnode.componentInstance, 'mounted');
  }
  if (vnode.data.keepAlive) {
    vnode.componentInstance._inactive = false;
    callHook(vnode.componentInstance, 'activated');
  }
}

function destroy$1 (vnode) {
  if (!vnode.componentInstance._isDestroyed) {
    if (!vnode.data.keepAlive) {
      vnode.componentInstance.$destroy();
    } else {
      vnode.componentInstance._inactive = true;
      callHook(vnode.componentInstance, 'deactivated');
    }
  }
}

function resolveAsyncComponent (
  factory,
  baseCtor,
  cb
) {
  if (factory.requested) {
    // pool callbacks
    factory.pendingCallbacks.push(cb);
  } else {
    factory.requested = true;
    var cbs = factory.pendingCallbacks = [cb];
    var sync = true;

    var resolve = function (res) {
      if (isObject(res)) {
        res = baseCtor.extend(res);
      }
      // cache resolved
      factory.resolved = res;
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        for (var i = 0, l = cbs.length; i < l; i++) {
          cbs[i](res);
        }
      }
    };

    var reject = function (reason) {
      process.env.NODE_ENV !== 'production' && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
    };

    var res = factory(resolve, reject);

    // handle promise
    if (res && typeof res.then === 'function' && !factory.resolved) {
      res.then(resolve, reject);
    }

    sync = false;
    // return in case resolved synchronously
    return factory.resolved
  }
}

function extractProps (data, Ctor) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (!propOptions) {
    return
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  var domProps = data.domProps;
  if (attrs || props || domProps) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey) ||
      checkProp(res, domProps, key, altKey);
    }
  }
  return res
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (hash) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

function mergeHooks (data) {
  if (!data.hook) {
    data.hook = {};
  }
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var fromParent = data.hook[key];
    var ours = hooks[key];
    data.hook[key] = fromParent ? mergeHook$1(ours, fromParent) : ours;
  }
}

function mergeHook$1 (one, two) {
  return function (a, b, c, d) {
    one(a, b, c, d);
    two(a, b, c, d);
  }
}

/*  */

function mergeVNodeHook (def, hookKey, hook, key) {
  key = key + hookKey;
  var injectedHash = def.__injected || (def.__injected = {});
  if (!injectedHash[key]) {
    injectedHash[key] = true;
    var oldHook = def[hookKey];
    if (oldHook) {
      def[hookKey] = function () {
        oldHook.apply(this, arguments);
        hook.apply(this, arguments);
      };
    } else {
      def[hookKey] = hook;
    }
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var once = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once,
    capture: capture
  }
});

function createEventHandle (fn) {
  var handle = {
    fn: fn,
    invoker: function () {
      var arguments$1 = arguments;

      var fn = handle.fn;
      if (Array.isArray(fn)) {
        for (var i = 0; i < fn.length; i++) {
          fn[i].apply(null, arguments$1);
        }
      } else {
        fn.apply(null, arguments);
      }
    }
  };
  return handle
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  vm
) {
  var name, cur, old, event;
  for (name in on) {
    cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (!cur) {
      process.env.NODE_ENV !== 'production' && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (!old) {
      if (!cur.invoker) {
        cur = on[name] = createEventHandle(cur);
      }
      add(event.name, cur.invoker, event.once, event.capture);
    } else if (cur !== old) {
      old.fn = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (!on[name]) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name].invoker, event.capture);
    }
  }
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// nomralization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constrcuts that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (c == null || typeof c === 'boolean') { continue }
    last = res[res.length - 1];
    //  nested
    if (Array.isArray(c)) {
      res.push.apply(res, normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i)));
    } else if (isPrimitive(c)) {
      if (last && last.text) {
        last.text += String(c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (c.text && last && last.text) {
        res[res.length - 1] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (c.tag && c.key == null && nestedIndex != null) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function getFirstComponentChild (children) {
  return children && children.filter(function (c) { return c && c.componentOptions; })[0]
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (alwaysNormalize) { normalizationType = ALWAYS_NORMALIZE; }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (data && data.__ob__) {
    process.env.NODE_ENV !== 'production' && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
      typeof children[0] === 'function') {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (vnode) {
    if (ns) { applyNS(vnode, ns); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    return
  }
  if (vnode.children) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (child.tag && !child.ns) {
        applyNS(child, ns);
      }
    }
  }
}

/*  */

function initRender (vm) {
  vm.$vnode = null; // the placeholder node in parent tree
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null;
  var parentVnode = vm.$options._parentVnode;
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(vm.$options._renderChildren, renderContext);
  vm.$scopedSlots = {};
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };
}

function renderMixin (Vue) {
  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var staticRenderFns = ref.staticRenderFns;
    var _parentVnode = ref._parentVnode;

    if (vm._isMounted) {
      // clone slot nodes on re-renders
      for (var key in vm.$slots) {
        vm.$slots[key] = cloneVNodes(vm.$slots[key]);
      }
    }

    if (_parentVnode && _parentVnode.data.scopedSlots) {
      vm.$scopedSlots = _parentVnode.data.scopedSlots;
    }

    if (staticRenderFns && !vm._staticTrees) {
      vm._staticTrees = [];
    }
    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      /* istanbul ignore else */
      if (config.errorHandler) {
        config.errorHandler.call(null, e, vm);
      } else {
        if (process.env.NODE_ENV !== 'production') {
          warn(("Error when rendering " + (formatComponentName(vm)) + ":"));
        }
        throw e
      }
      // return previous vnode to prevent render error causing blank component
      vnode = vm._vnode;
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if (process.env.NODE_ENV !== 'production' && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };

  // toString for mustaches
  Vue.prototype._s = _toString;
  // convert text to vnode
  Vue.prototype._v = createTextVNode;
  // number conversion
  Vue.prototype._n = toNumber;
  // empty vnode
  Vue.prototype._e = createEmptyVNode;
  // loose equal
  Vue.prototype._q = looseEqual;
  // loose indexOf
  Vue.prototype._i = looseIndexOf;

  // render static tree by index
  Vue.prototype._m = function renderStatic (
    index,
    isInFor
  ) {
    var tree = this._staticTrees[index];
    // if has already-rendered static tree and not inside v-for,
    // we can reuse the same tree by doing a shallow clone.
    if (tree && !isInFor) {
      return Array.isArray(tree)
        ? cloneVNodes(tree)
        : cloneVNode(tree)
    }
    // otherwise, render a fresh tree.
    tree = this._staticTrees[index] = this.$options.staticRenderFns[index].call(this._renderProxy);
    markStatic(tree, ("__static__" + index), false);
    return tree
  };

  // mark node as static (v-once)
  Vue.prototype._o = function markOnce (
    tree,
    index,
    key
  ) {
    markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
    return tree
  };

  function markStatic (tree, key, isOnce) {
    if (Array.isArray(tree)) {
      for (var i = 0; i < tree.length; i++) {
        if (tree[i] && typeof tree[i] !== 'string') {
          markStaticNode(tree[i], (key + "_" + i), isOnce);
        }
      }
    } else {
      markStaticNode(tree, key, isOnce);
    }
  }

  function markStaticNode (node, key, isOnce) {
    node.isStatic = true;
    node.key = key;
    node.isOnce = isOnce;
  }

  // filter resolution helper
  Vue.prototype._f = function resolveFilter (id) {
    return resolveAsset(this.$options, 'filters', id, true) || identity
  };

  // render v-for
  Vue.prototype._l = function renderList (
    val,
    render
  ) {
    var ret, i, l, keys, key;
    if (Array.isArray(val) || typeof val === 'string') {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = render(val[i], i);
      }
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0; i < val; i++) {
        ret[i] = render(i + 1, i);
      }
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i);
      }
    }
    return ret
  };

  // renderSlot
  Vue.prototype._t = function (
    name,
    fallback,
    props,
    bindObject
  ) {
    var scopedSlotFn = this.$scopedSlots[name];
    if (scopedSlotFn) { // scoped slot
      props = props || {};
      if (bindObject) {
        extend(props, bindObject);
      }
      return scopedSlotFn(props) || fallback
    } else {
      var slotNodes = this.$slots[name];
      // warn duplicate slot usage
      if (slotNodes && process.env.NODE_ENV !== 'production') {
        slotNodes._rendered && warn(
          "Duplicate presence of slot \"" + name + "\" found in the same render tree " +
          "- this will likely cause render errors.",
          this
        );
        slotNodes._rendered = true;
      }
      return slotNodes || fallback
    }
  };

  // apply v-bind object
  Vue.prototype._b = function bindProps (
    data,
    tag,
    value,
    asProp
  ) {
    if (value) {
      if (!isObject(value)) {
        process.env.NODE_ENV !== 'production' && warn(
          'v-bind without argument expects an Object or Array value',
          this
        );
      } else {
        if (Array.isArray(value)) {
          value = toObject(value);
        }
        for (var key in value) {
          if (key === 'class' || key === 'style') {
            data[key] = value[key];
          } else {
            var type = data.attrs && data.attrs.type;
            var hash = asProp || config.mustUseProp(tag, type, key)
              ? data.domProps || (data.domProps = {})
              : data.attrs || (data.attrs = {});
            hash[key] = value[key];
          }
        }
      }
    }
    return data
  };

  // check v-on keyCodes
  Vue.prototype._k = function checkKeyCodes (
    eventKeyCode,
    key,
    builtInAlias
  ) {
    var keyCodes = config.keyCodes[key] || builtInAlias;
    if (Array.isArray(keyCodes)) {
      return keyCodes.indexOf(eventKeyCode) === -1
    } else {
      return keyCodes !== eventKeyCode
    }
  };
}

function resolveSlots (
  children,
  context
) {
  var slots = {};
  if (!children) {
    return slots
  }
  var defaultSlot = [];
  var name, child;
  for (var i = 0, l = children.length; i < l; i++) {
    child = children[i];
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.functionalContext === context) &&
        child.data && (name = child.data.slot)) {
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children);
      } else {
        slot.push(child);
      }
    } else {
      defaultSlot.push(child);
    }
  }
  // ignore single whitespace
  if (defaultSlot.length && !(
    defaultSlot.length === 1 &&
    (defaultSlot[0].text === ' ' || defaultSlot[0].isComment)
  )) {
    slots.default = defaultSlot;
  }
  return slots
}

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add$1 (event, fn, once) {
  if (once) {
    target.$once(event, fn);
  } else {
    target.$on(event, fn);
  }
}

function remove$2 (event, fn) {
  target.$off(event, fn);
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add$1, remove$2, vm);
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;(vm._events[event] || (vm._events[event] = [])).push(fn);
    // optimize hook:event cost by using a boolean flag marked at registration
    // instead of a hash lookup
    if (hookRE.test(event)) {
      vm._hasHookEvent = true;
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (arguments.length === 1) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      for (var i = 0, l = cbs.length; i < l; i++) {
        cbs[i].apply(vm, args);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._mount = function (
    el,
    hydrating
  ) {
    var vm = this;
    vm.$el = el;
    if (!vm.$options.render) {
      vm.$options.render = createEmptyVNode;
      if (process.env.NODE_ENV !== 'production') {
        /* istanbul ignore if */
        if (vm.$options.template && vm.$options.template.charAt(0) !== '#') {
          warn(
            'You are using the runtime-only build of Vue where the template ' +
            'option is not available. Either pre-compile the templates into ' +
            'render functions, or use the compiler-included build.',
            vm
          );
        } else {
          warn(
            'Failed to mount component: template or render function not defined.',
            vm
          );
        }
      }
    }
    callHook(vm, 'beforeMount');
    vm._watcher = new Watcher(vm, function updateComponent () {
      vm._update(vm._render(), hydrating);
    }, noop);
    hydrating = false;
    // manually mounted instance, call mounted on self
    // mounted is called for render-created child components in its inserted hook
    if (vm.$vnode == null) {
      vm._isMounted = true;
      callHook(vm, 'mounted');
    }
    return vm
  };

  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate');
    }
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var prevActiveInstance = activeInstance;
    activeInstance = vm;
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(
        vm.$el, vnode, hydrating, false /* removeOnly */,
        vm.$options._parentElm,
        vm.$options._refElm
      );
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    activeInstance = prevActiveInstance;
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype._updateFromParent = function (
    propsData,
    listeners,
    parentVnode,
    renderChildren
  ) {
    var vm = this;
    var hasChildren = !!(vm.$options._renderChildren || renderChildren);
    vm.$options._parentVnode = parentVnode;
    vm.$vnode = parentVnode; // update vm's placeholder node without re-render
    if (vm._vnode) { // update child tree's parent
      vm._vnode.parent = parentVnode;
    }
    vm.$options._renderChildren = renderChildren;
    // update props
    if (propsData && vm.$options.props) {
      observerState.shouldConvert = false;
      if (process.env.NODE_ENV !== 'production') {
        observerState.isSettingProps = true;
      }
      var propKeys = vm.$options._propKeys || [];
      for (var i = 0; i < propKeys.length; i++) {
        var key = propKeys[i];
        vm[key] = validateProp(key, vm.$options.props, propsData, vm);
      }
      observerState.shouldConvert = true;
      if (process.env.NODE_ENV !== 'production') {
        observerState.isSettingProps = false;
      }
      vm.$options.propsData = propsData;
    }
    // update listeners
    if (listeners) {
      var oldListeners = vm.$options._parentListeners;
      vm.$options._parentListeners = listeners;
      updateComponentListeners(vm, listeners, oldListeners);
    }
    // resolve slots + force update if has children
    if (hasChildren) {
      vm.$slots = resolveSlots(renderChildren, parentVnode.context);
      vm.$forceUpdate();
    }
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove$1(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
  };
}

function callHook (vm, hook) {
  var handlers = vm.$options[hook];
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      handlers[i].call(vm);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
}

/*  */


var queue = [];
var has$1 = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  queue.length = 0;
  has$1 = {};
  if (process.env.NODE_ENV !== 'production') {
    circular = {};
  }
  waiting = flushing = false;
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  flushing = true;
  var watcher, id, vm;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    id = watcher.id;
    has$1[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if (process.env.NODE_ENV !== 'production' && has$1[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > config._maxUpdateCount) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // call updated hooks
  index = queue.length;
  while (index--) {
    watcher = queue[index];
    vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted) {
      callHook(vm, 'updated');
    }
  }

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }

  resetSchedulerState();
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has$1[id] == null) {
    has$1[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i >= 0 && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(Math.max(i, index) + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */

var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options
) {
  this.vm = vm;
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression = process.env.NODE_ENV !== 'production'
    ? expOrFn.toString()
    : '';
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = function () {};
      process.env.NODE_ENV !== 'production' && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value = this.getter.call(this.vm, this.vm);
  // "touch" every property so they are all tracked as
  // dependencies for deep watching
  if (this.deep) {
    traverse(value);
  }
  popTarget();
  this.cleanupDeps();
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    var dep = this$1.deps[i];
    if (!this$1.newDepIds.has(dep.id)) {
      dep.removeSub(this$1);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          /* istanbul ignore else */
          if (config.errorHandler) {
            config.errorHandler.call(null, e, this.vm);
          } else {
            process.env.NODE_ENV !== 'production' && warn(
              ("Error in watcher \"" + (this.expression) + "\""),
              this.vm
            );
            throw e
          }
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
    var this$1 = this;

  var i = this.deps.length;
  while (i--) {
    this$1.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
    var this$1 = this;

  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove$1(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this$1.deps[i].removeSub(this$1);
    }
    this.active = false;
  }
};

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
var seenObjects = new _Set();
function traverse (val) {
  seenObjects.clear();
  _traverse(val, seenObjects);
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || !Object.isExtensible(val)) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

/*  */

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch) { initWatch(vm, opts.watch); }
}

var isReservedProp = { key: 1, ref: 1, slot: 1 };

function initProps (vm, props) {
  var propsData = vm.$options.propsData || {};
  var keys = vm.$options._propKeys = Object.keys(props);
  var isRoot = !vm.$parent;
  // root instance props should be converted
  observerState.shouldConvert = isRoot;
  var loop = function ( i ) {
    var key = keys[i];
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      if (isReservedProp[key]) {
        warn(
          ("\"" + key + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(vm, key, validateProp(key, props, propsData, vm), function () {
        if (vm.$parent && !observerState.isSettingProps) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {
      defineReactive$$1(vm, key, validateProp(key, props, propsData, vm));
    }
  };

  for (var i = 0; i < keys.length; i++) loop( i );
  observerState.shouldConvert = true;
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? data.call(vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
    process.env.NODE_ENV !== 'production' && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var i = keys.length;
  while (i--) {
    if (props && hasOwn(props, keys[i])) {
      process.env.NODE_ENV !== 'production' && warn(
        "The data property \"" + (keys[i]) + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else {
      proxy(vm, keys[i]);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

var computedSharedDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function initComputed (vm, computed) {
  for (var key in computed) {
    /* istanbul ignore if */
    if (process.env.NODE_ENV !== 'production' && key in vm) {
      warn(
        "existing instance property \"" + key + "\" will be " +
        "overwritten by a computed property with the same name.",
        vm
      );
    }
    var userDef = computed[key];
    if (typeof userDef === 'function') {
      computedSharedDefinition.get = makeComputedGetter(userDef, vm);
      computedSharedDefinition.set = noop;
    } else {
      computedSharedDefinition.get = userDef.get
        ? userDef.cache !== false
          ? makeComputedGetter(userDef.get, vm)
          : bind$1(userDef.get, vm)
        : noop;
      computedSharedDefinition.set = userDef.set
        ? bind$1(userDef.set, vm)
        : noop;
    }
    Object.defineProperty(vm, key, computedSharedDefinition);
  }
}

function makeComputedGetter (getter, owner) {
  var watcher = new Watcher(owner, getter, noop, {
    lazy: true
  });
  return function computedGetter () {
    if (watcher.dirty) {
      watcher.evaluate();
    }
    if (Dep.target) {
      watcher.depend();
    }
    return watcher.value
  }
}

function initMethods (vm, methods) {
  for (var key in methods) {
    vm[key] = methods[key] == null ? noop : bind$1(methods[key], vm);
    if (process.env.NODE_ENV !== 'production' && methods[key] == null) {
      warn(
        "method \"" + key + "\" has an undefined value in the component definition. " +
        "Did you reference the function correctly?",
        vm
      );
    }
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (vm, key, handler) {
  var options;
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  vm.$watch(key, handler, options);
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () {
    return this._data
  };
  if (process.env.NODE_ENV !== 'production') {
    dataDef.set = function (newData) {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);

  Vue.prototype.$set = set$1;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      cb.call(vm, watcher.value);
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

function proxy (vm, key) {
  if (!isReserved(key)) {
    Object.defineProperty(vm, key, {
      configurable: true,
      enumerable: true,
      get: function proxyGetter () {
        return vm._data[key]
      },
      set: function proxySetter (val) {
        vm._data[key] = val;
      }
    });
  }
}

/*  */

var uid = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid++;
    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (process.env.NODE_ENV !== 'production') {
      initProxy(vm);
    } else {
      vm._renderProxy = vm;
    }
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    initState(vm);
    callHook(vm, 'created');
    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  opts.parent = options.parent;
  opts.propsData = options.propsData;
  opts._parentVnode = options._parentVnode;
  opts._parentListeners = options._parentListeners;
  opts._renderChildren = options._renderChildren;
  opts._componentTag = options._componentTag;
  opts._parentElm = options._parentElm;
  opts._refElm = options._refElm;
  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = Ctor.super.options;
    var cachedSuperOptions = Ctor.superOptions;
    var extendOptions = Ctor.extendOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed
      Ctor.superOptions = superOptions;
      extendOptions.render = options.render;
      extendOptions.staticRenderFns = options.staticRenderFns;
      extendOptions._scopeId = options._scopeId;
      options = Ctor.options = mergeOptions(superOptions, extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function Vue$2 (options) {
  if (process.env.NODE_ENV !== 'production' &&
    !(this instanceof Vue$2)) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue$2);
stateMixin(Vue$2);
eventsMixin(Vue$2);
lifecycleMixin(Vue$2);
renderMixin(Vue$2);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    /* istanbul ignore if */
    if (plugin.installed) {
      return
    }
    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else {
      plugin.apply(null, args);
    }
    plugin.installed = true;
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }
    var name = extendOptions.name || Super.options.name;
    if (process.env.NODE_ENV !== 'production') {
      if (!/^[a-zA-Z][\w-]*$/.test(name)) {
        warn(
          'Invalid component name: "' + name + '". Component names ' +
          'can only contain alphanumeric characters and the hyphen, ' +
          'and must start with a letter.'
        );
      }
    }
    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;
    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;
    // create asset registers, so extended classes
    // can have their private assets too.
    config._assetTypes.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }
    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  config._assetTypes.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if (process.env.NODE_ENV !== 'production') {
          if (type === 'component' && config.isReservedTag(id)) {
            warn(
              'Do not use built-in or reserved HTML elements as component ' +
              'id: ' + id
            );
          }
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */

var patternTypes = [String, RegExp];

function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else {
    return pattern.test(name)
  }
}

function pruneCache (cache, filter) {
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cachedNode);
        cache[key] = null;
      }
    }
  }
}

function pruneCacheEntry (vnode) {
  if (vnode) {
    if (!vnode.componentInstance._inactive) {
      callHook(vnode.componentInstance, 'deactivated');
    }
    vnode.componentInstance.$destroy();
  }
}

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes
  },

  created: function created () {
    this.cache = Object.create(null);
  },

  destroyed: function destroyed () {
    var this$1 = this;

    for (var key in this.cache) {
      pruneCacheEntry(this$1.cache[key]);
    }
  },

  watch: {
    include: function include (val) {
      pruneCache(this.cache, function (name) { return matches(val, name); });
    },
    exclude: function exclude (val) {
      pruneCache(this.cache, function (name) { return !matches(val, name); });
    }
  },

  render: function render () {
    var vnode = getFirstComponentChild(this.$slots.default);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      if (name && (
        (this.include && !matches(this.include, name)) ||
        (this.exclude && matches(this.exclude, name))
      )) {
        return vnode
      }
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (this.cache[key]) {
        vnode.componentInstance = this.cache[key].componentInstance;
      } else {
        this.cache[key] = vnode;
      }
      vnode.data.keepAlive = true;
    }
    return vnode
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);
  Vue.util = util;
  Vue.set = set$1;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  Vue.options = Object.create(null);
  config._assetTypes.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue$2);

Object.defineProperty(Vue$2.prototype, '$isServer', {
  get: isServerRendering
});

Vue$2.version = '2.1.10';

/*  */

// attributes that should be using props for binding
var acceptValue = makeMap('input,textarea,option,select');
var mustUseProp = function (tag, type, attr) {
  return (
    (attr === 'value' && acceptValue(tag)) && type !== 'button' ||
    (attr === 'selected' && tag === 'option') ||
    (attr === 'checked' && tag === 'input') ||
    (attr === 'muted' && tag === 'video')
  )
};

var isEnumeratedAttr = makeMap('contenteditable,draggable,spellcheck');

var isBooleanAttr = makeMap(
  'allowfullscreen,async,autofocus,autoplay,checked,compact,controls,declare,' +
  'default,defaultchecked,defaultmuted,defaultselected,defer,disabled,' +
  'enabled,formnovalidate,hidden,indeterminate,inert,ismap,itemscope,loop,multiple,' +
  'muted,nohref,noresize,noshade,novalidate,nowrap,open,pauseonexit,readonly,' +
  'required,reversed,scoped,seamless,selected,sortable,translate,' +
  'truespeed,typemustmatch,visible'
);

var xlinkNS = 'http://www.w3.org/1999/xlink';

var isXlink = function (name) {
  return name.charAt(5) === ':' && name.slice(0, 5) === 'xlink'
};

var getXlinkProp = function (name) {
  return isXlink(name) ? name.slice(6, name.length) : ''
};

var isFalsyAttrValue = function (val) {
  return val == null || val === false
};

/*  */

function genClassForVnode (vnode) {
  var data = vnode.data;
  var parentNode = vnode;
  var childNode = vnode;
  while (childNode.componentInstance) {
    childNode = childNode.componentInstance._vnode;
    if (childNode.data) {
      data = mergeClassData(childNode.data, data);
    }
  }
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data) {
      data = mergeClassData(data, parentNode.data);
    }
  }
  return genClassFromData(data)
}

function mergeClassData (child, parent) {
  return {
    staticClass: concat(child.staticClass, parent.staticClass),
    class: child.class
      ? [child.class, parent.class]
      : parent.class
  }
}

function genClassFromData (data) {
  var dynamicClass = data.class;
  var staticClass = data.staticClass;
  if (staticClass || dynamicClass) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  var res = '';
  if (!value) {
    return res
  }
  if (typeof value === 'string') {
    return value
  }
  if (Array.isArray(value)) {
    var stringified;
    for (var i = 0, l = value.length; i < l; i++) {
      if (value[i]) {
        if ((stringified = stringifyClass(value[i]))) {
          res += stringified + ' ';
        }
      }
    }
    return res.slice(0, -1)
  }
  if (isObject(value)) {
    for (var key in value) {
      if (value[key]) { res += key + ' '; }
    }
    return res.slice(0, -1)
  }
  /* istanbul ignore next */
  return res
}

/*  */

var namespaceMap = {
  svg: 'http://www.w3.org/2000/svg',
  math: 'http://www.w3.org/1998/Math/MathML'
};

var isHTMLTag = makeMap(
  'html,body,base,head,link,meta,style,title,' +
  'address,article,aside,footer,header,h1,h2,h3,h4,h5,h6,hgroup,nav,section,' +
  'div,dd,dl,dt,figcaption,figure,hr,img,li,main,ol,p,pre,ul,' +
  'a,b,abbr,bdi,bdo,br,cite,code,data,dfn,em,i,kbd,mark,q,rp,rt,rtc,ruby,' +
  's,samp,small,span,strong,sub,sup,time,u,var,wbr,area,audio,map,track,video,' +
  'embed,object,param,source,canvas,script,noscript,del,ins,' +
  'caption,col,colgroup,table,thead,tbody,td,th,tr,' +
  'button,datalist,fieldset,form,input,label,legend,meter,optgroup,option,' +
  'output,progress,select,textarea,' +
  'details,dialog,menu,menuitem,summary,' +
  'content,element,shadow,template'
);

// this map is intentionally selective, only covering SVG elements that may
// contain child elements.
var isSVG = makeMap(
  'svg,animate,circle,clippath,cursor,defs,desc,ellipse,filter,' +
  'font-face,g,glyph,image,line,marker,mask,missing-glyph,path,pattern,' +
  'polygon,polyline,rect,switch,symbol,text,textpath,tspan,use,view',
  true
);



var isReservedTag = function (tag) {
  return isHTMLTag(tag) || isSVG(tag)
};

function getTagNamespace (tag) {
  if (isSVG(tag)) {
    return 'svg'
  }
  // basic support for MathML
  // note it doesn't support other MathML elements being component roots
  if (tag === 'math') {
    return 'math'
  }
}

var unknownElementCache = Object.create(null);
function isUnknownElement (tag) {
  /* istanbul ignore if */
  if (!inBrowser) {
    return true
  }
  if (isReservedTag(tag)) {
    return false
  }
  tag = tag.toLowerCase();
  /* istanbul ignore if */
  if (unknownElementCache[tag] != null) {
    return unknownElementCache[tag]
  }
  var el = document.createElement(tag);
  if (tag.indexOf('-') > -1) {
    // http://stackoverflow.com/a/28210364/1070244
    return (unknownElementCache[tag] = (
      el.constructor === window.HTMLUnknownElement ||
      el.constructor === window.HTMLElement
    ))
  } else {
    return (unknownElementCache[tag] = /HTMLUnknownElement/.test(el.toString()))
  }
}

/*  */

/**
 * Query an element selector if it's not an element already.
 */
function query (el) {
  if (typeof el === 'string') {
    var selector = el;
    el = document.querySelector(el);
    if (!el) {
      process.env.NODE_ENV !== 'production' && warn(
        'Cannot find element: ' + selector
      );
      return document.createElement('div')
    }
  }
  return el
}

/*  */

function createElement$1 (tagName, vnode) {
  var elm = document.createElement(tagName);
  if (tagName !== 'select') {
    return elm
  }
  if (vnode.data && vnode.data.attrs && 'multiple' in vnode.data.attrs) {
    elm.setAttribute('multiple', 'multiple');
  }
  return elm
}

function createElementNS (namespace, tagName) {
  return document.createElementNS(namespaceMap[namespace], tagName)
}

function createTextNode (text) {
  return document.createTextNode(text)
}

function createComment (text) {
  return document.createComment(text)
}

function insertBefore (parentNode, newNode, referenceNode) {
  parentNode.insertBefore(newNode, referenceNode);
}

function removeChild (node, child) {
  node.removeChild(child);
}

function appendChild (node, child) {
  node.appendChild(child);
}

function parentNode (node) {
  return node.parentNode
}

function nextSibling (node) {
  return node.nextSibling
}

function tagName (node) {
  return node.tagName
}

function setTextContent (node, text) {
  node.textContent = text;
}

function setAttribute (node, key, val) {
  node.setAttribute(key, val);
}


var nodeOps = Object.freeze({
	createElement: createElement$1,
	createElementNS: createElementNS,
	createTextNode: createTextNode,
	createComment: createComment,
	insertBefore: insertBefore,
	removeChild: removeChild,
	appendChild: appendChild,
	parentNode: parentNode,
	nextSibling: nextSibling,
	tagName: tagName,
	setTextContent: setTextContent,
	setAttribute: setAttribute
});

/*  */

var ref = {
  create: function create (_, vnode) {
    registerRef(vnode);
  },
  update: function update (oldVnode, vnode) {
    if (oldVnode.data.ref !== vnode.data.ref) {
      registerRef(oldVnode, true);
      registerRef(vnode);
    }
  },
  destroy: function destroy (vnode) {
    registerRef(vnode, true);
  }
};

function registerRef (vnode, isRemoval) {
  var key = vnode.data.ref;
  if (!key) { return }

  var vm = vnode.context;
  var ref = vnode.componentInstance || vnode.elm;
  var refs = vm.$refs;
  if (isRemoval) {
    if (Array.isArray(refs[key])) {
      remove$1(refs[key], ref);
    } else if (refs[key] === ref) {
      refs[key] = undefined;
    }
  } else {
    if (vnode.data.refInFor) {
      if (Array.isArray(refs[key]) && refs[key].indexOf(ref) < 0) {
        refs[key].push(ref);
      } else {
        refs[key] = [ref];
      }
    } else {
      refs[key] = ref;
    }
  }
}

/**
 * Virtual DOM patching algorithm based on Snabbdom by
 * Simon Friis Vindum (@paldepind)
 * Licensed under the MIT License
 * https://github.com/paldepind/snabbdom/blob/master/LICENSE
 *
 * modified by Evan You (@yyx990803)
 *

/*
 * Not type-checking this because this file is perf-critical and the cost
 * of making flow understand it is not worth it.
 */

var emptyNode = new VNode('', {}, []);

var hooks$1 = ['create', 'activate', 'update', 'remove', 'destroy'];

function isUndef (s) {
  return s == null
}

function isDef (s) {
  return s != null
}

function sameVnode (vnode1, vnode2) {
  return (
    vnode1.key === vnode2.key &&
    vnode1.tag === vnode2.tag &&
    vnode1.isComment === vnode2.isComment &&
    !vnode1.data === !vnode2.data
  )
}

function createKeyToOldIdx (children, beginIdx, endIdx) {
  var i, key;
  var map = {};
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key;
    if (isDef(key)) { map[key] = i; }
  }
  return map
}

function createPatchFunction (backend) {
  var i, j;
  var cbs = {};

  var modules = backend.modules;
  var nodeOps = backend.nodeOps;

  for (i = 0; i < hooks$1.length; ++i) {
    cbs[hooks$1[i]] = [];
    for (j = 0; j < modules.length; ++j) {
      if (modules[j][hooks$1[i]] !== undefined) { cbs[hooks$1[i]].push(modules[j][hooks$1[i]]); }
    }
  }

  function emptyNodeAt (elm) {
    return new VNode(nodeOps.tagName(elm).toLowerCase(), {}, [], undefined, elm)
  }

  function createRmCb (childElm, listeners) {
    function remove$$1 () {
      if (--remove$$1.listeners === 0) {
        removeNode(childElm);
      }
    }
    remove$$1.listeners = listeners;
    return remove$$1
  }

  function removeNode (el) {
    var parent = nodeOps.parentNode(el);
    // element may have already been removed due to v-html / v-text
    if (parent) {
      nodeOps.removeChild(parent, el);
    }
  }

  var inPre = 0;
  function createElm (vnode, insertedVnodeQueue, parentElm, refElm, nested) {
    vnode.isRootInsert = !nested; // for transition enter check
    if (createComponent(vnode, insertedVnodeQueue, parentElm, refElm)) {
      return
    }

    var data = vnode.data;
    var children = vnode.children;
    var tag = vnode.tag;
    if (isDef(tag)) {
      if (process.env.NODE_ENV !== 'production') {
        if (data && data.pre) {
          inPre++;
        }
        if (
          !inPre &&
          !vnode.ns &&
          !(config.ignoredElements.length && config.ignoredElements.indexOf(tag) > -1) &&
          config.isUnknownElement(tag)
        ) {
          warn(
            'Unknown custom element: <' + tag + '> - did you ' +
            'register the component correctly? For recursive components, ' +
            'make sure to provide the "name" option.',
            vnode.context
          );
        }
      }
      vnode.elm = vnode.ns
        ? nodeOps.createElementNS(vnode.ns, tag)
        : nodeOps.createElement(tag, vnode);
      setScope(vnode);

      /* istanbul ignore if */
      {
        createChildren(vnode, children, insertedVnodeQueue);
        if (isDef(data)) {
          invokeCreateHooks(vnode, insertedVnodeQueue);
        }
        insert(parentElm, vnode.elm, refElm);
      }

      if (process.env.NODE_ENV !== 'production' && data && data.pre) {
        inPre--;
      }
    } else if (vnode.isComment) {
      vnode.elm = nodeOps.createComment(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    } else {
      vnode.elm = nodeOps.createTextNode(vnode.text);
      insert(parentElm, vnode.elm, refElm);
    }
  }

  function createComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i = vnode.data;
    if (isDef(i)) {
      var isReactivated = isDef(vnode.componentInstance) && i.keepAlive;
      if (isDef(i = i.hook) && isDef(i = i.init)) {
        i(vnode, false /* hydrating */, parentElm, refElm);
      }
      // after calling the init hook, if the vnode is a child component
      // it should've created a child instance and mounted it. the child
      // component also has set the placeholder vnode's elm.
      // in that case we can just return the element and be done.
      if (isDef(vnode.componentInstance)) {
        initComponent(vnode, insertedVnodeQueue);
        if (isReactivated) {
          reactivateComponent(vnode, insertedVnodeQueue, parentElm, refElm);
        }
        return true
      }
    }
  }

  function initComponent (vnode, insertedVnodeQueue) {
    if (vnode.data.pendingInsert) {
      insertedVnodeQueue.push.apply(insertedVnodeQueue, vnode.data.pendingInsert);
    }
    vnode.elm = vnode.componentInstance.$el;
    if (isPatchable(vnode)) {
      invokeCreateHooks(vnode, insertedVnodeQueue);
      setScope(vnode);
    } else {
      // empty component root.
      // skip all element-related modules except for ref (#3455)
      registerRef(vnode);
      // make sure to invoke the insert hook
      insertedVnodeQueue.push(vnode);
    }
  }

  function reactivateComponent (vnode, insertedVnodeQueue, parentElm, refElm) {
    var i;
    // hack for #4339: a reactivated component with inner transition
    // does not trigger because the inner node's created hooks are not called
    // again. It's not ideal to involve module-specific logic in here but
    // there doesn't seem to be a better way to do it.
    var innerNode = vnode;
    while (innerNode.componentInstance) {
      innerNode = innerNode.componentInstance._vnode;
      if (isDef(i = innerNode.data) && isDef(i = i.transition)) {
        for (i = 0; i < cbs.activate.length; ++i) {
          cbs.activate[i](emptyNode, innerNode);
        }
        insertedVnodeQueue.push(innerNode);
        break
      }
    }
    // unlike a newly created component,
    // a reactivated keep-alive component doesn't insert itself
    insert(parentElm, vnode.elm, refElm);
  }

  function insert (parent, elm, ref) {
    if (parent) {
      if (ref) {
        nodeOps.insertBefore(parent, elm, ref);
      } else {
        nodeOps.appendChild(parent, elm);
      }
    }
  }

  function createChildren (vnode, children, insertedVnodeQueue) {
    if (Array.isArray(children)) {
      for (var i = 0; i < children.length; ++i) {
        createElm(children[i], insertedVnodeQueue, vnode.elm, null, true);
      }
    } else if (isPrimitive(vnode.text)) {
      nodeOps.appendChild(vnode.elm, nodeOps.createTextNode(vnode.text));
    }
  }

  function isPatchable (vnode) {
    while (vnode.componentInstance) {
      vnode = vnode.componentInstance._vnode;
    }
    return isDef(vnode.tag)
  }

  function invokeCreateHooks (vnode, insertedVnodeQueue) {
    for (var i$1 = 0; i$1 < cbs.create.length; ++i$1) {
      cbs.create[i$1](emptyNode, vnode);
    }
    i = vnode.data.hook; // Reuse variable
    if (isDef(i)) {
      if (i.create) { i.create(emptyNode, vnode); }
      if (i.insert) { insertedVnodeQueue.push(vnode); }
    }
  }

  // set scope id attribute for scoped CSS.
  // this is implemented as a special case to avoid the overhead
  // of going through the normal attribute patching process.
  function setScope (vnode) {
    var i;
    if (isDef(i = vnode.context) && isDef(i = i.$options._scopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
    if (isDef(i = activeInstance) &&
        i !== vnode.context &&
        isDef(i = i.$options._scopeId)) {
      nodeOps.setAttribute(vnode.elm, i, '');
    }
  }

  function addVnodes (parentElm, refElm, vnodes, startIdx, endIdx, insertedVnodeQueue) {
    for (; startIdx <= endIdx; ++startIdx) {
      createElm(vnodes[startIdx], insertedVnodeQueue, parentElm, refElm);
    }
  }

  function invokeDestroyHook (vnode) {
    var i, j;
    var data = vnode.data;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.destroy)) { i(vnode); }
      for (i = 0; i < cbs.destroy.length; ++i) { cbs.destroy[i](vnode); }
    }
    if (isDef(i = vnode.children)) {
      for (j = 0; j < vnode.children.length; ++j) {
        invokeDestroyHook(vnode.children[j]);
      }
    }
  }

  function removeVnodes (parentElm, vnodes, startIdx, endIdx) {
    for (; startIdx <= endIdx; ++startIdx) {
      var ch = vnodes[startIdx];
      if (isDef(ch)) {
        if (isDef(ch.tag)) {
          removeAndInvokeRemoveHook(ch);
          invokeDestroyHook(ch);
        } else { // Text node
          removeNode(ch.elm);
        }
      }
    }
  }

  function removeAndInvokeRemoveHook (vnode, rm) {
    if (rm || isDef(vnode.data)) {
      var listeners = cbs.remove.length + 1;
      if (!rm) {
        // directly removing
        rm = createRmCb(vnode.elm, listeners);
      } else {
        // we have a recursively passed down rm callback
        // increase the listeners count
        rm.listeners += listeners;
      }
      // recursively invoke hooks on child component root node
      if (isDef(i = vnode.componentInstance) && isDef(i = i._vnode) && isDef(i.data)) {
        removeAndInvokeRemoveHook(i, rm);
      }
      for (i = 0; i < cbs.remove.length; ++i) {
        cbs.remove[i](vnode, rm);
      }
      if (isDef(i = vnode.data.hook) && isDef(i = i.remove)) {
        i(vnode, rm);
      } else {
        rm();
      }
    } else {
      removeNode(vnode.elm);
    }
  }

  function updateChildren (parentElm, oldCh, newCh, insertedVnodeQueue, removeOnly) {
    var oldStartIdx = 0;
    var newStartIdx = 0;
    var oldEndIdx = oldCh.length - 1;
    var oldStartVnode = oldCh[0];
    var oldEndVnode = oldCh[oldEndIdx];
    var newEndIdx = newCh.length - 1;
    var newStartVnode = newCh[0];
    var newEndVnode = newCh[newEndIdx];
    var oldKeyToIdx, idxInOld, elmToMove, refElm;

    // removeOnly is a special flag used only by <transition-group>
    // to ensure removed elements stay in correct relative positions
    // during leaving transitions
    var canMove = !removeOnly;

    while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
      if (isUndef(oldStartVnode)) {
        oldStartVnode = oldCh[++oldStartIdx]; // Vnode has been moved left
      } else if (isUndef(oldEndVnode)) {
        oldEndVnode = oldCh[--oldEndIdx];
      } else if (sameVnode(oldStartVnode, newStartVnode)) {
        patchVnode(oldStartVnode, newStartVnode, insertedVnodeQueue);
        oldStartVnode = oldCh[++oldStartIdx];
        newStartVnode = newCh[++newStartIdx];
      } else if (sameVnode(oldEndVnode, newEndVnode)) {
        patchVnode(oldEndVnode, newEndVnode, insertedVnodeQueue);
        oldEndVnode = oldCh[--oldEndIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldStartVnode, newEndVnode)) { // Vnode moved right
        patchVnode(oldStartVnode, newEndVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldStartVnode.elm, nodeOps.nextSibling(oldEndVnode.elm));
        oldStartVnode = oldCh[++oldStartIdx];
        newEndVnode = newCh[--newEndIdx];
      } else if (sameVnode(oldEndVnode, newStartVnode)) { // Vnode moved left
        patchVnode(oldEndVnode, newStartVnode, insertedVnodeQueue);
        canMove && nodeOps.insertBefore(parentElm, oldEndVnode.elm, oldStartVnode.elm);
        oldEndVnode = oldCh[--oldEndIdx];
        newStartVnode = newCh[++newStartIdx];
      } else {
        if (isUndef(oldKeyToIdx)) { oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx); }
        idxInOld = isDef(newStartVnode.key) ? oldKeyToIdx[newStartVnode.key] : null;
        if (isUndef(idxInOld)) { // New element
          createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
          newStartVnode = newCh[++newStartIdx];
        } else {
          elmToMove = oldCh[idxInOld];
          /* istanbul ignore if */
          if (process.env.NODE_ENV !== 'production' && !elmToMove) {
            warn(
              'It seems there are duplicate keys that is causing an update error. ' +
              'Make sure each v-for item has a unique key.'
            );
          }
          if (sameVnode(elmToMove, newStartVnode)) {
            patchVnode(elmToMove, newStartVnode, insertedVnodeQueue);
            oldCh[idxInOld] = undefined;
            canMove && nodeOps.insertBefore(parentElm, newStartVnode.elm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          } else {
            // same key but different element. treat as new element
            createElm(newStartVnode, insertedVnodeQueue, parentElm, oldStartVnode.elm);
            newStartVnode = newCh[++newStartIdx];
          }
        }
      }
    }
    if (oldStartIdx > oldEndIdx) {
      refElm = isUndef(newCh[newEndIdx + 1]) ? null : newCh[newEndIdx + 1].elm;
      addVnodes(parentElm, refElm, newCh, newStartIdx, newEndIdx, insertedVnodeQueue);
    } else if (newStartIdx > newEndIdx) {
      removeVnodes(parentElm, oldCh, oldStartIdx, oldEndIdx);
    }
  }

  function patchVnode (oldVnode, vnode, insertedVnodeQueue, removeOnly) {
    if (oldVnode === vnode) {
      return
    }
    // reuse element for static trees.
    // note we only do this if the vnode is cloned -
    // if the new node is not cloned it means the render functions have been
    // reset by the hot-reload-api and we need to do a proper re-render.
    if (vnode.isStatic &&
        oldVnode.isStatic &&
        vnode.key === oldVnode.key &&
        (vnode.isCloned || vnode.isOnce)) {
      vnode.elm = oldVnode.elm;
      vnode.componentInstance = oldVnode.componentInstance;
      return
    }
    var i;
    var data = vnode.data;
    var hasData = isDef(data);
    if (hasData && isDef(i = data.hook) && isDef(i = i.prepatch)) {
      i(oldVnode, vnode);
    }
    var elm = vnode.elm = oldVnode.elm;
    var oldCh = oldVnode.children;
    var ch = vnode.children;
    if (hasData && isPatchable(vnode)) {
      for (i = 0; i < cbs.update.length; ++i) { cbs.update[i](oldVnode, vnode); }
      if (isDef(i = data.hook) && isDef(i = i.update)) { i(oldVnode, vnode); }
    }
    if (isUndef(vnode.text)) {
      if (isDef(oldCh) && isDef(ch)) {
        if (oldCh !== ch) { updateChildren(elm, oldCh, ch, insertedVnodeQueue, removeOnly); }
      } else if (isDef(ch)) {
        if (isDef(oldVnode.text)) { nodeOps.setTextContent(elm, ''); }
        addVnodes(elm, null, ch, 0, ch.length - 1, insertedVnodeQueue);
      } else if (isDef(oldCh)) {
        removeVnodes(elm, oldCh, 0, oldCh.length - 1);
      } else if (isDef(oldVnode.text)) {
        nodeOps.setTextContent(elm, '');
      }
    } else if (oldVnode.text !== vnode.text) {
      nodeOps.setTextContent(elm, vnode.text);
    }
    if (hasData) {
      if (isDef(i = data.hook) && isDef(i = i.postpatch)) { i(oldVnode, vnode); }
    }
  }

  function invokeInsertHook (vnode, queue, initial) {
    // delay insert hooks for component root nodes, invoke them after the
    // element is really inserted
    if (initial && vnode.parent) {
      vnode.parent.data.pendingInsert = queue;
    } else {
      for (var i = 0; i < queue.length; ++i) {
        queue[i].data.hook.insert(queue[i]);
      }
    }
  }

  var bailed = false;
  // list of modules that can skip create hook during hydration because they
  // are already rendered on the client or has no need for initialization
  var isRenderedModule = makeMap('attrs,style,class,staticClass,staticStyle,key');

  // Note: this is a browser-only function so we can assume elms are DOM nodes.
  function hydrate (elm, vnode, insertedVnodeQueue) {
    if (process.env.NODE_ENV !== 'production') {
      if (!assertNodeMatch(elm, vnode)) {
        return false
      }
    }
    vnode.elm = elm;
    var tag = vnode.tag;
    var data = vnode.data;
    var children = vnode.children;
    if (isDef(data)) {
      if (isDef(i = data.hook) && isDef(i = i.init)) { i(vnode, true /* hydrating */); }
      if (isDef(i = vnode.componentInstance)) {
        // child component. it should have hydrated its own tree.
        initComponent(vnode, insertedVnodeQueue);
        return true
      }
    }
    if (isDef(tag)) {
      if (isDef(children)) {
        // empty element, allow client to pick up and populate children
        if (!elm.hasChildNodes()) {
          createChildren(vnode, children, insertedVnodeQueue);
        } else {
          var childrenMatch = true;
          var childNode = elm.firstChild;
          for (var i$1 = 0; i$1 < children.length; i$1++) {
            if (!childNode || !hydrate(childNode, children[i$1], insertedVnodeQueue)) {
              childrenMatch = false;
              break
            }
            childNode = childNode.nextSibling;
          }
          // if childNode is not null, it means the actual childNodes list is
          // longer than the virtual children list.
          if (!childrenMatch || childNode) {
            if (process.env.NODE_ENV !== 'production' &&
                typeof console !== 'undefined' &&
                !bailed) {
              bailed = true;
              console.warn('Parent: ', elm);
              console.warn('Mismatching childNodes vs. VNodes: ', elm.childNodes, children);
            }
            return false
          }
        }
      }
      if (isDef(data)) {
        for (var key in data) {
          if (!isRenderedModule(key)) {
            invokeCreateHooks(vnode, insertedVnodeQueue);
            break
          }
        }
      }
    } else if (elm.data !== vnode.text) {
      elm.data = vnode.text;
    }
    return true
  }

  function assertNodeMatch (node, vnode) {
    if (vnode.tag) {
      return (
        vnode.tag.indexOf('vue-component') === 0 ||
        vnode.tag.toLowerCase() === (node.tagName && node.tagName.toLowerCase())
      )
    } else {
      return node.nodeType === (vnode.isComment ? 8 : 3)
    }
  }

  return function patch (oldVnode, vnode, hydrating, removeOnly, parentElm, refElm) {
    if (!vnode) {
      if (oldVnode) { invokeDestroyHook(oldVnode); }
      return
    }

    var isInitialPatch = false;
    var insertedVnodeQueue = [];

    if (!oldVnode) {
      // empty mount (likely as component), create new root element
      isInitialPatch = true;
      createElm(vnode, insertedVnodeQueue, parentElm, refElm);
    } else {
      var isRealElement = isDef(oldVnode.nodeType);
      if (!isRealElement && sameVnode(oldVnode, vnode)) {
        // patch existing root node
        patchVnode(oldVnode, vnode, insertedVnodeQueue, removeOnly);
      } else {
        if (isRealElement) {
          // mounting to a real element
          // check if this is server-rendered content and if we can perform
          // a successful hydration.
          if (oldVnode.nodeType === 1 && oldVnode.hasAttribute('server-rendered')) {
            oldVnode.removeAttribute('server-rendered');
            hydrating = true;
          }
          if (hydrating) {
            if (hydrate(oldVnode, vnode, insertedVnodeQueue)) {
              invokeInsertHook(vnode, insertedVnodeQueue, true);
              return oldVnode
            } else if (process.env.NODE_ENV !== 'production') {
              warn(
                'The client-side rendered virtual DOM tree is not matching ' +
                'server-rendered content. This is likely caused by incorrect ' +
                'HTML markup, for example nesting block-level elements inside ' +
                '<p>, or missing <tbody>. Bailing hydration and performing ' +
                'full client-side render.'
              );
            }
          }
          // either not server-rendered, or hydration failed.
          // create an empty node and replace it
          oldVnode = emptyNodeAt(oldVnode);
        }
        // replacing existing element
        var oldElm = oldVnode.elm;
        var parentElm$1 = nodeOps.parentNode(oldElm);
        createElm(
          vnode,
          insertedVnodeQueue,
          // extremely rare edge case: do not insert if old element is in a
          // leaving transition. Only happens when combining transition +
          // keep-alive + HOCs. (#4590)
          oldElm._leaveCb ? null : parentElm$1,
          nodeOps.nextSibling(oldElm)
        );

        if (vnode.parent) {
          // component root element replaced.
          // update parent placeholder node element, recursively
          var ancestor = vnode.parent;
          while (ancestor) {
            ancestor.elm = vnode.elm;
            ancestor = ancestor.parent;
          }
          if (isPatchable(vnode)) {
            for (var i = 0; i < cbs.create.length; ++i) {
              cbs.create[i](emptyNode, vnode.parent);
            }
          }
        }

        if (parentElm$1 !== null) {
          removeVnodes(parentElm$1, [oldVnode], 0, 0);
        } else if (isDef(oldVnode.tag)) {
          invokeDestroyHook(oldVnode);
        }
      }
    }

    invokeInsertHook(vnode, insertedVnodeQueue, isInitialPatch);
    return vnode.elm
  }
}

/*  */

var directives = {
  create: updateDirectives,
  update: updateDirectives,
  destroy: function unbindDirectives (vnode) {
    updateDirectives(vnode, emptyNode);
  }
};

function updateDirectives (oldVnode, vnode) {
  if (oldVnode.data.directives || vnode.data.directives) {
    _update(oldVnode, vnode);
  }
}

function _update (oldVnode, vnode) {
  var isCreate = oldVnode === emptyNode;
  var isDestroy = vnode === emptyNode;
  var oldDirs = normalizeDirectives$1(oldVnode.data.directives, oldVnode.context);
  var newDirs = normalizeDirectives$1(vnode.data.directives, vnode.context);

  var dirsWithInsert = [];
  var dirsWithPostpatch = [];

  var key, oldDir, dir;
  for (key in newDirs) {
    oldDir = oldDirs[key];
    dir = newDirs[key];
    if (!oldDir) {
      // new directive, bind
      callHook$1(dir, 'bind', vnode, oldVnode);
      if (dir.def && dir.def.inserted) {
        dirsWithInsert.push(dir);
      }
    } else {
      // existing directive, update
      dir.oldValue = oldDir.value;
      callHook$1(dir, 'update', vnode, oldVnode);
      if (dir.def && dir.def.componentUpdated) {
        dirsWithPostpatch.push(dir);
      }
    }
  }

  if (dirsWithInsert.length) {
    var callInsert = function () {
      for (var i = 0; i < dirsWithInsert.length; i++) {
        callHook$1(dirsWithInsert[i], 'inserted', vnode, oldVnode);
      }
    };
    if (isCreate) {
      mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', callInsert, 'dir-insert');
    } else {
      callInsert();
    }
  }

  if (dirsWithPostpatch.length) {
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'postpatch', function () {
      for (var i = 0; i < dirsWithPostpatch.length; i++) {
        callHook$1(dirsWithPostpatch[i], 'componentUpdated', vnode, oldVnode);
      }
    }, 'dir-postpatch');
  }

  if (!isCreate) {
    for (key in oldDirs) {
      if (!newDirs[key]) {
        // no longer present, unbind
        callHook$1(oldDirs[key], 'unbind', oldVnode, oldVnode, isDestroy);
      }
    }
  }
}

var emptyModifiers = Object.create(null);

function normalizeDirectives$1 (
  dirs,
  vm
) {
  var res = Object.create(null);
  if (!dirs) {
    return res
  }
  var i, dir;
  for (i = 0; i < dirs.length; i++) {
    dir = dirs[i];
    if (!dir.modifiers) {
      dir.modifiers = emptyModifiers;
    }
    res[getRawDirName(dir)] = dir;
    dir.def = resolveAsset(vm.$options, 'directives', dir.name, true);
  }
  return res
}

function getRawDirName (dir) {
  return dir.rawName || ((dir.name) + "." + (Object.keys(dir.modifiers || {}).join('.')))
}

function callHook$1 (dir, hook, vnode, oldVnode, isDestroy) {
  var fn = dir.def && dir.def[hook];
  if (fn) {
    fn(vnode.elm, dir, vnode, oldVnode, isDestroy);
  }
}

var baseModules = [
  ref,
  directives
];

/*  */

function updateAttrs (oldVnode, vnode) {
  if (!oldVnode.data.attrs && !vnode.data.attrs) {
    return
  }
  var key, cur, old;
  var elm = vnode.elm;
  var oldAttrs = oldVnode.data.attrs || {};
  var attrs = vnode.data.attrs || {};
  // clone observed objects, as the user probably wants to mutate it
  if (attrs.__ob__) {
    attrs = vnode.data.attrs = extend({}, attrs);
  }

  for (key in attrs) {
    cur = attrs[key];
    old = oldAttrs[key];
    if (old !== cur) {
      setAttr(elm, key, cur);
    }
  }
  // #4391: in IE9, setting type can reset value for input[type=radio]
  /* istanbul ignore if */
  if (isIE9 && attrs.value !== oldAttrs.value) {
    setAttr(elm, 'value', attrs.value);
  }
  for (key in oldAttrs) {
    if (attrs[key] == null) {
      if (isXlink(key)) {
        elm.removeAttributeNS(xlinkNS, getXlinkProp(key));
      } else if (!isEnumeratedAttr(key)) {
        elm.removeAttribute(key);
      }
    }
  }
}

function setAttr (el, key, value) {
  if (isBooleanAttr(key)) {
    // set attribute for blank value
    // e.g. <option disabled>Select one</option>
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, key);
    }
  } else if (isEnumeratedAttr(key)) {
    el.setAttribute(key, isFalsyAttrValue(value) || value === 'false' ? 'false' : 'true');
  } else if (isXlink(key)) {
    if (isFalsyAttrValue(value)) {
      el.removeAttributeNS(xlinkNS, getXlinkProp(key));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    if (isFalsyAttrValue(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, value);
    }
  }
}

var attrs = {
  create: updateAttrs,
  update: updateAttrs
};

/*  */

function updateClass (oldVnode, vnode) {
  var el = vnode.elm;
  var data = vnode.data;
  var oldData = oldVnode.data;
  if (!data.staticClass && !data.class &&
      (!oldData || (!oldData.staticClass && !oldData.class))) {
    return
  }

  var cls = genClassForVnode(vnode);

  // handle transition classes
  var transitionClass = el._transitionClasses;
  if (transitionClass) {
    cls = concat(cls, stringifyClass(transitionClass));
  }

  // set the class
  if (cls !== el._prevClass) {
    el.setAttribute('class', cls);
    el._prevClass = cls;
  }
}

var klass = {
  create: updateClass,
  update: updateClass
};

/*  */

var target$1;

function add$2 (
  event,
  handler,
  once,
  capture
) {
  if (once) {
    var oldHandler = handler;
    var _target = target$1; // save current target element in closure
    handler = function (ev) {
      remove$3(event, handler, capture, _target);
      arguments.length === 1
        ? oldHandler(ev)
        : oldHandler.apply(null, arguments);
    };
  }
  target$1.addEventListener(event, handler, capture);
}

function remove$3 (
  event,
  handler,
  capture,
  _target
) {
  (_target || target$1).removeEventListener(event, handler, capture);
}

function updateDOMListeners (oldVnode, vnode) {
  if (!oldVnode.data.on && !vnode.data.on) {
    return
  }
  var on = vnode.data.on || {};
  var oldOn = oldVnode.data.on || {};
  target$1 = vnode.elm;
  updateListeners(on, oldOn, add$2, remove$3, vnode.context);
}

var events = {
  create: updateDOMListeners,
  update: updateDOMListeners
};

/*  */

function updateDOMProps (oldVnode, vnode) {
  if (!oldVnode.data.domProps && !vnode.data.domProps) {
    return
  }
  var key, cur;
  var elm = vnode.elm;
  var oldProps = oldVnode.data.domProps || {};
  var props = vnode.data.domProps || {};
  // clone observed objects, as the user probably wants to mutate it
  if (props.__ob__) {
    props = vnode.data.domProps = extend({}, props);
  }

  for (key in oldProps) {
    if (props[key] == null) {
      elm[key] = '';
    }
  }
  for (key in props) {
    cur = props[key];
    // ignore children if the node has textContent or innerHTML,
    // as these will throw away existing DOM nodes and cause removal errors
    // on subsequent patches (#3360)
    if (key === 'textContent' || key === 'innerHTML') {
      if (vnode.children) { vnode.children.length = 0; }
      if (cur === oldProps[key]) { continue }
    }

    if (key === 'value') {
      // store value as _value as well since
      // non-string values will be stringified
      elm._value = cur;
      // avoid resetting cursor position when value is the same
      var strCur = cur == null ? '' : String(cur);
      if (shouldUpdateValue(elm, vnode, strCur)) {
        elm.value = strCur;
      }
    } else {
      elm[key] = cur;
    }
  }
}

// check platforms/web/util/attrs.js acceptValue


function shouldUpdateValue (
  elm,
  vnode,
  checkVal
) {
  return (!elm.composing && (
    vnode.tag === 'option' ||
    isDirty(elm, checkVal) ||
    isInputChanged(vnode, checkVal)
  ))
}

function isDirty (elm, checkVal) {
  // return true when textbox (.number and .trim) loses focus and its value is not equal to the updated value
  return document.activeElement !== elm && elm.value !== checkVal
}

function isInputChanged (vnode, newVal) {
  var value = vnode.elm.value;
  var modifiers = vnode.elm._vModifiers; // injected by v-model runtime
  if ((modifiers && modifiers.number) || vnode.elm.type === 'number') {
    return toNumber(value) !== toNumber(newVal)
  }
  if (modifiers && modifiers.trim) {
    return value.trim() !== newVal.trim()
  }
  return value !== newVal
}

var domProps = {
  create: updateDOMProps,
  update: updateDOMProps
};

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// merge static and dynamic style data on the same vnode
function normalizeStyleData (data) {
  var style = normalizeStyleBinding(data.style);
  // static style is pre-processed into an object during compilation
  // and is always a fresh object, so it's safe to merge into it
  return data.staticStyle
    ? extend(data.staticStyle, style)
    : style
}

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/**
 * parent component style should be after child's
 * so that parent component's style could override it
 */
function getStyle (vnode, checkChild) {
  var res = {};
  var styleData;

  if (checkChild) {
    var childNode = vnode;
    while (childNode.componentInstance) {
      childNode = childNode.componentInstance._vnode;
      if (childNode.data && (styleData = normalizeStyleData(childNode.data))) {
        extend(res, styleData);
      }
    }
  }

  if ((styleData = normalizeStyleData(vnode.data))) {
    extend(res, styleData);
  }

  var parentNode = vnode;
  while ((parentNode = parentNode.parent)) {
    if (parentNode.data && (styleData = normalizeStyleData(parentNode.data))) {
      extend(res, styleData);
    }
  }
  return res
}

/*  */

var cssVarRE = /^--/;
var importantRE = /\s*!important$/;
var setProp = function (el, name, val) {
  /* istanbul ignore if */
  if (cssVarRE.test(name)) {
    el.style.setProperty(name, val);
  } else if (importantRE.test(val)) {
    el.style.setProperty(name, val.replace(importantRE, ''), 'important');
  } else {
    el.style[normalize(name)] = val;
  }
};

var prefixes = ['Webkit', 'Moz', 'ms'];

var testEl;
var normalize = cached(function (prop) {
  testEl = testEl || document.createElement('div');
  prop = camelize(prop);
  if (prop !== 'filter' && (prop in testEl.style)) {
    return prop
  }
  var upper = prop.charAt(0).toUpperCase() + prop.slice(1);
  for (var i = 0; i < prefixes.length; i++) {
    var prefixed = prefixes[i] + upper;
    if (prefixed in testEl.style) {
      return prefixed
    }
  }
});

function updateStyle (oldVnode, vnode) {
  var data = vnode.data;
  var oldData = oldVnode.data;

  if (!data.staticStyle && !data.style &&
      !oldData.staticStyle && !oldData.style) {
    return
  }

  var cur, name;
  var el = vnode.elm;
  var oldStaticStyle = oldVnode.data.staticStyle;
  var oldStyleBinding = oldVnode.data.style || {};

  // if static style exists, stylebinding already merged into it when doing normalizeStyleData
  var oldStyle = oldStaticStyle || oldStyleBinding;

  var style = normalizeStyleBinding(vnode.data.style) || {};

  vnode.data.style = style.__ob__ ? extend({}, style) : style;

  var newStyle = getStyle(vnode, true);

  for (name in oldStyle) {
    if (newStyle[name] == null) {
      setProp(el, name, '');
    }
  }
  for (name in newStyle) {
    cur = newStyle[name];
    if (cur !== oldStyle[name]) {
      // ie9 setting to null has no effect, must use empty string
      setProp(el, name, cur == null ? '' : cur);
    }
  }
}

var style = {
  create: updateStyle,
  update: updateStyle
};

/*  */

/**
 * Add class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function addClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !cls.trim()) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.add(c); });
    } else {
      el.classList.add(cls);
    }
  } else {
    var cur = ' ' + el.getAttribute('class') + ' ';
    if (cur.indexOf(' ' + cls + ' ') < 0) {
      el.setAttribute('class', (cur + cls).trim());
    }
  }
}

/**
 * Remove class with compatibility for SVG since classList is not supported on
 * SVG elements in IE
 */
function removeClass (el, cls) {
  /* istanbul ignore if */
  if (!cls || !cls.trim()) {
    return
  }

  /* istanbul ignore else */
  if (el.classList) {
    if (cls.indexOf(' ') > -1) {
      cls.split(/\s+/).forEach(function (c) { return el.classList.remove(c); });
    } else {
      el.classList.remove(cls);
    }
  } else {
    var cur = ' ' + el.getAttribute('class') + ' ';
    var tar = ' ' + cls + ' ';
    while (cur.indexOf(tar) >= 0) {
      cur = cur.replace(tar, ' ');
    }
    el.setAttribute('class', cur.trim());
  }
}

/*  */

var hasTransition = inBrowser && !isIE9;
var TRANSITION = 'transition';
var ANIMATION = 'animation';

// Transition property/event sniffing
var transitionProp = 'transition';
var transitionEndEvent = 'transitionend';
var animationProp = 'animation';
var animationEndEvent = 'animationend';
if (hasTransition) {
  /* istanbul ignore if */
  if (window.ontransitionend === undefined &&
    window.onwebkittransitionend !== undefined) {
    transitionProp = 'WebkitTransition';
    transitionEndEvent = 'webkitTransitionEnd';
  }
  if (window.onanimationend === undefined &&
    window.onwebkitanimationend !== undefined) {
    animationProp = 'WebkitAnimation';
    animationEndEvent = 'webkitAnimationEnd';
  }
}

// binding to window is necessary to make hot reload work in IE in strict mode
var raf = inBrowser && window.requestAnimationFrame
  ? window.requestAnimationFrame.bind(window)
  : setTimeout;

function nextFrame (fn) {
  raf(function () {
    raf(fn);
  });
}

function addTransitionClass (el, cls) {
  (el._transitionClasses || (el._transitionClasses = [])).push(cls);
  addClass(el, cls);
}

function removeTransitionClass (el, cls) {
  if (el._transitionClasses) {
    remove$1(el._transitionClasses, cls);
  }
  removeClass(el, cls);
}

function whenTransitionEnds (
  el,
  expectedType,
  cb
) {
  var ref = getTransitionInfo(el, expectedType);
  var type = ref.type;
  var timeout = ref.timeout;
  var propCount = ref.propCount;
  if (!type) { return cb() }
  var event = type === TRANSITION ? transitionEndEvent : animationEndEvent;
  var ended = 0;
  var end = function () {
    el.removeEventListener(event, onEnd);
    cb();
  };
  var onEnd = function (e) {
    if (e.target === el) {
      if (++ended >= propCount) {
        end();
      }
    }
  };
  setTimeout(function () {
    if (ended < propCount) {
      end();
    }
  }, timeout + 1);
  el.addEventListener(event, onEnd);
}

var transformRE = /\b(transform|all)(,|$)/;

function getTransitionInfo (el, expectedType) {
  var styles = window.getComputedStyle(el);
  var transitioneDelays = styles[transitionProp + 'Delay'].split(', ');
  var transitionDurations = styles[transitionProp + 'Duration'].split(', ');
  var transitionTimeout = getTimeout(transitioneDelays, transitionDurations);
  var animationDelays = styles[animationProp + 'Delay'].split(', ');
  var animationDurations = styles[animationProp + 'Duration'].split(', ');
  var animationTimeout = getTimeout(animationDelays, animationDurations);

  var type;
  var timeout = 0;
  var propCount = 0;
  /* istanbul ignore if */
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout = Math.max(transitionTimeout, animationTimeout);
    type = timeout > 0
      ? transitionTimeout > animationTimeout
        ? TRANSITION
        : ANIMATION
      : null;
    propCount = type
      ? type === TRANSITION
        ? transitionDurations.length
        : animationDurations.length
      : 0;
  }
  var hasTransform =
    type === TRANSITION &&
    transformRE.test(styles[transitionProp + 'Property']);
  return {
    type: type,
    timeout: timeout,
    propCount: propCount,
    hasTransform: hasTransform
  }
}

function getTimeout (delays, durations) {
  /* istanbul ignore next */
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }

  return Math.max.apply(null, durations.map(function (d, i) {
    return toMs(d) + toMs(delays[i])
  }))
}

function toMs (s) {
  return Number(s.slice(0, -1)) * 1000
}

/*  */

function enter (vnode, toggleDisplay) {
  var el = vnode.elm;

  // call leave callback now
  if (el._leaveCb) {
    el._leaveCb.cancelled = true;
    el._leaveCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (!data) {
    return
  }

  /* istanbul ignore if */
  if (el._enterCb || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var enterClass = data.enterClass;
  var enterToClass = data.enterToClass;
  var enterActiveClass = data.enterActiveClass;
  var appearClass = data.appearClass;
  var appearToClass = data.appearToClass;
  var appearActiveClass = data.appearActiveClass;
  var beforeEnter = data.beforeEnter;
  var enter = data.enter;
  var afterEnter = data.afterEnter;
  var enterCancelled = data.enterCancelled;
  var beforeAppear = data.beforeAppear;
  var appear = data.appear;
  var afterAppear = data.afterAppear;
  var appearCancelled = data.appearCancelled;

  // activeInstance will always be the <transition> component managing this
  // transition. One edge case to check is when the <transition> is placed
  // as the root node of a child component. In that case we need to check
  // <transition>'s parent for appear check.
  var context = activeInstance;
  var transitionNode = activeInstance.$vnode;
  while (transitionNode && transitionNode.parent) {
    transitionNode = transitionNode.parent;
    context = transitionNode.context;
  }

  var isAppear = !context._isMounted || !vnode.isRootInsert;

  if (isAppear && !appear && appear !== '') {
    return
  }

  var startClass = isAppear ? appearClass : enterClass;
  var activeClass = isAppear ? appearActiveClass : enterActiveClass;
  var toClass = isAppear ? appearToClass : enterToClass;
  var beforeEnterHook = isAppear ? (beforeAppear || beforeEnter) : beforeEnter;
  var enterHook = isAppear ? (typeof appear === 'function' ? appear : enter) : enter;
  var afterEnterHook = isAppear ? (afterAppear || afterEnter) : afterEnter;
  var enterCancelledHook = isAppear ? (appearCancelled || enterCancelled) : enterCancelled;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl =
    enterHook &&
    // enterHook may be a bound method which exposes
    // the length of original fn as _length
    (enterHook._length || enterHook.length) > 1;

  var cb = el._enterCb = once(function () {
    if (expectsCSS) {
      removeTransitionClass(el, toClass);
      removeTransitionClass(el, activeClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, startClass);
      }
      enterCancelledHook && enterCancelledHook(el);
    } else {
      afterEnterHook && afterEnterHook(el);
    }
    el._enterCb = null;
  });

  if (!vnode.data.show) {
    // remove pending leave element on enter by injecting an insert hook
    mergeVNodeHook(vnode.data.hook || (vnode.data.hook = {}), 'insert', function () {
      var parent = el.parentNode;
      var pendingNode = parent && parent._pending && parent._pending[vnode.key];
      if (pendingNode &&
          pendingNode.tag === vnode.tag &&
          pendingNode.elm._leaveCb) {
        pendingNode.elm._leaveCb();
      }
      enterHook && enterHook(el, cb);
    }, 'transition-insert');
  }

  // start enter transition
  beforeEnterHook && beforeEnterHook(el);
  if (expectsCSS) {
    addTransitionClass(el, startClass);
    addTransitionClass(el, activeClass);
    nextFrame(function () {
      addTransitionClass(el, toClass);
      removeTransitionClass(el, startClass);
      if (!cb.cancelled && !userWantsControl) {
        whenTransitionEnds(el, type, cb);
      }
    });
  }

  if (vnode.data.show) {
    toggleDisplay && toggleDisplay();
    enterHook && enterHook(el, cb);
  }

  if (!expectsCSS && !userWantsControl) {
    cb();
  }
}

function leave (vnode, rm) {
  var el = vnode.elm;

  // call enter callback now
  if (el._enterCb) {
    el._enterCb.cancelled = true;
    el._enterCb();
  }

  var data = resolveTransition(vnode.data.transition);
  if (!data) {
    return rm()
  }

  /* istanbul ignore if */
  if (el._leaveCb || el.nodeType !== 1) {
    return
  }

  var css = data.css;
  var type = data.type;
  var leaveClass = data.leaveClass;
  var leaveToClass = data.leaveToClass;
  var leaveActiveClass = data.leaveActiveClass;
  var beforeLeave = data.beforeLeave;
  var leave = data.leave;
  var afterLeave = data.afterLeave;
  var leaveCancelled = data.leaveCancelled;
  var delayLeave = data.delayLeave;

  var expectsCSS = css !== false && !isIE9;
  var userWantsControl =
    leave &&
    // leave hook may be a bound method which exposes
    // the length of original fn as _length
    (leave._length || leave.length) > 1;

  var cb = el._leaveCb = once(function () {
    if (el.parentNode && el.parentNode._pending) {
      el.parentNode._pending[vnode.key] = null;
    }
    if (expectsCSS) {
      removeTransitionClass(el, leaveToClass);
      removeTransitionClass(el, leaveActiveClass);
    }
    if (cb.cancelled) {
      if (expectsCSS) {
        removeTransitionClass(el, leaveClass);
      }
      leaveCancelled && leaveCancelled(el);
    } else {
      rm();
      afterLeave && afterLeave(el);
    }
    el._leaveCb = null;
  });

  if (delayLeave) {
    delayLeave(performLeave);
  } else {
    performLeave();
  }

  function performLeave () {
    // the delayed leave may have already been cancelled
    if (cb.cancelled) {
      return
    }
    // record leaving element
    if (!vnode.data.show) {
      (el.parentNode._pending || (el.parentNode._pending = {}))[vnode.key] = vnode;
    }
    beforeLeave && beforeLeave(el);
    if (expectsCSS) {
      addTransitionClass(el, leaveClass);
      addTransitionClass(el, leaveActiveClass);
      nextFrame(function () {
        addTransitionClass(el, leaveToClass);
        removeTransitionClass(el, leaveClass);
        if (!cb.cancelled && !userWantsControl) {
          whenTransitionEnds(el, type, cb);
        }
      });
    }
    leave && leave(el, cb);
    if (!expectsCSS && !userWantsControl) {
      cb();
    }
  }
}

function resolveTransition (def$$1) {
  if (!def$$1) {
    return
  }
  /* istanbul ignore else */
  if (typeof def$$1 === 'object') {
    var res = {};
    if (def$$1.css !== false) {
      extend(res, autoCssTransition(def$$1.name || 'v'));
    }
    extend(res, def$$1);
    return res
  } else if (typeof def$$1 === 'string') {
    return autoCssTransition(def$$1)
  }
}

var autoCssTransition = cached(function (name) {
  return {
    enterClass: (name + "-enter"),
    leaveClass: (name + "-leave"),
    appearClass: (name + "-enter"),
    enterToClass: (name + "-enter-to"),
    leaveToClass: (name + "-leave-to"),
    appearToClass: (name + "-enter-to"),
    enterActiveClass: (name + "-enter-active"),
    leaveActiveClass: (name + "-leave-active"),
    appearActiveClass: (name + "-enter-active")
  }
});

function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn();
    }
  }
}

function _enter (_, vnode) {
  if (!vnode.data.show) {
    enter(vnode);
  }
}

var transition = inBrowser ? {
  create: _enter,
  activate: _enter,
  remove: function remove (vnode, rm) {
    /* istanbul ignore else */
    if (!vnode.data.show) {
      leave(vnode, rm);
    } else {
      rm();
    }
  }
} : {};

var platformModules = [
  attrs,
  klass,
  events,
  domProps,
  style,
  transition
];

/*  */

// the directive module should be applied last, after all
// built-in modules have been applied.
var modules = platformModules.concat(baseModules);

var patch$1 = createPatchFunction({ nodeOps: nodeOps, modules: modules });

/**
 * Not type checking this file because flow doesn't like attaching
 * properties to Elements.
 */

var modelableTagRE = /^input|select|textarea|vue-component-[0-9]+(-[0-9a-zA-Z_-]*)?$/;

/* istanbul ignore if */
if (isIE9) {
  // http://www.matts411.com/post/internet-explorer-9-oninput/
  document.addEventListener('selectionchange', function () {
    var el = document.activeElement;
    if (el && el.vmodel) {
      trigger(el, 'input');
    }
  });
}

var model = {
  inserted: function inserted (el, binding, vnode) {
    if (process.env.NODE_ENV !== 'production') {
      if (!modelableTagRE.test(vnode.tag)) {
        warn(
          "v-model is not supported on element type: <" + (vnode.tag) + ">. " +
          'If you are working with contenteditable, it\'s recommended to ' +
          'wrap a library dedicated for that purpose inside a custom component.',
          vnode.context
        );
      }
    }
    if (vnode.tag === 'select') {
      var cb = function () {
        setSelected(el, binding, vnode.context);
      };
      cb();
      /* istanbul ignore if */
      if (isIE || isEdge) {
        setTimeout(cb, 0);
      }
    } else if (vnode.tag === 'textarea' || el.type === 'text') {
      el._vModifiers = binding.modifiers;
      if (!binding.modifiers.lazy) {
        if (!isAndroid) {
          el.addEventListener('compositionstart', onCompositionStart);
          el.addEventListener('compositionend', onCompositionEnd);
        }
        /* istanbul ignore if */
        if (isIE9) {
          el.vmodel = true;
        }
      }
    }
  },
  componentUpdated: function componentUpdated (el, binding, vnode) {
    if (vnode.tag === 'select') {
      setSelected(el, binding, vnode.context);
      // in case the options rendered by v-for have changed,
      // it's possible that the value is out-of-sync with the rendered options.
      // detect such cases and filter out values that no longer has a matching
      // option in the DOM.
      var needReset = el.multiple
        ? binding.value.some(function (v) { return hasNoMatchingOption(v, el.options); })
        : binding.value !== binding.oldValue && hasNoMatchingOption(binding.value, el.options);
      if (needReset) {
        trigger(el, 'change');
      }
    }
  }
};

function setSelected (el, binding, vm) {
  var value = binding.value;
  var isMultiple = el.multiple;
  if (isMultiple && !Array.isArray(value)) {
    process.env.NODE_ENV !== 'production' && warn(
      "<select multiple v-model=\"" + (binding.expression) + "\"> " +
      "expects an Array value for its binding, but got " + (Object.prototype.toString.call(value).slice(8, -1)),
      vm
    );
    return
  }
  var selected, option;
  for (var i = 0, l = el.options.length; i < l; i++) {
    option = el.options[i];
    if (isMultiple) {
      selected = looseIndexOf(value, getValue(option)) > -1;
      if (option.selected !== selected) {
        option.selected = selected;
      }
    } else {
      if (looseEqual(getValue(option), value)) {
        if (el.selectedIndex !== i) {
          el.selectedIndex = i;
        }
        return
      }
    }
  }
  if (!isMultiple) {
    el.selectedIndex = -1;
  }
}

function hasNoMatchingOption (value, options) {
  for (var i = 0, l = options.length; i < l; i++) {
    if (looseEqual(getValue(options[i]), value)) {
      return false
    }
  }
  return true
}

function getValue (option) {
  return '_value' in option
    ? option._value
    : option.value
}

function onCompositionStart (e) {
  e.target.composing = true;
}

function onCompositionEnd (e) {
  e.target.composing = false;
  trigger(e.target, 'input');
}

function trigger (el, type) {
  var e = document.createEvent('HTMLEvents');
  e.initEvent(type, true, true);
  el.dispatchEvent(e);
}

/*  */

// recursively search for possible transition defined inside the component root
function locateNode (vnode) {
  return vnode.componentInstance && (!vnode.data || !vnode.data.transition)
    ? locateNode(vnode.componentInstance._vnode)
    : vnode
}

var show = {
  bind: function bind (el, ref, vnode) {
    var value = ref.value;

    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    var originalDisplay = el.__vOriginalDisplay =
      el.style.display === 'none' ? '' : el.style.display;
    if (value && transition && !isIE9) {
      vnode.data.show = true;
      enter(vnode, function () {
        el.style.display = originalDisplay;
      });
    } else {
      el.style.display = value ? originalDisplay : 'none';
    }
  },

  update: function update (el, ref, vnode) {
    var value = ref.value;
    var oldValue = ref.oldValue;

    /* istanbul ignore if */
    if (value === oldValue) { return }
    vnode = locateNode(vnode);
    var transition = vnode.data && vnode.data.transition;
    if (transition && !isIE9) {
      vnode.data.show = true;
      if (value) {
        enter(vnode, function () {
          el.style.display = el.__vOriginalDisplay;
        });
      } else {
        leave(vnode, function () {
          el.style.display = 'none';
        });
      }
    } else {
      el.style.display = value ? el.__vOriginalDisplay : 'none';
    }
  },

  unbind: function unbind (
    el,
    binding,
    vnode,
    oldVnode,
    isDestroy
  ) {
    if (!isDestroy) {
      el.style.display = el.__vOriginalDisplay;
    }
  }
};

var platformDirectives = {
  model: model,
  show: show
};

/*  */

// Provides transition support for a single element/component.
// supports transition mode (out-in / in-out)

var transitionProps = {
  name: String,
  appear: Boolean,
  css: Boolean,
  mode: String,
  type: String,
  enterClass: String,
  leaveClass: String,
  enterToClass: String,
  leaveToClass: String,
  enterActiveClass: String,
  leaveActiveClass: String,
  appearClass: String,
  appearActiveClass: String,
  appearToClass: String
};

// in case the child is also an abstract component, e.g. <keep-alive>
// we want to recursively retrieve the real component to be rendered
function getRealChild (vnode) {
  var compOptions = vnode && vnode.componentOptions;
  if (compOptions && compOptions.Ctor.options.abstract) {
    return getRealChild(getFirstComponentChild(compOptions.children))
  } else {
    return vnode
  }
}

function extractTransitionData (comp) {
  var data = {};
  var options = comp.$options;
  // props
  for (var key in options.propsData) {
    data[key] = comp[key];
  }
  // events.
  // extract listeners and pass them directly to the transition methods
  var listeners = options._parentListeners;
  for (var key$1 in listeners) {
    data[camelize(key$1)] = listeners[key$1].fn;
  }
  return data
}

function placeholder (h, rawChild) {
  return /\d-keep-alive$/.test(rawChild.tag)
    ? h('keep-alive')
    : null
}

function hasParentTransition (vnode) {
  while ((vnode = vnode.parent)) {
    if (vnode.data.transition) {
      return true
    }
  }
}

function isSameChild (child, oldChild) {
  return oldChild.key === child.key && oldChild.tag === child.tag
}

var Transition = {
  name: 'transition',
  props: transitionProps,
  abstract: true,

  render: function render (h) {
    var this$1 = this;

    var children = this.$slots.default;
    if (!children) {
      return
    }

    // filter out text nodes (possible whitespaces)
    children = children.filter(function (c) { return c.tag; });
    /* istanbul ignore if */
    if (!children.length) {
      return
    }

    // warn multiple elements
    if (process.env.NODE_ENV !== 'production' && children.length > 1) {
      warn(
        '<transition> can only be used on a single element. Use ' +
        '<transition-group> for lists.',
        this.$parent
      );
    }

    var mode = this.mode;

    // warn invalid mode
    if (process.env.NODE_ENV !== 'production' &&
        mode && mode !== 'in-out' && mode !== 'out-in') {
      warn(
        'invalid <transition> mode: ' + mode,
        this.$parent
      );
    }

    var rawChild = children[0];

    // if this is a component root node and the component's
    // parent container node also has transition, skip.
    if (hasParentTransition(this.$vnode)) {
      return rawChild
    }

    // apply transition data to child
    // use getRealChild() to ignore abstract components e.g. keep-alive
    var child = getRealChild(rawChild);
    /* istanbul ignore if */
    if (!child) {
      return rawChild
    }

    if (this._leaving) {
      return placeholder(h, rawChild)
    }

    // ensure a key that is unique to the vnode type and to this transition
    // component instance. This key will be used to remove pending leaving nodes
    // during entering.
    var id = "__transition-" + (this._uid) + "-";
    var key = child.key = child.key == null
      ? id + child.tag
      : isPrimitive(child.key)
        ? (String(child.key).indexOf(id) === 0 ? child.key : id + child.key)
        : child.key;
    var data = (child.data || (child.data = {})).transition = extractTransitionData(this);
    var oldRawChild = this._vnode;
    var oldChild = getRealChild(oldRawChild);

    // mark v-show
    // so that the transition module can hand over the control to the directive
    if (child.data.directives && child.data.directives.some(function (d) { return d.name === 'show'; })) {
      child.data.show = true;
    }

    if (oldChild && oldChild.data && !isSameChild(child, oldChild)) {
      // replace old child transition data with fresh one
      // important for dynamic transitions!
      var oldData = oldChild && (oldChild.data.transition = extend({}, data));
      // handle transition mode
      if (mode === 'out-in') {
        // return placeholder node and queue update when leave finishes
        this._leaving = true;
        mergeVNodeHook(oldData, 'afterLeave', function () {
          this$1._leaving = false;
          this$1.$forceUpdate();
        }, key);
        return placeholder(h, rawChild)
      } else if (mode === 'in-out') {
        var delayedLeave;
        var performLeave = function () { delayedLeave(); };
        mergeVNodeHook(data, 'afterEnter', performLeave, key);
        mergeVNodeHook(data, 'enterCancelled', performLeave, key);
        mergeVNodeHook(oldData, 'delayLeave', function (leave) {
          delayedLeave = leave;
        }, key);
      }
    }

    return rawChild
  }
};

/*  */

// Provides transition support for list items.
// supports move transitions using the FLIP technique.

// Because the vdom's children update algorithm is "unstable" - i.e.
// it doesn't guarantee the relative positioning of removed elements,
// we force transition-group to update its children into two passes:
// in the first pass, we remove all nodes that need to be removed,
// triggering their leaving transition; in the second pass, we insert/move
// into the final disired state. This way in the second pass removed
// nodes will remain where they should be.

var props = extend({
  tag: String,
  moveClass: String
}, transitionProps);

delete props.mode;

var TransitionGroup = {
  props: props,

  render: function render (h) {
    var tag = this.tag || this.$vnode.data.tag || 'span';
    var map = Object.create(null);
    var prevChildren = this.prevChildren = this.children;
    var rawChildren = this.$slots.default || [];
    var children = this.children = [];
    var transitionData = extractTransitionData(this);

    for (var i = 0; i < rawChildren.length; i++) {
      var c = rawChildren[i];
      if (c.tag) {
        if (c.key != null && String(c.key).indexOf('__vlist') !== 0) {
          children.push(c);
          map[c.key] = c
          ;(c.data || (c.data = {})).transition = transitionData;
        } else if (process.env.NODE_ENV !== 'production') {
          var opts = c.componentOptions;
          var name = opts
            ? (opts.Ctor.options.name || opts.tag)
            : c.tag;
          warn(("<transition-group> children must be keyed: <" + name + ">"));
        }
      }
    }

    if (prevChildren) {
      var kept = [];
      var removed = [];
      for (var i$1 = 0; i$1 < prevChildren.length; i$1++) {
        var c$1 = prevChildren[i$1];
        c$1.data.transition = transitionData;
        c$1.data.pos = c$1.elm.getBoundingClientRect();
        if (map[c$1.key]) {
          kept.push(c$1);
        } else {
          removed.push(c$1);
        }
      }
      this.kept = h(tag, null, kept);
      this.removed = removed;
    }

    return h(tag, null, children)
  },

  beforeUpdate: function beforeUpdate () {
    // force removing pass
    this.__patch__(
      this._vnode,
      this.kept,
      false, // hydrating
      true // removeOnly (!important, avoids unnecessary moves)
    );
    this._vnode = this.kept;
  },

  updated: function updated () {
    var children = this.prevChildren;
    var moveClass = this.moveClass || ((this.name || 'v') + '-move');
    if (!children.length || !this.hasMove(children[0].elm, moveClass)) {
      return
    }

    // we divide the work into three loops to avoid mixing DOM reads and writes
    // in each iteration - which helps prevent layout thrashing.
    children.forEach(callPendingCbs);
    children.forEach(recordPosition);
    children.forEach(applyTranslation);

    // force reflow to put everything in position
    var f = document.body.offsetHeight; // eslint-disable-line

    children.forEach(function (c) {
      if (c.data.moved) {
        var el = c.elm;
        var s = el.style;
        addTransitionClass(el, moveClass);
        s.transform = s.WebkitTransform = s.transitionDuration = '';
        el.addEventListener(transitionEndEvent, el._moveCb = function cb (e) {
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener(transitionEndEvent, cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        });
      }
    });
  },

  methods: {
    hasMove: function hasMove (el, moveClass) {
      /* istanbul ignore if */
      if (!hasTransition) {
        return false
      }
      if (this._hasMove != null) {
        return this._hasMove
      }
      addTransitionClass(el, moveClass);
      var info = getTransitionInfo(el);
      removeTransitionClass(el, moveClass);
      return (this._hasMove = info.hasTransform)
    }
  }
};

function callPendingCbs (c) {
  /* istanbul ignore if */
  if (c.elm._moveCb) {
    c.elm._moveCb();
  }
  /* istanbul ignore if */
  if (c.elm._enterCb) {
    c.elm._enterCb();
  }
}

function recordPosition (c) {
  c.data.newPos = c.elm.getBoundingClientRect();
}

function applyTranslation (c) {
  var oldPos = c.data.pos;
  var newPos = c.data.newPos;
  var dx = oldPos.left - newPos.left;
  var dy = oldPos.top - newPos.top;
  if (dx || dy) {
    c.data.moved = true;
    var s = c.elm.style;
    s.transform = s.WebkitTransform = "translate(" + dx + "px," + dy + "px)";
    s.transitionDuration = '0s';
  }
}

var platformComponents = {
  Transition: Transition,
  TransitionGroup: TransitionGroup
};

/*  */

// install platform specific utils
Vue$2.config.isUnknownElement = isUnknownElement;
Vue$2.config.isReservedTag = isReservedTag;
Vue$2.config.getTagNamespace = getTagNamespace;
Vue$2.config.mustUseProp = mustUseProp;

// install platform runtime directives & components
extend(Vue$2.options.directives, platformDirectives);
extend(Vue$2.options.components, platformComponents);

// install platform patch function
Vue$2.prototype.__patch__ = inBrowser ? patch$1 : noop;

// wrap mount
Vue$2.prototype.$mount = function (
  el,
  hydrating
) {
  el = el && inBrowser ? query(el) : undefined;
  return this._mount(el, hydrating)
};

if (process.env.NODE_ENV !== 'production' &&
    inBrowser && typeof console !== 'undefined') {
  console[console.info ? 'info' : 'log'](
    "You are running Vue in development mode.\n" +
    "Make sure to turn on production mode when deploying for production.\n" +
    "See more tips at https://vuejs.org/guide/deployment.html"
  );
}

// devtools global hook
/* istanbul ignore next */
setTimeout(function () {
  if (config.devtools) {
    if (devtools) {
      devtools.emit('init', Vue$2);
    } else if (
      process.env.NODE_ENV !== 'production' &&
      inBrowser && !isEdge && /Chrome\/\d+/.test(window.navigator.userAgent)
    ) {
      console[console.info ? 'info' : 'log'](
        'Download the Vue Devtools extension for a better development experience:\n' +
        'https://github.com/vuejs/vue-devtools'
      );
    }
  }
}, 0);

module.exports = Vue$2;

/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(4), __webpack_require__(54)))

/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

//引入子组件
/* harmony default export */ __webpack_exports__["default"] = {
	data() {
		return {
			ischange: true, //是否切换菜单栏显示
			page: 1,
			info: {}
		};
	},
	created: function () {
		// 应用创建完成先删除自己的localStorage信息
		window.localStorage.removeItem('spinfo');
	},
	methods: {
		// 头部返回功能
		back: function () {
			window.history.go(-1);
		},
		// 改变主菜单样式功能
		change: function () {
			this.ischange = !this.ischange;
		},
		// 购物车传值 子传父
		cartShowNum: function (parsms) {
			this.info = parsms;
		}
	},
	computed: {
		isMenuShow: function () {
			if (this.$route.path === '/menu') {
				return true;
			} else {
				return false;
			}
		}
	}

};

/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__userInfo_vue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__userInfo_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__userInfo_vue__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

// 引入模块

/* harmony default export */ __webpack_exports__["default"] = {
    name: 'cart',
    props: ['info'],
    data() {
        return {
            title: '联系方式',
            isUser: false,
            spinfo: {
                sum: 0,
                result: {}
            },
            price: 0, //商品总价
            content: '' };
    },
    created: function () {
        this.getSpinfo();
        //重新计算价格
        this.countPrice();
    },
    components: {
        'userInfo': __WEBPACK_IMPORTED_MODULE_0__userInfo_vue___default.a
    },
    methods: {
        // 获取商品信息
        getSpinfo: function () {
            //获取本地数据渲染
            var str = window.localStorage.getItem('spinfo');
            if (str) {
                //存在才解析
                this.spinfo = JSON.parse(str);
            }
        },
        // 减某件商品
        sub: function (index) {
            //对本地数据执行减操作
            //先获取本地
            var strinfo = window.localStorage.getItem('spinfo');
            // 转换
            this.spinfo = JSON.parse(strinfo);
            // 处理数据
            this.spinfo.sum--;
            this.spinfo.result[index].num--;
            // 数组删除
            this.spinfo.result[index].list.pop();
            // 打包数据
            var str = JSON.stringify(this.spinfo);
            // 写入本地
            window.localStorage.setItem('spinfo', str);
            // 传值给父元素
            this.$emit('count', this.spinfo);
            //重新计算价格
            this.countPrice();
        },
        // 加某件商品
        add: function (index) {
            //对本地数据执行加操作             
            var strinfo = window.localStorage.getItem('spinfo');
            this.spinfo = JSON.parse(strinfo);
            this.spinfo.sum++;
            this.spinfo.result[index].num++;
            var lis = this.spinfo.result[index].list[0];
            this.spinfo.result[index].list.push(lis);
            var str = JSON.stringify(this.spinfo);
            window.localStorage.setItem('spinfo', str);
            // 传值给父元素
            this.$emit('count', this.spinfo);
            //重新计算价格
            this.countPrice();
        },
        // 重新计算价格 并设置配送信息
        countPrice: function () {
            //遍历所有
            var obj = this.spinfo.result;
            var priceArr = [];
            // 清空订餐内容
            this.content = '';
            for (var key in obj) {
                //确保大于0才能计算价格
                if (obj[key].num > 0) {
                    // 商品信息处理
                    var str = obj[key].list[0].title + '(' + obj[key].num + ')';
                    this.content += str + "、";
                    // 单种商品总价
                    var price = Number(obj[key].num) * Number(obj[key].list[0].price);
                    priceArr.push(price);
                }
            }
            // 修剪订餐内容
            this.content = this.content.slice(0, -1);
            // console.log(this.content);
            //价格置零 
            this.price = 0;
            //重新计算
            for (var i = 0; i < priceArr.length; i++) {
                this.price += priceArr[i];
            }
        },
        // 清空购物车
        clearCart: function () {
            // 清空本地数据
            window.localStorage.removeItem('spinfo');
            // 重置对象
            this.spinfo = {
                sum: 0,
                result: {}
            };
            //置空价格
            this.price = 0;
            // 传值给父元素
            this.$emit('count', this.spinfo);
        }

    }

};

/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__store_index_js__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__store_index_js___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__store_index_js__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

//引入获取数据

/* harmony default export */ __webpack_exports__["default"] = {
    name: 'menu',
    props: ['ischange'],
    data() {
        return {
            list: [],
            page: 1,
            isloading: false,
            status: true,
            flag: true,
            isActive: false, //按钮是否被使用激活样式  
            spinfo: {
                sum: 0, //总数
                result: {
                    //结果列表                                         
                }
            }, //返回给购物车的商品详情对象  
            time: 0
        };
    },
    created: function () {
        this.getMenuList(this.page);
    },
    mounted: function () {},
    methods: {
        // 点击添加来一份
        add: function (index) {
            //按钮点击样式处理
            var btn = this.$refs['btn' + index][0];
            btn.className = 'add_btn add_btn_tog';
            btn.disabled = true;
            if (this.isActive == false) {
                this.isActive = true;
                this.isActive = false;
                btn.className = 'add_btn';
                btn.disabled = false;

                //本地读取商品信息
                var str = window.localStorage.getItem('spinfo');
                if (!str) {
                    //没有获取到spinfo时
                    window.localStorage.setItem('spinfo', JSON.stringify(this.spinfo));
                } else {
                    //有spinfo
                    this.spinfo = JSON.parse(str);
                }

                //构建商品信息
                //商品总数加一 
                this.spinfo.sum += 1;

                //欲添加的一条商品信息
                var lis = this.list[index];

                if (!this.spinfo.result[index]) {
                    //未添加的商品
                    this.spinfo.result[index] = {};
                    this.spinfo.result[index]['num'] = 1;
                    this.spinfo.result[index]['list'] = [lis];
                } else {
                    this.spinfo.result[index]['num'] += 1;
                    this.spinfo.result[index]['list'].push(lis);
                }

                // 写入到本地
                window.localStorage.setItem('spinfo', JSON.stringify(this.spinfo));
                // console.log(window.localStorage.getItem('spinfo'));

                //子传值给父 事件名称(父元素v-on:count="add") 子传入给父的值
                // 父在add:function(params){params就是传入的值}
                this.$emit('count', this.spinfo);
            }
        },
        getMenuList: function (page) {
            //获取数据 第一次获取到数据  
            var self = this;
            //正在加载
            this.isloading = true;
            if (this.flag) {
                // 保证唯一
                this.flag = false;
                setTimeout(function () {
                    var obj = __WEBPACK_IMPORTED_MODULE_0__store_index_js___default.a.getPage(page);
                    self.status = obj.status;
                    if (self.status) {
                        self.list = self.list.concat(obj.result);
                        self.page++;
                    }
                    self.isloading = false;
                    self.flag = true;
                }, 2000);
            }

            //  加载完成

        },
        //滑动结束事件
        touchend: function () {
            if (!this.status) {
                return;
            }
            //被卷去头部高度                
            var scrollTop = this.$refs.view.scrollTop;
            // 元素自身高度
            var selfHeight = this.$refs.view.offsetHeight;
            // 内容高度
            var scrollHeight = this.$refs.view.scrollHeight;
            // debugger;
            if (scrollHeight < selfHeight + scrollTop + 50) {
                //要请求数据了
                this.getMenuList(this.page);
            }
        }
    }

};

/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = {
    name: 'order',
    data() {
        return {
            isList: false,
            list: [],
            isDelete: false

        };
    },
    created: function () {
        this.getListInfo();
    },
    methods: {
        // 获取商品数据
        getListInfo: function () {
            // 获取本地内容
            this.list = JSON.parse(window.localStorage.getItem('commocdity') || '[]');
            this.isList = this.list.length > 0 ? true : false;
        },
        // 删除商品
        deleteList: function (index) {
            this.isDelete = true;
            // 处理数据
            this.list.splice(index, 1);
            // 重新写入数据
            window.localStorage.setItem('commocdity', JSON.stringify(this.list));
            var self = this;
            setTimeout(function () {
                self.isDelete = false;
            }, 1500);
        }
    }
};

/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__userInfo_vue__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__userInfo_vue___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0__userInfo_vue__);
//
//
//
//
//
//
//
//
//
//
//
//

// 引入模块

/* harmony default export */ __webpack_exports__["default"] = {
    name: 'user',
    data() {
        return {
            title: '默认联系方式'

        };
    },
    components: {
        'userInfo': __WEBPACK_IMPORTED_MODULE_0__userInfo_vue___default.a
    },
    methods: {}
};

/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = {
    name: 'userInfo',
    // 父传 标题 是否是用户界面   总价     订餐内容   按钮是否激活
    props: ['title', 'clearCart', 'isUser', 'price', 'content', 'isBtnActiev'],
    data() {
        return {
            time: null,
            name: '',
            isNameOk: false,
            phone: '',
            isPhoneOk: false,
            address: '',
            isAddressOk: false,
            peiSXinxi: '',
            isModal: false,
            status: ''
        };
    },
    created: function () {
        // 读取并设置用户信息
        this.readUser();
    },
    methods: {
        // 提交订单信息
        submit: function () {
            // 显示模态框
            this.isModal = true;
            //确定时间
            this.time = this.getTime();
            this.status = '货到付款';
            //确定订餐内容 父级传                
            //确定配送信息
            this.peiSXinxi = this.name + '、' + this.phone + '、' + this.address;

            // 将订单信息写入到本地
            var obj = {};
            obj.time = this.time;
            obj.content = this.content;
            obj.peiSXinxi = this.peiSXinxi;
            obj.price = this.price;
            obj.status = this.status;
            // 从前加入数组
            // 获取商品内容
            var strArr = JSON.parse(window.localStorage.getItem('commocdity') || '[]');
            strArr.unshift(obj);
            //写入到本地数据
            window.localStorage.setItem('commocdity', JSON.stringify(strArr));
            // 2s后隐藏
            var self = this;
            setTimeout(function () {
                self.isModal = false;
                // 函数内部路由跳转
                self.$router.push({ path: '/order' });
            }, 1000);
        },
        // 提交用户信息
        submitSave: function () {
            this.isModal = true;
            // 收集用户信息
            var obj = {};
            obj.name = this.name;
            obj.phone = this.phone;
            obj.address = this.address;
            // 重写用户信息
            window.localStorage.setItem('user', JSON.stringify(obj));
            var self = this;
            setTimeout(function () {
                self.isModal = false;
                self.$router.push({ path: '/menu' });
            }, 2000);
        },
        // 读用户信息
        readUser: function () {
            var str = window.localStorage.getItem('user');
            if (str) {
                var obj = JSON.parse(str);
                this.name = obj.name;
                this.phone = obj.phone;
                this.address = obj.address;
                // 读取到值 修改状态
                this.isNameOk = true;
                this.isPhoneOk = true;
                this.isAddressOk = true;
            }
        },
        // 获取时间
        getTime: function () {
            var date = new Date();
            var y = date.getFullYear();
            var M = date.getMonth() + 1;
            var d = date.getDate();
            var h = date.getHours();
            var m = date.getMinutes();
            var s = date.getSeconds();
            if (M < 10) {
                M = 0 + M;
            }
            if (d < 10) {
                d = 0 + d;
            }
            if (h < 10) {
                h = 0 + h;
            }
            if (m < 10) {
                m = 0 + m;
            }
            if (s < 10) {
                s = 0 + s;
            }
            return y + '-' + M + '-' + d + ' ' + h + ':' + m + ':' + s;
        },
        // 获取配送信息
        getPeiXinx: function () {
            return;
        },
        // 判断名字
        nameValidate: function () {
            var vl = this.$refs.name.value;
            if (vl) {
                this.isNameOk = true;
            } else {
                this.isNameOk = false;
            }
        },
        // 判断手机
        phoneValidate: function () {
            var vl = this.$refs.phone.value;
            var reg = /^\d{11}$/;
            if (reg.test(vl)) {
                this.isPhoneOk = true;
            } else {
                this.isPhoneOk = false;
            }
        },
        // 判断地址
        addressValidate: function () {
            var vl = this.$refs.address.value;
            if (vl) {
                this.isAddressOk = true;
            } else {
                this.isAddressOk = false;
            }
        }
    },
    computed: {
        // 是否禁用按钮
        validate: function () {
            if (this.isNameOk && this.isPhoneOk && this.isAddressOk) {
                // 不禁用
                return false;
            } else {
                // 禁用按钮
                return true;
            }
        }
    }

};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
// 构建数据请求对象
var getData = {
  //基础路径
  //  一次返回5条数据 根据传入的page值
  // 获取30条数据
  getPage: function getPage(page) {
    // debugger;
    this.length = this.data.length;
    //待返回的对象
    var obj = {};
    obj.status = true;
    //先判断length长度 这里是要取整页
    if (this.length > page * 5) {
      // 还有多余数据可以传
      // debugger;
      obj['result'] = this.data.slice((page - 1) * 5, page * 5);
    } else {
      //没有多余的数据可以传
      //需要判断还有多少个可以传
      var num = this.length - (page - 1) * 5;
      if (num > 0) {
        //还有不足一页的数据可以传
        // debugger;
        obj['result'] = this.data.slice((page - 1) * 5, this.length);
      } else {
        //修改获取数据的状态值 没有数据可以获取了
        obj['result'] = [];
        obj.status = false;
      }
    }
    obj['page'] = page;
    return obj;
  },
  data: [{
    "id": 1,
    "img": "./static/images/1.jpg",
    "title": "老北京杂酱面",
    "info": "苏格兰打卤面，大杯可乐",
    "price": 20
  }, {
    "id": 2,
    "img": "./static/images/2.jpg",
    "title": "宫爆鸡丁",
    "info": "宫爆鸡丁一份，两碗米饭，蛋花汤",
    "price": 25
  }, {
    "id": 3,
    "img": "./static/images/3.jpg",
    "title": "剁椒鱼头套餐",
    "info": "剁椒鱼头，白菜豆腐汤，四碗面条，可口凉菜",
    "price": 36
  }, {
    "id": 4,
    "img": "./static/images/4.jpg",
    "title": "老北京烤鸭套餐",
    "info": "北京烤鸭，四碗米饭，大杯可乐四桶，鸡蛋汤",
    "price": 45
  }, {
    "id": 5,
    "img": "./static/images/5.jpg",
    "title": "土豆炖牛肉套餐",
    "info": "土豆炖牛肉一份，米饭四碗，可口可乐，凉菜",
    "price": 35
  }, {
    "id": 6,
    "img": "./static/images/6.jpg",
    "title": "鱼香肉丝盖饭",
    "info": "现炒鱼香肉丝",
    "price": 15
  }, {
    "id": 7,
    "img": "./static/images/7.jpg",
    "title": "尖椒肉丝盖饭",
    "info": "绿色尖椒",
    "price": 15
  }, {
    "id": 8,
    "img": "./static/images/8.jpg",
    "title": "家常肉饼",
    "info": "肉饼三个",
    "price": 10
  }, {
    "id": 9,
    "img": "./static/images/9.jpg",
    "title": "过油肉套餐",
    "info": "过油肉一份，两碗米饭",
    "price": 25
  }, {
    "id": 10,
    "img": "./static/images/10.jpg",
    "title": "铁板牛柳套餐",
    "info": "铁板牛柳一份，两碗米饭",
    "price": 30
  }, {
    "id": 11,
    "img": "./static/images/11.jpg",
    "title": "苦瓜炒蛋套餐",
    "info": "苦瓜炒蛋一份，两碗米饭",
    "price": 20
  }, {
    "id": 12,
    "img": "./static/images/12.jpg",
    "title": "兰州牛肉拉面",
    "info": "兰州牛肉拉面大碗",
    "price": 18
  }, {
    "id": 13,
    "img": "./static/images/13.jpg",
    "title": "沙县木桶饭",
    "info": "沙县红烧肉木桶饭",
    "price": 18
  }, {
    "id": 14,
    "img": "./static/images/14.jpg",
    "title": "三明治咖啡套餐",
    "info": "三明治两个，咖啡一杯",
    "price": 30
  }, {
    "id": 15,
    "img": "./static/images/15.jpg",
    "title": "意式香肠披萨",
    "info": "7寸意式香肠披萨一个",
    "price": 56
  }]

};
exports.default = getData;

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "    /*loading图片加载动画*/\r\n    \r\n    @-webkit-keyframes ball-spin-fade-loader {\r\n        50% {\r\n            opacity: 0.3;\r\n            -webkit-transform: scale(0.4);\r\n            transform: scale(0.4);\r\n        }\r\n        100% {\r\n            opacity: 1;\r\n            -webkit-transform: scale(1);\r\n            transform: scale(1);\r\n        }\r\n    }\r\n    \r\n    @keyframes ball-spin-fade-loader {\r\n        50% {\r\n            opacity: 0.3;\r\n            -webkit-transform: scale(0.4);\r\n            transform: scale(0.4);\r\n        }\r\n        100% {\r\n            opacity: 1;\r\n            -webkit-transform: scale(1);\r\n            transform: scale(1);\r\n        }\r\n    }\r\n    \r\n    .ball-spin-fade-loader {\r\n        position: relative;\r\n    }\r\n    \r\n    .ball-spin-fade-loader>div:nth-child(1) {\r\n        top: 25px;\r\n        left: 0;\r\n        -webkit-animation: ball-spin-fade-loader 1s 0s infinite linear;\r\n        animation: ball-spin-fade-loader 1s 0s infinite linear;\r\n    }\r\n    \r\n    .ball-spin-fade-loader>div:nth-child(2) {\r\n        top: 17.04545px;\r\n        left: 17.04545px;\r\n        -webkit-animation: ball-spin-fade-loader 1s 0.12s infinite linear;\r\n        animation: ball-spin-fade-loader 1s 0.12s infinite linear;\r\n    }\r\n    \r\n    .ball-spin-fade-loader>div:nth-child(3) {\r\n        top: 0;\r\n        left: 25px;\r\n        -webkit-animation: ball-spin-fade-loader 1s 0.24s infinite linear;\r\n        animation: ball-spin-fade-loader 1s 0.24s infinite linear;\r\n    }\r\n    \r\n    .ball-spin-fade-loader>div:nth-child(4) {\r\n        top: -17.04545px;\r\n        left: 17.04545px;\r\n        -webkit-animation: ball-spin-fade-loader 1s 0.36s infinite linear;\r\n        animation: ball-spin-fade-loader 1s 0.36s infinite linear;\r\n    }\r\n    \r\n    .ball-spin-fade-loader>div:nth-child(5) {\r\n        top: -25px;\r\n        left: 0;\r\n        -webkit-animation: ball-spin-fade-loader 1s 0.48s infinite linear;\r\n        animation: ball-spin-fade-loader 1s 0.48s infinite linear;\r\n    }\r\n    \r\n    .ball-spin-fade-loader>div:nth-child(6) {\r\n        top: -17.04545px;\r\n        left: -17.04545px;\r\n        -webkit-animation: ball-spin-fade-loader 1s 0.6s infinite linear;\r\n        animation: ball-spin-fade-loader 1s 0.6s infinite linear;\r\n    }\r\n    \r\n    .ball-spin-fade-loader>div:nth-child(7) {\r\n        top: 0;\r\n        left: -25px;\r\n        -webkit-animation: ball-spin-fade-loader 1s 0.72s infinite linear;\r\n        animation: ball-spin-fade-loader 1s 0.72s infinite linear;\r\n    }\r\n    \r\n    .ball-spin-fade-loader>div:nth-child(8) {\r\n        top: 17.04545px;\r\n        left: -17.04545px;\r\n        -webkit-animation: ball-spin-fade-loader 1s 0.84s infinite linear;\r\n        animation: ball-spin-fade-loader 1s 0.84s infinite linear;\r\n    }\r\n    \r\n    .ball-spin-fade-loader>div {\r\n        background-color: #fff;\r\n        width: 15px;\r\n        height: 15px;\r\n        border-radius: 100%;\r\n        margin: 2px;\r\n        -webkit-animation-fill-mode: both;\r\n        animation-fill-mode: both;\r\n        position: absolute;\r\n    }\r\n    /*模态框弹出动画*/\r\n    @-webkit-keyframes my_bounceInDown {\r\n        from,\r\n        60%,\r\n        75%,\r\n        90%,\r\n        to {\r\n            -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\r\n            animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\r\n        }\r\n        0% {\r\n            opacity: 0;\r\n            -webkit-transform: translate3d(-50%, -3000px, 0);\r\n            transform: translate3d(-50%, -3000px, 0);\r\n        }\r\n        60% {\r\n            opacity: 1;\r\n            -webkit-transform: translate3d(-50%, 25px, 0);\r\n            transform: translate3d(-50%, 25px, 0);\r\n        }\r\n        75% {\r\n            -webkit-transform: translate3d(-50%, -60%, 0);\r\n            transform: translate3d(-50%, -60%, 0);\r\n        }\r\n        90% {\r\n            -webkit-transform: translate3d(-50%, -45%, 0);\r\n            transform: translate3d(-50%, -45%, 0);\r\n        }\r\n        to {\r\n            -webkit-transform: translate3d(-50%, -50%, 0);\r\n            transform: translate3d(-50%, -50%, 0);\r\n        }\r\n    }\r\n    @keyframes my_bounceInDown {\r\n        from,\r\n        60%,\r\n        75%,\r\n        90%,\r\n        to {\r\n            -webkit-animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\r\n            animation-timing-function: cubic-bezier(0.215, 0.610, 0.355, 1.000);\r\n        }\r\n        0% {\r\n            opacity: 0;\r\n            -webkit-transform: translate3d(-50%, -3000px, 0);\r\n            transform: translate3d(-50%, -3000px, 0);\r\n        }\r\n        60% {\r\n            opacity: 1;\r\n            -webkit-transform: translate3d(-50%, 25px, 0);\r\n            transform: translate3d(-50%, 25px, 0);\r\n        }\r\n        75% {\r\n            -webkit-transform: translate3d(-50%, -60%, 0);\r\n            transform: translate3d(-50%, -60%, 0);\r\n        }\r\n        90% {\r\n            -webkit-transform: translate3d(-50%, -45%, 0);\r\n            transform: translate3d(-50%, -45%, 0);\r\n        }\r\n        to {\r\n            -webkit-transform: translate3d(-50%, -50%, 0);\r\n            transform: translate3d(-50%, -50%, 0);\r\n        }\r\n    }\r\n    \r\n    .my_bounceInDown {\r\n        -webkit-animation: my_bounceInDown  1s linear 0s;\r\n                animation: my_bounceInDown  1s linear 0s;\r\n    }", ""]);

// exports


/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "@charset \"utf-8\";\r\n\r\n/* 禁用iPhone中Safari的字号自动调整 */\r\nhtml {\r\n\t-webkit-text-size-adjust: 100%;\r\n\t-ms-text-size-adjust: 100%;\r\n\t/* 解决IOS默认滑动很卡的情况 */\r\n\t-webkit-overflow-scrolling : touch; \r\n}\r\n\r\n/* 禁止缩放表单 */\r\ninput[type=\"submit\"], input[type=\"reset\"], input[type=\"button\"], input {\r\n\tresize: none;\r\n\tborder: none;\r\n}\r\n\r\n/* 取消链接高亮  */\r\nbody, div, ul, li, ol, h1, h2, h3, h4, h5, h6, input, textarea, select, p, dl, dt, dd, a, img, button, form, table, th, tr, td, tbody, article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {\r\n\t-webkit-tap-highlight-color: rgba(0, 0, 0, 0);\r\n}\r\n\r\n/* 设置HTML5元素为块 */\r\narticle, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {\r\n\tdisplay: block;\r\n}\r\n\r\n/* 图片自适应 */\r\nimg {\r\n\twidth: 100%;\r\n\theight: auto;\r\n\twidth: auto\\9; /* ie8 */\r\n\tdisplay: block;\r\n\t-ms-interpolation-mode: bicubic;/*为了照顾ie图片缩放失真*/\r\n}\r\n\r\n/* 初始化 */\r\nbody, div, ul, li, ol, h1, h2, h3, h4, h5, h6, input, textarea, select, p, dl, dt, dd, a, img, button, form, table, th, tr, td, tbody, article, aside, details, figcaption, figure, footer, header, hgroup, menu, nav, section {\r\n\tmargin: 0;\r\n\tpadding: 0;\r\n}\r\nbody {\r\n\tfont: 14px/1.5 'Microsoft YaHei','\\5B8B\\4F53', Tahoma, Arial, sans-serif;\r\n\tcolor: #555;\r\n\tbackground-color: #F7F7F7;\r\n}\r\nem, i {\r\n\tfont-style: normal;\r\n}\r\nul,li{\r\n\tlist-style-type: none;\r\n}\r\nstrong {\r\n\tfont-weight: normal;\r\n}\r\n.clearfix:after {\r\n\tcontent: \"\";\r\n\tdisplay: block;\r\n\tvisibility: hidden;\r\n\theight: 0;\r\n\tclear: both;\r\n}\r\n.clearfix {\r\n\tzoom: 1;\r\n}\r\na {\r\n\ttext-decoration: none;\r\n\tcolor: #969696;\r\n\tfont-family: 'Microsoft YaHei', Tahoma, Arial, sans-serif;\r\n}\r\na:hover {\r\n\ttext-decoration: none;\r\n}\r\nul, ol {\r\n\tlist-style: none;\r\n}\r\nh1, h2, h3, h4, h5, h6 {\r\n\tfont-size: 100%;\r\n\tfont-family: 'Microsoft YaHei';\r\n}\r\n/*控制字体不加粗*/\r\n.fw {\r\n\tfont-weight: 700;\r\n}\r\n\r\n/*单独控制字体大小*/\r\n.fz16{\r\n\tfont-size: 16px;\r\n\t/*line-height: 1.5em;*/\r\n}\r\n.fz18{\r\n\tfont-size: 18px;\r\n\t/*line-height: 1.5em;*/\r\n}\r\n.fz20{\r\n\tfont-size: 20px;\r\n\t/*line-height: 1.5em;*/\r\n}\r\n\r\n\r\nimg {\r\n\tborder: none;\r\n}\r\ninput{\r\n\tfont-family: 'Microsoft YaHei';\r\n}\r\n.w50{\r\n\twidth: 50%;\r\n}\r\n.w25{\r\n\twidth: 25%;\r\n}\r\n.w20{\r\n\twidth: 20%;\r\n}\r\n.w33{\r\n\twidth: 33.333333%;\r\n}\r\n.fl{\r\n\tfloat: left;\r\n}\r\n.fr{\r\n\tfloat: right;\r\n}\r\n.db{\r\n\tdisplay: block !important;\r\n}\r\n.dn{\r\n\tdisplay: none;\r\n}\r\n/*单行溢出*/\r\n.one_txt_cut{\r\n\toverflow: hidden;\r\n\twhite-space: nowrap;\r\n\ttext-overflow: ellipsis;\r\n}\r\n/*多行溢出 手机端使用*/\r\n.txt_cut{\r\n\toverflow : hidden;\r\n    text-overflow: ellipsis;\r\n    display: -webkit-box;\r\n    /* -webkit-line-clamp: 2; */\r\n    -webkit-box-orient: vertical;\r\n}\r\n\r\n\r\n/* 控制精灵图缩放 */\r\n/*.jd_icon::before{\r\n\tcontent: \"\";\r\n\tbackground: url(../images/icons/jd-sprites.png) no-repeat 0 0;\r\n\tbackground-size: 200px 200px;\r\n}*/\r\n\r\n\r\n/* 垂直水平居中 */\r\n.my_center,.my_centerB::before,.my_centerA::after{\r\n\tposition: absolute;\r\n\tleft: 50%;\r\n\ttop: 50%;\r\n\t-webkit-transform: translate(-50%,-50%);\r\n\ttransform: translate(-50%,-50%);\r\n}\r\n\r\n\r\n/* 垂直居中 */\r\n.my_center_y,.my_centerB_y::before,.my_centerA_y::after{\r\n\tposition: absolute;\r\n\ttop: 50%;\r\n\t-webkit-transform: translateY(-50%);\r\n\ttransform: translateY(-50%);\r\n}\r\n\r\n/* 水平居中 */\r\n.my_center_x,.my_centerB_x::before,.my_centerA_x::after{\r\n\tposition: absolute;\r\n\tleft: 50%;\r\n\t-webkit-transform: translateX(-50%);\r\n\ttransform: translateX(-50%);\r\n}\r\n\r\n\r\n\r\n\r\n\r\n/* 顶部边框 */\r\n.top_line{\r\n\tposition: relative;\r\n}\r\n\r\n.top_line::before{\r\n\tcontent: \"\";\r\n\twidth: 100%;\r\n\theight: 0px;\r\n\tborder-top: 1px solid #ccc;\r\n\tposition: absolute;\r\n\ttop: 0;\r\n\tleft: 0;\r\n\tz-index: 99998;\r\n}\r\n\r\n\r\n/* 右边框类 */\r\n.right_line{\r\n\tposition: relative;\r\n\r\n}\r\n\r\n.right_line::before{\r\n\tcontent: \"\";\r\n\twidth: 0px;\r\n\theight: 100%;\r\n\tborder-right: 1px solid #ccc;\r\n\tposition: absolute;\r\n\tright: 0px;\r\n\ttop: 0px;\r\n\tz-index: 99998;\r\n}\r\n\r\n/* 内容居中 */\r\n.text_center{\r\n\ttext-align: center;\r\n}\r\n/* 设置最大最小宽度 */\r\nhtml,body{\r\n\tmin-width: 320px;\r\n\tmax-width: 640px;\r\n\tmargin: 0 auto;\r\n}\r\n\r\n\r\n.transitionAll{\r\n\t-webkit-transition: all .3s;\r\n\ttransition: all .3s;\r\n}\r\n\r\n.mt_46{\r\n\tmargin-top: 46px;\r\n}", ""]);

// exports


/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n@font-face {font-family: \"iconfont\";\n  src: url(" + __webpack_require__(5) + "); /* IE9*/\n  src: url(" + __webpack_require__(5) + "#iefix) format('embedded-opentype'), \n  url(" + __webpack_require__(40) + ") format('woff'), \n  url(" + __webpack_require__(39) + ") format('truetype'), \n  url(" + __webpack_require__(38) + "#iconfont) format('svg'); /* iOS 4.1- */\n}\n\n.iconfont {\n  font-family:\"iconfont\" !important;\n  font-size:16px;\n  font-style:normal;\n  -webkit-font-smoothing: antialiased;\n  -moz-osx-font-smoothing: grayscale;\n}\n\n.icon-caidan:before { content: \"\\3435\"; }\n\n.icon-jia:before { content: \"\\3460\"; }\n\n.icon-dingwei:before { content: \"\\E603\"; }\n\n.icon-jian:before { content: \"\\E663\"; }\n\n.icon-zhengque:before { content: \"\\E613\"; }\n\n.icon-fanhui:before { content: \"\\E63D\"; }\n\n.icon-konggouwuche:before { content: \"\\E620\"; }\n\n.icon-wode:before { content: \"\\E605\"; }\n\n.icon-dingdan:before { content: \"\\E604\"; }\n\n.icon-tubiao11:before { content: \"\\E615\"; }\n\n.icon-shouye-shouye:before { content: \"\\E606\"; }\n\n.icon-cuowu:before { content: \"\\E68C\"; }\n\n", ""]);

// exports


/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "/*联系方式*/\n.info_list {\n  width: 100%;\n  background-color: #fff;\n  margin-top: 15px;\n  /*标题*/\n  /*配送信息地址*/\n  /*当时用户路由时的样式*/\n}\n.info_list h3 {\n  text-indent: 10px;\n  height: 40px;\n  line-height: 40px;\n  font-size: 16px;\n  font-weight: 700;\n  width: 100%;\n  color: #35B3E4;\n  border-bottom: 1px solid #ddd;\n}\n.info_list .list_wrap {\n  width: 100%;\n}\n.info_list form {\n  width: 100%;\n  padding: 10px 0;\n}\n.info_list .user_info {\n  font-weight: 700;\n  width: 100%;\n  height: 40px;\n  padding: 8px 0;\n  line-height: 40px;\n  /*label分组*/\n  /*输入框信息*/\n}\n.info_list .user_info label {\n  display: inline-block;\n  padding-left: 10px;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  width: 20%;\n}\n.info_list .user_info input {\n  height: 100%;\n  border: 1px solid #ddd;\n  text-indent: 10px;\n  -webkit-border-radius: 5px;\n  border-radius: 5px;\n  width: 70%;\n}\n.info_list .tapUser input {\n  width: 50%;\n}\n.info_list .tapUser .btn_dw {\n  display: inline-block;\n  color: #35B3E4;\n  font-weight: 400;\n  padding: 0 10px 0 20px;\n  border: 1px solid #35B3E4;\n  border-radius: 5px;\n  height: 30px;\n  line-height: 30px;\n  position: relative;\n}\n.info_list .tapUser .btn_dw span:nth-child(1) {\n  position: absolute;\n  top: -2px;\n  left: 4px;\n}\n.info_list .tapUser .btn_dw:active {\n  color: #fff;\n  background-color: #35B3E4;\n}\n/*保存按钮样式*/\n.save_user {\n  background-color: #fff;\n  height: 50px;\n  line-height: 50px;\n  border-top: 1px solid #ddd;\n  text-align: right;\n  padding-right: 25px;\n  margin-top: 15px;\n  /*按钮样式*/\n}\n.save_user button {\n  display: inline-block;\n  height: 30px;\n  padding: 0 20px;\n  background-color: #fff;\n  border: 1px solid #35B3E4;\n  color: #35B3E4;\n  font-size: 16px;\n  font-weight: 100;\n  line-height: 30px;\n  -webkit-border-radius: 5px;\n  border-radius: 5px;\n  outline-style: none;\n}\n.save_user button:active {\n  background-color: #35B3E4;\n  color: #fff;\n}\n/*底部按钮*/\n.sub_wrap {\n  background-color: #fff;\n  height: 50px;\n  line-height: 50px;\n  border-top: 1px solid #ddd;\n  text-align: right;\n  padding-right: 24px;\n  margin-top: 15px;\n  /*按钮样式*/\n  /*按钮激活下的样式*/\n}\n.sub_wrap button {\n  display: inline-block;\n  height: 30px;\n  padding: 0 20px;\n  background-color: #fff;\n  border: 1px solid #35B3E4;\n  outline-style: none;\n  color: #35B3E4;\n  font-size: 16px;\n  line-height: 30px;\n  border-radius: 5px;\n}\n.sub_wrap button:nth-child(1) {\n  border: none;\n}\n.sub_wrap button:active {\n  background-color: #35B3E4;\n  color: #fff;\n}\n/*错误按钮颜色*/\n.cuowu {\n  color: #F43A41;\n}\n/*正确按钮颜色*/\n.zhengque {\n  color: #19B942;\n}\n.disabled {\n  color: #ccc !important;\n  border-color: #ccc !important;\n}\n/*模态框*/\n.modal {\n  width: 100%;\n  height: 100%;\n  position: fixed;\n  top: 0;\n  left: 0;\n  background-color: rgba(240, 240, 240, 0.5);\n}\n.modal .cnt_txt {\n  height: 40px;\n  line-height: 40px;\n  padding: 0 20px;\n  -webkit-border-radius: 10px;\n  border-radius: 10px;\n  position: absolute;\n  left: 50%;\n  bottom: 20%;\n  -webkit-transform: translate3d(-50%, -50%, 0);\n  transform: translate3d(-50%, -50%, 0);\n  background-color: #35B3E4;\n  color: #fff;\n}\n", ""]);

// exports


/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\nhtml,\nbody {\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  min-width: 320px;\n  max-width: 640px;\n  margin: 0 auto;\n}\n#wrap {\n  /*控制内容为100%滚动*/\n  padding-top: 40px;\n  padding-bottom: 45px;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  height: 100%;\n  width: 100%;\n  /*头部模块*/\n  /*返回按钮*/\n  /*切换样式按钮*/\n}\n#wrap header {\n  height: 40px;\n  width: 100%;\n  top: 0px;\n  left: 50%;\n  -webkit-transform: translateX(-50%);\n  transform: translateX(-50%);\n  z-index: 99999;\n  min-width: 320px;\n  max-width: 640px;\n  margin: 0 auto;\n  text-align: center;\n  line-height: 40px;\n  overflow: hidden;\n  position: fixed;\n  background-color: #35B3E4;\n  color: #fff;\n}\n#wrap .back,\n#wrap .change {\n  height: 40px;\n  width: 40px;\n  float: left;\n}\n#wrap .change {\n  float: right;\n}\n#wrap h1 {\n  margin: 0 40px;\n  text-align: center;\n}\n/*底部tab切换*/\n.nav_wrap {\n  width: 100%;\n  position: fixed;\n  bottom: 0;\n  left: 50%;\n  -webkit-transform: translateX(-50%);\n  transform: translateX(-50%);\n  z-index: 99999;\n  min-width: 320px;\n  max-width: 640px;\n  height: 40px;\n  padding: 2px 0;\n  border-top: 1px solid #ddd;\n  background-color: #f0f0f0;\n  /*导航条目模块*/\n}\n.nav_wrap .item {\n  float: left;\n  width: 25%;\n  height: 100%;\n}\n.nav_wrap a {\n  width: 100%;\n  display: block;\n  height: 100%;\n  text-align: center;\n  color: #666;\n  font-size: 14px;\n  line-height: 20px;\n}\n.nav_wrap span {\n  font-size: 18px;\n}\n.nav_wrap .myactive {\n  color: #35B3E4;\n}\n", ""]);

// exports


/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n.color {\n  color: red;\n}\n/*菜单样式*/\n.menu {\n  width: 100%;\n  height: 100%;\n  position: relative;\n  overflow: scroll;\n}\n/*布局方式一的样式*/\n.wrap_cont1,\n.wrap_cont2 {\n  width: 100%;\n  /*条目列表样式*/\n}\n.wrap_cont1 .item_list,\n.wrap_cont2 .item_list {\n  padding: 10px;\n  width: 100%;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  border-bottom: 1px solid #ddd;\n}\n.wrap_cont1 {\n  /*图片包裹盒子样式*/\n}\n.wrap_cont1 .wrap_img {\n  height: 80px;\n  width: 120px;\n  -webkit-border-radius: 10px;\n  border-radius: 10px;\n  overflow: hidden;\n  float: left;\n}\n/*布局方式二 的样式*/\n.wrap_cont2 {\n  /*图片包裹盒子样式*/\n}\n.wrap_cont2 .wrap_img {\n  width: 100%;\n  margin-bottom: 10px;\n}\n.wrap_cont2 .wrap_txt {\n  margin-left: 0px;\n}\n/*内容描述样式*/\n.wrap_txt {\n  margin-left: 130px;\n  position: relative;\n  /*内容描述*/\n  /*加入购物车按钮*/\n  /*点击过后的样式*/\n}\n.wrap_txt h3 {\n  line-height: 30px;\n  width: 60%;\n}\n.wrap_txt .txt_info {\n  line-height: 20px;\n}\n.wrap_txt .add_btn {\n  height: 24px;\n  line-height: 24px;\n  padding: 0 10px;\n  color: #35B3E4;\n  background-color: #fff;\n  border: 1px solid #35B3E4;\n  -webkit-border-radius: 5px;\n  border-radius: 5px;\n  position: absolute;\n  right: 0;\n  top: 2px;\n  outline-style: none;\n}\n.wrap_txt .add_btn:active {\n  color: #fff;\n  background-color: #35B3E4;\n  border: 1px solid #35B3E4;\n}\n/*loader 纯css样式*/\n.loader {\n  width: 100%;\n  height: 100%;\n  position: fixed;\n  top: 0;\n  left: 0;\n  background-color: rgba(240, 240, 240, 0.1);\n}\n.loader div {\n  background-color: #666;\n}\n.loader .loader-inner {\n  position: absolute;\n  left: 50%;\n  top: 50%;\n  transform: translate(-50%, -50%);\n}\n.btm {\n  width: 50%;\n  height: 30px;\n  line-height: 30px;\n  border: 1px solid #35B3E4;\n  text-align: center;\n  color: #35B3E4;\n  -webkit-border-radius: 10px;\n  border-radius: 10px;\n  margin: 10px auto;\n}\n", ""]);

// exports


/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "\n.user {\n  width: 100%;\n  height: 100%;\n  overflow: scroll;\n}\n", ""]);

// exports


/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "/*购物车样式*/\n.cart {\n  width: 100%;\n  height: 100%;\n  overflow: scroll;\n  background-color: #eee;\n  padding: 10px 0px;\n  /*清单列表*/\n  /*列表盒子*/\n  /*列表结果*/\n  /*记价结果*/\n}\n.cart .cart_list {\n  width: 100%;\n  background-color: #fff;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.cart .list_wrap {\n  width: 100%;\n  /*清单标题*/\n}\n.cart .list_wrap h3 {\n  text-indent: 10px;\n  height: 40px;\n  line-height: 40px;\n  font-size: 16px;\n  font-weight: 700;\n  width: 100%;\n  color: #35B3E4;\n  border-bottom: 1px solid #ddd;\n}\n.cart .lists {\n  padding: 10px 0;\n  width: 100%;\n}\n.cart .list {\n  width: 100%;\n  padding: 0 10px;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  /*标题*/\n  /*单价*/\n  /*添加数量*/\n}\n.cart .list div {\n  height: 40px;\n  line-height: 40px;\n  float: left;\n}\n.cart .list .title {\n  width: 40%;\n  font-weight: 700;\n}\n.cart .list .danjia {\n  width: 20%;\n  text-align: left;\n  text-indent: 15px;\n}\n.cart .list .number {\n  width: 40%;\n  padding-top: 8px;\n  padding-left: 10px;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n}\n.cart .list .number span {\n  display: block;\n  height: 24px;\n  line-height: 24px;\n  text-align: center;\n  border: 1px solid #35B3E4;\n  -webkit-box-sizing: border-box;\n  box-sizing: border-box;\n  width: 30px;\n  font-size: 16px;\n  font-weight: 700;\n  float: left;\n  color: #35B3E4;\n}\n.cart .list .number span:nth-child(1) {\n  -webkit-border-radius: 5px 0 0 5px;\n  border-radius: 5px 0 0 5px;\n  border-right: none;\n}\n.cart .list .number span:nth-child(3) {\n  -webkit-border-radius: 0 5px 5px 0;\n  border-radius: 0 5px 5px 0;\n  border-left: none;\n}\n.cart .list .number span:nth-child(1):active,\n.cart .list .number span:nth-child(3):active {\n  background-color: #35B3E4;\n  color: #fff;\n}\n.cart .list .number span:nth-child(2) {\n  background-color: #fff;\n  width: 40px;\n  color: #35B3E4;\n  font-weight: 400;\n  font-size: 16px;\n}\n.cart .result {\n  height: 40px;\n  line-height: 40px;\n  text-align: right;\n  padding-right: 30px;\n  font-weight: 700;\n  border-top: 1px solid #ccc;\n}\n", ""]);

// exports


/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(0)();
// imports


// module
exports.push([module.i, "/*订单标签*/\n.order {\n  width: 100%;\n  height: 100%;\n  overflow: scroll;\n  /*标题*/\n  /*条目*/\n}\n.order .item {\n  padding: 10px;\n  border-bottom: 1px solid #ddd;\n  background-color: #fff;\n}\n.order .title h3 {\n  line-height: 20px;\n  border-left: 2px solid #FF8B51;\n  padding-left: 5px;\n}\n.order .title i {\n  font-weight: 400;\n}\n.order .color {\n  color: #FF8B51;\n}\n.order .col_red {\n  color: red;\n  font-weight: 700;\n}\n.order .cont {\n  position: relative;\n}\n.order .cont > div {\n  line-height: 30px;\n  padding-left: 5px;\n}\n.order .cont > div span {\n  display: block;\n}\n.order .cont > div span:nth-child(1) {\n  width: 70px;\n  float: left;\n}\n.order .cont > div span:nth-child(2) {\n  margin-left: 70px;\n}\n/*没有订单提示信息*/\n.tips {\n  width: 80%;\n  height: 40px;\n  position: fixed;\n  top: 50%;\n  left: 50%;\n  -webkit-transform: translate3d(-50%, -50%, 0);\n  transform: translate3d(-50%, -50%, 0);\n  line-height: 40px;\n  margin: 40px auto;\n  background-color: #FF8B51;\n  color: #fff;\n  text-align: center;\n  border: 1px solid #FF8B51;\n  -webkit-border-radius: 10px;\n  border-radius: 10px;\n}\n/*底部按钮样式*/\n.btn_wrap {\n  position: absolute;\n  bottom: 0px;\n  right: 5px;\n}\n.btn_wrap button {\n  line-height: 1em;\n  padding: 5px 10px;\n  color: #FF8B51;\n  border: 1px solid #FF8B51;\n  -webkit-border-radius: 5px;\n  border-radius: 5px;\n  background-color: #fff;\n  outline-style: none;\n}\n.btn_wrap button:active {\n  color: #fff;\n  background-color: #FF8B51;\n}\n", ""]);

// exports


/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pgo8IURPQ1RZUEUgc3ZnIFBVQkxJQyAiLS8vVzNDLy9EVEQgU1ZHIDEuMS8vRU4iICJodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQiID4KPHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgo8bWV0YWRhdGE+CkNyZWF0ZWQgYnkgRm9udEZvcmdlIDIwMTIwNzMxIGF0IFNhdCBGZWIgMTggMjA6NDg6MTAgMjAxNwogQnkgYWRtaW4KPC9tZXRhZGF0YT4KPGRlZnM+Cjxmb250IGlkPSJpY29uZm9udCIgaG9yaXotYWR2LXg9IjEwMjQiID4KICA8Zm9udC1mYWNlIAogICAgZm9udC1mYW1pbHk9Imljb25mb250IgogICAgZm9udC13ZWlnaHQ9IjUwMCIKICAgIGZvbnQtc3RyZXRjaD0ibm9ybWFsIgogICAgdW5pdHMtcGVyLWVtPSIxMDI0IgogICAgcGFub3NlLTE9IjIgMCA2IDMgMCAwIDAgMCAwIDAiCiAgICBhc2NlbnQ9Ijg5NiIKICAgIGRlc2NlbnQ9Ii0xMjgiCiAgICB4LWhlaWdodD0iNzkyIgogICAgYmJveD0iMCAtMjAwIDExMTQgODk2LjAxNCIKICAgIHVuZGVybGluZS10aGlja25lc3M9IjAiCiAgICB1bmRlcmxpbmUtcG9zaXRpb249IjAiCiAgICB1bmljb2RlLXJhbmdlPSJVKzAwNzgtRTY4QyIKICAvPgo8bWlzc2luZy1nbHlwaCAKIC8+CiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0iLm5vdGRlZiIgCiAvPgogICAgPGdseXBoIGdseXBoLW5hbWU9Ii5ub3RkZWYiIAogLz4KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSIubnVsbCIgaG9yaXotYWR2LXg9IjAiIAogLz4KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJub25tYXJraW5ncmV0dXJuIiBob3Jpei1hZHYteD0iMzQxIiAKIC8+CiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0ieCIgdW5pY29kZT0ieCIgaG9yaXotYWR2LXg9IjEwMDEiIApkPSJNMjgxIDU0M3EtMjcgLTEgLTUzIC0xaC04M3EtMTggMCAtMzYuNSAtNnQtMzIuNSAtMTguNXQtMjMgLTMydC05IC00NS41di03Nmg5MTJ2NDFxMCAxNiAtMC41IDMwdC0wLjUgMThxMCAxMyAtNSAyOXQtMTcgMjkuNXQtMzEuNSAyMi41dC00OS41IDloLTEzM3YtOTdoLTQzOHY5N3pNOTU1IDMxMHYtNTJxMCAtMjMgMC41IC01MnQwLjUgLTU4dC0xMC41IC00Ny41dC0yNiAtMzB0LTMzIC0xNnQtMzEuNSAtNC41cS0xNCAtMSAtMjkuNSAtMC41CnQtMjkuNSAwLjVoLTMybC00NSAxMjhoLTQzOWwtNDQgLTEyOGgtMjloLTM0cS0yMCAwIC00NSAxcS0yNSAwIC00MSA5LjV0LTI1LjUgMjN0LTEzLjUgMjkuNXQtNCAzMHYxNjdoOTExek0xNjMgMjQ3cS0xMiAwIC0yMSAtOC41dC05IC0yMS41dDkgLTIxLjV0MjEgLTguNXExMyAwIDIyIDguNXQ5IDIxLjV0LTkgMjEuNXQtMjIgOC41ek0zMTYgMTIzcS04IC0yNiAtMTQgLTQ4cS01IC0xOSAtMTAuNSAtMzd0LTcuNSAtMjV0LTMgLTE1dDEgLTE0LjUKdDkuNSAtMTAuNXQyMS41IC00aDM3aDY3aDgxaDgwaDY0aDM2cTIzIDAgMzQgMTJ0MiAzOHEtNSAxMyAtOS41IDMwLjV0LTkuNSAzNC41cS01IDE5IC0xMSAzOWgtMzY4ek0zMzYgNDk4djIyOHEwIDExIDIuNSAyM3QxMCAyMS41dDIwLjUgMTUuNXQzNCA2aDE4OHEzMSAwIDUxLjUgLTE0LjV0MjAuNSAtNTIuNXYtMjI3aC0zMjd6IiAvPgogICAgPGdseXBoIGdseXBoLW5hbWU9ImNhaWRhbiIgdW5pY29kZT0iJiN4MzQzNTsiIGhvcml6LWFkdi14PSIxMDAwIiAKZD0iTTAgODAwaDEwMDB2LTEwMDBoLTEwMDB2MTAwMHYwek03NzggNTc4aC01NTZxLTIzIDAgLTM5IC0xNi41dC0xNiAtMzkuNXQxNiAtMzl0MzkgLTE2aDU1NnEyMyAwIDM5IDE2dDE2IDM5dC0xNiAzOS41dC0zOSAxNi41djB6TTc3OCAzNTZoLTU1NnEtMjMgMCAtMzkgLTE2LjV0LTE2IC0zOS41dDE2IC0zOS41dDM5IC0xNi41aDU1NnEyMyAwIDM5IDE2LjV0MTYgMzkuNXQtMTYgMzkuNXQtMzkgMTYuNXYwek03NzggMTMzaC01NTYKcS0yMyAwIC0zOSAtMTZ0LTE2IC0zOXQxNiAtMzkuNXQzOSAtMTYuNWg1NTZxMjMgMCAzOSAxNi41dDE2IDM5LjV0LTE2IDM5dC0zOSAxNnYwek03NzggMTMzeiIgLz4KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJqaWEiIHVuaWNvZGU9IiYjeDM0NjA7IiBob3Jpei1hZHYteD0iMTAwMCIgCmQ9Ik04MjEgMzQ1aC0yNzh2Mjc4cTAgMTggLTEyLjUgMzAuNXQtMzAuNSAxMi41dC0zMC41IC0xMi41dC0xMi41IC0zMC41di0yNzhoLTI3OHEtMTggMCAtMzAuNSAtMTIuNXQtMTIuNSAtMzAuNXQxMi41IC0zMXQzMC41IC0xM2gyNzh2LTI3N3EwIC0xOCAxMi41IC0zMXQzMC41IC0xM3QzMC41IDEzdDEyLjUgMzF2Mjc3aDI3OHExOCAwIDMwLjUgMTN0MTIuNSAzMXQtMTIuNSAzMC41dC0zMC41IDEyLjV6IiAvPgogICAgPGdseXBoIGdseXBoLW5hbWU9ImRpbmd3ZWkiIHVuaWNvZGU9IiYjeGU2MDM7IiAKZD0iTTc4OCA0NzJxMCAxMTQgLTgxIDE5NC41dC0xOTUgODAuNXQtMTk0LjUgLTgwLjV0LTgwLjUgLTE5NC41cTAgLTc0IDM3IC0xMzh2MGwyMzggLTQ4MmwyMzkgNDgyaC0xcTM4IDY0IDM4IDEzOHpNNTEyIDM5MHEtNDggMCAtODEuNSAzNHQtMzMuNSA4MnQzMy41IDgxLjV0ODEuNSAzMy41dDgyIC0zMy41dDM0IC04MS41dC0zNCAtODJ0LTgyIC0zNHoiIC8+CiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0iamlhbiIgdW5pY29kZT0iJiN4ZTY2MzsiIApkPSJNOTUgMzM2aDgzM3YtNzJoLTgzM3Y3MnoiIC8+CiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0iemhlbmdxdWUiIHVuaWNvZGU9IiYjeGU2MTM7IiAKZD0iTTUxMiA2ODNxLTEwNCAwIC0xOTIuNSAtNTF0LTEzOS41IC0xMzkuNXQtNTEgLTE5Mi41dDUxIC0xOTIuNXQxMzkuNSAtMTM5LjV0MTkyLjUgLTUxdDE5Mi41IDUxdDEzOS41IDEzOS41dDUxIDE5Mi41dC01MSAxOTIuNXQtMTM5LjUgMTM5LjV0LTE5Mi41IDUxek03NTMgNDI2bC0yODYgLTI4NnEtNyAtNyAtMTcgLTd0LTE3IDdsLTE2MSAxNjFxLTcgNyAtNyAxN3Q3IDE3dDE2LjUgN3QxNi41IC03bDE0NSAtMTQ0bDI2OSAyNjlxNyA3IDE3IDcKdDE3IC03dDcgLTE3dC03IC0xN3oiIC8+CiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0iZmFuaHVpIiB1bmljb2RlPSImI3hlNjNkOyIgCmQ9Ik04MDEgMzk1cTQyIC0yNSA4Mi41IC04NHQ1OS41IC0xMzFxMjIgLTg0IDIyIC0xOTBxLTM0IDU1IC00OCA3NXEtMTEgMTUgLTI4IDM0dC01NS41IDQ5LjV0LTgwLjUgNDkuNXEtNDAgMTkgLTEwMC41IDI3LjV0LTEwMS41IDcuNWgtNDF2LTE3NWwtNDE5IDI5N2w0MTkgMjk3di0xNzZxMTAxIC04IDE1NCAtMTlxMzkgLTggNzMuNSAtMjMuNXQ0OC41IC0yNy41eiIgLz4KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJrb25nZ291d3VjaGUiIHVuaWNvZGU9IiYjeGU2MjA7IiAKZD0iTTgxMSAzcS0zOSAwIC02Ni41IC0yOHQtMjcuNSAtNjYuNXQyNy41IC02Ni41dDY2LjUgLTI4dDY2LjUgMjh0MjcuNSA2N3QtMjcuNSA2Ni41dC02Ni41IDI3LjV6TTM4OCAzcS0zOSAwIC02Ni41IC0yOHQtMjcuNSAtNjYuNXQyNy41IC02Ni41dDY2LjUgLTI4dDY2LjUgMjh0MjcuNSA2N3QtMjcuNSA2Ni41dC02Ni41IDI3LjV6TTEwMTQgNjM3cS0xNiAyNCAtNDggMjhoLTNoLTc0N3EtNyAzMiAtOSA0M3EtNiAyMyAtMTYgMzh0LTIxIDIxCnQtMTguNSA4dC0xNC41IDJoLTExNHEtMTAgMCAtMTYuNSAtNi41dC02LjUgLTE2dDYuNSAtMTZ0MTYuNSAtNi41aDExNHExNiAwIDI2IC0zNXEyIC0xMCAxMSAtNTl2MHEyNCAtMTI3IDg5IC00OTJsNiAtMzJxMyAtMTkgMTkuNSAtMzMuNXQ1Mi41IC0xNC41aDU4MHExMCAwIDE2LjUgNi41dDYuNSAxNnQtNi41IDE2dC0xNS41IDYuNWgtNTgxcS0yNSAwIC0yNyAxMWwtNiAzMXEtMSA2IC0xNyA5Nmg1NjRxNDAgMCA2My41IDIydDI5LjUgNDYKcTAgMSAxNSA1NXQzMi41IDExOS41dDI0LjUgODcuNXExMCAzNCAtNiA1OHoiIC8+CiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0id29kZSIgdW5pY29kZT0iJiN4ZTYwNTsiIGhvcml6LWFkdi14PSIxMTE1IiAKZD0iTTY2OSAtMTE4cS04NyAwIC0xNjMuNSA3dC0xMjYuNSAxNy41dC04Ni41IDIzdC01Mi41IDIzdC0xNiAxOC41cTAgMTI2IDY0LjUgMjM0dDE3MS41IDE2NnE1IDMgOCA1cTEwMiAtNzIgMjA0IC03MnQyMDMgNzFxOSAtNCAyMiAtMTJxOTkgLTYxIDE1OCAtMTY2LjV0NTkgLTIyNS41cTAgLTggLTE2IC0xOC41dC01MiAtMjN0LTg2IC0yM3QtMTI2LjUgLTE3LjV0LTE2NC41IC03djB6TTE3MiAtMTI4ek02NzYgODk2CnEtMTE4IDAgLTIwMS41IC04NHQtODMuNSAtMjAyLjV0ODMuNSAtMjAydDIwMS41IC04My41dDIwMiA4My41dDg0IDIwMnQtODQgMjAyLjV0LTIwMiA4NHpNNDg3IDUyM3EtNiAtNyAtMTUuNSAtN3QtMTYgNi41dC02LjUgMTZ0NyAxNi41cTYgNiAxNS41IDZ0MTUuNSAtNnE3IC03IDcgLTE2dC03IC0xNnpNNjYzIDgwMXEtNzQgMCAtMTI1LjUgLTUydC01MS41IC0xMjVxMCAtOSAtNi41IC0xNS41dC0xNS41IC02LjV0LTE1LjUgNi41CnQtNi41IDE1LjVxMCA5MiA2NC41IDE1N3QxNTYuNSA2NXE5IDAgMTUuNSAtNi41dDYuNSAtMTZ0LTYuNSAtMTZ0LTE1LjUgLTYuNXoiIC8+CiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0iZGluZ2RhbiIgdW5pY29kZT0iJiN4ZTYwNDsiIApkPSJNNjI3IDUxMXEtMTcgMCAtMzQgMTd0LTE3IDM0djI3MmgtMzcwcS0zOCAwIC02NSAtMjd0LTI3IC02NXYtNzIxcTAgLTM2IDI1LjUgLTYxLjV0NjEuNSAtMjUuNWg2MTBxMzYgMCA2MS41IDI1LjV0MjUuNSA2MS41djQ5MGgtMjcxek03MDMgMTYxcTAgLTE0IC05LjUgLTIzdC0yMi41IC05aC0zMThxLTEzIDAgLTIyLjUgOXQtOS41IDIzdjRxMCAxMyA5LjUgMjIuNXQyMi41IDkuNWgzMThxMTMgMCAyMi41IC05LjV0OS41IC0yMi41di00egpNNzAzIDI4OXEwIC0xMyAtOS41IC0yMi41dC0yMi41IC05LjVoLTMxOHEtMTMgMCAtMjIuNSA5LjV0LTkuNSAyMi41djRxMCAxMyA5LjUgMjIuNXQyMi41IDkuNWgzMThxMTMgMCAyMi41IC05LjV0OS41IC0yMi41di00ek03MDMgNDE2cTAgLTEzIC05LjUgLTIyLjV0LTIyLjUgLTkuNWgtMzE4cS0xMyAwIC0yMi41IDkuNXQtOS41IDIyLjV2NHEwIDEzIDkuNSAyMi41dDIyLjUgOS41aDMxOHExMyAwIDIyLjUgLTkuNXQ5LjUgLTIyLjV2LTR6Ck02NDQgODE3di0yMzhoMjM3cS0yMzEgMjMwIC0yMzcgMjM4eiIgLz4KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJ0dWJpYW8xMSIgdW5pY29kZT0iJiN4ZTYxNTsiIApkPSJNMjQwIDg5NWgxNjRxNjYgMCA2NiAtNjZ2LTM0MHEtMSAtMzEgLTE3LjUgLTQ3dC00Ni41IC0xNnEtMTUxIC0xIC0zNDAgMHEtNjYgMSAtNjUgNjdxMCAxODkgLTEgMzM0cTAgNjkgNzAgNjhoMTcwdjB6TTc5NiA4OTZoMTU4cTcwIDEgNzAgLTY4cS0xIC0xNTYgMCAtMzM0cTAgLTY4IC03MSAtNjhoLTMyOHEtNzIgLTEgLTcxIDc0djMyMnEwIDM3IDE3IDU1LjV0NTUgMTcuNWgxNzB2MXpNMjMwIDM0MWgxNjRxNzYgMiA3NiAtNzB2LTMyOQpxMCAtMzUgLTE2LjUgLTUyLjV0LTUyLjUgLTE2LjVxLTE1MyAxIC0zMzUgMHEtNjUgLTEgLTY1IDY1djE2OHYxNjdxMCA2OSA3MSA2OHE1IC0xIDc5IC0wLjV0NzkgMC41ek0xMDIzIDEwNXYtNTMuNXYtNjN2LTUzLjVxMCAtNjIgLTYyIC02MmgtMzQwcS02NiAtMSAtNjYgNjVxLTEgMTMwIC0xIDMzNHEwIDY5IDcwIDY5aDMzNHE2NiAwIDY1IC02NnYtMTcweiIgLz4KICAgIDxnbHlwaCBnbHlwaC1uYW1lPSJzaG91eWUtc2hvdXllIiB1bmljb2RlPSImI3hlNjA2OyIgCmQ9Ik05MzcgNDM0cS0xIDIxIC0xNCA0MGwtMzE5IDM0MnEtMzMgMzQgLTgwIDM0djFoLTAuNWgtMWgtMWgtMC41di0xcS00OCAwIC04MSAtMzRxLTMxNiAtMzM5IC0zMTggLTM0MnEtMTQgLTE5IC0xNCAtNDB2LTZxMCAtMzUgMjQuNSAtNTkuNXQ1OS41IC0yNC41aDIwdi0zMDBxMCAtMzcgMjguNSAtNjN0NjkgLTI2dDY5LjUgMjZ0MjkgNjN2MzAwaDIyOXYtMzAwcTAgLTM3IDI4LjUgLTYzdDY5LjUgLTI2dDY5LjUgMjZ0MjguNSA2M3YzMDBoMjAKcTM1IDAgNTkuNSAyNC41dDI0LjUgNTkuNXYwLjV2MC41djV6TTgxMiA3MzZ2MGw2MyAtNjdxNyAtNyAxNi41IC03dDE2LjUgNmgxbDEgMXE0IDUgNSAxMXEwIDEgMSAzdjNsNyAxMjRxMSAxMyAtOCAyM3YwdjBoLTF2MHEtOSAxMCAtMjIgMTBoLTEyNHEtMiAtMSAtMyAtMWgtM3EtNyAtMSAtMTEgLTVsLTEgLTF2MHEtNyAtNyAtNy41IC0xNi41dDYuNSAtMTYuNXoiIC8+CiAgICA8Z2x5cGggZ2x5cGgtbmFtZT0iY3Vvd3UiIHVuaWNvZGU9IiYjeGU2OGM7IiAKZD0iTTg4OCA1NDJxLTMxIDczIC04NyAxMjkuNXQtMTI5IDg3LjVxLTc2IDMyIC0xNTkgMzJxLTgyIDAgLTE1OCAtMzJxLTczIC0zMSAtMTI5IC04Ny41dC04NyAtMTI5LjVxLTMyIC03NSAtMzIgLTE1OHEwIC04MiAzMiAtMTU4cTMxIC03MyA4NyAtMTI5LjV0MTI5IC04Ny41cTc1IC0zMSAxNTggLTMxdDE1OSAzMXE3MyAzMSAxMjkgODcuNXQ4NyAxMjkuNXEzMiA3NSAzMiAxNTh0LTMyIDE1OHpNNjgzIDI1MXE5IC05IDkgLTIxdC04LjUgLTIwLjUKdC0yMC41IC04LjV0LTIxIDhsLTEzMiAxMzNsLTEzMyAtMTMzcS04IC04IC0yMCAtOHQtMjAuNSA4LjV0LTguNSAyMC41dDggMjBsMTMzIDEzM2wtMTMzIDEzMnEtOCA5IC04IDIxdDggMjAuNXQyMC41IDguNXQyMC41IC05bDEzMyAtMTMybDEzMiAxMzJxOCA5IDIwLjUgOXQyMSAtOC41dDguNSAtMjAuNXQtOSAtMjFsLTEzMiAtMTMyeiIgLz4KICA8L2ZvbnQ+CjwvZGVmcz48L3N2Zz4K"

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = "data:application/x-font-ttf;base64,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"

/***/ }),
/* 40 */
/***/ (function(module, exports) {

module.exports = "data:application/font-woff;base64,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"

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "info_list"
  }, [_c('div', {
    staticClass: "list_wrap"
  }, [_c('h3', [_vm._v(_vm._s(_vm.title))]), _vm._v(" "), _c('form', {
    on: {
      "submit": function($event) {
        $event.preventDefault();
        _vm.isUser ? _vm.submitSave() : _vm.submit()
      }
    }
  }, [_c('div', {
    staticClass: "user_info"
  }, [_c('label', [_vm._v("姓名")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.name),
      expression: "name"
    }],
    ref: "name",
    attrs: {
      "type": "text",
      "placeholder": "请输入名字"
    },
    domProps: {
      "value": _vm._s(_vm.name)
    },
    on: {
      "keyup": _vm.nameValidate,
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.name = $event.target.value
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "iconfont fz18",
    class: _vm.isNameOk ? 'icon-zhengque zhengque' : 'icon-cuowu cuowu'
  })]), _vm._v(" "), _c('div', {
    staticClass: "user_info"
  }, [_c('label', [_vm._v("电话")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.phone),
      expression: "phone"
    }],
    ref: "phone",
    attrs: {
      "type": "tel",
      "name": "phone",
      "placeholder": "请输入联系电话"
    },
    domProps: {
      "value": _vm._s(_vm.phone)
    },
    on: {
      "keyup": _vm.phoneValidate,
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.phone = $event.target.value
      }
    }
  }), _vm._v(" "), _c('span', {
    staticClass: "iconfont fz18",
    class: _vm.isPhoneOk ? 'icon-zhengque zhengque' : 'icon-cuowu cuowu'
  })]), _vm._v(" "), _c('div', {
    staticClass: "user_info",
    class: {
      tapUser: _vm.isUser,
    }
  }, [_c('label', [_vm._v("地址")]), _vm._v(" "), _c('input', {
    directives: [{
      name: "model",
      rawName: "v-model",
      value: (_vm.address),
      expression: "address"
    }],
    ref: "address",
    attrs: {
      "type": "text",
      "name": "address",
      "placeholder": "请输入地址"
    },
    domProps: {
      "value": _vm._s(_vm.address)
    },
    on: {
      "keyup": _vm.addressValidate,
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.address = $event.target.value
      }
    }
  }), _vm._v(" "), (!_vm.isUser) ? _c('span', {
    staticClass: "iconfont fz18",
    class: _vm.isAddressOk ? 'icon-zhengque zhengque' : 'icon-cuowu cuowu'
  }) : _vm._e(), _vm._v(" "), (_vm.isUser) ? _c('div', {
    staticClass: "btn_dw"
  }, [_c('span', {
    staticClass: "iconfont icon-dingwei dfz20"
  }), _vm._v(" "), _c('span', [_vm._v("定位")])]) : _vm._e()]), _vm._v(" "), (_vm.isUser) ? _c('div', {
    staticClass: "save_user"
  }, [_c('button', {
    class: {
      disabled: _vm.validate
    },
    attrs: {
      "disabled": _vm.validate,
      "type": "submit"
    }
  }, [_vm._v("保存用户信息")])]) : _vm._e(), _vm._v(" "), (!_vm.isUser) ? _c('div', {
    staticClass: "sub_wrap"
  }, [_c('input', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (false),
      expression: "false"
    }, {
      name: "model",
      rawName: "v-model",
      value: (_vm.time),
      expression: "time"
    }],
    attrs: {
      "type": "text",
      "name": "time"
    },
    domProps: {
      "value": _vm._s(_vm.time)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.time = $event.target.value
      }
    }
  }), _vm._v(" "), _c('input', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (false),
      expression: "false"
    }, {
      name: "model",
      rawName: "v-model",
      value: (_vm.content),
      expression: "content"
    }],
    attrs: {
      "type": "text",
      "name": "content"
    },
    domProps: {
      "value": _vm._s(_vm.content)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.content = $event.target.value
      }
    }
  }), _vm._v(" "), _c('input', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (false),
      expression: "false"
    }, {
      name: "model",
      rawName: "v-model",
      value: (_vm.peiSXinxi),
      expression: "peiSXinxi"
    }],
    attrs: {
      "type": "text",
      "name": "peiSXinxi"
    },
    domProps: {
      "value": _vm._s(_vm.peiSXinxi)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.peiSXinxi = $event.target.value
      }
    }
  }), _vm._v(" "), _c('input', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (false),
      expression: "false"
    }, {
      name: "model",
      rawName: "v-model",
      value: (_vm.price),
      expression: "price"
    }],
    attrs: {
      "type": "text",
      "name": "price"
    },
    domProps: {
      "value": _vm._s(_vm.price)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.price = $event.target.value
      }
    }
  }), _vm._v(" "), _c('input', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (false),
      expression: "false"
    }, {
      name: "model",
      rawName: "v-model",
      value: (_vm.status),
      expression: "status"
    }],
    attrs: {
      "type": "text",
      "name": "status"
    },
    domProps: {
      "value": _vm._s(_vm.status)
    },
    on: {
      "input": function($event) {
        if ($event.target.composing) { return; }
        _vm.status = $event.target.value
      }
    }
  }), _vm._v(" "), _c('button', {
    attrs: {
      "type": "button"
    },
    on: {
      "click": function($event) {
        _vm.clearCart()
      }
    }
  }, [_vm._v("清空购物车")]), _vm._v(" "), _c('button', {
    class: {
      disabled: _vm.validate || !_vm.isBtnActiev
    },
    attrs: {
      "disabled": _vm.validate || !_vm.isBtnActiev,
      "type": "submit"
    }
  }, [_vm._v("下  单")])]) : _vm._e()])]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isModal),
      expression: "isModal"
    }],
    staticClass: "modal"
  }, [_c('div', {
    staticClass: "cnt_txt",
    class: {
      'my_bounceInDown': _vm.isModal
    }
  }, [_vm._v("\n            " + _vm._s(_vm.isUser ? '信息保存成功...' : '订单提交成功...') + "\n        ")])])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-0aaacb77", module.exports)
  }
}

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    attrs: {
      "id": "wrap"
    }
  }, [_c('header', {
    staticClass: "clearfix"
  }, [_c('div', {
    staticClass: "back",
    on: {
      "click": function($event) {
        _vm.back()
      }
    }
  }, [_c('span', {
    staticClass: "iconfont icon-fanhui"
  })]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isMenuShow),
      expression: "isMenuShow"
    }],
    staticClass: "change",
    on: {
      "click": function($event) {
        _vm.change()
      }
    }
  }, [_c('span', {
    staticClass: "iconfont",
    class: _vm.ischange ? 'icon-caidan' : 'icon-tubiao11'
  })]), _vm._v(" "), _c('h1', {
    staticClass: "fw fz16"
  }, [_vm._v("vue-点餐外卖")])]), _vm._v(" "), _c('router-view', {
    attrs: {
      "ischange": _vm.ischange
    },
    on: {
      "count": _vm.cartShowNum
    }
  }), _vm._v(" "), _c('nav', [_c('ul', {
    staticClass: "nav_wrap clearfix"
  }, [_c('li', {
    staticClass: "item"
  }, [_c('router-link', {
    attrs: {
      "to": "/menu"
    }
  }, [_c('span', {
    staticClass: "iconfont icon-shouye-shouye"
  }), _c('br'), _vm._v(" 菜 单\n\t\t\t\t")])], 1), _vm._v(" "), _c('li', {
    staticClass: "item"
  }, [_c('router-link', {
    attrs: {
      "to": "/cart"
    }
  }, [_c('span', {
    staticClass: "iconfont icon-konggouwuche"
  }), _c('br'), _vm._v(" 购物车(" + _vm._s(_vm.info.sum) + ")\n\t\t\t\t\t\n\t\t\t\t")])], 1), _vm._v(" "), _c('li', {
    staticClass: "item"
  }, [_c('router-link', {
    attrs: {
      "to": "/order"
    }
  }, [_c('span', {
    staticClass: "iconfont icon-dingdan"
  }), _c('br'), _vm._v(" 订 单\n\t\t\t\t")])], 1), _vm._v(" "), _c('li', {
    staticClass: "item"
  }, [_c('router-link', {
    attrs: {
      "to": "/user"
    }
  }, [_c('span', {
    staticClass: "iconfont icon-wode"
  }), _c('br'), _vm._v(" 我 的\n\t\t\t\t")])], 1)])])], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-2d9cca06", module.exports)
  }
}

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    ref: "view",
    staticClass: "menu",
    on: {
      "touchend": function($event) {
        _vm.touchend()
      }
    }
  }, [_c('div', {
    class: _vm.ischange ? 'wrap_cont1' : 'wrap_cont2'
  }, _vm._l((_vm.list), function(ite, index) {
    return _c('div', {
      staticClass: "item_list"
    }, [_c('div', {
      staticClass: "wrap_img"
    }, [_c('img', {
      attrs: {
        "src": ite.img,
        "alt": ""
      }
    })]), _vm._v(" "), _c('div', {
      staticClass: "wrap_txt"
    }, [_c('h3', {
      staticClass: "one_txt_cut"
    }, [_vm._v(_vm._s(ite.title))]), _vm._v(" "), _c('p', {
      staticClass: "txt_info"
    }, [_vm._v(_vm._s(ite.info))]), _vm._v(" "), _c('h3', {
      staticClass: "color"
    }, [_c('span', [_vm._v("¥")]), _vm._v(" "), _c('span', [_vm._v(_vm._s(ite.price))]), _vm._v(" "), _c('span', [_vm._v("元")])]), _vm._v(" "), _c('button', {
      ref: 'btn' + index,
      refInFor: true,
      staticClass: "add_btn",
      on: {
        "click": function($event) {
          _vm.add(index)
        }
      }
    }, [_vm._v("来一份")])])])
  })), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (_vm.isloading),
      expression: "isloading"
    }],
    staticClass: "loader"
  }, [_vm._m(0)]), _vm._v(" "), _c('div', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.isloading),
      expression: "!isloading"
    }],
    staticClass: "btm"
  }, [_vm._v("\n        " + _vm._s(_vm.status ? '上拉刷新...' : '已经到底了...') + "\n    ")])])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "loader-inner ball-spin-fade-loader"
  }, [_c('div'), _vm._v(" "), _c('div'), _vm._v(" "), _c('div'), _vm._v(" "), _c('div'), _vm._v(" "), _c('div'), _vm._v(" "), _c('div'), _vm._v(" "), _c('div'), _vm._v(" "), _c('div')])
}]}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-54e279bd", module.exports)
  }
}

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "user"
  }, [_c('user-info', {
    attrs: {
      "title": _vm.title,
      "isUser": true
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-68fd3a29", module.exports)
  }
}

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "cart"
  }, [_c('div', {
    staticClass: "cart_list"
  }, [_c('div', {
    staticClass: "list_wrap"
  }, [_c('h3', [_vm._v("清单")]), _vm._v(" "), _c('ul', {
    staticClass: "lists"
  }, [_vm._l((_vm.spinfo.result), function(lis, index) {
    return (lis.list.length > 0) ? _c('li', {
      staticClass: "list clearfix"
    }, [_c('div', {
      staticClass: "title one_txt_cut"
    }, [_vm._v("\n                        " + _vm._s(lis.list[0].title) + "\n                    ")]), _vm._v(" "), _c('div', {
      staticClass: "danjia"
    }, [_c('span', [_vm._v("¥ ")]), _vm._v(" "), _c('span', [_vm._v(_vm._s(lis.list[0].price))])]), _vm._v(" "), _c('div', {
      staticClass: "number"
    }, [_c('span', {
      staticClass: "iconfont icon-jian",
      on: {
        "click": function($event) {
          _vm.sub(index)
        }
      }
    }), _vm._v(" "), _c('span', [_vm._v(_vm._s(lis.num))]), _vm._v(" "), _c('span', {
      staticClass: "iconfont icon-jia",
      on: {
        "click": function($event) {
          _vm.add(index)
        }
      }
    })])]) : _vm._e()
  }), _vm._v(" "), _c('li', {
    directives: [{
      name: "show",
      rawName: "v-show",
      value: (!_vm.spinfo.sum),
      expression: "!spinfo.sum"
    }],
    staticClass: "list"
  }, [_vm._v("\n                    空\n                ")])], 2), _vm._v(" "), _c('div', {
    staticClass: "result"
  }, [_c('span', [_vm._v("合计:  ¥")]), _vm._v(" "), _c('span', {
    staticClass: "price"
  }, [_vm._v(_vm._s(_vm.price))]), _vm._v(" "), _c('span', [_vm._v("元")])])])]), _vm._v(" "), _c('user-info', {
    attrs: {
      "isUser": false,
      "title": _vm.title,
      "clearCart": _vm.clearCart,
      "price": _vm.price,
      "content": _vm.content,
      "isBtnActiev": _vm.spinfo.sum
    }
  })], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-794316fe", module.exports)
  }
}

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: "order"
  }, [_c('div', {
    staticClass: "order_wrap"
  }, [(_vm.isList) ? _c('ul', {
    staticClass: "infos"
  }, _vm._l((_vm.list), function(lis, index) {
    return _c('li', {
      staticClass: "item"
    }, [_c('div', {
      staticClass: "title"
    }, [_c('h3', {
      staticClass: "fw"
    }, [_vm._v("\n                        订餐时间 : \n                        "), _c('i', [_vm._v(_vm._s(lis.time))])])]), _vm._v(" "), _c('div', {
      staticClass: "cont"
    }, [_c('div', {
      staticClass: "clearfix"
    }, [_c('span', {
      staticClass: "color"
    }, [_vm._v("订餐内容 :")]), _vm._v(" "), _c('span', [_c('i', [_vm._v(_vm._s(lis.content))])])]), _vm._v(" "), _c('div', {
      staticClass: "clearfix"
    }, [_c('span', {
      staticClass: "color"
    }, [_vm._v("配送信息 :")]), _vm._v(" "), _c('span', [_vm._v(_vm._s(lis.peiSXinxi))])]), _vm._v(" "), _c('div', {
      staticClass: "clearfix"
    }, [_c('span', [_vm._v("合计金额 :")]), _vm._v(" "), _c('span', {
      staticClass: "col_red"
    }, [_vm._v("¥ " + _vm._s(lis.price))])]), _vm._v(" "), _c('div', {
      staticClass: "clearfix"
    }, [_c('span', [_vm._v("支付状态 :")]), _vm._v(" "), _c('span', [_vm._v(_vm._s(lis.status))])]), _vm._v(" "), _c('div', {
      staticClass: "btn_wrap"
    }, [_c('button', {
      attrs: {
        "type": "button"
      },
      on: {
        "click": function($event) {
          _vm.deleteList(index)
        }
      }
    }, [_vm._v("删除该条")])])])])
  })) : _vm._e(), _vm._v(" "), (!_vm.isList || _vm.isDelete) ? _c('div', {
    staticClass: "tips",
    class: {
      'my_bounceInDown': !_vm.isList || _vm.isDelete
    }
  }, [_vm._v("\n           " + _vm._s(!_vm.isList ? '您还没有订单哦！！！' : '删除成功！！！') + "\n        ")]) : _vm._e()])])
},staticRenderFns: []}
module.exports.render._withStripped = true
if (false) {
  module.hot.accept()
  if (module.hot.data) {
     require("vue-hot-reload-api").rerender("data-v-e492db40", module.exports)
  }
}

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(32);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("cadb38e2", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-0aaacb77!./../../node_modules/less-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./userInfo.vue", function() {
     var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-0aaacb77!./../../node_modules/less-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./userInfo.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(33);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("cb834546", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!./../node_modules/css-loader/index.js!./../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2d9cca06!./../node_modules/less-loader/index.js!./../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./App.vue", function() {
     var newContent = require("!!./../node_modules/css-loader/index.js!./../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-2d9cca06!./../node_modules/less-loader/index.js!./../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./App.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(34);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("3348bae9", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-54e279bd!./../../node_modules/less-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./menu.vue", function() {
     var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-54e279bd!./../../node_modules/less-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./menu.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(35);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("7a707022", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-68fd3a29!./../../node_modules/less-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./user.vue", function() {
     var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-68fd3a29!./../../node_modules/less-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./user.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(36);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("d4eb70c6", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-794316fe!./../../node_modules/less-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./cart.vue", function() {
     var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-794316fe!./../../node_modules/less-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./cart.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(37);
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var update = __webpack_require__(2)("7c651268", content, false);
// Hot Module Replacement
if(false) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-e492db40!./../../node_modules/less-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./order.vue", function() {
     var newContent = require("!!./../../node_modules/css-loader/index.js!./../../node_modules/vue-loader/lib/style-rewriter.js?id=data-v-e492db40!./../../node_modules/less-loader/index.js!./../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./order.vue");
     if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),
/* 53 */
/***/ (function(module, exports) {

/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
module.exports = function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}


/***/ }),
/* 54 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 55 */
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _vue = __webpack_require__(21);

var _vue2 = _interopRequireDefault(_vue);

var _App = __webpack_require__(14);

var _App2 = _interopRequireDefault(_App);

var _vueRouter = __webpack_require__(20);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _vueResource = __webpack_require__(19);

var _vueResource2 = _interopRequireDefault(_vueResource);

__webpack_require__(8);

__webpack_require__(7);

__webpack_require__(9);

__webpack_require__(10);

__webpack_require__(11);

__webpack_require__(12);

__webpack_require__(13);

var _menu = __webpack_require__(16);

var _menu2 = _interopRequireDefault(_menu);

var _cart = __webpack_require__(15);

var _cart2 = _interopRequireDefault(_cart);

var _order = __webpack_require__(17);

var _order2 = _interopRequireDefault(_order);

var _user = __webpack_require__(18);

var _user2 = _interopRequireDefault(_user);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//vue 使用第三方插件


//引入组件

//引入animation 动画样式

//ajax请求插件
_vue2.default.use(_vueRouter2.default);
//引入iconfont

// 引入bass css样式


//引用路由插件

_vue2.default.use(_vueResource2.default);

//配置路由
var router = new _vueRouter2.default({
	linkActiveClass: "myactive",
	routes: [
	// 四个模块 菜单menu 购物车cart 订单order 我的user
	// {path: '/', redirect: '/Home'},//重定向直接跳转到Home路由
	{ path: '/', redirect: '/menu' }, { path: '/menu', component: _menu2.default }, //菜单
	{ path: '/cart', component: _cart2.default }, //购物车
	{ path: '/order', component: _order2.default }, //订单
	{ path: '/user', component: _user2.default } //我的
	]
});
new _vue2.default({
	el: '#app', //html中的根元素的ID
	// render: function(create){return create(App)}
	// 使用箭头函数
	// 渲染APP组件
	render: function render(create) {
		return create(_App2.default);
	}, //渲染组件App
	//实例路由 实现按需加载
	router: router

});

/***/ })
/******/ ]);