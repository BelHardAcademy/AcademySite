
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
	});

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