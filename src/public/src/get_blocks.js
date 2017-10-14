/**
 * Created by StudentTC on 14.01.2017.
 */

/*(function ($) {
    $.fn.get_blocks = function () {
        this.each(function () {
            var div = this;
            var id = div.attr('id');

            alert(1);

        })
    }
})(jQuery);
*/

(function ($) {
    $.fn.get_blocks = function (blockIds) {
        $(blockIds).each(function( index )
        {
            var div = document.createElement("div");
            div.id = blockIds[index];
            //div.innerHTML = i;
            document.body.appendChild(div);

        });
    }
})(jQuery);
