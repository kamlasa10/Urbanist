class InitDoubleSliders {
  constructor({ $slider1, $slider2 }) {
    this.$slider1 = $slider1;
    this.$slider2 = $slider2;
  }

  init() {
    this.$slider2 = new Swiper(this.$slider2, {
      direction: 'vertical',
      loop: true,
      slidesPerView: 5,
      centeredSlides: true,
      on: {
        init(swiper) {
          swiper.slides.forEach(item => {
            item.addEventListener('click', e => {
              const activeSlide = $(e.currentTarget)
              const neighborBottom = activeSlide.next()
              const neighborTop = activeSlide.prev()
              if(neighborTop.hasClass('swiper-slide-active')) {
                gsap.to(neighborTop, {
                  top: neighborTop[0].getBoundingClientRect().height + 'px',
                  duration: 0.7,
                });
                gsap.to(activeSlide, {
                  top: '-' + activeSlide[0].getBoundingClientRect().height + 'px',
                  duration: 0.7,
                });
              } else {
                gsap.to(neighborBottom, {
                  top: -neighborBottom[0].getBoundingClientRect().height + 'px',
                  duration: 0.7,
                });
                gsap.to(activeSlide, {
                  top: activeSlide[0].getBoundingClientRect().height + 'px',
                  duration: 0.7,
                });
              }
            });
          });
        },
      },
    });



    this.$slider2.on('slideChange', swiper => {
      console.log(swiper)
    })
    this.$slider1 = new Swiper(this.$slider1, {
      loop: true,
      speed: 400,
      navigation: {
        nextEl: '.js-swiper-button-next_gallery',
        prevEl: '.js-swiper-button-prev_gallery',
      },
      thumbs: {
        swiper: this.$slider2,
      },
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
  }
}

const initDoubleSliders = new InitDoubleSliders({
  $slider1: '.js-gallery-main',
  $slider2: '.js-gallery-thumbs',
});

document.addEventListener('DOMContentLoaded', () => {
  initDoubleSliders.init();
});

