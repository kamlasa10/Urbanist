document.addEventListener('DOMContentLoaded', () => {
    window.initCustomScroll()

    function animationBlock1() {
        const tl = gsap.timeline()
        const container = $('[data-block="1"]')

        tl.fromTo(container.find('.about__text'), {
            opacity: 0,
            y: -50,
        }, {
            opacity: 1,
            y: 0,
            duration: 1
        })
        .fromTo(container.find('.about__main_photo'), {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            duration: 1
        }, 0)

        return tl
    }

    function animationBlockTextWithImg(item) {
        const tl = gsap.timeline()
        const isReverse = item.classList.contains('.about__block_reverse')

        return function() {
            tl.fromTo($(item).find('.about__block_photo'), {
                opacity: 0,
                x: isReverse ? '50': '-50',
            }, {
                opacity: 1,
                x: 0,
                duration: 1.3
            })
            .fromTo($(item).find('.about__block__text'), {
                opacity: 0,
                x: isReverse ? '-50': '50',
            }, {
                opacity: 1,
                x: 0,
                duration: 1.3
            }, 0)

            return tl
        }
    }

    const animationsData = {
        1: animationBlock1,
        2: animationBlockTextWithImg,
        3: animationBlockTextWithImg,
        4: animationBlockTextWithImg
    }

    gsap.utils.toArray('[data-block]').forEach(item => {
        const blockName = item.dataset.block
        const animationFn = animationsData[blockName]

        switch(blockName) {
            case '1': 
                window.createScrollTrigger({
                    trigger: item
                }, animationFn, false)
                break
            case '2':
                window.createScrollTrigger({
                    trigger: item,
                    start: () => `-=${$(window).height() / 1.4}`,
                    end: () => '+=300'
                }, animationFn(item), false)
                break
            case '3':
            case '4':
                window.createScrollTrigger({
                    trigger: item
                }, animationFn(item), false)
        }
    })
})