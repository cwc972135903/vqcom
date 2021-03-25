 
(function($){
	$.fn.sendCode = function(user_options){
			//默认设置
			var default_options = {
				url:"",    //请求地址
				actiontype:0,  //0  发短信给指定手机号   1 发短信给当前登录用户
				voice:true,   //是否有语音
				imgcheck:true, //是否有图形验证码
				checkonly:false, //是否需要验证手机号唯一
				mobileele:"#smobile",
				imgcheckele:"#simgcheckword",
				nodecode:"",
				codeerror:"",
				oldpwd:"",
				checkform:function(){return true;},
				success:function () {},
				refresh:function(){}
			};
			options = jQuery.extend(true,{},default_options,user_options);
			
			var k = {};
			
			//当前选择符
			k.selector = $(this).selector;
			
			//判断是否有多个对象 如选取了多个对象抛出错误，同一页面可以使用多个 但需要分别调用并且建议选择符用id。
			if($(this).length>1){
				$.error('选择对象不能超过一个');
				return false;	
			}
			
			//当前操作对象
			k.self = this;
			k.data = {};
			//支持函数集合
			k.fn = {};
			k.timer;
			
			k.data.postdata = {
				smobile:"",
				simgcheckword:"",
				sendtype:"0",
				checkimg:options.imgcheck,
				checkonly:options.checkonly,
				nodecode:options.nodecode,
				oldpwd:""
			};
			
			k.fn.check=function(){
				if(!options.checkform())
					return false;
				if(0 == options.actiontype){
					if($(options.mobileele).val() == ""){
						k.fn.error($(options.mobileele),"请输入手机号");
						$(options.mobileele).focus();
						return false;
					}
					if(!/^(13[0-9]|15[0-9]|14[7]|17[0-9]|18[0-9])[0-9]{8}$/.test($(options.mobileele).val())){
						k.fn.error($(options.mobileele),"请输入正确的手机号");
						$(options.mobileele).focus();
						return false;
					}
				}
				if(options.imgcheck){
					if($(options.imgcheckele) && $(options.imgcheckele).val() == ""){
						k.fn.error($(options.imgcheckele),"请输入图形验证码");
						$(options.imgcheckele).focus();
						return false;
					}
				}
				return true;
			};
			
			k.fn.error = function(element,msg){
				element.addClass("error");
				if(msg && msg != ""){
					var error = element.parent().find('label.error');
					if (error.length > 0)
						error.html(msg).show();
					else
						element.parent().append("<label for=\""+element.attr("name")+"\" class=\"error\">"+msg+"</label>");
				}
			};
			k.fn.success = function(element,msg){
				element.addClass("success");
				if(msg && msg != ""){
					var success = element.parent().find('label.success');
					if (success.length > 0)
						success.html(msg).show();
					else
						element.parent().append("<label for=\""+element.attr("name")+"\" class=\"success\">"+msg+"</label>");
				}
			};
			k.fn.hiderror = function(){
				if($(k.self).parent().find("label.error"))
					$(k.self).parent().find("label.error").hide();
			}
			
			k.fn.send=function(){
				if(!k.fn.check()){
					return false;
				}
				$(k.self).attr("disabled",true);
                $(k.self).addClass("layui-btn-disabled");

                if(options.url == ""){
					if(0 == options.actiontype)
						options.url="${ctx}/sendmobilecode.json";
					else 
						options.url="${ctx}/sendusercode.json";
				}
					
				$.ajax({
					type: "post",
				  	url: options.url,
				  	data:k.data.postdata,
				 	cache: false,
				  	success: function(data){
				  		if(data.success)
				  		{
				  			k.fn.hiderror();
				  			k.fn.dotimer(data.obj);
                            options.success();
				  			k.fn.success(k.self,"验证码发送成功,请注意查收");
				  		}else{
				  			$(k.self).attr("disabled",false);
                            $(k.self).removeClass("layui-btn-disabled");

                            k.fn.error(k.self,"验证码发送失败,"+data.msg);
				  			options.refresh();
					  	}
				  	},
					error: function(data){
						$(k.self).attr("disabled",false);
                        $(k.self).removeClass("layui-btn-disabled");

                        options.refresh();
						k.fn.error(k.self,"服务器忙，请稍后再试！","友情提醒");
					}
				});
			};
			
			k.fn.sendsms=function(){
				if(0 == options.actiontype)
					k.data.postdata.smobile=$(options.mobileele).val();
				if(options.imgcheck){
					k.data.postdata.simgcheckword=$(options.imgcheckele).val();
				}
				k.data.postdata.oldpwd=$(options.oldpwd).val();
				k.data.postdata.sendtype="0";
				k.fn.send();
			};
			
			k.fn.sendvoice=function(){
				if(0 == options.actiontype)
					k.data.postdata.smobile=$(options.mobileele).val();
				if(options.imgcheck){
					k.data.postdata.simgcheckword=$(options.imgcheckele).val();
				}
				k.data.postdata.sendtype="1";
				k.fn.send();
			};
			
			
			k.fn.dotimer=function(seconds){
				//去掉语音链接
				if(options.voice){
					if($(k.self).parent().find("#voice_link"))
						$(k.self).parent().find("#voice_link").remove();
				}
				k.timer = $.timer.init({
  			        iTimerDelay: 1000, 
  			        iRepeatCount: seconds, 
  			        cRepeatType: 'timeout', 
  			        name: 'my timer'
  			    });
				
				k.timer.addEventListener( 'timer', k.fn.runtimer );
				k.timer.addEventListener( 'timerComplete', k.fn.stoptimer );
				k.timer.start();
			};
			
			k.fn.runtimer=function(){
				$(k.self).attr("disabled",true);
                $(k.self).addClass("layui-btn-disabled");
			    $(k.self).val("重发验证码("+(k.timer.options.iRepeatCount-k.timer.options.iCurrentCount)+")");
                $(k.self).html("重发验证码("+(k.timer.options.iRepeatCount-k.timer.options.iCurrentCount)+")");

            };
			k.fn.stoptimer=function(){
				if(options.voice){
					$(k.self).after("<a id='voice_link' class='blue' href='javascript:void(0);'>&nbsp;&nbsp;语音获取</a>");
				}
				options.refresh();
				$(k.self).attr("disabled",false);
                $(k.self).removeClass("layui-btn-disabled");

                $(k.self).val("重发验证码");
                $(k.self).html("重发验证码");
			};
			
			//初始化
			k.init = function(){
				$(k.self).bind("click",k.fn.sendsms);
				$(k.self).parent().delegate('#voice_link','click',k.fn.sendvoice);
			};
			
			/* 运行 */
			k.init();
		
	}	
	
})(jQuery)