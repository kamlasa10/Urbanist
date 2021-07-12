"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var pageTitle = $('.breadcrumbs');
  var sliderContainer = $('.js-slider-docs');
  $(window).on('resize', function () {
    var offsetLeft = pageTitle.offset().left;

    if (window.getClientWidth() > 770) {
      sliderContainer.css('padding-left', "".concat(offsetLeft + 200, "px"));
      return;
    }

    if (window.getClientWidth() <= 770) {
      sliderContainer.css('padding-left', "".concat(offsetLeft, "px"));
    }
  }).resize();
  window.initCustomScroll();
  var swiper = new Swiper('.js-slider-docs', {
    slidesPerView: 5,
    speed: 500,
    spaceBetween: 40,
    breakpoints: {
      320: {
        slidesPerView: 1.2,
        spaceBetween: 20
      },
      350: {
        slidesPerView: 1.5
      },
      560: {
        slidesPerView: 2.3
      },
      720: {
        slidesPerView: 3,
        spaceBetween: 25
      },
      850: {
        slidesPerView: 3.3
      },
      1050: {
        slidesPerView: 4
      },
      1445: {
        slidesPerView: 5
      }
    },
    navigation: {
      nextEl: '.slides-nav__button--next',
      prevEl: '.slides-nav__button--prev'
    }
  });
});