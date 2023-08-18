/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./node_modules/@popperjs/core/lib/createPopper.js":
/*!*********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/createPopper.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPopper": () => (/* binding */ createPopper),
/* harmony export */   "detectOverflow": () => (/* reexport safe */ _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_13__["default"]),
/* harmony export */   "popperGenerator": () => (/* binding */ popperGenerator)
/* harmony export */ });
/* harmony import */ var _dom_utils_getCompositeRect_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./dom-utils/getCompositeRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom-utils/listScrollParents.js */ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./dom-utils/getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _utils_orderModifiers_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./utils/orderModifiers.js */ "./node_modules/@popperjs/core/lib/utils/orderModifiers.js");
/* harmony import */ var _utils_debounce_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./utils/debounce.js */ "./node_modules/@popperjs/core/lib/utils/debounce.js");
/* harmony import */ var _utils_validateModifiers_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./utils/validateModifiers.js */ "./node_modules/@popperjs/core/lib/utils/validateModifiers.js");
/* harmony import */ var _utils_uniqueBy_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./utils/uniqueBy.js */ "./node_modules/@popperjs/core/lib/utils/uniqueBy.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_mergeByName_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./utils/mergeByName.js */ "./node_modules/@popperjs/core/lib/utils/mergeByName.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./enums.js */ "./node_modules/@popperjs/core/lib/enums.js");














var INVALID_ELEMENT_ERROR = 'Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.';
var INFINITE_LOOP_ERROR = 'Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.';
var DEFAULT_OPTIONS = {
  placement: 'bottom',
  modifiers: [],
  strategy: 'absolute'
};

function areValidElements() {
  for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return !args.some(function (element) {
    return !(element && typeof element.getBoundingClientRect === 'function');
  });
}

function popperGenerator(generatorOptions) {
  if (generatorOptions === void 0) {
    generatorOptions = {};
  }

  var _generatorOptions = generatorOptions,
      _generatorOptions$def = _generatorOptions.defaultModifiers,
      defaultModifiers = _generatorOptions$def === void 0 ? [] : _generatorOptions$def,
      _generatorOptions$def2 = _generatorOptions.defaultOptions,
      defaultOptions = _generatorOptions$def2 === void 0 ? DEFAULT_OPTIONS : _generatorOptions$def2;
  return function createPopper(reference, popper, options) {
    if (options === void 0) {
      options = defaultOptions;
    }

    var state = {
      placement: 'bottom',
      orderedModifiers: [],
      options: Object.assign({}, DEFAULT_OPTIONS, defaultOptions),
      modifiersData: {},
      elements: {
        reference: reference,
        popper: popper
      },
      attributes: {},
      styles: {}
    };
    var effectCleanupFns = [];
    var isDestroyed = false;
    var instance = {
      state: state,
      setOptions: function setOptions(setOptionsAction) {
        var options = typeof setOptionsAction === 'function' ? setOptionsAction(state.options) : setOptionsAction;
        cleanupModifierEffects();
        state.options = Object.assign({}, defaultOptions, state.options, options);
        state.scrollParents = {
          reference: (0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isElement)(reference) ? (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__["default"])(reference) : reference.contextElement ? (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__["default"])(reference.contextElement) : [],
          popper: (0,_dom_utils_listScrollParents_js__WEBPACK_IMPORTED_MODULE_1__["default"])(popper)
        }; // Orders the modifiers based on their dependencies and `phase`
        // properties

        var orderedModifiers = (0,_utils_orderModifiers_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_utils_mergeByName_js__WEBPACK_IMPORTED_MODULE_3__["default"])([].concat(defaultModifiers, state.options.modifiers))); // Strip out disabled modifiers

        state.orderedModifiers = orderedModifiers.filter(function (m) {
          return m.enabled;
        }); // Validate the provided modifiers so that the consumer will get warned
        // if one of the modifiers is invalid for any reason

        if (true) {
          var modifiers = (0,_utils_uniqueBy_js__WEBPACK_IMPORTED_MODULE_4__["default"])([].concat(orderedModifiers, state.options.modifiers), function (_ref) {
            var name = _ref.name;
            return name;
          });
          (0,_utils_validateModifiers_js__WEBPACK_IMPORTED_MODULE_5__["default"])(modifiers);

          if ((0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__["default"])(state.options.placement) === _enums_js__WEBPACK_IMPORTED_MODULE_7__.auto) {
            var flipModifier = state.orderedModifiers.find(function (_ref2) {
              var name = _ref2.name;
              return name === 'flip';
            });

            if (!flipModifier) {
              console.error(['Popper: "auto" placements require the "flip" modifier be', 'present and enabled to work.'].join(' '));
            }
          }

          var _getComputedStyle = (0,_dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_8__["default"])(popper),
              marginTop = _getComputedStyle.marginTop,
              marginRight = _getComputedStyle.marginRight,
              marginBottom = _getComputedStyle.marginBottom,
              marginLeft = _getComputedStyle.marginLeft; // We no longer take into account `margins` on the popper, and it can
          // cause bugs with positioning, so we'll warn the consumer


          if ([marginTop, marginRight, marginBottom, marginLeft].some(function (margin) {
            return parseFloat(margin);
          })) {
            console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', 'between the popper and its reference element or boundary.', 'To replicate margin, use the `offset` modifier, as well as', 'the `padding` option in the `preventOverflow` and `flip`', 'modifiers.'].join(' '));
          }
        }

        runModifierEffects();
        return instance.update();
      },
      // Sync update – it will always be executed, even if not necessary. This
      // is useful for low frequency updates where sync behavior simplifies the
      // logic.
      // For high frequency updates (e.g. `resize` and `scroll` events), always
      // prefer the async Popper#update method
      forceUpdate: function forceUpdate() {
        if (isDestroyed) {
          return;
        }

        var _state$elements = state.elements,
            reference = _state$elements.reference,
            popper = _state$elements.popper; // Don't proceed if `reference` or `popper` are not valid elements
        // anymore

        if (!areValidElements(reference, popper)) {
          if (true) {
            console.error(INVALID_ELEMENT_ERROR);
          }

          return;
        } // Store the reference and popper rects to be read by modifiers


        state.rects = {
          reference: (0,_dom_utils_getCompositeRect_js__WEBPACK_IMPORTED_MODULE_9__["default"])(reference, (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__["default"])(popper), state.options.strategy === 'fixed'),
          popper: (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_11__["default"])(popper)
        }; // Modifiers have the ability to reset the current update cycle. The
        // most common use case for this is the `flip` modifier changing the
        // placement, which then needs to re-run all the modifiers, because the
        // logic was previously ran for the previous placement and is therefore
        // stale/incorrect

        state.reset = false;
        state.placement = state.options.placement; // On each update cycle, the `modifiersData` property for each modifier
        // is filled with the initial data specified by the modifier. This means
        // it doesn't persist and is fresh on each update.
        // To ensure persistent data, use `${name}#persistent`

        state.orderedModifiers.forEach(function (modifier) {
          return state.modifiersData[modifier.name] = Object.assign({}, modifier.data);
        });
        var __debug_loops__ = 0;

        for (var index = 0; index < state.orderedModifiers.length; index++) {
          if (true) {
            __debug_loops__ += 1;

            if (__debug_loops__ > 100) {
              console.error(INFINITE_LOOP_ERROR);
              break;
            }
          }

          if (state.reset === true) {
            state.reset = false;
            index = -1;
            continue;
          }

          var _state$orderedModifie = state.orderedModifiers[index],
              fn = _state$orderedModifie.fn,
              _state$orderedModifie2 = _state$orderedModifie.options,
              _options = _state$orderedModifie2 === void 0 ? {} : _state$orderedModifie2,
              name = _state$orderedModifie.name;

          if (typeof fn === 'function') {
            state = fn({
              state: state,
              options: _options,
              name: name,
              instance: instance
            }) || state;
          }
        }
      },
      // Async and optimistically optimized update – it will not be executed if
      // not necessary (debounced to run at most once-per-tick)
      update: (0,_utils_debounce_js__WEBPACK_IMPORTED_MODULE_12__["default"])(function () {
        return new Promise(function (resolve) {
          instance.forceUpdate();
          resolve(state);
        });
      }),
      destroy: function destroy() {
        cleanupModifierEffects();
        isDestroyed = true;
      }
    };

    if (!areValidElements(reference, popper)) {
      if (true) {
        console.error(INVALID_ELEMENT_ERROR);
      }

      return instance;
    }

    instance.setOptions(options).then(function (state) {
      if (!isDestroyed && options.onFirstUpdate) {
        options.onFirstUpdate(state);
      }
    }); // Modifiers have the ability to execute arbitrary code before the first
    // update cycle runs. They will be executed in the same order as the update
    // cycle. This is useful when a modifier adds some persistent data that
    // other modifiers need to use, but the modifier is run after the dependent
    // one.

    function runModifierEffects() {
      state.orderedModifiers.forEach(function (_ref3) {
        var name = _ref3.name,
            _ref3$options = _ref3.options,
            options = _ref3$options === void 0 ? {} : _ref3$options,
            effect = _ref3.effect;

        if (typeof effect === 'function') {
          var cleanupFn = effect({
            state: state,
            name: name,
            instance: instance,
            options: options
          });

          var noopFn = function noopFn() {};

          effectCleanupFns.push(cleanupFn || noopFn);
        }
      });
    }

    function cleanupModifierEffects() {
      effectCleanupFns.forEach(function (fn) {
        return fn();
      });
      effectCleanupFns = [];
    }

    return instance;
  };
}
var createPopper = /*#__PURE__*/popperGenerator(); // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/contains.js":
/*!***************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/contains.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ contains)
/* harmony export */ });
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

function contains(parent, child) {
  var rootNode = child.getRootNode && child.getRootNode(); // First, attempt with faster native method

  if (parent.contains(child)) {
    return true;
  } // then fallback to custom implementation with Shadow DOM support
  else if (rootNode && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isShadowRoot)(rootNode)) {
      var next = child;

      do {
        if (next && parent.isSameNode(next)) {
          return true;
        } // $FlowFixMe[prop-missing]: need a better way to handle this...


        next = next.parentNode || next.host;
      } while (next);
    } // Give up, the result is false


  return false;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js":
/*!****************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getBoundingClientRect)
/* harmony export */ });
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _isLayoutViewport_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./isLayoutViewport.js */ "./node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js");




function getBoundingClientRect(element, includeScale, isFixedStrategy) {
  if (includeScale === void 0) {
    includeScale = false;
  }

  if (isFixedStrategy === void 0) {
    isFixedStrategy = false;
  }

  var clientRect = element.getBoundingClientRect();
  var scaleX = 1;
  var scaleY = 1;

  if (includeScale && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element)) {
    scaleX = element.offsetWidth > 0 ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_1__.round)(clientRect.width) / element.offsetWidth || 1 : 1;
    scaleY = element.offsetHeight > 0 ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_1__.round)(clientRect.height) / element.offsetHeight || 1 : 1;
  }

  var _ref = (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isElement)(element) ? (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element) : window,
      visualViewport = _ref.visualViewport;

  var addVisualOffsets = !(0,_isLayoutViewport_js__WEBPACK_IMPORTED_MODULE_3__["default"])() && isFixedStrategy;
  var x = (clientRect.left + (addVisualOffsets && visualViewport ? visualViewport.offsetLeft : 0)) / scaleX;
  var y = (clientRect.top + (addVisualOffsets && visualViewport ? visualViewport.offsetTop : 0)) / scaleY;
  var width = clientRect.width / scaleX;
  var height = clientRect.height / scaleY;
  return {
    width: width,
    height: height,
    top: y,
    right: x + width,
    bottom: y + height,
    left: x,
    x: x,
    y: y
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getClippingRect)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _getViewportRect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getViewportRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js");
/* harmony import */ var _getDocumentRect_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getDocumentRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js");
/* harmony import */ var _listScrollParents_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./listScrollParents.js */ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js");
/* harmony import */ var _getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _contains_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./contains.js */ "./node_modules/@popperjs/core/lib/dom-utils/contains.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/rectToClientRect.js */ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");















function getInnerBoundingClientRect(element, strategy) {
  var rect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element, false, strategy === 'fixed');
  rect.top = rect.top + element.clientTop;
  rect.left = rect.left + element.clientLeft;
  rect.bottom = rect.top + element.clientHeight;
  rect.right = rect.left + element.clientWidth;
  rect.width = element.clientWidth;
  rect.height = element.clientHeight;
  rect.x = rect.left;
  rect.y = rect.top;
  return rect;
}

function getClientRectFromMixedType(element, clippingParent, strategy) {
  return clippingParent === _enums_js__WEBPACK_IMPORTED_MODULE_1__.viewport ? (0,_utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_getViewportRect_js__WEBPACK_IMPORTED_MODULE_3__["default"])(element, strategy)) : (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(clippingParent) ? getInnerBoundingClientRect(clippingParent, strategy) : (0,_utils_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_2__["default"])((0,_getDocumentRect_js__WEBPACK_IMPORTED_MODULE_5__["default"])((0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_6__["default"])(element)));
} // A "clipping parent" is an overflowable container with the characteristic of
// clipping (or hiding) overflowing elements with a position different from
// `initial`


function getClippingParents(element) {
  var clippingParents = (0,_listScrollParents_js__WEBPACK_IMPORTED_MODULE_7__["default"])((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_8__["default"])(element));
  var canEscapeClipping = ['absolute', 'fixed'].indexOf((0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_9__["default"])(element).position) >= 0;
  var clipperElement = canEscapeClipping && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isHTMLElement)(element) ? (0,_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_10__["default"])(element) : element;

  if (!(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(clipperElement)) {
    return [];
  } // $FlowFixMe[incompatible-return]: https://github.com/facebook/flow/issues/1414


  return clippingParents.filter(function (clippingParent) {
    return (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(clippingParent) && (0,_contains_js__WEBPACK_IMPORTED_MODULE_11__["default"])(clippingParent, clipperElement) && (0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_12__["default"])(clippingParent) !== 'body';
  });
} // Gets the maximum area that the element is visible in due to any number of
// clipping parents


function getClippingRect(element, boundary, rootBoundary, strategy) {
  var mainClippingParents = boundary === 'clippingParents' ? getClippingParents(element) : [].concat(boundary);
  var clippingParents = [].concat(mainClippingParents, [rootBoundary]);
  var firstClippingParent = clippingParents[0];
  var clippingRect = clippingParents.reduce(function (accRect, clippingParent) {
    var rect = getClientRectFromMixedType(element, clippingParent, strategy);
    accRect.top = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.max)(rect.top, accRect.top);
    accRect.right = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.min)(rect.right, accRect.right);
    accRect.bottom = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.min)(rect.bottom, accRect.bottom);
    accRect.left = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_13__.max)(rect.left, accRect.left);
    return accRect;
  }, getClientRectFromMixedType(element, firstClippingParent, strategy));
  clippingRect.width = clippingRect.right - clippingRect.left;
  clippingRect.height = clippingRect.bottom - clippingRect.top;
  clippingRect.x = clippingRect.left;
  clippingRect.y = clippingRect.top;
  return clippingRect;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getCompositeRect.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getCompositeRect)
/* harmony export */ });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getNodeScroll_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./getNodeScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");









function isElementScaled(element) {
  var rect = element.getBoundingClientRect();
  var scaleX = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(rect.width) / element.offsetWidth || 1;
  var scaleY = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(rect.height) / element.offsetHeight || 1;
  return scaleX !== 1 || scaleY !== 1;
} // Returns the composite rect of an element relative to its offsetParent.
// Composite means it takes into account transforms as well as layout.


function getCompositeRect(elementOrVirtualElement, offsetParent, isFixed) {
  if (isFixed === void 0) {
    isFixed = false;
  }

  var isOffsetParentAnElement = (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(offsetParent);
  var offsetParentIsScaled = (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(offsetParent) && isElementScaled(offsetParent);
  var documentElement = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(offsetParent);
  var rect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_3__["default"])(elementOrVirtualElement, offsetParentIsScaled, isFixed);
  var scroll = {
    scrollLeft: 0,
    scrollTop: 0
  };
  var offsets = {
    x: 0,
    y: 0
  };

  if (isOffsetParentAnElement || !isOffsetParentAnElement && !isFixed) {
    if ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_4__["default"])(offsetParent) !== 'body' || // https://github.com/popperjs/popper-core/issues/1078
    (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_5__["default"])(documentElement)) {
      scroll = (0,_getNodeScroll_js__WEBPACK_IMPORTED_MODULE_6__["default"])(offsetParent);
    }

    if ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(offsetParent)) {
      offsets = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_3__["default"])(offsetParent, true);
      offsets.x += offsetParent.clientLeft;
      offsets.y += offsetParent.clientTop;
    } else if (documentElement) {
      offsets.x = (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_7__["default"])(documentElement);
    }
  }

  return {
    x: rect.left + scroll.scrollLeft - offsets.x,
    y: rect.top + scroll.scrollTop - offsets.y,
    width: rect.width,
    height: rect.height
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getComputedStyle)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");

function getComputedStyle(element) {
  return (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element).getComputedStyle(element);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js":
/*!*************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getDocumentElement)
/* harmony export */ });
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

function getDocumentElement(element) {
  // $FlowFixMe[incompatible-return]: assume body is always available
  return (((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isElement)(element) ? element.ownerDocument : // $FlowFixMe[prop-missing]
  element.document) || window.document).documentElement;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getDocumentRect.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getDocumentRect)
/* harmony export */ });
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");




 // Gets the entire size of the scrollable document area, even extending outside
// of the `<html>` and `<body>` rect bounds if horizontally scrollable

function getDocumentRect(element) {
  var _element$ownerDocumen;

  var html = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
  var winScroll = (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element);
  var body = (_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body;
  var width = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.max)(html.scrollWidth, html.clientWidth, body ? body.scrollWidth : 0, body ? body.clientWidth : 0);
  var height = (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.max)(html.scrollHeight, html.clientHeight, body ? body.scrollHeight : 0, body ? body.clientHeight : 0);
  var x = -winScroll.scrollLeft + (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__["default"])(element);
  var y = -winScroll.scrollTop;

  if ((0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_4__["default"])(body || html).direction === 'rtl') {
    x += (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_2__.max)(html.clientWidth, body ? body.clientWidth : 0) - width;
  }

  return {
    width: width,
    height: height,
    x: x,
    y: y
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getHTMLElementScroll)
/* harmony export */ });
function getHTMLElementScroll(element) {
  return {
    scrollLeft: element.scrollLeft,
    scrollTop: element.scrollTop
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getLayoutRect)
/* harmony export */ });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
 // Returns the layout rect of an element relative to its offsetParent. Layout
// means it doesn't take into account transforms.

function getLayoutRect(element) {
  var clientRect = (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element); // Use the clientRect sizes if it's not been transformed.
  // Fixes https://github.com/popperjs/popper-core/issues/1223

  var width = element.offsetWidth;
  var height = element.offsetHeight;

  if (Math.abs(clientRect.width - width) <= 1) {
    width = clientRect.width;
  }

  if (Math.abs(clientRect.height - height) <= 1) {
    height = clientRect.height;
  }

  return {
    x: element.offsetLeft,
    y: element.offsetTop,
    width: width,
    height: height
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js":
/*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getNodeName)
/* harmony export */ });
function getNodeName(element) {
  return element ? (element.nodeName || '').toLowerCase() : null;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getNodeScroll.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getNodeScroll)
/* harmony export */ });
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _getHTMLElementScroll_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getHTMLElementScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getHTMLElementScroll.js");




function getNodeScroll(node) {
  if (node === (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node) || !(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(node)) {
    return (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__["default"])(node);
  } else {
    return (0,_getHTMLElementScroll_js__WEBPACK_IMPORTED_MODULE_3__["default"])(node);
  }
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getOffsetParent)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _isTableElement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./isTableElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _utils_userAgent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/userAgent.js */ "./node_modules/@popperjs/core/lib/utils/userAgent.js");








function getTrueOffsetParent(element) {
  if (!(0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) || // https://github.com/popperjs/popper-core/issues/837
  (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element).position === 'fixed') {
    return null;
  }

  return element.offsetParent;
} // `.offsetParent` reports `null` for fixed elements, while absolute elements
// return the containing block


function getContainingBlock(element) {
  var isFirefox = /firefox/i.test((0,_utils_userAgent_js__WEBPACK_IMPORTED_MODULE_2__["default"])());
  var isIE = /Trident/i.test((0,_utils_userAgent_js__WEBPACK_IMPORTED_MODULE_2__["default"])());

  if (isIE && (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element)) {
    // In IE 9, 10 and 11 fixed elements containing block is always established by the viewport
    var elementCss = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element);

    if (elementCss.position === 'fixed') {
      return null;
    }
  }

  var currentNode = (0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_3__["default"])(element);

  if ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isShadowRoot)(currentNode)) {
    currentNode = currentNode.host;
  }

  while ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(currentNode) && ['html', 'body'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_4__["default"])(currentNode)) < 0) {
    var css = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(currentNode); // This is non-exhaustive but covers the most common CSS properties that
    // create a containing block.
    // https://developer.mozilla.org/en-US/docs/Web/CSS/Containing_block#identifying_the_containing_block

    if (css.transform !== 'none' || css.perspective !== 'none' || css.contain === 'paint' || ['transform', 'perspective'].indexOf(css.willChange) !== -1 || isFirefox && css.willChange === 'filter' || isFirefox && css.filter && css.filter !== 'none') {
      return currentNode;
    } else {
      currentNode = currentNode.parentNode;
    }
  }

  return null;
} // Gets the closest ancestor positioned element. Handles some edge cases,
// such as table ancestors and cross browser bugs.


function getOffsetParent(element) {
  var window = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_5__["default"])(element);
  var offsetParent = getTrueOffsetParent(element);

  while (offsetParent && (0,_isTableElement_js__WEBPACK_IMPORTED_MODULE_6__["default"])(offsetParent) && (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(offsetParent).position === 'static') {
    offsetParent = getTrueOffsetParent(offsetParent);
  }

  if (offsetParent && ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_4__["default"])(offsetParent) === 'html' || (0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_4__["default"])(offsetParent) === 'body' && (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_1__["default"])(offsetParent).position === 'static')) {
    return window;
  }

  return offsetParent || getContainingBlock(element) || window;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getParentNode)
/* harmony export */ });
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");



function getParentNode(element) {
  if ((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element) === 'html') {
    return element;
  }

  return (// this is a quicker (but less type safe) way to save quite some bytes from the bundle
    // $FlowFixMe[incompatible-return]
    // $FlowFixMe[prop-missing]
    element.assignedSlot || // step into the shadow DOM of the parent of a slotted node
    element.parentNode || ( // DOM Element detected
    (0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isShadowRoot)(element) ? element.host : null) || // ShadowRoot detected
    // $FlowFixMe[incompatible-call]: HTMLElement is a Node
    (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element) // fallback

  );
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getScrollParent)
/* harmony export */ });
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _instanceOf_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");




function getScrollParent(node) {
  if (['html', 'body', '#document'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node)) >= 0) {
    // $FlowFixMe[incompatible-return]: assume body is always available
    return node.ownerDocument.body;
  }

  if ((0,_instanceOf_js__WEBPACK_IMPORTED_MODULE_1__.isHTMLElement)(node) && (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__["default"])(node)) {
    return node;
  }

  return getScrollParent((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_3__["default"])(node));
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getViewportRect.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getViewportRect)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getWindowScrollBarX.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js");
/* harmony import */ var _isLayoutViewport_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isLayoutViewport.js */ "./node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js");




function getViewportRect(element, strategy) {
  var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
  var html = (0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element);
  var visualViewport = win.visualViewport;
  var width = html.clientWidth;
  var height = html.clientHeight;
  var x = 0;
  var y = 0;

  if (visualViewport) {
    width = visualViewport.width;
    height = visualViewport.height;
    var layoutViewport = (0,_isLayoutViewport_js__WEBPACK_IMPORTED_MODULE_2__["default"])();

    if (layoutViewport || !layoutViewport && strategy === 'fixed') {
      x = visualViewport.offsetLeft;
      y = visualViewport.offsetTop;
    }
  }

  return {
    width: width,
    height: height,
    x: x + (0,_getWindowScrollBarX_js__WEBPACK_IMPORTED_MODULE_3__["default"])(element),
    y: y
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js":
/*!****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindow.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getWindow)
/* harmony export */ });
function getWindow(node) {
  if (node == null) {
    return window;
  }

  if (node.toString() !== '[object Window]') {
    var ownerDocument = node.ownerDocument;
    return ownerDocument ? ownerDocument.defaultView || window : window;
  }

  return node;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getWindowScroll)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");

function getWindowScroll(node) {
  var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node);
  var scrollLeft = win.pageXOffset;
  var scrollTop = win.pageYOffset;
  return {
    scrollLeft: scrollLeft,
    scrollTop: scrollTop
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js":
/*!**************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/getWindowScrollBarX.js ***!
  \**************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getWindowScrollBarX)
/* harmony export */ });
/* harmony import */ var _getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./getWindowScroll.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindowScroll.js");



function getWindowScrollBarX(element) {
  // If <html> has a CSS width greater than the viewport, then this will be
  // incorrect for RTL.
  // Popper 1 is broken in this case and never had a bug report so let's assume
  // it's not an issue. I don't think anyone ever specifies width on <html>
  // anyway.
  // Browsers where the left scrollbar doesn't cause an issue report `0` for
  // this (e.g. Edge 2019, IE11, Safari)
  return (0,_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_0__["default"])((0,_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element)).left + (0,_getWindowScroll_js__WEBPACK_IMPORTED_MODULE_2__["default"])(element).scrollLeft;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "isElement": () => (/* binding */ isElement),
/* harmony export */   "isHTMLElement": () => (/* binding */ isHTMLElement),
/* harmony export */   "isShadowRoot": () => (/* binding */ isShadowRoot)
/* harmony export */ });
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");


function isElement(node) {
  var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node).Element;
  return node instanceof OwnElement || node instanceof Element;
}

function isHTMLElement(node) {
  var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node).HTMLElement;
  return node instanceof OwnElement || node instanceof HTMLElement;
}

function isShadowRoot(node) {
  // IE 11 has no ShadowRoot
  if (typeof ShadowRoot === 'undefined') {
    return false;
  }

  var OwnElement = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(node).ShadowRoot;
  return node instanceof OwnElement || node instanceof ShadowRoot;
}



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/isLayoutViewport.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isLayoutViewport)
/* harmony export */ });
/* harmony import */ var _utils_userAgent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/userAgent.js */ "./node_modules/@popperjs/core/lib/utils/userAgent.js");

function isLayoutViewport() {
  return !/^((?!chrome|android).)*safari/i.test((0,_utils_userAgent_js__WEBPACK_IMPORTED_MODULE_0__["default"])());
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isScrollParent)
/* harmony export */ });
/* harmony import */ var _getComputedStyle_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");

function isScrollParent(element) {
  // Firefox wants us to check `-x` and `-y` variations as well
  var _getComputedStyle = (0,_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element),
      overflow = _getComputedStyle.overflow,
      overflowX = _getComputedStyle.overflowX,
      overflowY = _getComputedStyle.overflowY;

  return /auto|scroll|overlay|hidden/.test(overflow + overflowY + overflowX);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/isTableElement.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isTableElement)
/* harmony export */ });
/* harmony import */ var _getNodeName_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");

function isTableElement(element) {
  return ['table', 'td', 'th'].indexOf((0,_getNodeName_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element)) >= 0;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js":
/*!************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/dom-utils/listScrollParents.js ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ listScrollParents)
/* harmony export */ });
/* harmony import */ var _getScrollParent_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getScrollParent.js");
/* harmony import */ var _getParentNode_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getParentNode.js */ "./node_modules/@popperjs/core/lib/dom-utils/getParentNode.js");
/* harmony import */ var _getWindow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./isScrollParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/isScrollParent.js");




/*
given a DOM element, return the list of all scroll parents, up the list of ancesors
until we get to the top window object. This list is what we attach scroll listeners
to, because if any of these parent elements scroll, we'll need to re-calculate the
reference element's position.
*/

function listScrollParents(element, list) {
  var _element$ownerDocumen;

  if (list === void 0) {
    list = [];
  }

  var scrollParent = (0,_getScrollParent_js__WEBPACK_IMPORTED_MODULE_0__["default"])(element);
  var isBody = scrollParent === ((_element$ownerDocumen = element.ownerDocument) == null ? void 0 : _element$ownerDocumen.body);
  var win = (0,_getWindow_js__WEBPACK_IMPORTED_MODULE_1__["default"])(scrollParent);
  var target = isBody ? [win].concat(win.visualViewport || [], (0,_isScrollParent_js__WEBPACK_IMPORTED_MODULE_2__["default"])(scrollParent) ? scrollParent : []) : scrollParent;
  var updatedList = list.concat(target);
  return isBody ? updatedList : // $FlowFixMe[incompatible-call]: isBody tells us target will be an HTMLElement here
  updatedList.concat(listScrollParents((0,_getParentNode_js__WEBPACK_IMPORTED_MODULE_3__["default"])(target)));
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/enums.js":
/*!**************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/enums.js ***!
  \**************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "afterMain": () => (/* binding */ afterMain),
/* harmony export */   "afterRead": () => (/* binding */ afterRead),
/* harmony export */   "afterWrite": () => (/* binding */ afterWrite),
/* harmony export */   "auto": () => (/* binding */ auto),
/* harmony export */   "basePlacements": () => (/* binding */ basePlacements),
/* harmony export */   "beforeMain": () => (/* binding */ beforeMain),
/* harmony export */   "beforeRead": () => (/* binding */ beforeRead),
/* harmony export */   "beforeWrite": () => (/* binding */ beforeWrite),
/* harmony export */   "bottom": () => (/* binding */ bottom),
/* harmony export */   "clippingParents": () => (/* binding */ clippingParents),
/* harmony export */   "end": () => (/* binding */ end),
/* harmony export */   "left": () => (/* binding */ left),
/* harmony export */   "main": () => (/* binding */ main),
/* harmony export */   "modifierPhases": () => (/* binding */ modifierPhases),
/* harmony export */   "placements": () => (/* binding */ placements),
/* harmony export */   "popper": () => (/* binding */ popper),
/* harmony export */   "read": () => (/* binding */ read),
/* harmony export */   "reference": () => (/* binding */ reference),
/* harmony export */   "right": () => (/* binding */ right),
/* harmony export */   "start": () => (/* binding */ start),
/* harmony export */   "top": () => (/* binding */ top),
/* harmony export */   "variationPlacements": () => (/* binding */ variationPlacements),
/* harmony export */   "viewport": () => (/* binding */ viewport),
/* harmony export */   "write": () => (/* binding */ write)
/* harmony export */ });
var top = 'top';
var bottom = 'bottom';
var right = 'right';
var left = 'left';
var auto = 'auto';
var basePlacements = [top, bottom, right, left];
var start = 'start';
var end = 'end';
var clippingParents = 'clippingParents';
var viewport = 'viewport';
var popper = 'popper';
var reference = 'reference';
var variationPlacements = /*#__PURE__*/basePlacements.reduce(function (acc, placement) {
  return acc.concat([placement + "-" + start, placement + "-" + end]);
}, []);
var placements = /*#__PURE__*/[].concat(basePlacements, [auto]).reduce(function (acc, placement) {
  return acc.concat([placement, placement + "-" + start, placement + "-" + end]);
}, []); // modifiers that need to read the DOM

var beforeRead = 'beforeRead';
var read = 'read';
var afterRead = 'afterRead'; // pure-logic modifiers

var beforeMain = 'beforeMain';
var main = 'main';
var afterMain = 'afterMain'; // modifier with the purpose to write to the DOM (or write into a framework state)

var beforeWrite = 'beforeWrite';
var write = 'write';
var afterWrite = 'afterWrite';
var modifierPhases = [beforeRead, read, afterRead, beforeMain, main, afterMain, beforeWrite, write, afterWrite];

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js":
/*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/applyStyles.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom-utils/getNodeName.js */ "./node_modules/@popperjs/core/lib/dom-utils/getNodeName.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");

 // This modifier takes the styles prepared by the `computeStyles` modifier
// and applies them to the HTMLElements such as popper and arrow

function applyStyles(_ref) {
  var state = _ref.state;
  Object.keys(state.elements).forEach(function (name) {
    var style = state.styles[name] || {};
    var attributes = state.attributes[name] || {};
    var element = state.elements[name]; // arrow is optional + virtual elements

    if (!(0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) || !(0,_dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element)) {
      return;
    } // Flow doesn't support to extend this property, but it's the most
    // effective way to apply styles to an HTMLElement
    // $FlowFixMe[cannot-write]


    Object.assign(element.style, style);
    Object.keys(attributes).forEach(function (name) {
      var value = attributes[name];

      if (value === false) {
        element.removeAttribute(name);
      } else {
        element.setAttribute(name, value === true ? '' : value);
      }
    });
  });
}

function effect(_ref2) {
  var state = _ref2.state;
  var initialStyles = {
    popper: {
      position: state.options.strategy,
      left: '0',
      top: '0',
      margin: '0'
    },
    arrow: {
      position: 'absolute'
    },
    reference: {}
  };
  Object.assign(state.elements.popper.style, initialStyles.popper);
  state.styles = initialStyles;

  if (state.elements.arrow) {
    Object.assign(state.elements.arrow.style, initialStyles.arrow);
  }

  return function () {
    Object.keys(state.elements).forEach(function (name) {
      var element = state.elements[name];
      var attributes = state.attributes[name] || {};
      var styleProperties = Object.keys(state.styles.hasOwnProperty(name) ? state.styles[name] : initialStyles[name]); // Set all values to an empty string to unset them

      var style = styleProperties.reduce(function (style, property) {
        style[property] = '';
        return style;
      }, {}); // arrow is optional + virtual elements

      if (!(0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_0__.isHTMLElement)(element) || !(0,_dom_utils_getNodeName_js__WEBPACK_IMPORTED_MODULE_1__["default"])(element)) {
        return;
      }

      Object.assign(element.style, style);
      Object.keys(attributes).forEach(function (attribute) {
        element.removeAttribute(attribute);
      });
    });
  };
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'applyStyles',
  enabled: true,
  phase: 'write',
  fn: applyStyles,
  effect: effect,
  requires: ['computeStyles']
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/arrow.js":
/*!************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/arrow.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_contains_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../dom-utils/contains.js */ "./node_modules/@popperjs/core/lib/dom-utils/contains.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _utils_within_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/within.js */ "./node_modules/@popperjs/core/lib/utils/within.js");
/* harmony import */ var _utils_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/mergePaddingObject.js */ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js");
/* harmony import */ var _utils_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/expandToHashMap.js */ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");









 // eslint-disable-next-line import/no-unused-modules

var toPaddingObject = function toPaddingObject(padding, state) {
  padding = typeof padding === 'function' ? padding(Object.assign({}, state.rects, {
    placement: state.placement
  })) : padding;
  return (0,_utils_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(typeof padding !== 'number' ? padding : (0,_utils_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_1__["default"])(padding, _enums_js__WEBPACK_IMPORTED_MODULE_2__.basePlacements));
};

function arrow(_ref) {
  var _state$modifiersData$;

  var state = _ref.state,
      name = _ref.name,
      options = _ref.options;
  var arrowElement = state.elements.arrow;
  var popperOffsets = state.modifiersData.popperOffsets;
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(state.placement);
  var axis = (0,_utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_4__["default"])(basePlacement);
  var isVertical = [_enums_js__WEBPACK_IMPORTED_MODULE_2__.left, _enums_js__WEBPACK_IMPORTED_MODULE_2__.right].indexOf(basePlacement) >= 0;
  var len = isVertical ? 'height' : 'width';

  if (!arrowElement || !popperOffsets) {
    return;
  }

  var paddingObject = toPaddingObject(options.padding, state);
  var arrowRect = (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_5__["default"])(arrowElement);
  var minProp = axis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_2__.top : _enums_js__WEBPACK_IMPORTED_MODULE_2__.left;
  var maxProp = axis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_2__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_2__.right;
  var endDiff = state.rects.reference[len] + state.rects.reference[axis] - popperOffsets[axis] - state.rects.popper[len];
  var startDiff = popperOffsets[axis] - state.rects.reference[axis];
  var arrowOffsetParent = (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_6__["default"])(arrowElement);
  var clientSize = arrowOffsetParent ? axis === 'y' ? arrowOffsetParent.clientHeight || 0 : arrowOffsetParent.clientWidth || 0 : 0;
  var centerToReference = endDiff / 2 - startDiff / 2; // Make sure the arrow doesn't overflow the popper if the center point is
  // outside of the popper bounds

  var min = paddingObject[minProp];
  var max = clientSize - arrowRect[len] - paddingObject[maxProp];
  var center = clientSize / 2 - arrowRect[len] / 2 + centerToReference;
  var offset = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_7__.within)(min, center, max); // Prevents breaking syntax highlighting...

  var axisProp = axis;
  state.modifiersData[name] = (_state$modifiersData$ = {}, _state$modifiersData$[axisProp] = offset, _state$modifiersData$.centerOffset = offset - center, _state$modifiersData$);
}

function effect(_ref2) {
  var state = _ref2.state,
      options = _ref2.options;
  var _options$element = options.element,
      arrowElement = _options$element === void 0 ? '[data-popper-arrow]' : _options$element;

  if (arrowElement == null) {
    return;
  } // CSS selector


  if (typeof arrowElement === 'string') {
    arrowElement = state.elements.popper.querySelector(arrowElement);

    if (!arrowElement) {
      return;
    }
  }

  if (true) {
    if (!(0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_8__.isHTMLElement)(arrowElement)) {
      console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', 'To use an SVG arrow, wrap it in an HTMLElement that will be used as', 'the arrow.'].join(' '));
    }
  }

  if (!(0,_dom_utils_contains_js__WEBPACK_IMPORTED_MODULE_9__["default"])(state.elements.popper, arrowElement)) {
    if (true) {
      console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', 'element.'].join(' '));
    }

    return;
  }

  state.elements.arrow = arrowElement;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'arrow',
  enabled: true,
  phase: 'main',
  fn: arrow,
  effect: effect,
  requires: ['popperOffsets'],
  requiresIfExists: ['preventOverflow']
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/computeStyles.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "mapToStyles": () => (/* binding */ mapToStyles)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dom-utils/getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
/* harmony import */ var _dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dom-utils/getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dom-utils/getComputedStyle.js */ "./node_modules/@popperjs/core/lib/dom-utils/getComputedStyle.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");







 // eslint-disable-next-line import/no-unused-modules

var unsetSides = {
  top: 'auto',
  right: 'auto',
  bottom: 'auto',
  left: 'auto'
}; // Round the offsets to the nearest suitable subpixel based on the DPR.
// Zooming can change the DPR, but it seems to report a value that will
// cleanly divide the values into the appropriate subpixels.

function roundOffsetsByDPR(_ref, win) {
  var x = _ref.x,
      y = _ref.y;
  var dpr = win.devicePixelRatio || 1;
  return {
    x: (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(x * dpr) / dpr || 0,
    y: (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_0__.round)(y * dpr) / dpr || 0
  };
}

function mapToStyles(_ref2) {
  var _Object$assign2;

  var popper = _ref2.popper,
      popperRect = _ref2.popperRect,
      placement = _ref2.placement,
      variation = _ref2.variation,
      offsets = _ref2.offsets,
      position = _ref2.position,
      gpuAcceleration = _ref2.gpuAcceleration,
      adaptive = _ref2.adaptive,
      roundOffsets = _ref2.roundOffsets,
      isFixed = _ref2.isFixed;
  var _offsets$x = offsets.x,
      x = _offsets$x === void 0 ? 0 : _offsets$x,
      _offsets$y = offsets.y,
      y = _offsets$y === void 0 ? 0 : _offsets$y;

  var _ref3 = typeof roundOffsets === 'function' ? roundOffsets({
    x: x,
    y: y
  }) : {
    x: x,
    y: y
  };

  x = _ref3.x;
  y = _ref3.y;
  var hasX = offsets.hasOwnProperty('x');
  var hasY = offsets.hasOwnProperty('y');
  var sideX = _enums_js__WEBPACK_IMPORTED_MODULE_1__.left;
  var sideY = _enums_js__WEBPACK_IMPORTED_MODULE_1__.top;
  var win = window;

  if (adaptive) {
    var offsetParent = (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_2__["default"])(popper);
    var heightProp = 'clientHeight';
    var widthProp = 'clientWidth';

    if (offsetParent === (0,_dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_3__["default"])(popper)) {
      offsetParent = (0,_dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_4__["default"])(popper);

      if ((0,_dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_5__["default"])(offsetParent).position !== 'static' && position === 'absolute') {
        heightProp = 'scrollHeight';
        widthProp = 'scrollWidth';
      }
    } // $FlowFixMe[incompatible-cast]: force type refinement, we compare offsetParent with window above, but Flow doesn't detect it


    offsetParent = offsetParent;

    if (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.top || (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.left || placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.right) && variation === _enums_js__WEBPACK_IMPORTED_MODULE_1__.end) {
      sideY = _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom;
      var offsetY = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.height : // $FlowFixMe[prop-missing]
      offsetParent[heightProp];
      y -= offsetY - popperRect.height;
      y *= gpuAcceleration ? 1 : -1;
    }

    if (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.left || (placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.top || placement === _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom) && variation === _enums_js__WEBPACK_IMPORTED_MODULE_1__.end) {
      sideX = _enums_js__WEBPACK_IMPORTED_MODULE_1__.right;
      var offsetX = isFixed && offsetParent === win && win.visualViewport ? win.visualViewport.width : // $FlowFixMe[prop-missing]
      offsetParent[widthProp];
      x -= offsetX - popperRect.width;
      x *= gpuAcceleration ? 1 : -1;
    }
  }

  var commonStyles = Object.assign({
    position: position
  }, adaptive && unsetSides);

  var _ref4 = roundOffsets === true ? roundOffsetsByDPR({
    x: x,
    y: y
  }, (0,_dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_3__["default"])(popper)) : {
    x: x,
    y: y
  };

  x = _ref4.x;
  y = _ref4.y;

  if (gpuAcceleration) {
    var _Object$assign;

    return Object.assign({}, commonStyles, (_Object$assign = {}, _Object$assign[sideY] = hasY ? '0' : '', _Object$assign[sideX] = hasX ? '0' : '', _Object$assign.transform = (win.devicePixelRatio || 1) <= 1 ? "translate(" + x + "px, " + y + "px)" : "translate3d(" + x + "px, " + y + "px, 0)", _Object$assign));
  }

  return Object.assign({}, commonStyles, (_Object$assign2 = {}, _Object$assign2[sideY] = hasY ? y + "px" : '', _Object$assign2[sideX] = hasX ? x + "px" : '', _Object$assign2.transform = '', _Object$assign2));
}

function computeStyles(_ref5) {
  var state = _ref5.state,
      options = _ref5.options;
  var _options$gpuAccelerat = options.gpuAcceleration,
      gpuAcceleration = _options$gpuAccelerat === void 0 ? true : _options$gpuAccelerat,
      _options$adaptive = options.adaptive,
      adaptive = _options$adaptive === void 0 ? true : _options$adaptive,
      _options$roundOffsets = options.roundOffsets,
      roundOffsets = _options$roundOffsets === void 0 ? true : _options$roundOffsets;

  if (true) {
    var transitionProperty = (0,_dom_utils_getComputedStyle_js__WEBPACK_IMPORTED_MODULE_5__["default"])(state.elements.popper).transitionProperty || '';

    if (adaptive && ['transform', 'top', 'right', 'bottom', 'left'].some(function (property) {
      return transitionProperty.indexOf(property) >= 0;
    })) {
      console.warn(['Popper: Detected CSS transitions on at least one of the following', 'CSS properties: "transform", "top", "right", "bottom", "left".', '\n\n', 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', 'for smooth transitions, or remove these properties from the CSS', 'transition declaration on the popper element if only transitioning', 'opacity or background-color for example.', '\n\n', 'We recommend using the popper element as a wrapper around an inner', 'element that can have any CSS property transitioned for animations.'].join(' '));
    }
  }

  var commonStyles = {
    placement: (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_6__["default"])(state.placement),
    variation: (0,_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_7__["default"])(state.placement),
    popper: state.elements.popper,
    popperRect: state.rects.popper,
    gpuAcceleration: gpuAcceleration,
    isFixed: state.options.strategy === 'fixed'
  };

  if (state.modifiersData.popperOffsets != null) {
    state.styles.popper = Object.assign({}, state.styles.popper, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.popperOffsets,
      position: state.options.strategy,
      adaptive: adaptive,
      roundOffsets: roundOffsets
    })));
  }

  if (state.modifiersData.arrow != null) {
    state.styles.arrow = Object.assign({}, state.styles.arrow, mapToStyles(Object.assign({}, commonStyles, {
      offsets: state.modifiersData.arrow,
      position: 'absolute',
      adaptive: false,
      roundOffsets: roundOffsets
    })));
  }

  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-placement': state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'computeStyles',
  enabled: true,
  phase: 'beforeWrite',
  fn: computeStyles,
  data: {}
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/eventListeners.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom-utils/getWindow.js */ "./node_modules/@popperjs/core/lib/dom-utils/getWindow.js");
 // eslint-disable-next-line import/no-unused-modules

var passive = {
  passive: true
};

function effect(_ref) {
  var state = _ref.state,
      instance = _ref.instance,
      options = _ref.options;
  var _options$scroll = options.scroll,
      scroll = _options$scroll === void 0 ? true : _options$scroll,
      _options$resize = options.resize,
      resize = _options$resize === void 0 ? true : _options$resize;
  var window = (0,_dom_utils_getWindow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(state.elements.popper);
  var scrollParents = [].concat(state.scrollParents.reference, state.scrollParents.popper);

  if (scroll) {
    scrollParents.forEach(function (scrollParent) {
      scrollParent.addEventListener('scroll', instance.update, passive);
    });
  }

  if (resize) {
    window.addEventListener('resize', instance.update, passive);
  }

  return function () {
    if (scroll) {
      scrollParents.forEach(function (scrollParent) {
        scrollParent.removeEventListener('scroll', instance.update, passive);
      });
    }

    if (resize) {
      window.removeEventListener('resize', instance.update, passive);
    }
  };
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'eventListeners',
  enabled: true,
  phase: 'write',
  fn: function fn() {},
  effect: effect,
  data: {}
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/flip.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/flip.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/getOppositePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getOppositeVariationPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _utils_computeAutoPlacement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/computeAutoPlacement.js */ "./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../utils/getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");






 // eslint-disable-next-line import/no-unused-modules

function getExpandedFallbackPlacements(placement) {
  if ((0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_1__.auto) {
    return [];
  }

  var oppositePlacement = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(placement);
  return [(0,_utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(placement), oppositePlacement, (0,_utils_getOppositeVariationPlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(oppositePlacement)];
}

function flip(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;

  if (state.modifiersData[name]._skip) {
    return;
  }

  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? true : _options$altAxis,
      specifiedFallbackPlacements = options.fallbackPlacements,
      padding = options.padding,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      _options$flipVariatio = options.flipVariations,
      flipVariations = _options$flipVariatio === void 0 ? true : _options$flipVariatio,
      allowedAutoPlacements = options.allowedAutoPlacements;
  var preferredPlacement = state.options.placement;
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(preferredPlacement);
  var isBasePlacement = basePlacement === preferredPlacement;
  var fallbackPlacements = specifiedFallbackPlacements || (isBasePlacement || !flipVariations ? [(0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(preferredPlacement)] : getExpandedFallbackPlacements(preferredPlacement));
  var placements = [preferredPlacement].concat(fallbackPlacements).reduce(function (acc, placement) {
    return acc.concat((0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_1__.auto ? (0,_utils_computeAutoPlacement_js__WEBPACK_IMPORTED_MODULE_4__["default"])(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding,
      flipVariations: flipVariations,
      allowedAutoPlacements: allowedAutoPlacements
    }) : placement);
  }, []);
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var checksMap = new Map();
  var makeFallbackChecks = true;
  var firstFittingPlacement = placements[0];

  for (var i = 0; i < placements.length; i++) {
    var placement = placements[i];

    var _basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement);

    var isStartVariation = (0,_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_5__["default"])(placement) === _enums_js__WEBPACK_IMPORTED_MODULE_1__.start;
    var isVertical = [_enums_js__WEBPACK_IMPORTED_MODULE_1__.top, _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom].indexOf(_basePlacement) >= 0;
    var len = isVertical ? 'width' : 'height';
    var overflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_6__["default"])(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      altBoundary: altBoundary,
      padding: padding
    });
    var mainVariationSide = isVertical ? isStartVariation ? _enums_js__WEBPACK_IMPORTED_MODULE_1__.right : _enums_js__WEBPACK_IMPORTED_MODULE_1__.left : isStartVariation ? _enums_js__WEBPACK_IMPORTED_MODULE_1__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_1__.top;

    if (referenceRect[len] > popperRect[len]) {
      mainVariationSide = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(mainVariationSide);
    }

    var altVariationSide = (0,_utils_getOppositePlacement_js__WEBPACK_IMPORTED_MODULE_2__["default"])(mainVariationSide);
    var checks = [];

    if (checkMainAxis) {
      checks.push(overflow[_basePlacement] <= 0);
    }

    if (checkAltAxis) {
      checks.push(overflow[mainVariationSide] <= 0, overflow[altVariationSide] <= 0);
    }

    if (checks.every(function (check) {
      return check;
    })) {
      firstFittingPlacement = placement;
      makeFallbackChecks = false;
      break;
    }

    checksMap.set(placement, checks);
  }

  if (makeFallbackChecks) {
    // `2` may be desired in some cases – research later
    var numberOfChecks = flipVariations ? 3 : 1;

    var _loop = function _loop(_i) {
      var fittingPlacement = placements.find(function (placement) {
        var checks = checksMap.get(placement);

        if (checks) {
          return checks.slice(0, _i).every(function (check) {
            return check;
          });
        }
      });

      if (fittingPlacement) {
        firstFittingPlacement = fittingPlacement;
        return "break";
      }
    };

    for (var _i = numberOfChecks; _i > 0; _i--) {
      var _ret = _loop(_i);

      if (_ret === "break") break;
    }
  }

  if (state.placement !== firstFittingPlacement) {
    state.modifiersData[name]._skip = true;
    state.placement = firstFittingPlacement;
    state.reset = true;
  }
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'flip',
  enabled: true,
  phase: 'main',
  fn: flip,
  requiresIfExists: ['offset'],
  data: {
    _skip: false
  }
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/hide.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/hide.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");



function getSideOffsets(overflow, rect, preventedOffsets) {
  if (preventedOffsets === void 0) {
    preventedOffsets = {
      x: 0,
      y: 0
    };
  }

  return {
    top: overflow.top - rect.height - preventedOffsets.y,
    right: overflow.right - rect.width + preventedOffsets.x,
    bottom: overflow.bottom - rect.height + preventedOffsets.y,
    left: overflow.left - rect.width - preventedOffsets.x
  };
}

function isAnySideFullyClipped(overflow) {
  return [_enums_js__WEBPACK_IMPORTED_MODULE_0__.top, _enums_js__WEBPACK_IMPORTED_MODULE_0__.right, _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom, _enums_js__WEBPACK_IMPORTED_MODULE_0__.left].some(function (side) {
    return overflow[side] >= 0;
  });
}

function hide(_ref) {
  var state = _ref.state,
      name = _ref.name;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var preventedOffsets = state.modifiersData.preventOverflow;
  var referenceOverflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__["default"])(state, {
    elementContext: 'reference'
  });
  var popperAltOverflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_1__["default"])(state, {
    altBoundary: true
  });
  var referenceClippingOffsets = getSideOffsets(referenceOverflow, referenceRect);
  var popperEscapeOffsets = getSideOffsets(popperAltOverflow, popperRect, preventedOffsets);
  var isReferenceHidden = isAnySideFullyClipped(referenceClippingOffsets);
  var hasPopperEscaped = isAnySideFullyClipped(popperEscapeOffsets);
  state.modifiersData[name] = {
    referenceClippingOffsets: referenceClippingOffsets,
    popperEscapeOffsets: popperEscapeOffsets,
    isReferenceHidden: isReferenceHidden,
    hasPopperEscaped: hasPopperEscaped
  };
  state.attributes.popper = Object.assign({}, state.attributes.popper, {
    'data-popper-reference-hidden': isReferenceHidden,
    'data-popper-escaped': hasPopperEscaped
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'hide',
  enabled: true,
  phase: 'main',
  requiresIfExists: ['preventOverflow'],
  fn: hide
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/index.js":
/*!************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/index.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "applyStyles": () => (/* reexport safe */ _applyStyles_js__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   "arrow": () => (/* reexport safe */ _arrow_js__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   "computeStyles": () => (/* reexport safe */ _computeStyles_js__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   "eventListeners": () => (/* reexport safe */ _eventListeners_js__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   "flip": () => (/* reexport safe */ _flip_js__WEBPACK_IMPORTED_MODULE_4__["default"]),
/* harmony export */   "hide": () => (/* reexport safe */ _hide_js__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   "offset": () => (/* reexport safe */ _offset_js__WEBPACK_IMPORTED_MODULE_6__["default"]),
/* harmony export */   "popperOffsets": () => (/* reexport safe */ _popperOffsets_js__WEBPACK_IMPORTED_MODULE_7__["default"]),
/* harmony export */   "preventOverflow": () => (/* reexport safe */ _preventOverflow_js__WEBPACK_IMPORTED_MODULE_8__["default"])
/* harmony export */ });
/* harmony import */ var _applyStyles_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");
/* harmony import */ var _arrow_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./arrow.js */ "./node_modules/@popperjs/core/lib/modifiers/arrow.js");
/* harmony import */ var _computeStyles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony import */ var _eventListeners_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony import */ var _flip_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./flip.js */ "./node_modules/@popperjs/core/lib/modifiers/flip.js");
/* harmony import */ var _hide_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./hide.js */ "./node_modules/@popperjs/core/lib/modifiers/hide.js");
/* harmony import */ var _offset_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./offset.js */ "./node_modules/@popperjs/core/lib/modifiers/offset.js");
/* harmony import */ var _popperOffsets_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony import */ var _preventOverflow_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./preventOverflow.js */ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js");










/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/offset.js":
/*!*************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/offset.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "distanceAndSkiddingToXY": () => (/* binding */ distanceAndSkiddingToXY)
/* harmony export */ });
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");

 // eslint-disable-next-line import/no-unused-modules

function distanceAndSkiddingToXY(placement, rects, offset) {
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement);
  var invertDistance = [_enums_js__WEBPACK_IMPORTED_MODULE_1__.left, _enums_js__WEBPACK_IMPORTED_MODULE_1__.top].indexOf(basePlacement) >= 0 ? -1 : 1;

  var _ref = typeof offset === 'function' ? offset(Object.assign({}, rects, {
    placement: placement
  })) : offset,
      skidding = _ref[0],
      distance = _ref[1];

  skidding = skidding || 0;
  distance = (distance || 0) * invertDistance;
  return [_enums_js__WEBPACK_IMPORTED_MODULE_1__.left, _enums_js__WEBPACK_IMPORTED_MODULE_1__.right].indexOf(basePlacement) >= 0 ? {
    x: distance,
    y: skidding
  } : {
    x: skidding,
    y: distance
  };
}

function offset(_ref2) {
  var state = _ref2.state,
      options = _ref2.options,
      name = _ref2.name;
  var _options$offset = options.offset,
      offset = _options$offset === void 0 ? [0, 0] : _options$offset;
  var data = _enums_js__WEBPACK_IMPORTED_MODULE_1__.placements.reduce(function (acc, placement) {
    acc[placement] = distanceAndSkiddingToXY(placement, state.rects, offset);
    return acc;
  }, {});
  var _data$state$placement = data[state.placement],
      x = _data$state$placement.x,
      y = _data$state$placement.y;

  if (state.modifiersData.popperOffsets != null) {
    state.modifiersData.popperOffsets.x += x;
    state.modifiersData.popperOffsets.y += y;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'offset',
  enabled: true,
  phase: 'main',
  requires: ['popperOffsets'],
  fn: offset
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _utils_computeOffsets_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/computeOffsets.js */ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js");


function popperOffsets(_ref) {
  var state = _ref.state,
      name = _ref.name;
  // Offsets are the actual position the popper needs to have to be
  // properly positioned near its reference element
  // This is the most basic placement, and will be adjusted by
  // the modifiers in the next step
  state.modifiersData[name] = (0,_utils_computeOffsets_js__WEBPACK_IMPORTED_MODULE_0__["default"])({
    reference: state.rects.reference,
    element: state.rects.popper,
    strategy: 'absolute',
    placement: state.placement
  });
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'popperOffsets',
  enabled: true,
  phase: 'read',
  fn: popperOffsets,
  data: {}
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js":
/*!**********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../utils/getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _utils_getAltAxis_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../utils/getAltAxis.js */ "./node_modules/@popperjs/core/lib/utils/getAltAxis.js");
/* harmony import */ var _utils_within_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../utils/within.js */ "./node_modules/@popperjs/core/lib/utils/within.js");
/* harmony import */ var _dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/getLayoutRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getLayoutRect.js");
/* harmony import */ var _dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../dom-utils/getOffsetParent.js */ "./node_modules/@popperjs/core/lib/dom-utils/getOffsetParent.js");
/* harmony import */ var _utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../utils/detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _utils_getVariation_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../utils/getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _utils_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../utils/getFreshSideObject.js */ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js");
/* harmony import */ var _utils_math_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../utils/math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");












function preventOverflow(_ref) {
  var state = _ref.state,
      options = _ref.options,
      name = _ref.name;
  var _options$mainAxis = options.mainAxis,
      checkMainAxis = _options$mainAxis === void 0 ? true : _options$mainAxis,
      _options$altAxis = options.altAxis,
      checkAltAxis = _options$altAxis === void 0 ? false : _options$altAxis,
      boundary = options.boundary,
      rootBoundary = options.rootBoundary,
      altBoundary = options.altBoundary,
      padding = options.padding,
      _options$tether = options.tether,
      tether = _options$tether === void 0 ? true : _options$tether,
      _options$tetherOffset = options.tetherOffset,
      tetherOffset = _options$tetherOffset === void 0 ? 0 : _options$tetherOffset;
  var overflow = (0,_utils_detectOverflow_js__WEBPACK_IMPORTED_MODULE_0__["default"])(state, {
    boundary: boundary,
    rootBoundary: rootBoundary,
    padding: padding,
    altBoundary: altBoundary
  });
  var basePlacement = (0,_utils_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_1__["default"])(state.placement);
  var variation = (0,_utils_getVariation_js__WEBPACK_IMPORTED_MODULE_2__["default"])(state.placement);
  var isBasePlacement = !variation;
  var mainAxis = (0,_utils_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(basePlacement);
  var altAxis = (0,_utils_getAltAxis_js__WEBPACK_IMPORTED_MODULE_4__["default"])(mainAxis);
  var popperOffsets = state.modifiersData.popperOffsets;
  var referenceRect = state.rects.reference;
  var popperRect = state.rects.popper;
  var tetherOffsetValue = typeof tetherOffset === 'function' ? tetherOffset(Object.assign({}, state.rects, {
    placement: state.placement
  })) : tetherOffset;
  var normalizedTetherOffsetValue = typeof tetherOffsetValue === 'number' ? {
    mainAxis: tetherOffsetValue,
    altAxis: tetherOffsetValue
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, tetherOffsetValue);
  var offsetModifierState = state.modifiersData.offset ? state.modifiersData.offset[state.placement] : null;
  var data = {
    x: 0,
    y: 0
  };

  if (!popperOffsets) {
    return;
  }

  if (checkMainAxis) {
    var _offsetModifierState$;

    var mainSide = mainAxis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.top : _enums_js__WEBPACK_IMPORTED_MODULE_5__.left;
    var altSide = mainAxis === 'y' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_5__.right;
    var len = mainAxis === 'y' ? 'height' : 'width';
    var offset = popperOffsets[mainAxis];
    var min = offset + overflow[mainSide];
    var max = offset - overflow[altSide];
    var additive = tether ? -popperRect[len] / 2 : 0;
    var minLen = variation === _enums_js__WEBPACK_IMPORTED_MODULE_5__.start ? referenceRect[len] : popperRect[len];
    var maxLen = variation === _enums_js__WEBPACK_IMPORTED_MODULE_5__.start ? -popperRect[len] : -referenceRect[len]; // We need to include the arrow in the calculation so the arrow doesn't go
    // outside the reference bounds

    var arrowElement = state.elements.arrow;
    var arrowRect = tether && arrowElement ? (0,_dom_utils_getLayoutRect_js__WEBPACK_IMPORTED_MODULE_6__["default"])(arrowElement) : {
      width: 0,
      height: 0
    };
    var arrowPaddingObject = state.modifiersData['arrow#persistent'] ? state.modifiersData['arrow#persistent'].padding : (0,_utils_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_7__["default"])();
    var arrowPaddingMin = arrowPaddingObject[mainSide];
    var arrowPaddingMax = arrowPaddingObject[altSide]; // If the reference length is smaller than the arrow length, we don't want
    // to include its full size in the calculation. If the reference is small
    // and near the edge of a boundary, the popper can overflow even if the
    // reference is not overflowing as well (e.g. virtual elements with no
    // width or height)

    var arrowLen = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.within)(0, referenceRect[len], arrowRect[len]);
    var minOffset = isBasePlacement ? referenceRect[len] / 2 - additive - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis : minLen - arrowLen - arrowPaddingMin - normalizedTetherOffsetValue.mainAxis;
    var maxOffset = isBasePlacement ? -referenceRect[len] / 2 + additive + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis : maxLen + arrowLen + arrowPaddingMax + normalizedTetherOffsetValue.mainAxis;
    var arrowOffsetParent = state.elements.arrow && (0,_dom_utils_getOffsetParent_js__WEBPACK_IMPORTED_MODULE_9__["default"])(state.elements.arrow);
    var clientOffset = arrowOffsetParent ? mainAxis === 'y' ? arrowOffsetParent.clientTop || 0 : arrowOffsetParent.clientLeft || 0 : 0;
    var offsetModifierValue = (_offsetModifierState$ = offsetModifierState == null ? void 0 : offsetModifierState[mainAxis]) != null ? _offsetModifierState$ : 0;
    var tetherMin = offset + minOffset - offsetModifierValue - clientOffset;
    var tetherMax = offset + maxOffset - offsetModifierValue;
    var preventedOffset = (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.within)(tether ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_10__.min)(min, tetherMin) : min, offset, tether ? (0,_utils_math_js__WEBPACK_IMPORTED_MODULE_10__.max)(max, tetherMax) : max);
    popperOffsets[mainAxis] = preventedOffset;
    data[mainAxis] = preventedOffset - offset;
  }

  if (checkAltAxis) {
    var _offsetModifierState$2;

    var _mainSide = mainAxis === 'x' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.top : _enums_js__WEBPACK_IMPORTED_MODULE_5__.left;

    var _altSide = mainAxis === 'x' ? _enums_js__WEBPACK_IMPORTED_MODULE_5__.bottom : _enums_js__WEBPACK_IMPORTED_MODULE_5__.right;

    var _offset = popperOffsets[altAxis];

    var _len = altAxis === 'y' ? 'height' : 'width';

    var _min = _offset + overflow[_mainSide];

    var _max = _offset - overflow[_altSide];

    var isOriginSide = [_enums_js__WEBPACK_IMPORTED_MODULE_5__.top, _enums_js__WEBPACK_IMPORTED_MODULE_5__.left].indexOf(basePlacement) !== -1;

    var _offsetModifierValue = (_offsetModifierState$2 = offsetModifierState == null ? void 0 : offsetModifierState[altAxis]) != null ? _offsetModifierState$2 : 0;

    var _tetherMin = isOriginSide ? _min : _offset - referenceRect[_len] - popperRect[_len] - _offsetModifierValue + normalizedTetherOffsetValue.altAxis;

    var _tetherMax = isOriginSide ? _offset + referenceRect[_len] + popperRect[_len] - _offsetModifierValue - normalizedTetherOffsetValue.altAxis : _max;

    var _preventedOffset = tether && isOriginSide ? (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.withinMaxClamp)(_tetherMin, _offset, _tetherMax) : (0,_utils_within_js__WEBPACK_IMPORTED_MODULE_8__.within)(tether ? _tetherMin : _min, _offset, tether ? _tetherMax : _max);

    popperOffsets[altAxis] = _preventedOffset;
    data[altAxis] = _preventedOffset - _offset;
  }

  state.modifiersData[name] = data;
} // eslint-disable-next-line import/no-unused-modules


/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ({
  name: 'preventOverflow',
  enabled: true,
  phase: 'main',
  fn: preventOverflow,
  requiresIfExists: ['offset']
});

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/popper-lite.js":
/*!********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/popper-lite.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPopper": () => (/* binding */ createPopper),
/* harmony export */   "defaultModifiers": () => (/* binding */ defaultModifiers),
/* harmony export */   "detectOverflow": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_5__["default"]),
/* harmony export */   "popperGenerator": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_4__.popperGenerator)
/* harmony export */ });
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/createPopper.js");
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modifiers/eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony import */ var _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony import */ var _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modifiers/computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony import */ var _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modifiers/applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");





var defaultModifiers = [_modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__["default"], _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__["default"], _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__["default"], _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__["default"]];
var createPopper = /*#__PURE__*/(0,_createPopper_js__WEBPACK_IMPORTED_MODULE_4__.popperGenerator)({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/popper.js":
/*!***************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/popper.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "applyStyles": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.applyStyles),
/* harmony export */   "arrow": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.arrow),
/* harmony export */   "computeStyles": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.computeStyles),
/* harmony export */   "createPopper": () => (/* binding */ createPopper),
/* harmony export */   "createPopperLite": () => (/* reexport safe */ _popper_lite_js__WEBPACK_IMPORTED_MODULE_11__.createPopper),
/* harmony export */   "defaultModifiers": () => (/* binding */ defaultModifiers),
/* harmony export */   "detectOverflow": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_10__["default"]),
/* harmony export */   "eventListeners": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.eventListeners),
/* harmony export */   "flip": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.flip),
/* harmony export */   "hide": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.hide),
/* harmony export */   "offset": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.offset),
/* harmony export */   "popperGenerator": () => (/* reexport safe */ _createPopper_js__WEBPACK_IMPORTED_MODULE_9__.popperGenerator),
/* harmony export */   "popperOffsets": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.popperOffsets),
/* harmony export */   "preventOverflow": () => (/* reexport safe */ _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__.preventOverflow)
/* harmony export */ });
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/createPopper.js");
/* harmony import */ var _createPopper_js__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./createPopper.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modifiers/eventListeners.js */ "./node_modules/@popperjs/core/lib/modifiers/eventListeners.js");
/* harmony import */ var _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modifiers/popperOffsets.js */ "./node_modules/@popperjs/core/lib/modifiers/popperOffsets.js");
/* harmony import */ var _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modifiers/computeStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/computeStyles.js");
/* harmony import */ var _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modifiers/applyStyles.js */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");
/* harmony import */ var _modifiers_offset_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modifiers/offset.js */ "./node_modules/@popperjs/core/lib/modifiers/offset.js");
/* harmony import */ var _modifiers_flip_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modifiers/flip.js */ "./node_modules/@popperjs/core/lib/modifiers/flip.js");
/* harmony import */ var _modifiers_preventOverflow_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modifiers/preventOverflow.js */ "./node_modules/@popperjs/core/lib/modifiers/preventOverflow.js");
/* harmony import */ var _modifiers_arrow_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./modifiers/arrow.js */ "./node_modules/@popperjs/core/lib/modifiers/arrow.js");
/* harmony import */ var _modifiers_hide_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modifiers/hide.js */ "./node_modules/@popperjs/core/lib/modifiers/hide.js");
/* harmony import */ var _popper_lite_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./popper-lite.js */ "./node_modules/@popperjs/core/lib/popper-lite.js");
/* harmony import */ var _modifiers_index_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./modifiers/index.js */ "./node_modules/@popperjs/core/lib/modifiers/index.js");










var defaultModifiers = [_modifiers_eventListeners_js__WEBPACK_IMPORTED_MODULE_0__["default"], _modifiers_popperOffsets_js__WEBPACK_IMPORTED_MODULE_1__["default"], _modifiers_computeStyles_js__WEBPACK_IMPORTED_MODULE_2__["default"], _modifiers_applyStyles_js__WEBPACK_IMPORTED_MODULE_3__["default"], _modifiers_offset_js__WEBPACK_IMPORTED_MODULE_4__["default"], _modifiers_flip_js__WEBPACK_IMPORTED_MODULE_5__["default"], _modifiers_preventOverflow_js__WEBPACK_IMPORTED_MODULE_6__["default"], _modifiers_arrow_js__WEBPACK_IMPORTED_MODULE_7__["default"], _modifiers_hide_js__WEBPACK_IMPORTED_MODULE_8__["default"]];
var createPopper = /*#__PURE__*/(0,_createPopper_js__WEBPACK_IMPORTED_MODULE_9__.popperGenerator)({
  defaultModifiers: defaultModifiers
}); // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules

 // eslint-disable-next-line import/no-unused-modules



/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/computeAutoPlacement.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ computeAutoPlacement)
/* harmony export */ });
/* harmony import */ var _getVariation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _detectOverflow_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./detectOverflow.js */ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js");
/* harmony import */ var _getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");




function computeAutoPlacement(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      placement = _options.placement,
      boundary = _options.boundary,
      rootBoundary = _options.rootBoundary,
      padding = _options.padding,
      flipVariations = _options.flipVariations,
      _options$allowedAutoP = _options.allowedAutoPlacements,
      allowedAutoPlacements = _options$allowedAutoP === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.placements : _options$allowedAutoP;
  var variation = (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_1__["default"])(placement);
  var placements = variation ? flipVariations ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.variationPlacements : _enums_js__WEBPACK_IMPORTED_MODULE_0__.variationPlacements.filter(function (placement) {
    return (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_1__["default"])(placement) === variation;
  }) : _enums_js__WEBPACK_IMPORTED_MODULE_0__.basePlacements;
  var allowedPlacements = placements.filter(function (placement) {
    return allowedAutoPlacements.indexOf(placement) >= 0;
  });

  if (allowedPlacements.length === 0) {
    allowedPlacements = placements;

    if (true) {
      console.error(['Popper: The `allowedAutoPlacements` option did not allow any', 'placements. Ensure the `placement` option matches the variation', 'of the allowed placements.', 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(' '));
    }
  } // $FlowFixMe[incompatible-type]: Flow seems to have problems with two array unions...


  var overflows = allowedPlacements.reduce(function (acc, placement) {
    acc[placement] = (0,_detectOverflow_js__WEBPACK_IMPORTED_MODULE_2__["default"])(state, {
      placement: placement,
      boundary: boundary,
      rootBoundary: rootBoundary,
      padding: padding
    })[(0,_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(placement)];
    return acc;
  }, {});
  return Object.keys(overflows).sort(function (a, b) {
    return overflows[a] - overflows[b];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/computeOffsets.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ computeOffsets)
/* harmony export */ });
/* harmony import */ var _getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getBasePlacement.js */ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js");
/* harmony import */ var _getVariation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./getVariation.js */ "./node_modules/@popperjs/core/lib/utils/getVariation.js");
/* harmony import */ var _getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./getMainAxisFromPlacement.js */ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");




function computeOffsets(_ref) {
  var reference = _ref.reference,
      element = _ref.element,
      placement = _ref.placement;
  var basePlacement = placement ? (0,_getBasePlacement_js__WEBPACK_IMPORTED_MODULE_0__["default"])(placement) : null;
  var variation = placement ? (0,_getVariation_js__WEBPACK_IMPORTED_MODULE_1__["default"])(placement) : null;
  var commonX = reference.x + reference.width / 2 - element.width / 2;
  var commonY = reference.y + reference.height / 2 - element.height / 2;
  var offsets;

  switch (basePlacement) {
    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.top:
      offsets = {
        x: commonX,
        y: reference.y - element.height
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.bottom:
      offsets = {
        x: commonX,
        y: reference.y + reference.height
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.right:
      offsets = {
        x: reference.x + reference.width,
        y: commonY
      };
      break;

    case _enums_js__WEBPACK_IMPORTED_MODULE_2__.left:
      offsets = {
        x: reference.x - element.width,
        y: commonY
      };
      break;

    default:
      offsets = {
        x: reference.x,
        y: reference.y
      };
  }

  var mainAxis = basePlacement ? (0,_getMainAxisFromPlacement_js__WEBPACK_IMPORTED_MODULE_3__["default"])(basePlacement) : null;

  if (mainAxis != null) {
    var len = mainAxis === 'y' ? 'height' : 'width';

    switch (variation) {
      case _enums_js__WEBPACK_IMPORTED_MODULE_2__.start:
        offsets[mainAxis] = offsets[mainAxis] - (reference[len] / 2 - element[len] / 2);
        break;

      case _enums_js__WEBPACK_IMPORTED_MODULE_2__.end:
        offsets[mainAxis] = offsets[mainAxis] + (reference[len] / 2 - element[len] / 2);
        break;

      default:
    }
  }

  return offsets;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/debounce.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/debounce.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ debounce)
/* harmony export */ });
function debounce(fn) {
  var pending;
  return function () {
    if (!pending) {
      pending = new Promise(function (resolve) {
        Promise.resolve().then(function () {
          pending = undefined;
          resolve(fn());
        });
      });
    }

    return pending;
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/detectOverflow.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/detectOverflow.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ detectOverflow)
/* harmony export */ });
/* harmony import */ var _dom_utils_getClippingRect_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dom-utils/getClippingRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getClippingRect.js");
/* harmony import */ var _dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../dom-utils/getDocumentElement.js */ "./node_modules/@popperjs/core/lib/dom-utils/getDocumentElement.js");
/* harmony import */ var _dom_utils_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../dom-utils/getBoundingClientRect.js */ "./node_modules/@popperjs/core/lib/dom-utils/getBoundingClientRect.js");
/* harmony import */ var _computeOffsets_js__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./computeOffsets.js */ "./node_modules/@popperjs/core/lib/utils/computeOffsets.js");
/* harmony import */ var _rectToClientRect_js__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./rectToClientRect.js */ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
/* harmony import */ var _dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../dom-utils/instanceOf.js */ "./node_modules/@popperjs/core/lib/dom-utils/instanceOf.js");
/* harmony import */ var _mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mergePaddingObject.js */ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js");
/* harmony import */ var _expandToHashMap_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./expandToHashMap.js */ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js");








 // eslint-disable-next-line import/no-unused-modules

function detectOverflow(state, options) {
  if (options === void 0) {
    options = {};
  }

  var _options = options,
      _options$placement = _options.placement,
      placement = _options$placement === void 0 ? state.placement : _options$placement,
      _options$strategy = _options.strategy,
      strategy = _options$strategy === void 0 ? state.strategy : _options$strategy,
      _options$boundary = _options.boundary,
      boundary = _options$boundary === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.clippingParents : _options$boundary,
      _options$rootBoundary = _options.rootBoundary,
      rootBoundary = _options$rootBoundary === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.viewport : _options$rootBoundary,
      _options$elementConte = _options.elementContext,
      elementContext = _options$elementConte === void 0 ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper : _options$elementConte,
      _options$altBoundary = _options.altBoundary,
      altBoundary = _options$altBoundary === void 0 ? false : _options$altBoundary,
      _options$padding = _options.padding,
      padding = _options$padding === void 0 ? 0 : _options$padding;
  var paddingObject = (0,_mergePaddingObject_js__WEBPACK_IMPORTED_MODULE_1__["default"])(typeof padding !== 'number' ? padding : (0,_expandToHashMap_js__WEBPACK_IMPORTED_MODULE_2__["default"])(padding, _enums_js__WEBPACK_IMPORTED_MODULE_0__.basePlacements));
  var altContext = elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper ? _enums_js__WEBPACK_IMPORTED_MODULE_0__.reference : _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper;
  var popperRect = state.rects.popper;
  var element = state.elements[altBoundary ? altContext : elementContext];
  var clippingClientRect = (0,_dom_utils_getClippingRect_js__WEBPACK_IMPORTED_MODULE_3__["default"])((0,_dom_utils_instanceOf_js__WEBPACK_IMPORTED_MODULE_4__.isElement)(element) ? element : element.contextElement || (0,_dom_utils_getDocumentElement_js__WEBPACK_IMPORTED_MODULE_5__["default"])(state.elements.popper), boundary, rootBoundary, strategy);
  var referenceClientRect = (0,_dom_utils_getBoundingClientRect_js__WEBPACK_IMPORTED_MODULE_6__["default"])(state.elements.reference);
  var popperOffsets = (0,_computeOffsets_js__WEBPACK_IMPORTED_MODULE_7__["default"])({
    reference: referenceClientRect,
    element: popperRect,
    strategy: 'absolute',
    placement: placement
  });
  var popperClientRect = (0,_rectToClientRect_js__WEBPACK_IMPORTED_MODULE_8__["default"])(Object.assign({}, popperRect, popperOffsets));
  var elementClientRect = elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper ? popperClientRect : referenceClientRect; // positive = overflowing the clipping rect
  // 0 or negative = within the clipping rect

  var overflowOffsets = {
    top: clippingClientRect.top - elementClientRect.top + paddingObject.top,
    bottom: elementClientRect.bottom - clippingClientRect.bottom + paddingObject.bottom,
    left: clippingClientRect.left - elementClientRect.left + paddingObject.left,
    right: elementClientRect.right - clippingClientRect.right + paddingObject.right
  };
  var offsetData = state.modifiersData.offset; // Offsets can be applied only to the popper element

  if (elementContext === _enums_js__WEBPACK_IMPORTED_MODULE_0__.popper && offsetData) {
    var offset = offsetData[placement];
    Object.keys(overflowOffsets).forEach(function (key) {
      var multiply = [_enums_js__WEBPACK_IMPORTED_MODULE_0__.right, _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom].indexOf(key) >= 0 ? 1 : -1;
      var axis = [_enums_js__WEBPACK_IMPORTED_MODULE_0__.top, _enums_js__WEBPACK_IMPORTED_MODULE_0__.bottom].indexOf(key) >= 0 ? 'y' : 'x';
      overflowOffsets[key] += offset[axis] * multiply;
    });
  }

  return overflowOffsets;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/expandToHashMap.js":
/*!******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/expandToHashMap.js ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ expandToHashMap)
/* harmony export */ });
function expandToHashMap(value, keys) {
  return keys.reduce(function (hashMap, key) {
    hashMap[key] = value;
    return hashMap;
  }, {});
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/format.js":
/*!*********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/format.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ format)
/* harmony export */ });
function format(str) {
  for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
    args[_key - 1] = arguments[_key];
  }

  return [].concat(args).reduce(function (p, c) {
    return p.replace(/%s/, c);
  }, str);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getAltAxis.js":
/*!*************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getAltAxis.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getAltAxis)
/* harmony export */ });
function getAltAxis(axis) {
  return axis === 'x' ? 'y' : 'x';
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getBasePlacement.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getBasePlacement.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getBasePlacement)
/* harmony export */ });

function getBasePlacement(placement) {
  return placement.split('-')[0];
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getFreshSideObject)
/* harmony export */ });
function getFreshSideObject() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js":
/*!***************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getMainAxisFromPlacement.js ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getMainAxisFromPlacement)
/* harmony export */ });
function getMainAxisFromPlacement(placement) {
  return ['top', 'bottom'].indexOf(placement) >= 0 ? 'x' : 'y';
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js":
/*!***********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getOppositePlacement.js ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getOppositePlacement)
/* harmony export */ });
var hash = {
  left: 'right',
  right: 'left',
  bottom: 'top',
  top: 'bottom'
};
function getOppositePlacement(placement) {
  return placement.replace(/left|right|bottom|top/g, function (matched) {
    return hash[matched];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js":
/*!********************************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getOppositeVariationPlacement.js ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getOppositeVariationPlacement)
/* harmony export */ });
var hash = {
  start: 'end',
  end: 'start'
};
function getOppositeVariationPlacement(placement) {
  return placement.replace(/start|end/g, function (matched) {
    return hash[matched];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/getVariation.js":
/*!***************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/getVariation.js ***!
  \***************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getVariation)
/* harmony export */ });
function getVariation(placement) {
  return placement.split('-')[1];
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/math.js":
/*!*******************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/math.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "max": () => (/* binding */ max),
/* harmony export */   "min": () => (/* binding */ min),
/* harmony export */   "round": () => (/* binding */ round)
/* harmony export */ });
var max = Math.max;
var min = Math.min;
var round = Math.round;

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/mergeByName.js":
/*!**************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/mergeByName.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ mergeByName)
/* harmony export */ });
function mergeByName(modifiers) {
  var merged = modifiers.reduce(function (merged, current) {
    var existing = merged[current.name];
    merged[current.name] = existing ? Object.assign({}, existing, current, {
      options: Object.assign({}, existing.options, current.options),
      data: Object.assign({}, existing.data, current.data)
    }) : current;
    return merged;
  }, {}); // IE11 does not support Object.values

  return Object.keys(merged).map(function (key) {
    return merged[key];
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js":
/*!*********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/mergePaddingObject.js ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ mergePaddingObject)
/* harmony export */ });
/* harmony import */ var _getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./getFreshSideObject.js */ "./node_modules/@popperjs/core/lib/utils/getFreshSideObject.js");

function mergePaddingObject(paddingObject) {
  return Object.assign({}, (0,_getFreshSideObject_js__WEBPACK_IMPORTED_MODULE_0__["default"])(), paddingObject);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/orderModifiers.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/orderModifiers.js ***!
  \*****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ orderModifiers)
/* harmony export */ });
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");
 // source: https://stackoverflow.com/questions/49875255

function order(modifiers) {
  var map = new Map();
  var visited = new Set();
  var result = [];
  modifiers.forEach(function (modifier) {
    map.set(modifier.name, modifier);
  }); // On visiting object, check for its dependencies and visit them recursively

  function sort(modifier) {
    visited.add(modifier.name);
    var requires = [].concat(modifier.requires || [], modifier.requiresIfExists || []);
    requires.forEach(function (dep) {
      if (!visited.has(dep)) {
        var depModifier = map.get(dep);

        if (depModifier) {
          sort(depModifier);
        }
      }
    });
    result.push(modifier);
  }

  modifiers.forEach(function (modifier) {
    if (!visited.has(modifier.name)) {
      // check for visited object
      sort(modifier);
    }
  });
  return result;
}

function orderModifiers(modifiers) {
  // order based on dependencies
  var orderedModifiers = order(modifiers); // order based on phase

  return _enums_js__WEBPACK_IMPORTED_MODULE_0__.modifierPhases.reduce(function (acc, phase) {
    return acc.concat(orderedModifiers.filter(function (modifier) {
      return modifier.phase === phase;
    }));
  }, []);
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/rectToClientRect.js":
/*!*******************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/rectToClientRect.js ***!
  \*******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ rectToClientRect)
/* harmony export */ });
function rectToClientRect(rect) {
  return Object.assign({}, rect, {
    left: rect.x,
    top: rect.y,
    right: rect.x + rect.width,
    bottom: rect.y + rect.height
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/uniqueBy.js":
/*!***********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/uniqueBy.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ uniqueBy)
/* harmony export */ });
function uniqueBy(arr, fn) {
  var identifiers = new Set();
  return arr.filter(function (item) {
    var identifier = fn(item);

    if (!identifiers.has(identifier)) {
      identifiers.add(identifier);
      return true;
    }
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/userAgent.js":
/*!************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/userAgent.js ***!
  \************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ getUAString)
/* harmony export */ });
function getUAString() {
  var uaData = navigator.userAgentData;

  if (uaData != null && uaData.brands && Array.isArray(uaData.brands)) {
    return uaData.brands.map(function (item) {
      return item.brand + "/" + item.version;
    }).join(' ');
  }

  return navigator.userAgent;
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/validateModifiers.js":
/*!********************************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/validateModifiers.js ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ validateModifiers)
/* harmony export */ });
/* harmony import */ var _format_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./format.js */ "./node_modules/@popperjs/core/lib/utils/format.js");
/* harmony import */ var _enums_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../enums.js */ "./node_modules/@popperjs/core/lib/enums.js");


var INVALID_MODIFIER_ERROR = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s';
var MISSING_DEPENDENCY_ERROR = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available';
var VALID_PROPERTIES = ['name', 'enabled', 'phase', 'fn', 'effect', 'requires', 'options'];
function validateModifiers(modifiers) {
  modifiers.forEach(function (modifier) {
    [].concat(Object.keys(modifier), VALID_PROPERTIES) // IE11-compatible replacement for `new Set(iterable)`
    .filter(function (value, index, self) {
      return self.indexOf(value) === index;
    }).forEach(function (key) {
      switch (key) {
        case 'name':
          if (typeof modifier.name !== 'string') {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, String(modifier.name), '"name"', '"string"', "\"" + String(modifier.name) + "\""));
          }

          break;

        case 'enabled':
          if (typeof modifier.enabled !== 'boolean') {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"enabled"', '"boolean"', "\"" + String(modifier.enabled) + "\""));
          }

          break;

        case 'phase':
          if (_enums_js__WEBPACK_IMPORTED_MODULE_1__.modifierPhases.indexOf(modifier.phase) < 0) {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"phase"', "either " + _enums_js__WEBPACK_IMPORTED_MODULE_1__.modifierPhases.join(', '), "\"" + String(modifier.phase) + "\""));
          }

          break;

        case 'fn':
          if (typeof modifier.fn !== 'function') {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"fn"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'effect':
          if (modifier.effect != null && typeof modifier.effect !== 'function') {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"effect"', '"function"', "\"" + String(modifier.fn) + "\""));
          }

          break;

        case 'requires':
          if (modifier.requires != null && !Array.isArray(modifier.requires)) {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"requires"', '"array"', "\"" + String(modifier.requires) + "\""));
          }

          break;

        case 'requiresIfExists':
          if (!Array.isArray(modifier.requiresIfExists)) {
            console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(INVALID_MODIFIER_ERROR, modifier.name, '"requiresIfExists"', '"array"', "\"" + String(modifier.requiresIfExists) + "\""));
          }

          break;

        case 'options':
        case 'data':
          break;

        default:
          console.error("PopperJS: an invalid property has been provided to the \"" + modifier.name + "\" modifier, valid properties are " + VALID_PROPERTIES.map(function (s) {
            return "\"" + s + "\"";
          }).join(', ') + "; but \"" + key + "\" was provided.");
      }

      modifier.requires && modifier.requires.forEach(function (requirement) {
        if (modifiers.find(function (mod) {
          return mod.name === requirement;
        }) == null) {
          console.error((0,_format_js__WEBPACK_IMPORTED_MODULE_0__["default"])(MISSING_DEPENDENCY_ERROR, String(modifier.name), requirement, requirement));
        }
      });
    });
  });
}

/***/ }),

/***/ "./node_modules/@popperjs/core/lib/utils/within.js":
/*!*********************************************************!*\
  !*** ./node_modules/@popperjs/core/lib/utils/within.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "within": () => (/* binding */ within),
/* harmony export */   "withinMaxClamp": () => (/* binding */ withinMaxClamp)
/* harmony export */ });
/* harmony import */ var _math_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./math.js */ "./node_modules/@popperjs/core/lib/utils/math.js");

function within(min, value, max) {
  return (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.max)(min, (0,_math_js__WEBPACK_IMPORTED_MODULE_0__.min)(value, max));
}
function withinMaxClamp(min, value, max) {
  var v = within(min, value, max);
  return v > max ? max : v;
}

/***/ }),

/***/ "./node_modules/animejs/lib/anime.es.js":
/*!**********************************************!*\
  !*** ./node_modules/animejs/lib/anime.es.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/*
 * anime.js v3.2.1
 * (c) 2020 Julian Garnier
 * Released under the MIT license
 * animejs.com
 */

// Defaults

var defaultInstanceSettings = {
  update: null,
  begin: null,
  loopBegin: null,
  changeBegin: null,
  change: null,
  changeComplete: null,
  loopComplete: null,
  complete: null,
  loop: 1,
  direction: 'normal',
  autoplay: true,
  timelineOffset: 0
};

var defaultTweenSettings = {
  duration: 1000,
  delay: 0,
  endDelay: 0,
  easing: 'easeOutElastic(1, .5)',
  round: 0
};

var validTransforms = ['translateX', 'translateY', 'translateZ', 'rotate', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scaleX', 'scaleY', 'scaleZ', 'skew', 'skewX', 'skewY', 'perspective', 'matrix', 'matrix3d'];

// Caching

var cache = {
  CSS: {},
  springs: {}
};

// Utils

function minMax(val, min, max) {
  return Math.min(Math.max(val, min), max);
}

function stringContains(str, text) {
  return str.indexOf(text) > -1;
}

function applyArguments(func, args) {
  return func.apply(null, args);
}

var is = {
  arr: function (a) { return Array.isArray(a); },
  obj: function (a) { return stringContains(Object.prototype.toString.call(a), 'Object'); },
  pth: function (a) { return is.obj(a) && a.hasOwnProperty('totalLength'); },
  svg: function (a) { return a instanceof SVGElement; },
  inp: function (a) { return a instanceof HTMLInputElement; },
  dom: function (a) { return a.nodeType || is.svg(a); },
  str: function (a) { return typeof a === 'string'; },
  fnc: function (a) { return typeof a === 'function'; },
  und: function (a) { return typeof a === 'undefined'; },
  nil: function (a) { return is.und(a) || a === null; },
  hex: function (a) { return /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(a); },
  rgb: function (a) { return /^rgb/.test(a); },
  hsl: function (a) { return /^hsl/.test(a); },
  col: function (a) { return (is.hex(a) || is.rgb(a) || is.hsl(a)); },
  key: function (a) { return !defaultInstanceSettings.hasOwnProperty(a) && !defaultTweenSettings.hasOwnProperty(a) && a !== 'targets' && a !== 'keyframes'; },
};

// Easings

function parseEasingParameters(string) {
  var match = /\(([^)]+)\)/.exec(string);
  return match ? match[1].split(',').map(function (p) { return parseFloat(p); }) : [];
}

// Spring solver inspired by Webkit Copyright © 2016 Apple Inc. All rights reserved. https://webkit.org/demos/spring/spring.js

function spring(string, duration) {

  var params = parseEasingParameters(string);
  var mass = minMax(is.und(params[0]) ? 1 : params[0], .1, 100);
  var stiffness = minMax(is.und(params[1]) ? 100 : params[1], .1, 100);
  var damping = minMax(is.und(params[2]) ? 10 : params[2], .1, 100);
  var velocity =  minMax(is.und(params[3]) ? 0 : params[3], .1, 100);
  var w0 = Math.sqrt(stiffness / mass);
  var zeta = damping / (2 * Math.sqrt(stiffness * mass));
  var wd = zeta < 1 ? w0 * Math.sqrt(1 - zeta * zeta) : 0;
  var a = 1;
  var b = zeta < 1 ? (zeta * w0 + -velocity) / wd : -velocity + w0;

  function solver(t) {
    var progress = duration ? (duration * t) / 1000 : t;
    if (zeta < 1) {
      progress = Math.exp(-progress * zeta * w0) * (a * Math.cos(wd * progress) + b * Math.sin(wd * progress));
    } else {
      progress = (a + b * progress) * Math.exp(-progress * w0);
    }
    if (t === 0 || t === 1) { return t; }
    return 1 - progress;
  }

  function getDuration() {
    var cached = cache.springs[string];
    if (cached) { return cached; }
    var frame = 1/6;
    var elapsed = 0;
    var rest = 0;
    while(true) {
      elapsed += frame;
      if (solver(elapsed) === 1) {
        rest++;
        if (rest >= 16) { break; }
      } else {
        rest = 0;
      }
    }
    var duration = elapsed * frame * 1000;
    cache.springs[string] = duration;
    return duration;
  }

  return duration ? solver : getDuration;

}

// Basic steps easing implementation https://developer.mozilla.org/fr/docs/Web/CSS/transition-timing-function

function steps(steps) {
  if ( steps === void 0 ) steps = 10;

  return function (t) { return Math.ceil((minMax(t, 0.000001, 1)) * steps) * (1 / steps); };
}

// BezierEasing https://github.com/gre/bezier-easing

var bezier = (function () {

  var kSplineTableSize = 11;
  var kSampleStepSize = 1.0 / (kSplineTableSize - 1.0);

  function A(aA1, aA2) { return 1.0 - 3.0 * aA2 + 3.0 * aA1 }
  function B(aA1, aA2) { return 3.0 * aA2 - 6.0 * aA1 }
  function C(aA1)      { return 3.0 * aA1 }

  function calcBezier(aT, aA1, aA2) { return ((A(aA1, aA2) * aT + B(aA1, aA2)) * aT + C(aA1)) * aT }
  function getSlope(aT, aA1, aA2) { return 3.0 * A(aA1, aA2) * aT * aT + 2.0 * B(aA1, aA2) * aT + C(aA1) }

  function binarySubdivide(aX, aA, aB, mX1, mX2) {
    var currentX, currentT, i = 0;
    do {
      currentT = aA + (aB - aA) / 2.0;
      currentX = calcBezier(currentT, mX1, mX2) - aX;
      if (currentX > 0.0) { aB = currentT; } else { aA = currentT; }
    } while (Math.abs(currentX) > 0.0000001 && ++i < 10);
    return currentT;
  }

  function newtonRaphsonIterate(aX, aGuessT, mX1, mX2) {
    for (var i = 0; i < 4; ++i) {
      var currentSlope = getSlope(aGuessT, mX1, mX2);
      if (currentSlope === 0.0) { return aGuessT; }
      var currentX = calcBezier(aGuessT, mX1, mX2) - aX;
      aGuessT -= currentX / currentSlope;
    }
    return aGuessT;
  }

  function bezier(mX1, mY1, mX2, mY2) {

    if (!(0 <= mX1 && mX1 <= 1 && 0 <= mX2 && mX2 <= 1)) { return; }
    var sampleValues = new Float32Array(kSplineTableSize);

    if (mX1 !== mY1 || mX2 !== mY2) {
      for (var i = 0; i < kSplineTableSize; ++i) {
        sampleValues[i] = calcBezier(i * kSampleStepSize, mX1, mX2);
      }
    }

    function getTForX(aX) {

      var intervalStart = 0;
      var currentSample = 1;
      var lastSample = kSplineTableSize - 1;

      for (; currentSample !== lastSample && sampleValues[currentSample] <= aX; ++currentSample) {
        intervalStart += kSampleStepSize;
      }

      --currentSample;

      var dist = (aX - sampleValues[currentSample]) / (sampleValues[currentSample + 1] - sampleValues[currentSample]);
      var guessForT = intervalStart + dist * kSampleStepSize;
      var initialSlope = getSlope(guessForT, mX1, mX2);

      if (initialSlope >= 0.001) {
        return newtonRaphsonIterate(aX, guessForT, mX1, mX2);
      } else if (initialSlope === 0.0) {
        return guessForT;
      } else {
        return binarySubdivide(aX, intervalStart, intervalStart + kSampleStepSize, mX1, mX2);
      }

    }

    return function (x) {
      if (mX1 === mY1 && mX2 === mY2) { return x; }
      if (x === 0 || x === 1) { return x; }
      return calcBezier(getTForX(x), mY1, mY2);
    }

  }

  return bezier;

})();

var penner = (function () {

  // Based on jQuery UI's implemenation of easing equations from Robert Penner (http://www.robertpenner.com/easing)

  var eases = { linear: function () { return function (t) { return t; }; } };

  var functionEasings = {
    Sine: function () { return function (t) { return 1 - Math.cos(t * Math.PI / 2); }; },
    Circ: function () { return function (t) { return 1 - Math.sqrt(1 - t * t); }; },
    Back: function () { return function (t) { return t * t * (3 * t - 2); }; },
    Bounce: function () { return function (t) {
      var pow2, b = 4;
      while (t < (( pow2 = Math.pow(2, --b)) - 1) / 11) {}
      return 1 / Math.pow(4, 3 - b) - 7.5625 * Math.pow(( pow2 * 3 - 2 ) / 22 - t, 2)
    }; },
    Elastic: function (amplitude, period) {
      if ( amplitude === void 0 ) amplitude = 1;
      if ( period === void 0 ) period = .5;

      var a = minMax(amplitude, 1, 10);
      var p = minMax(period, .1, 2);
      return function (t) {
        return (t === 0 || t === 1) ? t : 
          -a * Math.pow(2, 10 * (t - 1)) * Math.sin((((t - 1) - (p / (Math.PI * 2) * Math.asin(1 / a))) * (Math.PI * 2)) / p);
      }
    }
  };

  var baseEasings = ['Quad', 'Cubic', 'Quart', 'Quint', 'Expo'];

  baseEasings.forEach(function (name, i) {
    functionEasings[name] = function () { return function (t) { return Math.pow(t, i + 2); }; };
  });

  Object.keys(functionEasings).forEach(function (name) {
    var easeIn = functionEasings[name];
    eases['easeIn' + name] = easeIn;
    eases['easeOut' + name] = function (a, b) { return function (t) { return 1 - easeIn(a, b)(1 - t); }; };
    eases['easeInOut' + name] = function (a, b) { return function (t) { return t < 0.5 ? easeIn(a, b)(t * 2) / 2 : 
      1 - easeIn(a, b)(t * -2 + 2) / 2; }; };
    eases['easeOutIn' + name] = function (a, b) { return function (t) { return t < 0.5 ? (1 - easeIn(a, b)(1 - t * 2)) / 2 : 
      (easeIn(a, b)(t * 2 - 1) + 1) / 2; }; };
  });

  return eases;

})();

function parseEasings(easing, duration) {
  if (is.fnc(easing)) { return easing; }
  var name = easing.split('(')[0];
  var ease = penner[name];
  var args = parseEasingParameters(easing);
  switch (name) {
    case 'spring' : return spring(easing, duration);
    case 'cubicBezier' : return applyArguments(bezier, args);
    case 'steps' : return applyArguments(steps, args);
    default : return applyArguments(ease, args);
  }
}

// Strings

function selectString(str) {
  try {
    var nodes = document.querySelectorAll(str);
    return nodes;
  } catch(e) {
    return;
  }
}

// Arrays

function filterArray(arr, callback) {
  var len = arr.length;
  var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
  var result = [];
  for (var i = 0; i < len; i++) {
    if (i in arr) {
      var val = arr[i];
      if (callback.call(thisArg, val, i, arr)) {
        result.push(val);
      }
    }
  }
  return result;
}

function flattenArray(arr) {
  return arr.reduce(function (a, b) { return a.concat(is.arr(b) ? flattenArray(b) : b); }, []);
}

function toArray(o) {
  if (is.arr(o)) { return o; }
  if (is.str(o)) { o = selectString(o) || o; }
  if (o instanceof NodeList || o instanceof HTMLCollection) { return [].slice.call(o); }
  return [o];
}

function arrayContains(arr, val) {
  return arr.some(function (a) { return a === val; });
}

// Objects

function cloneObject(o) {
  var clone = {};
  for (var p in o) { clone[p] = o[p]; }
  return clone;
}

function replaceObjectProps(o1, o2) {
  var o = cloneObject(o1);
  for (var p in o1) { o[p] = o2.hasOwnProperty(p) ? o2[p] : o1[p]; }
  return o;
}

function mergeObjects(o1, o2) {
  var o = cloneObject(o1);
  for (var p in o2) { o[p] = is.und(o1[p]) ? o2[p] : o1[p]; }
  return o;
}

// Colors

function rgbToRgba(rgbValue) {
  var rgb = /rgb\((\d+,\s*[\d]+,\s*[\d]+)\)/g.exec(rgbValue);
  return rgb ? ("rgba(" + (rgb[1]) + ",1)") : rgbValue;
}

function hexToRgba(hexValue) {
  var rgx = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  var hex = hexValue.replace(rgx, function (m, r, g, b) { return r + r + g + g + b + b; } );
  var rgb = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  var r = parseInt(rgb[1], 16);
  var g = parseInt(rgb[2], 16);
  var b = parseInt(rgb[3], 16);
  return ("rgba(" + r + "," + g + "," + b + ",1)");
}

function hslToRgba(hslValue) {
  var hsl = /hsl\((\d+),\s*([\d.]+)%,\s*([\d.]+)%\)/g.exec(hslValue) || /hsla\((\d+),\s*([\d.]+)%,\s*([\d.]+)%,\s*([\d.]+)\)/g.exec(hslValue);
  var h = parseInt(hsl[1], 10) / 360;
  var s = parseInt(hsl[2], 10) / 100;
  var l = parseInt(hsl[3], 10) / 100;
  var a = hsl[4] || 1;
  function hue2rgb(p, q, t) {
    if (t < 0) { t += 1; }
    if (t > 1) { t -= 1; }
    if (t < 1/6) { return p + (q - p) * 6 * t; }
    if (t < 1/2) { return q; }
    if (t < 2/3) { return p + (q - p) * (2/3 - t) * 6; }
    return p;
  }
  var r, g, b;
  if (s == 0) {
    r = g = b = l;
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }
  return ("rgba(" + (r * 255) + "," + (g * 255) + "," + (b * 255) + "," + a + ")");
}

function colorToRgb(val) {
  if (is.rgb(val)) { return rgbToRgba(val); }
  if (is.hex(val)) { return hexToRgba(val); }
  if (is.hsl(val)) { return hslToRgba(val); }
}

// Units

function getUnit(val) {
  var split = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?(%|px|pt|em|rem|in|cm|mm|ex|ch|pc|vw|vh|vmin|vmax|deg|rad|turn)?$/.exec(val);
  if (split) { return split[1]; }
}

function getTransformUnit(propName) {
  if (stringContains(propName, 'translate') || propName === 'perspective') { return 'px'; }
  if (stringContains(propName, 'rotate') || stringContains(propName, 'skew')) { return 'deg'; }
}

// Values

function getFunctionValue(val, animatable) {
  if (!is.fnc(val)) { return val; }
  return val(animatable.target, animatable.id, animatable.total);
}

function getAttribute(el, prop) {
  return el.getAttribute(prop);
}

function convertPxToUnit(el, value, unit) {
  var valueUnit = getUnit(value);
  if (arrayContains([unit, 'deg', 'rad', 'turn'], valueUnit)) { return value; }
  var cached = cache.CSS[value + unit];
  if (!is.und(cached)) { return cached; }
  var baseline = 100;
  var tempEl = document.createElement(el.tagName);
  var parentEl = (el.parentNode && (el.parentNode !== document)) ? el.parentNode : document.body;
  parentEl.appendChild(tempEl);
  tempEl.style.position = 'absolute';
  tempEl.style.width = baseline + unit;
  var factor = baseline / tempEl.offsetWidth;
  parentEl.removeChild(tempEl);
  var convertedUnit = factor * parseFloat(value);
  cache.CSS[value + unit] = convertedUnit;
  return convertedUnit;
}

function getCSSValue(el, prop, unit) {
  if (prop in el.style) {
    var uppercasePropName = prop.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
    var value = el.style[prop] || getComputedStyle(el).getPropertyValue(uppercasePropName) || '0';
    return unit ? convertPxToUnit(el, value, unit) : value;
  }
}

function getAnimationType(el, prop) {
  if (is.dom(el) && !is.inp(el) && (!is.nil(getAttribute(el, prop)) || (is.svg(el) && el[prop]))) { return 'attribute'; }
  if (is.dom(el) && arrayContains(validTransforms, prop)) { return 'transform'; }
  if (is.dom(el) && (prop !== 'transform' && getCSSValue(el, prop))) { return 'css'; }
  if (el[prop] != null) { return 'object'; }
}

function getElementTransforms(el) {
  if (!is.dom(el)) { return; }
  var str = el.style.transform || '';
  var reg  = /(\w+)\(([^)]*)\)/g;
  var transforms = new Map();
  var m; while (m = reg.exec(str)) { transforms.set(m[1], m[2]); }
  return transforms;
}

function getTransformValue(el, propName, animatable, unit) {
  var defaultVal = stringContains(propName, 'scale') ? 1 : 0 + getTransformUnit(propName);
  var value = getElementTransforms(el).get(propName) || defaultVal;
  if (animatable) {
    animatable.transforms.list.set(propName, value);
    animatable.transforms['last'] = propName;
  }
  return unit ? convertPxToUnit(el, value, unit) : value;
}

function getOriginalTargetValue(target, propName, unit, animatable) {
  switch (getAnimationType(target, propName)) {
    case 'transform': return getTransformValue(target, propName, animatable, unit);
    case 'css': return getCSSValue(target, propName, unit);
    case 'attribute': return getAttribute(target, propName);
    default: return target[propName] || 0;
  }
}

function getRelativeValue(to, from) {
  var operator = /^(\*=|\+=|-=)/.exec(to);
  if (!operator) { return to; }
  var u = getUnit(to) || 0;
  var x = parseFloat(from);
  var y = parseFloat(to.replace(operator[0], ''));
  switch (operator[0][0]) {
    case '+': return x + y + u;
    case '-': return x - y + u;
    case '*': return x * y + u;
  }
}

function validateValue(val, unit) {
  if (is.col(val)) { return colorToRgb(val); }
  if (/\s/g.test(val)) { return val; }
  var originalUnit = getUnit(val);
  var unitLess = originalUnit ? val.substr(0, val.length - originalUnit.length) : val;
  if (unit) { return unitLess + unit; }
  return unitLess;
}

// getTotalLength() equivalent for circle, rect, polyline, polygon and line shapes
// adapted from https://gist.github.com/SebLambla/3e0550c496c236709744

function getDistance(p1, p2) {
  return Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}

function getCircleLength(el) {
  return Math.PI * 2 * getAttribute(el, 'r');
}

function getRectLength(el) {
  return (getAttribute(el, 'width') * 2) + (getAttribute(el, 'height') * 2);
}

function getLineLength(el) {
  return getDistance(
    {x: getAttribute(el, 'x1'), y: getAttribute(el, 'y1')}, 
    {x: getAttribute(el, 'x2'), y: getAttribute(el, 'y2')}
  );
}

function getPolylineLength(el) {
  var points = el.points;
  var totalLength = 0;
  var previousPos;
  for (var i = 0 ; i < points.numberOfItems; i++) {
    var currentPos = points.getItem(i);
    if (i > 0) { totalLength += getDistance(previousPos, currentPos); }
    previousPos = currentPos;
  }
  return totalLength;
}

function getPolygonLength(el) {
  var points = el.points;
  return getPolylineLength(el) + getDistance(points.getItem(points.numberOfItems - 1), points.getItem(0));
}

// Path animation

function getTotalLength(el) {
  if (el.getTotalLength) { return el.getTotalLength(); }
  switch(el.tagName.toLowerCase()) {
    case 'circle': return getCircleLength(el);
    case 'rect': return getRectLength(el);
    case 'line': return getLineLength(el);
    case 'polyline': return getPolylineLength(el);
    case 'polygon': return getPolygonLength(el);
  }
}

function setDashoffset(el) {
  var pathLength = getTotalLength(el);
  el.setAttribute('stroke-dasharray', pathLength);
  return pathLength;
}

// Motion path

function getParentSvgEl(el) {
  var parentEl = el.parentNode;
  while (is.svg(parentEl)) {
    if (!is.svg(parentEl.parentNode)) { break; }
    parentEl = parentEl.parentNode;
  }
  return parentEl;
}

function getParentSvg(pathEl, svgData) {
  var svg = svgData || {};
  var parentSvgEl = svg.el || getParentSvgEl(pathEl);
  var rect = parentSvgEl.getBoundingClientRect();
  var viewBoxAttr = getAttribute(parentSvgEl, 'viewBox');
  var width = rect.width;
  var height = rect.height;
  var viewBox = svg.viewBox || (viewBoxAttr ? viewBoxAttr.split(' ') : [0, 0, width, height]);
  return {
    el: parentSvgEl,
    viewBox: viewBox,
    x: viewBox[0] / 1,
    y: viewBox[1] / 1,
    w: width,
    h: height,
    vW: viewBox[2],
    vH: viewBox[3]
  }
}

function getPath(path, percent) {
  var pathEl = is.str(path) ? selectString(path)[0] : path;
  var p = percent || 100;
  return function(property) {
    return {
      property: property,
      el: pathEl,
      svg: getParentSvg(pathEl),
      totalLength: getTotalLength(pathEl) * (p / 100)
    }
  }
}

function getPathProgress(path, progress, isPathTargetInsideSVG) {
  function point(offset) {
    if ( offset === void 0 ) offset = 0;

    var l = progress + offset >= 1 ? progress + offset : 0;
    return path.el.getPointAtLength(l);
  }
  var svg = getParentSvg(path.el, path.svg);
  var p = point();
  var p0 = point(-1);
  var p1 = point(+1);
  var scaleX = isPathTargetInsideSVG ? 1 : svg.w / svg.vW;
  var scaleY = isPathTargetInsideSVG ? 1 : svg.h / svg.vH;
  switch (path.property) {
    case 'x': return (p.x - svg.x) * scaleX;
    case 'y': return (p.y - svg.y) * scaleY;
    case 'angle': return Math.atan2(p1.y - p0.y, p1.x - p0.x) * 180 / Math.PI;
  }
}

// Decompose value

function decomposeValue(val, unit) {
  // const rgx = /-?\d*\.?\d+/g; // handles basic numbers
  // const rgx = /[+-]?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g; // handles exponents notation
  var rgx = /[+-]?\d*\.?\d+(?:\.\d+)?(?:[eE][+-]?\d+)?/g; // handles exponents notation
  var value = validateValue((is.pth(val) ? val.totalLength : val), unit) + '';
  return {
    original: value,
    numbers: value.match(rgx) ? value.match(rgx).map(Number) : [0],
    strings: (is.str(val) || unit) ? value.split(rgx) : []
  }
}

// Animatables

function parseTargets(targets) {
  var targetsArray = targets ? (flattenArray(is.arr(targets) ? targets.map(toArray) : toArray(targets))) : [];
  return filterArray(targetsArray, function (item, pos, self) { return self.indexOf(item) === pos; });
}

function getAnimatables(targets) {
  var parsed = parseTargets(targets);
  return parsed.map(function (t, i) {
    return {target: t, id: i, total: parsed.length, transforms: { list: getElementTransforms(t) } };
  });
}

// Properties

function normalizePropertyTweens(prop, tweenSettings) {
  var settings = cloneObject(tweenSettings);
  // Override duration if easing is a spring
  if (/^spring/.test(settings.easing)) { settings.duration = spring(settings.easing); }
  if (is.arr(prop)) {
    var l = prop.length;
    var isFromTo = (l === 2 && !is.obj(prop[0]));
    if (!isFromTo) {
      // Duration divided by the number of tweens
      if (!is.fnc(tweenSettings.duration)) { settings.duration = tweenSettings.duration / l; }
    } else {
      // Transform [from, to] values shorthand to a valid tween value
      prop = {value: prop};
    }
  }
  var propArray = is.arr(prop) ? prop : [prop];
  return propArray.map(function (v, i) {
    var obj = (is.obj(v) && !is.pth(v)) ? v : {value: v};
    // Default delay value should only be applied to the first tween
    if (is.und(obj.delay)) { obj.delay = !i ? tweenSettings.delay : 0; }
    // Default endDelay value should only be applied to the last tween
    if (is.und(obj.endDelay)) { obj.endDelay = i === propArray.length - 1 ? tweenSettings.endDelay : 0; }
    return obj;
  }).map(function (k) { return mergeObjects(k, settings); });
}


function flattenKeyframes(keyframes) {
  var propertyNames = filterArray(flattenArray(keyframes.map(function (key) { return Object.keys(key); })), function (p) { return is.key(p); })
  .reduce(function (a,b) { if (a.indexOf(b) < 0) { a.push(b); } return a; }, []);
  var properties = {};
  var loop = function ( i ) {
    var propName = propertyNames[i];
    properties[propName] = keyframes.map(function (key) {
      var newKey = {};
      for (var p in key) {
        if (is.key(p)) {
          if (p == propName) { newKey.value = key[p]; }
        } else {
          newKey[p] = key[p];
        }
      }
      return newKey;
    });
  };

  for (var i = 0; i < propertyNames.length; i++) loop( i );
  return properties;
}

function getProperties(tweenSettings, params) {
  var properties = [];
  var keyframes = params.keyframes;
  if (keyframes) { params = mergeObjects(flattenKeyframes(keyframes), params); }
  for (var p in params) {
    if (is.key(p)) {
      properties.push({
        name: p,
        tweens: normalizePropertyTweens(params[p], tweenSettings)
      });
    }
  }
  return properties;
}

// Tweens

function normalizeTweenValues(tween, animatable) {
  var t = {};
  for (var p in tween) {
    var value = getFunctionValue(tween[p], animatable);
    if (is.arr(value)) {
      value = value.map(function (v) { return getFunctionValue(v, animatable); });
      if (value.length === 1) { value = value[0]; }
    }
    t[p] = value;
  }
  t.duration = parseFloat(t.duration);
  t.delay = parseFloat(t.delay);
  return t;
}

function normalizeTweens(prop, animatable) {
  var previousTween;
  return prop.tweens.map(function (t) {
    var tween = normalizeTweenValues(t, animatable);
    var tweenValue = tween.value;
    var to = is.arr(tweenValue) ? tweenValue[1] : tweenValue;
    var toUnit = getUnit(to);
    var originalValue = getOriginalTargetValue(animatable.target, prop.name, toUnit, animatable);
    var previousValue = previousTween ? previousTween.to.original : originalValue;
    var from = is.arr(tweenValue) ? tweenValue[0] : previousValue;
    var fromUnit = getUnit(from) || getUnit(originalValue);
    var unit = toUnit || fromUnit;
    if (is.und(to)) { to = previousValue; }
    tween.from = decomposeValue(from, unit);
    tween.to = decomposeValue(getRelativeValue(to, from), unit);
    tween.start = previousTween ? previousTween.end : 0;
    tween.end = tween.start + tween.delay + tween.duration + tween.endDelay;
    tween.easing = parseEasings(tween.easing, tween.duration);
    tween.isPath = is.pth(tweenValue);
    tween.isPathTargetInsideSVG = tween.isPath && is.svg(animatable.target);
    tween.isColor = is.col(tween.from.original);
    if (tween.isColor) { tween.round = 1; }
    previousTween = tween;
    return tween;
  });
}

// Tween progress

var setProgressValue = {
  css: function (t, p, v) { return t.style[p] = v; },
  attribute: function (t, p, v) { return t.setAttribute(p, v); },
  object: function (t, p, v) { return t[p] = v; },
  transform: function (t, p, v, transforms, manual) {
    transforms.list.set(p, v);
    if (p === transforms.last || manual) {
      var str = '';
      transforms.list.forEach(function (value, prop) { str += prop + "(" + value + ") "; });
      t.style.transform = str;
    }
  }
};

// Set Value helper

function setTargetsValue(targets, properties) {
  var animatables = getAnimatables(targets);
  animatables.forEach(function (animatable) {
    for (var property in properties) {
      var value = getFunctionValue(properties[property], animatable);
      var target = animatable.target;
      var valueUnit = getUnit(value);
      var originalValue = getOriginalTargetValue(target, property, valueUnit, animatable);
      var unit = valueUnit || getUnit(originalValue);
      var to = getRelativeValue(validateValue(value, unit), originalValue);
      var animType = getAnimationType(target, property);
      setProgressValue[animType](target, property, to, animatable.transforms, true);
    }
  });
}

// Animations

function createAnimation(animatable, prop) {
  var animType = getAnimationType(animatable.target, prop.name);
  if (animType) {
    var tweens = normalizeTweens(prop, animatable);
    var lastTween = tweens[tweens.length - 1];
    return {
      type: animType,
      property: prop.name,
      animatable: animatable,
      tweens: tweens,
      duration: lastTween.end,
      delay: tweens[0].delay,
      endDelay: lastTween.endDelay
    }
  }
}

function getAnimations(animatables, properties) {
  return filterArray(flattenArray(animatables.map(function (animatable) {
    return properties.map(function (prop) {
      return createAnimation(animatable, prop);
    });
  })), function (a) { return !is.und(a); });
}

// Create Instance

function getInstanceTimings(animations, tweenSettings) {
  var animLength = animations.length;
  var getTlOffset = function (anim) { return anim.timelineOffset ? anim.timelineOffset : 0; };
  var timings = {};
  timings.duration = animLength ? Math.max.apply(Math, animations.map(function (anim) { return getTlOffset(anim) + anim.duration; })) : tweenSettings.duration;
  timings.delay = animLength ? Math.min.apply(Math, animations.map(function (anim) { return getTlOffset(anim) + anim.delay; })) : tweenSettings.delay;
  timings.endDelay = animLength ? timings.duration - Math.max.apply(Math, animations.map(function (anim) { return getTlOffset(anim) + anim.duration - anim.endDelay; })) : tweenSettings.endDelay;
  return timings;
}

var instanceID = 0;

function createNewInstance(params) {
  var instanceSettings = replaceObjectProps(defaultInstanceSettings, params);
  var tweenSettings = replaceObjectProps(defaultTweenSettings, params);
  var properties = getProperties(tweenSettings, params);
  var animatables = getAnimatables(params.targets);
  var animations = getAnimations(animatables, properties);
  var timings = getInstanceTimings(animations, tweenSettings);
  var id = instanceID;
  instanceID++;
  return mergeObjects(instanceSettings, {
    id: id,
    children: [],
    animatables: animatables,
    animations: animations,
    duration: timings.duration,
    delay: timings.delay,
    endDelay: timings.endDelay
  });
}

// Core

var activeInstances = [];

var engine = (function () {
  var raf;

  function play() {
    if (!raf && (!isDocumentHidden() || !anime.suspendWhenDocumentHidden) && activeInstances.length > 0) {
      raf = requestAnimationFrame(step);
    }
  }
  function step(t) {
    // memo on algorithm issue:
    // dangerous iteration over mutable `activeInstances`
    // (that collection may be updated from within callbacks of `tick`-ed animation instances)
    var activeInstancesLength = activeInstances.length;
    var i = 0;
    while (i < activeInstancesLength) {
      var activeInstance = activeInstances[i];
      if (!activeInstance.paused) {
        activeInstance.tick(t);
        i++;
      } else {
        activeInstances.splice(i, 1);
        activeInstancesLength--;
      }
    }
    raf = i > 0 ? requestAnimationFrame(step) : undefined;
  }

  function handleVisibilityChange() {
    if (!anime.suspendWhenDocumentHidden) { return; }

    if (isDocumentHidden()) {
      // suspend ticks
      raf = cancelAnimationFrame(raf);
    } else { // is back to active tab
      // first adjust animations to consider the time that ticks were suspended
      activeInstances.forEach(
        function (instance) { return instance ._onDocumentVisibility(); }
      );
      engine();
    }
  }
  if (typeof document !== 'undefined') {
    document.addEventListener('visibilitychange', handleVisibilityChange);
  }

  return play;
})();

function isDocumentHidden() {
  return !!document && document.hidden;
}

// Public Instance

function anime(params) {
  if ( params === void 0 ) params = {};


  var startTime = 0, lastTime = 0, now = 0;
  var children, childrenLength = 0;
  var resolve = null;

  function makePromise(instance) {
    var promise = window.Promise && new Promise(function (_resolve) { return resolve = _resolve; });
    instance.finished = promise;
    return promise;
  }

  var instance = createNewInstance(params);
  var promise = makePromise(instance);

  function toggleInstanceDirection() {
    var direction = instance.direction;
    if (direction !== 'alternate') {
      instance.direction = direction !== 'normal' ? 'normal' : 'reverse';
    }
    instance.reversed = !instance.reversed;
    children.forEach(function (child) { return child.reversed = instance.reversed; });
  }

  function adjustTime(time) {
    return instance.reversed ? instance.duration - time : time;
  }

  function resetTime() {
    startTime = 0;
    lastTime = adjustTime(instance.currentTime) * (1 / anime.speed);
  }

  function seekChild(time, child) {
    if (child) { child.seek(time - child.timelineOffset); }
  }

  function syncInstanceChildren(time) {
    if (!instance.reversePlayback) {
      for (var i = 0; i < childrenLength; i++) { seekChild(time, children[i]); }
    } else {
      for (var i$1 = childrenLength; i$1--;) { seekChild(time, children[i$1]); }
    }
  }

  function setAnimationsProgress(insTime) {
    var i = 0;
    var animations = instance.animations;
    var animationsLength = animations.length;
    while (i < animationsLength) {
      var anim = animations[i];
      var animatable = anim.animatable;
      var tweens = anim.tweens;
      var tweenLength = tweens.length - 1;
      var tween = tweens[tweenLength];
      // Only check for keyframes if there is more than one tween
      if (tweenLength) { tween = filterArray(tweens, function (t) { return (insTime < t.end); })[0] || tween; }
      var elapsed = minMax(insTime - tween.start - tween.delay, 0, tween.duration) / tween.duration;
      var eased = isNaN(elapsed) ? 1 : tween.easing(elapsed);
      var strings = tween.to.strings;
      var round = tween.round;
      var numbers = [];
      var toNumbersLength = tween.to.numbers.length;
      var progress = (void 0);
      for (var n = 0; n < toNumbersLength; n++) {
        var value = (void 0);
        var toNumber = tween.to.numbers[n];
        var fromNumber = tween.from.numbers[n] || 0;
        if (!tween.isPath) {
          value = fromNumber + (eased * (toNumber - fromNumber));
        } else {
          value = getPathProgress(tween.value, eased * toNumber, tween.isPathTargetInsideSVG);
        }
        if (round) {
          if (!(tween.isColor && n > 2)) {
            value = Math.round(value * round) / round;
          }
        }
        numbers.push(value);
      }
      // Manual Array.reduce for better performances
      var stringsLength = strings.length;
      if (!stringsLength) {
        progress = numbers[0];
      } else {
        progress = strings[0];
        for (var s = 0; s < stringsLength; s++) {
          var a = strings[s];
          var b = strings[s + 1];
          var n$1 = numbers[s];
          if (!isNaN(n$1)) {
            if (!b) {
              progress += n$1 + ' ';
            } else {
              progress += n$1 + b;
            }
          }
        }
      }
      setProgressValue[anim.type](animatable.target, anim.property, progress, animatable.transforms);
      anim.currentValue = progress;
      i++;
    }
  }

  function setCallback(cb) {
    if (instance[cb] && !instance.passThrough) { instance[cb](instance); }
  }

  function countIteration() {
    if (instance.remaining && instance.remaining !== true) {
      instance.remaining--;
    }
  }

  function setInstanceProgress(engineTime) {
    var insDuration = instance.duration;
    var insDelay = instance.delay;
    var insEndDelay = insDuration - instance.endDelay;
    var insTime = adjustTime(engineTime);
    instance.progress = minMax((insTime / insDuration) * 100, 0, 100);
    instance.reversePlayback = insTime < instance.currentTime;
    if (children) { syncInstanceChildren(insTime); }
    if (!instance.began && instance.currentTime > 0) {
      instance.began = true;
      setCallback('begin');
    }
    if (!instance.loopBegan && instance.currentTime > 0) {
      instance.loopBegan = true;
      setCallback('loopBegin');
    }
    if (insTime <= insDelay && instance.currentTime !== 0) {
      setAnimationsProgress(0);
    }
    if ((insTime >= insEndDelay && instance.currentTime !== insDuration) || !insDuration) {
      setAnimationsProgress(insDuration);
    }
    if (insTime > insDelay && insTime < insEndDelay) {
      if (!instance.changeBegan) {
        instance.changeBegan = true;
        instance.changeCompleted = false;
        setCallback('changeBegin');
      }
      setCallback('change');
      setAnimationsProgress(insTime);
    } else {
      if (instance.changeBegan) {
        instance.changeCompleted = true;
        instance.changeBegan = false;
        setCallback('changeComplete');
      }
    }
    instance.currentTime = minMax(insTime, 0, insDuration);
    if (instance.began) { setCallback('update'); }
    if (engineTime >= insDuration) {
      lastTime = 0;
      countIteration();
      if (!instance.remaining) {
        instance.paused = true;
        if (!instance.completed) {
          instance.completed = true;
          setCallback('loopComplete');
          setCallback('complete');
          if (!instance.passThrough && 'Promise' in window) {
            resolve();
            promise = makePromise(instance);
          }
        }
      } else {
        startTime = now;
        setCallback('loopComplete');
        instance.loopBegan = false;
        if (instance.direction === 'alternate') {
          toggleInstanceDirection();
        }
      }
    }
  }

  instance.reset = function() {
    var direction = instance.direction;
    instance.passThrough = false;
    instance.currentTime = 0;
    instance.progress = 0;
    instance.paused = true;
    instance.began = false;
    instance.loopBegan = false;
    instance.changeBegan = false;
    instance.completed = false;
    instance.changeCompleted = false;
    instance.reversePlayback = false;
    instance.reversed = direction === 'reverse';
    instance.remaining = instance.loop;
    children = instance.children;
    childrenLength = children.length;
    for (var i = childrenLength; i--;) { instance.children[i].reset(); }
    if (instance.reversed && instance.loop !== true || (direction === 'alternate' && instance.loop === 1)) { instance.remaining++; }
    setAnimationsProgress(instance.reversed ? instance.duration : 0);
  };

  // internal method (for engine) to adjust animation timings before restoring engine ticks (rAF)
  instance._onDocumentVisibility = resetTime;

  // Set Value helper

  instance.set = function(targets, properties) {
    setTargetsValue(targets, properties);
    return instance;
  };

  instance.tick = function(t) {
    now = t;
    if (!startTime) { startTime = now; }
    setInstanceProgress((now + (lastTime - startTime)) * anime.speed);
  };

  instance.seek = function(time) {
    setInstanceProgress(adjustTime(time));
  };

  instance.pause = function() {
    instance.paused = true;
    resetTime();
  };

  instance.play = function() {
    if (!instance.paused) { return; }
    if (instance.completed) { instance.reset(); }
    instance.paused = false;
    activeInstances.push(instance);
    resetTime();
    engine();
  };

  instance.reverse = function() {
    toggleInstanceDirection();
    instance.completed = instance.reversed ? false : true;
    resetTime();
  };

  instance.restart = function() {
    instance.reset();
    instance.play();
  };

  instance.remove = function(targets) {
    var targetsArray = parseTargets(targets);
    removeTargetsFromInstance(targetsArray, instance);
  };

  instance.reset();

  if (instance.autoplay) { instance.play(); }

  return instance;

}

// Remove targets from animation

function removeTargetsFromAnimations(targetsArray, animations) {
  for (var a = animations.length; a--;) {
    if (arrayContains(targetsArray, animations[a].animatable.target)) {
      animations.splice(a, 1);
    }
  }
}

function removeTargetsFromInstance(targetsArray, instance) {
  var animations = instance.animations;
  var children = instance.children;
  removeTargetsFromAnimations(targetsArray, animations);
  for (var c = children.length; c--;) {
    var child = children[c];
    var childAnimations = child.animations;
    removeTargetsFromAnimations(targetsArray, childAnimations);
    if (!childAnimations.length && !child.children.length) { children.splice(c, 1); }
  }
  if (!animations.length && !children.length) { instance.pause(); }
}

function removeTargetsFromActiveInstances(targets) {
  var targetsArray = parseTargets(targets);
  for (var i = activeInstances.length; i--;) {
    var instance = activeInstances[i];
    removeTargetsFromInstance(targetsArray, instance);
  }
}

// Stagger helpers

function stagger(val, params) {
  if ( params === void 0 ) params = {};

  var direction = params.direction || 'normal';
  var easing = params.easing ? parseEasings(params.easing) : null;
  var grid = params.grid;
  var axis = params.axis;
  var fromIndex = params.from || 0;
  var fromFirst = fromIndex === 'first';
  var fromCenter = fromIndex === 'center';
  var fromLast = fromIndex === 'last';
  var isRange = is.arr(val);
  var val1 = isRange ? parseFloat(val[0]) : parseFloat(val);
  var val2 = isRange ? parseFloat(val[1]) : 0;
  var unit = getUnit(isRange ? val[1] : val) || 0;
  var start = params.start || 0 + (isRange ? val1 : 0);
  var values = [];
  var maxValue = 0;
  return function (el, i, t) {
    if (fromFirst) { fromIndex = 0; }
    if (fromCenter) { fromIndex = (t - 1) / 2; }
    if (fromLast) { fromIndex = t - 1; }
    if (!values.length) {
      for (var index = 0; index < t; index++) {
        if (!grid) {
          values.push(Math.abs(fromIndex - index));
        } else {
          var fromX = !fromCenter ? fromIndex%grid[0] : (grid[0]-1)/2;
          var fromY = !fromCenter ? Math.floor(fromIndex/grid[0]) : (grid[1]-1)/2;
          var toX = index%grid[0];
          var toY = Math.floor(index/grid[0]);
          var distanceX = fromX - toX;
          var distanceY = fromY - toY;
          var value = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
          if (axis === 'x') { value = -distanceX; }
          if (axis === 'y') { value = -distanceY; }
          values.push(value);
        }
        maxValue = Math.max.apply(Math, values);
      }
      if (easing) { values = values.map(function (val) { return easing(val / maxValue) * maxValue; }); }
      if (direction === 'reverse') { values = values.map(function (val) { return axis ? (val < 0) ? val * -1 : -val : Math.abs(maxValue - val); }); }
    }
    var spacing = isRange ? (val2 - val1) / maxValue : val1;
    return start + (spacing * (Math.round(values[i] * 100) / 100)) + unit;
  }
}

// Timeline

function timeline(params) {
  if ( params === void 0 ) params = {};

  var tl = anime(params);
  tl.duration = 0;
  tl.add = function(instanceParams, timelineOffset) {
    var tlIndex = activeInstances.indexOf(tl);
    var children = tl.children;
    if (tlIndex > -1) { activeInstances.splice(tlIndex, 1); }
    function passThrough(ins) { ins.passThrough = true; }
    for (var i = 0; i < children.length; i++) { passThrough(children[i]); }
    var insParams = mergeObjects(instanceParams, replaceObjectProps(defaultTweenSettings, params));
    insParams.targets = insParams.targets || params.targets;
    var tlDuration = tl.duration;
    insParams.autoplay = false;
    insParams.direction = tl.direction;
    insParams.timelineOffset = is.und(timelineOffset) ? tlDuration : getRelativeValue(timelineOffset, tlDuration);
    passThrough(tl);
    tl.seek(insParams.timelineOffset);
    var ins = anime(insParams);
    passThrough(ins);
    children.push(ins);
    var timings = getInstanceTimings(children, params);
    tl.delay = timings.delay;
    tl.endDelay = timings.endDelay;
    tl.duration = timings.duration;
    tl.seek(0);
    tl.reset();
    if (tl.autoplay) { tl.play(); }
    return tl;
  };
  return tl;
}

anime.version = '3.2.1';
anime.speed = 1;
// TODO:#review: naming, documentation
anime.suspendWhenDocumentHidden = true;
anime.running = activeInstances;
anime.remove = removeTargetsFromActiveInstances;
anime.get = getOriginalTargetValue;
anime.set = setTargetsValue;
anime.convertPx = convertPxToUnit;
anime.path = getPath;
anime.setDashoffset = setDashoffset;
anime.stagger = stagger;
anime.timeline = timeline;
anime.easing = parseEasings;
anime.penner = penner;
anime.random = function (min, max) { return Math.floor(Math.random() * (max - min + 1)) + min; };

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (anime);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/tippy.js/animations/scale-subtle.css":
/*!*************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/tippy.js/animations/scale-subtle.css ***!
  \*************************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".tippy-box[data-animation=scale-subtle][data-placement^=top]{transform-origin:bottom}.tippy-box[data-animation=scale-subtle][data-placement^=bottom]{transform-origin:top}.tippy-box[data-animation=scale-subtle][data-placement^=left]{transform-origin:right}.tippy-box[data-animation=scale-subtle][data-placement^=right]{transform-origin:left}.tippy-box[data-animation=scale-subtle][data-state=hidden]{transform:scale(.8);opacity:0}", "",{"version":3,"sources":["webpack://./node_modules/tippy.js/animations/scale-subtle.css"],"names":[],"mappings":"AAAA,6DAA6D,uBAAuB,CAAC,gEAAgE,oBAAoB,CAAC,8DAA8D,sBAAsB,CAAC,+DAA+D,qBAAqB,CAAC,2DAA2D,mBAAmB,CAAC,SAAS","sourcesContent":[".tippy-box[data-animation=scale-subtle][data-placement^=top]{transform-origin:bottom}.tippy-box[data-animation=scale-subtle][data-placement^=bottom]{transform-origin:top}.tippy-box[data-animation=scale-subtle][data-placement^=left]{transform-origin:right}.tippy-box[data-animation=scale-subtle][data-placement^=right]{transform-origin:left}.tippy-box[data-animation=scale-subtle][data-state=hidden]{transform:scale(.8);opacity:0}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./node_modules/tippy.js/themes/light.css":
/*!**************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./node_modules/tippy.js/themes/light.css ***!
  \**************************************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
// Module
___CSS_LOADER_EXPORT___.push([module.id, ".tippy-box[data-theme~=light]{color:#26323d;box-shadow:0 0 20px 4px rgba(154,161,177,.15),0 4px 80px -8px rgba(36,40,47,.25),0 4px 4px -2px rgba(91,94,105,.15);background-color:#fff}.tippy-box[data-theme~=light][data-placement^=top]>.tippy-arrow:before{border-top-color:#fff}.tippy-box[data-theme~=light][data-placement^=bottom]>.tippy-arrow:before{border-bottom-color:#fff}.tippy-box[data-theme~=light][data-placement^=left]>.tippy-arrow:before{border-left-color:#fff}.tippy-box[data-theme~=light][data-placement^=right]>.tippy-arrow:before{border-right-color:#fff}.tippy-box[data-theme~=light]>.tippy-backdrop{background-color:#fff}.tippy-box[data-theme~=light]>.tippy-svg-arrow{fill:#fff}", "",{"version":3,"sources":["webpack://./node_modules/tippy.js/themes/light.css"],"names":[],"mappings":"AAAA,8BAA8B,aAAa,CAAC,mHAAmH,CAAC,qBAAqB,CAAC,uEAAuE,qBAAqB,CAAC,0EAA0E,wBAAwB,CAAC,wEAAwE,sBAAsB,CAAC,yEAAyE,uBAAuB,CAAC,8CAA8C,qBAAqB,CAAC,+CAA+C,SAAS","sourcesContent":[".tippy-box[data-theme~=light]{color:#26323d;box-shadow:0 0 20px 4px rgba(154,161,177,.15),0 4px 80px -8px rgba(36,40,47,.25),0 4px 4px -2px rgba(91,94,105,.15);background-color:#fff}.tippy-box[data-theme~=light][data-placement^=top]>.tippy-arrow:before{border-top-color:#fff}.tippy-box[data-theme~=light][data-placement^=bottom]>.tippy-arrow:before{border-bottom-color:#fff}.tippy-box[data-theme~=light][data-placement^=left]>.tippy-arrow:before{border-left-color:#fff}.tippy-box[data-theme~=light][data-placement^=right]>.tippy-arrow:before{border-right-color:#fff}.tippy-box[data-theme~=light]>.tippy-backdrop{background-color:#fff}.tippy-box[data-theme~=light]>.tippy-svg-arrow{fill:#fff}"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js!./src/style.css":
/*!*************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js!./src/style.css ***!
  \*************************************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/sourceMaps.js */ "./node_modules/css-loader/dist/runtime/sourceMaps.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../node_modules/css-loader/dist/runtime/getUrl.js */ "./node_modules/css-loader/dist/runtime/getUrl.js");
/* harmony import */ var _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2__);
// Imports



var ___CSS_LOADER_URL_IMPORT_0___ = new URL(/* asset import */ __webpack_require__(/*! ./font/Roboto-Regular.ttf */ "./src/font/Roboto-Regular.ttf"), __webpack_require__.b);
var ___CSS_LOADER_URL_IMPORT_1___ = new URL(/* asset import */ __webpack_require__(/*! ./imgs/gohan.png */ "./src/imgs/gohan.png"), __webpack_require__.b);
var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_sourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
var ___CSS_LOADER_URL_REPLACEMENT_0___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = _node_modules_css_loader_dist_runtime_getUrl_js__WEBPACK_IMPORTED_MODULE_2___default()(___CSS_LOADER_URL_IMPORT_1___);
// Module
___CSS_LOADER_EXPORT___.push([module.id, "\n:root{\n    --backgroundMain: #1C1B1F;\n    /* --backContainer: #4A4458 ; */\n    --backContainer: #332D41;\n    /* --backContainerSecond: #332D41; */\n    --backContainerSecond: #2b2636;\n    --backHoverBtn: #9A82DB ;\n    --textDark: #FFFFFF ;\n    \n    --divColorInput: #000000;\n    --divColorInput2: #3f3852;\n    \n}\n\n*{\n    padding: 0;\n    margin: 0;\n    box-sizing: border-box;\n    font-family: 'Roboto-Regular', sans-serif;\n}\n\n@font-face {\n    font-family: 'Roboto-Regular';\n    src: url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ") format('ttf');\n    font-weight: 600;\n    font-style: normal;\n}\n\n\nbody{\n\n    background-color: var(--backgroundMain);\n\n    display: grid;\n\n    grid-template-columns: 20% 80% ;\n\n    padding: 90px 0 0 0;\n}\n\np{\n    color: #FFFFFF;\n}\n\n.miniP{\n\n    position: absolute;\n\n    top: 30px;\n    left: 30px;\n\n    background-image: url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ");\n\n    width: 50px;\n    height: 50px;\n\n    border-radius: 50px;\n\n    background-position: center;\n    background-size: cover;\n    \n}\n\n.containerTodoLeft{\n\n    position: relative;\n    padding: 0 0 0 30px;\n\n}\n\n.ptodo{\n\n    user-select: none;\n\n}\n\n.containerProjects{\n\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 12px;\n\n    margin: 0 0 12px 0;\n    padding: 12px 0;\n\n    border-radius: 16px;\n    padding: 12px;\n    background-color: var(--backContainer);\n    width: 50px;\n\n\n}\n\n.itemProject{\n\n    background-color: #25A7B9;\n\n    width: 25px;\n    height: 25px;\n\n    border-radius: 50px;\n    cursor: pointer;\n    opacity: 0;\n\n    outline: 0px solid rgba(168, 199, 250, 0.3);\n\n}\n\n.titleProjects{\n\n    color: #FFFFFF;\n\n    font-size: 1.5rem;\n\n    margin: 0 0 12px 0;\n}\n\n.btnNewProject{\n\n    display: grid;\n    place-content: center;\n\n\n    border-radius: 16px;\n\n    width: 50px;\n    height: 30px;\n\n    cursor: pointer;\n}\n\n.containerTodayAndWeek{\n\n    display: grid;\n    place-content: center;\n    gap: 12px;\n\n    margin: 30px 0 0 0;\n    padding: 12px 0;\n\n    background-color: var(--backContainer);\n\n    border-radius: 16px;\n\n    width: 50px;\n}\n\n.itemSvg{\n    cursor: pointer;\n}\n\n.containerNewProject{\n\n    display: flex;\n    flex-direction: column;\n    gap: 12px;\n\n    width: 250px;\n\n    position: absolute;\n\n    top: 40px;\n    left: 107px;\n\n    background-color: var(--backContainer);\n\n    border-radius: 16px;\n\n    padding: 12px;\n}\n\n.btnClosePopUp,.btnClosePopUpTodo,.btnCloseTodayAndWeek{\n\n    position:absolute;\n\n    top: 10px;\n    right: 10px;\n\n    cursor: pointer;\n\n    padding: 5px;\n    border-radius: 5px;\n\n    display: grid;\n    place-content: center;\n\n\n\n}\n\n.btnCreateProject{\n\n    align-self: center;\n\n    display: flex;\n    justify-content: center;\n    align-items: center;\n\n\n    width: 40px;\n    height: 20px;\n\n    border-radius: 16px;\n\n    cursor: pointer;\n}\n\n.btnCreateProject:hover{\n\n    background-color: var(--backContainerSecond);\n}\n\n.containerInputText{\n\n    display: flex;\n    gap: 12px;\n    border-radius: 16px;\n\n    height: 30px;\n}\n\n.inputText{\n\n    width: 85%;\n    height: 100%;\n\n    background-color: var(--backContainerSecond);\n\n    border: none;\n\n    border-radius: 16px;\n\n    padding: 0 0 0 12px;\n\n    outline: none;\n}\n\n.containerInputColor{\n\n    width: 30px;\n    height: 30px;\n    border-radius: 50px;\n    background-color: var(--divColorInput);\n}\n\n.inputColor{\n\n    width: 30px;\n    height: 30px;\n    border-radius: 50px;\n    cursor: pointer;\n    border: none;\n    opacity: 0;\n}\n\n/* ---------------------------------------------------------------------------------- */\n\n.containerTodoCenter{\n    z-index: 1;\n    flex: 0 1 900px;\n}\n\n.titleTodoProject{\n    font-size: 1.5rem;\n    margin: 0 0 12px 0;\n    user-select: none;\n}\n\n.outer{\n\n    overflow: hidden;\n    border-radius: 16px;\n\n}\n\n.outerTW{\n\n    overflow: hidden;\n    border-radius: 16px;\n\n}\n\n.containerTodo{\n    position: relative;\n\n    display: grid;\n    grid-template-columns: 1fr;\n    grid-auto-rows: max-content;\n    gap: 20px;\n\n    background-color: var(--backContainer);\n    border-radius: 16px;\n\n    height: 700px;\n\n    padding: 30px ;\n\n    overflow-y: auto;\n    overflow-x: hidden;\n}\n\n.todoStyle{\n\n    display: flex;\n    align-items: center;\n    gap: 12px;\n\n\n    padding: 12px ;\n\n    background-color: var(--backContainerSecond);\n\n    border-radius: 16px;\n    opacity: 0;\n}\n\n.svgTodo{\n\n    display: flex;\n    align-items: center;\n    \n    cursor: pointer;\n}\n\n.svgTodoPriority{\n\n    display: grid;\n    place-content: center;\n\n    cursor: pointer;\n}\n\n.TW > .svgTodoMenu {\n\n    opacity: 0;\n}\n\n.svgTodoMenu{\n\n    margin-left: auto;\n\n    display: grid;\n    place-content: center;\n\n    cursor: pointer;\n\n    border-radius: 5px;\n}\n\n\n.btnNewTodo{\n\n    position: fixed;\n    \n    justify-self: center;\n    align-self: flex-end;\n\n\n    display: grid;\n    place-content: center;\n\n    background-color: var(--backContainerSecond);\n\n    border-radius: 16px;\n\n    width: 50px;\n    height: 30px;\n\n    cursor: pointer;\n\n    z-index: 2;\n\n    box-shadow: 0px 0px 30px #2b2636;\n\n}\n\n/* -------------------------------------------------------------- */\n\n.containerCenterRight{\n\n    display: flex;\n    gap: 30px;\n    margin: 0 30px 0 0;\n}\n\n\n/* ------------------------------------------------------------- */\n\n.titleTodoDay{\n    font-size: 1.5rem;\n    margin: 0 0 12px 0;\n}\n\n.containerTodoDay{\n\n    background-color: var(--backContainer);\n\n    border-radius: 16px;\n\n    width: 300px;\n    height: 700px;\n\n    padding: 30px ;\n}\n\n.itemTodoDay1{\n\n    display: flex;\n    align-items: center;\n    gap: 12px;\n\n\n    padding: 12px ;\n\n    background-color: var(--backContainerSecond);\n\n    border-radius: 16px;\n}\n\n\n/* ----------------------------------------------------------- */\n\n.containerPopUpNewTodo{\n\n    position: absolute;\n\n    align-self: center;\n    justify-self: center;\n\n    display: flex;\n    flex-direction: column;\n    gap: 30px;\n\n    padding: 30px;\n\n    background-color: var(--backContainer);\n\n    box-shadow: 0px 0px 40px #2b2636;\n\n    border-radius: 16px;\n    \n    width: 400px;\n\n    z-index: 1;\n}\n\n.name{\n\n    width: 100%;\n    height: 30px;\n}\n\n.description{\n    width: 100%;\n    height: 120px;\n    \n    \n    background-color: var(--backContainerSecond);\n\n    padding: 12px;\n\n    border-radius: 16px;\n\n    border: none;\n    outline: none;\n\n    resize: none;\n}\n\n.containerInputDate{\n\n    width: 100%;\n}\n\n.input{\n\n    background-color: var(--backContainerSecond);\n\n    height: 40px;\n\n    padding: 12px;\n\n    border-radius: 16px;\n\n    border: none;\n    outline: none;\n\n}\n\n.titleNewTodoName, .titleNewTodoDescription{\n\n    user-select: none;\n}\n\n.containerName, .containerDescription{\n\n    display: flex;\n    flex-direction: column;\n    gap: 12px;\n}\n\n.btnCreateTodo{\n\n    align-self: center;\n\n    display: grid;\n    place-items: center;\n\n    border-radius: 16px;\n\n    width: 50px;\n    height: 30px;\n\n    cursor: pointer;\n}\n\n.btnCreateTodo:hover{\n    background-color: var(--backContainerSecond);\n}\n\n.containerTextAndPriority{\n\n    display: flex;\n    \n\n    gap: 30px;\n\n}\n\n.containerPriority{\n\n    justify-self: end;\n\n    position: relative;\n\n    display: grid;\n    place-items: center;\n\n    background-color: var(--backContainerSecond);\n\n    border: none;\n    outline: none;\n\n    border-radius: 16px;\n\n    width: 40px;\n    height: 40px;\n\n    cursor: pointer;\n}\n\n.dropDown{\n\n    position:absolute;\n\n    bottom: -30px;\n\n    display: flex;\n\n    gap: 7px;\n}\n\n.itemDd{\n\n\n\n    display: grid;\n    place-items: center;\n\n    width: 25px;\n    height: 25px;\n\n    border-radius: 5px;\n\n    background-color: var(--backContainerSecond);\n    \n    cursor: pointer;\n}\n\n.containerTextTodoName{\n\n    flex-grow: 2;\n}\n\ncircle,svg{\n\n    pointer-events: none;\n}\n\n.ddOp1,.ddOp3{\n\n    position: relative;\n\n    top: -8px;\n\n}\n\n.ddOp1,.ddOp2,.ddOp3{\n\n    opacity: 0;\n    scale: .8;\n}\n\n.containerMenuTodo{\n\n    position: absolute;\n    right: -120px;\n\n    display: flex;\n    gap: 13px;\n\n    background-color: var(--backContainerSecond);\n    padding: 13px;\n\n    border-radius: 16px;\n    z-index: 1;\n}\n\n.containerSvgEdit{\n    \n    border-radius: 5px;\n    display: grid;\n    place-content: center;\n    padding: 4px;\n\n    cursor: pointer;\n\n}\n\n.containerSvgDelete{\n\n    border-radius: 5px;\n    display: grid;\n    place-content: center;\n    padding: 5px;\n\n    cursor: pointer;\n\n\n}\n\n.containerTodoEdit{\n\n    position: absolute;\n\n    align-self: center;\n    justify-self: center;\n\n    display: flex;\n    flex-direction: column;\n    gap: 30px;\n\n    background-color: var(--backContainer);\n    box-shadow: 0px 0px 40px #2b2636;\n    padding: 30px;\n\n    border-radius: 16px;\n    z-index: 1;\n\n}\n\n.containerEditName,.containerEditDescription{\n\n    display: flex;\n    flex-direction: column;\n    gap: 20px;\n\n}\n\n.editName{\n\n    background-color: var(--backContainerSecond);\n    width: 100%;\n\n}\n\n.editDescription{\n\n    background-color: var(--backContainerSecond);\n    border-radius: 16px;\n    outline: none;\n    border: none;\n}\n\n.containerEditDateAndPriority{\n\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n}\n\n.editDate{\n\n    background-color: var(--backContainerSecond);\n\n}\n\n.containerTodoEditPriority{\n\n    display: flex;\n    align-items: center;\n    justify-content: center;\n\n    background-color: var(--backContainerSecond);\n    border-radius: 16px;\n\n    padding: 15px;\n    cursor: pointer;\n\n}\n\n.containerBtnsCancelSave{\n\n    display: flex;\n    justify-content: center;\n    gap: 30px;\n\n    color: var(--textDark);\n}\n\n.containerBtnCancel{\n\n    display: grid;\n    place-items: center;\n\n    background-color: var(--backContainerSecond);\n    padding: 5px 0 ;\n    width: 100px;\n\n    border-radius: 12px;\n\n    user-select: none;\n    cursor: pointer;\n\n}\n\n.containerBtnSave{\n\n    display: grid;\n    place-items: center;\n\n    background-color: var(--backContainerSecond);\n    padding: 5px 0;\n    width: 100px;\n\n\n    border-radius: 12px;\n\n    user-select: none;\n    cursor: pointer;\n\n}\n\n.editDescription{\n\n    height: 120px;\n\n    background-color: var(--backContainerSecond);\n\n    padding: 12px;\n\n    border-radius: 16px;\n\n    border: none;\n    outline: none;\n\n    resize: none;\n}\n\n.editDropDown{\n\n    bottom: -35px;\n}\n\n.editDropDown > :nth-child(1){\n\n    background-color: var(--backContainerSecond);\n    filter: inherit;\n    \n}\n.editDropDown > :nth-child(2){\n\n    background-color: var(--backContainerSecond);\n    filter: inherit;\n    \n}\n.editDropDown > :nth-child(3){\n\n    background-color: var(--backContainerSecond);\n    filter: inherit;\n    \n}\n\n.containerDeleteConfirmation{\n\n    position: absolute;\n    \n    align-self: center;\n    justify-self: center;\n\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 30px;\n\n    background-color: var(--backContainerSecond);\n    border-radius: 16px;\n    padding: 30px 40px;\n    z-index: 1;\n\n\n}\n\n.btnDel{\n\n    display: grid;\n    place-items: center;\n\n    background-color: var(--backContainer);\n    border-radius: 12px;\n    padding: 5px 0;\n    color: var(--textDark);\n    width: 100px;\n\n}\n\n.containerBtns{\n\n    display: flex;\n    gap: 20px;\n    user-select: none;\n\n}\n\n.containerBtns > :nth-child(1){\n\n    background-color:#44445C;\n}\n.containerBtns > :nth-child(2){\n\n    background-color:rgba(179, 38, 30, 0.4);\n    cursor: pointer;\n}\n\n.titleDelConfirmation{\n\n    font-size: 1.4rem;\n    \n}\n\n/* ----------------------------------------------------------- */\n\n.containerTodosTodayAndWeek{\n\n    flex: 0 2 400px;\n\n    \n}\n\n.todosTodayAndWeek{\n\n    display: flex;\n    flex-direction: column;\n    gap: 20px;\n\n    height: 700px;\n\n    background-color: var(--backContainer);\n    border-radius: 16px;\n    padding: 30px;\n\n    overflow-y: auto;\n}\n\n.titleTodayAndWeek{\n\n    font-size: 1.5rem;\n    margin: 0 0 12px 0;\n}\n\n/* ----------------------------------------------------------- */\n\n.tippy-box[data-theme~='dark-project'] {\n    background-color: #332D41;\n    color: #E6E1E5;\n    border-radius: 16px;\n    padding: 5px 20px;\n    margin: 10px;\n}\n\n.tippy-box[data-theme~='dark-todo'] {\n    font-size: .8rem;\n    background-color: #332D41;\n    color: #E6E1E5;\n    border-radius: 16px;\n    padding: 5px 20px;\n    box-shadow: 0 0 5px 5px #2b2636;\n}\n\n/* ----------------------------------------------------------- */\n\n.testMorphing{\n\n    position: absolute;\n    bottom: 50%;\n    left: 50%;\n    transform: translate(-50%, 50%);\n\n    transform: scale(6);\n\n    cursor: pointer;\n\n}\n\n.ghost > path{\n\n    stroke: transparent;\n}\n\n.svgTodo{\n\n    display: grid;\n    place-items: center;\n\n    width: 24px;\n    height: 24px;\n}\n.containerSvgDone{\n\n    width: 24px;\n    height: 24px;\n}\n.containerSvgNotDone{\n    display: grid;\n    place-items: center;\n\n    width: 24px;\n    height: 24px;\n}\n\n.pTodoDone{\n\n    opacity: .5;\n}\n\n/* ----------------------------------------------------------- */\n\n  /* width */\n::-webkit-scrollbar {\n    width: 10px;\n  }\n  \n  /* Track */\n  ::-webkit-scrollbar-track {\n    background: var(--backContainer);\n  }\n  \n  /* Handle */\n  ::-webkit-scrollbar-thumb {\n    background: var(--backContainerSecond);\n    border-radius: 16px;\n  }\n\n  ::-webkit-scrollbar-track-piece{\n\n    border-radius: 16px;\n  }\n  \n  /* Handle on hover */\n  ::-webkit-scrollbar-thumb:hover {\n    background: #555;\n  }\n\n\n  /* ----------------------------------------------------------- */\n\n  .containerLeftMobile{\n    \n    position: fixed;\n    bottom: 0px;\n\n    width: 100%;\n\n    display: flex;\n    gap: 40px;\n    justify-content: center;\n\n\n    height: 60px;\n  }\n\n  .containerProjectsM{\n\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 4px;\n\n    /* cursor: pointer; */\n\n  }\n  .containerTodayM{\n\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 4px;\n\n    /* cursor: pointer; */\n\n  }\n  .containerWeekM{\n\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 4px;\n\n    /* cursor: pointer; */\n\n  }\n  .titleProjectsM{\n    color: #FFFFFF;\n  }\n  .titleTodayM{\n    color: #FFFFFF;\n\n  }\n  .titleWeekM{\n    color: #FFFFFF;\n\n  }\n\n  /* ----------------------------------------------------------- */\n\n  .containerProjectsMobile{\n\n    position: absolute;\n    /* bottom: 50px; */\n    width: 120px;\n    height: 185px;\n\n    display: grid;\n    grid-template-rows: 80% 20%;\n\n    border-radius: 16px;\n    background-color: var(--backContainerSecond);\n\n    z-index: 2;\n\n    opacity: 0;\n\n  }\n\n  .itemProjectM{\n\n    display: flex;\n    align-items: center;\n\n    gap: 12px;\n\n    padding: 0 0 0 12px;\n    height: 30px;\n\n\n\n  }\n\n  .colorItemProject{\n\n    width: 25px;\n    height: 25px;\n\n    border-radius: 50px;\n\n    user-select: none;\n\n  }\n\n  .titleProjectMobile{\n\n    user-select: none;\n  }\n\n  .btnNewProjectM{\n\n    display: grid;\n    place-items: center;\n\n    height: 100%;\n  }\n\n  .containerNewProjectM{\n\n    align-self: center;\n    justify-self: center;\n\n    position: absolute;\n\n    display: flex;\n    flex-direction: column;\n    gap: 12px;\n\n    width: 250px;\n\n    background-color: var(--backContainer);\n\n    border-radius: 16px;\n\n    padding: 12px;\n\n    z-index: 3;\n\n  }\n\n  .containerTodosTodayAndWeekM{\n\n    position: absolute;\n\n    width: 90%;\n    margin: 0 30px 0 30px;\n    \n  }\n\n  .containerProjectsM{\n\n    width: 60px;\n    height: 60px;\n\n  }\n\n  .containerTodayM{\n    \n    width: 60px;\n    height: 60px;\n  }\n\n  .containerWeekM{\n    \n    width: 60px;\n    height: 60px;\n\n  }\n\n  .containerNewProjectM{\n\n    box-shadow: 0px 0px 20px #2b2636;\n\n  }\n\n  .containerSvgToday{\n\n    display: grid;\n    place-content: center;\n    width: 50px;\n    height: 28px;\n    border-radius: 16px;\n\n    transition: all .15s ease-in-out;\n\n  }\n\n  .containerSvgWeek{\n\n    display: grid;\n    place-content: center;\n    width: 50px;\n    height: 28px;\n    border-radius: 16px;\n\n    transition: all .15s ease-in-out;\n\n  }\n\n  .containerSvgFolder{\n    display: grid;\n    place-content: center;\n    height: 28px;\n  }\n\n  .outerM{\n\n    height: 100%;\n    overflow: hidden;\n    /* border-radius: 16px; */\n    border-radius: 0 16px 0 0 ;\n    \n\n  }\n\n  .containerItemsProjects{\n\n    display: flex;\n    flex-direction: column;\n    gap: 16px;\n    height: 100%;\n    overflow: auto;\n    padding: 5px 0 0 0;\n    \n  }\n\n  /* ----------------------------------------------------------- */\n\n  .svgBackToProjects{\n\n    /* position: absolute; */\n    /* bottom: 90px; */\n\n    width: 40px;\n    height: 40px;\n    background-color: hsla(258, 18%, 22%, 0.70);\n\n\n    padding: 8px;\n    border-radius: 10px;\n\n    justify-self: center;\n    margin: auto;\n  }\n\n  /* ----------------------------------------------------------- */\n\n  @media screen and (max-width: 912px){\n\n    .containerTodoLeft{\n        display: none;\n\n    }\n\n    body{\n        grid-template-columns: 100%;\n        grid-template-rows: 90% 10%;\n        height: 100vh;\n    }\n\n\n    .containerCenterRight{\n\n        margin:0px ;\n        height: 100%;\n        width: 90%;\n        justify-self: center;\n    }\n\n    .containerTodoCenter{\n\n        display: flex;\n        flex-direction: column;\n\n        width: 100%;\n        height: 100%;\n\n    }\n\n    .outer{\n        height: 100%;\n    }\n\n    .containerTodo{\n\n        height: 100%;\n    }\n\n    .containerMenuTodo{\n\n        right: -5px;\n        top: -114px;\n        flex-direction: column;\n\n    }\n\n    .containerTodosTodayAndWeekM{\n        display: flex;\n        flex-direction: column; \n        gap: 12px;\n        margin: 0px;\n        justify-self: center;\n    }\n    .outerTW{\n        height: 100%;\n    }\n\n    \n\n    .titleProjectMobile{ \n\n        overflow-x: clip;\n        text-overflow: ellipsis;\n        flex-shrink: 50;\n    }\n\n    .containerItemsProjects{\n\n        padding: 12px 0 12px 0;\n    }\n\n    .todosTodayAndWeek{\n\n        height: 100%;\n    }\n\n    .titleTodayAndWeek{\n        margin: 0;\n    }\n\n    .svgTodoPriority{\n\n        cursor:none;\n        width: 20px;\n        height: 20px;\n    }\n\n  }\n\n  @media screen and (max-width: 648px){\n\n    .outerTW{\n        height: 88%;\n    }\n\n    .containerPopUpNewTodo{\n\n        width: 95%;\n    }\n\n    .containerTodoEdit{\n        width: 95%;\n\n    }\n\n    .editDescription{\n\n        width: 100%;\n    }\n  }", "",{"version":3,"sources":["webpack://./src/style.css"],"names":[],"mappings":";AACA;IACI,yBAAyB;IACzB,+BAA+B;IAC/B,wBAAwB;IACxB,oCAAoC;IACpC,8BAA8B;IAC9B,wBAAwB;IACxB,oBAAoB;;IAEpB,wBAAwB;IACxB,yBAAyB;;AAE7B;;AAEA;IACI,UAAU;IACV,SAAS;IACT,sBAAsB;IACtB,yCAAyC;AAC7C;;AAEA;IACI,6BAA6B;IAC7B,0DAAmD;IACnD,gBAAgB;IAChB,kBAAkB;AACtB;;;AAGA;;IAEI,uCAAuC;;IAEvC,aAAa;;IAEb,+BAA+B;;IAE/B,mBAAmB;AACvB;;AAEA;IACI,cAAc;AAClB;;AAEA;;IAEI,kBAAkB;;IAElB,SAAS;IACT,UAAU;;IAEV,yDAAyC;;IAEzC,WAAW;IACX,YAAY;;IAEZ,mBAAmB;;IAEnB,2BAA2B;IAC3B,sBAAsB;;AAE1B;;AAEA;;IAEI,kBAAkB;IAClB,mBAAmB;;AAEvB;;AAEA;;IAEI,iBAAiB;;AAErB;;AAEA;;IAEI,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,SAAS;;IAET,kBAAkB;IAClB,eAAe;;IAEf,mBAAmB;IACnB,aAAa;IACb,sCAAsC;IACtC,WAAW;;;AAGf;;AAEA;;IAEI,yBAAyB;;IAEzB,WAAW;IACX,YAAY;;IAEZ,mBAAmB;IACnB,eAAe;IACf,UAAU;;IAEV,2CAA2C;;AAE/C;;AAEA;;IAEI,cAAc;;IAEd,iBAAiB;;IAEjB,kBAAkB;AACtB;;AAEA;;IAEI,aAAa;IACb,qBAAqB;;;IAGrB,mBAAmB;;IAEnB,WAAW;IACX,YAAY;;IAEZ,eAAe;AACnB;;AAEA;;IAEI,aAAa;IACb,qBAAqB;IACrB,SAAS;;IAET,kBAAkB;IAClB,eAAe;;IAEf,sCAAsC;;IAEtC,mBAAmB;;IAEnB,WAAW;AACf;;AAEA;IACI,eAAe;AACnB;;AAEA;;IAEI,aAAa;IACb,sBAAsB;IACtB,SAAS;;IAET,YAAY;;IAEZ,kBAAkB;;IAElB,SAAS;IACT,WAAW;;IAEX,sCAAsC;;IAEtC,mBAAmB;;IAEnB,aAAa;AACjB;;AAEA;;IAEI,iBAAiB;;IAEjB,SAAS;IACT,WAAW;;IAEX,eAAe;;IAEf,YAAY;IACZ,kBAAkB;;IAElB,aAAa;IACb,qBAAqB;;;;AAIzB;;AAEA;;IAEI,kBAAkB;;IAElB,aAAa;IACb,uBAAuB;IACvB,mBAAmB;;;IAGnB,WAAW;IACX,YAAY;;IAEZ,mBAAmB;;IAEnB,eAAe;AACnB;;AAEA;;IAEI,4CAA4C;AAChD;;AAEA;;IAEI,aAAa;IACb,SAAS;IACT,mBAAmB;;IAEnB,YAAY;AAChB;;AAEA;;IAEI,UAAU;IACV,YAAY;;IAEZ,4CAA4C;;IAE5C,YAAY;;IAEZ,mBAAmB;;IAEnB,mBAAmB;;IAEnB,aAAa;AACjB;;AAEA;;IAEI,WAAW;IACX,YAAY;IACZ,mBAAmB;IACnB,sCAAsC;AAC1C;;AAEA;;IAEI,WAAW;IACX,YAAY;IACZ,mBAAmB;IACnB,eAAe;IACf,YAAY;IACZ,UAAU;AACd;;AAEA,uFAAuF;;AAEvF;IACI,UAAU;IACV,eAAe;AACnB;;AAEA;IACI,iBAAiB;IACjB,kBAAkB;IAClB,iBAAiB;AACrB;;AAEA;;IAEI,gBAAgB;IAChB,mBAAmB;;AAEvB;;AAEA;;IAEI,gBAAgB;IAChB,mBAAmB;;AAEvB;;AAEA;IACI,kBAAkB;;IAElB,aAAa;IACb,0BAA0B;IAC1B,2BAA2B;IAC3B,SAAS;;IAET,sCAAsC;IACtC,mBAAmB;;IAEnB,aAAa;;IAEb,cAAc;;IAEd,gBAAgB;IAChB,kBAAkB;AACtB;;AAEA;;IAEI,aAAa;IACb,mBAAmB;IACnB,SAAS;;;IAGT,cAAc;;IAEd,4CAA4C;;IAE5C,mBAAmB;IACnB,UAAU;AACd;;AAEA;;IAEI,aAAa;IACb,mBAAmB;;IAEnB,eAAe;AACnB;;AAEA;;IAEI,aAAa;IACb,qBAAqB;;IAErB,eAAe;AACnB;;AAEA;;IAEI,UAAU;AACd;;AAEA;;IAEI,iBAAiB;;IAEjB,aAAa;IACb,qBAAqB;;IAErB,eAAe;;IAEf,kBAAkB;AACtB;;;AAGA;;IAEI,eAAe;;IAEf,oBAAoB;IACpB,oBAAoB;;;IAGpB,aAAa;IACb,qBAAqB;;IAErB,4CAA4C;;IAE5C,mBAAmB;;IAEnB,WAAW;IACX,YAAY;;IAEZ,eAAe;;IAEf,UAAU;;IAEV,gCAAgC;;AAEpC;;AAEA,mEAAmE;;AAEnE;;IAEI,aAAa;IACb,SAAS;IACT,kBAAkB;AACtB;;;AAGA,kEAAkE;;AAElE;IACI,iBAAiB;IACjB,kBAAkB;AACtB;;AAEA;;IAEI,sCAAsC;;IAEtC,mBAAmB;;IAEnB,YAAY;IACZ,aAAa;;IAEb,cAAc;AAClB;;AAEA;;IAEI,aAAa;IACb,mBAAmB;IACnB,SAAS;;;IAGT,cAAc;;IAEd,4CAA4C;;IAE5C,mBAAmB;AACvB;;;AAGA,gEAAgE;;AAEhE;;IAEI,kBAAkB;;IAElB,kBAAkB;IAClB,oBAAoB;;IAEpB,aAAa;IACb,sBAAsB;IACtB,SAAS;;IAET,aAAa;;IAEb,sCAAsC;;IAEtC,gCAAgC;;IAEhC,mBAAmB;;IAEnB,YAAY;;IAEZ,UAAU;AACd;;AAEA;;IAEI,WAAW;IACX,YAAY;AAChB;;AAEA;IACI,WAAW;IACX,aAAa;;;IAGb,4CAA4C;;IAE5C,aAAa;;IAEb,mBAAmB;;IAEnB,YAAY;IACZ,aAAa;;IAEb,YAAY;AAChB;;AAEA;;IAEI,WAAW;AACf;;AAEA;;IAEI,4CAA4C;;IAE5C,YAAY;;IAEZ,aAAa;;IAEb,mBAAmB;;IAEnB,YAAY;IACZ,aAAa;;AAEjB;;AAEA;;IAEI,iBAAiB;AACrB;;AAEA;;IAEI,aAAa;IACb,sBAAsB;IACtB,SAAS;AACb;;AAEA;;IAEI,kBAAkB;;IAElB,aAAa;IACb,mBAAmB;;IAEnB,mBAAmB;;IAEnB,WAAW;IACX,YAAY;;IAEZ,eAAe;AACnB;;AAEA;IACI,4CAA4C;AAChD;;AAEA;;IAEI,aAAa;;;IAGb,SAAS;;AAEb;;AAEA;;IAEI,iBAAiB;;IAEjB,kBAAkB;;IAElB,aAAa;IACb,mBAAmB;;IAEnB,4CAA4C;;IAE5C,YAAY;IACZ,aAAa;;IAEb,mBAAmB;;IAEnB,WAAW;IACX,YAAY;;IAEZ,eAAe;AACnB;;AAEA;;IAEI,iBAAiB;;IAEjB,aAAa;;IAEb,aAAa;;IAEb,QAAQ;AACZ;;AAEA;;;;IAII,aAAa;IACb,mBAAmB;;IAEnB,WAAW;IACX,YAAY;;IAEZ,kBAAkB;;IAElB,4CAA4C;;IAE5C,eAAe;AACnB;;AAEA;;IAEI,YAAY;AAChB;;AAEA;;IAEI,oBAAoB;AACxB;;AAEA;;IAEI,kBAAkB;;IAElB,SAAS;;AAEb;;AAEA;;IAEI,UAAU;IACV,SAAS;AACb;;AAEA;;IAEI,kBAAkB;IAClB,aAAa;;IAEb,aAAa;IACb,SAAS;;IAET,4CAA4C;IAC5C,aAAa;;IAEb,mBAAmB;IACnB,UAAU;AACd;;AAEA;;IAEI,kBAAkB;IAClB,aAAa;IACb,qBAAqB;IACrB,YAAY;;IAEZ,eAAe;;AAEnB;;AAEA;;IAEI,kBAAkB;IAClB,aAAa;IACb,qBAAqB;IACrB,YAAY;;IAEZ,eAAe;;;AAGnB;;AAEA;;IAEI,kBAAkB;;IAElB,kBAAkB;IAClB,oBAAoB;;IAEpB,aAAa;IACb,sBAAsB;IACtB,SAAS;;IAET,sCAAsC;IACtC,gCAAgC;IAChC,aAAa;;IAEb,mBAAmB;IACnB,UAAU;;AAEd;;AAEA;;IAEI,aAAa;IACb,sBAAsB;IACtB,SAAS;;AAEb;;AAEA;;IAEI,4CAA4C;IAC5C,WAAW;;AAEf;;AAEA;;IAEI,4CAA4C;IAC5C,mBAAmB;IACnB,aAAa;IACb,YAAY;AAChB;;AAEA;;IAEI,aAAa;IACb,mBAAmB;IACnB,8BAA8B;AAClC;;AAEA;;IAEI,4CAA4C;;AAEhD;;AAEA;;IAEI,aAAa;IACb,mBAAmB;IACnB,uBAAuB;;IAEvB,4CAA4C;IAC5C,mBAAmB;;IAEnB,aAAa;IACb,eAAe;;AAEnB;;AAEA;;IAEI,aAAa;IACb,uBAAuB;IACvB,SAAS;;IAET,sBAAsB;AAC1B;;AAEA;;IAEI,aAAa;IACb,mBAAmB;;IAEnB,4CAA4C;IAC5C,eAAe;IACf,YAAY;;IAEZ,mBAAmB;;IAEnB,iBAAiB;IACjB,eAAe;;AAEnB;;AAEA;;IAEI,aAAa;IACb,mBAAmB;;IAEnB,4CAA4C;IAC5C,cAAc;IACd,YAAY;;;IAGZ,mBAAmB;;IAEnB,iBAAiB;IACjB,eAAe;;AAEnB;;AAEA;;IAEI,aAAa;;IAEb,4CAA4C;;IAE5C,aAAa;;IAEb,mBAAmB;;IAEnB,YAAY;IACZ,aAAa;;IAEb,YAAY;AAChB;;AAEA;;IAEI,aAAa;AACjB;;AAEA;;IAEI,4CAA4C;IAC5C,eAAe;;AAEnB;AACA;;IAEI,4CAA4C;IAC5C,eAAe;;AAEnB;AACA;;IAEI,4CAA4C;IAC5C,eAAe;;AAEnB;;AAEA;;IAEI,kBAAkB;;IAElB,kBAAkB;IAClB,oBAAoB;;IAEpB,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,SAAS;;IAET,4CAA4C;IAC5C,mBAAmB;IACnB,kBAAkB;IAClB,UAAU;;;AAGd;;AAEA;;IAEI,aAAa;IACb,mBAAmB;;IAEnB,sCAAsC;IACtC,mBAAmB;IACnB,cAAc;IACd,sBAAsB;IACtB,YAAY;;AAEhB;;AAEA;;IAEI,aAAa;IACb,SAAS;IACT,iBAAiB;;AAErB;;AAEA;;IAEI,wBAAwB;AAC5B;AACA;;IAEI,uCAAuC;IACvC,eAAe;AACnB;;AAEA;;IAEI,iBAAiB;;AAErB;;AAEA,gEAAgE;;AAEhE;;IAEI,eAAe;;;AAGnB;;AAEA;;IAEI,aAAa;IACb,sBAAsB;IACtB,SAAS;;IAET,aAAa;;IAEb,sCAAsC;IACtC,mBAAmB;IACnB,aAAa;;IAEb,gBAAgB;AACpB;;AAEA;;IAEI,iBAAiB;IACjB,kBAAkB;AACtB;;AAEA,gEAAgE;;AAEhE;IACI,yBAAyB;IACzB,cAAc;IACd,mBAAmB;IACnB,iBAAiB;IACjB,YAAY;AAChB;;AAEA;IACI,gBAAgB;IAChB,yBAAyB;IACzB,cAAc;IACd,mBAAmB;IACnB,iBAAiB;IACjB,+BAA+B;AACnC;;AAEA,gEAAgE;;AAEhE;;IAEI,kBAAkB;IAClB,WAAW;IACX,SAAS;IACT,+BAA+B;;IAE/B,mBAAmB;;IAEnB,eAAe;;AAEnB;;AAEA;;IAEI,mBAAmB;AACvB;;AAEA;;IAEI,aAAa;IACb,mBAAmB;;IAEnB,WAAW;IACX,YAAY;AAChB;AACA;;IAEI,WAAW;IACX,YAAY;AAChB;AACA;IACI,aAAa;IACb,mBAAmB;;IAEnB,WAAW;IACX,YAAY;AAChB;;AAEA;;IAEI,WAAW;AACf;;AAEA,gEAAgE;;EAE9D,UAAU;AACZ;IACI,WAAW;EACb;;EAEA,UAAU;EACV;IACE,gCAAgC;EAClC;;EAEA,WAAW;EACX;IACE,sCAAsC;IACtC,mBAAmB;EACrB;;EAEA;;IAEE,mBAAmB;EACrB;;EAEA,oBAAoB;EACpB;IACE,gBAAgB;EAClB;;;EAGA,gEAAgE;;EAEhE;;IAEE,eAAe;IACf,WAAW;;IAEX,WAAW;;IAEX,aAAa;IACb,SAAS;IACT,uBAAuB;;;IAGvB,YAAY;EACd;;EAEA;;IAEE,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,QAAQ;;IAER,qBAAqB;;EAEvB;EACA;;IAEE,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,QAAQ;;IAER,qBAAqB;;EAEvB;EACA;;IAEE,aAAa;IACb,sBAAsB;IACtB,mBAAmB;IACnB,QAAQ;;IAER,qBAAqB;;EAEvB;EACA;IACE,cAAc;EAChB;EACA;IACE,cAAc;;EAEhB;EACA;IACE,cAAc;;EAEhB;;EAEA,gEAAgE;;EAEhE;;IAEE,kBAAkB;IAClB,kBAAkB;IAClB,YAAY;IACZ,aAAa;;IAEb,aAAa;IACb,2BAA2B;;IAE3B,mBAAmB;IACnB,4CAA4C;;IAE5C,UAAU;;IAEV,UAAU;;EAEZ;;EAEA;;IAEE,aAAa;IACb,mBAAmB;;IAEnB,SAAS;;IAET,mBAAmB;IACnB,YAAY;;;;EAId;;EAEA;;IAEE,WAAW;IACX,YAAY;;IAEZ,mBAAmB;;IAEnB,iBAAiB;;EAEnB;;EAEA;;IAEE,iBAAiB;EACnB;;EAEA;;IAEE,aAAa;IACb,mBAAmB;;IAEnB,YAAY;EACd;;EAEA;;IAEE,kBAAkB;IAClB,oBAAoB;;IAEpB,kBAAkB;;IAElB,aAAa;IACb,sBAAsB;IACtB,SAAS;;IAET,YAAY;;IAEZ,sCAAsC;;IAEtC,mBAAmB;;IAEnB,aAAa;;IAEb,UAAU;;EAEZ;;EAEA;;IAEE,kBAAkB;;IAElB,UAAU;IACV,qBAAqB;;EAEvB;;EAEA;;IAEE,WAAW;IACX,YAAY;;EAEd;;EAEA;;IAEE,WAAW;IACX,YAAY;EACd;;EAEA;;IAEE,WAAW;IACX,YAAY;;EAEd;;EAEA;;IAEE,gCAAgC;;EAElC;;EAEA;;IAEE,aAAa;IACb,qBAAqB;IACrB,WAAW;IACX,YAAY;IACZ,mBAAmB;;IAEnB,gCAAgC;;EAElC;;EAEA;;IAEE,aAAa;IACb,qBAAqB;IACrB,WAAW;IACX,YAAY;IACZ,mBAAmB;;IAEnB,gCAAgC;;EAElC;;EAEA;IACE,aAAa;IACb,qBAAqB;IACrB,YAAY;EACd;;EAEA;;IAEE,YAAY;IACZ,gBAAgB;IAChB,yBAAyB;IACzB,0BAA0B;;;EAG5B;;EAEA;;IAEE,aAAa;IACb,sBAAsB;IACtB,SAAS;IACT,YAAY;IACZ,cAAc;IACd,kBAAkB;;EAEpB;;EAEA,gEAAgE;;EAEhE;;IAEE,wBAAwB;IACxB,kBAAkB;;IAElB,WAAW;IACX,YAAY;IACZ,2CAA2C;;;IAG3C,YAAY;IACZ,mBAAmB;;IAEnB,oBAAoB;IACpB,YAAY;EACd;;EAEA,gEAAgE;;EAEhE;;IAEE;QACI,aAAa;;IAEjB;;IAEA;QACI,2BAA2B;QAC3B,2BAA2B;QAC3B,aAAa;IACjB;;;IAGA;;QAEI,WAAW;QACX,YAAY;QACZ,UAAU;QACV,oBAAoB;IACxB;;IAEA;;QAEI,aAAa;QACb,sBAAsB;;QAEtB,WAAW;QACX,YAAY;;IAEhB;;IAEA;QACI,YAAY;IAChB;;IAEA;;QAEI,YAAY;IAChB;;IAEA;;QAEI,WAAW;QACX,WAAW;QACX,sBAAsB;;IAE1B;;IAEA;QACI,aAAa;QACb,sBAAsB;QACtB,SAAS;QACT,WAAW;QACX,oBAAoB;IACxB;IACA;QACI,YAAY;IAChB;;;;IAIA;;QAEI,gBAAgB;QAChB,uBAAuB;QACvB,eAAe;IACnB;;IAEA;;QAEI,sBAAsB;IAC1B;;IAEA;;QAEI,YAAY;IAChB;;IAEA;QACI,SAAS;IACb;;IAEA;;QAEI,WAAW;QACX,WAAW;QACX,YAAY;IAChB;;EAEF;;EAEA;;IAEE;QACI,WAAW;IACf;;IAEA;;QAEI,UAAU;IACd;;IAEA;QACI,UAAU;;IAEd;;IAEA;;QAEI,WAAW;IACf;EACF","sourcesContent":["\n:root{\n    --backgroundMain: #1C1B1F;\n    /* --backContainer: #4A4458 ; */\n    --backContainer: #332D41;\n    /* --backContainerSecond: #332D41; */\n    --backContainerSecond: #2b2636;\n    --backHoverBtn: #9A82DB ;\n    --textDark: #FFFFFF ;\n    \n    --divColorInput: #000000;\n    --divColorInput2: #3f3852;\n    \n}\n\n*{\n    padding: 0;\n    margin: 0;\n    box-sizing: border-box;\n    font-family: 'Roboto-Regular', sans-serif;\n}\n\n@font-face {\n    font-family: 'Roboto-Regular';\n    src: url('./font/Roboto-Regular.ttf') format('ttf');\n    font-weight: 600;\n    font-style: normal;\n}\n\n\nbody{\n\n    background-color: var(--backgroundMain);\n\n    display: grid;\n\n    grid-template-columns: 20% 80% ;\n\n    padding: 90px 0 0 0;\n}\n\np{\n    color: #FFFFFF;\n}\n\n.miniP{\n\n    position: absolute;\n\n    top: 30px;\n    left: 30px;\n\n    background-image: url('./imgs/gohan.png');\n\n    width: 50px;\n    height: 50px;\n\n    border-radius: 50px;\n\n    background-position: center;\n    background-size: cover;\n    \n}\n\n.containerTodoLeft{\n\n    position: relative;\n    padding: 0 0 0 30px;\n\n}\n\n.ptodo{\n\n    user-select: none;\n\n}\n\n.containerProjects{\n\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 12px;\n\n    margin: 0 0 12px 0;\n    padding: 12px 0;\n\n    border-radius: 16px;\n    padding: 12px;\n    background-color: var(--backContainer);\n    width: 50px;\n\n\n}\n\n.itemProject{\n\n    background-color: #25A7B9;\n\n    width: 25px;\n    height: 25px;\n\n    border-radius: 50px;\n    cursor: pointer;\n    opacity: 0;\n\n    outline: 0px solid rgba(168, 199, 250, 0.3);\n\n}\n\n.titleProjects{\n\n    color: #FFFFFF;\n\n    font-size: 1.5rem;\n\n    margin: 0 0 12px 0;\n}\n\n.btnNewProject{\n\n    display: grid;\n    place-content: center;\n\n\n    border-radius: 16px;\n\n    width: 50px;\n    height: 30px;\n\n    cursor: pointer;\n}\n\n.containerTodayAndWeek{\n\n    display: grid;\n    place-content: center;\n    gap: 12px;\n\n    margin: 30px 0 0 0;\n    padding: 12px 0;\n\n    background-color: var(--backContainer);\n\n    border-radius: 16px;\n\n    width: 50px;\n}\n\n.itemSvg{\n    cursor: pointer;\n}\n\n.containerNewProject{\n\n    display: flex;\n    flex-direction: column;\n    gap: 12px;\n\n    width: 250px;\n\n    position: absolute;\n\n    top: 40px;\n    left: 107px;\n\n    background-color: var(--backContainer);\n\n    border-radius: 16px;\n\n    padding: 12px;\n}\n\n.btnClosePopUp,.btnClosePopUpTodo,.btnCloseTodayAndWeek{\n\n    position:absolute;\n\n    top: 10px;\n    right: 10px;\n\n    cursor: pointer;\n\n    padding: 5px;\n    border-radius: 5px;\n\n    display: grid;\n    place-content: center;\n\n\n\n}\n\n.btnCreateProject{\n\n    align-self: center;\n\n    display: flex;\n    justify-content: center;\n    align-items: center;\n\n\n    width: 40px;\n    height: 20px;\n\n    border-radius: 16px;\n\n    cursor: pointer;\n}\n\n.btnCreateProject:hover{\n\n    background-color: var(--backContainerSecond);\n}\n\n.containerInputText{\n\n    display: flex;\n    gap: 12px;\n    border-radius: 16px;\n\n    height: 30px;\n}\n\n.inputText{\n\n    width: 85%;\n    height: 100%;\n\n    background-color: var(--backContainerSecond);\n\n    border: none;\n\n    border-radius: 16px;\n\n    padding: 0 0 0 12px;\n\n    outline: none;\n}\n\n.containerInputColor{\n\n    width: 30px;\n    height: 30px;\n    border-radius: 50px;\n    background-color: var(--divColorInput);\n}\n\n.inputColor{\n\n    width: 30px;\n    height: 30px;\n    border-radius: 50px;\n    cursor: pointer;\n    border: none;\n    opacity: 0;\n}\n\n/* ---------------------------------------------------------------------------------- */\n\n.containerTodoCenter{\n    z-index: 1;\n    flex: 0 1 900px;\n}\n\n.titleTodoProject{\n    font-size: 1.5rem;\n    margin: 0 0 12px 0;\n    user-select: none;\n}\n\n.outer{\n\n    overflow: hidden;\n    border-radius: 16px;\n\n}\n\n.outerTW{\n\n    overflow: hidden;\n    border-radius: 16px;\n\n}\n\n.containerTodo{\n    position: relative;\n\n    display: grid;\n    grid-template-columns: 1fr;\n    grid-auto-rows: max-content;\n    gap: 20px;\n\n    background-color: var(--backContainer);\n    border-radius: 16px;\n\n    height: 700px;\n\n    padding: 30px ;\n\n    overflow-y: auto;\n    overflow-x: hidden;\n}\n\n.todoStyle{\n\n    display: flex;\n    align-items: center;\n    gap: 12px;\n\n\n    padding: 12px ;\n\n    background-color: var(--backContainerSecond);\n\n    border-radius: 16px;\n    opacity: 0;\n}\n\n.svgTodo{\n\n    display: flex;\n    align-items: center;\n    \n    cursor: pointer;\n}\n\n.svgTodoPriority{\n\n    display: grid;\n    place-content: center;\n\n    cursor: pointer;\n}\n\n.TW > .svgTodoMenu {\n\n    opacity: 0;\n}\n\n.svgTodoMenu{\n\n    margin-left: auto;\n\n    display: grid;\n    place-content: center;\n\n    cursor: pointer;\n\n    border-radius: 5px;\n}\n\n\n.btnNewTodo{\n\n    position: fixed;\n    \n    justify-self: center;\n    align-self: flex-end;\n\n\n    display: grid;\n    place-content: center;\n\n    background-color: var(--backContainerSecond);\n\n    border-radius: 16px;\n\n    width: 50px;\n    height: 30px;\n\n    cursor: pointer;\n\n    z-index: 2;\n\n    box-shadow: 0px 0px 30px #2b2636;\n\n}\n\n/* -------------------------------------------------------------- */\n\n.containerCenterRight{\n\n    display: flex;\n    gap: 30px;\n    margin: 0 30px 0 0;\n}\n\n\n/* ------------------------------------------------------------- */\n\n.titleTodoDay{\n    font-size: 1.5rem;\n    margin: 0 0 12px 0;\n}\n\n.containerTodoDay{\n\n    background-color: var(--backContainer);\n\n    border-radius: 16px;\n\n    width: 300px;\n    height: 700px;\n\n    padding: 30px ;\n}\n\n.itemTodoDay1{\n\n    display: flex;\n    align-items: center;\n    gap: 12px;\n\n\n    padding: 12px ;\n\n    background-color: var(--backContainerSecond);\n\n    border-radius: 16px;\n}\n\n\n/* ----------------------------------------------------------- */\n\n.containerPopUpNewTodo{\n\n    position: absolute;\n\n    align-self: center;\n    justify-self: center;\n\n    display: flex;\n    flex-direction: column;\n    gap: 30px;\n\n    padding: 30px;\n\n    background-color: var(--backContainer);\n\n    box-shadow: 0px 0px 40px #2b2636;\n\n    border-radius: 16px;\n    \n    width: 400px;\n\n    z-index: 1;\n}\n\n.name{\n\n    width: 100%;\n    height: 30px;\n}\n\n.description{\n    width: 100%;\n    height: 120px;\n    \n    \n    background-color: var(--backContainerSecond);\n\n    padding: 12px;\n\n    border-radius: 16px;\n\n    border: none;\n    outline: none;\n\n    resize: none;\n}\n\n.containerInputDate{\n\n    width: 100%;\n}\n\n.input{\n\n    background-color: var(--backContainerSecond);\n\n    height: 40px;\n\n    padding: 12px;\n\n    border-radius: 16px;\n\n    border: none;\n    outline: none;\n\n}\n\n.titleNewTodoName, .titleNewTodoDescription{\n\n    user-select: none;\n}\n\n.containerName, .containerDescription{\n\n    display: flex;\n    flex-direction: column;\n    gap: 12px;\n}\n\n.btnCreateTodo{\n\n    align-self: center;\n\n    display: grid;\n    place-items: center;\n\n    border-radius: 16px;\n\n    width: 50px;\n    height: 30px;\n\n    cursor: pointer;\n}\n\n.btnCreateTodo:hover{\n    background-color: var(--backContainerSecond);\n}\n\n.containerTextAndPriority{\n\n    display: flex;\n    \n\n    gap: 30px;\n\n}\n\n.containerPriority{\n\n    justify-self: end;\n\n    position: relative;\n\n    display: grid;\n    place-items: center;\n\n    background-color: var(--backContainerSecond);\n\n    border: none;\n    outline: none;\n\n    border-radius: 16px;\n\n    width: 40px;\n    height: 40px;\n\n    cursor: pointer;\n}\n\n.dropDown{\n\n    position:absolute;\n\n    bottom: -30px;\n\n    display: flex;\n\n    gap: 7px;\n}\n\n.itemDd{\n\n\n\n    display: grid;\n    place-items: center;\n\n    width: 25px;\n    height: 25px;\n\n    border-radius: 5px;\n\n    background-color: var(--backContainerSecond);\n    \n    cursor: pointer;\n}\n\n.containerTextTodoName{\n\n    flex-grow: 2;\n}\n\ncircle,svg{\n\n    pointer-events: none;\n}\n\n.ddOp1,.ddOp3{\n\n    position: relative;\n\n    top: -8px;\n\n}\n\n.ddOp1,.ddOp2,.ddOp3{\n\n    opacity: 0;\n    scale: .8;\n}\n\n.containerMenuTodo{\n\n    position: absolute;\n    right: -120px;\n\n    display: flex;\n    gap: 13px;\n\n    background-color: var(--backContainerSecond);\n    padding: 13px;\n\n    border-radius: 16px;\n    z-index: 1;\n}\n\n.containerSvgEdit{\n    \n    border-radius: 5px;\n    display: grid;\n    place-content: center;\n    padding: 4px;\n\n    cursor: pointer;\n\n}\n\n.containerSvgDelete{\n\n    border-radius: 5px;\n    display: grid;\n    place-content: center;\n    padding: 5px;\n\n    cursor: pointer;\n\n\n}\n\n.containerTodoEdit{\n\n    position: absolute;\n\n    align-self: center;\n    justify-self: center;\n\n    display: flex;\n    flex-direction: column;\n    gap: 30px;\n\n    background-color: var(--backContainer);\n    box-shadow: 0px 0px 40px #2b2636;\n    padding: 30px;\n\n    border-radius: 16px;\n    z-index: 1;\n\n}\n\n.containerEditName,.containerEditDescription{\n\n    display: flex;\n    flex-direction: column;\n    gap: 20px;\n\n}\n\n.editName{\n\n    background-color: var(--backContainerSecond);\n    width: 100%;\n\n}\n\n.editDescription{\n\n    background-color: var(--backContainerSecond);\n    border-radius: 16px;\n    outline: none;\n    border: none;\n}\n\n.containerEditDateAndPriority{\n\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n}\n\n.editDate{\n\n    background-color: var(--backContainerSecond);\n\n}\n\n.containerTodoEditPriority{\n\n    display: flex;\n    align-items: center;\n    justify-content: center;\n\n    background-color: var(--backContainerSecond);\n    border-radius: 16px;\n\n    padding: 15px;\n    cursor: pointer;\n\n}\n\n.containerBtnsCancelSave{\n\n    display: flex;\n    justify-content: center;\n    gap: 30px;\n\n    color: var(--textDark);\n}\n\n.containerBtnCancel{\n\n    display: grid;\n    place-items: center;\n\n    background-color: var(--backContainerSecond);\n    padding: 5px 0 ;\n    width: 100px;\n\n    border-radius: 12px;\n\n    user-select: none;\n    cursor: pointer;\n\n}\n\n.containerBtnSave{\n\n    display: grid;\n    place-items: center;\n\n    background-color: var(--backContainerSecond);\n    padding: 5px 0;\n    width: 100px;\n\n\n    border-radius: 12px;\n\n    user-select: none;\n    cursor: pointer;\n\n}\n\n.editDescription{\n\n    height: 120px;\n\n    background-color: var(--backContainerSecond);\n\n    padding: 12px;\n\n    border-radius: 16px;\n\n    border: none;\n    outline: none;\n\n    resize: none;\n}\n\n.editDropDown{\n\n    bottom: -35px;\n}\n\n.editDropDown > :nth-child(1){\n\n    background-color: var(--backContainerSecond);\n    filter: inherit;\n    \n}\n.editDropDown > :nth-child(2){\n\n    background-color: var(--backContainerSecond);\n    filter: inherit;\n    \n}\n.editDropDown > :nth-child(3){\n\n    background-color: var(--backContainerSecond);\n    filter: inherit;\n    \n}\n\n.containerDeleteConfirmation{\n\n    position: absolute;\n    \n    align-self: center;\n    justify-self: center;\n\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 30px;\n\n    background-color: var(--backContainerSecond);\n    border-radius: 16px;\n    padding: 30px 40px;\n    z-index: 1;\n\n\n}\n\n.btnDel{\n\n    display: grid;\n    place-items: center;\n\n    background-color: var(--backContainer);\n    border-radius: 12px;\n    padding: 5px 0;\n    color: var(--textDark);\n    width: 100px;\n\n}\n\n.containerBtns{\n\n    display: flex;\n    gap: 20px;\n    user-select: none;\n\n}\n\n.containerBtns > :nth-child(1){\n\n    background-color:#44445C;\n}\n.containerBtns > :nth-child(2){\n\n    background-color:rgba(179, 38, 30, 0.4);\n    cursor: pointer;\n}\n\n.titleDelConfirmation{\n\n    font-size: 1.4rem;\n    \n}\n\n/* ----------------------------------------------------------- */\n\n.containerTodosTodayAndWeek{\n\n    flex: 0 2 400px;\n\n    \n}\n\n.todosTodayAndWeek{\n\n    display: flex;\n    flex-direction: column;\n    gap: 20px;\n\n    height: 700px;\n\n    background-color: var(--backContainer);\n    border-radius: 16px;\n    padding: 30px;\n\n    overflow-y: auto;\n}\n\n.titleTodayAndWeek{\n\n    font-size: 1.5rem;\n    margin: 0 0 12px 0;\n}\n\n/* ----------------------------------------------------------- */\n\n.tippy-box[data-theme~='dark-project'] {\n    background-color: #332D41;\n    color: #E6E1E5;\n    border-radius: 16px;\n    padding: 5px 20px;\n    margin: 10px;\n}\n\n.tippy-box[data-theme~='dark-todo'] {\n    font-size: .8rem;\n    background-color: #332D41;\n    color: #E6E1E5;\n    border-radius: 16px;\n    padding: 5px 20px;\n    box-shadow: 0 0 5px 5px #2b2636;\n}\n\n/* ----------------------------------------------------------- */\n\n.testMorphing{\n\n    position: absolute;\n    bottom: 50%;\n    left: 50%;\n    transform: translate(-50%, 50%);\n\n    transform: scale(6);\n\n    cursor: pointer;\n\n}\n\n.ghost > path{\n\n    stroke: transparent;\n}\n\n.svgTodo{\n\n    display: grid;\n    place-items: center;\n\n    width: 24px;\n    height: 24px;\n}\n.containerSvgDone{\n\n    width: 24px;\n    height: 24px;\n}\n.containerSvgNotDone{\n    display: grid;\n    place-items: center;\n\n    width: 24px;\n    height: 24px;\n}\n\n.pTodoDone{\n\n    opacity: .5;\n}\n\n/* ----------------------------------------------------------- */\n\n  /* width */\n::-webkit-scrollbar {\n    width: 10px;\n  }\n  \n  /* Track */\n  ::-webkit-scrollbar-track {\n    background: var(--backContainer);\n  }\n  \n  /* Handle */\n  ::-webkit-scrollbar-thumb {\n    background: var(--backContainerSecond);\n    border-radius: 16px;\n  }\n\n  ::-webkit-scrollbar-track-piece{\n\n    border-radius: 16px;\n  }\n  \n  /* Handle on hover */\n  ::-webkit-scrollbar-thumb:hover {\n    background: #555;\n  }\n\n\n  /* ----------------------------------------------------------- */\n\n  .containerLeftMobile{\n    \n    position: fixed;\n    bottom: 0px;\n\n    width: 100%;\n\n    display: flex;\n    gap: 40px;\n    justify-content: center;\n\n\n    height: 60px;\n  }\n\n  .containerProjectsM{\n\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 4px;\n\n    /* cursor: pointer; */\n\n  }\n  .containerTodayM{\n\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 4px;\n\n    /* cursor: pointer; */\n\n  }\n  .containerWeekM{\n\n    display: flex;\n    flex-direction: column;\n    align-items: center;\n    gap: 4px;\n\n    /* cursor: pointer; */\n\n  }\n  .titleProjectsM{\n    color: #FFFFFF;\n  }\n  .titleTodayM{\n    color: #FFFFFF;\n\n  }\n  .titleWeekM{\n    color: #FFFFFF;\n\n  }\n\n  /* ----------------------------------------------------------- */\n\n  .containerProjectsMobile{\n\n    position: absolute;\n    /* bottom: 50px; */\n    width: 120px;\n    height: 185px;\n\n    display: grid;\n    grid-template-rows: 80% 20%;\n\n    border-radius: 16px;\n    background-color: var(--backContainerSecond);\n\n    z-index: 2;\n\n    opacity: 0;\n\n  }\n\n  .itemProjectM{\n\n    display: flex;\n    align-items: center;\n\n    gap: 12px;\n\n    padding: 0 0 0 12px;\n    height: 30px;\n\n\n\n  }\n\n  .colorItemProject{\n\n    width: 25px;\n    height: 25px;\n\n    border-radius: 50px;\n\n    user-select: none;\n\n  }\n\n  .titleProjectMobile{\n\n    user-select: none;\n  }\n\n  .btnNewProjectM{\n\n    display: grid;\n    place-items: center;\n\n    height: 100%;\n  }\n\n  .containerNewProjectM{\n\n    align-self: center;\n    justify-self: center;\n\n    position: absolute;\n\n    display: flex;\n    flex-direction: column;\n    gap: 12px;\n\n    width: 250px;\n\n    background-color: var(--backContainer);\n\n    border-radius: 16px;\n\n    padding: 12px;\n\n    z-index: 3;\n\n  }\n\n  .containerTodosTodayAndWeekM{\n\n    position: absolute;\n\n    width: 90%;\n    margin: 0 30px 0 30px;\n    \n  }\n\n  .containerProjectsM{\n\n    width: 60px;\n    height: 60px;\n\n  }\n\n  .containerTodayM{\n    \n    width: 60px;\n    height: 60px;\n  }\n\n  .containerWeekM{\n    \n    width: 60px;\n    height: 60px;\n\n  }\n\n  .containerNewProjectM{\n\n    box-shadow: 0px 0px 20px #2b2636;\n\n  }\n\n  .containerSvgToday{\n\n    display: grid;\n    place-content: center;\n    width: 50px;\n    height: 28px;\n    border-radius: 16px;\n\n    transition: all .15s ease-in-out;\n\n  }\n\n  .containerSvgWeek{\n\n    display: grid;\n    place-content: center;\n    width: 50px;\n    height: 28px;\n    border-radius: 16px;\n\n    transition: all .15s ease-in-out;\n\n  }\n\n  .containerSvgFolder{\n    display: grid;\n    place-content: center;\n    height: 28px;\n  }\n\n  .outerM{\n\n    height: 100%;\n    overflow: hidden;\n    /* border-radius: 16px; */\n    border-radius: 0 16px 0 0 ;\n    \n\n  }\n\n  .containerItemsProjects{\n\n    display: flex;\n    flex-direction: column;\n    gap: 16px;\n    height: 100%;\n    overflow: auto;\n    padding: 5px 0 0 0;\n    \n  }\n\n  /* ----------------------------------------------------------- */\n\n  .svgBackToProjects{\n\n    /* position: absolute; */\n    /* bottom: 90px; */\n\n    width: 40px;\n    height: 40px;\n    background-color: hsla(258, 18%, 22%, 0.70);\n\n\n    padding: 8px;\n    border-radius: 10px;\n\n    justify-self: center;\n    margin: auto;\n  }\n\n  /* ----------------------------------------------------------- */\n\n  @media screen and (max-width: 912px){\n\n    .containerTodoLeft{\n        display: none;\n\n    }\n\n    body{\n        grid-template-columns: 100%;\n        grid-template-rows: 90% 10%;\n        height: 100vh;\n    }\n\n\n    .containerCenterRight{\n\n        margin:0px ;\n        height: 100%;\n        width: 90%;\n        justify-self: center;\n    }\n\n    .containerTodoCenter{\n\n        display: flex;\n        flex-direction: column;\n\n        width: 100%;\n        height: 100%;\n\n    }\n\n    .outer{\n        height: 100%;\n    }\n\n    .containerTodo{\n\n        height: 100%;\n    }\n\n    .containerMenuTodo{\n\n        right: -5px;\n        top: -114px;\n        flex-direction: column;\n\n    }\n\n    .containerTodosTodayAndWeekM{\n        display: flex;\n        flex-direction: column; \n        gap: 12px;\n        margin: 0px;\n        justify-self: center;\n    }\n    .outerTW{\n        height: 100%;\n    }\n\n    \n\n    .titleProjectMobile{ \n\n        overflow-x: clip;\n        text-overflow: ellipsis;\n        flex-shrink: 50;\n    }\n\n    .containerItemsProjects{\n\n        padding: 12px 0 12px 0;\n    }\n\n    .todosTodayAndWeek{\n\n        height: 100%;\n    }\n\n    .titleTodayAndWeek{\n        margin: 0;\n    }\n\n    .svgTodoPriority{\n\n        cursor:none;\n        width: 20px;\n        height: 20px;\n    }\n\n  }\n\n  @media screen and (max-width: 648px){\n\n    .outerTW{\n        height: 88%;\n    }\n\n    .containerPopUpNewTodo{\n\n        width: 95%;\n    }\n\n    .containerTodoEdit{\n        width: 95%;\n\n    }\n\n    .editDescription{\n\n        width: 100%;\n    }\n  }"],"sourceRoot":""}]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/api.js":
/*!*****************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/api.js ***!
  \*****************************************************/
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/getUrl.js":
/*!********************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/getUrl.js ***!
  \********************************************************/
/***/ ((module) => {



module.exports = function (url, options) {
  if (!options) {
    options = {};
  }
  if (!url) {
    return url;
  }
  url = String(url.__esModule ? url.default : url);

  // If url is already wrapped in quotes, remove them
  if (/^['"].*['"]$/.test(url)) {
    url = url.slice(1, -1);
  }
  if (options.hash) {
    url += options.hash;
  }

  // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls
  if (/["'() \t\n]|(%20)/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, "\\n"), "\"");
  }
  return url;
};

/***/ }),

/***/ "./node_modules/css-loader/dist/runtime/sourceMaps.js":
/*!************************************************************!*\
  !*** ./node_modules/css-loader/dist/runtime/sourceMaps.js ***!
  \************************************************************/
/***/ ((module) => {



module.exports = function (item) {
  var content = item[1];
  var cssMapping = item[3];
  if (!cssMapping) {
    return content;
  }
  if (typeof btoa === "function") {
    var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(cssMapping))));
    var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
    var sourceMapping = "/*# ".concat(data, " */");
    return [content].concat([sourceMapping]).join("\n");
  }
  return [content].join("\n");
};

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/defaultOptions/index.js":
/*!****************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/defaultOptions/index.js ***!
  \****************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getDefaultOptions": () => (/* binding */ getDefaultOptions),
/* harmony export */   "setDefaultOptions": () => (/* binding */ setDefaultOptions)
/* harmony export */ });
var defaultOptions = {};
function getDefaultOptions() {
  return defaultOptions;
}
function setDefaultOptions(newOptions) {
  defaultOptions = newOptions;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js":
/*!**************************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/requiredArgs/index.js ***!
  \**************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ requiredArgs)
/* harmony export */ });
function requiredArgs(required, args) {
  if (args.length < required) {
    throw new TypeError(required + ' argument' + (required > 1 ? 's' : '') + ' required, but only ' + args.length + ' present');
  }
}

/***/ }),

/***/ "./node_modules/date-fns/esm/_lib/toInteger/index.js":
/*!***********************************************************!*\
  !*** ./node_modules/date-fns/esm/_lib/toInteger/index.js ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toInteger)
/* harmony export */ });
function toInteger(dirtyNumber) {
  if (dirtyNumber === null || dirtyNumber === true || dirtyNumber === false) {
    return NaN;
  }

  var number = Number(dirtyNumber);

  if (isNaN(number)) {
    return number;
  }

  return number < 0 ? Math.ceil(number) : Math.floor(number);
}

/***/ }),

/***/ "./node_modules/date-fns/esm/isSameDay/index.js":
/*!******************************************************!*\
  !*** ./node_modules/date-fns/esm/isSameDay/index.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isSameDay)
/* harmony export */ });
/* harmony import */ var _startOfDay_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../startOfDay/index.js */ "./node_modules/date-fns/esm/startOfDay/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name isSameDay
 * @category Day Helpers
 * @summary Are the given dates in the same day (and year and month)?
 *
 * @description
 * Are the given dates in the same day (and year and month)?
 *
 * @param {Date|Number} dateLeft - the first date to check
 * @param {Date|Number} dateRight - the second date to check
 * @returns {Boolean} the dates are in the same day (and year and month)
 * @throws {TypeError} 2 arguments required
 *
 * @example
 * // Are 4 September 06:00:00 and 4 September 18:00:00 in the same day?
 * const result = isSameDay(new Date(2014, 8, 4, 6, 0), new Date(2014, 8, 4, 18, 0))
 * //=> true
 *
 * @example
 * // Are 4 September and 4 October in the same day?
 * const result = isSameDay(new Date(2014, 8, 4), new Date(2014, 9, 4))
 * //=> false
 *
 * @example
 * // Are 4 September, 2014 and 4 September, 2015 in the same day?
 * const result = isSameDay(new Date(2014, 8, 4), new Date(2015, 8, 4))
 * //=> false
 */

function isSameDay(dirtyDateLeft, dirtyDateRight) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2, arguments);
  var dateLeftStartOfDay = (0,_startOfDay_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateLeft);
  var dateRightStartOfDay = (0,_startOfDay_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDateRight);
  return dateLeftStartOfDay.getTime() === dateRightStartOfDay.getTime();
}

/***/ }),

/***/ "./node_modules/date-fns/esm/isWithinInterval/index.js":
/*!*************************************************************!*\
  !*** ./node_modules/date-fns/esm/isWithinInterval/index.js ***!
  \*************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ isWithinInterval)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");



/**
 * @name isWithinInterval
 * @category Interval Helpers
 * @summary Is the given date within the interval?
 *
 * @description
 * Is the given date within the interval? (Including start and end.)
 *
 * @param {Date|Number} date - the date to check
 * @param {Interval} interval - the interval to check
 * @returns {Boolean} the date is within the interval
 * @throws {TypeError} 2 arguments required
 * @throws {RangeError} The start of an interval cannot be after its end
 * @throws {RangeError} Date in interval cannot be `Invalid Date`
 *
 * @example
 * // For the date within the interval:
 * isWithinInterval(new Date(2014, 0, 3), {
 *   start: new Date(2014, 0, 1),
 *   end: new Date(2014, 0, 7)
 * })
 * //=> true
 *
 * @example
 * // For the date outside of the interval:
 * isWithinInterval(new Date(2014, 0, 10), {
 *   start: new Date(2014, 0, 1),
 *   end: new Date(2014, 0, 7)
 * })
 * //=> false
 *
 * @example
 * // For date equal to interval start:
 * isWithinInterval(date, { start, end: date }) // => true
 *
 * @example
 * // For date equal to interval end:
 * isWithinInterval(date, { start: date, end }) // => true
 */
function isWithinInterval(dirtyDate, interval) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(2, arguments);
  var time = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate).getTime();
  var startTime = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(interval.start).getTime();
  var endTime = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(interval.end).getTime(); // Throw an exception if start date is after end date or if any date is `Invalid Date`

  if (!(startTime <= endTime)) {
    throw new RangeError('Invalid interval');
  }

  return time >= startTime && time <= endTime;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/lastDayOfWeek/index.js":
/*!**********************************************************!*\
  !*** ./node_modules/date-fns/esm/lastDayOfWeek/index.js ***!
  \**********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ lastDayOfWeek)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");
/* harmony import */ var _lib_defaultOptions_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_lib/defaultOptions/index.js */ "./node_modules/date-fns/esm/_lib/defaultOptions/index.js");




/**
 * @name lastDayOfWeek
 * @category Week Helpers
 * @summary Return the last day of a week for the given date.
 *
 * @description
 * Return the last day of a week for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Date} the last day of a week
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // The last day of a week for 2 September 2014 11:55:00:
 * const result = lastDayOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sat Sep 06 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the last day of the week for 2 September 2014 11:55:00:
 * const result = lastDayOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Sun Sep 07 2014 00:00:00
 */

function lastDayOfWeek(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;

  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var defaultOptions = (0,_lib_defaultOptions_index_js__WEBPACK_IMPORTED_MODULE_1__.getDefaultOptions)();
  var weekStartsOn = (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6');
  }

  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])(dirtyDate);
  var day = date.getDay();
  var diff = (day < weekStartsOn ? -7 : 0) + 6 - (day - weekStartsOn);
  date.setHours(0, 0, 0, 0);
  date.setDate(date.getDate() + diff);
  return date;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/startOfDay/index.js":
/*!*******************************************************!*\
  !*** ./node_modules/date-fns/esm/startOfDay/index.js ***!
  \*******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ startOfDay)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");


/**
 * @name startOfDay
 * @category Day Helpers
 * @summary Return the start of a day for the given date.
 *
 * @description
 * Return the start of a day for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @returns {Date} the start of a day
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // The start of a day for 2 September 2014 11:55:00:
 * const result = startOfDay(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Tue Sep 02 2014 00:00:00
 */

function startOfDay(dirtyDate) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_1__["default"])(dirtyDate);
  date.setHours(0, 0, 0, 0);
  return date;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/startOfWeek/index.js":
/*!********************************************************!*\
  !*** ./node_modules/date-fns/esm/startOfWeek/index.js ***!
  \********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ startOfWeek)
/* harmony export */ });
/* harmony import */ var _toDate_index_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../toDate/index.js */ "./node_modules/date-fns/esm/toDate/index.js");
/* harmony import */ var _lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_lib/toInteger/index.js */ "./node_modules/date-fns/esm/_lib/toInteger/index.js");
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");
/* harmony import */ var _lib_defaultOptions_index_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../_lib/defaultOptions/index.js */ "./node_modules/date-fns/esm/_lib/defaultOptions/index.js");




/**
 * @name startOfWeek
 * @category Week Helpers
 * @summary Return the start of a week for the given date.
 *
 * @description
 * Return the start of a week for the given date.
 * The result will be in the local timezone.
 *
 * @param {Date|Number} date - the original date
 * @param {Object} [options] - an object with options.
 * @param {Locale} [options.locale=defaultLocale] - the locale object. See [Locale]{@link https://date-fns.org/docs/Locale}
 * @param {0|1|2|3|4|5|6} [options.weekStartsOn=0] - the index of the first day of the week (0 - Sunday)
 * @returns {Date} the start of a week
 * @throws {TypeError} 1 argument required
 * @throws {RangeError} `options.weekStartsOn` must be between 0 and 6
 *
 * @example
 * // The start of a week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0))
 * //=> Sun Aug 31 2014 00:00:00
 *
 * @example
 * // If the week starts on Monday, the start of the week for 2 September 2014 11:55:00:
 * const result = startOfWeek(new Date(2014, 8, 2, 11, 55, 0), { weekStartsOn: 1 })
 * //=> Mon Sep 01 2014 00:00:00
 */

function startOfWeek(dirtyDate, options) {
  var _ref, _ref2, _ref3, _options$weekStartsOn, _options$locale, _options$locale$optio, _defaultOptions$local, _defaultOptions$local2;

  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var defaultOptions = (0,_lib_defaultOptions_index_js__WEBPACK_IMPORTED_MODULE_1__.getDefaultOptions)();
  var weekStartsOn = (0,_lib_toInteger_index_js__WEBPACK_IMPORTED_MODULE_2__["default"])((_ref = (_ref2 = (_ref3 = (_options$weekStartsOn = options === null || options === void 0 ? void 0 : options.weekStartsOn) !== null && _options$weekStartsOn !== void 0 ? _options$weekStartsOn : options === null || options === void 0 ? void 0 : (_options$locale = options.locale) === null || _options$locale === void 0 ? void 0 : (_options$locale$optio = _options$locale.options) === null || _options$locale$optio === void 0 ? void 0 : _options$locale$optio.weekStartsOn) !== null && _ref3 !== void 0 ? _ref3 : defaultOptions.weekStartsOn) !== null && _ref2 !== void 0 ? _ref2 : (_defaultOptions$local = defaultOptions.locale) === null || _defaultOptions$local === void 0 ? void 0 : (_defaultOptions$local2 = _defaultOptions$local.options) === null || _defaultOptions$local2 === void 0 ? void 0 : _defaultOptions$local2.weekStartsOn) !== null && _ref !== void 0 ? _ref : 0); // Test if weekStartsOn is between 0 and 6 _and_ is not NaN

  if (!(weekStartsOn >= 0 && weekStartsOn <= 6)) {
    throw new RangeError('weekStartsOn must be between 0 and 6 inclusively');
  }

  var date = (0,_toDate_index_js__WEBPACK_IMPORTED_MODULE_3__["default"])(dirtyDate);
  var day = date.getDay();
  var diff = (day < weekStartsOn ? 7 : 0) + day - weekStartsOn;
  date.setDate(date.getDate() - diff);
  date.setHours(0, 0, 0, 0);
  return date;
}

/***/ }),

/***/ "./node_modules/date-fns/esm/toDate/index.js":
/*!***************************************************!*\
  !*** ./node_modules/date-fns/esm/toDate/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ toDate)
/* harmony export */ });
/* harmony import */ var _lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../_lib/requiredArgs/index.js */ "./node_modules/date-fns/esm/_lib/requiredArgs/index.js");
function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }


/**
 * @name toDate
 * @category Common Helpers
 * @summary Convert the given argument to an instance of Date.
 *
 * @description
 * Convert the given argument to an instance of Date.
 *
 * If the argument is an instance of Date, the function returns its clone.
 *
 * If the argument is a number, it is treated as a timestamp.
 *
 * If the argument is none of the above, the function returns Invalid Date.
 *
 * **Note**: *all* Date arguments passed to any *date-fns* function is processed by `toDate`.
 *
 * @param {Date|Number} argument - the value to convert
 * @returns {Date} the parsed date in the local time zone
 * @throws {TypeError} 1 argument required
 *
 * @example
 * // Clone the date:
 * const result = toDate(new Date(2014, 1, 11, 11, 30, 30))
 * //=> Tue Feb 11 2014 11:30:30
 *
 * @example
 * // Convert the timestamp to date:
 * const result = toDate(1392098430000)
 * //=> Tue Feb 11 2014 11:30:30
 */

function toDate(argument) {
  (0,_lib_requiredArgs_index_js__WEBPACK_IMPORTED_MODULE_0__["default"])(1, arguments);
  var argStr = Object.prototype.toString.call(argument); // Clone the date

  if (argument instanceof Date || _typeof(argument) === 'object' && argStr === '[object Date]') {
    // Prevent the date to lose the milliseconds when passed to new Date() in IE10
    return new Date(argument.getTime());
  } else if (typeof argument === 'number' || argStr === '[object Number]') {
    return new Date(argument);
  } else {
    if ((typeof argument === 'string' || argStr === '[object String]') && typeof console !== 'undefined') {
      // eslint-disable-next-line no-console
      console.warn("Starting with v2.0.0-beta.1 date-fns doesn't accept strings as date arguments. Please use `parseISO` to parse strings. See: https://github.com/date-fns/date-fns/blob/master/docs/upgradeGuide.md#string-arguments"); // eslint-disable-next-line no-console

      console.warn(new Error().stack);
    }

    return new Date(NaN);
  }
}

/***/ }),

/***/ "./node_modules/tippy.js/animations/scale-subtle.css":
/*!***********************************************************!*\
  !*** ./node_modules/tippy.js/animations/scale-subtle.css ***!
  \***********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_scale_subtle_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../css-loader/dist/cjs.js!./scale-subtle.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/tippy.js/animations/scale-subtle.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_scale_subtle_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_scale_subtle_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_scale_subtle_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_scale_subtle_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/tippy.js/themes/light.css":
/*!************************************************!*\
  !*** ./node_modules/tippy.js/themes/light.css ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../../style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../../style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../../style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../../style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../../style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _css_loader_dist_cjs_js_light_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../../css-loader/dist/cjs.js!./light.css */ "./node_modules/css-loader/dist/cjs.js!./node_modules/tippy.js/themes/light.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_css_loader_dist_cjs_js_light_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_css_loader_dist_cjs_js_light_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _css_loader_dist_cjs_js_light_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _css_loader_dist_cjs_js_light_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./src/style.css":
/*!***********************!*\
  !*** ./src/style.css ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js */ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleDomAPI.js */ "./node_modules/style-loader/dist/runtime/styleDomAPI.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertBySelector.js */ "./node_modules/style-loader/dist/runtime/insertBySelector.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js */ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/insertStyleElement.js */ "./node_modules/style-loader/dist/runtime/insertStyleElement.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! !../node_modules/style-loader/dist/runtime/styleTagTransform.js */ "./node_modules/style-loader/dist/runtime/styleTagTransform.js");
/* harmony import */ var _node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! !!../node_modules/css-loader/dist/cjs.js!./style.css */ "./node_modules/css-loader/dist/cjs.js!./src/style.css");

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (_node_modules_style_loader_dist_runtime_styleTagTransform_js__WEBPACK_IMPORTED_MODULE_5___default());
options.setAttributes = (_node_modules_style_loader_dist_runtime_setAttributesWithoutAttributes_js__WEBPACK_IMPORTED_MODULE_3___default());

      options.insert = _node_modules_style_loader_dist_runtime_insertBySelector_js__WEBPACK_IMPORTED_MODULE_2___default().bind(null, "head");
    
options.domAPI = (_node_modules_style_loader_dist_runtime_styleDomAPI_js__WEBPACK_IMPORTED_MODULE_1___default());
options.insertStyleElement = (_node_modules_style_loader_dist_runtime_insertStyleElement_js__WEBPACK_IMPORTED_MODULE_4___default());

var update = _node_modules_style_loader_dist_runtime_injectStylesIntoStyleTag_js__WEBPACK_IMPORTED_MODULE_0___default()(_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"], options);




       /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (_node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"] && _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals ? _node_modules_css_loader_dist_cjs_js_style_css__WEBPACK_IMPORTED_MODULE_6__["default"].locals : undefined);


/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js":
/*!****************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js ***!
  \****************************************************************************/
/***/ ((module) => {



var stylesInDOM = [];

function getIndexByIdentifier(identifier) {
  var result = -1;

  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }

  return result;
}

function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];

  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };

    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }

    identifiers.push(identifier);
  }

  return identifiers;
}

function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);

  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }

      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };

  return updater;
}

module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];

    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }

    var newLastIdentifiers = modulesToDom(newList, options);

    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];

      var _index = getIndexByIdentifier(_identifier);

      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();

        stylesInDOM.splice(_index, 1);
      }
    }

    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertBySelector.js":
/*!********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertBySelector.js ***!
  \********************************************************************/
/***/ ((module) => {



var memo = {};
/* istanbul ignore next  */

function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target); // Special case to return head of iframe instead of iframe itself

    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }

    memo[target] = styleTarget;
  }

  return memo[target];
}
/* istanbul ignore next  */


function insertBySelector(insert, style) {
  var target = getTarget(insert);

  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }

  target.appendChild(style);
}

module.exports = insertBySelector;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/insertStyleElement.js":
/*!**********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/insertStyleElement.js ***!
  \**********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}

module.exports = insertStyleElement;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js":
/*!**********************************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js ***!
  \**********************************************************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;

  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}

module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleDomAPI.js":
/*!***************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleDomAPI.js ***!
  \***************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";

  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }

  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }

  var needLayer = typeof obj.layer !== "undefined";

  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }

  css += obj.css;

  if (needLayer) {
    css += "}";
  }

  if (obj.media) {
    css += "}";
  }

  if (obj.supports) {
    css += "}";
  }

  var sourceMap = obj.sourceMap;

  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  } // For old IE

  /* istanbul ignore if  */


  options.styleTagTransform(css, styleElement, options.options);
}

function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }

  styleElement.parentNode.removeChild(styleElement);
}
/* istanbul ignore next  */


function domAPI(options) {
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}

module.exports = domAPI;

/***/ }),

/***/ "./node_modules/style-loader/dist/runtime/styleTagTransform.js":
/*!*********************************************************************!*\
  !*** ./node_modules/style-loader/dist/runtime/styleTagTransform.js ***!
  \*********************************************************************/
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }

    styleElement.appendChild(document.createTextNode(css));
  }
}

module.exports = styleTagTransform;

/***/ }),

/***/ "./node_modules/tippy.js/dist/tippy.esm.js":
/*!*************************************************!*\
  !*** ./node_modules/tippy.js/dist/tippy.esm.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "animateFill": () => (/* binding */ animateFill),
/* harmony export */   "createSingleton": () => (/* binding */ createSingleton),
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "delegate": () => (/* binding */ delegate),
/* harmony export */   "followCursor": () => (/* binding */ followCursor),
/* harmony export */   "hideAll": () => (/* binding */ hideAll),
/* harmony export */   "inlinePositioning": () => (/* binding */ inlinePositioning),
/* harmony export */   "roundArrow": () => (/* binding */ ROUND_ARROW),
/* harmony export */   "sticky": () => (/* binding */ sticky)
/* harmony export */ });
/* harmony import */ var _popperjs_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @popperjs/core */ "./node_modules/@popperjs/core/lib/popper.js");
/* harmony import */ var _popperjs_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @popperjs/core */ "./node_modules/@popperjs/core/lib/modifiers/applyStyles.js");
/**!
* tippy.js v6.3.7
* (c) 2017-2021 atomiks
* MIT License
*/


var ROUND_ARROW = '<svg width="16" height="6" xmlns="http://www.w3.org/2000/svg"><path d="M0 6s1.796-.013 4.67-3.615C5.851.9 6.93.006 8 0c1.07-.006 2.148.887 3.343 2.385C14.233 6.005 16 6 16 6H0z"></svg>';
var BOX_CLASS = "tippy-box";
var CONTENT_CLASS = "tippy-content";
var BACKDROP_CLASS = "tippy-backdrop";
var ARROW_CLASS = "tippy-arrow";
var SVG_ARROW_CLASS = "tippy-svg-arrow";
var TOUCH_OPTIONS = {
  passive: true,
  capture: true
};
var TIPPY_DEFAULT_APPEND_TO = function TIPPY_DEFAULT_APPEND_TO() {
  return document.body;
};

function hasOwnProperty(obj, key) {
  return {}.hasOwnProperty.call(obj, key);
}
function getValueAtIndexOrReturn(value, index, defaultValue) {
  if (Array.isArray(value)) {
    var v = value[index];
    return v == null ? Array.isArray(defaultValue) ? defaultValue[index] : defaultValue : v;
  }

  return value;
}
function isType(value, type) {
  var str = {}.toString.call(value);
  return str.indexOf('[object') === 0 && str.indexOf(type + "]") > -1;
}
function invokeWithArgsOrReturn(value, args) {
  return typeof value === 'function' ? value.apply(void 0, args) : value;
}
function debounce(fn, ms) {
  // Avoid wrapping in `setTimeout` if ms is 0 anyway
  if (ms === 0) {
    return fn;
  }

  var timeout;
  return function (arg) {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      fn(arg);
    }, ms);
  };
}
function removeProperties(obj, keys) {
  var clone = Object.assign({}, obj);
  keys.forEach(function (key) {
    delete clone[key];
  });
  return clone;
}
function splitBySpaces(value) {
  return value.split(/\s+/).filter(Boolean);
}
function normalizeToArray(value) {
  return [].concat(value);
}
function pushIfUnique(arr, value) {
  if (arr.indexOf(value) === -1) {
    arr.push(value);
  }
}
function unique(arr) {
  return arr.filter(function (item, index) {
    return arr.indexOf(item) === index;
  });
}
function getBasePlacement(placement) {
  return placement.split('-')[0];
}
function arrayFrom(value) {
  return [].slice.call(value);
}
function removeUndefinedProps(obj) {
  return Object.keys(obj).reduce(function (acc, key) {
    if (obj[key] !== undefined) {
      acc[key] = obj[key];
    }

    return acc;
  }, {});
}

function div() {
  return document.createElement('div');
}
function isElement(value) {
  return ['Element', 'Fragment'].some(function (type) {
    return isType(value, type);
  });
}
function isNodeList(value) {
  return isType(value, 'NodeList');
}
function isMouseEvent(value) {
  return isType(value, 'MouseEvent');
}
function isReferenceElement(value) {
  return !!(value && value._tippy && value._tippy.reference === value);
}
function getArrayOfElements(value) {
  if (isElement(value)) {
    return [value];
  }

  if (isNodeList(value)) {
    return arrayFrom(value);
  }

  if (Array.isArray(value)) {
    return value;
  }

  return arrayFrom(document.querySelectorAll(value));
}
function setTransitionDuration(els, value) {
  els.forEach(function (el) {
    if (el) {
      el.style.transitionDuration = value + "ms";
    }
  });
}
function setVisibilityState(els, state) {
  els.forEach(function (el) {
    if (el) {
      el.setAttribute('data-state', state);
    }
  });
}
function getOwnerDocument(elementOrElements) {
  var _element$ownerDocumen;

  var _normalizeToArray = normalizeToArray(elementOrElements),
      element = _normalizeToArray[0]; // Elements created via a <template> have an ownerDocument with no reference to the body


  return element != null && (_element$ownerDocumen = element.ownerDocument) != null && _element$ownerDocumen.body ? element.ownerDocument : document;
}
function isCursorOutsideInteractiveBorder(popperTreeData, event) {
  var clientX = event.clientX,
      clientY = event.clientY;
  return popperTreeData.every(function (_ref) {
    var popperRect = _ref.popperRect,
        popperState = _ref.popperState,
        props = _ref.props;
    var interactiveBorder = props.interactiveBorder;
    var basePlacement = getBasePlacement(popperState.placement);
    var offsetData = popperState.modifiersData.offset;

    if (!offsetData) {
      return true;
    }

    var topDistance = basePlacement === 'bottom' ? offsetData.top.y : 0;
    var bottomDistance = basePlacement === 'top' ? offsetData.bottom.y : 0;
    var leftDistance = basePlacement === 'right' ? offsetData.left.x : 0;
    var rightDistance = basePlacement === 'left' ? offsetData.right.x : 0;
    var exceedsTop = popperRect.top - clientY + topDistance > interactiveBorder;
    var exceedsBottom = clientY - popperRect.bottom - bottomDistance > interactiveBorder;
    var exceedsLeft = popperRect.left - clientX + leftDistance > interactiveBorder;
    var exceedsRight = clientX - popperRect.right - rightDistance > interactiveBorder;
    return exceedsTop || exceedsBottom || exceedsLeft || exceedsRight;
  });
}
function updateTransitionEndListener(box, action, listener) {
  var method = action + "EventListener"; // some browsers apparently support `transition` (unprefixed) but only fire
  // `webkitTransitionEnd`...

  ['transitionend', 'webkitTransitionEnd'].forEach(function (event) {
    box[method](event, listener);
  });
}
/**
 * Compared to xxx.contains, this function works for dom structures with shadow
 * dom
 */

function actualContains(parent, child) {
  var target = child;

  while (target) {
    var _target$getRootNode;

    if (parent.contains(target)) {
      return true;
    }

    target = target.getRootNode == null ? void 0 : (_target$getRootNode = target.getRootNode()) == null ? void 0 : _target$getRootNode.host;
  }

  return false;
}

var currentInput = {
  isTouch: false
};
var lastMouseMoveTime = 0;
/**
 * When a `touchstart` event is fired, it's assumed the user is using touch
 * input. We'll bind a `mousemove` event listener to listen for mouse input in
 * the future. This way, the `isTouch` property is fully dynamic and will handle
 * hybrid devices that use a mix of touch + mouse input.
 */

function onDocumentTouchStart() {
  if (currentInput.isTouch) {
    return;
  }

  currentInput.isTouch = true;

  if (window.performance) {
    document.addEventListener('mousemove', onDocumentMouseMove);
  }
}
/**
 * When two `mousemove` event are fired consecutively within 20ms, it's assumed
 * the user is using mouse input again. `mousemove` can fire on touch devices as
 * well, but very rarely that quickly.
 */

function onDocumentMouseMove() {
  var now = performance.now();

  if (now - lastMouseMoveTime < 20) {
    currentInput.isTouch = false;
    document.removeEventListener('mousemove', onDocumentMouseMove);
  }

  lastMouseMoveTime = now;
}
/**
 * When an element is in focus and has a tippy, leaving the tab/window and
 * returning causes it to show again. For mouse users this is unexpected, but
 * for keyboard use it makes sense.
 * TODO: find a better technique to solve this problem
 */

function onWindowBlur() {
  var activeElement = document.activeElement;

  if (isReferenceElement(activeElement)) {
    var instance = activeElement._tippy;

    if (activeElement.blur && !instance.state.isVisible) {
      activeElement.blur();
    }
  }
}
function bindGlobalEventListeners() {
  document.addEventListener('touchstart', onDocumentTouchStart, TOUCH_OPTIONS);
  window.addEventListener('blur', onWindowBlur);
}

var isBrowser = typeof window !== 'undefined' && typeof document !== 'undefined';
var isIE11 = isBrowser ? // @ts-ignore
!!window.msCrypto : false;

function createMemoryLeakWarning(method) {
  var txt = method === 'destroy' ? 'n already-' : ' ';
  return [method + "() was called on a" + txt + "destroyed instance. This is a no-op but", 'indicates a potential memory leak.'].join(' ');
}
function clean(value) {
  var spacesAndTabs = /[ \t]{2,}/g;
  var lineStartWithSpaces = /^[ \t]*/gm;
  return value.replace(spacesAndTabs, ' ').replace(lineStartWithSpaces, '').trim();
}

function getDevMessage(message) {
  return clean("\n  %ctippy.js\n\n  %c" + clean(message) + "\n\n  %c\uD83D\uDC77\u200D This is a development-only message. It will be removed in production.\n  ");
}

function getFormattedMessage(message) {
  return [getDevMessage(message), // title
  'color: #00C584; font-size: 1.3em; font-weight: bold;', // message
  'line-height: 1.5', // footer
  'color: #a6a095;'];
} // Assume warnings and errors never have the same message

var visitedMessages;

if (true) {
  resetVisitedMessages();
}

function resetVisitedMessages() {
  visitedMessages = new Set();
}
function warnWhen(condition, message) {
  if (condition && !visitedMessages.has(message)) {
    var _console;

    visitedMessages.add(message);

    (_console = console).warn.apply(_console, getFormattedMessage(message));
  }
}
function errorWhen(condition, message) {
  if (condition && !visitedMessages.has(message)) {
    var _console2;

    visitedMessages.add(message);

    (_console2 = console).error.apply(_console2, getFormattedMessage(message));
  }
}
function validateTargets(targets) {
  var didPassFalsyValue = !targets;
  var didPassPlainObject = Object.prototype.toString.call(targets) === '[object Object]' && !targets.addEventListener;
  errorWhen(didPassFalsyValue, ['tippy() was passed', '`' + String(targets) + '`', 'as its targets (first) argument. Valid types are: String, Element,', 'Element[], or NodeList.'].join(' '));
  errorWhen(didPassPlainObject, ['tippy() was passed a plain object which is not supported as an argument', 'for virtual positioning. Use props.getReferenceClientRect instead.'].join(' '));
}

var pluginProps = {
  animateFill: false,
  followCursor: false,
  inlinePositioning: false,
  sticky: false
};
var renderProps = {
  allowHTML: false,
  animation: 'fade',
  arrow: true,
  content: '',
  inertia: false,
  maxWidth: 350,
  role: 'tooltip',
  theme: '',
  zIndex: 9999
};
var defaultProps = Object.assign({
  appendTo: TIPPY_DEFAULT_APPEND_TO,
  aria: {
    content: 'auto',
    expanded: 'auto'
  },
  delay: 0,
  duration: [300, 250],
  getReferenceClientRect: null,
  hideOnClick: true,
  ignoreAttributes: false,
  interactive: false,
  interactiveBorder: 2,
  interactiveDebounce: 0,
  moveTransition: '',
  offset: [0, 10],
  onAfterUpdate: function onAfterUpdate() {},
  onBeforeUpdate: function onBeforeUpdate() {},
  onCreate: function onCreate() {},
  onDestroy: function onDestroy() {},
  onHidden: function onHidden() {},
  onHide: function onHide() {},
  onMount: function onMount() {},
  onShow: function onShow() {},
  onShown: function onShown() {},
  onTrigger: function onTrigger() {},
  onUntrigger: function onUntrigger() {},
  onClickOutside: function onClickOutside() {},
  placement: 'top',
  plugins: [],
  popperOptions: {},
  render: null,
  showOnCreate: false,
  touch: true,
  trigger: 'mouseenter focus',
  triggerTarget: null
}, pluginProps, renderProps);
var defaultKeys = Object.keys(defaultProps);
var setDefaultProps = function setDefaultProps(partialProps) {
  /* istanbul ignore else */
  if (true) {
    validateProps(partialProps, []);
  }

  var keys = Object.keys(partialProps);
  keys.forEach(function (key) {
    defaultProps[key] = partialProps[key];
  });
};
function getExtendedPassedProps(passedProps) {
  var plugins = passedProps.plugins || [];
  var pluginProps = plugins.reduce(function (acc, plugin) {
    var name = plugin.name,
        defaultValue = plugin.defaultValue;

    if (name) {
      var _name;

      acc[name] = passedProps[name] !== undefined ? passedProps[name] : (_name = defaultProps[name]) != null ? _name : defaultValue;
    }

    return acc;
  }, {});
  return Object.assign({}, passedProps, pluginProps);
}
function getDataAttributeProps(reference, plugins) {
  var propKeys = plugins ? Object.keys(getExtendedPassedProps(Object.assign({}, defaultProps, {
    plugins: plugins
  }))) : defaultKeys;
  var props = propKeys.reduce(function (acc, key) {
    var valueAsString = (reference.getAttribute("data-tippy-" + key) || '').trim();

    if (!valueAsString) {
      return acc;
    }

    if (key === 'content') {
      acc[key] = valueAsString;
    } else {
      try {
        acc[key] = JSON.parse(valueAsString);
      } catch (e) {
        acc[key] = valueAsString;
      }
    }

    return acc;
  }, {});
  return props;
}
function evaluateProps(reference, props) {
  var out = Object.assign({}, props, {
    content: invokeWithArgsOrReturn(props.content, [reference])
  }, props.ignoreAttributes ? {} : getDataAttributeProps(reference, props.plugins));
  out.aria = Object.assign({}, defaultProps.aria, out.aria);
  out.aria = {
    expanded: out.aria.expanded === 'auto' ? props.interactive : out.aria.expanded,
    content: out.aria.content === 'auto' ? props.interactive ? null : 'describedby' : out.aria.content
  };
  return out;
}
function validateProps(partialProps, plugins) {
  if (partialProps === void 0) {
    partialProps = {};
  }

  if (plugins === void 0) {
    plugins = [];
  }

  var keys = Object.keys(partialProps);
  keys.forEach(function (prop) {
    var nonPluginProps = removeProperties(defaultProps, Object.keys(pluginProps));
    var didPassUnknownProp = !hasOwnProperty(nonPluginProps, prop); // Check if the prop exists in `plugins`

    if (didPassUnknownProp) {
      didPassUnknownProp = plugins.filter(function (plugin) {
        return plugin.name === prop;
      }).length === 0;
    }

    warnWhen(didPassUnknownProp, ["`" + prop + "`", "is not a valid prop. You may have spelled it incorrectly, or if it's", 'a plugin, forgot to pass it in an array as props.plugins.', '\n\n', 'All props: https://atomiks.github.io/tippyjs/v6/all-props/\n', 'Plugins: https://atomiks.github.io/tippyjs/v6/plugins/'].join(' '));
  });
}

var innerHTML = function innerHTML() {
  return 'innerHTML';
};

function dangerouslySetInnerHTML(element, html) {
  element[innerHTML()] = html;
}

function createArrowElement(value) {
  var arrow = div();

  if (value === true) {
    arrow.className = ARROW_CLASS;
  } else {
    arrow.className = SVG_ARROW_CLASS;

    if (isElement(value)) {
      arrow.appendChild(value);
    } else {
      dangerouslySetInnerHTML(arrow, value);
    }
  }

  return arrow;
}

function setContent(content, props) {
  if (isElement(props.content)) {
    dangerouslySetInnerHTML(content, '');
    content.appendChild(props.content);
  } else if (typeof props.content !== 'function') {
    if (props.allowHTML) {
      dangerouslySetInnerHTML(content, props.content);
    } else {
      content.textContent = props.content;
    }
  }
}
function getChildren(popper) {
  var box = popper.firstElementChild;
  var boxChildren = arrayFrom(box.children);
  return {
    box: box,
    content: boxChildren.find(function (node) {
      return node.classList.contains(CONTENT_CLASS);
    }),
    arrow: boxChildren.find(function (node) {
      return node.classList.contains(ARROW_CLASS) || node.classList.contains(SVG_ARROW_CLASS);
    }),
    backdrop: boxChildren.find(function (node) {
      return node.classList.contains(BACKDROP_CLASS);
    })
  };
}
function render(instance) {
  var popper = div();
  var box = div();
  box.className = BOX_CLASS;
  box.setAttribute('data-state', 'hidden');
  box.setAttribute('tabindex', '-1');
  var content = div();
  content.className = CONTENT_CLASS;
  content.setAttribute('data-state', 'hidden');
  setContent(content, instance.props);
  popper.appendChild(box);
  box.appendChild(content);
  onUpdate(instance.props, instance.props);

  function onUpdate(prevProps, nextProps) {
    var _getChildren = getChildren(popper),
        box = _getChildren.box,
        content = _getChildren.content,
        arrow = _getChildren.arrow;

    if (nextProps.theme) {
      box.setAttribute('data-theme', nextProps.theme);
    } else {
      box.removeAttribute('data-theme');
    }

    if (typeof nextProps.animation === 'string') {
      box.setAttribute('data-animation', nextProps.animation);
    } else {
      box.removeAttribute('data-animation');
    }

    if (nextProps.inertia) {
      box.setAttribute('data-inertia', '');
    } else {
      box.removeAttribute('data-inertia');
    }

    box.style.maxWidth = typeof nextProps.maxWidth === 'number' ? nextProps.maxWidth + "px" : nextProps.maxWidth;

    if (nextProps.role) {
      box.setAttribute('role', nextProps.role);
    } else {
      box.removeAttribute('role');
    }

    if (prevProps.content !== nextProps.content || prevProps.allowHTML !== nextProps.allowHTML) {
      setContent(content, instance.props);
    }

    if (nextProps.arrow) {
      if (!arrow) {
        box.appendChild(createArrowElement(nextProps.arrow));
      } else if (prevProps.arrow !== nextProps.arrow) {
        box.removeChild(arrow);
        box.appendChild(createArrowElement(nextProps.arrow));
      }
    } else if (arrow) {
      box.removeChild(arrow);
    }
  }

  return {
    popper: popper,
    onUpdate: onUpdate
  };
} // Runtime check to identify if the render function is the default one; this
// way we can apply default CSS transitions logic and it can be tree-shaken away

render.$$tippy = true;

var idCounter = 1;
var mouseMoveListeners = []; // Used by `hideAll()`

var mountedInstances = [];
function createTippy(reference, passedProps) {
  var props = evaluateProps(reference, Object.assign({}, defaultProps, getExtendedPassedProps(removeUndefinedProps(passedProps)))); // ===========================================================================
  // 🔒 Private members
  // ===========================================================================

  var showTimeout;
  var hideTimeout;
  var scheduleHideAnimationFrame;
  var isVisibleFromClick = false;
  var didHideDueToDocumentMouseDown = false;
  var didTouchMove = false;
  var ignoreOnFirstUpdate = false;
  var lastTriggerEvent;
  var currentTransitionEndListener;
  var onFirstUpdate;
  var listeners = [];
  var debouncedOnMouseMove = debounce(onMouseMove, props.interactiveDebounce);
  var currentTarget; // ===========================================================================
  // 🔑 Public members
  // ===========================================================================

  var id = idCounter++;
  var popperInstance = null;
  var plugins = unique(props.plugins);
  var state = {
    // Is the instance currently enabled?
    isEnabled: true,
    // Is the tippy currently showing and not transitioning out?
    isVisible: false,
    // Has the instance been destroyed?
    isDestroyed: false,
    // Is the tippy currently mounted to the DOM?
    isMounted: false,
    // Has the tippy finished transitioning in?
    isShown: false
  };
  var instance = {
    // properties
    id: id,
    reference: reference,
    popper: div(),
    popperInstance: popperInstance,
    props: props,
    state: state,
    plugins: plugins,
    // methods
    clearDelayTimeouts: clearDelayTimeouts,
    setProps: setProps,
    setContent: setContent,
    show: show,
    hide: hide,
    hideWithInteractivity: hideWithInteractivity,
    enable: enable,
    disable: disable,
    unmount: unmount,
    destroy: destroy
  }; // TODO: Investigate why this early return causes a TDZ error in the tests —
  // it doesn't seem to happen in the browser

  /* istanbul ignore if */

  if (!props.render) {
    if (true) {
      errorWhen(true, 'render() function has not been supplied.');
    }

    return instance;
  } // ===========================================================================
  // Initial mutations
  // ===========================================================================


  var _props$render = props.render(instance),
      popper = _props$render.popper,
      onUpdate = _props$render.onUpdate;

  popper.setAttribute('data-tippy-root', '');
  popper.id = "tippy-" + instance.id;
  instance.popper = popper;
  reference._tippy = instance;
  popper._tippy = instance;
  var pluginsHooks = plugins.map(function (plugin) {
    return plugin.fn(instance);
  });
  var hasAriaExpanded = reference.hasAttribute('aria-expanded');
  addListeners();
  handleAriaExpandedAttribute();
  handleStyles();
  invokeHook('onCreate', [instance]);

  if (props.showOnCreate) {
    scheduleShow();
  } // Prevent a tippy with a delay from hiding if the cursor left then returned
  // before it started hiding


  popper.addEventListener('mouseenter', function () {
    if (instance.props.interactive && instance.state.isVisible) {
      instance.clearDelayTimeouts();
    }
  });
  popper.addEventListener('mouseleave', function () {
    if (instance.props.interactive && instance.props.trigger.indexOf('mouseenter') >= 0) {
      getDocument().addEventListener('mousemove', debouncedOnMouseMove);
    }
  });
  return instance; // ===========================================================================
  // 🔒 Private methods
  // ===========================================================================

  function getNormalizedTouchSettings() {
    var touch = instance.props.touch;
    return Array.isArray(touch) ? touch : [touch, 0];
  }

  function getIsCustomTouchBehavior() {
    return getNormalizedTouchSettings()[0] === 'hold';
  }

  function getIsDefaultRenderFn() {
    var _instance$props$rende;

    // @ts-ignore
    return !!((_instance$props$rende = instance.props.render) != null && _instance$props$rende.$$tippy);
  }

  function getCurrentTarget() {
    return currentTarget || reference;
  }

  function getDocument() {
    var parent = getCurrentTarget().parentNode;
    return parent ? getOwnerDocument(parent) : document;
  }

  function getDefaultTemplateChildren() {
    return getChildren(popper);
  }

  function getDelay(isShow) {
    // For touch or keyboard input, force `0` delay for UX reasons
    // Also if the instance is mounted but not visible (transitioning out),
    // ignore delay
    if (instance.state.isMounted && !instance.state.isVisible || currentInput.isTouch || lastTriggerEvent && lastTriggerEvent.type === 'focus') {
      return 0;
    }

    return getValueAtIndexOrReturn(instance.props.delay, isShow ? 0 : 1, defaultProps.delay);
  }

  function handleStyles(fromHide) {
    if (fromHide === void 0) {
      fromHide = false;
    }

    popper.style.pointerEvents = instance.props.interactive && !fromHide ? '' : 'none';
    popper.style.zIndex = "" + instance.props.zIndex;
  }

  function invokeHook(hook, args, shouldInvokePropsHook) {
    if (shouldInvokePropsHook === void 0) {
      shouldInvokePropsHook = true;
    }

    pluginsHooks.forEach(function (pluginHooks) {
      if (pluginHooks[hook]) {
        pluginHooks[hook].apply(pluginHooks, args);
      }
    });

    if (shouldInvokePropsHook) {
      var _instance$props;

      (_instance$props = instance.props)[hook].apply(_instance$props, args);
    }
  }

  function handleAriaContentAttribute() {
    var aria = instance.props.aria;

    if (!aria.content) {
      return;
    }

    var attr = "aria-" + aria.content;
    var id = popper.id;
    var nodes = normalizeToArray(instance.props.triggerTarget || reference);
    nodes.forEach(function (node) {
      var currentValue = node.getAttribute(attr);

      if (instance.state.isVisible) {
        node.setAttribute(attr, currentValue ? currentValue + " " + id : id);
      } else {
        var nextValue = currentValue && currentValue.replace(id, '').trim();

        if (nextValue) {
          node.setAttribute(attr, nextValue);
        } else {
          node.removeAttribute(attr);
        }
      }
    });
  }

  function handleAriaExpandedAttribute() {
    if (hasAriaExpanded || !instance.props.aria.expanded) {
      return;
    }

    var nodes = normalizeToArray(instance.props.triggerTarget || reference);
    nodes.forEach(function (node) {
      if (instance.props.interactive) {
        node.setAttribute('aria-expanded', instance.state.isVisible && node === getCurrentTarget() ? 'true' : 'false');
      } else {
        node.removeAttribute('aria-expanded');
      }
    });
  }

  function cleanupInteractiveMouseListeners() {
    getDocument().removeEventListener('mousemove', debouncedOnMouseMove);
    mouseMoveListeners = mouseMoveListeners.filter(function (listener) {
      return listener !== debouncedOnMouseMove;
    });
  }

  function onDocumentPress(event) {
    // Moved finger to scroll instead of an intentional tap outside
    if (currentInput.isTouch) {
      if (didTouchMove || event.type === 'mousedown') {
        return;
      }
    }

    var actualTarget = event.composedPath && event.composedPath()[0] || event.target; // Clicked on interactive popper

    if (instance.props.interactive && actualContains(popper, actualTarget)) {
      return;
    } // Clicked on the event listeners target


    if (normalizeToArray(instance.props.triggerTarget || reference).some(function (el) {
      return actualContains(el, actualTarget);
    })) {
      if (currentInput.isTouch) {
        return;
      }

      if (instance.state.isVisible && instance.props.trigger.indexOf('click') >= 0) {
        return;
      }
    } else {
      invokeHook('onClickOutside', [instance, event]);
    }

    if (instance.props.hideOnClick === true) {
      instance.clearDelayTimeouts();
      instance.hide(); // `mousedown` event is fired right before `focus` if pressing the
      // currentTarget. This lets a tippy with `focus` trigger know that it
      // should not show

      didHideDueToDocumentMouseDown = true;
      setTimeout(function () {
        didHideDueToDocumentMouseDown = false;
      }); // The listener gets added in `scheduleShow()`, but this may be hiding it
      // before it shows, and hide()'s early bail-out behavior can prevent it
      // from being cleaned up

      if (!instance.state.isMounted) {
        removeDocumentPress();
      }
    }
  }

  function onTouchMove() {
    didTouchMove = true;
  }

  function onTouchStart() {
    didTouchMove = false;
  }

  function addDocumentPress() {
    var doc = getDocument();
    doc.addEventListener('mousedown', onDocumentPress, true);
    doc.addEventListener('touchend', onDocumentPress, TOUCH_OPTIONS);
    doc.addEventListener('touchstart', onTouchStart, TOUCH_OPTIONS);
    doc.addEventListener('touchmove', onTouchMove, TOUCH_OPTIONS);
  }

  function removeDocumentPress() {
    var doc = getDocument();
    doc.removeEventListener('mousedown', onDocumentPress, true);
    doc.removeEventListener('touchend', onDocumentPress, TOUCH_OPTIONS);
    doc.removeEventListener('touchstart', onTouchStart, TOUCH_OPTIONS);
    doc.removeEventListener('touchmove', onTouchMove, TOUCH_OPTIONS);
  }

  function onTransitionedOut(duration, callback) {
    onTransitionEnd(duration, function () {
      if (!instance.state.isVisible && popper.parentNode && popper.parentNode.contains(popper)) {
        callback();
      }
    });
  }

  function onTransitionedIn(duration, callback) {
    onTransitionEnd(duration, callback);
  }

  function onTransitionEnd(duration, callback) {
    var box = getDefaultTemplateChildren().box;

    function listener(event) {
      if (event.target === box) {
        updateTransitionEndListener(box, 'remove', listener);
        callback();
      }
    } // Make callback synchronous if duration is 0
    // `transitionend` won't fire otherwise


    if (duration === 0) {
      return callback();
    }

    updateTransitionEndListener(box, 'remove', currentTransitionEndListener);
    updateTransitionEndListener(box, 'add', listener);
    currentTransitionEndListener = listener;
  }

  function on(eventType, handler, options) {
    if (options === void 0) {
      options = false;
    }

    var nodes = normalizeToArray(instance.props.triggerTarget || reference);
    nodes.forEach(function (node) {
      node.addEventListener(eventType, handler, options);
      listeners.push({
        node: node,
        eventType: eventType,
        handler: handler,
        options: options
      });
    });
  }

  function addListeners() {
    if (getIsCustomTouchBehavior()) {
      on('touchstart', onTrigger, {
        passive: true
      });
      on('touchend', onMouseLeave, {
        passive: true
      });
    }

    splitBySpaces(instance.props.trigger).forEach(function (eventType) {
      if (eventType === 'manual') {
        return;
      }

      on(eventType, onTrigger);

      switch (eventType) {
        case 'mouseenter':
          on('mouseleave', onMouseLeave);
          break;

        case 'focus':
          on(isIE11 ? 'focusout' : 'blur', onBlurOrFocusOut);
          break;

        case 'focusin':
          on('focusout', onBlurOrFocusOut);
          break;
      }
    });
  }

  function removeListeners() {
    listeners.forEach(function (_ref) {
      var node = _ref.node,
          eventType = _ref.eventType,
          handler = _ref.handler,
          options = _ref.options;
      node.removeEventListener(eventType, handler, options);
    });
    listeners = [];
  }

  function onTrigger(event) {
    var _lastTriggerEvent;

    var shouldScheduleClickHide = false;

    if (!instance.state.isEnabled || isEventListenerStopped(event) || didHideDueToDocumentMouseDown) {
      return;
    }

    var wasFocused = ((_lastTriggerEvent = lastTriggerEvent) == null ? void 0 : _lastTriggerEvent.type) === 'focus';
    lastTriggerEvent = event;
    currentTarget = event.currentTarget;
    handleAriaExpandedAttribute();

    if (!instance.state.isVisible && isMouseEvent(event)) {
      // If scrolling, `mouseenter` events can be fired if the cursor lands
      // over a new target, but `mousemove` events don't get fired. This
      // causes interactive tooltips to get stuck open until the cursor is
      // moved
      mouseMoveListeners.forEach(function (listener) {
        return listener(event);
      });
    } // Toggle show/hide when clicking click-triggered tooltips


    if (event.type === 'click' && (instance.props.trigger.indexOf('mouseenter') < 0 || isVisibleFromClick) && instance.props.hideOnClick !== false && instance.state.isVisible) {
      shouldScheduleClickHide = true;
    } else {
      scheduleShow(event);
    }

    if (event.type === 'click') {
      isVisibleFromClick = !shouldScheduleClickHide;
    }

    if (shouldScheduleClickHide && !wasFocused) {
      scheduleHide(event);
    }
  }

  function onMouseMove(event) {
    var target = event.target;
    var isCursorOverReferenceOrPopper = getCurrentTarget().contains(target) || popper.contains(target);

    if (event.type === 'mousemove' && isCursorOverReferenceOrPopper) {
      return;
    }

    var popperTreeData = getNestedPopperTree().concat(popper).map(function (popper) {
      var _instance$popperInsta;

      var instance = popper._tippy;
      var state = (_instance$popperInsta = instance.popperInstance) == null ? void 0 : _instance$popperInsta.state;

      if (state) {
        return {
          popperRect: popper.getBoundingClientRect(),
          popperState: state,
          props: props
        };
      }

      return null;
    }).filter(Boolean);

    if (isCursorOutsideInteractiveBorder(popperTreeData, event)) {
      cleanupInteractiveMouseListeners();
      scheduleHide(event);
    }
  }

  function onMouseLeave(event) {
    var shouldBail = isEventListenerStopped(event) || instance.props.trigger.indexOf('click') >= 0 && isVisibleFromClick;

    if (shouldBail) {
      return;
    }

    if (instance.props.interactive) {
      instance.hideWithInteractivity(event);
      return;
    }

    scheduleHide(event);
  }

  function onBlurOrFocusOut(event) {
    if (instance.props.trigger.indexOf('focusin') < 0 && event.target !== getCurrentTarget()) {
      return;
    } // If focus was moved to within the popper


    if (instance.props.interactive && event.relatedTarget && popper.contains(event.relatedTarget)) {
      return;
    }

    scheduleHide(event);
  }

  function isEventListenerStopped(event) {
    return currentInput.isTouch ? getIsCustomTouchBehavior() !== event.type.indexOf('touch') >= 0 : false;
  }

  function createPopperInstance() {
    destroyPopperInstance();
    var _instance$props2 = instance.props,
        popperOptions = _instance$props2.popperOptions,
        placement = _instance$props2.placement,
        offset = _instance$props2.offset,
        getReferenceClientRect = _instance$props2.getReferenceClientRect,
        moveTransition = _instance$props2.moveTransition;
    var arrow = getIsDefaultRenderFn() ? getChildren(popper).arrow : null;
    var computedReference = getReferenceClientRect ? {
      getBoundingClientRect: getReferenceClientRect,
      contextElement: getReferenceClientRect.contextElement || getCurrentTarget()
    } : reference;
    var tippyModifier = {
      name: '$$tippy',
      enabled: true,
      phase: 'beforeWrite',
      requires: ['computeStyles'],
      fn: function fn(_ref2) {
        var state = _ref2.state;

        if (getIsDefaultRenderFn()) {
          var _getDefaultTemplateCh = getDefaultTemplateChildren(),
              box = _getDefaultTemplateCh.box;

          ['placement', 'reference-hidden', 'escaped'].forEach(function (attr) {
            if (attr === 'placement') {
              box.setAttribute('data-placement', state.placement);
            } else {
              if (state.attributes.popper["data-popper-" + attr]) {
                box.setAttribute("data-" + attr, '');
              } else {
                box.removeAttribute("data-" + attr);
              }
            }
          });
          state.attributes.popper = {};
        }
      }
    };
    var modifiers = [{
      name: 'offset',
      options: {
        offset: offset
      }
    }, {
      name: 'preventOverflow',
      options: {
        padding: {
          top: 2,
          bottom: 2,
          left: 5,
          right: 5
        }
      }
    }, {
      name: 'flip',
      options: {
        padding: 5
      }
    }, {
      name: 'computeStyles',
      options: {
        adaptive: !moveTransition
      }
    }, tippyModifier];

    if (getIsDefaultRenderFn() && arrow) {
      modifiers.push({
        name: 'arrow',
        options: {
          element: arrow,
          padding: 3
        }
      });
    }

    modifiers.push.apply(modifiers, (popperOptions == null ? void 0 : popperOptions.modifiers) || []);
    instance.popperInstance = (0,_popperjs_core__WEBPACK_IMPORTED_MODULE_0__.createPopper)(computedReference, popper, Object.assign({}, popperOptions, {
      placement: placement,
      onFirstUpdate: onFirstUpdate,
      modifiers: modifiers
    }));
  }

  function destroyPopperInstance() {
    if (instance.popperInstance) {
      instance.popperInstance.destroy();
      instance.popperInstance = null;
    }
  }

  function mount() {
    var appendTo = instance.props.appendTo;
    var parentNode; // By default, we'll append the popper to the triggerTargets's parentNode so
    // it's directly after the reference element so the elements inside the
    // tippy can be tabbed to
    // If there are clipping issues, the user can specify a different appendTo
    // and ensure focus management is handled correctly manually

    var node = getCurrentTarget();

    if (instance.props.interactive && appendTo === TIPPY_DEFAULT_APPEND_TO || appendTo === 'parent') {
      parentNode = node.parentNode;
    } else {
      parentNode = invokeWithArgsOrReturn(appendTo, [node]);
    } // The popper element needs to exist on the DOM before its position can be
    // updated as Popper needs to read its dimensions


    if (!parentNode.contains(popper)) {
      parentNode.appendChild(popper);
    }

    instance.state.isMounted = true;
    createPopperInstance();
    /* istanbul ignore else */

    if (true) {
      // Accessibility check
      warnWhen(instance.props.interactive && appendTo === defaultProps.appendTo && node.nextElementSibling !== popper, ['Interactive tippy element may not be accessible via keyboard', 'navigation because it is not directly after the reference element', 'in the DOM source order.', '\n\n', 'Using a wrapper <div> or <span> tag around the reference element', 'solves this by creating a new parentNode context.', '\n\n', 'Specifying `appendTo: document.body` silences this warning, but it', 'assumes you are using a focus management solution to handle', 'keyboard navigation.', '\n\n', 'See: https://atomiks.github.io/tippyjs/v6/accessibility/#interactivity'].join(' '));
    }
  }

  function getNestedPopperTree() {
    return arrayFrom(popper.querySelectorAll('[data-tippy-root]'));
  }

  function scheduleShow(event) {
    instance.clearDelayTimeouts();

    if (event) {
      invokeHook('onTrigger', [instance, event]);
    }

    addDocumentPress();
    var delay = getDelay(true);

    var _getNormalizedTouchSe = getNormalizedTouchSettings(),
        touchValue = _getNormalizedTouchSe[0],
        touchDelay = _getNormalizedTouchSe[1];

    if (currentInput.isTouch && touchValue === 'hold' && touchDelay) {
      delay = touchDelay;
    }

    if (delay) {
      showTimeout = setTimeout(function () {
        instance.show();
      }, delay);
    } else {
      instance.show();
    }
  }

  function scheduleHide(event) {
    instance.clearDelayTimeouts();
    invokeHook('onUntrigger', [instance, event]);

    if (!instance.state.isVisible) {
      removeDocumentPress();
      return;
    } // For interactive tippies, scheduleHide is added to a document.body handler
    // from onMouseLeave so must intercept scheduled hides from mousemove/leave
    // events when trigger contains mouseenter and click, and the tip is
    // currently shown as a result of a click.


    if (instance.props.trigger.indexOf('mouseenter') >= 0 && instance.props.trigger.indexOf('click') >= 0 && ['mouseleave', 'mousemove'].indexOf(event.type) >= 0 && isVisibleFromClick) {
      return;
    }

    var delay = getDelay(false);

    if (delay) {
      hideTimeout = setTimeout(function () {
        if (instance.state.isVisible) {
          instance.hide();
        }
      }, delay);
    } else {
      // Fixes a `transitionend` problem when it fires 1 frame too
      // late sometimes, we don't want hide() to be called.
      scheduleHideAnimationFrame = requestAnimationFrame(function () {
        instance.hide();
      });
    }
  } // ===========================================================================
  // 🔑 Public methods
  // ===========================================================================


  function enable() {
    instance.state.isEnabled = true;
  }

  function disable() {
    // Disabling the instance should also hide it
    // https://github.com/atomiks/tippy.js-react/issues/106
    instance.hide();
    instance.state.isEnabled = false;
  }

  function clearDelayTimeouts() {
    clearTimeout(showTimeout);
    clearTimeout(hideTimeout);
    cancelAnimationFrame(scheduleHideAnimationFrame);
  }

  function setProps(partialProps) {
    /* istanbul ignore else */
    if (true) {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('setProps'));
    }

    if (instance.state.isDestroyed) {
      return;
    }

    invokeHook('onBeforeUpdate', [instance, partialProps]);
    removeListeners();
    var prevProps = instance.props;
    var nextProps = evaluateProps(reference, Object.assign({}, prevProps, removeUndefinedProps(partialProps), {
      ignoreAttributes: true
    }));
    instance.props = nextProps;
    addListeners();

    if (prevProps.interactiveDebounce !== nextProps.interactiveDebounce) {
      cleanupInteractiveMouseListeners();
      debouncedOnMouseMove = debounce(onMouseMove, nextProps.interactiveDebounce);
    } // Ensure stale aria-expanded attributes are removed


    if (prevProps.triggerTarget && !nextProps.triggerTarget) {
      normalizeToArray(prevProps.triggerTarget).forEach(function (node) {
        node.removeAttribute('aria-expanded');
      });
    } else if (nextProps.triggerTarget) {
      reference.removeAttribute('aria-expanded');
    }

    handleAriaExpandedAttribute();
    handleStyles();

    if (onUpdate) {
      onUpdate(prevProps, nextProps);
    }

    if (instance.popperInstance) {
      createPopperInstance(); // Fixes an issue with nested tippies if they are all getting re-rendered,
      // and the nested ones get re-rendered first.
      // https://github.com/atomiks/tippyjs-react/issues/177
      // TODO: find a cleaner / more efficient solution(!)

      getNestedPopperTree().forEach(function (nestedPopper) {
        // React (and other UI libs likely) requires a rAF wrapper as it flushes
        // its work in one
        requestAnimationFrame(nestedPopper._tippy.popperInstance.forceUpdate);
      });
    }

    invokeHook('onAfterUpdate', [instance, partialProps]);
  }

  function setContent(content) {
    instance.setProps({
      content: content
    });
  }

  function show() {
    /* istanbul ignore else */
    if (true) {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('show'));
    } // Early bail-out


    var isAlreadyVisible = instance.state.isVisible;
    var isDestroyed = instance.state.isDestroyed;
    var isDisabled = !instance.state.isEnabled;
    var isTouchAndTouchDisabled = currentInput.isTouch && !instance.props.touch;
    var duration = getValueAtIndexOrReturn(instance.props.duration, 0, defaultProps.duration);

    if (isAlreadyVisible || isDestroyed || isDisabled || isTouchAndTouchDisabled) {
      return;
    } // Normalize `disabled` behavior across browsers.
    // Firefox allows events on disabled elements, but Chrome doesn't.
    // Using a wrapper element (i.e. <span>) is recommended.


    if (getCurrentTarget().hasAttribute('disabled')) {
      return;
    }

    invokeHook('onShow', [instance], false);

    if (instance.props.onShow(instance) === false) {
      return;
    }

    instance.state.isVisible = true;

    if (getIsDefaultRenderFn()) {
      popper.style.visibility = 'visible';
    }

    handleStyles();
    addDocumentPress();

    if (!instance.state.isMounted) {
      popper.style.transition = 'none';
    } // If flipping to the opposite side after hiding at least once, the
    // animation will use the wrong placement without resetting the duration


    if (getIsDefaultRenderFn()) {
      var _getDefaultTemplateCh2 = getDefaultTemplateChildren(),
          box = _getDefaultTemplateCh2.box,
          content = _getDefaultTemplateCh2.content;

      setTransitionDuration([box, content], 0);
    }

    onFirstUpdate = function onFirstUpdate() {
      var _instance$popperInsta2;

      if (!instance.state.isVisible || ignoreOnFirstUpdate) {
        return;
      }

      ignoreOnFirstUpdate = true; // reflow

      void popper.offsetHeight;
      popper.style.transition = instance.props.moveTransition;

      if (getIsDefaultRenderFn() && instance.props.animation) {
        var _getDefaultTemplateCh3 = getDefaultTemplateChildren(),
            _box = _getDefaultTemplateCh3.box,
            _content = _getDefaultTemplateCh3.content;

        setTransitionDuration([_box, _content], duration);
        setVisibilityState([_box, _content], 'visible');
      }

      handleAriaContentAttribute();
      handleAriaExpandedAttribute();
      pushIfUnique(mountedInstances, instance); // certain modifiers (e.g. `maxSize`) require a second update after the
      // popper has been positioned for the first time

      (_instance$popperInsta2 = instance.popperInstance) == null ? void 0 : _instance$popperInsta2.forceUpdate();
      invokeHook('onMount', [instance]);

      if (instance.props.animation && getIsDefaultRenderFn()) {
        onTransitionedIn(duration, function () {
          instance.state.isShown = true;
          invokeHook('onShown', [instance]);
        });
      }
    };

    mount();
  }

  function hide() {
    /* istanbul ignore else */
    if (true) {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('hide'));
    } // Early bail-out


    var isAlreadyHidden = !instance.state.isVisible;
    var isDestroyed = instance.state.isDestroyed;
    var isDisabled = !instance.state.isEnabled;
    var duration = getValueAtIndexOrReturn(instance.props.duration, 1, defaultProps.duration);

    if (isAlreadyHidden || isDestroyed || isDisabled) {
      return;
    }

    invokeHook('onHide', [instance], false);

    if (instance.props.onHide(instance) === false) {
      return;
    }

    instance.state.isVisible = false;
    instance.state.isShown = false;
    ignoreOnFirstUpdate = false;
    isVisibleFromClick = false;

    if (getIsDefaultRenderFn()) {
      popper.style.visibility = 'hidden';
    }

    cleanupInteractiveMouseListeners();
    removeDocumentPress();
    handleStyles(true);

    if (getIsDefaultRenderFn()) {
      var _getDefaultTemplateCh4 = getDefaultTemplateChildren(),
          box = _getDefaultTemplateCh4.box,
          content = _getDefaultTemplateCh4.content;

      if (instance.props.animation) {
        setTransitionDuration([box, content], duration);
        setVisibilityState([box, content], 'hidden');
      }
    }

    handleAriaContentAttribute();
    handleAriaExpandedAttribute();

    if (instance.props.animation) {
      if (getIsDefaultRenderFn()) {
        onTransitionedOut(duration, instance.unmount);
      }
    } else {
      instance.unmount();
    }
  }

  function hideWithInteractivity(event) {
    /* istanbul ignore else */
    if (true) {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('hideWithInteractivity'));
    }

    getDocument().addEventListener('mousemove', debouncedOnMouseMove);
    pushIfUnique(mouseMoveListeners, debouncedOnMouseMove);
    debouncedOnMouseMove(event);
  }

  function unmount() {
    /* istanbul ignore else */
    if (true) {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('unmount'));
    }

    if (instance.state.isVisible) {
      instance.hide();
    }

    if (!instance.state.isMounted) {
      return;
    }

    destroyPopperInstance(); // If a popper is not interactive, it will be appended outside the popper
    // tree by default. This seems mainly for interactive tippies, but we should
    // find a workaround if possible

    getNestedPopperTree().forEach(function (nestedPopper) {
      nestedPopper._tippy.unmount();
    });

    if (popper.parentNode) {
      popper.parentNode.removeChild(popper);
    }

    mountedInstances = mountedInstances.filter(function (i) {
      return i !== instance;
    });
    instance.state.isMounted = false;
    invokeHook('onHidden', [instance]);
  }

  function destroy() {
    /* istanbul ignore else */
    if (true) {
      warnWhen(instance.state.isDestroyed, createMemoryLeakWarning('destroy'));
    }

    if (instance.state.isDestroyed) {
      return;
    }

    instance.clearDelayTimeouts();
    instance.unmount();
    removeListeners();
    delete reference._tippy;
    instance.state.isDestroyed = true;
    invokeHook('onDestroy', [instance]);
  }
}

function tippy(targets, optionalProps) {
  if (optionalProps === void 0) {
    optionalProps = {};
  }

  var plugins = defaultProps.plugins.concat(optionalProps.plugins || []);
  /* istanbul ignore else */

  if (true) {
    validateTargets(targets);
    validateProps(optionalProps, plugins);
  }

  bindGlobalEventListeners();
  var passedProps = Object.assign({}, optionalProps, {
    plugins: plugins
  });
  var elements = getArrayOfElements(targets);
  /* istanbul ignore else */

  if (true) {
    var isSingleContentElement = isElement(passedProps.content);
    var isMoreThanOneReferenceElement = elements.length > 1;
    warnWhen(isSingleContentElement && isMoreThanOneReferenceElement, ['tippy() was passed an Element as the `content` prop, but more than', 'one tippy instance was created by this invocation. This means the', 'content element will only be appended to the last tippy instance.', '\n\n', 'Instead, pass the .innerHTML of the element, or use a function that', 'returns a cloned version of the element instead.', '\n\n', '1) content: element.innerHTML\n', '2) content: () => element.cloneNode(true)'].join(' '));
  }

  var instances = elements.reduce(function (acc, reference) {
    var instance = reference && createTippy(reference, passedProps);

    if (instance) {
      acc.push(instance);
    }

    return acc;
  }, []);
  return isElement(targets) ? instances[0] : instances;
}

tippy.defaultProps = defaultProps;
tippy.setDefaultProps = setDefaultProps;
tippy.currentInput = currentInput;
var hideAll = function hideAll(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      excludedReferenceOrInstance = _ref.exclude,
      duration = _ref.duration;

  mountedInstances.forEach(function (instance) {
    var isExcluded = false;

    if (excludedReferenceOrInstance) {
      isExcluded = isReferenceElement(excludedReferenceOrInstance) ? instance.reference === excludedReferenceOrInstance : instance.popper === excludedReferenceOrInstance.popper;
    }

    if (!isExcluded) {
      var originalDuration = instance.props.duration;
      instance.setProps({
        duration: duration
      });
      instance.hide();

      if (!instance.state.isDestroyed) {
        instance.setProps({
          duration: originalDuration
        });
      }
    }
  });
};

// every time the popper is destroyed (i.e. a new target), removing the styles
// and causing transitions to break for singletons when the console is open, but
// most notably for non-transform styles being used, `gpuAcceleration: false`.

var applyStylesModifier = Object.assign({}, _popperjs_core__WEBPACK_IMPORTED_MODULE_1__["default"], {
  effect: function effect(_ref) {
    var state = _ref.state;
    var initialStyles = {
      popper: {
        position: state.options.strategy,
        left: '0',
        top: '0',
        margin: '0'
      },
      arrow: {
        position: 'absolute'
      },
      reference: {}
    };
    Object.assign(state.elements.popper.style, initialStyles.popper);
    state.styles = initialStyles;

    if (state.elements.arrow) {
      Object.assign(state.elements.arrow.style, initialStyles.arrow);
    } // intentionally return no cleanup function
    // return () => { ... }

  }
});

var createSingleton = function createSingleton(tippyInstances, optionalProps) {
  var _optionalProps$popper;

  if (optionalProps === void 0) {
    optionalProps = {};
  }

  /* istanbul ignore else */
  if (true) {
    errorWhen(!Array.isArray(tippyInstances), ['The first argument passed to createSingleton() must be an array of', 'tippy instances. The passed value was', String(tippyInstances)].join(' '));
  }

  var individualInstances = tippyInstances;
  var references = [];
  var triggerTargets = [];
  var currentTarget;
  var overrides = optionalProps.overrides;
  var interceptSetPropsCleanups = [];
  var shownOnCreate = false;

  function setTriggerTargets() {
    triggerTargets = individualInstances.map(function (instance) {
      return normalizeToArray(instance.props.triggerTarget || instance.reference);
    }).reduce(function (acc, item) {
      return acc.concat(item);
    }, []);
  }

  function setReferences() {
    references = individualInstances.map(function (instance) {
      return instance.reference;
    });
  }

  function enableInstances(isEnabled) {
    individualInstances.forEach(function (instance) {
      if (isEnabled) {
        instance.enable();
      } else {
        instance.disable();
      }
    });
  }

  function interceptSetProps(singleton) {
    return individualInstances.map(function (instance) {
      var originalSetProps = instance.setProps;

      instance.setProps = function (props) {
        originalSetProps(props);

        if (instance.reference === currentTarget) {
          singleton.setProps(props);
        }
      };

      return function () {
        instance.setProps = originalSetProps;
      };
    });
  } // have to pass singleton, as it maybe undefined on first call


  function prepareInstance(singleton, target) {
    var index = triggerTargets.indexOf(target); // bail-out

    if (target === currentTarget) {
      return;
    }

    currentTarget = target;
    var overrideProps = (overrides || []).concat('content').reduce(function (acc, prop) {
      acc[prop] = individualInstances[index].props[prop];
      return acc;
    }, {});
    singleton.setProps(Object.assign({}, overrideProps, {
      getReferenceClientRect: typeof overrideProps.getReferenceClientRect === 'function' ? overrideProps.getReferenceClientRect : function () {
        var _references$index;

        return (_references$index = references[index]) == null ? void 0 : _references$index.getBoundingClientRect();
      }
    }));
  }

  enableInstances(false);
  setReferences();
  setTriggerTargets();
  var plugin = {
    fn: function fn() {
      return {
        onDestroy: function onDestroy() {
          enableInstances(true);
        },
        onHidden: function onHidden() {
          currentTarget = null;
        },
        onClickOutside: function onClickOutside(instance) {
          if (instance.props.showOnCreate && !shownOnCreate) {
            shownOnCreate = true;
            currentTarget = null;
          }
        },
        onShow: function onShow(instance) {
          if (instance.props.showOnCreate && !shownOnCreate) {
            shownOnCreate = true;
            prepareInstance(instance, references[0]);
          }
        },
        onTrigger: function onTrigger(instance, event) {
          prepareInstance(instance, event.currentTarget);
        }
      };
    }
  };
  var singleton = tippy(div(), Object.assign({}, removeProperties(optionalProps, ['overrides']), {
    plugins: [plugin].concat(optionalProps.plugins || []),
    triggerTarget: triggerTargets,
    popperOptions: Object.assign({}, optionalProps.popperOptions, {
      modifiers: [].concat(((_optionalProps$popper = optionalProps.popperOptions) == null ? void 0 : _optionalProps$popper.modifiers) || [], [applyStylesModifier])
    })
  }));
  var originalShow = singleton.show;

  singleton.show = function (target) {
    originalShow(); // first time, showOnCreate or programmatic call with no params
    // default to showing first instance

    if (!currentTarget && target == null) {
      return prepareInstance(singleton, references[0]);
    } // triggered from event (do nothing as prepareInstance already called by onTrigger)
    // programmatic call with no params when already visible (do nothing again)


    if (currentTarget && target == null) {
      return;
    } // target is index of instance


    if (typeof target === 'number') {
      return references[target] && prepareInstance(singleton, references[target]);
    } // target is a child tippy instance


    if (individualInstances.indexOf(target) >= 0) {
      var ref = target.reference;
      return prepareInstance(singleton, ref);
    } // target is a ReferenceElement


    if (references.indexOf(target) >= 0) {
      return prepareInstance(singleton, target);
    }
  };

  singleton.showNext = function () {
    var first = references[0];

    if (!currentTarget) {
      return singleton.show(0);
    }

    var index = references.indexOf(currentTarget);
    singleton.show(references[index + 1] || first);
  };

  singleton.showPrevious = function () {
    var last = references[references.length - 1];

    if (!currentTarget) {
      return singleton.show(last);
    }

    var index = references.indexOf(currentTarget);
    var target = references[index - 1] || last;
    singleton.show(target);
  };

  var originalSetProps = singleton.setProps;

  singleton.setProps = function (props) {
    overrides = props.overrides || overrides;
    originalSetProps(props);
  };

  singleton.setInstances = function (nextInstances) {
    enableInstances(true);
    interceptSetPropsCleanups.forEach(function (fn) {
      return fn();
    });
    individualInstances = nextInstances;
    enableInstances(false);
    setReferences();
    setTriggerTargets();
    interceptSetPropsCleanups = interceptSetProps(singleton);
    singleton.setProps({
      triggerTarget: triggerTargets
    });
  };

  interceptSetPropsCleanups = interceptSetProps(singleton);
  return singleton;
};

var BUBBLING_EVENTS_MAP = {
  mouseover: 'mouseenter',
  focusin: 'focus',
  click: 'click'
};
/**
 * Creates a delegate instance that controls the creation of tippy instances
 * for child elements (`target` CSS selector).
 */

function delegate(targets, props) {
  /* istanbul ignore else */
  if (true) {
    errorWhen(!(props && props.target), ['You must specity a `target` prop indicating a CSS selector string matching', 'the target elements that should receive a tippy.'].join(' '));
  }

  var listeners = [];
  var childTippyInstances = [];
  var disabled = false;
  var target = props.target;
  var nativeProps = removeProperties(props, ['target']);
  var parentProps = Object.assign({}, nativeProps, {
    trigger: 'manual',
    touch: false
  });
  var childProps = Object.assign({
    touch: defaultProps.touch
  }, nativeProps, {
    showOnCreate: true
  });
  var returnValue = tippy(targets, parentProps);
  var normalizedReturnValue = normalizeToArray(returnValue);

  function onTrigger(event) {
    if (!event.target || disabled) {
      return;
    }

    var targetNode = event.target.closest(target);

    if (!targetNode) {
      return;
    } // Get relevant trigger with fallbacks:
    // 1. Check `data-tippy-trigger` attribute on target node
    // 2. Fallback to `trigger` passed to `delegate()`
    // 3. Fallback to `defaultProps.trigger`


    var trigger = targetNode.getAttribute('data-tippy-trigger') || props.trigger || defaultProps.trigger; // @ts-ignore

    if (targetNode._tippy) {
      return;
    }

    if (event.type === 'touchstart' && typeof childProps.touch === 'boolean') {
      return;
    }

    if (event.type !== 'touchstart' && trigger.indexOf(BUBBLING_EVENTS_MAP[event.type]) < 0) {
      return;
    }

    var instance = tippy(targetNode, childProps);

    if (instance) {
      childTippyInstances = childTippyInstances.concat(instance);
    }
  }

  function on(node, eventType, handler, options) {
    if (options === void 0) {
      options = false;
    }

    node.addEventListener(eventType, handler, options);
    listeners.push({
      node: node,
      eventType: eventType,
      handler: handler,
      options: options
    });
  }

  function addEventListeners(instance) {
    var reference = instance.reference;
    on(reference, 'touchstart', onTrigger, TOUCH_OPTIONS);
    on(reference, 'mouseover', onTrigger);
    on(reference, 'focusin', onTrigger);
    on(reference, 'click', onTrigger);
  }

  function removeEventListeners() {
    listeners.forEach(function (_ref) {
      var node = _ref.node,
          eventType = _ref.eventType,
          handler = _ref.handler,
          options = _ref.options;
      node.removeEventListener(eventType, handler, options);
    });
    listeners = [];
  }

  function applyMutations(instance) {
    var originalDestroy = instance.destroy;
    var originalEnable = instance.enable;
    var originalDisable = instance.disable;

    instance.destroy = function (shouldDestroyChildInstances) {
      if (shouldDestroyChildInstances === void 0) {
        shouldDestroyChildInstances = true;
      }

      if (shouldDestroyChildInstances) {
        childTippyInstances.forEach(function (instance) {
          instance.destroy();
        });
      }

      childTippyInstances = [];
      removeEventListeners();
      originalDestroy();
    };

    instance.enable = function () {
      originalEnable();
      childTippyInstances.forEach(function (instance) {
        return instance.enable();
      });
      disabled = false;
    };

    instance.disable = function () {
      originalDisable();
      childTippyInstances.forEach(function (instance) {
        return instance.disable();
      });
      disabled = true;
    };

    addEventListeners(instance);
  }

  normalizedReturnValue.forEach(applyMutations);
  return returnValue;
}

var animateFill = {
  name: 'animateFill',
  defaultValue: false,
  fn: function fn(instance) {
    var _instance$props$rende;

    // @ts-ignore
    if (!((_instance$props$rende = instance.props.render) != null && _instance$props$rende.$$tippy)) {
      if (true) {
        errorWhen(instance.props.animateFill, 'The `animateFill` plugin requires the default render function.');
      }

      return {};
    }

    var _getChildren = getChildren(instance.popper),
        box = _getChildren.box,
        content = _getChildren.content;

    var backdrop = instance.props.animateFill ? createBackdropElement() : null;
    return {
      onCreate: function onCreate() {
        if (backdrop) {
          box.insertBefore(backdrop, box.firstElementChild);
          box.setAttribute('data-animatefill', '');
          box.style.overflow = 'hidden';
          instance.setProps({
            arrow: false,
            animation: 'shift-away'
          });
        }
      },
      onMount: function onMount() {
        if (backdrop) {
          var transitionDuration = box.style.transitionDuration;
          var duration = Number(transitionDuration.replace('ms', '')); // The content should fade in after the backdrop has mostly filled the
          // tooltip element. `clip-path` is the other alternative but is not
          // well-supported and is buggy on some devices.

          content.style.transitionDelay = Math.round(duration / 10) + "ms";
          backdrop.style.transitionDuration = transitionDuration;
          setVisibilityState([backdrop], 'visible');
        }
      },
      onShow: function onShow() {
        if (backdrop) {
          backdrop.style.transitionDuration = '0ms';
        }
      },
      onHide: function onHide() {
        if (backdrop) {
          setVisibilityState([backdrop], 'hidden');
        }
      }
    };
  }
};

function createBackdropElement() {
  var backdrop = div();
  backdrop.className = BACKDROP_CLASS;
  setVisibilityState([backdrop], 'hidden');
  return backdrop;
}

var mouseCoords = {
  clientX: 0,
  clientY: 0
};
var activeInstances = [];

function storeMouseCoords(_ref) {
  var clientX = _ref.clientX,
      clientY = _ref.clientY;
  mouseCoords = {
    clientX: clientX,
    clientY: clientY
  };
}

function addMouseCoordsListener(doc) {
  doc.addEventListener('mousemove', storeMouseCoords);
}

function removeMouseCoordsListener(doc) {
  doc.removeEventListener('mousemove', storeMouseCoords);
}

var followCursor = {
  name: 'followCursor',
  defaultValue: false,
  fn: function fn(instance) {
    var reference = instance.reference;
    var doc = getOwnerDocument(instance.props.triggerTarget || reference);
    var isInternalUpdate = false;
    var wasFocusEvent = false;
    var isUnmounted = true;
    var prevProps = instance.props;

    function getIsInitialBehavior() {
      return instance.props.followCursor === 'initial' && instance.state.isVisible;
    }

    function addListener() {
      doc.addEventListener('mousemove', onMouseMove);
    }

    function removeListener() {
      doc.removeEventListener('mousemove', onMouseMove);
    }

    function unsetGetReferenceClientRect() {
      isInternalUpdate = true;
      instance.setProps({
        getReferenceClientRect: null
      });
      isInternalUpdate = false;
    }

    function onMouseMove(event) {
      // If the instance is interactive, avoid updating the position unless it's
      // over the reference element
      var isCursorOverReference = event.target ? reference.contains(event.target) : true;
      var followCursor = instance.props.followCursor;
      var clientX = event.clientX,
          clientY = event.clientY;
      var rect = reference.getBoundingClientRect();
      var relativeX = clientX - rect.left;
      var relativeY = clientY - rect.top;

      if (isCursorOverReference || !instance.props.interactive) {
        instance.setProps({
          // @ts-ignore - unneeded DOMRect properties
          getReferenceClientRect: function getReferenceClientRect() {
            var rect = reference.getBoundingClientRect();
            var x = clientX;
            var y = clientY;

            if (followCursor === 'initial') {
              x = rect.left + relativeX;
              y = rect.top + relativeY;
            }

            var top = followCursor === 'horizontal' ? rect.top : y;
            var right = followCursor === 'vertical' ? rect.right : x;
            var bottom = followCursor === 'horizontal' ? rect.bottom : y;
            var left = followCursor === 'vertical' ? rect.left : x;
            return {
              width: right - left,
              height: bottom - top,
              top: top,
              right: right,
              bottom: bottom,
              left: left
            };
          }
        });
      }
    }

    function create() {
      if (instance.props.followCursor) {
        activeInstances.push({
          instance: instance,
          doc: doc
        });
        addMouseCoordsListener(doc);
      }
    }

    function destroy() {
      activeInstances = activeInstances.filter(function (data) {
        return data.instance !== instance;
      });

      if (activeInstances.filter(function (data) {
        return data.doc === doc;
      }).length === 0) {
        removeMouseCoordsListener(doc);
      }
    }

    return {
      onCreate: create,
      onDestroy: destroy,
      onBeforeUpdate: function onBeforeUpdate() {
        prevProps = instance.props;
      },
      onAfterUpdate: function onAfterUpdate(_, _ref2) {
        var followCursor = _ref2.followCursor;

        if (isInternalUpdate) {
          return;
        }

        if (followCursor !== undefined && prevProps.followCursor !== followCursor) {
          destroy();

          if (followCursor) {
            create();

            if (instance.state.isMounted && !wasFocusEvent && !getIsInitialBehavior()) {
              addListener();
            }
          } else {
            removeListener();
            unsetGetReferenceClientRect();
          }
        }
      },
      onMount: function onMount() {
        if (instance.props.followCursor && !wasFocusEvent) {
          if (isUnmounted) {
            onMouseMove(mouseCoords);
            isUnmounted = false;
          }

          if (!getIsInitialBehavior()) {
            addListener();
          }
        }
      },
      onTrigger: function onTrigger(_, event) {
        if (isMouseEvent(event)) {
          mouseCoords = {
            clientX: event.clientX,
            clientY: event.clientY
          };
        }

        wasFocusEvent = event.type === 'focus';
      },
      onHidden: function onHidden() {
        if (instance.props.followCursor) {
          unsetGetReferenceClientRect();
          removeListener();
          isUnmounted = true;
        }
      }
    };
  }
};

function getProps(props, modifier) {
  var _props$popperOptions;

  return {
    popperOptions: Object.assign({}, props.popperOptions, {
      modifiers: [].concat((((_props$popperOptions = props.popperOptions) == null ? void 0 : _props$popperOptions.modifiers) || []).filter(function (_ref) {
        var name = _ref.name;
        return name !== modifier.name;
      }), [modifier])
    })
  };
}

var inlinePositioning = {
  name: 'inlinePositioning',
  defaultValue: false,
  fn: function fn(instance) {
    var reference = instance.reference;

    function isEnabled() {
      return !!instance.props.inlinePositioning;
    }

    var placement;
    var cursorRectIndex = -1;
    var isInternalUpdate = false;
    var triedPlacements = [];
    var modifier = {
      name: 'tippyInlinePositioning',
      enabled: true,
      phase: 'afterWrite',
      fn: function fn(_ref2) {
        var state = _ref2.state;

        if (isEnabled()) {
          if (triedPlacements.indexOf(state.placement) !== -1) {
            triedPlacements = [];
          }

          if (placement !== state.placement && triedPlacements.indexOf(state.placement) === -1) {
            triedPlacements.push(state.placement);
            instance.setProps({
              // @ts-ignore - unneeded DOMRect properties
              getReferenceClientRect: function getReferenceClientRect() {
                return _getReferenceClientRect(state.placement);
              }
            });
          }

          placement = state.placement;
        }
      }
    };

    function _getReferenceClientRect(placement) {
      return getInlineBoundingClientRect(getBasePlacement(placement), reference.getBoundingClientRect(), arrayFrom(reference.getClientRects()), cursorRectIndex);
    }

    function setInternalProps(partialProps) {
      isInternalUpdate = true;
      instance.setProps(partialProps);
      isInternalUpdate = false;
    }

    function addModifier() {
      if (!isInternalUpdate) {
        setInternalProps(getProps(instance.props, modifier));
      }
    }

    return {
      onCreate: addModifier,
      onAfterUpdate: addModifier,
      onTrigger: function onTrigger(_, event) {
        if (isMouseEvent(event)) {
          var rects = arrayFrom(instance.reference.getClientRects());
          var cursorRect = rects.find(function (rect) {
            return rect.left - 2 <= event.clientX && rect.right + 2 >= event.clientX && rect.top - 2 <= event.clientY && rect.bottom + 2 >= event.clientY;
          });
          var index = rects.indexOf(cursorRect);
          cursorRectIndex = index > -1 ? index : cursorRectIndex;
        }
      },
      onHidden: function onHidden() {
        cursorRectIndex = -1;
      }
    };
  }
};
function getInlineBoundingClientRect(currentBasePlacement, boundingRect, clientRects, cursorRectIndex) {
  // Not an inline element, or placement is not yet known
  if (clientRects.length < 2 || currentBasePlacement === null) {
    return boundingRect;
  } // There are two rects and they are disjoined


  if (clientRects.length === 2 && cursorRectIndex >= 0 && clientRects[0].left > clientRects[1].right) {
    return clientRects[cursorRectIndex] || boundingRect;
  }

  switch (currentBasePlacement) {
    case 'top':
    case 'bottom':
      {
        var firstRect = clientRects[0];
        var lastRect = clientRects[clientRects.length - 1];
        var isTop = currentBasePlacement === 'top';
        var top = firstRect.top;
        var bottom = lastRect.bottom;
        var left = isTop ? firstRect.left : lastRect.left;
        var right = isTop ? firstRect.right : lastRect.right;
        var width = right - left;
        var height = bottom - top;
        return {
          top: top,
          bottom: bottom,
          left: left,
          right: right,
          width: width,
          height: height
        };
      }

    case 'left':
    case 'right':
      {
        var minLeft = Math.min.apply(Math, clientRects.map(function (rects) {
          return rects.left;
        }));
        var maxRight = Math.max.apply(Math, clientRects.map(function (rects) {
          return rects.right;
        }));
        var measureRects = clientRects.filter(function (rect) {
          return currentBasePlacement === 'left' ? rect.left === minLeft : rect.right === maxRight;
        });
        var _top = measureRects[0].top;
        var _bottom = measureRects[measureRects.length - 1].bottom;
        var _left = minLeft;
        var _right = maxRight;

        var _width = _right - _left;

        var _height = _bottom - _top;

        return {
          top: _top,
          bottom: _bottom,
          left: _left,
          right: _right,
          width: _width,
          height: _height
        };
      }

    default:
      {
        return boundingRect;
      }
  }
}

var sticky = {
  name: 'sticky',
  defaultValue: false,
  fn: function fn(instance) {
    var reference = instance.reference,
        popper = instance.popper;

    function getReference() {
      return instance.popperInstance ? instance.popperInstance.state.elements.reference : reference;
    }

    function shouldCheck(value) {
      return instance.props.sticky === true || instance.props.sticky === value;
    }

    var prevRefRect = null;
    var prevPopRect = null;

    function updatePosition() {
      var currentRefRect = shouldCheck('reference') ? getReference().getBoundingClientRect() : null;
      var currentPopRect = shouldCheck('popper') ? popper.getBoundingClientRect() : null;

      if (currentRefRect && areRectsDifferent(prevRefRect, currentRefRect) || currentPopRect && areRectsDifferent(prevPopRect, currentPopRect)) {
        if (instance.popperInstance) {
          instance.popperInstance.update();
        }
      }

      prevRefRect = currentRefRect;
      prevPopRect = currentPopRect;

      if (instance.state.isMounted) {
        requestAnimationFrame(updatePosition);
      }
    }

    return {
      onMount: function onMount() {
        if (instance.props.sticky) {
          updatePosition();
        }
      }
    };
  }
};

function areRectsDifferent(rectA, rectB) {
  if (rectA && rectB) {
    return rectA.top !== rectB.top || rectA.right !== rectB.right || rectA.bottom !== rectB.bottom || rectA.left !== rectB.left;
  }

  return true;
}

tippy.setDefaultProps({
  render: render
});

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tippy);

//# sourceMappingURL=tippy.esm.js.map


/***/ }),

/***/ "./src/domCreation.js":
/*!****************************!*\
  !*** ./src/domCreation.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function createElementsDom(elementType,attributes,innerHTML,innerText,appendChild) {
    
    if(elementType){
        let element = document.createElement(elementType);
  
        if (attributes) {
            for (const key in attributes){
                element.setAttribute(key,attributes[key])
            }
        }

        if (innerHTML) {
            element.innerHTML= innerHTML;

        }    
        if (innerText) {
            element.innerText = innerText;

        }
        if(appendChild) {
            appendChild.appendChild(element);
            
        } 

        return element;
    }
    
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (createElementsDom);

/***/ }),

/***/ "./src/projects.js":
/*!*************************!*\
  !*** ./src/projects.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "countChilds": () => (/* binding */ countChilds),
/* harmony export */   "createPopUpNewProject": () => (/* binding */ createPopUpNewProject),
/* harmony export */   "defaultProject": () => (/* binding */ defaultProject),
/* harmony export */   "findProjectById": () => (/* binding */ findProjectById),
/* harmony export */   "itemProject": () => (/* binding */ itemProject),
/* harmony export */   "itemProjectMobile": () => (/* binding */ itemProjectMobile),
/* harmony export */   "menuMobile": () => (/* binding */ menuMobile),
/* harmony export */   "populateStorageP": () => (/* binding */ populateStorageP),
/* harmony export */   "projectIdSelected": () => (/* binding */ projectIdSelected),
/* harmony export */   "projects": () => (/* binding */ projects)
/* harmony export */ });
/* harmony import */ var _domCreation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domCreation.js */ "./src/domCreation.js");
/* harmony import */ var _pubSub_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pubSub.js */ "./src/pubSub.js");
/* harmony import */ var _todos_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./todos.js */ "./src/todos.js");
/* harmony import */ var tippy_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tippy.js */ "./node_modules/tippy.js/dist/tippy.esm.js");
/* harmony import */ var tippy_js_themes_light_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tippy.js/themes/light.css */ "./node_modules/tippy.js/themes/light.css");
/* harmony import */ var tippy_js_animations_scale_subtle_css__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tippy.js/animations/scale-subtle.css */ "./node_modules/tippy.js/animations/scale-subtle.css");













let colorInputColor;
let countChilds = 0;
let projects = [];
let projectIdSelected = 0;

const arrNewProject = [

    {
        elementType: 'div',
        attributes: {class:'containerNewProject'},
        appendChild: '.containerTodoLeft',

    },

    //  childs containerNewProject

    {
        elementType: 'p',
        attributes: {class:'titleNewProject'},
        innerText: 'Name',
        appendChild: '.containerNewProject',

    },

    {
        elementType: 'div',
        attributes: {class:'btnClosePopUp'},
        innerHTML: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 12L12 4M4 4L12 12" stroke="#E6E1E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        appendChild: '.containerNewProject',
    },

    {
        elementType: 'div',
        attributes: {class:'containerInputText'},
        innerHTML: '<input class ="inputText" type="text" name="nameProject" required>',
        appendChild: '.containerNewProject',

    },
    
    {
        elementType: 'div',
        attributes: {class:'btnCreateProject'},
        innerHTML: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.00033 2.66666V13.3333M13.3337 7.99999L2.66699 7.99999" stroke="#E6E1E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        appendChild: '.containerNewProject',
    },

    // child containerinputText

    {
        elementType: 'div',
        attributes: {class:'containerInputColor'},
        innerHTML: '<input type="color" class="inputColor">',
        appendChild: '.containerInputText',

    },


];
const arrNewProjectMobile = [

    {
        elementType: 'div',
        attributes: {class:' containerNewProjectM'},
        appendChild: 'body',

    },

    //  childs containerNewProject

    {
        elementType: 'p',
        attributes: {class:'titleNewProject'},
        innerText: 'Name',
        appendChild: '.containerNewProjectM',

    },

    {
        elementType: 'div',
        attributes: {class:'btnClosePopUp'},
        innerHTML: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 12L12 4M4 4L12 12" stroke="#E6E1E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        appendChild: '.containerNewProjectM',
    },

    {
        elementType: 'div',
        attributes: {class:'containerInputText'},
        innerHTML: '<input class ="inputText" type="text" name="nameProject" required>',
        appendChild: '.containerNewProjectM',

    },
    
    {
        elementType: 'div',
        attributes: {class:'btnCreateProject'},
        innerHTML: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.00033 2.66666V13.3333M13.3337 7.99999L2.66699 7.99999" stroke="#E6E1E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        appendChild: '.containerNewProjectM',
    },

    // child containerinputText

    {
        elementType: 'div',
        attributes: {class:'containerInputColor'},
        innerHTML: '<input type="color" class="inputColor">',
        appendChild: '.containerInputText',

    },


];

const itemProject = [
    {
        elementType: 'div',
        attributes: {class:'itemProject', 'data-project-id': '0',style:"background-color: #25A7B9;"},
        appendChild: '.containerProjects',
    },
]

const itemProjectMobile = [

    {
        elementType: 'div',
        attributes: {class:'containerItemProjectMobile'},
        appendChild: '.containerItemsProjects',

    },


    {
        elementType: 'div',
        attributes: {class:'colorItemProject',style:"background-color: #25A7B9;"},
        appendChild: '.containerItemProjectMobile',
    },

    {
        elementType: 'p',
        attributes: {class:'titleProjectMobile'},
        innerText: 'Name',
        appendChild: '.containerItemProjectMobile',

    },

    
]

const arrContainerProjectsMobile = [

    {
        elementType: 'div',
        attributes: {class:'containerProjectsMobile',style:'position:absolute; bottom: 50px;'},
        appendChild: 'body',

    },


    {
        elementType: 'div',
        attributes: {class:'outerM'},
        appendChild: '.containerProjectsMobile',

    },
    {
        elementType: 'div',
        attributes: {class:'containerItemsProjects'},
        appendChild: '.outerM',

    },

    {
        elementType: 'div',
        attributes: {class:'btnNewProjectM'},
        innerHTML: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4V20M20 12L4 12" stroke="#E6E1E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        appendChild: '.containerProjectsMobile',
    },


]

function domElements(arr) {

    arr.forEach(elementObject => {
        
        ;(0,_domCreation_js__WEBPACK_IMPORTED_MODULE_0__["default"])(elementObject.elementType,elementObject.attributes,elementObject.innerHTML,elementObject.innerText,document.querySelector(elementObject.appendChild));
        
    });
   
}  

function createObjProject(projectName,projectColor,projectId) {
    
    this.name = projectName;
    this.color = projectColor;
    this.id = projectId;
    this.todo = [];
    this.isTipName = false;

    this.onHover = function() {
        if (!this.isTipName) {

            this.isTipName = true;
            
        }
    };

    this.addTodo = function(obj){

        this.todo.push(obj);
        _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('todoCreated', obj);

    }
};

function defaultProject() {
    

    if (!projects[0]) {

        let titleTodoProject = document.querySelector('.titleTodoProject');

        createObjs('default','#25A7B9',0);

        _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionGhostEntryProjects','.itemProject')

        projects[0].addTodo((0,_todos_js__WEBPACK_IMPORTED_MODULE_2__.defaultTodo)())

        titleTodoProject.innerText = `To do - ${findProjectById(projects[0].id).name}`;
    }

    
    

};

function changeProject() {
    
    let titleTodoProject = document.querySelector('.titleTodoProject');
    let containerProjects = document.querySelector('.containerProjects');
    let containerProjectsM = document.querySelector('.containerProjectsMobile');

    containerProjects.addEventListener('click', (e) => {

        let projectTarget = e.target;

        if (!projectTarget.classList.contains('containerProjects')) {

            let projectId = projectTarget.dataset.projectId;
            projectIdSelected = projectId;


            _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionChangeTitle','.titleTodoProject')

            setTimeout(() => {

                titleTodoProject.innerText = `To do - ${findProjectById(projectId).name}`;

            },200)


            const projectObjSelected = projects.find(project => project.id == projectId);
            
            _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('changeProject',projectObjSelected.todo);
            let arrTagets = ['.TP'];
            _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionGhostOut',arrTagets)

            findProjectById(projectId).todo.forEach( todo => {
                
                if (todo.isTipPriority == true) {
                    todo.isTipPriority = false;
                }

            } )

            let containerTodo = document.querySelector('.containerTodo');
            let childs = Array.from(containerTodo.children);
            
            childs.forEach((todo) => {
                if (!todo.classList.contains('btnNewTodo')) {

                    let colorBgBtn = getComputedStyle(todo.children[3]).getPropertyValue('--backContainerSecond');
                    let arrColorAndBtn1 = [todo.children[3],colorBgBtn,'#3f3852'];

                    _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionBgBtn',arrColorAndBtn1)
                }
            })

         

            ;(0,_todos_js__WEBPACK_IMPORTED_MODULE_2__.restartTodoTipPriority)();
        }       

    });


}

function findProjectById(projectId) {

    let foundProject = null;
    projects.forEach((project) => {

        if (project.id == projectId) {

            foundProject = project;

        }
    });

    return foundProject;
}

function createPopUpNewProject() {

    const btnNewProject = document.querySelector('.btnNewProject');

    let colorBgBtn = getComputedStyle(btnNewProject).getPropertyValue('--backgroundMain');

    let arrColorAndBtn = [btnNewProject,colorBgBtn,'#2b2636'];

    _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionBgBtn', arrColorAndBtn)
    
    exist();
    defaultProject();
    changeProject()
    hoverProject();
    todayAndWeekTipName();
    projectSelected();
    
    btnNewProject.addEventListener('click', (e) => {

        _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionBtnClick',btnNewProject)

        let target = e.target;
        if (!target.parentNode.lastChild.classList.contains('containerNewProject')) {


            domElements(arrNewProject);
            
            let containerNewProject = document.querySelector('.containerNewProject');

            _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('animationEntry', containerNewProject)

            closeCreatorProject();
            addNewProject();
            syncInputColor();
            getColorFromInputColor()
        }        

    });

    

}

function addNewProject() {

    const btnAddProject = document.querySelector('.btnCreateProject'); 
    const inputText = document.querySelector('.inputText');
    let containerProjects = document.querySelector('.containerProjects');

    let colorBgBtn = getComputedStyle(btnAddProject).getPropertyValue('--backContainer');

    let arrColorAndBtn1 = [btnAddProject,colorBgBtn,'#2b2636'];

    _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionBgBtn',arrColorAndBtn1)


    btnAddProject.addEventListener('click', () => {
        countChilds++;

        _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionHeight', containerProjects)

        createObjs(inputText.value,colorInputColor,countChilds);

        _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionGhostEntryProjects', containerProjects.lastChild)       
        
        _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('projectAddedFlash', colorInputColor)

        const containerNewProject = document.querySelector('.containerNewProject');
        const containerNewProjectM = document.querySelector('.containerNewProjectM');

        containerNewProject ? _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('animationOut', containerNewProject) : _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('animationOut', containerNewProjectM); 
        setTimeout(() => {

            if (containerNewProject) {
                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('deleteElement', containerNewProject)                
            }else{
                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('deleteElement', containerNewProjectM)
            }

        },100)

    })
}
function createObjs(projetName,color,projectId) {
    let projectItem;
    let containerProjects = document.querySelector('.containerProjects');
    if (projetName == '') {

        projectItem = new createObjProject(`Project-${countChilds}`,color,projectId);
        _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('projectCreated',projectItem)
    }else{

        projectItem = new createObjProject(projetName,color,projectId);
        _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('projectCreated',projectItem)
      
    }
    projects.push(projectItem);
    populateStorageP();

 
}

function syncInputColor() {
    
    const inputColor = document.querySelector('.inputColor');
    inputColor.addEventListener('input', () => {

        document.documentElement.style.setProperty("--divColorInput", inputColor.value);

    })

}

function getColorFromInputColor() {
    
    const inputColor = document.querySelector('.inputColor');
    inputColor.addEventListener('input', () => {

        colorInputColor = inputColor.value;
    })


}

function closeCreatorProject() {

    const btnClosePopUp = document.querySelector('.btnClosePopUp');
    const containerNewProject = document.querySelector('.containerNewProject');
    const containerNewProjectM = document.querySelector('.containerNewProjectM');

    let colorBgBtn = getComputedStyle(btnClosePopUp).getPropertyValue('--backContainer');

    let arrColorAndBtn1 = [btnClosePopUp,colorBgBtn,'#2b2636'];

    _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionBgBtn',arrColorAndBtn1)

    btnClosePopUp.addEventListener('click', () => {

        containerNewProject ? _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('animationOut', containerNewProject) : _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('animationOut', containerNewProjectM); 

        setTimeout(() => {

            if (containerNewProject) {
                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('deleteElement', containerNewProject)                
            }else{
                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('deleteElement', containerNewProjectM)
            }

        },100)

    })

};

function hoverProject() {

    const containerProjects = document.querySelector('.containerProjects');

    containerProjects.addEventListener('mouseover', (e) => {

        let hoverTarget = e.target;
        let hoverProjectId = hoverTarget.dataset.projectId;
        
        if (hoverProjectId) {

            if (!findProjectById(hoverProjectId).isTipName) {

                findProjectById(hoverProjectId).onHover();
                projectTipName(hoverTarget,hoverProjectId)
            }
        }
        
    })

}

function projectTipName(div,projectId) {

    (0,tippy_js__WEBPACK_IMPORTED_MODULE_5__["default"])(div,{

        content: `${findProjectById(projectId).name}`,
        animation:'scale-subtle',
        inertia: true,
        placement:'right',
        theme: 'dark-project',
    })

}

function todayAndWeekTipName(){
    
    let svgToday = document.querySelector('.svgToday')
    let svgWeek = document.querySelector('.svgWeek')


    ;(0,tippy_js__WEBPACK_IMPORTED_MODULE_5__["default"])(svgToday,{
        content: `Today`,
        animation:'scale-subtle',
        inertia: true,
        placement:'right',
        theme: 'dark-project',

    })
    ;(0,tippy_js__WEBPACK_IMPORTED_MODULE_5__["default"])(svgWeek,{
        content: `Week`,
        animation:'scale-subtle',
        inertia: true,
        placement:'right',
        theme: 'dark-project',

    })
}

function projectSelected() {
    
    const containerProjects = document.querySelector('.containerProjects');

    containerProjects.addEventListener('click', (e) => {

        let clickedTarget = e.target;
        let clickedProjectId = clickedTarget.dataset.projectId;

        if (clickedProjectId) {

            let clicked = document.querySelector('.clicked');

            if (clicked) {
                
                clicked.style.outlineWidth = '0px';
                clicked.classList.remove('clicked')
            }

            let projectClicked = document.querySelector(`.item${clickedProjectId}`);
            projectClicked.classList.add('clicked')

            _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionProjectSelected', projectClicked)

        }

    })

}

function populateStorageP() {

    const serializedArray = JSON.stringify(projects, (key, value) => {
        if (typeof value === 'function') {
          return value.toString();
        }
        return value;
    });

    localStorage.setItem('arrProjects', serializedArray)
    localStorage.setItem('countChilds', countChilds)

}

function setProjects() {
    
    let countChildSaved = localStorage.getItem('countChilds');
  
    
    const storedArray = localStorage.getItem('arrProjects');

    const deserializedArray = JSON.parse(storedArray, (key, value) => {

        if (typeof value === 'string' && value.includes('function')) {

          return eval(`(${value})`);
        }
        return value;
    });

    deserializedArray.forEach(objP => {

        if (objP.isTipName == true) {
            objP.isTipName = false;
        }

        objP.todo.forEach(todo => {

            if (todo.isTipPriority == true) {
                todo.isTipPriority = false;
            }

        })
    })

    projects = deserializedArray;
    countChilds = countChildSaved;
    _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('renderProjects',projects)
    _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionGhostEntryProjects','.itemProject')

    // localStorage.clear();
    renderLastProject();
}


function exist() {

    if(!localStorage.getItem('countChilds')) {
        populateStorageP();
        
    }else {
        setProjects();
    }
}

function renderLastProject() {
    
    let lastIdProject = localStorage.getItem('lastProjectIdSelected');
    let itemProject = document.querySelector(`.item${lastIdProject}`);
    let titleTodoProject = document.querySelector('.titleTodoProject');

    itemProject.classList.add('clicked')


    _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionChangeTitle','.titleTodoProject')

    setTimeout(() => {

                titleTodoProject.innerText = `To do - ${findProjectById(lastIdProject).name}`;

    },200)


    const projectObjSelected = projects.find(project => project.id == lastIdProject);
            
    _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('changeProject',projectObjSelected.todo);

    let arrTagets = ['.todoStyle'];

    _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionGhostOut',arrTagets)

    let containerTodo = document.querySelector('.containerTodo');

    let childs = Array.from(containerTodo.children);
            
    childs.forEach((todo) => {
        if (!todo.classList.contains('btnNewTodo')) {

            let colorBgBtn = getComputedStyle(todo.children[3]).getPropertyValue('--backContainerSecond');
            let arrColorAndBtn1 = [todo.children[3],colorBgBtn,'#3f3852'];

            _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionBgBtn',arrColorAndBtn1)
        }
    })

         

    ;(0,_todos_js__WEBPACK_IMPORTED_MODULE_2__.restartTodoTipPriority)();

}

function saveLastProjectSelected() {
    
    window.addEventListener('beforeunload', () => {

        localStorage.setItem('lastProjectIdSelected', projectIdSelected)
        populateStorageP();

    })

}

function menuMobile() {
    
    const btnProjectsM = document.querySelector('.containerProjectsM');

    btnProjectsM.addEventListener('click', () => {  

        const containerProjectsMobile = document.querySelector('.containerProjectsMobile');
        
        if (!containerProjectsMobile) {
            
            const coords = btnProjectsM.getBoundingClientRect();

            arrContainerProjectsMobile[0].attributes.style = `bottom:0px; left:${coords.left - 28.9}px;`;

            _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('createElements', arrContainerProjectsMobile)

            _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('fadeInAndSlideUp', '.containerProjectsMobile')

            _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('renderProjectsMobile', projects)
            popUpNewProjectMobile();
            changeProjectMobile();
            

        }else{

            _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('fadeOutAndSlideDown', '.containerProjectsMobile')

            setTimeout(() => {
                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('deleteElement', containerProjectsMobile)                
            }, 175);
        }

    })

}

function popUpNewProjectMobile() {
    
    const btnNewProject = document.querySelector('.btnNewProjectM');
    const containerProjectsMobile = document.querySelector('.containerProjectsMobile');

    btnNewProject.addEventListener('click', () => {

        _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('fadeOutAndSlideDown', '.containerProjectsMobile')

        setTimeout(() => {
            _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('deleteElement', containerProjectsMobile)                
        }, 175);

        _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('createElements', arrNewProjectMobile)

        let containerNewProjectM = document.querySelector('.containerNewProjectM');

        _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('animationEntry', containerNewProjectM)

        closeCreatorProject();
        addNewProject();
        syncInputColor();
        getColorFromInputColor()
    })

}

function changeProjectMobile() {
    
    let titleTodoProject = document.querySelector('.titleTodoProject');
    let containerProjects = document.querySelector('.containerProjects');
    let containerProjectsM = document.querySelector('.containerProjectsMobile');

    containerProjectsM.addEventListener('click', (e) => {

        let projectTarget = e.target;

        if (!projectTarget.classList.contains('containerProjectsMobile')) {

            let projectId;

            if (!projectTarget.dataset.projectId) {
                projectId = projectTarget.parentNode.dataset.projectId;
            }else{
                projectId = projectTarget.dataset.projectId;                
            }
            
            if (projectId){

                projectIdSelected = projectId;

                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('fadeOutAndSlideDown', '.containerProjectsMobile')

                setTimeout(() => {
                    _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('deleteElement', containerProjectsM)                
                }, 175);

                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionChangeTitle','.titleTodoProject')

                 setTimeout(() => {

                    titleTodoProject.innerText = `To do - ${findProjectById(projectId).name}`;

                 },200)


                const projectObjSelected = projects.find(project => project.id == projectId);
            
                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('changeProject',projectObjSelected.todo);
                let arrTagets = ['.TP'];
                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionGhostOut',arrTagets)

                findProjectById(projectId).todo.forEach( todo => {
                
                    if (todo.isTipPriority == true) {
                         todo.isTipPriority = false;
                    }

                } )

                let containerTodo = document.querySelector('.containerTodo');
                let childs = Array.from(containerTodo.children);
            
                childs.forEach((todo) => {
                    if (!todo.classList.contains('btnNewTodo')) {

                        let colorBgBtn = getComputedStyle(todo.children[3]).getPropertyValue('--backContainerSecond');
                        let arrColorAndBtn1 = [todo.children[3],colorBgBtn,'#3f3852'];

                        _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionBgBtn',arrColorAndBtn1)
                    }
                })

         

                ;(0,_todos_js__WEBPACK_IMPORTED_MODULE_2__.restartTodoTipPriority)();
            }

            
        }       

    });
}

saveLastProjectSelected();


/***/ }),

/***/ "./src/pubSub.js":
/*!***********************!*\
  !*** ./src/pubSub.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "EventManager": () => (/* binding */ EventManager)
/* harmony export */ });

  let EventManager = {

    events: {},

    on: function(event, callback) {

      if (!this.events[event]) {
        this.events[event] = [];
      }
      this.events[event].push(callback);

    },

    off: function(event, callback) {

      if (this.events[event]) {

        for (var i = 0; i < this.events[event].length; i++) {

          if (this.events[event][i] === callback) {

            this.events[event].splice(i, 1);
            break;

          }
        }
      }
    },

    emit: function(event, data) {

      if (this.events[event]) {

        this.events[event].forEach(function(callback) {

          callback(data);

        });
      }
    }
  };



/***/ }),

/***/ "./src/todos.js":
/*!**********************!*\
  !*** ./src/todos.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "arrTodoTemplate": () => (/* binding */ arrTodoTemplate),
/* harmony export */   "checkTodoDone": () => (/* binding */ checkTodoDone),
/* harmony export */   "checkTodoDoneTW": () => (/* binding */ checkTodoDoneTW),
/* harmony export */   "countTodo": () => (/* binding */ countTodo),
/* harmony export */   "defaultTodo": () => (/* binding */ defaultTodo),
/* harmony export */   "popUpTodo": () => (/* binding */ popUpTodo),
/* harmony export */   "resetCountTodo": () => (/* binding */ resetCountTodo),
/* harmony export */   "restartTodoTipPriority": () => (/* binding */ restartTodoTipPriority),
/* harmony export */   "showTodayMobile": () => (/* binding */ showTodayMobile),
/* harmony export */   "showWeekMobile": () => (/* binding */ showWeekMobile)
/* harmony export */ });
/* harmony import */ var _domCreation_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domCreation.js */ "./src/domCreation.js");
/* harmony import */ var _pubSub_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./pubSub.js */ "./src/pubSub.js");
/* harmony import */ var _projects_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./projects.js */ "./src/projects.js");
/* harmony import */ var tippy_js_animations_scale_subtle_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tippy.js/animations/scale-subtle.css */ "./node_modules/tippy.js/animations/scale-subtle.css");
/* harmony import */ var tippy_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tippy.js */ "./node_modules/tippy.js/dist/tippy.esm.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/startOfWeek/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/lastDayOfWeek/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/isWithinInterval/index.js");
/* harmony import */ var date_fns__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! date-fns */ "./node_modules/date-fns/esm/isSameDay/index.js");
/* harmony import */ var animejs_lib_anime_es_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! animejs/lib/anime.es.js */ "./node_modules/animejs/lib/anime.es.js");









const arrPopUpTodo = [

    {
        elementType: 'div',
        attributes: {class:'containerPopUpNewTodo'},
        appendChild: 'body',

    },

    //  childs containerPopUpNewTodo

    {
        elementType: 'div',
        attributes: {class:'btnClosePopUpTodo'},
        innerHTML: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 12L12 4M4 4L12 12" stroke="#E6E1E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        appendChild: '.containerPopUpNewTodo',
    },

    {
        elementType: 'div',
        attributes: {class:'containerName'},
        appendChild: '.containerPopUpNewTodo',

    },

    {
        elementType: 'div',
        attributes: {class:'containerDescription'},
        appendChild: '.containerPopUpNewTodo',

    },

    {
        elementType: 'div',
        attributes: {class:'containerDate'},
        appendChild: '.containerPopUpNewTodo',

    },

    {
        elementType: 'div',
        attributes: {class:'btnCreateTodo'},
        innerHTML: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8.00033 2.66666V13.3333M13.3337 7.99999L2.66699 7.99999" stroke="#E6E1E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        appendChild: '.containerPopUpNewTodo',
    },

    //  childs containerName

    {
        elementType: 'p',
        attributes: {class:'titleNewTodoName'},
        innerText: 'Name',
        appendChild: '.containerName',

    },

    {
        elementType: 'div',
        attributes: {class:'containerTextAndPriority'},
        appendChild: '.containerName',

    },

    {
        elementType: 'div',
        attributes: {class:'containerTextTodoName'},
        innerHTML: '<input class ="input name" type="text" name="nameTodo">',
        appendChild: '.containerTextAndPriority',

    },

    {
        elementType: 'div',
        attributes: {class:'containerPriority'},
        innerHTML: '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><circle class="prio" cx="6" cy="6" r="5.5" fill="#3D99DB"/></svg>',
        appendChild: '.containerTextAndPriority',

    },  

    //  childs containerDescription

    {
        elementType: 'p',
        attributes: {class:'titleNewTodoDescription'},
        innerText: 'Description',
        appendChild: '.containerDescription',

    },

    {
        elementType: 'div',
        attributes: {class:'containerTextTodoDescription'},
        innerHTML: '<textarea class="description" cols="60">',
        appendChild: '.containerDescription',

    },

    //  childs containerDate



    {
        elementType: 'div',
        attributes: {class:'containerInputDate'},
        innerHTML: '<input class ="input date" type="date" name="dateTodo">',
        appendChild: '.containerDate',

    },


];

const arrDropDown = [

    {
        elementType: 'div',
        attributes: {class:'dropDown'},
        appendChild: '.containerPriority',

    },

    //  childs dropDown


    {
        elementType: 'div',
        attributes: {class:'ddOp1 itemDd'},
        innerHTML: '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="6" cy="6" r="5.5" fill="#DB3D3D"/></svg>',
        appendChild: '.dropDown',

    },
    {
        elementType: 'div',
        attributes: {class:'ddOp2 itemDd'},
        innerHTML: '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="6" cy="6" r="5.5" fill="#DB763D"/></svg>',
        appendChild: '.dropDown',

    },
    {
        elementType: 'div',
        attributes: {class:'ddOp3 itemDd'},
        innerHTML: '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="6" cy="6" r="5.5" fill="#3D99DB"/></svg>',
        appendChild: '.dropDown',

    },

]

const arrTodoTemplate= [

    {
        elementType: 'div',
        attributes: {class:'itemTodo todoStyle TP'},
        appendChild: '.containerTodo',
    },

    //  childs itemTodo

    {
        elementType: 'div',
        attributes: {class:'svgTodo'},
        innerHTML: '<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="10" cy="10" r="9" stroke="#25A7B9" stroke-width="2"/></svg>',
        appendChild: '.itemTodo',
    },

    {
        elementType: 'p',
        attributes: {class:'pTodo'},
        innerText: '',
        appendChild: '.itemTodo',
    },

    {
        elementType: 'div',
        attributes: {class:'svgTodoPriority'},
        innerHTML: '<svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg"><circle class="svgPriority" cx="3" cy="3" r="3" fill="#CA1D1D"/></svg>',
        appendChild: '.itemTodo',
    },

    {
        elementType: 'div',
        attributes: {class:'svgTodoMenu'},
        innerHTML: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M5 12H5.01M12 12H12.01M19 12H19.01M6 12C6 12.5523 5.55228 13 5 13C4.44772 13 4 12.5523 4 12C4 11.4477 4.44772 11 5 11C5.55228 11 6 11.4477 6 12ZM13 12C13 12.5523 12.5523 13 12 13C11.4477 13 11 12.5523 11 12C11 11.4477 11.4477 11 12 11C12.5523 11 13 11.4477 13 12ZM20 12C20 12.5523 19.5523 13 19 13C18.4477 13 18 12.5523 18 12C18 11.4477 18.4477 11 19 11C19.5523 11 20 11.4477 20 12Z" stroke="#E6E1E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        appendChild: '.itemTodo',
    },
]

const arrTodoMenuTemplate = [

    {
        elementType: 'div',
        attributes: {class:'containerMenuTodo'},
        appendChild: '.todoStyle',
    },

    //  childs containerMenuTodo

    {
        elementType: 'div',
        attributes: {class:'containerSvgEdit'},
        innerHTML: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11 5H6C4.89543 5 4 5.89543 4 7V18C4 19.1046 4.89543 20 6 20H17C18.1046 20 19 19.1046 19 18V13M17.5858 3.58579C18.3668 2.80474 19.6332 2.80474 20.4142 3.58579C21.1953 4.36683 21.1953 5.63316 20.4142 6.41421L11.8284 15H9L9 12.1716L17.5858 3.58579Z" stroke="#E6E1E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        appendChild: '.containerMenuTodo',
    },

    {
        elementType: 'div',
        attributes: {class:'containerSvgDelete'},
        innerHTML: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M19 7L18.1327 19.1425C18.0579 20.1891 17.187 21 16.1378 21H7.86224C6.81296 21 5.94208 20.1891 5.86732 19.1425L5 7M10 11V17M14 11V17M15 7V4C15 3.44772 14.5523 3 14 3H10C9.44772 3 9 3.44772 9 4V7M4 7H20" stroke="#E6E1E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        appendChild: '.containerMenuTodo',
    },


];

const arrTodoEditTemplate = [

    {
        elementType: 'div',
        attributes: {class:'containerTodoEdit'},
        appendChild: 'body',
    },

    //  child containerTodo

    {
        elementType: 'div',
        attributes: {class:'btnClosePopUpTodo'},
        innerHTML: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 12L12 4M4 4L12 12" stroke="#E6E1E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        appendChild: '.containerTodoEdit',
    },

    {
        elementType: 'div',
        attributes: {class:'containerEditName'},
        appendChild: '.containerTodoEdit',
    },
    {
        elementType: 'div',
        attributes: {class:'containerEditDescription'},
        appendChild: '.containerTodoEdit',
    },
    {
        elementType: 'div',
        attributes: {class:'containerEditDateAndPriority'},
        appendChild: '.containerTodoEdit',
    },

    {
        elementType: 'div',
        attributes: {class:'containerBtnsCancelSave'},
        appendChild: '.containerTodoEdit',
    },


    //  child containerEditName

    {
        elementType: 'p',
        attributes: {class:'pTodoEditName'},
        innerText: 'Name',
        appendChild: '.containerEditName',
    },

    {
        elementType: 'div',
        attributes: {class:'containerInputTodoEditName'},
        innerHTML: '<input class ="input editName" type="text" name="editNameTodo">',
        appendChild: '.containerEditName',

    },

    // child containerEditDescription

    {
        elementType: 'p',
        attributes: {class:'pTodoEditName'},
        innerText: 'Description',
        appendChild: '.containerEditDescription',
    },

    {
        elementType: 'div',
        attributes: {class:'containerTodoEditDescription'},
        innerHTML: '<textarea class="editDescription" cols="45">',
        appendChild: '.containerEditDescription',

    },

    //  child containerEditDateAndPriority

    {
        elementType: 'div',
        attributes: {class:'containerTodoEditDate'},
        innerHTML: '<input class ="input editDate" type="date" name="editDateTodo">',
        appendChild: '.containerEditDateAndPriority',

    },

    {
        elementType: 'div',
        attributes: {class:'containerTodoEditPriority'},
        innerHTML: '<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><circle class="prio" cx="6" cy="6" r="5.5" fill="#3D99DB"/></svg>',
        appendChild: '.containerEditDateAndPriority',

    },

    //  child containerBtnsCancelSave

    {
        elementType: 'div',
        attributes: {class:'containerBtnCancel'},
        innerText: 'Cancel',
        appendChild: '.containerBtnsCancelSave',
    },

    {
        elementType: 'div',
        attributes: {class:'containerBtnSave'},
        innerText: 'Save',
        appendChild: '.containerBtnsCancelSave',
    },


];

const arrPopUpDeleteConfirmation = [

    {
        elementType: 'div',
        attributes: {class:'containerDeleteConfirmation'},
        appendChild: 'body',

    },

    //  chlids containerDeleteConfirmation

    {
        elementType: 'p',
        attributes: {class:'titleDelConfirmation'},
        innerText: 'Are you sure?',
        appendChild: '.containerDeleteConfirmation',

    },

    {
        elementType: 'div',
        attributes: {class:'containerBtns'},
        appendChild: '.containerDeleteConfirmation',

    },

    //  childs containerBtns

    {
        elementType: 'div',
        attributes: {class:'containerBtnCancel btnDel'},
        innerText: 'Cancel',
        appendChild: '.containerBtns',

    },

    {
        elementType: 'div',
        attributes: {class:'containerBtnDelete btnDel'},
        innerText:'Delete',
        appendChild: '.containerBtns',

    },


];

const arrTodoTodayAndWeek = [

    {
        elementType: 'div',
        attributes: {class:'containerTodosTodayAndWeek'},
        appendChild: '.containerCenterRight',

    },

    //  childs containerTodosTodayAndWeek

    {
        elementType: 'p',
        attributes: {class:'titleTodayAndWeek'},
        innerText:'test',
        appendChild: '.containerTodosTodayAndWeek',

    },

    {
        elementType: 'div',
        attributes: {class:'outerTW'},
        appendChild: '.containerTodosTodayAndWeek',
    },

    {
        elementType: 'div',
        attributes: {class:'todosTodayAndWeek'},
        appendChild: '.outerTW',

    },

    {
        elementType: 'div',
        attributes: {class:'btnCloseTodayAndWeek'},
        innerHTML: '<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 12L12 4M4 4L12 12" stroke="#E6E1E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        appendChild: '.containerTodosTodayAndWeek',
    },

];

const arrTodoTodayAndWeekMobile = [

    {
        elementType: 'div',
        attributes: {class:'containerTodosTodayAndWeekM'},
        appendChild: 'body',

    },

    //  childs containerTodosTodayAndWeek

    {
        elementType: 'p',
        attributes: {class:'titleTodayAndWeek'},
        innerText:'test',
        appendChild: '.containerTodosTodayAndWeekM',

    },

    {
        elementType: 'div',
        attributes: {class:'outerTW'},
        appendChild: '.containerTodosTodayAndWeekM',
    },

    {
        elementType: 'div',
        attributes: {class:'todosTodayAndWeek'},
        appendChild: '.outerTW',

    },

];

const arrSvgDone = [
    {
        elementType: 'div',
        attributes: {class:'svgTodo containerSvgDone'},
        innerHTML: '<svg class="svgDone" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="pathDone" d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#9920B7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        appendChild: '.svgTodo',
    },
];
const arrSvgDoneTW = [
    {
        elementType: 'div',
        attributes: {class:'svgTodo containerSvgDone'},
        innerHTML: '<svg class="svgDone" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="pathDone" d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="#9920B7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        appendChild: '.svgTodo',
    },
];

const arrSvgNotDone = [
    {
        elementType: 'div',
        attributes: {class:'svgTodo containerSvgNotDone'},
        innerHTML:'<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle class="circlePath" cx="10" cy="10" r="9" stroke="#9920B7" stroke-width="2"/></svg>',
        appendChild: 'body',
    },
]
const arrSvgNotDoneTW = [
    {
        elementType: 'div',
        attributes: {class:'svgTodo containerSvgNotDone'},
        innerHTML:'<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle class="circlePath" cx="10" cy="10" r="9" stroke="#9920B7" stroke-width="2"/></svg>',
        appendChild: 'body',
    },
]
const arrSvgBackToProjects = [
    {
        elementType: 'div',
        attributes: {class:'svgBackToProjects containerSvgBackToProjects'},
        innerHTML:'<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 10H13C17.4183 10 21 13.5817 21 18V20M3 10L9 16M3 10L9 4" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        appendChild: '.containerTodosTodayAndWeekM',
    },
]

const arrTodos= [];
const arrTodosWeek = [];
const arrTodosToday = [];
let countTodo = 0;

let priorityName;

function todos(name,description,dueDate,priorityColor,priorityName,projectId,todoId) {

    this.name = name;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = [priorityColor,priorityName];
    this.projectId = projectId;
    this.todoId = todoId;
    this.isTipPriority = false;
    this.done = false;

    this.onHover = function() {
        if (!this.isTipPriority) {

            this.isTipPriority = true;
            
        }
    };

    this.toggleDone = function() {
        if (!this.done) {

            this.done = true;
            
        }else{
            this.done = false;
        }
    };


}

function domElements(arr) {

    arr.forEach(elementObject => {
        
        (0,_domCreation_js__WEBPACK_IMPORTED_MODULE_0__["default"])(elementObject.elementType,elementObject.attributes,elementObject.innerHTML,elementObject.innerText,document.querySelector(elementObject.appendChild));
        
    });
   
}  

function defaultTodo() {
    
    let todoD = new todos('clean','limpiar loco','2023-03-25','rgb(219,118,61)','Medium',0,0);

    arrTodos.push(todoD)

    return todoD;
}

function popUpTodo() {
    const btnPopUpTodo = document.querySelector('.btnNewTodo');
    let body  = document.querySelector('body');
    
    let arrColorAndBtn1 = [btnPopUpTodo,'#2b2636','#2b2636'];

    _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionBgBtn', arrColorAndBtn1);
    _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionBgBtn2', btnPopUpTodo);

    exist();
    hoverTodo();
    showMenuTodo();
    showTodayAndWeek();
    todoDone();

    btnPopUpTodo.addEventListener('click', () => {

        _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionBtnClick',btnPopUpTodo)

        if (!body.lastChild.classList.contains('containerPopUpNewTodo')) {

            domElements(arrPopUpTodo);

            let containerPopUpNewTodo = document.querySelector('.containerPopUpNewTodo');
            let name = document.querySelector('.name')
            let description = document.querySelector('.description')
            let containerPriority = document.querySelector('.containerPriority')
            let date = document.querySelector('.date')

            _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionBgInput',name)
            _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionBgInput',description)
            _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionBgInput',containerPriority)
            _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionBgInput',date)
            _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('animationEntry', containerPopUpNewTodo)

            createTodoObj();
            popUpPriority();
            delPopUpTodo();

            updateLatestIdFromObjectsArray();
        }

        
    })
}

function popUpPriority() {
    
    const containerPriority = document.querySelector('.containerPriority');
    const containerTodoEditPriority = document.querySelector('.containerTodoEditPriority');
    let toggle = false;


    if (containerPriority) {

        let toggle1 = false;
        containerPriority.addEventListener('click', (e) => {

            toggle1 = !toggle1;
    
            if (toggle1) {
                
                arrDropDown[0].appendChild = '.containerPriority';
                arrDropDown[0].attributes.class = 'dropDown';

                domElements(arrDropDown);
                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('fadeInDelayedDivs')
                choosePriority(e.target)
                
            }else{
    
                delPopUpPriotity();
                choosePriority(e.target)
            }
        })
    }else{

        containerTodoEditPriority.addEventListener('click', (e) => {

            toggle = !toggle;
    
            if (toggle) {
                
                arrDropDown[0].appendChild = '.containerTodoEditPriority';
                arrDropDown[0].attributes.class = 'dropDown editDropDown';

                domElements(arrDropDown);
                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('fadeInDelayedDivs')
                choosePriority(e.target)
                
            }else{
    
                delPopUpPriotity();
                choosePriority(e.target)
                
            }
        })
    }
    

}

function choosePriority(target) {
    
    const colorPrio = document.querySelector('.prio');
    const arrPriorityColors = ['#DB3D3D','#DB763D','#3D99DB'];

    if (target.classList.contains('itemDd')) {

        if (target.classList.contains('ddOp1')) {

            colorPrio.style.fill = arrPriorityColors[0];
            priorityName = 'High';

        }else if(target.classList.contains('ddOp2')){

            colorPrio.style.fill = arrPriorityColors[1];
            priorityName = 'Medium';
            
        }else{

            colorPrio.style.fill = arrPriorityColors[2];
            priorityName = 'Low';
        }
    
    }

}

function delPopUpPriotity() {
    
    const dropDown = document.querySelector('.dropDown');

    _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('fadeOutDelayedDivs')

    setTimeout(() => {
        dropDown.remove()        
    }, 151);

}

function createTodoObj() {
    const btnCreateTodo = document.querySelector('.btnCreateTodo')
    const inputNameTodo = document.querySelector('.name')
    const inputDateTodo = document.querySelector('.date')
    const inputDescriptionTodo = document.querySelector('.description')
    const colorPrio = document.querySelector('.prio');


    let colorBgBtn = getComputedStyle(btnCreateTodo).getPropertyValue('--backContainer');

    let arrColorAndBtn1 = [btnCreateTodo,colorBgBtn,'#2b2636'];

    _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionBgBtn',arrColorAndBtn1)
     

    btnCreateTodo.addEventListener('click', () => {
        
        
        updateLatestIdFromObjectsArray()

        let todo = new todos(inputNameTodo.value,inputDescriptionTodo.value,inputDateTodo.value,colorPrio.style.fill,priorityName,_projects_js__WEBPACK_IMPORTED_MODULE_2__.projectIdSelected,countTodo);

        arrTodos.push(todo);

        const project = _projects_js__WEBPACK_IMPORTED_MODULE_2__.projects.find(project => project.id == todo.projectId);

        if (project) {

            project.addTodo(todo);
            (0,_projects_js__WEBPACK_IMPORTED_MODULE_2__.populateStorageP)();
        }
        addTodosToCurrentWeekArr(todo);
        addTodosToCurrentDayArr(todo);
        
        let containerSvgTodoMenu = document.querySelector(`.itemTodo${countTodo}`);
        let svgTodoMenu = containerSvgTodoMenu.lastChild;
        let colorBgBtn = getComputedStyle(svgTodoMenu).getPropertyValue('--backContainerSecond');

        let arrColorAndBtn1 = [svgTodoMenu,colorBgBtn,'#3f3852'];

        _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionBgBtn',arrColorAndBtn1)
        
    })


}

function updateLatestIdFromObjectsArray() {
    
    let maxId = 0;

    _projects_js__WEBPACK_IMPORTED_MODULE_2__.projects.forEach(itemProject => {

        let tempId = 0;

        if (itemProject.todo[itemProject.todo.length - 1]) {
            tempId = itemProject.todo[itemProject.todo.length - 1].todoId;   
            
            if (tempId > maxId) {
                maxId = tempId;
            }
        }
             
    })

    return  countTodo = maxId + 1;    
}

function delPopUpTodo() {

    
    const containerPopUpNewTodo = document.querySelector('.containerPopUpNewTodo');
    const btnClosePopUpTodo = document.querySelector('.btnClosePopUpTodo');

    let colorBgBtn = getComputedStyle(btnClosePopUpTodo).getPropertyValue('--backContainer');

    let arrColorAndBtn1 = [btnClosePopUpTodo,colorBgBtn,'#2b2636'];

    _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionBgBtn',arrColorAndBtn1)

    btnClosePopUpTodo.addEventListener('click', () => {

        animationOut(containerPopUpNewTodo);                

        setTimeout( ()=> {
            _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('deleteElement', containerPopUpNewTodo)
        },100)

    })

};

function hoverTodo() {

    const containerTodo = document.querySelector('.containerTodo');

    containerTodo.addEventListener('mouseover', (e) => {

        let hoverTarget = e.target;
        let hoverTodoId = hoverTarget.dataset.todoId;
        let childPriority = hoverTarget.children[2];

        if (hoverTodoId) {

            let todoFounded = null;

            (0,_projects_js__WEBPACK_IMPORTED_MODULE_2__.findProjectById)(_projects_js__WEBPACK_IMPORTED_MODULE_2__.projectIdSelected).todo.forEach(todo => {

                if (todo.todoId == hoverTodoId) {

                    todoFounded = todo;

                    if (!todoFounded.isTipPriority) {

                        todoFounded.onHover();
                        todoTipNamePriority(childPriority,todoFounded);
                        
                    }                    

                }

            })

        }
        
    })

}

function todoTipNamePriority(div,todo) {

    (0,tippy_js__WEBPACK_IMPORTED_MODULE_5__["default"])(div,{

        content: `${todo.priority[1]}`,
        animation:'scale-subtle',
        inertia: true,
        placement:'top',
        theme: 'dark-todo',
    })

}

function restartTodoTipPriority() {

    const containerTodo = document.querySelector('.containerTodo');

    let todoId = containerTodo.lastChild.dataset.todoId;
    
    (0,_projects_js__WEBPACK_IMPORTED_MODULE_2__.findProjectById)(findTodoById(todoId).projectId).todo.forEach(todo => {

        if (todo.isTipPriority) {
            todo.isTipPriority = false;
        }

    })


}

function resetCountTodo() {
    
    countTodo = 0;
}

function findTodoById(todoId) {

    let todoFounded = null;

    _projects_js__WEBPACK_IMPORTED_MODULE_2__.projects.forEach(itemP => {

        itemP.todo.forEach(todo => {

            if (todo.todoId == todoId) {

                todoFounded = todo;
            }

        })
        

    })

    return todoFounded;
}

function showMenuTodo() {
    
    const containerTodo = document.querySelector('.containerTodo');
    const containerSvgTodoMenu = document.querySelector('.svgTodoMenu');
    let colorBgBtn = getComputedStyle(containerSvgTodoMenu).getPropertyValue('--backContainerSecond');

    let arrColorAndBtn1 = [containerSvgTodoMenu,colorBgBtn,'#3f3852'];

    _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionBgBtn',arrColorAndBtn1)

    containerTodo.addEventListener('click', (e) => {
        
        let target = e.target;

        if (target.classList.contains('svgTodoMenu')) {

            

            _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionBtnClick',target)

            let father = target.parentNode;
            let todoId = father.dataset.todoId;
            let divAppendChild = father.classList[0];

            if (!father.lastChild.classList.contains('containerMenuTodo')) {

                arrTodoMenuTemplate[0].appendChild =`.${divAppendChild}`;
                arrTodoMenuTemplate[0].attributes.class =`containerMenuTodo${todoId} containerMenuTodo`;

                arrTodoMenuTemplate[1].appendChild =`.containerMenuTodo${todoId}`;
                arrTodoMenuTemplate[2].appendChild =`.containerMenuTodo${todoId}`;

                
                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('createElements',arrTodoMenuTemplate)
                removeOverflow();

                animationEntry(father.lastChild);

                showEditTodo();
                showDeleteConfirm();
                


            }else{

                let containerMenuTodo = document.querySelector(`.containerMenuTodo${todoId}`);
                
                animationOut(containerMenuTodo);                

                setTimeout( ()=> {

                    _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('deleteElement', containerMenuTodo)
                    addOverflow();
                },100)
                

            }


        }

       

    });

}

function showEditTodo() {
    
    let containerMenuTodo = document.querySelector('.containerMenuTodo');

    let containerSvgEdit = document.querySelector('.containerSvgEdit')

    let colorBgBtn = getComputedStyle(containerSvgEdit).getPropertyValue('--backContainerSecond');

    let arrColorAndBtn1 = [containerSvgEdit,colorBgBtn,'rgba(168, 199, 250, 0.3)'];

    _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionBgBtn', arrColorAndBtn1);



    containerMenuTodo.addEventListener('click', (e) => {

        let target = e.target;

        let todoId = target.parentNode.parentNode.dataset.todoId;
        let todoItem = target.parentNode.parentNode.children;

        let pTodo = todoItem[1]
        let svgPriority = todoItem[2].children[0].children[0];
        let typpyInstance = todoItem[2];

       

        if (target.classList.contains('containerSvgEdit')) {

            fillEditTodo(findTodoById(todoId));

            let body = document.querySelector('body')

            if(!body.lastChild.classList.contains('containerTodoEdit') && !body.lastChild.classList.contains('containerDeleteConfirmation')) {

                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('createElements',arrTodoEditTemplate);
            
                let containerBtnSave = document.querySelector('.containerBtnSave')
                let containerBtnCancel = document.querySelector('.containerBtnCancel')
                let editName = document.querySelector('.editName')
                let editDate = document.querySelector('.editDate')
                let editDescription = document.querySelector('.editDescription')
                let containerTodoEditPriority = document.querySelector('.containerTodoEditPriority')

                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionBgBtn2',containerBtnSave)
                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionBgBtn2',containerBtnCancel)
                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionBgInput',editName)
                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionBgInput',editDate)
                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionBgInput',editDescription)
                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionBgInput',containerTodoEditPriority)
                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('animationOut',containerMenuTodo)

                setTimeout( ()=> {
                    _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('deleteElement', containerMenuTodo)
                },100)

                let containerTodoEdit = document.querySelector('.containerTodoEdit');

                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('animationEntry',containerTodoEdit)

                let textArea = document.querySelector('.editDescription');
                textArea.value = `${findTodoById(todoId).description}`;


                fillEditTodoNewInfo(findTodoById(todoId),pTodo,svgPriority,typpyInstance);
                delEditTodo();
                popUpPriority();
            }else if(!body.lastChild.classList.contains('containerCenterRight')) {

                let containerMenuTodo = document.querySelector(`.containerMenuTodo${todoId}`);
                let containerTodoEdit = document.querySelector('.containerTodoEdit');
                let containerDeleteConfirmation = document.querySelector('.containerDeleteConfirmation');
                if (containerTodoEdit) {
                    _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('animationError', containerTodoEdit)
                }else{
                    _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('animationError', containerDeleteConfirmation)
                }
                
                
            }

            
        }

    })  

}

function showDeleteConfirm(){
    
    let body = document.querySelector('body')

    let containerMenuTodo = document.querySelector('.containerMenuTodo');

    let containerSvgDelete = document.querySelector('.containerSvgDelete')

    let colorBgBtn = getComputedStyle(containerSvgDelete).getPropertyValue('--backContainerSecond');

    let arrColorAndBtn1 = [containerSvgDelete,colorBgBtn,'rgba(179, 38, 30, 0.4)'];

    _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionBgBtn', arrColorAndBtn1);

    containerMenuTodo.addEventListener('click', (e) => {

        let target = e.target;

        let todoId = target.parentNode.parentNode.dataset.todoId;
        let todoItem = target.parentNode.parentNode;

        if (target.classList.contains('containerSvgDelete')) {
            
            if(!body.lastChild.classList.contains('containerDeleteConfirmation') && !body.lastChild.classList.contains('containerTodoEdit')) {

                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('createElements', arrPopUpDeleteConfirmation);

                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('animationOut',containerMenuTodo)

                setTimeout( ()=> {
                    _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('deleteElement', containerMenuTodo)
                },100)

                let containerDeleteConfirmation = document.querySelector('.containerDeleteConfirmation');

                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('animationEntry', containerDeleteConfirmation);

                let containerBtnDelete = document.querySelector('.containerBtnDelete');
                let containerBtnCancel = document.querySelector('.containerBtnCancel');

                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionBgBtn2',containerBtnDelete)
                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionBgBtn2',containerBtnCancel)

                containerDeleteConfirmation.addEventListener('click', (e) => {

                    let targetContainerDel = e.target;

                    if (targetContainerDel.classList.contains('containerBtnDelete')) {



                        delTodoDOMandArr(todoId,todoItem)
                        
                        _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('animationOut',containerDeleteConfirmation)

                        setTimeout(()=>{

                            _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('deleteElement', containerDeleteConfirmation);
                        },100)

                    }else if(targetContainerDel.classList.contains('containerBtnCancel')){

                        _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('animationOut',containerDeleteConfirmation)

                        setTimeout(()=>{

                            _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('deleteElement', containerDeleteConfirmation);
                        },100)

                    }

                })

            }else if(!body.lastChild.classList.contains('containerCenterRight')) {

                let containerMenuTodo = document.querySelector(`.containerMenuTodo${todoId}`);

                let containerTodoEdit = document.querySelector('.containerTodoEdit');
                let containerDeleteConfirmation = document.querySelector('.containerDeleteConfirmation');

                if (containerDeleteConfirmation) {

                    _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('animationError', containerDeleteConfirmation)
                }else{

                    _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('animationError', containerTodoEdit)
                    
                }
            }


        }

    })

    
}

function findTodoTodayAndWeekById(todoId) {

    let todosTodayAndWeek = document.querySelector('.todosTodayAndWeek');
    let childrenTodayAndWeek = todosTodayAndWeek.children;
    let arrChildrens = Array.from(childrenTodayAndWeek);


    let todoFounded = arrChildrens.find(todo => todo.dataset.todoId == todoId)

    return todoFounded;
}

function delTodoDOMandArr(todoId,itemDOM) {
    
    let todoArr = (0,_projects_js__WEBPACK_IMPORTED_MODULE_2__.findProjectById)(findTodoById(todoId).projectId).todo;
    let todoIndex = todoArr.findIndex(todo => todo.todoId == todoId);
    let todoIndexToday = arrTodosToday.findIndex(todo => todo.todoId == todoId);
    let todoIndexWeek = arrTodosWeek.findIndex(todo => todo.todoId == todoId);
    let titleTodayAndWeek = document.querySelector('.titleTodayAndWeek');

    if (todoIndex !== -1){
                        
        todoArr.splice(todoIndex,1);

    }

    if (todoIndexToday !== -1){
                        
        arrTodosToday.splice(todoIndexToday,1);

    }

    if (todoIndexWeek !== -1){
                        
        arrTodosWeek.splice(todoIndexWeek,1);

    }

    let arrItemDeleted = [itemDOM,todoId];

    _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionGhostOut',arrItemDeleted)

    setTimeout( () => {

        _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('deleteElement', itemDOM);

    },200)

    

    
    
    if (titleTodayAndWeek) {

        if (titleTodayAndWeek.textContent == 'Today'){

            let arrTargetsTW = ['.TW'];
            _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionGhostOutTWAndEntry',arrTargetsTW)
            setTimeout( () => {

                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('deleteElement', findTodoTodayAndWeekById(todoId));
        
            },200)
            
        }else{

            let arrTargetsTW = ['.TW'];
            _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionGhostOutTWAndEntry',arrTargetsTW)
            setTimeout( () => {

                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('deleteElement', findTodoTodayAndWeekById(todoId));
        
            },200)
    
        }
    }
    




}

function fillEditTodo(todoObj) {

    arrTodoEditTemplate[7].innerHTML = `<input class ="input editName" type="text" name="editNameTodo" value="${todoObj.name}">`;
    arrTodoEditTemplate[10].innerHTML = `<input class ="input editDate" type="date" name="editDateTodo" value="${todoObj.dueDate}">`;
    arrTodoEditTemplate[11].innerHTML = `<svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg"><circle class="prio" cx="6" cy="6" r="5.5" fill="${todoObj.priority[0]}"/></svg>`;

    
}

function fillEditTodoNewInfo(todo,pTodo,svgPriority,typpyInstance) {
    
    const containerBtnSave = document.querySelector('.containerBtnSave')

    const inputEditName = document.querySelector('.editName');
    const textAreaDescription = document.querySelector('.editDescription');
    const inputEditDate = document.querySelector('.editDate');
    const editColorPriority = document.querySelector('.prio');

    let arrTodoTitleAndSvg = [todo,pTodo,svgPriority,typpyInstance];

    containerBtnSave.addEventListener('click', () => {

        console.log(typpyInstance);

        todo.name = inputEditName.value;
        todo.description = textAreaDescription.value;
        todo.dueDate = inputEditDate.value;
        todo.priority = [editColorPriority.style.fill,priorityName];

        _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('todoUpdated',arrTodoTitleAndSvg);
        verifyTodoRequirements();

        _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('animationOut',containerBtnSave.parentNode.parentNode)

        setTimeout(()=>{

            _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('deleteElement', containerBtnSave.parentNode.parentNode);
        },100)

    })

    
}

function delEditTodo() {
    
    const containerTodoEdit = document.querySelector('.containerTodoEdit')
    const btnClosePopUpTodo = document.querySelector('.btnClosePopUpTodo');
    const containerBtnCancel = document.querySelector('.containerBtnCancel');

    let colorBgBtn = getComputedStyle(btnClosePopUpTodo).getPropertyValue('--backContainer');

    let arrColorAndBtn1 = [btnClosePopUpTodo,colorBgBtn,'#2b2636'];

    _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionBgBtn',arrColorAndBtn1)

    btnClosePopUpTodo.addEventListener('click', () => {
        
        _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('animationOut',containerTodoEdit)

        setTimeout(()=>{

            _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('deleteElement', containerTodoEdit)
        },100)

    })

    containerBtnCancel.addEventListener('click', () => {
        
        _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('animationOut',containerTodoEdit)

        setTimeout(()=>{

            _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('deleteElement', containerTodoEdit)
        },100)

    })

}

function showTodayAndWeek() {
    
    const containerTodayAndWeek = document.querySelector('.containerTodayAndWeek');
    const containerCenterRight = document.querySelector('.containerCenterRight');

    containerTodayAndWeek.addEventListener('click', (e) => {

        let target = e.target;
        
        if (containerCenterRight.children[1]) {
            
            let titleTodayAndWeek = document.querySelector('.titleTodayAndWeek');

            verifyTodoRequirements();

            if (target.classList.contains('svgToday')) {
                
                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionChangeTitle','.titleTodayAndWeek')

                setTimeout(() => {

                    titleTodayAndWeek.textContent = 'Today';

                },200)


                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('renderTodos',arrTodosToday)
                let arrTagetsTW = ['.TW'];
                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionGhostOutTWAndEntry',arrTagetsTW)

            }
            if (target.classList.contains('svgWeek')) {
                
                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionChangeTitle','.titleTodayAndWeek')

                setTimeout(() => {

                    titleTodayAndWeek.textContent = 'Week';

                },200)

                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('renderTodos',arrTodosWeek)
                let arrTagetsTW = ['.TW'];
                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionGhostOutTWAndEntry',arrTagetsTW)

            }


        }else{

            verifyTodoRequirements();
            // verifyAndAddToWeek();

            if (target.classList.contains('svgToday')) {
            
                arrTodoTodayAndWeek[1].innerText = 'Today';

                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('createElements', arrTodoTodayAndWeek);
                
                let containerTodosTodayAndWeek = document.querySelector('.containerTodosTodayAndWeek');

                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('animationEntry', containerTodosTodayAndWeek);

                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('renderTodos',arrTodosToday)

                let arrTagetsTW = ['.TW'];
                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionGhostOutTWAndEntry',arrTagetsTW)
    
            }
            if (target.classList.contains('svgWeek')) {
                
                arrTodoTodayAndWeek[1].innerText = 'Week';

                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('createElements', arrTodoTodayAndWeek);

                let containerTodosTodayAndWeek = document.querySelector('.containerTodosTodayAndWeek');

                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('animationEntry', containerTodosTodayAndWeek);

                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('renderTodos',arrTodosWeek)

                let arrTagetsTW = ['.TW'];
                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionGhostOutTWAndEntry',arrTagetsTW)
            }

        }
        
        delTodayAndWeek()

    })

}

function delTodayAndWeek() {

    
    const btnCloseTodayAndWeek = document.querySelector('.btnCloseTodayAndWeek');
    const containerTodosTodayAndWeek = document.querySelector('.containerTodosTodayAndWeek')

    let arrColorAndBtn1 = [btnCloseTodayAndWeek,'#1C1B1F','#2b2636'];

    _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionBgBtn',arrColorAndBtn1)

    btnCloseTodayAndWeek.addEventListener('click', () => {
        
        _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('animationOut',containerTodosTodayAndWeek)

        setTimeout(()=>{

            _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('deleteElement', containerTodosTodayAndWeek)
        },100)

    })

};

function showTodayMobile() {

    const btnContainerTodayM = document.querySelector('.containerTodayM');
    const containerCenterRight = document.querySelector('.containerCenterRight');

    btnContainerTodayM.addEventListener('click', () => {

        const containerTodosTodayAndWeekM = document.querySelector('.containerTodosTodayAndWeekM');

        if (!containerTodosTodayAndWeekM) {

            _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('fadeOutAndShrink', containerCenterRight)

            setTimeout(() => {
                containerCenterRight.style.display = 'none';
                genTodayAndWeek('Today',arrTodosToday)
                const containerTodosTodayAndWeekM = document.querySelector('.containerTodosTodayAndWeekM');
                containerTodosTodayAndWeekM.style.position = 'static'
            }, 121);

            toggleBtnToday();

        }else{

            _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('fadeOutAndShrink', containerTodosTodayAndWeekM)

            setTimeout(() => {
                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('deleteElement', containerTodosTodayAndWeekM)
            }, 120);
            

            setTimeout(() => {
                containerCenterRight.style.display = 'none';
                genTodayAndWeek('Today',arrTodosToday)
                const containerTodosTodayAndWeekM = document.querySelector('.containerTodosTodayAndWeekM');
                containerTodosTodayAndWeekM.style.position = 'static'
            }, 121);

            toggleBtnToday()
        }

    })


}

function showWeekMobile() {

    const btnContainerWeekM = document.querySelector('.containerWeekM');
    const containerCenterRight = document.querySelector('.containerCenterRight');

    btnContainerWeekM.addEventListener('click', () => {

        const containerTodosTodayAndWeekM = document.querySelector('.containerTodosTodayAndWeekM');

        if (!containerTodosTodayAndWeekM) {

            _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('fadeOutAndShrink', containerCenterRight)

            setTimeout(() => {
                containerCenterRight.style.display = 'none';
                genTodayAndWeek('Week',arrTodosWeek)
                const containerTodosTodayAndWeekM = document.querySelector('.containerTodosTodayAndWeekM');
                containerTodosTodayAndWeekM.style.position = 'static'                       
            }, 121);

            toggleBtnWeek()

        }else{

            _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('fadeOutAndShrink', containerTodosTodayAndWeekM)

            setTimeout(() => {
                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('deleteElement', containerTodosTodayAndWeekM)
            }, 120);

            setTimeout(() => {
                containerCenterRight.style.display = 'none';
                genTodayAndWeek('Week',arrTodosWeek)  
                const containerTodosTodayAndWeekM = document.querySelector('.containerTodosTodayAndWeekM');
                containerTodosTodayAndWeekM.style.position = 'static'                      
            }, 121);

            toggleBtnWeek()

        }

    })


}

function toggleBtnToday() {

    let arrToggleSectionHighlightOff = ['.containerSvgWeek', '#1C1B1F'];

    _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('toggleSectionHighlight', arrToggleSectionHighlightOff)            

    let arrToggleSectionHighlightOn = ['.containerSvgToday', (0,_projects_js__WEBPACK_IMPORTED_MODULE_2__.findProjectById)(_projects_js__WEBPACK_IMPORTED_MODULE_2__.projectIdSelected).color];
    
    _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('toggleSectionHighlight', arrToggleSectionHighlightOn)


}
function toggleBtnWeek() {

    let arrToggleSectionHighlightOff = ['.containerSvgToday', '#1C1B1F'];

    _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('toggleSectionHighlight', arrToggleSectionHighlightOff)            

    let arrToggleSectionHighlightOn = ['.containerSvgWeek', (0,_projects_js__WEBPACK_IMPORTED_MODULE_2__.findProjectById)(_projects_js__WEBPACK_IMPORTED_MODULE_2__.projectIdSelected).color];

    _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('toggleSectionHighlight', arrToggleSectionHighlightOn)


}

function backToProjects() {
    
    const svgBackToProjects  = document.querySelector('.svgBackToProjects ');
    const containerCenterRight = document.querySelector('.containerCenterRight');

    svgBackToProjects.addEventListener('click', () => {

        const containerTodosTodayAndWeekM = document.querySelector('.containerTodosTodayAndWeekM');
        _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('fadeOutAndShrink', containerTodosTodayAndWeekM)

        setTimeout(() => {
            _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('deleteElement', containerTodosTodayAndWeekM)
        }, 120);

        setTimeout(() => {
            containerCenterRight.style.display = 'flex';
            _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('fadeInAndGrow', containerCenterRight)
        }, 121);

        _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('deleteElement', svgBackToProjects)

        let arrToggleSectionHighlightOff1 = ['.containerSvgToday', '#1C1B1F'];

        _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('toggleSectionHighlight', arrToggleSectionHighlightOff1) 

        let arrToggleSectionHighlightOff = ['.containerSvgWeek', '#1C1B1F'];

        _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('toggleSectionHighlight', arrToggleSectionHighlightOff) 

    })

}

function genTodayAndWeek(title,arrTodos) {
    
    verifyTodoRequirements();

    arrTodoTodayAndWeekMobile[1].innerText = `${title}`;

    _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('createElements', arrTodoTodayAndWeekMobile);
        
    const containerTodosTodayAndWeekM2 = document.querySelector('.containerTodosTodayAndWeekM');

    _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('animationEntry', containerTodosTodayAndWeekM2);

    _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('renderTodos',arrTodos)

    let arrTagetsTW = ['.TW'];
    _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionGhostOutTWAndEntry',arrTagetsTW)

    const svgBackToProjects = document.querySelector('.svgBackToProjects');

    if (!svgBackToProjects) {

        _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('createElements', arrSvgBackToProjects)  

        const svgBackToProjects = document.querySelector('.svgBackToProjects');

        _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('animationEntry', svgBackToProjects)

        backToProjects()              
    }

}

function addTodosToCurrentWeekArr(todo) {
    

    let [yearTodo, monthTodo, dayTodo] = todo.dueDate.split('-');
    let todoDate = new Date(parseInt(yearTodo), parseInt(monthTodo) - 1, parseInt(dayTodo));
    let currentDay = new Date();
    let firstDayWeek = (0,date_fns__WEBPACK_IMPORTED_MODULE_6__["default"])(currentDay);
    let lastDayWeek = (0,date_fns__WEBPACK_IMPORTED_MODULE_7__["default"])(currentDay);

    const currentWeek = {

        start: firstDayWeek,
        end: lastDayWeek,

    };

    if ((0,date_fns__WEBPACK_IMPORTED_MODULE_8__["default"])(todoDate,currentWeek)) {

        let titleTodayAndWeek = document.querySelector('.titleTodayAndWeek');
        let todosTodayAndWeek = document.querySelector('.todosTodayAndWeek');

        arrTodosWeek.push(todo);

        if (todosTodayAndWeek) {
            if (titleTodayAndWeek.textContent == 'Week'){
                
                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('renderTodos', arrTodosWeek);   
                let arrTagetsTW = ['.TW']; 
                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionGhostOutTWAndEntry',arrTagetsTW)
            }
        }

    }
}

function addTodosToCurrentDayArr(todo) {
    
    let currentDay = new Date();
    let [yearTodo, monthTodo, dayTodo] = todo.dueDate.split('-');
    let todoDate = new Date(parseInt(yearTodo), parseInt(monthTodo) - 1, parseInt(dayTodo));

    if ((0,date_fns__WEBPACK_IMPORTED_MODULE_9__["default"])(currentDay,todoDate)) {

        let titleTodayAndWeek = document.querySelector('.titleTodayAndWeek');
        let todosTodayAndWeek = document.querySelector('.todosTodayAndWeek');


        arrTodosToday.push(todo);    

        if (todosTodayAndWeek) {

            if (titleTodayAndWeek.textContent == 'Today'){
                
                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('renderTodos', arrTodosToday);  
                let arrTagetsTW = ['.TW'];
                _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('transitionGhostOutTWAndEntry',arrTagetsTW)  
            }
        }

    }

}

function verifyTodoRequirements() {

    _projects_js__WEBPACK_IMPORTED_MODULE_2__.projects.forEach( objP => {

        objP.todo.forEach(todo => {

            verifyAndAddToToday(todo);
            verifyAndAddToWeek(todo);
        })

    })
}
  
function verifyAndAddToWeek(todo) {

    let [yearTodo, monthTodo, dayTodo] = todo.dueDate.split('-');
    let todoDate = new Date(parseInt(yearTodo), parseInt(monthTodo) - 1, parseInt(dayTodo));
    let currentDay = new Date();
    let firstDayWeek = (0,date_fns__WEBPACK_IMPORTED_MODULE_6__["default"])(currentDay);
    let lastDayWeek = (0,date_fns__WEBPACK_IMPORTED_MODULE_7__["default"])(currentDay);

    const currentWeek = {
      start: firstDayWeek,
      end: lastDayWeek,
    };

    if (!(0,date_fns__WEBPACK_IMPORTED_MODULE_8__["default"])(todoDate,currentWeek)) {

        let todoWeekIndex = arrTodosWeek.findIndex(todoItem => todoItem.todoId == todo.todoId );

        if (todoWeekIndex !== -1){

            arrTodosWeek.splice(todoWeekIndex,1)
            _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('delTodosTW',)
            _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('renderTodos',arrTodosWeek)

        }

    }else{


        if (!arrTodosWeek.some(todoItem => todoItem.todoId === todo.todoId)) {

            let titleTodayAndWeek = document.querySelector('.titleTodayAndWeek');


            arrTodosWeek.push(todo);

        }
    }
}

function verifyAndAddToToday(todo) {

    
    let currentDay = new Date();
    let [yearTodo, monthTodo, dayTodo] = todo.dueDate.split('-');
    let todoDate = new Date(parseInt(yearTodo), parseInt(monthTodo) - 1, parseInt(dayTodo));

    if (!(0,date_fns__WEBPACK_IMPORTED_MODULE_9__["default"])(currentDay,todoDate)) {
            
        let todoTodayIndex = arrTodosToday.findIndex(todoItem => todoItem.todoId == todo.todoId ) ;

        if (todoTodayIndex !== -1){
                
            arrTodosToday.splice(todoTodayIndex,1);
            _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('delTodosTW',)
            _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('renderTodos',arrTodosToday)

        }
            
    }else{

        const todoTodayIndex = arrTodosToday.findIndex(todoItem => todoItem.todoId == todo.todoId );
        let titleTodayAndWeek = document.querySelector('.titleTodayAndWeek');

        if (todoTodayIndex === -1) {

            arrTodosToday.push(todo);
            
        }

    }
}

function todoDone() {

    

    let containerTodos = document.querySelector('.containerTodo');

    containerTodos.addEventListener('click', (e) =>{

        let target = e.target;

        if (target.classList.contains('svgTodo')) {


            let testId;


            target.parentNode.parentNode.dataset.todoId ? testId = target.parentNode.parentNode.dataset.todoId : testId = target.parentNode.dataset.todoId ;

            disableMouseEvents(target);

            if (!findTodoById(testId).done){




                editArrSvgDone(testId)
                editArrSvgDoneTW(testId)


                animationSvg(testId,target);

                findTodoById(testId).toggleDone();

            }else{

                editArrSvgNotDone(testId);
                editArrSvgNotDoneTW(testId);

                animationSvg(testId,target)

                findTodoById(testId).toggleDone();


            }

        }
    })


}

function animationSvg(todoId,target){

    let circlePath = document.querySelector(`.circlePath${todoId}`);

    let containerTAW = document.querySelector('.todosTodayAndWeek');

    if (containerTAW) {

        let todoTWTarget = document.querySelector(`.svgTodoTW${todoId}`);

        if (todoTWTarget) {

            if (!findTodoById(todoId).done) {
            
                let circlePathTW = document.querySelector(`.circlePathTW${todoId}`);
                let containerSvg = document.querySelector(`.svgTodoTW${todoId}`);
                
                hideSvg(circlePathTW);
        
                setTimeout(() => {
        
                    _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('deleteElement',containerSvg.firstChild)
        
                    _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('createElements',arrSvgDoneTW);
        
                    let pathSvgDoneTW = document.querySelector(`.pathSvgDoneTW${todoId}`);
        
                    showSvg(pathSvgDoneTW);
        
                },500)
        
            }else{
        
                let pathSvgDoneTW = document.querySelector(`.pathSvgDoneTW${todoId}`);
                
                let containerSvg = document.querySelector(`.svgTodoTW${todoId}`);
    
    
                hideSvg(pathSvgDoneTW)
        
                setTimeout(() => {
        
    
                    _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('deleteElement',containerSvg.firstChild)
    
    
                    _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('createElements',arrSvgNotDoneTW);
        
                    let circlePathTW = document.querySelector(`.circlePathTW${todoId}`);
        
                    showSvg(circlePathTW);
        
                }, 500);
        
            }
        }

        
    }


    if (!findTodoById(todoId).done) {
        

        hideSvg(circlePath);

        setTimeout(() => {

            target.parentNode.parentNode.dataset.todoId ? _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('deleteElement',target) : _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('deleteElement',target.firstChild);

            _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('createElements',arrSvgDone);

            let pathSvgDone = document.querySelector(`.pathSvgDone${todoId}`);

            showSvg(pathSvgDone);

        },500)

    }else{

        let pathSvgDone = document.querySelector(`.pathSvgDone${todoId}`);

        hideSvg(pathSvgDone)

        setTimeout(() => {

            target.parentNode.parentNode.dataset.todoId ? _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('deleteElement',target) : _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('deleteElement',target.firstChild);

            _pubSub_js__WEBPACK_IMPORTED_MODULE_1__.EventManager.emit('createElements',arrSvgNotDone);

            let circlePath = document.querySelector(`.circlePath${todoId}`);

            showSvg(circlePath);

        }, 500);

        


    }
    
}

function disableMouseEvents(target){
    
    target.style.pointerEvents = 'none';

}

function enableMouseEvents(target){
    
    target.style.pointerEvents = 'auto';

}

function editArrSvgDone(id) {
    
    let colorStroke = (0,_projects_js__WEBPACK_IMPORTED_MODULE_2__.findProjectById)(findTodoById(id).projectId).color;

    arrSvgDone[0].appendChild = `.svgTodo${id}`;
    arrSvgDone[0].innerHTML = `<svg class="svgDone" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="pathSvgDone${id}" d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="${colorStroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;


}
function editArrSvgDoneTW(id) {
    
    let colorStroke = (0,_projects_js__WEBPACK_IMPORTED_MODULE_2__.findProjectById)(findTodoById(id).projectId).color;

    arrSvgDoneTW[0].appendChild = `.svgTodoTW${id}`;
    arrSvgDoneTW[0].innerHTML = `<svg class="svgDone" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="pathSvgDoneTW${id}" d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="${colorStroke}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;


}
function editArrSvgNotDone(id) {
    
    let colorStroke = (0,_projects_js__WEBPACK_IMPORTED_MODULE_2__.findProjectById)(findTodoById(id).projectId).color;

    arrSvgNotDone[0].appendChild = `.svgTodo${id}`;
    arrSvgNotDone[0].innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle class="circlePath${id}" cx="10" cy="10" r="9" stroke="${colorStroke}" stroke-width="2"/></svg>`;


}
function editArrSvgNotDoneTW(id) {
    
    let colorStroke = (0,_projects_js__WEBPACK_IMPORTED_MODULE_2__.findProjectById)(findTodoById(id).projectId).color;

    arrSvgNotDoneTW[0].appendChild = `.svgTodoTW${id}`;
    arrSvgNotDoneTW[0].innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle class="circlePathTW${id}" cx="10" cy="10" r="9" stroke="${colorStroke}" stroke-width="2"/></svg>`;


}

function hideSvg(target){
    
    (0,animejs_lib_anime_es_js__WEBPACK_IMPORTED_MODULE_4__["default"])({
        targets:target,
        strokeDashoffset: [animejs_lib_anime_es_js__WEBPACK_IMPORTED_MODULE_4__["default"].setDashoffset, 0],
        easing: 'easeInOutSine',
        direction:'reverse',
        duration: 500,
    });

}

function showSvg(target) {
    
    (0,animejs_lib_anime_es_js__WEBPACK_IMPORTED_MODULE_4__["default"])({
        targets:target,
        strokeDashoffset: [animejs_lib_anime_es_js__WEBPACK_IMPORTED_MODULE_4__["default"].setDashoffset, 0],
        easing: 'easeInOutSine',
        duration: 500,
        direction: 'normal',
        complete: containerFMouseETextO(target),           
    })

}

function containerFMouseETextO(target) {
    enableMouseEvents(target.parentNode.parentNode.parentNode)
    textOpacity(target)
}

function textOpacity(target) {

    let test1 = target.parentNode.parentNode.parentNode.parentNode.childNodes[1];
    let idTarget = target.parentNode.parentNode.parentNode.parentNode.dataset.todoId;

    if (!findTodoById(idTarget).done){

        (0,animejs_lib_anime_es_js__WEBPACK_IMPORTED_MODULE_4__["default"])({
            targets: test1,
            easing: 'easeInOutSine',
            direction: 'normal',
            opacity:1,
            duration: 300,
        }) 
        
    }else{
        (0,animejs_lib_anime_es_js__WEBPACK_IMPORTED_MODULE_4__["default"])({
            targets: test1,
            easing: 'easeInOutSine',
            direction: 'normal',
            opacity:.5,
            duration: 300,
        }) 
    }

}

function animationEntry(target) {
    
    (0,animejs_lib_anime_es_js__WEBPACK_IMPORTED_MODULE_4__["default"])({
        targets:target,
        opacity: [0,1],
        scale : [0,1],
        easing: 'easeOutExpo',
        duration: 250,
        direction: 'normal',
    })

}

function animationOut(target) {
    
    (0,animejs_lib_anime_es_js__WEBPACK_IMPORTED_MODULE_4__["default"])({
        targets:target,
        filter: 'blur(5px)',
        opacity: [1,0],
        scale : [1,.8],
        easing: 'easeOutExpo',
        duration: 500,
    })

}

function checkTodoDone(todo) {

    if (todo.done) {

        arrTodoTemplate[1].innerHTML = `<svg class="svgDone" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="pathSvgDone${todo.todoId}" d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="${(0,_projects_js__WEBPACK_IMPORTED_MODULE_2__.findProjectById)(todo.projectId).color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
        arrTodoTemplate[2].attributes.class = 'ptodo pTodoDone';
    }else{

        arrTodoTemplate[1].innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle class="circlePath${todo.todoId}" cx="10" cy="10" r="9" stroke="${(0,_projects_js__WEBPACK_IMPORTED_MODULE_2__.findProjectById)(todo.projectId).color}" stroke-width="2"/></svg>`;
        arrTodoTemplate[2].attributes.class = 'ptodo';
    }   

}
function checkTodoDoneTW(todo) {

    if (todo.done) {

        arrTodoTemplate[1].innerHTML = `<svg class="svgDone" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="pathSvgDoneTW${todo.todoId}" d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="${(0,_projects_js__WEBPACK_IMPORTED_MODULE_2__.findProjectById)(todo.projectId).color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
        arrTodoTemplate[2].attributes.class = 'ptodo pTodoDone';
    }else{

        arrTodoTemplate[1].innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle class="circlePathTW${todo.todoId}" cx="10" cy="10" r="9" stroke="${(0,_projects_js__WEBPACK_IMPORTED_MODULE_2__.findProjectById)(todo.projectId).color}" stroke-width="2"/></svg>`;
        arrTodoTemplate[2].attributes.class = 'ptodo';
    }


}

function exist() {

    if(!localStorage.getItem('countIdTodo')) {
        populateStorageT();
        
    }else {
        let countTodoSaved = localStorage.getItem('countIdTodo');
        countTodo = countTodoSaved;

    }
}

function populateStorageT(){
    
    localStorage.setItem('countIdTodo',countTodo)

}

function saveOnPageReload() {
    
    window.addEventListener('beforeunload', () => {

        populateStorageT();

    })

}

function removeOverflow() {
    
    const containerTodo = document.querySelector('.containerTodo')
    const containerTodoCenter = document.querySelector('.containerTodoCenter')
    const outer = document.querySelector('.outer')
    let screenWidth ;
    containerTodo.style.overflowY = 'visible';
    containerTodo.style.overflowX = 'visible';
    outer.style.overflow = 'visible';

    screenWidth = window.screen.availWidth;

    if (screenWidth > 912) {
        containerTodoCenter.style.overflowY = 'clip';        
    }else{
        containerTodoCenter.style.overflowY = 'unset';                
    }



}

function addOverflow() {
    
    const containerTodo = document.querySelector('.containerTodo')
    const containerTodoCenter = document.querySelector('.containerTodoCenter')
    const outer = document.querySelector('.outer')

    containerTodo.style.overflowY = 'auto';
    containerTodo.style.overflowX = 'hidden';
    outer.style.overflow = 'hidden';

    containerTodoCenter.style.removeProperty('overflow-y');
}


saveOnPageReload();


/***/ }),

/***/ "./src/ui.js":
/*!*******************!*\
  !*** ./src/ui.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "init": () => (/* binding */ init)
/* harmony export */ });
/* harmony import */ var _pubSub_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./pubSub.js */ "./src/pubSub.js");
/* harmony import */ var _projects_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects.js */ "./src/projects.js");
/* harmony import */ var _todos_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./todos.js */ "./src/todos.js");
/* harmony import */ var _domCreation_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./domCreation.js */ "./src/domCreation.js");
/* harmony import */ var animejs_lib_anime_es_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! animejs/lib/anime.es.js */ "./node_modules/animejs/lib/anime.es.js");










function domElements(arr) {

    arr.forEach(elementObject => {
        
        (0,_domCreation_js__WEBPACK_IMPORTED_MODULE_3__["default"])(elementObject.elementType,elementObject.attributes,elementObject.innerHTML,elementObject.innerText,document.querySelector(elementObject.appendChild));
        
    });
   
}  

function init() {
    

    _pubSub_js__WEBPACK_IMPORTED_MODULE_0__.EventManager.on('projectCreated', addProjectDOM);
    
    _pubSub_js__WEBPACK_IMPORTED_MODULE_0__.EventManager.on('todoCreated', addTodoProjectItemDOM);

    _pubSub_js__WEBPACK_IMPORTED_MODULE_0__.EventManager.on('changeProject', renderTodo);
    
    _pubSub_js__WEBPACK_IMPORTED_MODULE_0__.EventManager.on('createElements', domElements);

    _pubSub_js__WEBPACK_IMPORTED_MODULE_0__.EventManager.on('deleteElement', delElements);

    _pubSub_js__WEBPACK_IMPORTED_MODULE_0__.EventManager.on('todoUpdated', editTodo);
    
    _pubSub_js__WEBPACK_IMPORTED_MODULE_0__.EventManager.on('renderTodos', renderTodosTodayAndWeek);

    _pubSub_js__WEBPACK_IMPORTED_MODULE_0__.EventManager.on('delTodosTW', delTodosTodayAndWeek);
    
    _pubSub_js__WEBPACK_IMPORTED_MODULE_0__.EventManager.on('animationEntry', animationEntry);
    
    _pubSub_js__WEBPACK_IMPORTED_MODULE_0__.EventManager.on('animationOut', animationOut);

    _pubSub_js__WEBPACK_IMPORTED_MODULE_0__.EventManager.on('transitionBgBtn', transitionBgBtn);
    
    _pubSub_js__WEBPACK_IMPORTED_MODULE_0__.EventManager.on('transitionBgBtn2', transitionBgBtn2);

    _pubSub_js__WEBPACK_IMPORTED_MODULE_0__.EventManager.on('transitionBgInput', transitionBgInput);

    _pubSub_js__WEBPACK_IMPORTED_MODULE_0__.EventManager.on('animationError', animationError);

    _pubSub_js__WEBPACK_IMPORTED_MODULE_0__.EventManager.on('transitionChangeTitle', transitionChangeTitle);

    _pubSub_js__WEBPACK_IMPORTED_MODULE_0__.EventManager.on('transitionGhostEntry', transitionGhostEntry);

    _pubSub_js__WEBPACK_IMPORTED_MODULE_0__.EventManager.on('transitionGhostOut', transitionGhostOut);

    _pubSub_js__WEBPACK_IMPORTED_MODULE_0__.EventManager.on('transitionOrganizeItems', transitionOrganizeItems);

    _pubSub_js__WEBPACK_IMPORTED_MODULE_0__.EventManager.on('transitionBtnClick', transitionBtnClick);

    _pubSub_js__WEBPACK_IMPORTED_MODULE_0__.EventManager.on('transitionScale', transitionHoverScale);

    _pubSub_js__WEBPACK_IMPORTED_MODULE_0__.EventManager.on('transitionHeight', transitionHeight);

    _pubSub_js__WEBPACK_IMPORTED_MODULE_0__.EventManager.on('transitionGhostEntryProjects', transitionGhostEntryProjects);

    _pubSub_js__WEBPACK_IMPORTED_MODULE_0__.EventManager.on('transitionProjectSelected', transitionProjectSelected);

    _pubSub_js__WEBPACK_IMPORTED_MODULE_0__.EventManager.on('transitionGhostOutTWAndEntry', transitionGhostOutTW);

    _pubSub_js__WEBPACK_IMPORTED_MODULE_0__.EventManager.on('renderProjects', renderProjects2);

    _pubSub_js__WEBPACK_IMPORTED_MODULE_0__.EventManager.on('renderProjectsMobile', renderProjectsMobile);

    _pubSub_js__WEBPACK_IMPORTED_MODULE_0__.EventManager.on('fadeOutAndShrink', fadeOutAndShrink);
    
    _pubSub_js__WEBPACK_IMPORTED_MODULE_0__.EventManager.on('fadeInAndGrow', fadeInAndGrow);

    _pubSub_js__WEBPACK_IMPORTED_MODULE_0__.EventManager.on('fadeInAndSlideUp', fadeInAndSlideUp);

    _pubSub_js__WEBPACK_IMPORTED_MODULE_0__.EventManager.on('fadeOutAndSlideDown', fadeOutAndSlideDown);

    _pubSub_js__WEBPACK_IMPORTED_MODULE_0__.EventManager.on('projectAddedFlash', projectAddedFlash);

    _pubSub_js__WEBPACK_IMPORTED_MODULE_0__.EventManager.on('toggleSectionHighlight', toggleSectionHighlight);

    _pubSub_js__WEBPACK_IMPORTED_MODULE_0__.EventManager.on('fadeInDelayedDivs', fadeInDelayedDivs);

    _pubSub_js__WEBPACK_IMPORTED_MODULE_0__.EventManager.on('fadeOutDelayedDivs', fadeOutDelayedDivs);

    

}

function addProjectDOM(project) {    

    _projects_js__WEBPACK_IMPORTED_MODULE_1__.itemProject[0].attributes["class"] = `itemProject item${project.id}`;
    _projects_js__WEBPACK_IMPORTED_MODULE_1__.itemProject[0].attributes["data-project-id"] = `${_projects_js__WEBPACK_IMPORTED_MODULE_1__.countChilds}`;
    _projects_js__WEBPACK_IMPORTED_MODULE_1__.itemProject[0].attributes.style = `background-color: ${project.color}`;

    domElements(_projects_js__WEBPACK_IMPORTED_MODULE_1__.itemProject);

}

function renderProjects2(arr) {

    let countChildsP = 0;
    arr.forEach(projectItem => {

        _projects_js__WEBPACK_IMPORTED_MODULE_1__.itemProject[0].attributes["class"] = `itemProject item${projectItem.id}`;
        _projects_js__WEBPACK_IMPORTED_MODULE_1__.itemProject[0].attributes["data-project-id"] = `${projectItem.id}`;
        _projects_js__WEBPACK_IMPORTED_MODULE_1__.itemProject[0].attributes.style = `background-color: ${projectItem.color}`;

        domElements(_projects_js__WEBPACK_IMPORTED_MODULE_1__.itemProject);
        countChildsP++;

    })

}

function renderProjectsMobile(arr) {
    
    let countChildsP = 0;
    arr.forEach(projectItem => {

        _projects_js__WEBPACK_IMPORTED_MODULE_1__.itemProjectMobile[0].attributes["class"] = `containerItemProjectMobile${projectItem.id} itemProjectM`;
        _projects_js__WEBPACK_IMPORTED_MODULE_1__.itemProjectMobile[0].attributes["data-project-id"] = `${projectItem.id}`;

        _projects_js__WEBPACK_IMPORTED_MODULE_1__.itemProjectMobile[1].attributes.style = `background-color: ${projectItem.color}`;
        _projects_js__WEBPACK_IMPORTED_MODULE_1__.itemProjectMobile[1].appendChild = `.containerItemProjectMobile${projectItem.id}`;

        _projects_js__WEBPACK_IMPORTED_MODULE_1__.itemProjectMobile[2].innerText = `${projectItem.name}`
        _projects_js__WEBPACK_IMPORTED_MODULE_1__.itemProjectMobile[2].appendChild = `.containerItemProjectMobile${projectItem.id}`;


        domElements(_projects_js__WEBPACK_IMPORTED_MODULE_1__.itemProjectMobile);
        countChildsP++;
    })

}

function addTodoProjectItemDOM(obj) {
    
    _todos_js__WEBPACK_IMPORTED_MODULE_2__.arrTodoTemplate[0].appendChild = `.containerTodo`;
    _todos_js__WEBPACK_IMPORTED_MODULE_2__.arrTodoTemplate[0].attributes["class"] = `itemTodo${_todos_js__WEBPACK_IMPORTED_MODULE_2__.countTodo} todoStyle`;
    _todos_js__WEBPACK_IMPORTED_MODULE_2__.arrTodoTemplate[0].attributes["data-todo-id"] = `${_todos_js__WEBPACK_IMPORTED_MODULE_2__.countTodo}`;


    _todos_js__WEBPACK_IMPORTED_MODULE_2__.arrTodoTemplate[1].appendChild = `.itemTodo${_todos_js__WEBPACK_IMPORTED_MODULE_2__.countTodo}`;
    _todos_js__WEBPACK_IMPORTED_MODULE_2__.arrTodoTemplate[2].appendChild = `.itemTodo${_todos_js__WEBPACK_IMPORTED_MODULE_2__.countTodo}`;
    _todos_js__WEBPACK_IMPORTED_MODULE_2__.arrTodoTemplate[3].appendChild = `.itemTodo${_todos_js__WEBPACK_IMPORTED_MODULE_2__.countTodo}`;
    _todos_js__WEBPACK_IMPORTED_MODULE_2__.arrTodoTemplate[4].appendChild = `.itemTodo${_todos_js__WEBPACK_IMPORTED_MODULE_2__.countTodo}`;
    
    (0,_todos_js__WEBPACK_IMPORTED_MODULE_2__.checkTodoDone)(obj);

    _todos_js__WEBPACK_IMPORTED_MODULE_2__.arrTodoTemplate[1].innerHTML = `<svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><circle class="circlePath${obj.todoId}" cx="10" cy="10" r="9" stroke="${(0,_projects_js__WEBPACK_IMPORTED_MODULE_1__.findProjectById)(obj.projectId).color}" stroke-width="2"/></svg>`;
    _todos_js__WEBPACK_IMPORTED_MODULE_2__.arrTodoTemplate[1].attributes["class"] = `svgTodo svgTodo${obj.todoId}`;

    _todos_js__WEBPACK_IMPORTED_MODULE_2__.arrTodoTemplate[3].innerHTML = `<svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg"><circle class="svgPriority" cx="3" cy="3" r="3" fill="${obj.priority[0]}"/></svg>`;
    
    
    _todos_js__WEBPACK_IMPORTED_MODULE_2__.arrTodoTemplate[2].innerText = `${obj.name}`;

    domElements(_todos_js__WEBPACK_IMPORTED_MODULE_2__.arrTodoTemplate);
    animationEntry(`.itemTodo${obj.todoId}`)
}

function renderTodo(arrTodos) {

    let countClass = 0;

    delTodos();

    arrTodos.forEach(todo => {

        _todos_js__WEBPACK_IMPORTED_MODULE_2__.arrTodoTemplate[0].appendChild = `.containerTodo`;
        _todos_js__WEBPACK_IMPORTED_MODULE_2__.arrTodoTemplate[0].attributes["class"] = `itemTodo${countClass} todoStyle TP`;
        _todos_js__WEBPACK_IMPORTED_MODULE_2__.arrTodoTemplate[0].attributes["data-todo-id"] = `${todo.todoId}`;


        _todos_js__WEBPACK_IMPORTED_MODULE_2__.arrTodoTemplate[1].appendChild = `.itemTodo${countClass}`;
        _todos_js__WEBPACK_IMPORTED_MODULE_2__.arrTodoTemplate[2].appendChild = `.itemTodo${countClass}`;
        _todos_js__WEBPACK_IMPORTED_MODULE_2__.arrTodoTemplate[3].appendChild = `.itemTodo${countClass}`;
        _todos_js__WEBPACK_IMPORTED_MODULE_2__.arrTodoTemplate[4].appendChild = `.itemTodo${countClass}`;

        (0,_todos_js__WEBPACK_IMPORTED_MODULE_2__.checkTodoDone)(todo);
        _todos_js__WEBPACK_IMPORTED_MODULE_2__.arrTodoTemplate[1].attributes["class"] = `svgTodo svgTodo${todo.todoId}`;
        _todos_js__WEBPACK_IMPORTED_MODULE_2__.arrTodoTemplate[3].innerHTML = `<svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg"><circle class="svgPriority" cx="3" cy="3" r="3" fill="${todo.priority[0]}"/></svg>`;


        _todos_js__WEBPACK_IMPORTED_MODULE_2__.arrTodoTemplate[2].innerText = `${todo.name}`;
        domElements(_todos_js__WEBPACK_IMPORTED_MODULE_2__.arrTodoTemplate);
        countClass++;

        
    })

}

function renderTodosTodayAndWeek(arrTodos) {
    
    let countClass = 0;

    delTodosTodayAndWeek();

    arrTodos.forEach(todo => {


        _todos_js__WEBPACK_IMPORTED_MODULE_2__.arrTodoTemplate[0].appendChild = `.todosTodayAndWeek`;
        _todos_js__WEBPACK_IMPORTED_MODULE_2__.arrTodoTemplate[0].attributes["class"] = `itemTodoTW${countClass} todoStyle TW`;
        _todos_js__WEBPACK_IMPORTED_MODULE_2__.arrTodoTemplate[0].attributes["data-todo-id"] = `${todo.todoId}`;


        _todos_js__WEBPACK_IMPORTED_MODULE_2__.arrTodoTemplate[1].appendChild = `.itemTodoTW${countClass}`;
        _todos_js__WEBPACK_IMPORTED_MODULE_2__.arrTodoTemplate[2].appendChild = `.itemTodoTW${countClass}`;
        _todos_js__WEBPACK_IMPORTED_MODULE_2__.arrTodoTemplate[3].appendChild = `.itemTodoTW${countClass}`;
        _todos_js__WEBPACK_IMPORTED_MODULE_2__.arrTodoTemplate[4].appendChild = `.itemTodoTW${countClass}`;

        (0,_todos_js__WEBPACK_IMPORTED_MODULE_2__.checkTodoDoneTW)(todo)
        _todos_js__WEBPACK_IMPORTED_MODULE_2__.arrTodoTemplate[1].attributes["class"] = `svgTodo svgTodoTW${todo.todoId}`;
        _todos_js__WEBPACK_IMPORTED_MODULE_2__.arrTodoTemplate[3].innerHTML = `<svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg"><circle class="svgPriority" cx="3" cy="3" r="3" fill="${todo.priority[0]}"/></svg>`;

        _todos_js__WEBPACK_IMPORTED_MODULE_2__.arrTodoTemplate[2].innerText = `${todo.name}`;
        domElements(_todos_js__WEBPACK_IMPORTED_MODULE_2__.arrTodoTemplate);
        countClass++;
    })

}

function delTodos() {

    const containerTodo = document.querySelector('.containerTodo');
    const btnNewTodo = document.querySelector('.btnNewTodo');

    while (containerTodo.firstChild !== btnNewTodo) {
        containerTodo.removeChild(containerTodo.firstChild);
    }

    while (containerTodo.lastChild !== btnNewTodo) {
        containerTodo.removeChild(containerTodo.lastChild);
    }

}

function delTodosTodayAndWeek() {

    const containerTodosTodayAndWeek = document.querySelector('.todosTodayAndWeek');

    if (containerTodosTodayAndWeek) {

        while (containerTodosTodayAndWeek.firstChild) {
            containerTodosTodayAndWeek.removeChild(containerTodosTodayAndWeek.firstChild);
        }    
    }
    
}

function delElements(element) {
    
    element.remove();
}

function editTodo(arr) {
    
    let instance = arr[3]._tippy;

    arr[1].textContent = arr[0].name;
    arr[2].style.fill = arr[0].priority[0];
    instance.setContent(`${arr[0].priority[1]}`)
}

function animationEntry(target) {
    
    (0,animejs_lib_anime_es_js__WEBPACK_IMPORTED_MODULE_4__["default"])({
        targets:target,
        opacity: [0,1],
        scale : [0,1],
        easing: 'easeOutExpo',
        duration: 250,
        direction: 'normal',
    })

}

function animationOut(target) {
    
    (0,animejs_lib_anime_es_js__WEBPACK_IMPORTED_MODULE_4__["default"])({
        targets:target,
        filter: 'blur(5px)',
        opacity: [1,0],
        scale : [1,.8],
        easing: 'easeOutExpo',
        duration: 300,
    })

}

function transitionBgBtn(arr) {
    
    

    arr[0].addEventListener('mouseover', (e) => {

        (0,animejs_lib_anime_es_js__WEBPACK_IMPORTED_MODULE_4__["default"])({
            targets:arr[0],
            backgroundColor: `${arr[2]}`,
            scale: [
                { value: 1, duration: 0 },
                { value: 1.1, duration: 300 }
            ],
            easing: 'easeOutExpo',
            duration: 200,
        })

    })

    arr[0].addEventListener('mouseout', () => {

        ;(0,animejs_lib_anime_es_js__WEBPACK_IMPORTED_MODULE_4__["default"])({
            targets:arr[0],
            backgroundColor: `${arr[1]}`,
            scale: [
                { value: 1.1, duration: 0 },
                { value: 1, duration: 300 }
            ],
            easing: 'easeOutExpo',
            duration: 300,
        })

    })

    
}

function transitionBgBtn2(arr) {
    
    

    arr.addEventListener('mouseover', () => {

        (0,animejs_lib_anime_es_js__WEBPACK_IMPORTED_MODULE_4__["default"])({
            targets:arr,
            filter:[{value: 'brightness(1)', duration:0},{value:'brightness(1.5)',duration: 400}],
            scale: [
                { value: 1, duration: 0 },
                { value: 1.08, duration: 400 }
            ],
            easing: 'easeOutExpo',
            duration: 200,
        })

    })

    arr.addEventListener('mouseout', () => {

        ;(0,animejs_lib_anime_es_js__WEBPACK_IMPORTED_MODULE_4__["default"])({
            targets:arr,
            filter:[{value: 'brightness(1.5)', duration:0},{value:'brightness(1)',duration: 400}],
            scale: [
                { value: 1.08, duration: 0 },
                { value: 1, duration: 400 }
            ],
            easing: 'easeOutExpo',
            duration: 200,
        })

    })

}

function transitionBgInput(arr) {
    
    

    arr.addEventListener('mouseover', (e) => {
        e.stopPropagation();
        (0,animejs_lib_anime_es_js__WEBPACK_IMPORTED_MODULE_4__["default"])({
            targets:arr,
            filter:[{value: 'brightness(1)', duration:0},{value:'brightness(1.5)',duration: 400}],
            easing: 'easeOutExpo',
            duration: 200,
        })

    })

    arr.addEventListener('mouseout', (e) => {
        e.stopPropagation();
        (0,animejs_lib_anime_es_js__WEBPACK_IMPORTED_MODULE_4__["default"])({
            targets:arr,
            filter:[{value: 'brightness(1.5)', duration:0},{value:'brightness(1)',duration: 400}],
            easing: 'easeOutExpo',
            duration: 200,
        })

    })


}

function animationError(target){
    
    (0,animejs_lib_anime_es_js__WEBPACK_IMPORTED_MODULE_4__["default"])({
        targets: target,
        translateX:[{value: 10,duration: 100},{value: -10,duration: 50},{value: 10,duration: 100},{value: -10,duration: 50},{value:0,duration: 200}],
        easing: 'easeOutExpo',
        duration: 300,
    })

}

function transitionChangeTitle(target) {
    
    (0,animejs_lib_anime_es_js__WEBPACK_IMPORTED_MODULE_4__["default"])({
        targets:target,
        translateY:[{value: -20,duration: 200},{value: 100,duration: 100},{value: -20,duration: 200},{value: 0,duration: 100}],
        opacity:[{value: 0,duration:500},{value: 1,duration:200}],
        easing: 'easeOutExpo',
        duration: 200,
    })

}

function transitionGhostEntry(target) {
    
    (0,animejs_lib_anime_es_js__WEBPACK_IMPORTED_MODULE_4__["default"])({
        targets:target,
        translateY:[{value: -10,duration: 200},{value: 0,duration: 300}],
        opacity:[{value: 1,duration:0},{value: 0,duration:400},{value: 1,duration:100}],
        easing: 'easeOutExpo',
        duration: 300,
    })

}
function transitionGhostOut(arr) {
    
    (0,animejs_lib_anime_es_js__WEBPACK_IMPORTED_MODULE_4__["default"])({
        targets:arr[0],
        translateY:[{value: -10,duration: 200}],
        opacity:[{value: 0,duration:200}],
        easing: 'easeOutExpo',
        duration: 200,
        complete: transitionOrganizeItems(),
    })

}

function transitionOrganizeItems() {
    
    
    const remainingItems = document.querySelectorAll('.TP');
    
    (0,animejs_lib_anime_es_js__WEBPACK_IMPORTED_MODULE_4__["default"])({
        targets: remainingItems,
        translateY: [{value: 0,duration: 100}],
        opacity: [{value: 0,duration: 300},{value: 1,duration: 200}],
        easing: 'easeInOutQuad',
        duration: 200,
        delay: function(target, index, total) {
            return index * 50;
        }
    });
        
        
        
   
}

function transitionGhostOutTW(arr) {

    (0,animejs_lib_anime_es_js__WEBPACK_IMPORTED_MODULE_4__["default"])({
        targets:arr[0],
        translateY:[{value: -10,duration: 200}],
        opacity:[{value: 0,duration:200}],
        easing: 'easeOutExpo',
        duration: 200,
        complete: transitionOrganizeItemsTW(),
    })
    
}

function transitionOrganizeItemsTW() {
    
    
    const remainingItems = document.querySelectorAll('.TW');
    
    (0,animejs_lib_anime_es_js__WEBPACK_IMPORTED_MODULE_4__["default"])({
        targets: remainingItems,
        translateY: [{value: 0,duration: 100}],
        opacity: [{value: 0,duration: 300},{value: 1,duration: 200}],
        easing: 'easeInOutQuad',
        duration: 200,
        delay: function(target, index, total) {
            return index * 50;
        }
    });
        
        
        
   
}

function transitionBtnClick(target) {

    (0,animejs_lib_anime_es_js__WEBPACK_IMPORTED_MODULE_4__["default"])({
        targets: target,
        scale: [{value: 1,duration: 100},{value: 1.1,duration: 100}],
        easing: 'easeInOutQuad',
        duration: 200,
    });
}

function transitionHoverScale(target) {

    target.addEventListener('mouseover', () => {

        (0,animejs_lib_anime_es_js__WEBPACK_IMPORTED_MODULE_4__["default"])({
            targets: target,
            scale: [{value: 1,duration: 100},{value: 1.1,duration: 200}],
            easing: 'easeInOutQuad',
            duration: 100,
        });

    })

    target.addEventListener('mouseout', () => {

        ;(0,animejs_lib_anime_es_js__WEBPACK_IMPORTED_MODULE_4__["default"])({
            targets:target,
            scale: [{value: 1.1,duration: 100},{value: 1,duration: 200}],
            easing: 'easeOutExpo',
            duration: 100,
        })

    })
}

function transitionHeight(target) {
    
    let height = target.offsetHeight;
    let newHeight = height + 37;
    (0,animejs_lib_anime_es_js__WEBPACK_IMPORTED_MODULE_4__["default"])({
        targets:target,
        height: [{value: `${newHeight}px`}],
        easing: 'easeOutExpo',
        duration: 200,
    })

}

function transitionGhostEntryProjects(target) {
    
    (0,animejs_lib_anime_es_js__WEBPACK_IMPORTED_MODULE_4__["default"])({
        targets:target,
        translateY:[{value: -10,duration: 200},{value: 0,duration: 300}],
        opacity:[{value: 0,duration:200},{value: 1,duration:100}],
        easing: 'easeOutExpo',
        duration: 300,
    })

}

function transitionProjectSelected(target) {
    
    (0,animejs_lib_anime_es_js__WEBPACK_IMPORTED_MODULE_4__["default"])({
        targets:target,
        outlineWidth: [{value: '10px',duration:100},{value: '5px',duration:50},{value: '3px',duration:100}],
        easing: 'easeOutExpo',
        duration: 250,
    })

}

function fadeOutAndShrink(target) {
    
    (0,animejs_lib_anime_es_js__WEBPACK_IMPORTED_MODULE_4__["default"])({
        targets: target,
        scale:.8,
        opacity: 0,
        easing:'easeOutExpo',
        duration: 150,
    })

}
function fadeInAndGrow(target) {
    
    (0,animejs_lib_anime_es_js__WEBPACK_IMPORTED_MODULE_4__["default"])({
        targets: target,
        scale:1,
        opacity: 1,
        easing:'easeOutExpo',
        duration: 150,
    })

}

function fadeInAndSlideUp(target) {

    (0,animejs_lib_anime_es_js__WEBPACK_IMPORTED_MODULE_4__["default"])({
        targets: target,
        translateY: 30,
        opacity: 1,
        easing:'easeOutExpo',
        duration: 180,
    })

}

function fadeOutAndSlideDown(target) {

    (0,animejs_lib_anime_es_js__WEBPACK_IMPORTED_MODULE_4__["default"])({
        targets: target,
        translateY: 10,
        opacity: 0,
        easing:'easeOutExpo',
        duration: 180,
    })

}

function projectAddedFlash(color) {

    let pathSvgProjects = document.querySelector('.pathSvgProjects');
    let screenWidth;

    screenWidth = window.screen.availWidth;

    if (screenWidth <= 912) {

        pathSvgProjects.style.transition = 'stroke 0.4s';
        pathSvgProjects.style.stroke = `${color}`;
    
        setTimeout(() => {
            pathSvgProjects.style.stroke = '#FFFFFF';
        }, 400);
    }
    
    
}

function toggleSectionHighlight(arr) {
    
    (0,animejs_lib_anime_es_js__WEBPACK_IMPORTED_MODULE_4__["default"])({
        targets: arr[0],
        backgroundColor: hexToRgba(arr[1],0.3),
        easing:'easeOutExpo',
        duration: 150,
    })

    function hexToRgba(hex, alpha) {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }

      

}

function fadeInDelayedDivs() {
    
    const remainingItems = document.querySelectorAll('.itemDd');

    (0,animejs_lib_anime_es_js__WEBPACK_IMPORTED_MODULE_4__["default"])({
        targets: remainingItems,
        scale: 1,
        opacity: 1,
        easing: 'easeInOutQuad',
        duration: 150,
        delay: function(target, index, total) {
            return index * 50;
        }
    });
}
function fadeOutDelayedDivs() {
    
    const remainingItems = document.querySelectorAll('.itemDd');

    (0,animejs_lib_anime_es_js__WEBPACK_IMPORTED_MODULE_4__["default"])({
        targets: remainingItems,
        scale: .8,
        opacity: 0,
        easing: 'easeInOutQuad',
        duration: 150,
        delay: function(target, index, total) {
            return index * 50;
        }
    });
}


/***/ }),

/***/ "./src/font/Roboto-Regular.ttf":
/*!*************************************!*\
  !*** ./src/font/Roboto-Regular.ttf ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "fc2b5060f7accec5cf74.ttf";

/***/ }),

/***/ "./src/imgs/gohan.png":
/*!****************************!*\
  !*** ./src/imgs/gohan.png ***!
  \****************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

module.exports = __webpack_require__.p + "9eb234ddec0335614d96.png";

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/global */
/******/ 	(() => {
/******/ 		__webpack_require__.g = (function() {
/******/ 			if (typeof globalThis === 'object') return globalThis;
/******/ 			try {
/******/ 				return this || new Function('return this')();
/******/ 			} catch (e) {
/******/ 				if (typeof window === 'object') return window;
/******/ 			}
/******/ 		})();
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/publicPath */
/******/ 	(() => {
/******/ 		var scriptUrl;
/******/ 		if (__webpack_require__.g.importScripts) scriptUrl = __webpack_require__.g.location + "";
/******/ 		var document = __webpack_require__.g.document;
/******/ 		if (!scriptUrl && document) {
/******/ 			if (document.currentScript)
/******/ 				scriptUrl = document.currentScript.src
/******/ 			if (!scriptUrl) {
/******/ 				var scripts = document.getElementsByTagName("script");
/******/ 				if(scripts.length) scriptUrl = scripts[scripts.length - 1].src
/******/ 			}
/******/ 		}
/******/ 		// When supporting browsers where an automatic publicPath is not supported you must specify an output.publicPath manually via configuration
/******/ 		// or pass an empty string ("") and set the __webpack_public_path__ variable from your code to use your own logic.
/******/ 		if (!scriptUrl) throw new Error("Automatic publicPath is not supported in this browser");
/******/ 		scriptUrl = scriptUrl.replace(/#.*$/, "").replace(/\?.*$/, "").replace(/\/[^\/]+$/, "/");
/******/ 		__webpack_require__.p = scriptUrl;
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		__webpack_require__.b = document.baseURI || self.location.href;
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"index": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		// no on chunks loaded
/******/ 		
/******/ 		// no jsonp function
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _style_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./style.css */ "./src/style.css");
/* harmony import */ var _domCreation_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./domCreation.js */ "./src/domCreation.js");
/* harmony import */ var _projects_js__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./projects.js */ "./src/projects.js");
/* harmony import */ var _pubSub_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pubSub.js */ "./src/pubSub.js");
/* harmony import */ var _todos_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./todos.js */ "./src/todos.js");
/* harmony import */ var _ui_js__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./ui.js */ "./src/ui.js");











const arrElementsHome = [

    //  childs body

    {
        elementType: 'div',
        attributes: {class:'containerTodoLeft'},
        appendChild: 'body',
    },

    {
        elementType: 'div',
        attributes: {class:'miniP'},
        appendChild: 'body',
    },

    {
        elementType: 'div',
        attributes: {class:'containerCenterRight'},
        appendChild: 'body',
    },
        
    {
        elementType: 'div',
        attributes: {class:'containerTodoCenter'},
        appendChild: '.containerCenterRight',
    },

    //  childs containerTodoLeft

    {
        elementType: 'p',
        attributes: {class:'titleProjects'},
        innerText: 'Projects',
        appendChild: '.containerTodoLeft',
    },

    {
        elementType: 'div',
        attributes: {class:'containerProjects'},
        appendChild: '.containerTodoLeft',
    },

    {
        elementType: 'div',
        attributes: {class:'btnNewProject'},
        innerHTML: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4V20M20 12L4 12" stroke="#E6E1E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        appendChild: '.containerTodoLeft',
    },

    {
        elementType: 'div',
        attributes: {class:'containerTodayAndWeek'},
        appendChild: '.containerTodoLeft',
    },

    //  childs containerTodoCenter

    {
        elementType: 'p',
        attributes: {class:'titleTodoProject'},
        innerText: 'To do',
        appendChild: '.containerTodoCenter',
    },

    {
        elementType: 'div',
        attributes: {class:'outer'},
        appendChild: '.containerTodoCenter',
    },

    {
        elementType: 'div',
        attributes: {class:'containerTodo'},
        appendChild: '.outer',
    },

    
    // child containerTodo

    {
        elementType: 'div',
        attributes: {class:'btnNewTodo'},
        innerHTML: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M12 4V20M20 12L4 12" stroke="#E6E1E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        appendChild: '.containerTodo',
    },

    // containerTodayAndWeek

    {
        elementType: 'div',
        attributes: {class:'itemSvg svgToday'},
        innerHTML: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="#E6E1E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="6" y="10" width="12" height="2" fill="#4A4458"/><rect x="6" y="10" width="3" height="2" rx="1" fill="#D9D9D9"/></svg>' ,
        appendChild: '.containerTodayAndWeek',
    },
    {
        elementType: 'div',
        attributes: {class:'itemSvg svgWeek'},
        innerHTML:  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="#E6E1E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' ,
        appendChild: '.containerTodayAndWeek',
    },

    
];

function domElements(arr) {

    arr.forEach(elementObject => {
        
        (0,_domCreation_js__WEBPACK_IMPORTED_MODULE_1__["default"])(elementObject.elementType,elementObject.attributes,elementObject.innerHTML,elementObject.innerText,document.querySelector(elementObject.appendChild));
        
    });
   
}  

const arrContainerLeftPhone = [

    {
        elementType: 'div',
        attributes: {class:'containerLeftMobile'},
        appendChild: 'body',
    },

    // child containerLeftMobile

    {
        elementType: 'div',
        attributes: {class:'containerProjectsM'},
        appendChild: '.containerLeftMobile',
    },

    {
        elementType: 'div',
        attributes: {class:'containerTodayM'},
        appendChild: '.containerLeftMobile',
    },

    {
        elementType: 'div',
        attributes: {class:'containerWeekM'},
        appendChild: '.containerLeftMobile',
    },

    // childs containerProjectsM

    
    {
        elementType: 'div',
        attributes: {class:'containerSvgFolder'},
        innerHTML: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path class="pathSvgProjects" d="M3 7V17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V9C21 7.89543 20.1046 7 19 7H13L11 5H5C3.89543 5 3 5.89543 3 7Z" stroke="#E6E1E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>',
        appendChild: '.containerProjectsM',
    },

    {
        elementType: 'p',
        attributes: {class:'titleProjectsM'},
        innerText:'Projects',
        appendChild: '.containerProjectsM',
    },

    // childs containerTodayM

    
    {
        elementType: 'div',
        attributes: {class:'containerSvgToday'},
        innerHTML: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="#E6E1E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/><rect x="6" y="10" width="12" height="2" fill="#4A4458"/><rect x="6" y="10" width="3" height="2" rx="1" fill="#D9D9D9"/></svg>' ,
        appendChild: '.containerTodayM',
    },

    {
        elementType: 'p',
        attributes: {class:'titleTodayM'},
        innerText:'Today',
        appendChild: '.containerTodayM',
    },
    // childs containerProjects

    
    {
        elementType: 'div',
        attributes: {class:'containerSvgWeek'},
        innerHTML:  '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 7V3M16 7V3M7 11H17M5 21H19C20.1046 21 21 20.1046 21 19V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V19C3 20.1046 3.89543 21 5 21Z" stroke="#E6E1E5" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>' ,
        appendChild: '.containerWeekM',
    },

    {
        elementType: 'p',
        attributes: {class:'titleWeekM'},
        innerText:'Week',
        appendChild: '.containerWeekM',
    },



]


domElements(arrElementsHome);
(0,_ui_js__WEBPACK_IMPORTED_MODULE_5__.init)();
(0,_projects_js__WEBPACK_IMPORTED_MODULE_2__.createPopUpNewProject)();
(0,_todos_js__WEBPACK_IMPORTED_MODULE_4__.popUpTodo)();

function resizeWindow() {
    

    createMobileMenuIfScreenSizeMatches()

    window.addEventListener('resize', () => {

        createMobileMenuIfScreenSizeMatches()
        
    
    } )

}

function createMobileMenuIfScreenSizeMatches() {
    
    let screenWidthF = window.screen.availWidth;
       
    if (screenWidthF <= 912) {
        let containerLeftMobile = document.querySelector('.containerLeftMobile');

        if (!containerLeftMobile) {
            
            domElements(arrContainerLeftPhone)     
            ;(0,_projects_js__WEBPACK_IMPORTED_MODULE_2__.menuMobile)();   
            (0,_todos_js__WEBPACK_IMPORTED_MODULE_4__.showTodayMobile)();    
            (0,_todos_js__WEBPACK_IMPORTED_MODULE_4__.showWeekMobile)();

            const containerTodosTodayAndWeek = document.querySelector('.containerTodosTodayAndWeek');

            if (containerTodosTodayAndWeek) {
             
                _pubSub_js__WEBPACK_IMPORTED_MODULE_3__.EventManager.emit('fadeOutAndShrink', containerTodosTodayAndWeek)

                setTimeout(() => {
                    _pubSub_js__WEBPACK_IMPORTED_MODULE_3__.EventManager.emit('deleteElement', containerTodosTodayAndWeek)
                }, 120);   
            }
        }
    }else if(screenWidthF >= 913){

        let containerLeftMobile = document.querySelector('.containerLeftMobile');

        if (containerLeftMobile) {

            _pubSub_js__WEBPACK_IMPORTED_MODULE_3__.EventManager.emit('deleteElement', containerLeftMobile);

        }

        let containerProjectsMobile = document.querySelector('.containerProjectsMobile');

        if (containerProjectsMobile) {
    
            _pubSub_js__WEBPACK_IMPORTED_MODULE_3__.EventManager.emit('deleteElement',containerProjectsMobile );

        }

        const containerProjects = document.querySelector('.containerProjects');
        containerProjects.style.height = 'auto';
        
    }

}



resizeWindow()
})();

/******/ })()
;