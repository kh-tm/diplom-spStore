$(function() {
  // слайдер для страницы товара
    $('.slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        fade: true,
        asNavFor: '.slider-nav'
        });
    $('.slider-nav').slick({
        arrows: false,
        slidesToShow: 4,
        slidesToScroll: 1,
        asNavFor: '.slider',
        centerMode: true,
        centerPadding: '0px',
        focusOnSelect: true,
        vertical: true
        });
    $('.slider__item').zoom({
        magnify: 0.8
    });

    // слайдер для отзывов
    $('.reviews__wrapper').slick({
      dots: true,
      infinite: true,
      speed: 300,
      slidesToShow: 1,
      adaptiveHeight: true,
      autoplay: true,
      autoplaySpeed: 5000
    });

});
