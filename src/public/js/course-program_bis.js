$(function(){

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
