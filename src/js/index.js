'use strict'
$(document).ready(function () {
  // alert('test02')
  scrollAnimation();
})

function scrollAnimation() {
  var heightOfScreen = $(window).height();
  $('.container-homepage').css('margin-top', heightOfScreen);
  $(document).scroll(function() {
    var $headerScroll = $('#container-header-scroll');
    var scrollHeight = $(document).scrollTop();
    console.log(heightOfScreen);
    if(scrollHeight > heightOfScreen) {
      $headerScroll.addClass('fixed-container-header scroll-header');
    } else {
        $headerScroll.removeClass('fixed-container-header scroll-header');
    }
  });
}
