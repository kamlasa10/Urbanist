"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

document.addEventListener('DOMContentLoaded', function () {
  var countLoopSliders = $('.js-gallery-main').find('.swiper-slide').length;

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

  InitDoubleSliders.init(true);
  window.initCustomScroll(true);
});