class InitDoubleSliders {
  constructor({ $slider1, $slider2 }) {
    this.$slider1 = $slider1;
    this.$slider2 = $slider2;
  }

  static countLoopSlider = $('.js-gallery-main').find('.swiper-slide').length

  init() {
    this.$slider2 = new Swiper(this.$slider2, {
      direction: 'vertical',
      loop: true,
      loopedSlides: InitDoubleSliders.countLoopSlider,
      speed: 700,
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
    this.$slider1 = new Swiper(this.$slider1, {
      loop: true,
      autoplay: {
        delay: 7000
      },
      loopedSlides: InitDoubleSliders.countLoopSlider,
      direction: 'vertical',
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
      },
    });

    this.$slider1.controller.control = this.$slider2
    this.$slider2.controller.control = this.$slider1
  }
}

const initDoubleSliders = new InitDoubleSliders({
  $slider1: '.js-gallery-main',
  $slider2: '.js-gallery-thumbs',
});

document.addEventListener('DOMContentLoaded', () => {
  initDoubleSliders.init();
  window.initCustomScroll(true)
});

