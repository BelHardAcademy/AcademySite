$(function() {
	
	var api = 'http://7.140.158.178:85/api';
var apiImg = 'http://7.140.158.178:85';
//var dataClients = [];
var dataClients = ["../img/velcom.png", "../img/lepo.png", "../img/belgaz.png", "../img/atom.png", "../img/velcom.png", "../img/lepo.png"];

/*                                    // получить данные клиентов

function getDataClients() {
        $.ajax({
          url: api + '/corpClients',
          type: "GET",
          dataType : "json",
          success: setDataClients,
          error: errorFn
      	     });
      }*/
//getDataClients();
function errorFn(xhr, status, strErr) {
        console.log('Возникла ошибка: ' + xhr.responseCode);
      	
      };
	  
	  
function setDataClients(result){
	  dataClients = result.slice();
	               } 
	
var x = 0;			   
				   
function renderSliderClients(arr){
	$('.block7-item').each(function(i) {
		$(this).find('.logo-block7').attr('src', arr[i+x]);
	
		});
	};
	
renderSliderClients(dataClients);

  
	                                //слайдер

	function nextSlideClients(){
	  var a = dataClients.splice(dataClients.length-1);
		dataClients = a.concat(dataClients);
		renderSliderClients(dataClients);
				};
		
	function prevSlideClients(){
		var a = dataClients.splice(0, 1);
	    dataClients = dataClients.concat(a);
		renderSliderClients(dataClients);
		}	 
		 
	 $(".block7-sw-left").on("click", prevSlideClients);
	 $(".block7-sw-right").on("click", nextSlideClients);
	
        
	VK.Widgets.Group("vk_groups", {mode: 3, width: "320",  height: "400", color2: '666666', color3: '264796'}, 20003922);	
		
      });