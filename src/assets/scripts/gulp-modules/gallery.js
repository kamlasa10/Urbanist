class InitDoubleSliders {
  constructor({ $slider1, $slider2 }) {
    this.$slider1 = $slider1;
    this.$slider2 = $slider2;
    this.sizeThumb = 0
  }

  animationTransition() {

  }

  animationChangeSlide(direction) {
    const activeSlides = $('.js-gallery-thumbs .swiper-slide-thumb-active')

    activeSlides.each((_, item) => {
      if(direction === 'prev') {
        const prevSlide = $(item).prev()
        console.log(this.$slider2.activeIndex, this.$slider2.slides)
        this.$slider2.slidePrev(700)
        // gsap.to(item, {
        //   top: `${this.sizeThumb}px`,
        //   duration: 0.7
        // })
        // gsap.to(prevSlide, {
        //   top: `-${this.sizeThumb}px`,
        //   duration: 0.7
        // })
        return
      }

      $(item).next()
      this.$slider2.slideNext(700)
    })
  }

  controlsSlider() {
    $('.js-swiper-button-next_gallery').on('click', () => {
      this.animationChangeSlide('next')
    })

    $('.js-swiper-button-prev_gallery').on('click', () => {
      this.animationChangeSlide('prev')
    })
  }

  init() {
    this.$slider2 = new Swiper(this.$slider2, {
      direction: 'vertical',
      loop: true,
      slidesPerView: 5,
      centeredSlides: true,
      on: {
        beforeSlideChangeStart(swiper) {
          console.log(swiper)
        },
        init(swiper) {
          let currentActiveSlide = null

          swiper.slides.forEach(item => {
            item.addEventListener('click', e => {
              const clickedSlide = $(e.currentTarget)[0]
              const activeSlide = currentActiveSlide || $('.js-gallery-thumbs').find('.swiper-slide-active')[0]
              // const neighborBottom = activeSlide.next()
              // const neighborTop = activeSlide.prev()
              const clickedSlideTop = clickedSlide.getBoundingClientRect().bottom
              const activeSlideTop = activeSlide.getBoundingClientRect().bottom

              swiper.slides.forEach(slide => slide.classList.remove('swiper-slide-active'))
              clickedSlide.classList.add('swiper-slide-active')

              // gsap.to(clickedSlide, {
              //   top: (activeSlideTop - clickedSlideTop) + 'px',
              //   duration: 0.7
              // })

              // gsap.to(activeSlide, {
              //   top: (clickedSlideTop - activeSlideTop) + 'px',
              //   duration: 0.7
              // })

              currentActiveSlide = clickedSlide

              // if(neighborTop.hasClass('swiper-slide-active')) {
              //   gsap.to(neighborTop, {
              //     top: neighborTop[0].getBoundingClientRect().height + 'px',
              //     duration: 0.7,
              //   });
              //   gsap.to(activeSlide, {
              //     top: '-' + activeSlide[0].getBoundingClientRect().height + 'px',
              //     duration: 0.7,
              //   });
              // } else {
              //   gsap.to(neighborBottom, {
              //     top: -neighborBottom[0].getBoundingClientRect().height + 'px',
              //     duration: 0.7,
              //   });
              //   gsap.to(activeSlide, {
              //     top: activeSlide[0].getBoundingClientRect().height + 'px',
              //     duration: 0.7,
              //   });
              // }
            });
          });
        },
      },
    });

    // this.$slider2.on('slideChange', swiper => {
    //   console.log(swiper)
    // })
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

    this.controlsSlider()

    this.$slider2.on('slideChange', swiper => {
      console.log('slideChange')
    })

    this.sizeThumb = $('.js-gallery-thumbs .swiper-slide')[0].getBoundingClientRect().height
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

