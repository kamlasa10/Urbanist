"use strict";

document.addEventListener('DOMContentLoaded', function () {
  window.initCustomScroll();

  function animationBlock5() {
    var tl = gsap.timeline();
    var item = $('[data-block="5"]');
    tl.fromTo(item.find('img'), {
      opacity: 0,
      y: 50
    }, {
      opacity: 1,
      y: 0,
      duration: 1
    }).fromTo(item.find('.benefits__inf_block'), {
      opacity: 0,
      y: 20
    }, {
      opacity: 1,
      y: 0,
      duration: 0.8
    }, 0.2);
    return tl;
  }

  function animateImgWithText(item) {
    var tl = gsap.timeline();
    var isPhoneWidth = window.getClientWidth() <= 480;
    return function () {
      tl.fromTo($(item).find('.block__text'), {
        y: isPhoneWidth ? '' : -30,
        x: isPhoneWidth ? 30 : '',
        opacity: 0
      }, {
        y: 0,
        x: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15
      }).fromTo($(item).find('.animation-img'), {
        y: isPhoneWidth ? 15 : 30,
        opacity: 0
      }, {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15
      }, 0);
      return tl;
    };
  }

  function animateBigImgWithText(item) {
    var tl = gsap.timeline();
    var isReverse = $(item).hasClass('benefits__block-revers');
    return function () {
      tl.fromTo($(item).find('.block__text'), {
        opacity: 0,
        x: isReverse ? '50px' : '-50px'
      }, {
        opacity: 1,
        x: 0,
        duration: 1
      }).fromTo($(item).find('.benefits__block_img'), {
        opacity: 0,
        y: 50
      }, {
        opacity: 1,
        y: 0,
        duration: 1
      }, 0);
      return tl;
    };
  }

  var animationsData = {
    1: animateBigImgWithText,
    2: animateImgWithText,
    3: animateBigImgWithText,
    4: animateImgWithText,
    5: animationBlock5
  };
  gsap.utils.toArray('[data-block]').forEach(function (item) {
    var blockName = item.dataset.block;
    var animationFn = animationsData[blockName];

    switch (blockName) {
      case '1':
      case '3':
        window.createScrollTrigger({
          trigger: item
        }, animationFn(item), false);
        break;

      case '2':
      case '4':
        window.createScrollTrigger({
          trigger: item
        }, animationFn(item), false);
        break;

      case '5':
        window.createScrollTrigger({
          trigger: item
        }, animationFn, false);
    }
  });
});