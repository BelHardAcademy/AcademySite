/**
 * Created by StudentTC on 15.01.2017.
 */
function change_photo(interval, images_links) {
    var i = 0;
    var timerId = setInterval(function() {
        var header_image = document.getElementById("header_photogalery");
        header_image.src = images_links[i];
        i++;
        if(i >= images_links.length)
        {
            i = 0;
        }
    }, interval);
}
// начать повторы с интервалом 2 сек
var links = ["http://192.168.41.21:85/files/footer_gallery/5.jpg", "http://192.168.41.21:85/files/footer_gallery/4.jpg",
    "http://192.168.41.21:85/files/footer_gallery/1.jpg"];
alert(1);

change_photo(5000, links);

