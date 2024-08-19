/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/js/_components.js":
/*!*******************************!*\
  !*** ./src/js/_components.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_modal__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/modal */ "./src/js/components/modal.js");
/* harmony import */ var _components_modal__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_components_modal__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_functions__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/functions */ "./src/js/components/functions.js");
/* harmony import */ var _components_functions__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_components_functions__WEBPACK_IMPORTED_MODULE_1__);



/***/ }),

/***/ "./src/js/components/functions.js":
/*!****************************************!*\
  !*** ./src/js/components/functions.js ***!
  \****************************************/
/***/ (() => {

const spollersArray = document.querySelectorAll('[data-spollers]');
if (spollersArray.length > 0) {
  const spollersRegular = Array.from(spollersArray).filter(function (item, index, self) {
    return !item.dataset.spollers.split(",")[0];
  });
  if (spollersRegular.length > 0) {
    initSpollers(spollersRegular);
  }
  const spollersMedia = Array.from(spollersArray).filter(function (item, index, self) {
    return item.dataset.spollers.split(",")[0];
  });
  if (spollersMedia.length > 0) {
    const breakpointsArray = [];
    spollersMedia.forEach(item => {
      const params = item.dataset.spollers;
      const breakpoint = {};
      const paramsArray = params.split(",");
      breakpoint.value = paramsArray[0];
      breakpoint.type = paramsArray[1] ? paramsArray[1].trim() : "max";
      breakpoint.item = item;
      breakpointsArray.push(breakpoint);
    });
    let mediaQueries = breakpointsArray.map(function (item) {
      return '(' + item.type + "-width: " + item.value + "px)," + item.value + ',' + item.type;
    });
    mediaQueries = mediaQueries.filter(function (item, index, self) {
      return self.indexOf(item) === index;
    });
    mediaQueries.forEach(breakpoint => {
      const paramsArray = breakpoint.split(",");
      const mediaBreakpoint = paramsArray[1];
      const mediaType = paramsArray[2];
      const matchMedia = window.matchMedia(paramsArray[0]);
      const spollersArray = breakpointsArray.filter(function (item) {
        if (item.value === mediaBreakpoint && item.type === mediaType) {
          return true;
        }
      });
      matchMedia.addListener(function () {
        initSpollers(spollersArray, matchMedia);
      });
      initSpollers(spollersArray, matchMedia);
    });
  }
  function initSpollers(spollersArray) {
    let matchMedia = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
    spollersArray.forEach(spollersBlock => {
      spollersBlock = matchMedia ? spollersBlock.item : spollersBlock;
      if (matchMedia.matches || !matchMedia) {
        spollersBlock.classList.add('_init');
        initSpollerBody(spollersBlock);
        spollersBlock.addEventListener("click", setSpollerAction);
      } else {
        spollersBlock.classList.remove('_init');
        initSpollerBody(spollersBlock, false);
        spollersBlock.removeEventListener("click", setSpollerAction);
      }
    });
  }
  function initSpollerBody(spollersBlock) {
    let hideSpollerBody = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
    const spollerTitles = spollersBlock.querySelectorAll('[data-spoller]');
    if (spollerTitles.length > 0) {
      spollerTitles.forEach(spollerTitle => {
        if (hideSpollerBody) {
          spollerTitle.removeAttribute('tabindex');
          if (!spollerTitle.classList.contains('_active')) {
            spollerTitle.nextElementSibling.hidden = true;
          }
        } else {
          spollerTitle.setAttribute('tabindex', '-1');
          spollerTitle.nextElementSibling.hidden = false;
        }
      });
    }
  }
  function setSpollerAction(e) {
    const el = e.target;
    if (el.hasAttribute('data-spoller') || el.closest('[data-spoller]')) {
      const spollerTitle = el.hasAttribute('data-spoller') ? el : el.closest('[data-spoller]');
      const spollersBlock = spollerTitle.closest('[data-spollers]');
      const oneSpoller = spollersBlock.hasAttribute('data-one-spoller') ? true : false;
      if (!spollersBlock.querySelectorAll('._slide').length) {
        if (oneSpoller && !spollerTitle.classList.contains('_active')) {
          hideSpollersBody(spollersBlock);
        }
        spollerTitle.classList.toggle('_active');
        setTimeout(() => {
          spollerTitle.nextElementSibling.classList.toggle('active');
        }, 0);

        // spollersBlock.classList.toggle('active');
        _slideToggle(spollerTitle.nextElementSibling, 500);
      }
      e.preventDefault();
    }
  }
  function hideSpollersBody(spollersBlock) {
    const spollerActiveTitle = spollersBlock.querySelector('[data-spoller]._active');
    if (spollerActiveTitle) {
      spollerActiveTitle.classList.remove('_active');
      setTimeout(() => {
        spollerTitle.nextElementSibling.classList.remove('active');
      }, 0);
      _slideUp(spollerActiveTitle.nextElementSibling, 500);
    }
  }
}
const tabs = document.querySelectorAll('[data-tabs]');
let tabsActiveHash = [];
if (tabs.length > 0) {
  const hash = location.hash.replace('#', '');
  if (hash.startsWith('tab-')) {
    tabsActiveHash = hash.replace('tab-', '').split('-');
  }
  tabs.forEach((tabsBlock, index) => {
    tabsBlock.classList.add('_tab-init');
    tabsBlock.setAttribute('data-tabs-index', index);
    tabsBlock.addEventListener("click", setTabsAction);
    initTabs(tabsBlock);
  });

  // Получение табов с медиа запросами
  const tabsMedia = Array.from(tabs).filter(function (item, index, self) {
    return item.dataset.tabs;
  });
  // Инициализация табов с медиа запросами
  if (tabsMedia.length > 0) {
    initMediaTabs(tabsMedia);
  }
}
// Инициализация табов с медиа запросами
function initMediaTabs(tabsMedia) {
  const breakpointsArray = [];
  tabsMedia.forEach(item => {
    const breakpointValue = item.dataset.tabs;
    const tabsBreakpointsObject = {};
    tabsBreakpointsObject.value = breakpointValue;
    tabsBreakpointsObject.item = item;
    breakpointsArray.push(tabsBreakpointsObject);
  });

  // Получаем уникальные брейкпоинты
  let mediaQueries = breakpointsArray.map(function (item) {
    return `(max-width:${item.value}px),${item.value}`;
  });
  mediaQueries = mediaQueries.filter(function (item, index, self) {
    return self.indexOf(item) === index;
  });

  // Работаем с каждым брейкпоинтом
  mediaQueries.forEach(breakpoint => {
    const paramsArray = breakpoint.split(",");
    const matchMedia = window.matchMedia(paramsArray[0]);
    const mediaBreakpoint = paramsArray[1];

    // Объекты с нужными условиями
    const tabsMediaArray = breakpointsArray.filter(function (item) {
      if (item.value === mediaBreakpoint) {
        return true;
      }
    });

    // Событие
    matchMedia.addEventListener("change", function () {
      setTitlePosition(tabsMediaArray, matchMedia);
    });
    setTitlePosition(tabsMediaArray, matchMedia);
  });
}
// Установка позиций заголовков
function setTitlePosition(tabsMediaArray, matchMedia) {
  tabsMediaArray.forEach(tabsMediaItem => {
    tabsMediaItem = tabsMediaItem.item;
    const tabsTitles = tabsMediaItem.querySelector('[data-tabs-titles]');
    const tabsTitleItems = tabsMediaItem.querySelectorAll('[data-tabs-title]');
    const tabsContent = tabsMediaItem.querySelector('[data-tabs-body]');
    const tabsContentItems = tabsMediaItem.querySelectorAll('[data-tabs-item]');
    tabsContentItems.forEach((tabsContentItem, index) => {
      if (matchMedia.matches) {
        tabsContent.append(tabsTitleItems[index]);
        tabsContent.append(tabsContentItem);
        tabsMediaItem.classList.add('_tab-spoller');
      } else {
        tabsTitles.append(tabsTitleItems[index]);
        tabsMediaItem.classList.remove('_tab-spoller');
      }
    });
  });
}
// Работа с контентом
function initTabs(tabsBlock) {
  const tabsTitles = tabsBlock.querySelectorAll('[data-tabs-titles]>*');
  const tabsContent = tabsBlock.querySelectorAll('[data-tabs-body]>*');
  const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
  const tabsActiveHashBlock = tabsActiveHash[0] == tabsBlockIndex;
  if (tabsActiveHashBlock) {
    const tabsActiveTitle = tabsBlock.querySelector('[data-tabs-titles]>._tab-active');
    tabsActiveTitle.classList.remove('_tab-active');
  }
  if (tabsContent.length > 0) {
    tabsContent.forEach((tabsContentItem, index) => {
      tabsTitles[index].setAttribute('data-tabs-title', '');
      tabsContentItem.setAttribute('data-tabs-item', '');
      if (tabsActiveHashBlock && index == tabsActiveHash[1]) {
        tabsTitles[index].classList.add('_tab-active');
      }
      tabsContentItem.hidden = !tabsTitles[index].classList.contains('_tab-active');
    });
  }
}
function setTabsStatus(tabsBlock) {
  const tabsTitles = tabsBlock.querySelectorAll('[data-tabs-title]');
  const tabsContent = tabsBlock.querySelectorAll('[data-tabs-item]');
  const tabsBlockIndex = tabsBlock.dataset.tabsIndex;
  function isTabsAnamate(tabsBlock) {
    if (tabsBlock.hasAttribute('data-tabs-animate')) {
      return tabsBlock.dataset.tabsAnimate > 0 ? tabsBlock.dataset.tabsAnimate : 500;
    }
  }
  const tabsBlockAnimate = isTabsAnamate(tabsBlock);
  if (tabsContent.length > 0) {
    tabsContent.forEach((tabsContentItem, index) => {
      if (tabsTitles[index].classList.contains('_tab-active')) {
        if (tabsBlockAnimate) {
          _slideDown(tabsContentItem, tabsBlockAnimate);
        } else {
          tabsContentItem.hidden = false;
        }
        location.hash = `tab-${tabsBlockIndex}-${index}`;
      } else {
        if (tabsBlockAnimate) {
          _slideUp(tabsContentItem, tabsBlockAnimate);
        } else {
          tabsContentItem.hidden = true;
        }
      }
    });
  }
}

//tabs

function setTabsAction(e) {
  const el = e.target;
  if (el.closest('[data-tabs-title]')) {
    const tabTitle = el.closest('[data-tabs-title]');
    const tabsBlock = tabTitle.closest('[data-tabs]');
    if (!tabTitle.classList.contains('_tab-active') && !tabsBlock.querySelectorAll('._slide').length) {
      const tabActiveTitle = tabsBlock.querySelector('[data-tabs-title]._tab-active');
      if (tabActiveTitle) {
        tabActiveTitle.classList.remove('_tab-active');
      }
      tabTitle.classList.add('_tab-active');
      setTabsStatus(tabsBlock);
    }
    e.preventDefault();
  }
}
let _slideUp = function (target) {
  let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  target.style.transitionProperty = 'height, margin, padding';
  target.style.transitionDuration = duration + 'ms';
  target.style.height = target.offsetHeight + 'px';
  target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  window.setTimeout(() => {
    target.style.display = 'none';
    target.style.removeProperty('height');
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
    target.classList.remove('_slide');
  }, duration);
};
let _slideDown = function (target) {
  let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  target.style.removeProperty('display');
  let display = window.getComputedStyle(target).display;
  if (display === 'none') display = 'block';
  target.style.display = display;
  let height = target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  target.offsetHeight;
  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = duration + 'ms';
  target.style.height = height + 'px';
  target.style.removeProperty('padding-top');
  target.style.removeProperty('padding-bottom');
  target.style.removeProperty('margin-top');
  target.style.removeProperty('margin-bottom');
  window.setTimeout(() => {
    target.style.removeProperty('height');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
    target.classList.remove('_slide');
  }, duration);
};
let _slideToggle = function (target) {
  let duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');
    if (window.getComputedStyle(target).display === 'none') {
      return _slideDown(target, duration);
    } else {
      return _slideUp(target, duration);
    }
  }
};

/***/ }),

/***/ "./src/js/components/modal.js":
/*!************************************!*\
  !*** ./src/js/components/modal.js ***!
  \************************************/
/***/ (() => {

class Modal {
  constructor(options) {
    let defaultOptions = {
      isOpen: () => {},
      isClose: () => {}
    };
    this.options = Object.assign(defaultOptions, options);
    this.modal = document.querySelector('.modal');
    this.speed = '';
    this.animation = '';
    this._reOpen = false;
    this._nextContainer = false;
    this.modalContainer = false;
    this.isOpen = false;
    this.previousActiveElement = false;
    this._focusElements = ['a[href]', 'input', 'select', 'textarea', 'button', 'iframe', '[contenteditable]', '[tabindex]:not([tabindex^="-"])'];
    this._fixBlocks = document.querySelectorAll('.fix-block');
    this.events();
  }
  events() {
    if (this.modal) {
      document.addEventListener('click', function (e) {
        const clickedElement = e.target.closest(`[data-path]`);
        if (clickedElement) {
          let target = clickedElement.dataset.path;
          let animation = clickedElement.dataset.animation;
          let speed = clickedElement.dataset.speed;
          this.animation = animation ? animation : 'fade';
          this.speed = speed ? parseInt(speed) : 500;
          this._nextContainer = document.querySelector(`[data-target="${target}"]`);
          this.open();
          return;
        }
        if (e.target.closest('.js-modal-close')) {
          this.close();
          return;
        }
      }.bind(this));
      window.addEventListener('keydown', function (e) {
        if (e.keyCode == 27 && this.isOpen) {
          this.close();
        }
        if (e.which == 9 && this.isOpen) {
          this.focusCatch(e);
          return;
        }
      }.bind(this));
      document.addEventListener('click', function (e) {
        if (e.target.classList.contains('modal') && e.target.classList.contains("is-open")) {
          this.close();
        }
      }.bind(this));
    }
  }
  open(selector) {
    this.previousActiveElement = document.activeElement;
    if (this.isOpen) {
      this.reOpen = true;
      this.close();
      return;
    }
    this.modalContainer = this._nextContainer;
    if (selector) {
      this.modalContainer = document.querySelector(`[data-target="${selector}"]`);
    }
    this.modalContainer.scrollTo(0, 0);
    this.modal.style.setProperty('--transition-time', `${this.speed / 1000}s`);
    this.modal.classList.add('is-open');
    document.body.style.scrollBehavior = 'auto';
    document.documentElement.style.scrollBehavior = 'auto';
    this.disableScroll();
    this.modalContainer.classList.add('modal-open');
    this.modalContainer.classList.add(this.animation);

    // setTimeout(() => {

    // 	this.modalContainer.classList.add('animate-open');

    // }, 0);
    setTimeout(() => {
      this.modalContainer.classList.add('animate-open');
      this.options.isOpen(this);
      this.isOpen = true;
      this.focusTrap();
    }, this.speed);
  }
  close() {
    if (this.modalContainer) {
      this.modalContainer.classList.remove('animate-open');
      this.modal.classList.remove('is-open');
      this.modalContainer.classList.remove(this.animation);
      this.modalContainer.classList.remove('modal-open');
      // setTimeout(() => {

      // }, this.speed);

      this.enableScroll();
      document.body.style.scrollBehavior = 'auto';
      document.documentElement.style.scrollBehavior = 'auto';
      this.options.isClose(this);
      this.isOpen = false;
      this.focusTrap();
      if (this.reOpen) {
        this.reOpen = false;
        this.open();
      }
    }
  }
  focusCatch(e) {
    const nodes = this.modalContainer.querySelectorAll(this._focusElements);
    const nodesArray = Array.prototype.slice.call(nodes);
    const focusedItemIndex = nodesArray.indexOf(document.activeElement);
    if (e.shiftKey && focusedItemIndex === 0) {
      nodesArray[nodesArray.length - 1].focus();
      e.preventDefault();
    }
    if (!e.shiftKey && focusedItemIndex === nodesArray.length - 1) {
      nodesArray[0].focus();
      e.preventDefault();
    }
  }
  focusTrap() {
    const nodes = this.modalContainer.querySelectorAll(this._focusElements);
    if (this.isOpen) {
      if (nodes.length) nodes[0].focus();
    } else {
      this.previousActiveElement.focus();
    }
  }
  disableScroll() {
    let pagePosition = window.scrollY;
    this.lockPadding();
    document.body.classList.add('disable-scroll');
    document.body.dataset.position = pagePosition;
    document.body.style.top = -pagePosition + 'px';
  }
  enableScroll() {
    let pagePosition = parseInt(document.body.dataset.position, 10);
    this.unlockPadding();
    document.body.style.top = 'auto';
    document.body.classList.remove('disable-scroll');
    window.scrollTo({
      top: pagePosition,
      left: 0
    });
    document.body.removeAttribute('data-position');
  }
  lockPadding() {
    let paddingOffset = window.innerWidth - document.body.offsetWidth + 'px';
    this._fixBlocks.forEach(el => {
      el.style.paddingRight = paddingOffset;
    });
    document.body.style.paddingRight = paddingOffset;
  }
  unlockPadding() {
    this._fixBlocks.forEach(el => {
      el.style.paddingRight = '0px';
    });
    document.body.style.paddingRight = '0px';
  }
}
document.addEventListener('DOMContentLoaded', () => {
  const modal = new Modal({
    isOpen: modal => {
      console.log('opened');
      console.log(modal);
    },
    isClose: () => {
      console.log('closed');
    }
  });

  // new Modal().open('second');
});

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
/******/ 			// no module.id needed
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
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./_components */ "./src/js/_components.js");

})();

/******/ })()
;