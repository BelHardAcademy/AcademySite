$(function() {
	
	
	
var api = 'http://192.168.62.5:85/api/data';
//var api2 = 'http://192.168.62.5:85/api/block/link/courseDir';	




	                            // данные инструкторов
	  
function getDataInstructor() {
        $.ajax({
          url: api + '/instructor',
          type: "GET",
          dataType : "json",
          success: successInstructor,
          error: errorFn
        });
      }
	getDataInstructor();

    function successInstructor(result) {
		var div1 = ('<div class="div_vsb"></div>');
		$('.block3-content').append(div1);
		var template  = _.template( $('#trainers-id').html() );
		$('.block3-content .div_vsb').append(template(result[0]));
		var width = parseInt($('.block3-item').width());
		var widthPage = parseInt($('.wrapper').width());
		var qty = Math.floor(widthPage / width);
		for(var i=1; i<qty; i++){
			var template  = _.template( $('#trainers-id').html() );
			$('.block3-content .div_vsb').append(template(result[i]));
	    };
			
		$('.block3 .link').on('click',function(e){
		e.preventDefault();
		$('.div_vsb').toggleClass('hid');
		if($('.div_hide .block3-item').length == 0){
		  var div_hide = ('<div class="div_hide"></div>');	
		  $('.block3-content').append(div_hide);
		  for(var i=0; i<result.length; i++){
			var template  = _.template( $('#trainers-id').html() );
			$('.block3-content .div_hide').append(template(result[i]));
	      };
		}else{
			$('.div_hide').toggleClass('hid');
		};
		
	   var text = $(this).find('a').text();		
	   $(this).find('a').text( text == '+ Все преподаватели' ? 'Свернуть' : '+ Все преподаватели');

		});	
			
			
			
	}
		
	
      
	   
	   
	   function errorFn(xhr, status, strErr) {
        console.log('Возникла ошибка: ' + xhr.responseCode);
      	
      };

	 	
	
		
});