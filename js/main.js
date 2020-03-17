$(document).ready(function () {
  let resizeId; // for resize timer
  let wWidth = $(window).width(); // for resize
  let h = $(window).height();
  let controller = new ScrollMagic.Controller();

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


  $('.page-menu__list > ul > li > a').on('mouseenter', function (e) {
    let target = $(this).attr('data-img');
    $('.page-menu__list>ul > li').removeClass('is-active');
    $(this).parent().addClass('is-active');
    $('.page-menu__media-item').removeClass('is-active');
    $('.page-menu__media-item' + target).addClass('is-active');
  }).on('mouseleave', function (e) {
    let target = $('.page-menu__list > ul li.is-active').find('a').attr('data-img');
    $('.page-menu__media-item' + target).addClass('is-active');
  });
/// End header

  //Homepage catalog image change
  function catalogImageChange(e) {
    e.preventDefault();
    let target = $(this).attr('data-img');
    $('.home-catalog__list-item').removeClass('is-active');
    $(this).parent().addClass('is-active');
    $('.home-catalog__media-item').removeClass('is-active');
    $('.home-catalog__media-item' + target).addClass('is-active');
  }

  $('.home-catalog__list-link')
    .on('click', catalogImageChange)
    .on('mouseenter', catalogImageChange)
    .on('mouseleave', function (e) {
      let target = $(this).attr('data-img');
      $('.home-catalog__media-item' + target).addClass('is-active');
    });

  //carousels
  $('.home-carousel').slick({
    arrows: true,
    dots: true,
    fade: true,
    prevArrow: $('.home-carousel__arrows-wrap').find('.home-carousel__arrow--prev'),
    nextArrow: $('.home-carousel__arrows-wrap').find('.home-carousel__arrow--next'),
    dotsClass: 'home-slick__paging',
    customPaging: function (slider, i) {
      return '<span class="page-count__current">0' + (i + 1) + '</span>' + '<span class="page-count__separator">/</span>' + '<span class="page-count__total">0' + slider.slideCount + '</span>';
    },
  });


  function heroContentAnimation() {
    const heroContentTl = new TimelineMax({
      repeat: 0,
      delay: 1.2,
      ease: Power0.easeNone
    });

    const heading = $('.home-carousel__item-content-inner h1');
    const text = $('.home-carousel__item-content-inner p');
    const btn = $('.home-carousel__item-content-inner a');


    heroContentTl
      .staggerFromTo(heading, 0.7, {opacity:0}, {opacity: 1}, 0.1, 'heading')
      .staggerFromTo(text, 0.7, {opacity:0}, {opacity: 1}, 0.1, '+=0.1')
      .staggerFromTo(btn, 0.6, {y: 30, opacity:0}, {y: 0, opacity: 1}, 0.1, '+=0.1');
  }

//homepage animation
  function heroAnimation() {
    const heroTl = new TimelineMax({
      repeat: 0,
      delay: 0.7,
      ease: Power2.easeInOut
    });

    const topLine = $('.home-carousel__controls-border--top');
    const bottomLine = $('.home-carousel__controls-border--bottom');
    const verticalLine = $('.home-hero__line-vertical');
    const circle = $('.home-carousel__controls-circle circle');
    const arrows = $('.home-carousel__arrow');
    const img = $('.home-carousel__item.slick-active .home-carousel__item-media img');
    const paging = $('.home-slick__paging');

    heroTl
      .staggerFromTo(img, 3, {scale: 1, opacity: 0.3}, {scale: 1.15, opacity: 1}, 0.6, 'border')
      .staggerTo(topLine, 2, {scaleX: 1}, 0.6, 'border')
      .staggerTo(bottomLine, 2, {scaleX: 1}, 0.6, 'border')
      .staggerTo(verticalLine, 2, {scaleY: 1}, 0.6, 'border')
      .staggerTo(circle, 2, {strokeDashoffset: 0}, 0.6, 'border')
      .staggerTo(arrows, 0.4, {opacity: 1}, 0.6, '+=0.2')
      .staggerTo(paging, 0.4, {opacity: 1}, 0.6, 'heading');
  }

  function heroVideoInit() {
    if ($('.home-hero').length > 0) {

      setTimeout(function () {
        $('.home-carousel').slick('slickGoTo', 1);
        $('.home-carousel__item-media video').get(0).play();
        // heroContentAnimation();
      },4500)
    }
  }


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


  $(window).on('load', function (e) {
    $('.page-wrapper').addClass('is-revealed');
    heroAnimation();
    heroContentAnimation();
    heroVideoInit();
  });
});


