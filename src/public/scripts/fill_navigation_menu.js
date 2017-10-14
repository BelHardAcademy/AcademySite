/**
 * Created by StudentTC on 15.01.2017.
 */


(function ($) {
    $.fn.fill_navigation_menu = function (menu_elements) {
        var menu_ul = document.getElementById("navigation_menu");

        $(menu_elements.menu).each(function( index )
        {

            if(menu_elements.menu[index].need_authorize && localStorage.getItem('login') === null)
            {return false;}

                //var text = '<a href="javascript: loadPage(\'/'+menu_elements.menu[index].link+'\');" >' + menu_elements.menu[index].name + '<a/>';
                var text = '<a href="/'+menu_elements.menu[index].link+'" >' + menu_elements.menu[index].name + '<a/>';
                var li = document.createElement("li");
                li.innerHTML = text;
                // Вырезаем лишний тег <a>
                li.innerHTML = li.innerHTML.substring(0, li.innerHTML.length - 8);
                menu_ul.appendChild(li);

        });
    }
})(jQuery);