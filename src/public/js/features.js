$(function() {
	
   var api = 'http://192.168.62.5:85/api/data';
   
   function getDataWhyus() {
        $.ajax({
          url: api + '/whyus',
          type: "GET",
          dataType : "json",
          success: successWhyus,
          error: errorFn
        });
      }
	getDataWhyus();
	
	function successWhyus(result) {
		console.log(result);
		//for(var i=0; i<result.length; i++){
			//var template  = _.template( $('#trainers-id').html() );
			//$('.block3-content').append(template(result[i]));
			//if(i>2){
				//$('.block3-item:last').addClass('hid');
				//}
			//}
			}
	
	 
	   function errorFn(xhr, status, strErr) {
        console.log('Возникла ошибка: ' + xhr.responseCode);
      	
      };
	
	$('.block4 .link').on('click',function(e){
		e.preventDefault(); 
		$('.block4-item-content:gt(4)').toggleClass('hid');
		var text = $('.block4 a').text();
		$('.block4 a').text( text=='+ Подробнее...' ? '+ Свернуть' : '+ Подробнее...');
		});
	
	});