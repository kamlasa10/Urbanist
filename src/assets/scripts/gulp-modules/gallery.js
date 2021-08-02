document.addEventListener('DOMContentLoaded', () => {
  let countLoopSliders = $('.js-gallery-main').find('.swiper-slide').length
  class InitDoubleSliders { 
    static init(isAutoPlay) {
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
      });
  
      // this.$slider2.on('slideChange', swiper => {
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
          prevEl: '.js-swiper-button-prev_gallery',
        },
        // direction: 'vertical',
        pagination: {
          el: '.swiper-pagination',
          type: 'fraction',
          formatFractionCurrent(number) {
            const isWithZero = number < 10 ? `0${number}` : `${number}`;
            return isWithZero.slice(-2);
          },
          formatFractionTotal(number) {
            const isWithZero = number < 10 ? `0${number}` : `${number}`;
            return isWithZero.slice(-2);
          },
          renderFraction(currentClass, totalClass) {
            return (
              `<span class="${currentClass}"></span>` + ' - ' + `<span class="${totalClass}"></span>`
            );
          },
        }
      });
  
      window.$slider1.controller.control = window.$slider2
      window.$slider2.controller.control = window.$slider1
    }
  
    static updateSliders() {
      window.$slider1.update()
      window.$slider1.loopDestroy()
      window.$slider1.loopCreate()
      window.$slider2.update()
      window.$slider2.loopDestroy()
      window.$slider2.loopCreate()
    }
  }

  InitDoubleSliders.init(true)
  window.initCustomScroll(true)

  $(window).on('resize', () => {
    if($(window).width() <= 1025) {
      $('.container-gallery').height(document.documentElement.clientHeight + 'px')
    } else {
      $('.container-gallery').height('100vh')
    }
  }).resize()
});

