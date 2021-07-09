class Navigation {
    constructor(el) {
        this.DOM = {el};
        this.DOM.ctrls = {
            next: this.DOM.el.querySelector('.slides-nav__button--next'),
            prev: this.DOM.el.querySelector('.slides-nav__button--prev')
        };
        this.DOM.current = this.DOM.el.querySelector('.slides-nav__index-current');
        this.DOM.total = this.DOM.el.querySelector('.slides-nav__index-total');
    }
    // updates the current value
    updateCurrent(position) {
        this.DOM.current.innerHTML = position < 10 ? `0${position+1}` : position;
    }
}

class Slide {
    constructor(el) {
        this.DOM = {el};
        this.DOM.imgWrap = this.DOM.el.querySelector('.slide__img-wrap');
        this.DOM.img = this.DOM.imgWrap.querySelector('.slide__img');
        this.DOM.headline = this.DOM.el.querySelector('.main__header');
        this.DOM.text = this.DOM.headline.querySelectorAll('.text-row > span');
        this.DOM.links = [...this.DOM.el.querySelectorAll('.text-animate')];
        // this.DOM.textAnimatition = this.DOM.el.querySelectorAll('.text-animate')
    }
}

class Slideshow extends EventEmitter {
    constructor(el) {
        super();
        // the main wrapper <div class="slideshow">
        this.DOM = {el};
        // the slides
        this.DOM.slides = [...this.DOM.el.querySelectorAll('.slide')];
        // array of Slide obj instances
        this.slides = [];
        this.DOM.slides.forEach(slide => this.slides.push(new Slide(slide)));
        // total number of Slides
        this.slidesTotal = this.slides.length;
        this.borderCornerHeight = document.querySelector('.vector__rounded').getBoundingClientRect().height
        // current position
        this.current = 0;
        // some settings, like the clip paths
        let initialCircle

        if(document.documentElement.clientWidth < 2000 && document.documentElement.clientWidth > 1350) {
            initialCircle = 'circle(52% at 70% 50%)'
        } else {
            initialCircle = 'circle(55% at 70% 50%)'
        }

        if(document.documentElement.clientWidth < 750) {
            initialCircle = '0'
        }

        this.config = {
            clipPath: {
                initial: initialCircle,
                final: getClientWidth() > 755 ? 'circle(15% at 70% 50%)' : '',
                hover: 'circle(20% at 30% 50%)'
            }
        };
        this.init();
    }
    init() {
        // start with the first slide as the current slide
        this.DOM.slides[this.current].classList.add('slide--current');
        // set the initial clip path
        gsap.set(this.slides[this.current].DOM.imgWrap, {clipPath: this.config.clipPath.initial});
        // when hovering over the "explore" link on each slide, we animate the clip path from this.config.clipPath.initial to this.config.clipPath.hover
        for (const slide of this.slides) {
            const linkWithHoverEffect = slide.DOM.links.find(el => el.classList.contains('js-link-with-hover'))

            linkWithHoverEffect.addEventListener('mouseenter', () => {
                gsap.killTweensOf(slide.DOM.imgWrap);
                gsap.to(slide.DOM.imgWrap, {
                    duration: 1,
                    ease: 'expo',
                    clipPath: this.config.clipPath.hover
                });
            });
            linkWithHoverEffect.addEventListener('mouseleave', () => {
                gsap.killTweensOf(slide.DOM.imgWrap);
                gsap.to(slide.DOM.imgWrap, {
                    duration: 1,
                    ease: 'expo',
                    clipPath: this.config.clipPath.initial
                });
            });
        }
    }
    // navigate to the next slide
    next() {
        this.navigate('next');
    }
    // navigate to the previous slide
    prev() {
        this.navigate('prev');
    }
    navigate(direction) {
        // if animating do nothing
        if ( this.isAnimating ) {
            return false;
        }
        this.isAnimating = true;
        // get the current slide
        const currentSlide = this.slides[this.current];
        // update current
        if ( direction === 'next' ) {
            this.current = this.current < this.slidesTotal-1 ? this.current+1 : 0;
        }
        else {
            this.current = this.current > 0 ? this.current-1 : this.slidesTotal-1;
        }
        // now get the upcoming slide
        const upcomingSlide = this.slides[this.current];

        // animate things...
        gsap
        .timeline({
            // add class current to the upcoming slide (pointer events related)
            onStart: () => upcomingSlide.DOM.el.classList.add('slide--current'),
            // and remove that class from the currentSlide when the animation ends
            onComplete: () => {
                this.isAnimating = false;
                currentSlide.DOM.el.classList.remove('slide--current');
            }
        })
        .addLabel('start', 0)
        // set the initial styles for the upcoming slide imgWrap: clip path and translateY position 
        .set(upcomingSlide.DOM.imgWrap, {
            y: direction === 'next' ? '100%' : '-100%',
            clipPath: this.config.clipPath.final
        }, 'start')
        // also set the opacity of the upcoming slide to 1
        .set(upcomingSlide.DOM.el, {opacity: 1}, 'start')
        // set the initial styles for the upcoming slide img: translateY position
        // same for the texts and link elements
        .set(upcomingSlide.DOM.img, {y: direction === 'next' ? '-50%' : '50%'}, 'start')
        .set(upcomingSlide.DOM.text, {y: direction === 'next' ? '105%' : '-100%'}, 'start')
        .set(upcomingSlide.DOM.links, {opacity: 0}, 'start')
        // .set(upcomingSlide.DOM.textAnimation, {opacity: 0}, 'start')
        // animate the clip path from this.config.clipPath.initial to this.config.clipPath.final
        .to(currentSlide.DOM.imgWrap, {
            duration: 1,
            ease: 'power3',
            clipPath: this.config.clipPath.final,
            rotation: 0.001 // bugfix
        }, 'start')
        // animate the current slide texts out
        .to(currentSlide.DOM.text, {
            duration: 1,
            ease: 'power3',
            y: direction === 'next' ? '-105%' : '105%',
        }, 'start')
        // animate the current slide link out
        .to(currentSlide.DOM.links, {
            duration: 0.5,
            ease: 'power3',
            opacity: 0,
            stagger: direction === 'next' ? 0.1 : -0.1
        }, 'start')
        .to('.vector__rounded', {
            duration: 1,
            ease: 'power2',
            y: '-100%'
        }, 0)
        .to('.js-main__webcam', {
            duration: 0.5,
            ease: 'power3',
            opacity: 0
        }, 'start')
        // move the current slide away 
        .to(currentSlide.DOM.imgWrap, {
            duration: 1,
            ease: 'power2.inOut',
            y: direction === 'next' ? '-100%' : '100%',
            rotation: 0.001
        }, 'start+=0.6')
        .to(currentSlide.DOM.img, {
            duration: 1,
            ease: 'power2.inOut',
            y: direction === 'next' ? '50%' : '-50%'
        }, 'start+=0.6')
        // and the upcoming slide in
        .to(upcomingSlide.DOM.imgWrap, {
            duration: 1,
            ease: 'power2.inOut',
            y: '0%',
            rotation: 0.001
        }, 'start+=0.6')
        .to(upcomingSlide.DOM.img, {
            duration: 1,
            ease: 'power2.inOut',
            y: '0%'
        }, 'start+=0.6')
        // animate the upcoming slide clip path to the initial shape
        .to(upcomingSlide.DOM.imgWrap, {
            duration: 1.5,
            ease: 'expo.inOut',
            clipPath: this.config.clipPath.initial
        }, 'start+=1.2')
        // animate the upcoming slide texts in
        .to(upcomingSlide.DOM.text, {
            duration: 1.5,
            ease: 'expo.inOut',
            y: '0%',
            rotation: 0.001,
            stagger: direction === 'next' ? 0.1 : -0.1
        }, 'start+=1.1')
        // animate the upcoming slide link in
        .to(upcomingSlide.DOM.links, {
            duration: 1,
            ease: 'expo.in',
            opacity: 1,
            stagger: direction === 'next' ? 0.1 : -0.1
        }, 'start+=1.4')
        .to('.js-main__webcam', {
            duration: 1,
            ease: 'expo.in',
            opacity: 1
        }, 1.3)
        .to('.vector__rounded', {
            duration: 1,
            ease: 'power3',
            y: 0
        }, 1.8)
        
        // update the slideshow current value
        this.emit('updateCurrent', this.current);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    window.initCustomScroll()

    const slideshow = new Slideshow(document.querySelector('.slideshow'));    
    const navigation = new Navigation(document.querySelector('.slides-nav'));
    // navigation events
    navigation.DOM.ctrls.next.addEventListener('click', () => slideshow.next());
    navigation.DOM.ctrls.prev.addEventListener('click', () => slideshow.prev());
    // set the initial navigation current slide value
    navigation.updateCurrent(slideshow.current);
    // set the navigation total number of slides
    navigation.DOM.total.innerHTML = slideshow.current < 10 ? `0${slideshow.slidesTotal}` : slideshow.slidesTotal;
    // when a new slide is shown, update the navigation current slide value
    slideshow.on('updateCurrent', position => navigation.updateCurrent(position));
})