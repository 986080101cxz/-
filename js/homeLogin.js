$(function(){
	$('#login-button').click(function(event){
	event.preventDefault();
	$('form').fadeOut(500);
	$('.wrapper').addClass('form-success');
	
});
	$('#login-button').click(function(){
		var count=5;
		count--;
		createjs.Ticker.setFPS(1);
		createjs.Ticker.addEventListener("tick",tick);
		function tick(e){
		count--;
			if(count==0){
				location="index2.html"
			}
		}
	})
})

