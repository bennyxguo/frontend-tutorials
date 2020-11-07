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
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction createElement(type, attributes) {\n  // 创建元素\n  var element;\n\n  if (typeof type === 'string') {\n    element = new ElementWrapper(type);\n  } else {\n    element = new type();\n  } // 挂上属性\n\n\n  for (var name in attributes) {\n    element.setAttribute(name, attributes[name]);\n  } // 挂上所有子元素\n\n\n  for (var _len = arguments.length, children = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    children[_key - 2] = arguments[_key];\n  }\n\n  for (var _i = 0, _children = children; _i < _children.length; _i++) {\n    var child = _children[_i];\n    if (typeof child === 'string') child = new TextWrapper(child);\n    element.appendChild(child);\n  } // 最后我们的 element 就是一个节点\n  // 所以我们可以直接返回\n\n\n  return element;\n}\n\nvar ElementWrapper = /*#__PURE__*/function () {\n  // 构造函数\n  // 创建 DOM 节点\n  function ElementWrapper(type) {\n    _classCallCheck(this, ElementWrapper);\n\n    this.root = document.createElement(type);\n  } // 挂載元素的属性\n\n\n  _createClass(ElementWrapper, [{\n    key: \"setAttribute\",\n    value: function setAttribute(name, attribute) {\n      this.root.setAttribute(name, attribute);\n    } // 挂載元素子元素\n\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      child.mountTo(this.root);\n    } // 挂載当前元素\n\n  }, {\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n    }\n  }]);\n\n  return ElementWrapper;\n}();\n\nvar TextWrapper = /*#__PURE__*/function () {\n  // 构造函数\n  // 创建 DOM 节点\n  function TextWrapper(content) {\n    _classCallCheck(this, TextWrapper);\n\n    this.root = document.createTextNode(content);\n  } // 挂載元素的属性\n\n\n  _createClass(TextWrapper, [{\n    key: \"setAttribute\",\n    value: function setAttribute(name, attribute) {\n      this.root.setAttribute(name, attribute);\n    } // 挂載元素子元素\n\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      child.mountTo(this.root);\n    } // 挂載当前元素\n\n  }, {\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n    }\n  }]);\n\n  return TextWrapper;\n}();\n\nvar Div = /*#__PURE__*/function () {\n  // 构造函数\n  // 创建 DOM 节点\n  function Div() {\n    _classCallCheck(this, Div);\n\n    this.root = document.createElement('div');\n  } // 挂載元素的属性\n\n\n  _createClass(Div, [{\n    key: \"setAttribute\",\n    value: function setAttribute(name, attribute) {\n      this.root.setAttribute(name, attribute);\n    } // 挂載元素子元素\n\n  }, {\n    key: \"appendChild\",\n    value: function appendChild(child) {\n      child.mountTo(this.root);\n    } // 挂載当前元素\n\n  }, {\n    key: \"mountTo\",\n    value: function mountTo(parent) {\n      parent.appendChild(this.root);\n    }\n  }]);\n\n  return Div;\n}();\n\nvar a = createElement(Div, {\n  id: \"a\"\n}, createElement(\"span\", null, \"a\"), createElement(\"span\", null, \"b\"), createElement(\"span\", null, \"c\")); // document.body.appendChild(a);\n\na.mountTo(document.body);\n\n//# sourceURL=webpack:///./main.js?");

/***/ })

/******/ });