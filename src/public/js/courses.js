$(function() {
       
  var api = 'http://192.168.62.5:85/api/data';
	var colors = [ {'color':'#4eb1f6'}, {'color':'#c048f7'}, {'color':'#817dff'}, {'color':'#f64670'}];
	var api2 = 'http://192.168.62.5:85/api/block/link/courseDir';
	var api3 = 'http://192.168.62.5:85/api/block/link/whyAcademy';	
	var result = {name:'dff', pictLink:'../img/pm.png'};	                                 //данные курсов 
	  
 function getDataСourseDirectory() {
        $.ajax({
          url: api + '/courseDirectory',
          type: "GET",
          dataType : "json",
          success: successСourseDirectory,
          error: errorFn
        });
      }
 //getDataСourseDirectory();	  
	  
  	  
function successСourseDirectory(result) {
      //console.log(result);
		var elem = $('.block2-item');
		
		 var template  = _.template( $('#courses-id').html() );

		   elem.append(template(result));



			//$('.block2-item-content:last').css('background-color', colors[i].color);
		
};

     
  successСourseDirectory(result);
	
   function errorFn(xhr, status, strErr) {
        console.log('Возникла ошибка: ' + xhr.responseCode);
      	
      };
	  
function getDataPage() {
        $.ajax({
          url: api2,
          type: "GET",
          dataType : "json",
          success: successDataPage,
          error: errorFn
        });
      }	
	  
getDataPage();  

function successDataPage(data){

	};	
	  
});	 