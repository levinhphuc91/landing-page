'use strict'
$(document).ready(function () {
  scrollAnimation();
})

function scrollAnimation() {
  var heightOfScreen = $(window).height();
  $('.container-homepage').css('margin-top', heightOfScreen);
  $(document).scroll(function() {
    var $headerScroll = $('#container-header-scroll');
    var scrollHeight = $(document).scrollTop();
    console.log(scrollHeight);
    if(scrollHeight > heightOfScreen) {
      $headerScroll.addClass('fixed-container-header scroll-header');
    } else {
        $headerScroll.removeClass('fixed-container-header scroll-header');
    }
    var opacity = 1 - (scrollHeight / (heightOfScreen / 2));
    $('.content-header').css('opacity', opacity);
  });
}
