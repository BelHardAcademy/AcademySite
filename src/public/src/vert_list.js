(function($){

    $.fn.vert_list = function (api, options, moduleIds){
        this.each(function(){

            var id = $(this).attr('id');

            var div = $('<div>');
            $(this).append(div);


            var div_vsb = $('<div class="div_vsb"></div>');
            var div_hide = $('<div class="div_hide"></div>');
            var cont = $('<div class="vlist-cont"></div>')
			cont.append(div_vsb).append(div_hide);
            div.append(cont);
            if (options["back-img"]) {
                var bi = options["back-img"];
                cont.css('padding-right', '40%');
                cont.css('background','url('+bi+') no-repeat right top');

                var img = new Image();
                img.src = bi;
                img.onload = function() {
                    cont.css('min-height', img.naturalHeight);
                    loadModulesData();
                }
            } else loadModulesData();


            function loadModulesData() {
                getDataItem(moduleIds[0], function (data) {
                    var template = _.template(data.module.html);
                    div_vsb.append($('<div class="vert_list_item" id="' + moduleIds[0] + '"></div>').append(template(data.module)));
                    var h = $('#' + moduleIds[0] + ' .block2-item').outerHeight();
                    var hPage = cont.height();
                    var qty = Math.floor(hPage / h);
                    for (var i = 1; i < qty; i++) {
                        getDataItem(moduleIds[i], function (data) {
                            var template = _.template(data.module.html);
                            div_vsb.append($('<div id="' + moduleIds[i] + '"></div>')
                                .append(template(data.module)));

                        });
                    }
                    if (qty < moduleIds.length) {
                        createButton();
                    }
                });
            }

            function createButton(){
                if(options.details.state == 'on'){
                    var linkButton = $('<a class="gray" href="javascript:void()">'+ options.details.label + '</a>');
                    cont.append($('<div class="vert-link link link_open-block"></div>').append(linkButton));
                }
                if(options.details.type == 'link'){
                    linkButton.attr('href', options.details.data);
                }
                if(options.details.type == 'extra-block'){
                    linkButton.on('click', function() { renderListAll(options, moduleIds);});
                }
            }

            function renderListAll(options, moduleIds){
                div_vsb.toggleClass('hid');

                if(div_hide.children('.vert_list_item').length == 0){
                    for(var i=0; i<moduleIds.length; i++){
                        getDataItem(moduleIds[i], function (data) {
                            var template  = _.template(data.module.html);
                            div_hide.append($('<div class="vert_list_item" id="'+moduleIds[0]+'"></div>').append(template(data.module)));
                        });
                    }
                }else{
                    div_hide.toggleClass('hid');
                }

                var text = $('.link_open-block>a').text();
                $('.link_open-block>a').text( text == options.details.label ? 'Свернуть' : options.details.label);

                return false;
            }

            function getDataItem(id,okfunc) {
                $.ajax({
                    url: api + '/api/module/' + id,
                    type: "GET",
                    dataType : "json",
                    success: okfunc,
                    error: errorFn
                });
            }

            function errorFn(xhr, status, strErr) {
                console.log('Возникла ошибка: ' + xhr.responseCode);
            }
        });
    }
})(jQuery);