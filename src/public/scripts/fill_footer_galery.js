/**
 * Created by User on 04.01.2017.
 */

(function ($) {
    $.fn.fill_footer_galery = function (galery_links, galeryElementId) {
        var footer_photogalery = document.getElementById(galeryElementId);
        $(galery_links).each(function( index )
        {

            var div = document.createElement("div");
            div.className = "photogalery-slide-content";

            var img = document.createElement("img");
            
            img.src = getServerIp() + galery_links[index];
            $(div).attr('data-mfp-src', img.src);
            div.appendChild(img);

            footer_photogalery.appendChild(div);
        });
        $('.bh-iframe').magnificPopup({
            type: 'iframe'
        
        });
    

    }
})(jQuery);



