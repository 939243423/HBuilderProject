//获得兼容不同浏览器的样式  带单位 是字符串
			function getStyle(obj,name){
				if(window.getComputedStyle){
					return getComputedStyle(obj,null)[name];
				}else{
					return obj.currentStyle[name];
				}

			}
			
			
			//var timer;//全局变量
			//speed 正数 向右   负数向左
			//callback 回调函数
			//target 目标位置
			//obj 对象
			//attr  传入的样式属性值
			function move(obj,target,speed,attr,callback){
				
				//获取当前位置 决定speed的正负  从而决定 它的唯一方向
				var currentstyle=parseInt(getStyle(obj,attr));
				if(currentstyle>target){
					speed=-speed;
				} 
				
					clearInterval(obj.timer);//开启当次的时候关掉上一次的
					//这里使用obj.timer   不使用 变量obj 的原因是为了分离开各自的timer 如果定义全局变量  
					//后面的会将前面的定时器关掉
					 obj.timer=setInterval(function(){
						
						//box1.style.left=box1.offsetLeft+10+"px";
						//这里不用offsetleft的原因是  它的实用性不强  不便于修改维护
				 		var oldValue = parseInt(getStyle(obj,attr));
				 		var newValue = oldValue + speed;
				 		//800-0  0-800
				 		
				 		if(newValue<target&&speed<0||newValue>target&&speed>0){
				 			newValue=target;
				 		}//这里是为了让块归位  如果超过目标位置 则等于target
//				 		if(newValue>800){
//						newValue=800;
//					}

				 		obj.style[attr]= newValue + "px";//这里传attr变量  采用[attr]  属性值
				 		if(newValue==target){
				 			clearInterval(obj.timer);
				 			callback&&callback();
				 		}
					},30); 
				}