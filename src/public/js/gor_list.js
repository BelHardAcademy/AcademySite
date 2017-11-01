(function($){
	
	$.fn.gor_list = function (api, options, moduleIds){
		
	  this.each(function(){
		  
		var div = $(this);
		var id = div.attr('id');
	    var idTemplate = div.attr('data-type');
	    var template = {};
			
	        /*for(var i=0; i<moduleIds.length; i++) {
	
			var divElem = $('<div></div>')
					  .attr('id',moduleIds[i]);
					  
			if(options.fill.type == 'margin'){
				 divElem.css('margin', options.fill.data);
			}
			if(options.fill.type == 'empty'){
				 divElem.css('margin', '');
			}
			if(options.fill.type == 'link'){
				divElem.insertAfter(
				$('<div></div>')
				.html(options.fill.data) 
						  );
			}	 	
			div.append(divElem);
			
			
			//getDataItem(moduleIds[i]);
		}*/
			
		if(options.details.state == 'on'){
			var linkButton = $('<a class="gray" href="javascript:void();">'+ options.details.label + '</a>');
			
			div.append($('<div class="link link_open-block"></div>').append(linkButton));
			
	
		
			if(options.details.type == 'link'){
				linkButton.attr('href', options.details.data);
			};
			
			if(options.details.type == 'extra-block'){
				//linkButton.on('click', function() { renderList(options, moduleIds);});
			};
		};
		renderList(options, moduleIds);
			
    			
	function renderList(option, moduleIds) {
		var div_vsb = $('<div class="div_vsb"></div>');
		           
		var div_hide = $('<div class="div_hide"></div>');
		div.prepend(div_hide);	
		div.prepend(div_vsb);
		
		
				

		             
		template  = _.template( $('#' + idTemplate ).html() );
		div_vsb.append('<div class="inline gor_list_item" id="'+moduleIds[0]+'"></div>');
		getDataItem(moduleIds[0], function (data) {
			var id = data.module._id;
			var elem = $('#'+id);
			elem.html(template(data.module));

			var width = parseInt($('#' + moduleIds[0]).children('div').first().width());
			var widthPage = parseInt($('.wrapper').width());
			var qty = Math.floor(widthPage / width);
			for(var i=1; i<qty; i++){
			   getDataItem(moduleIds[i], function (data) {
					div_vsb.append($('<div class="inline" id="'+moduleIds[0]+'"></div>').append(template(data.module)));

				});
			};
	    });
			
	}
		
	
	$('.link_open-block').on('click',function(e){
		//e.preventDefault();
		var div_vsb = div.find('div.div_vsb');
        var div_hide = div.find('div.div_hide');
		div_vsb.toggleClass('hid');
		//alert(div_hide.find('.gor_list_item').length);
		if(div_hide.children('.block2-item').length == 0){
		  for(var i=0; i<moduleIds.length; i++){
				getDataItem(moduleIds[i], function (data) {
					div_hide.append($('<div class="inline gor_list_item" id="'+moduleIds[0]+'"></div>').append(template(data.module)));
				});
			//div_hide.append(template(moduleIds[i]));
	      };
		}else{
			div_hide.toggleClass('hid');
		};
		
	   var text = $(this).find('a').text();		
	   $(this).find('a').text( text == '+ Все преподаватели' ? 'Свернуть' : '+ Все преподаватели');

	});		
		
			
	//function openBlock(sel){
		//$(sel).toggleClass('hid');
	    //$(this).find('a').text( text==options.details.label ? '+ Свернуть' : options.details.label);
		//return false;
	//}
		
	function getDataItem(id, okfunc) {
			$.ajax({
			  url: api + '/module/' + id,
			  type: "GET",
			  dataType : "json",
			  success: okfunc,
			  error: errorFn
			});
		  }	
	
	
	function successDataItem(data){
		var id = data.module._id;
		var elem = $('#'+id);
		elem.html(data.module.html);
	   };
	   
    function errorFn(xhr, status, strErr) {
			console.log('Возникла ошибка: ' + xhr.responseCode);
			
	   };
	   
});

}
	
})(jQuery);