document.addEventListener('DOMContentLoaded', () => {
  window.initCustomScroll()
  const swiper = new Swiper('.js-slider-docs', {
		slidesPerView: 2,
		speed: 500,
		spaceBetween: 40,
		navigation: {
			nextEl: '.slides-nav__button--next',
			prevEl: '.slides-nav__button--prev',
		},
	})

	const pageTitle = $('.breadcrumbs')
	const sliderContainer = $('.js-slider-docs')

	$(window).on('resize', () => {
		const offsetLeft = pageTitle.offset().left
		console.log(offsetLeft)
		sliderContainer.css('padding-left', `${offsetLeft + 200}px`)
	}).resize()
})
