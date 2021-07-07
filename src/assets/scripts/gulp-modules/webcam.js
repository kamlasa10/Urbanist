document.addEventListener('DOMContentLoaded', () => {
    window.initCustomScroll()

    const btns = document.querySelectorAll('[data-camera]')
    const videoContainer = document.querySelector('.js-webcam')

    function hideActiveBtn() {
        btns.forEach(item => item.classList.remove('border-green_btn'))
    }

    btns.forEach(item => {
        item.addEventListener('click', e => {
            e.preventDefault()
            hideActiveBtn()

            const src = item.dataset.camera

            item.classList.add('border-green_btn')
            videoContainer.src = src
        })
    })
})