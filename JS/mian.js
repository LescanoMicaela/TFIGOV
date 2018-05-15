$(function () {
    $(".hide-show").hide();

    $("#buttonmore").click(function () {
        $("#buttonmore").hide();
        $(".hide-show").show();
    });

    $("#buttonless").click(function () {
        $(".hide-show").hide();
        $("#buttonmore").show();
    });
    forScroll();
});







//////// boleans is like interruptor
function forScroll() {
    $(window).scroll(function () {
        if ($(this).scrollTop()) {
            $('#toTop:hidden').stop(true, true).fadeIn();
        } else {
            $('#toTop').stop(true, true).fadeOut();
        }
    });
};
