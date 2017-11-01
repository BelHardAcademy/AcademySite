$("document").ready(function() {
	
        //var api = 'http://192.168.62.5:85/api';
	
	
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
          url: api + '/api/data/courseDirectory',
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
		$(result).each(function(index) {
            $('#reg-form-sel').append('<option value="'+this._id+'">'+this.name+'</option>');
        });
		}

								   //отправка формы
	  
	  $( "#zap" ).on( "submit", function(e) {
       e.preventDefault();
	   var msg  = $(this).serialize();
	   $.ajax({
          url: api + '/api/reqCourse',
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
          url: api + '/api/captcha?width=100&height=50',
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