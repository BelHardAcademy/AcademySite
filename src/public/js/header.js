$("document").ready(function() {
	
        var api = 'http://7.140.158.178:85/api';
	
	
		        //кнопка вертиального меню
	 
	 $('.menu-open').on('click',function(){
		$('.nav').toggleClass('menu-vertical');
		});
		
		          // фиксация горизонтального меню 
			 
	function fixingMenu() {
	 var hHght = 60,
	     hMrg = 0;
	var top = $(this).scrollTop();
	var elem = $('.nav');
	if (top+hMrg < hHght){
		 elem.css('top', (hHght-top));
	   }else{
		 elem.css('top', hMrg);  
		   }
}
		$( window ).scroll(fixingMenu);
	     fixingMenu();
		 
	

	                               //внести курсы в select формы
								   
								   
	function getNameСourse() {
        $.ajax({
          url: api + '/courseDirectory',
          type: "GET",
          dataType : "json",
          success: setNameCouse,
          error: function errorFn(xhr, status, strErr) {
          console.log("There was an error!");
      	       }
        });
      }
	  
	 getNameСourse();
	  
      function setNameCouse(result) {
		$('option').each(function(index) {
            $(this).text(result[index].name).attr('value', result[index].id);
        });
		}
		
		
								   
								   //отправка формы
	  
	  $( "#zap" ).on( "submit", function(e) {
       e.preventDefault();
	   var msg  = $(this).serialize();
	   $.ajax({
          url: api + '/reqCourse',
          type: "POST",
          data : msg,
          success : function(data){
			  console.log(data)
		  },
          error:  function(xhr, str){
	        console.log('Возникла ошибка: ' + xhr.responseCode);
		  }
	   });
   
      });
	  
	  
	                           //капча
  
function getCaptcha	(){
	  $.ajax({
          url: api + '/captcha?width=100&height=50&len=8',
          type: "GET",
          dataType : "json",
          success:  function (data) {
			  $('#capt').html('<img src="'+data.data+'">');
			  }
         });
	};
	getCaptcha();	
	
	$('#update-capcha').on('click', function(){
		getCaptcha();
		});
	
});	