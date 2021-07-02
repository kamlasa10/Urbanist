class InitDoubleSliders {
  constructor({ $slider1, $slider2 }) {
    this.$slider1 = $slider1;
    this.$slider2 = $slider2;
    this.sizeThumb = 0
  }

  static clickableSlide = null
  static isClickableSlide = false 
  static isFirstSlideChange = true

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
        init(swiper) {

          swiper.slides.forEach(item => {
            item.addEventListener('click', e => {
              InitDoubleSliders.clickableSlide = $(e.currentTarget)[0]
              const activeSlide = swiper.slides[swiper.activeIndex]
              // const neighborBottom = activeSlide.next()
              // const neighborTop = activeSlide.prev()

              // if(activeSlide === InitDoubleSliders.clickableSlide) return
              // if(swiper.slides[swiper.activeIndex] === InitDoubleSliders.clickableSlide.nextElementSibling) {
              //   console.log('after')
              //   swiper.slidePrev(700)
              //   InitDoubleSliders.isClickableSlide = true
              //   return
              // }
              // if(swiper.slides[swiper.activeIndex] === InitDoubleSliders.clickableSlide.previousElementSibling) {
              //   console.log('after')
              //   swiper.slideNext(700)
              //   InitDoubleSliders.isClickableSlide = true
              //   return
              // }

              InitDoubleSliders.isClickableSlide = false

              // swiper.slides.forEach(slide => slide.classList.remove('swiper-slide-active'))
              // clickedSlide.classList.add('swiper-slide-active')

              // gsap.to(clickedSlide, {
              //   top: (activeSlideTop - clickedSlideTop) + 'px',
              //   duration: 0.7
              // })

              // gsap.to(activeSlide, {
              //   top: (clickedSlideTop - activeSlideTop) + 'px',
              //   duration: 0.7
              // })

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
      speed: 700,
      navigation: {
        nextEl: '.js-swiper-button-next_gallery',
        prevEl: '.js-swiper-button-prev_gallery',
      },
      direction: 'vertical',
      sliderDrag: false,
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
    this.$slider2.on('slideChangeTransitionStart', (swiper) => {
      // const activeSlide = swiper.slides[swiper.activeIndex]
      // swiper.activeIndex
      // const prevSlide = activeSlide.previousElementSibling
      // const nextSlide = activeSlide.nextElementSibling
      // if(activeSlide.classList.contains('swiper-slide-thumb-active') || activeSlide.classList.contains('swiper-slide-active') === false) {
      //   return
      // }

      // if(prevSlide.classList.contains('swiper-slide-thumb-active')) {
      //   swiper.slidePrev()
      //   return
      // }
      // if(nextSlide.classList.contains('swiper-slide-thumb-active')) {
      //   swiper.slideNext()
      //   return
      // }
    })
    this.$slider2.on('slideChange', swiper => {

      // const activeSlide = swiper.slides[swiper.activeIndex]
      // const prevSlide = activeSlide.previousElementSibling
      // const nextSlide = activeSlide.nextElementSibling

      // if(InitDoubleSliders.isClickableSlide) return

      // if(prevSlide.classList.contains('swiper-slide-thumb-active') && !InitDoubleSliders.isClickableSlide) {
      //   InitDoubleSliders.isClickableSlide = true
      //   swiper.slidePrev(700)
      //   return
      // }
      // if(nextSlide.classList.contains('swiper-slide-thumb-active') && !InitDoubleSliders.isClickableSlide) {
      //   InitDoubleSliders.isClickableSlide = true
      //   swiper.slideNext(700)
      //   return
      // }
    })

    // this.sizeThumb = $('.js-gallery-thumbs .swiper-slide')[0].getBoundingClientRect().height
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

