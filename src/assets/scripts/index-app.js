import LocomotiveScroll from 'locomotive-scroll';
import i18next from 'i18next';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger'
import axios from 'axios';
import * as yup from 'yup';
import FormMonster from '../../pug/components/form/form';
import SexyInput from '../../pug/components/input/input';
import { EventEmitter } from 'events';
import $ from 'jquery'

gsap.registerPlugin(ScrollTrigger)

/** ******************************* */
/*
 * smooth scroll start
 */
global.gsap = gsap;
global.LocomotiveScroll = LocomotiveScroll
global.axios = axios;
global.ScrollTrigger = ScrollTrigger
global.EventEmitter = EventEmitter
global.isWatchInScroll = true

window.initCustomScroll = function(needSmothScroll = true) {
  $(window)
    .on('resize', () => {
      if ($(window).width() > 1025 && needSmothScroll) {
        if (window.locoScroll) return;

        window.locoScroll = new LocomotiveScroll({
          el: document.querySelector('[data-scroll-container]'),
          smooth: true,
          smoothMobile: false,
          inertia: 1.1,
        });

        window.locoScroll.on('scroll', e => {
          ScrollTrigger.update(e);
        });

        ScrollTrigger.scrollerProxy(document.querySelector('[data-scroll-container]'), {
          scrollTop(value) {
            return arguments.length
              ? locoScroll.scrollTo(value, 0, 0)
              : locoScroll.scroll.instance.scroll.y;
          }, // we don't have to define a scrollLeft because we're only scrolling vertically.
          getBoundingClientRect() {
            return {
              top: 0,
              left: 0,
              width: window.innerWidth,
              height: window.innerHeight,
            };
          },
          // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
          pinType: document.querySelector('[data-scroll-container]').style.transform
            ? 'transform'
            : 'fixed',
        });

        ScrollTrigger.addEventListener('refresh', () => window.locoScroll.update());

        // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
        ScrollTrigger.refresh();

        setTimeout(() => {
          window.locoScroll.update();
        }, 1000);
      }
    })
    .resize();

  const $header = $('.header');

  function animateScroll(offset) {
    if (offset > 10) {
      $header.addClass('move');
    } else {
      $header.removeClass('move');
    }
  }

  if (window.locoScroll) {
    window.locoScroll.on('scroll', e => {
      if(window.isWatchInScroll) {
        animateScroll(e.scroll.y);
        window.scrollOffset = e.scroll.y
        console.log(window.scrollOffset)
      }
    });

    return;
  }

  window.addEventListener('scroll', e => {
    animateScroll(window.pageYOffset);
  });
}

/* eslint-disable-next-line */
// const locoScroll = new LocomotiveScroll({
//   el: document.querySelector('[data-scroll-container]'),
//   smooth: true,
//   smoothMobile: false,
//   inertia: 1.1,
// });

global.initCustomScroll = window.initCustomScroll

global.locoScroll = window.locoScroll;
/*
 * smooth scroll end
 */
/** ******************************* */
/** ******************************* */
/*
 * form handlers start
 */
const forms = [
  '[data-home-contact]',
];
const formsWithRedirect = [
  '[data-popup-form]',
];

formsWithRedirect.forEach((form) => {
  const $form = document.querySelector(form);
  if ($form) {
    /* eslint-disable */
    new FormMonster({
      /* eslint-enable */
      elements: {
        $form,
        showSuccessMessage: false,
        successAction: () => { window.location.href = 'message'; },
        $btnSubmit: $form.querySelector('[data-btn-submit]'),
        fields: {
          name: {
            inputWrapper: new SexyInput({ animation: 'none', $field: $form.querySelector('[data-field-name]') }),
            rule: yup.string().required(i18next.t('required')).trim(),
            defaultMessage: i18next.t('name'),
            valid: false,
            error: [],
          },

          phone: {
            inputWrapper: new SexyInput({ animation: 'none', $field: $form.querySelector('[data-field-phone]'), typeInput: 'phone' }),
            rule: yup
              .string()
              .required(i18next.t('required'))
              .min(16, i18next.t('field_too_short', { cnt: 19 - 7 })),

            defaultMessage: i18next.t('phone'),
            valid: false,
            error: [],
          },
        },

      },
    });

    $form.querySelector('.js-mask-absolute').addEventListener('click', () => {
      $form.querySelector('[name="phone"]').focus();
    }, false);
  }
});

forms.forEach((form) => {
  const $form = document.querySelector(form);
  if ($form) {
    /* eslint-disable */
    new FormMonster({
      /* eslint-enable */
      elements: {
        $form,
        showSuccessMessage: false,
        successAction: () => { window.location.href = 'message'; },
        $btnSubmit: $form.querySelector('[data-btn-submit]'),
        fields: {
          name: {
            inputWrapper: new SexyInput({ animation: 'none', $field: $form.querySelector('[data-field-name]') }),
            rule: yup.string().required(i18next.t('required')).trim(),
            defaultMessage: i18next.t('name'),
            valid: false,
            error: [],
          },

          phone: {
            inputWrapper: new SexyInput({ animation: 'none', $field: $form.querySelector('[data-field-phone]'), typeInput: 'phone' }),
            rule: yup
              .string()
              .required(i18next.t('required'))
              .min(17, i18next.t('field_too_short', { cnt: 17 - 5 })),

            defaultMessage: i18next.t('phone'),
            valid: false,
            error: [],
          },
        },

      },
    });

    $form.querySelector('.js-mask-absolute').addEventListener('click', () => {
      $form.querySelector('[name="phone"]').focus();
    }, false);
  }
});

/*
 * form handlers end
 */
function disableScroll() {
  const containersScroll = document.querySelectorAll('[data-disable-page-scroll]');
  containersScroll.forEach((block) => {
    block.addEventListener('mouseenter', () => {
      locoScroll.stop();
    });
    block.addEventListener('mouseleave', () => {
      locoScroll.start();
    });
  });
}

// document.addEventListener('DOMContentLoaded', () => {
//   disableScroll();
//   window.locoScroll.update();
// });
/** ******************************* */
