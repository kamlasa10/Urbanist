document.addEventListener('DOMContentLoaded', () => {
    window.initCustomScroll()

    function animationBlock1() {
        const tl = gsap.timeline()
        const container = $('[data-block="1"]')



        tl.fromTo(container.find('.about__text'), {
            opacity: 0,
            y: window.getClientWidth() >= 480 ? -50 : '',
            x: window.getClientWidth() >= 480 ? '' : -30
        }, {
            opacity: 1,
            y: 0,
            x: 0,
            duration: 1
        })
        .fromTo(container.find('.about__main_photo'), {
            opacity: 0,
            y: window.getClientWidth() >= 770 ? 50 : 30
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
        let animationOffset = '50'

        if(window.getClientWidth() <= 770) {
            animationOffset = '30'
        }

        if(window.getClientWidth() <= 480) {
            animationOffset = ''
        }

        return function() {
            tl.fromTo($(item).find('.about__block_photo'), {
                opacity: 0,
                x: isReverse ? animationOffset: -animationOffset,
                y: window.getClientWidth() <= 480 ? '30' : ''
            }, {
                opacity: 1,
                x: 0,
                y: 0,
                duration: 1.3
            })
            .fromTo($(item).find('.about__block__text'), {
                opacity: 0,
                x: isReverse ? -animationOffset: animationOffset,
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
                let startPosition = $(window).height() / 1.4
                
                if(window.getClientWidth()) {
                    startPosition = $(window).height() / 1
                }

                window.createScrollTrigger({
                    trigger: item,
                    start: () => `-=${startPosition}`,
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