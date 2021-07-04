document.addEventListener('DOMContentLoaded', () => {
  window.initCustomScroll()

	const swiper = new Swiper('.swiper-container', {
		slidesPerView: 4,
		spaceBetween: 40,
		navigation: {
			nextEl: '.slides-nav__button--next',
			prevEl: '.slides-nav__button--prev',
		},
	})

} )
