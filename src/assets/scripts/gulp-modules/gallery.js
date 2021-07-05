const initDoubleSliders = new window.InitDoubleSliders({
  $slider1: '.js-gallery-main',
  $slider2: '.js-gallery-thumbs',
});

document.addEventListener('DOMContentLoaded', () => {
  initDoubleSliders.init();
  window.initCustomScroll(true)
});

