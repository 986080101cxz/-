
//尝试创建一个可以执行简单动画的函数
/*
 * 参数：
 * 	obj:要执行动画的对象
 * 	attr:要执行动画的样式，比如：left top width height
 * 	target:执行动画的目标位置
 * 	speed:移动的速度(正数向右移动，负数向左移动)
 *  callback:回调函数，这个函数将会在动画执行完毕以后执行
 */
function move(obj, attr, target, speed, callback) {
	//关闭上一个定时器
	clearInterval(obj.timer);

	//获取元素目前的位置
	var current = parseInt(getStyle(obj, attr));

	//判断速度的正负值
	//如果从0 向 800移动，则speed为正
	//如果从800向0移动，则speed为负
	if(current > target) {
		//此时速度应为负值
		speed = -speed;
	}

	//开启一个定时器，用来执行动画效果
	//向执行动画的对象中添加一个timer属性，用来保存它自己的定时器的标识
	obj.timer = setInterval(function() {

		//获取box1的原来的left值
		var oldValue = parseInt(getStyle(obj, attr));

		//在旧值的基础上增加
		var newValue = oldValue + speed;

		//判断newValue是否大于800
		//从800 向 0移动
		//向左移动时，需要判断newValue是否小于target
		//向右移动时，需要判断newValue是否大于target
		if((speed < 0 && newValue < target) || (speed > 0 && newValue > target)) {
			newValue = target;
		}

		//将新值设置给box1
		obj.style[attr] = newValue + "px";

		//当元素移动到0px时，使其停止执行动画
		if(newValue == target) {
			//达到目标，关闭定时器
			clearInterval(obj.timer);
			//动画执行完毕，调用回调函数
			callback && callback();
		}

	}, 30);
}

/*
 * 定义一个函数，用来获取指定元素的当前的样式
 * 参数：
 * 		obj 要获取样式的元素
 * 		name 要获取的样式名
 */
function getStyle(obj, name) {

	if(window.getComputedStyle) {
		//正常浏览器的方式，具有getComputedStyle()方法
		return getComputedStyle(obj, null)[name];
	} else {
		//IE8的方式，没有getComputedStyle()方法
		return obj.currentStyle[name];
	}

}

//设置imglist宽度
			window.onload = function(){
				var imglist = document.getElementById("imglist");
				//获取所有图片
				var imgArr = document.getElementsByName("pictureChangeImg");
				imglist.style.width = 1200*imgArr.length + "px";
			
				//设置导航按钮居中
				//var navDiv = document.getElementById("navDiv");
				//var outer = document.getElementById("outer");
				//navDiv.style.left = (outer.offsetWidth - navDiv.offsetWidth)/2 + "px";
			
				//创建变量保存显示图片索引
				var index = 0;
				//获取所有a
				var allA = document.getElementsByName("pictureChangeA");
				allA[index].style.backgroundColor = "#808080";
			
				//点哪个导航按钮跳转到哪张图片
				//遍历a   
				for(var i=0; i < allA.length; i++){
					//为每个a添加一个num属性
					allA[i].num = i;
					
						//为所有a绑定单击响应函数 
						allA[i].onclick = function(){
					
						clearInterval(timer);
						//获取超链接索引
						index = this.num;
					
						//切换图片
						//imglist.style.left = -340*index+"px";
					
						setA();
					//使用move函数切换图片
							move(imglist , "left" , -1200*index ,15 , function(){
							autoChange();
							});
						};
					}
				autoChange();
				//创建一个方法设置选中的a
				function setA (){
					//判断当前索引是否为最后一张图片
					if(index >= imgArr.length - 1){
						index = 0;
						//此时显示的是最后一张图片与第一张一样，通过CSS讲最后一张切换为第一张
						imglist.style.left = 0;
					};
					//遍历所有的a，将其背景颜色设置为黑
					for(var i = 0; i <allA.length ; i++){
						allA[i].style.backgroundColor="#000";
					}
					//讲选中的a的背景设置为黄
					allA[index].style.backgroundColor= "#808080";
				};
				
				//创建定时器标识
				var timer;
				//创建一个函数，自动切换图片
				function autoChange(){
					//开启定时器，定时切换图片
					timer = setInterval(function(){
						//使索引自增
						index++;
						index %= imgArr.length;
						move(imglist, "left", -1200*index, 15, function(){
							
							//修改导航按钮
							setA();
						});
					},4000);
				};
			}