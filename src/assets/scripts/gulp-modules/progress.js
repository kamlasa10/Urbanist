class GalleryActions {
    static close(callback) {
        // if(!callback) {
        //     throw new Error('callback expect how a function, but is value' + ' ' + callback)
        // }

        GalleryActions.animationHide()
        onScroll()
    }

    static animationHide() {
        gsap.to('.js-gallery', {
            opacity: 0,
            display: 'none',
            direction: 1,
            onStart() {
                setTimeout(animationScroll, 500)
            }
        })
    }

    static animationShow(fn) {
        gsap.to('.js-gallery', {
            opacity: 1,
            display: 'block',
            direction: 1,
            onStart() {
                $('.header').removeClass('move')
            },
            onComplete: fn
        })
    }

    static open(callback) {
        if(!callback) {
            throw new Error('callback expect how a function, but is value' + ' ' + callback)
        }
        
        callback()

        disabledScroll()
        
        GalleryActions.animationShow(window.InitDoubleSliders.updateSliders)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.initCustomScroll(false)

    function setDashoffsetCircle(el) {
        return 2 * Math.PI * el.getAttribute("r");
    }

    function simulatePathDrawing(path, fillPercentage = 10, strokeWidth = 1) {
        if (path.done) return;
        path.style.strokeDasharray = 0;
        path.style.strokeDashoffset = 0;
        // var path = document.querySelector('.squiggle-animated path');
        const length = setDashoffsetCircle(path);
        path.style.transition = path.style.WebkitTransition = "none";
        path.style.fill = "none";
        path.style.strokeDashoffset = "0";
        path.style.transition = path.style.WebkitTransition = "stroke-dashoffset 1.5s ease";
        // Set up the starting positions
        path.style.strokeDasharray = `${length * (fillPercentage / 100)} ${length}`;
        path.style.strokeDashoffset = length + length * (fillPercentage / 100);
        path.style.transformOrigin = `center`;
        // Trigger a layout so styles are calculated & the browser
        // picks up the starting position before animating
        path.style.strokeWidth = strokeWidth;
        path.done = true;
    }

    Array.from(document.querySelectorAll("[data-progress]")).forEach(
        (item) => {
          const icon = item.querySelector(".data-progress-circle");
          const percent = item.dataset.progress;
    
          simulatePathDrawing(icon, percent);
        }
    );

    function addHandlerClick(className, fn) {
        document.querySelectorAll(className).forEach(node => {
            node.addEventListener('click', e => {
                e.preventDefault()
                fn()
            })
        })
    }

    addHandlerClick('.js-gallery-close', () => {
        GalleryActions.close()
    })

    addHandlerClick('.js-progress__item', () => {
        GalleryActions.open(InitDoubleSliders.init)
    })

//   var galleryTop = new Swiper('.gallery-top', {
//     slidesPerView: 1,  
//     loop: true,
//     navigation: {
//       nextEl: '.swiper-button-next_progress',
//       prevEl: '.swiper-button-prev_progress',
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
})