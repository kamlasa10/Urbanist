document.addEventListener('DOMContentLoaded', () => {
    window.initCustomScroll()

    function animationBlock5() {
        const tl = gsap.timeline()
        const item = $('[data-block="2"]')

        tl.fromTo(item.find('img'), {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            duration: 1
        })
        .fromTo(item.find('.environment__main_block'), {
            opacity: 0,
            y: 20
        }, {
            opacity: 1,
            y: 0,
            duration: 0.8
        }, 0.2)

        return tl
    }

    function animateImgWithText(item) {
        const tl = gsap.timeline()
        const isPhone = window.getClientWidth() <= 480

        return function() {
            tl.fromTo($(item).find('.block__text'), {
                y: isPhone ? '' : -30,
                x: isPhone ? -30 : '',
                opacity: 0
            }, {
                y: 0,
                x: 0,
                opacity: 1,
                duration: 1.2,
                stagger: 0.15
            })
            .fromTo($(item).find('.environment__item_photo'), {
                y: 30,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 1.2,
                stagger: 0.15
            }, 0)

            return tl
        }
    }

    const animationsData = {
        1: animateImgWithText,
        2: animationBlock5,
    }

    gsap.utils.toArray('[data-block]').forEach(item => {
        const blockName = item.dataset.block
        const animationFn = animationsData[blockName]

        switch(blockName) {
            case '1':
                window.createScrollTrigger({
                    trigger: item
                }, animationFn(item), false)
                break
            case '2':
                window.createScrollTrigger({
                    trigger: item
                }, animationFn, false)
                break
        }   
    })
})