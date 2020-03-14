$(document).ready(function () {
  let resizeId; // for resize timer
  let wWidth = $(window).width(); // for resize

  function disableScrolling() {
    if ($(document).height() > $(window).height()) {
      var scrollTop = $('html').scrollTop()
        ? $('html').scrollTop()
        : $('body').scrollTop(); // Works for Chrome, Firefox, IE...
      $('html')
        .addClass('disable-scrolling')
        .css('top', -scrollTop);
    }
  }

  function enableScrolling() {
    var scrollTop = parseInt($('html').css('top'));
    $('html').removeClass('disable-scrolling');
    $('html,body').scrollTop(-scrollTop);
  }

  function isMobile() {
    if ($('.is-mobile').css('display') === 'block') {
      return true;
    } else {
      return false;
    }
  }

  /* Init object fit polyfill */
  /* To make it work, add 'font-family: 'object-fit: cover;';' to image */
  if (window.objectFitImages) {
    window.objectFitImages();
  }

  //images lazy loading
  // let lazyLoad = new LazyLoad({
  //   elements_selector: ".lazy"
  // });

  if (window.ScrollReveal) {
    let sr = window.ScrollReveal();

    let slideUp = {
      distance: '30px',
      origin: 'bottom',
      opacity: 0,
      duration: 1200,
    };

    let slideUpInterval = {
      distance: '30px',
      origin: 'bottom',
      opacity: 0,
      duration: 1200,
      interval: 300,
    };

    let fadeIn = {
      opacity: 0,
      duration: 1200,
      debug: true,
    };

    let fadeInInterval = {
      opacity: 0,
      duration: 1200,
      interval: 300,
    };

    sr.reveal('.slideUp', slideUp);
    sr.reveal('.slideUpInterval', slideUpInterval);
    sr.reveal('.fadeIn', fadeIn);
    sr.reveal('.fadeInInterval', fadeInInterval);
  }

  $('.scroll-link').on('click', e => {
    let target = $(this).attr('href');
    $('html,body').animate(
      {
        scrollTop: $(target).offset().top
      },
      1000
    );
  });

  ///  HEADER
  //reseting header

  function headerReset() {
    enableScrolling();
    $('.header').removeClass('is-active');
    $('.page-menu').removeClass('is-active');
  }

  $('.header__hamburger').on('click', function (e) {
    disableScrolling();
    $('.page-menu').addClass('is-active');
    $('.header').addClass('is-hidden');
  });


  $(".header-search__link").on('click', function (e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).toggleClass('is-active');
    $(this).parent().find('.header-search__popup').toggleClass('is-active');
  });

  $(document).on('click', function (e) {
    if (!e) e = window.event;  //for mozilla
    if ($('.header-search__popup').hasClass('is-active')) {
      if (!$(e.target).closest('.header-search__popup.is-active').length) {
        $(".header-search__link").removeClass('is-active');
        $('.header-search__popup').removeClass('is-active');
      }
    }
  });

  $('.page-menu__close').on('click', function (e) {
    enableScrolling();
    $('.page-menu').removeClass('is-active');
    $('.header').removeClass('is-hidden');
  });


  $('.page-menu__list>ul li').on('mouseenter', function (e) {
    let target = $(this).find('a').attr('data-img');
    $('.page-menu__list>ul li').removeClass('is-active');
    $(this).addClass('is-active');
    $('.page-menu__media-item').removeClass('is-active');
    $('.page-menu__media-item' + target).addClass('is-active');
  })
/// End header


  /* Trigger resize once */
  $(window).resize(function () {
    clearTimeout(resizeId);
    resizeId = setTimeout(doneResizing(wWidth), 500);

    function doneResizing() {
      let width = $(window).width();
      if (wWidth !== width) {
        wWidth = width;
      }
    }
  });

});
