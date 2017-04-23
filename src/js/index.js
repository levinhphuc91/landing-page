'use strict'
$(document).ready(function () {
  // alert('test02')
  scrollAnimation();
})

function scrollAnimation() {
  $(document).scroll(function() {
    var $headerScroll = $('.container-header-scroll');
    var scrollHeight = $(document).scrollTop();
    console.log(scrollHeight);
    if(scrollHeight > 750) {
      $headerScroll.removeClass('hidden').addClass('animated fadeInDown');
    } else if(!$headerScroll.hasClass('hidden')) {
      $('.container-header-scroll').addClass('hidden').removeClass('animated fadeInDown');
    }
  });
}
