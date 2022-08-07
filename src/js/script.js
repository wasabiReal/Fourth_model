$(document).ready(function(){
    $('.slider').slick({
        arrows: false,
        dots: true,
        autoplay:true,
        autoplaySpeed: 10000,
        fade: true,
        speed: 600,
        infinite: true,
        cssEase: 'ease-in-out',
        touchThreshold: 300
    });
});
$(document).ready(function(){
    $('.slider__course').slick({
        arrows: false,
        dots: true,
        slidesToShow: 2,
        autoplay:true,
        autoplaySpeed: 10000,
        speed: 600,
        infinite: true,
        cssEase: 'ease-in-out',
        touchThreshold: 300,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    touchThreshold: 100,
                }
            }
        ]
    });
});
function burger(){
    if (document.getElementById("mlinks").style.display == 'none'){
        document.getElementById("mlinks").style.display = 'block';
    }
    else {
        document.getElementById("mlinks").style.display = 'none';
    }
    console.log(document.getElementById("mlinks").style.display == 'none');
}