$(function() {
     // getActiveСourse();  
		
     
	  
	var api = 'http://7.140.158.178:85/api';
	var apiImg = 'http://7.140.158.178:85';
	
  function errorFn(xhr, status, strErr) {
        console.log('Возникла ошибка: ' + xhr.responseCode);
      	
      };
	  
	                 //ближайшие курсы
					 
	function getActiveСourse() {
        $.ajax({
          url: api + '/whyus',
          type: "GET",
          dataType : "json",
          success: setActiveCourse,
          error: errorFn
        });
      }
	  
 var dataStart = [
 {'cost':'400', 'duration':'40 ак. ч.', 'subname':'начальный', 'name':'Бизнесс-анализ', 'date':'5 марта'},
 {'cost':'600', 'duration':'50 ак. ч.', 'subname':'продвинутый', 'name':'Управление проектами','date':'6 февраля'},
 {'cost':'500', 'duration':'60 ак. ч.', 'subname':'начальный', 'name':'Программирование','date':'10 октября'},
 {'cost':'300', 'duration':'30 ак. ч.', 'subname':'продвинутый', 'name':'Тестирование','date':'7 января'}
 ];
	  
	  function renderActiveCourse(result) {
		//console.log(result);
	  for(var i=0; i<3; i++){
		var template  = _.template( $('#start-id').html() );
			$('.block5-content').append(template(result[i]));  
		  };
     }
		
		renderActiveCourse(dataStart);
		
	function removeItem(){
		$('.block5-item').remove();
		};
		
		                          //слайдер
								  
								  
		
	function prevSlideStart(){
		var a = dataStart.splice(0, 1);
	    dataStart = dataStart.concat(a);
		removeItem();
		renderActiveCourse(dataStart);
		};
		
	function nextSlideStart(){
		var a = dataStart.splice(dataStart.length-1);
		dataStart = a.concat(dataStart);
		removeItem();
		renderActiveCourse(dataStart);
		}	 
		 
	 $(".block5-sw-left").on("click", prevSlideStart);
	 $(".block5-sw-right").on("click", nextSlideStart);
	 
		
	 });