class InitDoubleSliders {
    constructor({$slider1, $slider2}) {
        this.$slider1 = $slider1
        this.$slider2 = $slider2
    }

    init() {
        this.$slider2 = new Swiper(this.$slider2, {
            direction: 'vertical',
            loop: true,
            slidesPerView: 5,
            centeredSlides: true,
            on: {
                slideChangeTransitionStart(e) {
                    
                },
                init(swiper) {
                    swiper.slides.forEach(item => {
                        item.addEventListener('click', e => {
                            const clickedEl = e.currentTarget
                            const activeSlide = swiper.$el.find('.swiper-slide-active')

                            swiper.slides.forEach(item => item.classList.remove('swiper-slide-active'))
                            clickedEl.classList.add('swiper-slide-active')
                            

                            gsap.to(clickedEl, {
                                top: (activeSlide[0].getBoundingClientRect().bottom - clickedEl.getBoundingClientRect().bottom) + 'px',
                                duration: 0.8
                            })
                            console.log(clickedEl.getBoundingClientRect(), activeSlide[0].getBoundingClientRect())
                            gsap.to(activeSlide, {
                                top: (clickedEl.getBoundingClientRect().bottom - activeSlide[0].getBoundingClientRect().bottom) + 'px',
                                duration: 0.8
                            })
                        })
                    })
                }
            }
        })

        this.$slider1 = new Swiper(this.$slider1, {
            loop: true,
            speed: 700,
            navigation: {
                nextEl: '.js-swiper-button-next_gallery',
                prevEl: '.js-swiper-button-prev_gallery'
            },
            thumbs: {
                swiper: this.$slider2
            },
            pagination: {
                el: '.swiper-pagination',
                type: 'fraction',
                formatFractionCurrent: function (number) {
                    let isWithZero = number < 10 ? `0${number}`: number + ''
                    return isWithZero.slice(-2);
                },
                formatFractionTotal: function (number) {
                    let isWithZero = number < 10 ? `0${number}`: number + ''
                    return isWithZero.slice(-2);
                },
                renderFraction: function (currentClass, totalClass) {
                    return '<span class="' + currentClass + '"></span>' +
                            ' - ' +
                            '<span class="' + totalClass + '"></span>';
                }
            }
        })
    }
}

const initDoubleSliders = new InitDoubleSliders(
    {$slider1: '.js-gallery-main', $slider2: '.js-gallery-thumbs'})

document.addEventListener('DOMContentLoaded', () => {
    initDoubleSliders.init()
})


// function initSliderGallery() {
//   const galleryTop = new Swiper('.gallery-top', {
//     slidesPerView: 1,  
//     loop: true,
//     loopedSlides: 50,
//     navigation: {
//       nextEl: '.swiper-button-next',
//       prevEl: '.swiper-button-prev',
//     },
//   });
//   const galleryThumbs = new Swiper('.gallery-thumbs', {
//     direction: 'vertical',
//     slidesPerView: 4,
//     slideToClickedSlide: true,
//     spaceBetween: 10,
//     loopedSlides: 50,
//     loop: true,
//   });
//   galleryTop.controller.control = galleryThumbs;
//   galleryThumbs.controller.control = galleryTop;
// }

// document.addEventListener('DOMContentLoaded', initSliderGallery);

// // document.addEventListener('DOMContentLoaded', () => {
// //   var galleryTop = new Swiper('.gallery-top', {
    
// //     slidesPerView: 1,  
// //     loop: true,
// //     navigation: {
// //       nextEl: '.swiper-button-next_gallery',
// //       prevEl: '.swiper-button-prev_gallery',
// //     },
// //     pagination: {
// //       el: '.swiper-pagination',
// //       type: 'fraction',
// //       formatFractionCurrent: function (number) {
// //           return ('0' + number).slice(-2);
// //       },
// //       formatFractionTotal: function (number) {
// //           return ('0' + number).slice(-2);
// //       },
// //       renderFraction: function (currentClass, totalClass) {
// //           return '<span class="' + currentClass + '"></span>' +
// //                 ' — ' +
// //                 '<span class="'  + totalClass +  '"></span>';
// //       }
// //   },
// //   });
// //   var galleryThumbs = new Swiper('.gallery-thumbs', {
// //     direction: 'vertical',
// //     slidesPerView: 5,
// //     slideToClickedSlide: true,
// //     // freeMode: true,
// //     loop: true,
// //   });
// //   // galleryTop.controller.control = galleryThumbs;
// //   galleryTop.on('activeIndexChange', (el)=>{
    
// //     galleryThumbs.slideTo(galleryTop.activeIndex, 2000,false);
// //   })
// //   galleryThumbs.on('activeIndexChange', (el)=>{
// //     console.log(el);
// //     console.log(galleryThumbs.activeIndex, 'TOP');
// //     console.log(galleryTop.activeIndex, 'bottom');
// //     galleryTop.slideTo(galleryThumbs.activeIndex, 2000,false);
// //   })
// //   // galleryThumbs.controller.control = galleryTop;
// // })


// document.addEventListener('DOMContentLoaded', () => {
//   var galleryTop = new Swiper('.gallery-top', {
//     slidesPerView: 1,  
//     loop: true,
//     navigation: {
//       nextEl: '.swiper-button-next_gallery',
//       prevEl: '.swiper-button-prev_gallery',
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
// })