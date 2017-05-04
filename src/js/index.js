'use strict'
$(document).ready(function () {
  scrollAnimation();
  listCounties();
  collapseExpand();
})

function collapseExpand() {
  $("a[data-toggle='collapse']").on('click', function() {
    var self = this;
    setTimeout(function() {
      if(!$(self).hasClass('collapsed')) {
        $(self).text('Show less');
      } else {
        $(self).text('Learn more');
      }
    }, 100);
  });
}

function scrollAnimation() {
  var heightOfScreen = $(window).height();
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

function listCounties() {
  var country_list = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Antigua &amp; Barbuda","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas"
		,"Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Bosnia &amp; Herzegovina","Botswana","Brazil","British Virgin Islands"
		,"Brunei","Bulgaria","Burkina Faso","Burundi","Cambodia","Cameroon","Canada","Cape Verde","Cayman Islands","Chad","Chile","China","Colombia","Congo","Cook Islands","Costa Rica"
		,"Cote D Ivoire","Croatia","Cruise Ship","Cuba","Cyprus","Czech Republic","Denmark","Djibouti","Dominica","Dominican Republic","Ecuador","Egypt","El Salvador","Equatorial Guinea"
		,"Estonia","Ethiopia","Falkland Islands","Faroe Islands","Fiji","Finland","France","French Polynesia","French West Indies","Gabon","Gambia","Georgia","Germany","Ghana"
		,"Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guinea Bissau","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India"
		,"Indonesia","Iran","Iraq","Ireland","Isle of Man","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Kyrgyz Republic","Laos","Latvia"
		,"Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania"
		,"Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","Netherlands Antilles","New Caledonia"
		,"New Zealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","Papua New Guinea","Paraguay","Peru","Philippines","Poland","Portugal"
		,"Puerto Rico","Qatar","Reunion","Romania","Russia","Rwanda","Saint Pierre &amp; Miquelon","Samoa","San Marino","Satellite","Saudi Arabia","Senegal","Serbia","Seychelles"
		,"Sierra Leone","Singapore","Slovakia","Slovenia","South Africa","South Korea","Spain","Sri Lanka","St Kitts &amp; Nevis","St Lucia","St Vincent","St. Lucia","Sudan"
		,"Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Timor L'Este","Togo","Tonga","Trinidad &amp; Tobago","Tunisia"
		,"Turkey","Turkmenistan","Turks &amp; Caicos","Uganda","Ukraine","United Arab Emirates","United Kingdom","United States","United States Minor Outlying Islands","Uruguay","Uzbekistan","Venezuela","Vietnam","Virgin Islands (US)"
		,"Yemen","Zambia","Zimbabwe"];

  var countries = document.getElementById("countries");
  var countriesModal = document.getElementById("countriesModal");
  for(var i = 0; i < country_list.length; i++){
    var country = new Option(country_list[i], i);
    countries.options.add(country);
  }
  for(var i = 0; i < country_list.length; i++){
    var country = new Option(country_list[i], i);
    countriesModal.options.add(country);
  }
}
