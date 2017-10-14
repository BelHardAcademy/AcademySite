$(function(){

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
	




});