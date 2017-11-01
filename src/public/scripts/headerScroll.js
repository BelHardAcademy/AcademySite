var header = document.getElementsByClassName('header');
var headerSourceBottom = header[0].getBoundingClientRect().bottom + window.pageYOffset;

window.onscroll = function() {
    if (header[0].classList.contains('fixed') && window.pageYOffset < headerSourceBottom) {
        header[0].classList.remove('fixed');
    } else if (window.pageYOffset > headerSourceBottom) {
        header[0].classList.add('fixed');
    }
}
