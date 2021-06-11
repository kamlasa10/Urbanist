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
//     // freeMode: true,
//     loop: true,
//   });
//   // galleryTop.controller.control = galleryThumbs;
//   galleryTop.on('activeIndexChange', (el)=>{
    
//     galleryThumbs.slideTo(galleryTop.activeIndex, 2000,false);
//   })
//   galleryThumbs.on('activeIndexChange', (el)=>{
//     console.log(el);
//     console.log(galleryThumbs.activeIndex, 'TOP');
//     console.log(galleryTop.activeIndex, 'bottom');
//     galleryTop.slideTo(galleryThumbs.activeIndex, 2000,false);
//   })
//   // galleryThumbs.controller.control = galleryTop;
// })


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