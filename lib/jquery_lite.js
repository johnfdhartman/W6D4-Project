/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
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
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const DOMNodeCollection = __webpack_require__(1);

window.$l = function(selector) {
  if (selector instanceof HTMLElement) {
    return new DOMNodeCollection([selector]);
  } else {
    const nodeList = document.querySelectorAll(selector);
    const arr = Array.from(nodeList);
    return new DOMNodeCollection(arr);
  }

};


/***/ }),
/* 1 */
/***/ (function(module, exports) {

class DOMNodeCollection {
  constructor (elArr) {
    this.elArr = elArr;
  }

  html(string=null) {
    if (string===null) {
      return this.elArr[0].innerHTML;
    } else {
      for (let i = 0; i < this.elArr.length; i++) {
        this.elArr[i].innerHTML = string;
      }
    }
  }

  empty() {
    this.html('');
  }

  append(something) {
    if (something instanceof DOMNodeCollection) {
      for (let i =0; i < something.elArr.length; i++) {
        this.html(this.html() +something.elArr[i].outerHTML);
      }
    } else if (something instanceof String){
      this.html(this.html() + something);
    } else {
      this.html(this.html() + something.outerHTML);
    }
  }

  attr(attributeName, value = null) {
    if (value===null) {
      return this.showAttr(attributeName);
    } else {
      return this.changeAttr(attributeName, value);
    }
  }

  showAttr(attributeName) {
    return this.elArr[0].getAttribute(attributeName);
  }

  changeAttr(attributeName, value) {
    for (let i = 0; i < this.elArr.length; i++ ) {
      this.elArr[i].setAttribute(attributeName, value);
    }
  }

  addClass( className ){
    this.changeAttr('class',className);
  }

  removeClass( className = null) {
    if (className === null) {
      for (let i = 0; i < this.elArr.length; i++ ) {
        this.elArr[i].removeAttribute('class');
      }
    } else if (className instanceof String) {
      this.removeSingleClass(className);
    } else if (className instanceof Array) {
      for (let i = 0; i < className.length; i++) {
        this.removeSingleClass(className[i]);
      }
    }
  }

  removeSingleClass(className) {
    for (let i = 0; i< this.elArr.length; i++) {
      this.elArr[i].classList.remove(className);
    }
  }
}

module.exports = DOMNodeCollection;


/***/ })
/******/ ]);