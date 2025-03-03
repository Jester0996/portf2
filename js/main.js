$(document).ready(function () {
$('#menu-btn').click(function() {
  $(this).toggleClass('fa-times');
  $('.navbar').toggleClass('active'); 

});

$(window).on('scroll', function() {
  if ($(window).scrollTop() > 0) {
    $('.header').addClass('active');
  } else {
    $('.header').removeClass('active');
  }
});

let typed = new Typed('.typing-text', {
  strings: ['Веб-разработчик', 'HTML-верстальщик', 'делаю верстку макетов', 'верстаю под мобильные устройства',],
  typeSpeed: 120,
  loop: true

});


//  категории
$('.button').click(function() {
  let filter = $(this).attr('data-filter');

  if (filter == 'all') {
    $('.gallery-container .img').show(400);
  } else {
    $('.gallery-container .img').not('.' + filter).hide(200);
    $('.gallery-container .img').filter('.' + filter).show(400);
  }
});

// кнопка навверх

$(window).on('scroll', function() {
  $('.scroll-top').toggleClass('show', $(window).scrollTop() >= 100);
});

$('.scroll-top').on('click',function () {
  $('html, body').stop().animate({ scrollTop: 0}, 1500);
});

let path = document.querySelector('.scroll-top path');
let length_path = path.getTotalLength();
path.style.strokeDasharray = length_path + " " + length_path;
path.style.strokeDashoffset = length_path;
path.getBoundingClientRect();
path.style.transition = path.style.WebkitTransition = 'stroke-dashoffset 10ms linear';

function updateScrollTop() {
  let offset = $(document).height() - $(window).height();
  path.style.strokeDashoffset = length_path - ($(window).scrollTop() * length_path) / offset;
}

updateScrollTop();
$(window).scroll(updateScrollTop);

// переходы по меню 
let sections = $('section');

$(window).on('scroll', function() {
  sections.each(function(){
    let top = $(window).scrollTop();
    let offset = $(this).offset().top - 200;
    let id = $(this).attr('id');
    let height = $(this).height();

    if (top >= offset && top < offset + height) {
      $('.navbar a').removeClass('active');
      $('.navbar').find(`[href="#${id}"]`).addClass('active');
    }

  });
})

});