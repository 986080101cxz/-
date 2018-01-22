$(function(){
	$(".foreign").hide();
	$("#chinese").click(function(){
		$("#chinese").css("background-image","img/witer_type.png");
		
		$(".foreign").hide();
		$(".chinese").show();
	})
	$("#foreign").click(function(){
		$("#chinese").css("background-image","img/witer_type2.png");
		$("#foreign").css("background-image","img/witer_type.png");
		$(".chinese").hide();
		$(".foreign").show();
	})
})



