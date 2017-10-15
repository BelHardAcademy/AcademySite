$(document).ready(function() {
	$('#open').click(function(evt) {
		evt.preventDefault();
		$('#login').slideToggle(200);
	}); // end click
	
	$("#authorizationButton").submit(function() { 				//authorization
		var formData = $(this).serialize();
		$.post('',formData,processData).error('Error');
		function processData(data) {
			
		} // end processData
		return false;
	});
	
	$(".registrationButton").submit(function() { 				//registration
		var formData = $(this).serialize();
		$.post('',formData,processData).error('Error');
		function processData(data) {
			if (data==='pass') {
				$('.formwrapper').html('<h1>�� ����������������!</h1>');
				setTimeout(function() {
					$(location).attr('href', "authorization.html");
				}, 300);
			} else {
				$('.formwrapper').html('<h1>��������� ������. ���������� ��� ���.</h1>');
				setTimeout(function() {
					$(location).attr('href', "registration.html");
				}, 300);
			}
		} // end processData
		return false;
	});
}); // end ready
