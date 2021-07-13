"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

document.addEventListener('DOMContentLoaded', function () {
  var countLoopSliders = $('.js-gallery-main').find('.swiper-slide').length;
  var touchMovePosition = false;

  var InitDoubleSliders =
  /*#__PURE__*/
  function () {
    function InitDoubleSliders() {
      _classCallCheck(this, InitDoubleSliders);
    }

    _createClass(InitDoubleSliders, null, [{
      key: "init",
      value: function init(isAutoPlay) {
        window.$slider2 = new Swiper(window.$slider2, {
          direction: 'vertical',
          loop: true,
          loopedSlides: countLoopSliders,
          speed: 700,
          watchOverflow: true,
          // slidesPerView: 5,
          centeredSlides: true,
          slidesPerView: 5,
          touchRatio: 0.4,
          slideToClickedSlide: true,
          keyboard: {
            enabled: true,
            onlyInViewport: false
          }
        }); // this.$slider2.on('slideChange', swiper => {
        //   console.log(swiper)
        // })

        window.$slider1 = new Swiper(window.$slider1, {
          loop: true,
          autoplay: isAutoPlay ? {
            delay: 7000
          } : false,
          watchOverflow: true,
          loopedSlides: countLoopSliders,
          direction: 'horizontal',
          speed: 700,
          grabCursor: false,
          navigation: {
            nextEl: '.js-swiper-button-next_gallery',
            prevEl: '.js-swiper-button-prev_gallery'
          },
          // direction: 'vertical',
          pagination: {
            el: '.swiper-pagination',
            type: 'fraction',
            formatFractionCurrent: function formatFractionCurrent(number) {
              var isWithZero = number < 10 ? "0".concat(number) : "".concat(number);
              return isWithZero.slice(-2);
            },
            formatFractionTotal: function formatFractionTotal(number) {
              var isWithZero = number < 10 ? "0".concat(number) : "".concat(number);
              return isWithZero.slice(-2);
            },
            renderFraction: function renderFraction(currentClass, totalClass) {
              return "<span class=\"".concat(currentClass, "\"></span>") + ' - ' + "<span class=\"".concat(totalClass, "\"></span>");
            }
          }
        });
        window.$slider1.controller.control = window.$slider2;
        window.$slider2.controller.control = window.$slider1;
      }
    }, {
      key: "updateSliders",
      value: function updateSliders() {
        window.$slider1.update();
        window.$slider1.loopDestroy();
        window.$slider1.loopCreate();
        window.$slider2.update();
        window.$slider2.loopDestroy();
        window.$slider2.loopCreate();
      }
    }]);

    return InitDoubleSliders;
  }();

  InitDoubleSliders.init(false);

  var GalleryActions =
  /*#__PURE__*/
  function () {
    function GalleryActions() {
      _classCallCheck(this, GalleryActions);
    }

    _createClass(GalleryActions, null, [{
      key: "close",
      value: function close(callback) {
        // if(!callback) {
        //     throw new Error('callback expect how a function, but is value' + ' ' + callback)
        // }
        GalleryActions.animationHide();
        onScroll();
      }
    }, {
      key: "animationHide",
      value: function animationHide() {
        gsap.to('.js-gallery', {
          opacity: 0,
          pointerEvents: 'none',
          direction: 1,
          onStart: function onStart() {
            setTimeout(animationScroll, 500);
          }
        });
      }
    }, {
      key: "animationShow",
      value: function animationShow(fn) {
        gsap.to('.js-gallery', {
          opacity: 1,
          pointerEvents: 'initial',
          direction: 1,
          onStart: function onStart() {
            $('.header').removeClass('move');
          },
          onComplete: fn
        });
      }
    }, {
      key: "open",
      value: function open(callback) {
        if (!callback) {
          throw new Error('callback expect how a function, but is value' + ' ' + callback);
        }

        callback(false);
        disabledScroll();
        GalleryActions.animationShow();
      }
    }]);

    return GalleryActions;
  }();

  window.initCustomScroll(false);

  function setDashoffsetCircle(el) {
    return 2 * Math.PI * el.getAttribute("r");
  }

  function simulatePathDrawing(path) {
    var fillPercentage = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10;
    var strokeWidth = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    if (path.done) return;
    path.style.strokeDasharray = 0;
    path.style.strokeDashoffset = 0; // var path = document.querySelector('.squiggle-animated path');

    var length = setDashoffsetCircle(path);
    path.style.transition = path.style.WebkitTransition = "none";
    path.style.fill = "none";
    path.style.strokeDashoffset = "0";
    path.style.transition = path.style.WebkitTransition = "stroke-dashoffset 1.5s ease"; // Set up the starting positions

    path.style.strokeDasharray = "".concat(length * (fillPercentage / 100), " ").concat(length);
    path.style.strokeDashoffset = length + length * (fillPercentage / 100);
    path.style.transformOrigin = "center"; // Trigger a layout so styles are calculated & the browser
    // picks up the starting position before animating

    path.style.strokeWidth = strokeWidth;
    path.done = true;
  }

  Array.from(document.querySelectorAll("[data-progress]")).forEach(function (item) {
    var icon = item.querySelector(".data-progress-circle");
    var percent = item.dataset.progress;
    simulatePathDrawing(icon, percent);
  });

  function addHandler(_ref) {
    var className = _ref.className,
        fn = _ref.fn,
        type = _ref.type;
    document.querySelectorAll(className).forEach(function (node) {
      node.addEventListener(type, function (e) {
        e.preventDefault();
        fn();
      });
    });
  }

  addHandler({
    className: '.js-gallery-close',
    fn: GalleryActions.close,
    type: 'click'
  });
  addHandler({
    className: '.js-progress__item',
    fn: function fn() {
      return GalleryActions.open(InitDoubleSliders.init);
    },
    type: 'click'
  }); // addHandler(
  //     {
  //         className: '.js-progress__item',
  //         fn: () => GalleryActions.open(InitDoubleSliders.init),
  //         type: 'touchstart'
  //     }
  // )

  document.ontouchmove = function (e) {
    var y = e.touches[0].pageY;
    touchMovePosition = y;
  }; // document.addEventListener('touchstart', e => {
  //     const path = event.path || (event.composedPath && event.composedPath());
  //     e.stopPropagation()
  //     // for(let i = 0; i < path.length; i++) {
  //     //     if(path[i].classList.contains('js-progress__item')) {
  //     //         GalleryActions.open(InitDoubleSliders.init)
  //     //         break
  //     //     }
  //     // }
  // })
  //   var galleryTop = new Swiper('.gallery-top', {
  //     slidesPerView: 1,  
  //     loop: true,
  //     navigation: {
  //       nextEl: '.swiper-button-next_progress',
  //       prevEl: '.swiper-button-prev_progress',
  //     },
  //     pagination: {
  //       el: '.swiper-pagination',
  //       type: 'fraction',
  //       formatFractionCurrent: function (number) {
  //           return ('0' + number).slice(-2);
  //       },
  //       formatFractionTotal: function (number) {
  //           return ('0' + number).slice(-2);
  //       },
  //       renderFraction: function (currentClass, totalClass) {
  //           return '<span class="' + currentClass + '"></span>' +
  //                 ' — ' +
  //                 '<span class="'  + totalClass +  '"></span>';
  //       }
  //   },
  //   });
  //   var galleryThumbs = new Swiper('.gallery-thumbs', {
  //     direction: 'vertical',
  //     slidesPerView: 5,
  //     slideToClickedSlide: true,
  //     loop: true,
  //   });
  //   galleryTop.controller.control = galleryThumbs;
  //   galleryThumbs.controller.control = galleryTop;

});