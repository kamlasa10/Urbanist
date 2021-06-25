@@include('../libs/libs.js')

function showMenu() {
    $('.js-btn-menu').on('click', e => {
        e.preventDefault()
        
        $('.js-btn-menu').toggleClass('active')
        $('.js-menu').toggleClass('show')
    })
}

document.addEventListener('DOMContentLoaded', () => {
    showMenu()
})