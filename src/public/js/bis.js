$(function() {
	

	
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
		 
		 
		                              // галерея
									  
   function changeImg(){
	var srcImg = ['../img/boy.png','../img/girl.jpg'];
	var elem = $('.img-galery-header');
	var src = elem.attr('src');
	var index = srcImg.indexOf(src);
	   ++index;
		if(index>=srcImg.length){index = 0;}
		elem.attr('src', srcImg[index]);
   };
   
   var timerId = setInterval(changeImg, 6000);
   
	                               //внести курсы в select формы
								   
								   
	function getNameСourse() {
        $.ajax({
          url: api + '/courseDirectory',
          type: "GET",
          dataType : "json",
          success: setNameCouse,
          error: errorFn
      	      
        });
      }
	  
	 getNameСourse();
	 
	  function errorFn(xhr, status, strErr) {
        console.log('Возникла ошибка: ' + xhr.responseCode);
      	
      };
	  
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
		
	
	  
	                            // размер зарплат
								
	
	var interval = 10;							
    var x = 0, y = 0, z = 0;
	
	function increaseSalaryJunior(){
		$('#salary-junior').text(x);
		if(x<300){x+=interval;}
		};
	function increaseSalaryMiddle(){
		$('#salary-middle').text(y);
		if(y<500){y+=interval;}
		};
	function increaseSalarySenior(){
		$('#salary-senior').text(z);
		if(z<1500){z+=interval;}
		};
		
	function goSalary(){
		var timerJunior = setInterval(increaseSalaryJunior, 500);
		var timerMiddle = setInterval(increaseSalaryMiddle, 500);
		var timerSenior = setInterval(increaseSalarySenior, 500);
		};
	
	
		
	$( window ).scroll(function (){
		var win = document.documentElement.clientHeight; 
		var elem = document.body.querySelector('.salary-item');
		var top = elem.getBoundingClientRect().top;
		if(top > 0 && top < win){
			
				goSalary();
				
			};
		});
	
	
	
		                // раскрывающиеся блоки
						
		
	function openBlock(){
		var elem = $(this);
		elem.parent().next('.course-program-item-text').slideDown();
		elem.next('.course-program-cross').html('&#10060;').css('font-size', '18px');
		elem.parent().css({
			'color':'#FFF', 
			'background-color':'#6779ae'
			});
		};
		
	function closeBlock(){
	    var elem = $(this);
	    elem.parent().next('.course-program-item-text').slideUp();
	    elem.next('.course-program-cross').html('&#10010;').css('font-size', '');
		elem.parent().css({
			'color':'', 
			'background-color':''
			});
		};
	
  $('.course-program-e').on('mouseover', openBlock);
  $('.course-program-e').on('mouseout', closeBlock);
});