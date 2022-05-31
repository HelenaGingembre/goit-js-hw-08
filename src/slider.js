$(document).ready(function() {
  $('.one-time').slick({
    dots: true,
    dotsClass: "my-dots",
  });
});


$('.one-time').slick({
  dots: true,
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  adaptiveHeight: true
});
//скролл плавный по нажатию на кнопку меню по id
$(document).ready(function(){
    $("#menu").on("click","a", function (event) {
        //отменяем стандартную обработку нажатия по ссылке
        event.preventDefault();
        //забираем идентификатор блока с атрибута href
        var id  = $(this).attr('href'),
        //узнаем высоту от начала страницы до блока на который ссылается якорь
            top = $(id).offset().top;
        //анимируем переход на расстояние - top за 3000 мс
        $('body,html').animate({scrollTop: top}, 3000, linear);
    });
});
