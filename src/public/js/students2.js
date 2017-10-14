$("document").ready(function() {
       //getDataStudents(); 
      });
	  
var api = 'http://7.140.158.178:85/api';
var apiImg = 'http://7.140.158.178:85';

var dataStudents = [{'userPictLink' : "../img/cat2.jpg", 'userName' : 'Светлана Волкова', 'userAbout' : 'Бухгалтер', 'body' : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'},
  {'userPictLink' : "../img/cat3.jpg", 'userName' : 'Артем Иванов', 'userAbout' : 'Директор', 'body' : 'Pellentesque habitant morbi tristique senectus'},
  {'userPictLink' : "../img/girl.png", 'userName' : 'Ирина Сергеевна', 'userAbout' : 'Парикмахер', 'body' : 'Aenean in convallis purus, blandit auctor nulla'},
  {'userPictLink' : "../img/horse.jpg", 'userName' : 'Федор Двинятин', 'userAbout' : 'Таксист', 'body' : 'ectus convallis ullamcorper. Sed ac ultrices quam.'}, 
  {'userPictLink' : "../img/dog.jpg", 'userName' : 'Екатерина Андреевна', 'userAbout' : 'Продавец', 'body' : 'Morbi vel blandit diam, et gravida eros. '}];
 // var dataStudents = [];

/*                                    // получить данные студентов

function getDataStudents() {
        $.ajax({
          url: api + '/courseComment',
          type: "GET",
          dataType : "json",
          success: setDataStudents,
          error: errorFn
      	     });
      }*/
	  
function setDataStudents(result){
	  dataStudents = result.slice();
	               } 
				   
function renderSliderStudents(arr){
	for(var i=0; i<2; i++){
		var template  = _.template( $('#students-id').html() );
			$('.block6-content').append(template(arr[i]));  
		  };
	}
				   
	renderSliderStudents(dataStudents);			    

function errorFn(xhr, status, strErr) {
        console.log('Возникла ошибка: ' + xhr.responseCode);
      	
      };
	  
	                                //слайдер
									
	function removeItem(){
		$('.block6-item').remove();
		};								
									

	function prevSlideStudents(){
		var a = dataStudents.splice(0, 2);
	    dataStudents = dataStudents.concat(a);
		removeItem();
		renderSliderStudents(dataStudents);
		};
		
	function nextSlideStudents(){
		var a = dataStudents.splice(dataStudents.length-2);
		dataStudents = a.concat(dataStudents);
		removeItem();
		renderSliderStudents(dataStudents);
		}	 
		 
	 $(".block6-sw-left").on("click", prevSlideStudents);
	 $(".block6-sw-right").on("click", nextSlideStudents);
	 
	 
	 
