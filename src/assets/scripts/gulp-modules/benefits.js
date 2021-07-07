document.addEventListener('DOMContentLoaded', () => {
    window.initCustomScroll()

    function animationBlock5() {
        const tl = gsap.timeline()
        const item = $('[data-block="5"]')

        tl.fromTo(item.find('img'), {
            opacity: 0,
            y: 50
        }, {
            opacity: 1,
            y: 0,
            duration: 1
        })
        .fromTo(item.find('.benefits__inf_block'), {
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

        return function() {
            tl.fromTo($(item).find('.block__text'), {
                y: -30,
                opacity: 0
            }, {
                y: 0,
                opacity: 1,
                duration: 1.2,
                stagger: 0.15
            })
            .fromTo($(item).find('.animation-img'), {
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

    function animateBigImgWithText(item) {
        const tl = gsap.timeline()
        const isReverse = $(item).hasClass('benefits__block-revers')

        return function() {
            tl.fromTo($(item).find('.block__text'), {
                opacity: 0,
                x: isReverse ? '50px' : '-50px'
            }, {
                opacity: 1,
                x: 0,
                duration: 1
            })
            .fromTo($(item).find('.benefits__block_img'), {
                opacity: 0,
                y: 50
            }, {
                opacity: 1,
                y: 0,
                duration: 1
            }, 0)

            return tl
        }
    }

    const animationsData = {
        1: animateBigImgWithText,
        2: animateImgWithText,
        3: animateBigImgWithText,
        4: animateImgWithText,
        5: animationBlock5
    }

    gsap.utils.toArray('[data-block]').forEach(item => {
        const blockName = item.dataset.block
        const animationFn = animationsData[blockName]

        switch(blockName) {
            case '1':
            case '3':
                window.createScrollTrigger({
                    trigger: item
                }, animationFn(item), false)
                break
            case '2':
            case '4': 
                window.createScrollTrigger({
                    trigger: item
                }, animationFn(item), false)
                break
            case '5':
                window.createScrollTrigger({
                    trigger: item
                }, animationFn, false)
        }
    })
})