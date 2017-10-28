
$(document).ready(function(){	


	ymaps.ready(function() {
		var myMap = new ymaps.Map('map', {
				center: [53.906552, 27.510278],
				zoom: 16
			}, {
				searchControlProvider: 'yandex#search'
			}),
			myPlacemark = new ymaps.Placemark(myMap.getCenter());
        myMap.geoObjects.add(myPlacemark);
           // Задаём точки мультимаршрута.
           var pointA = [53.906552, 27.510278],
           pointB = "Метро Молодежная, Минск",
           /**
            * Создаем мультимаршрут.
            * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/multiRouter.MultiRoute.xml
            */
           multiRoute = new ymaps.multiRouter.MultiRoute({
               referencePoints: [
                   pointA,
                   pointB
               ],
               params: {
                   //Тип маршрутизации - пешеходная маршрутизация.
                   routingMode: 'pedestrian'
               }
           }, {
               // Автоматически устанавливать границы карты так, чтобы маршрут был виден целиком.
               boundsAutoApply: true
           });
           myMap.geoObjects.add(multiRoute);
   
       
	});
         
            if (!localStorage.getItem('promoVideoSeen')){
                $('#videoContaner').show();
                    
                    $.magnificPopup.open({
                        items: {
                            src: '#videoContaner',
                            type: 'inline',
                            modal: true
                        } 
                        
                        
                    });
                    var vid = localStorage.getItem('promoVideoCur');
                    if ( vid != null) {
                            $('#video1').get(0).currentTime = vid;
                    }
                    $('#video1').get(0).play();
               
                        
                            $('#video1').on('ended', function () {
                                localStorage.setItem('promoVideoSeen', 'ended');
                                $.magnificPopup.close();
                                       });
                                       
                                       $("#video1").on("timeupdate", function(event){
                                        localStorage.setItem('promoVideoCur', this.currentTime );
                                          
                                        });
                                    
                                    
                                    
                                    

                
            }
                
            
        
	VK.Widgets.Group("vk_groups", {mode: 0, width: "400px", height:"400px"}, 62031628);

	(function(d, s, id) {
		var js, fjs = d.getElementsByTagName(s)[0];
		if (d.getElementById(id)) return;
		js = d.createElement(s); js.id = id;
		js.src = "connect.facebook.net/ru_RU/sdk.js#xfbml=1&version=v2.8";
		fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

    var pattern = getJasonObject(api + "/api/page");
    //var galery = pattern.page.footerGallery.links;
    var autoFooter = true;
    var autoHeader = true;
    var intervalFooter = +pattern.page.footerGallery.interval;
    var intervalHeader = +pattern.page.gallery.interval;
    if(intervalFooter == 0)
    {
        autoFooter = false;
    }
    if(intervalHeader == 0)
    {
        autoHeader = false;
    }
    intervalHeader *= 1000;
    intervalFooter *= 1000;

	$('.partner-slider').slick({
		slidesToShow: 3,
     	slidesToScroll: 1,
	});

	/*$('.photogalery-slider').slick({
		slidesToShow: 2,
     	slidesToScroll: 2,
     	autoplay: true,
		autoplaySpeed:2000,
	});*/

	hSlider(autoHeader, intervalHeader);
	function hSlider(ah, ih) {
        $('.header-slider').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            autoplay: ah,
            autoplaySpeed: ih
        });
    }


    $('.photogalery-slider').slick({
        slidesToShow: 2,
        slidesToScroll: 2,
        autoplay: autoFooter,
        autoplaySpeed:intervalFooter,
    });
    $('.slick-track').magnificPopup({
        delegate: 'div',
        type: 'image',
        gallery: {
            enabled: true
        }
    });

    

   

});


function loadView(viewId, container) {
    $.ajax({
        url: api + '/api/view/' + viewId,
        type: "GET",
        dataType : "json",
        success: function(pdata) {
            fillPageHeader(pdata);
            createHGallery(pdata);
            fillMainContent(pdata);
            $.fn.fill_navigation_menu(
                getJasonObject(`${api}/api/menu/${pdata.page.menuId}`)
            );
        },
        error: function() { 
            alert('Page not found!'); //TODO: сделать загрузку спец.страницы
        }
    });

}

function loadPage(pid) {
    var url = api + '/api/page';
    if (pid) url = api + '/api/page' + pid;
    $.ajax({
        url: url,
        type: "GET",
        dataType : "json",
        success: function(pdata) {
            fillPageHeader(pdata);
            createHGallery(pdata);
            fillMainContent(pdata);
            $.fn.fill_navigation_menu(
                getJasonObject(`${api}/api/menu/${pdata.page.menuId}`)
            );
        },
        error: function() { 
            alert('Page not found!'); //TODO: сделать загрузку спец.страницы
        }
    });
}
$(function(){
    
    $("#phone").mask("(999) 999-9999");
  
  
    $("#phone").on("blur", function() {
        var last = $(this).val().substr( $(this).val().indexOf("-") + 1 );
  
        if( last.length == 5 ) {
            var move = $(this).val().substr( $(this).val().indexOf("-") + 1, 1 );
  
            var lastfour = last.substr(1,4);
  
            var first = $(this).val().substr( 0, 9 );
  
            $(this).val( first + move + '-' + lastfour );
        }
    });
  }); 