/**
 * Created by StudentTC on 14.01.2017.
 */

(function ($) {
    $.fn.get_blocks = function (blockIds) {
        var rootElement = this;
        $(blockIds).each(function( index )
        {
            var div = document.createElement("div");
            div.id = blockIds[index];
            if(index % 2 != 0)
            {
                div.classList.add("dark-div");
            }
            else
                div.classList.add("light-div");
            div.classList.add('block-container');
            //div.text = "div created by get_blocks function";
            rootElement.append(div);
            $(div).create_block(api);
        });
    }
})(jQuery);
