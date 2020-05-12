
$(document).ready(function(){
  $("a").on('click', function(event) {
    if (this.hash !== "") {
      event.preventDefault();

      var hash = this.hash;

      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){

        window.location.hash = hash;
      });
    } 
  });

  $(".open-modal").click(function(){
    $("html").addClass("no-scroll");
  });

  $(".lightbox__close").click(function(){
    $("html").removeClass("no-scroll");
  });
});