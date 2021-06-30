@@include('../libs/libs.js')
let menuTl = gsap.timeline()

function animateShowingMenu() {
    if(menuTl) menuTl.kill()

    menuTl = gsap.timeline()

    menuTl.fromTo('.js-menu__title', {
        opacity: 0,
        y: -35,
    }, {
        opacity: 1,
        y: 0,
        duration: 1
    })
    .fromTo('.js-menu-item', {
        opacity: 0,
        y: 35
    }, {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2
    }, 0.3)
    .fromTo('.js-menu__image img', {
        opacity: 0.2
    }, {
        opacity: 1,
        duration: 1.3
    }, 0.2)
    .fromTo('.vector__rounded', {
        y: '-100%',
    }, {
        y: 0,
        duration: 1.3
    }, 0)
    
}

function showMenu() {
    $('.js-btn-menu').on('click', e => {
        e.preventDefault()
        
        $('.header').toggleClass('active')
        $('.js-menu').toggleClass('show')  
        
        if($('.header').hasClass('active')) {
            animateShowingMenu()
        }
    })
}

function openPopup(type) {
    $('[data-popup-type]').hide()
    $('.overlay').addClass('show')

    if(!type) {
        $('.overlay').removeClass('show')
    }

    $(`[data-popup-type=${type}]`).show()
    const animateDecor = $(`[data-popup-type=${type}]`).find('.popup__decor')

    gsap.from(animateDecor, {
        y: '-100%',
        duration: 0.65
    })
}

function handlePopup({listeners, doOpen, popupType}) {
    $(listeners).on('click', e => {
        e.preventDefault()
        const type = e.currentTarget.dataset[popupType]

        if(!doOpen) {
            openPopup()
            return
        }

        openPopup(type)
    })
}

const $header = $('.header');

function animateScroll(offset) {
    if (offset > 10) {
    $header.addClass('move');
    } else {
    $header.removeClass('move');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    (function() {
        if (window.locoScroll) {
            window.locoScroll.on('scroll', e => {
            animateScroll(e.scroll.y);
            });
        
            return;
        }
        
        window.addEventListener('scroll', e => {
            animateScroll(window.pageYOffset);
        });
    })()

    showMenu()

    document.addEventListener('click', e => {
        if(e.target.classList.contains('overlay')) {
            openPopup()
        }
    })

    handlePopup({
        listeners: '[data-popup-btn]',
        doOpen: true,
        popupType: 'popupBtn'
    })

    handlePopup({
        listeners: '[data-popup-close]',
        doOpen: false,
        popupType: 'popupClose'
    })

    $('[name=phone]').each(function() {
        
        $(this).mask('(000) 000-000-000', {selectOnFocus: true});
    });

    const currentLanguage = $('html').attr('lang')

    const msgWarnObj = {
        uk: {
          email: 'Введіть коректний Email',
          phone: 'телефон повинен містити не менше 8 символів',
          warn: "Це поле обов'язкове",
        },
        ru: {
          email: 'Введите корректный Email',
          phone: 'телефон повинен містити не менше 8 символів',
          warn: 'Это поле обязательное',
        },
        en: {
          email: 'Enter a valid Email',
          phone: 'Phone must have not less 8 symbol',
          warn: 'field is required',
        },
      };

      function removeFormTextWarn(input) {
        input
          .parent()
          .find('.field__error-msg')
          .remove();
      }
  
      function checkNumbers(str) {
        return str.replace(/[\W_]+/g, '');
      }
  
      function removeAllFormTextWarn(inputs) {
        inputs.each(function() {
          $(this)
            .parent()
            .find('.field__error-msg')
            .remove();
        });
      }
  
      function addIndicateWarnForNode(node, classes, isAdded = true) {
        if (isAdded) {
          $(node)
            .closest('.field')
            .addClass(classes);
          return;
        }
  
        $(node)
          .closest('.field')
          .removeClass(classes);
      }
  
      function removeNodeByDelay(node, delay) {
        setTimeout(() => {
          node.remove();
        }, delay);
      }

      function validateForm(inputs) {
        let isValid = true;
        inputs.each(function() {
          if (this.dataset.required) {
            $(this).on('input', e => {
                console.log($(e.currentTarget).val(), )
              if (
                $(e.target)
                  .val()
                  .replace(/\s+/g, '').length === 0 &&
                $(e.target).attr('name') === 'name'
              ) {
                const parent = $(this)
                  .parent()
                parent.find('.popup__text-warn').text('');
                parent.find('.popup__text-warn').text(msgWarnObj[currentLanguage].warn);
                parent.addClass('warn');
                isValid = false;
                return;
              } else if (
                $(e.target).attr('name') === 'phone' &&
                checkNumbers(e.currentTarget.value).length < 8
              ) {
                const parent = $(this)
                  .parent()
                parent.find('.popup__text-warn').text('');
                parent.find('.popup__text-warn').text(msgWarnObj[currentLanguage].phone);
                parent.addClass('warn');
                isValid = false;
                return;
              } else {
                const parent = $(this)
                  .parent()
                parent.removeClass('warn');
                isValid = true;
                return;
              }
            });
  
            if ($(this).attr('name') === 'phone' && this.value.length < 8) {
              const parent = $(this)
                .parent()
              parent.find('.popup__text-warn').text(msgWarnObj[currentLanguage].phone);
              parent.addClass('warn');
              isValid = false;
              return;
            }
  
            if (
              !$(this)
                .val()
                .replace(/\s+/g, '')
            ) {
              const parent = $(this)
                .parent();
              parent.find('.popup__text-warn').text(msgWarnObj[currentLanguage].warn);
              parent.addClass('warn');
              isValid = false;
            }
          }
        });
  
        return isValid;
      }

      $('form').on('submit', e => {
        e.preventDefault();
  
        let $form = $(e.currentTarget);
        const inputs = $form.find($('[name]'));
        const isValid = validateForm(inputs);
  
        if (isValid) {
          sendAjaxForm('static/mail.php', $form);
        }
      });

      function sendAjaxForm(url, selectorForm) {
        const data = new FormData();
  
        $(selectorForm)
          .find('input')
          .each(function() {
            data.append(this.name, this.value);
          });

        if(selectorForm.find('.popup__textarea')[0]) {
            const textArea = selectorForm.find('.popup__textarea')[0]

            data.append(textArea.name, textArea.value)
        }

        selectorForm.find('button[type=submit]').css('pointer-events', 'none')
  
        $.ajax({
          url: url, //url страницы (action_ajax_form.php)
          type: 'POST', //метод отправки
          dataType: 'html', //формат данных
          data: $(selectorForm)
            .find('form')
            .serialize(), // Сеарилизуем объект
          success: function(response) {
            //Данные отправлены успешно
            selectorForm.find('button[type=submit]').css('pointer-events', 'initial')
            openPopup('thanks')
            $('.form__status').remove();
            if (selectorForm[0].tagName.toLowerCase() === 'form') {
              selectorForm[0].reset();
            } else {
              selectorForm.find('form')[0].reset();
            }
          },
          error: function(response) {
            // Данные не отправлены
            $('.form__status').remove();
            $(selectorForm).append(
              `<div class="form__status">${status.error[currentLanguage]}</div>`,
            );
            const msg = $(selectorForm).find('.form__status');
  
            removeNodeByDelay(msg, 5000);
  
            if (selectorForm[0].tagName.toLowerCase() === 'form') {
              selectorForm[0].reset();
            } else {
              selectorForm.find('form')[0].reset();
            }
          },
        });
      }
})