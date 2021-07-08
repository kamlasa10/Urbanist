document.addEventListener('DOMContentLoaded', () => {
	const pageTitle = $('.breadcrumbs')
	const sliderContainer = $('.js-slider-docs')

	$(window).on('resize', () => {
		const offsetLeft = pageTitle.offset().left
		sliderContainer.css('padding-left', `${offsetLeft + 200}px`)
	}).resize()

	window.initCustomScroll()
	const swiper = new Swiper('.js-slider-docs', {
		slidesPerView: 5,
		speed: 500,
		breakpoints: {
			1050: {
				slidesPerView: 4
			},
			1445: {
				slidesPerView: 5
			}
		},
		spaceBetween: 40,
		navigation: {
			nextEl: '.slides-nav__button--next',
			prevEl: '.slides-nav__button--prev',
		},
	})
})
