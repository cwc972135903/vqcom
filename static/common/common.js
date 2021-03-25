/**
 * 取10位随机数
 * @param len
 * @returns {number}
 */
function getMath(len){
	if (!len)
		len = 10;
	var num=0;
	for (var int = 0; int < len; int++) {
		num += Math.floor(Math.random() * 10);
	}
	return num;
}

function number4(obj){
	if(obj.value=="")
		return;
	obj.value=obj.value.replace(/[^0-9\.]/g,'');
	if (!/^\d+\.{0,1}\d{0,4}$/g.test(obj.value) ) {
		obj.value=obj.value.substring(0,obj.value.length-1);
	};
}
function Countdown(time_start,time_end){
	var time_distance = time_end - time_start; 
	if (time_distance > 0) {
		// 天时分秒换算
		var int_day = Math.floor(time_distance / 86400000)
		time_distance -= int_day * 86400000;

		var int_hour = Math.floor(time_distance / 3600000)
		time_distance -= int_hour * 3600000;

		var int_minute = Math.floor(time_distance / 60000)
		time_distance -= int_minute * 60000;

		var int_second = Math.floor(time_distance / 1000)
		// 时分秒为单数时、前面加零
		if (int_day < 10) {
			int_day = "0" + int_day;
		}
		if (int_hour < 10) {
			int_hour = "0" + int_hour;
		}
		if (int_minute < 10) {
			int_minute = "0" + int_minute;
		}
		if (int_second < 10) {
			int_second = "0" + int_second;
		}
		return new Array(int_day,int_hour,int_minute,int_second);
	}else{
		return new Array("00","00","00","00");
	}
}

function dateToDate(date) {
    var sDate = new Date();
    if (typeof date == 'object'
      && typeof new Date().getMonth == "function"
      ) {
      sDate = date;
    }
    else if (typeof date == "string") {
      var arr = date.split('-')
      if (arr.length == 3) {
        sDate = new Date(arr[0] + '-' + arr[1] + '-' + arr[2]);
      }
    }

    return sDate;
  }


  function addMonth(date, num) {
    num = parseInt(num);
    var sDate = dateToDate(date);

    var sYear = sDate.getFullYear();
    var sMonth = sDate.getMonth();
    var sDay = sDate.getDate();

    var eYear = sYear;
    var eMonth = sMonth + num;
    var eDay = sDay;
    while (eMonth > 12) {
      eYear++;
      eMonth -= 12;
    }

    var eDate = new Date(eYear, eMonth, eDay);

    while (eDate.getMonth() != eMonth) {
      eDay--;
      eDate = new Date(eYear, eMonth, eDay);
    }

    //return eDate.getFullYear()+"-"+eDate.getMonth()+"-"+eDate.getDate();
    return eDate.format("yyyy-MM-dd");
  }
  
  
function initSort(s){ 
	if(s)
	{
		var ss=s.split(':');
		if(ss.length!=2)
			return
	}
	var field=	ss[0];
	var cls= (ss[1].trim()=="DESC"?'icon-xiangxiapaixu':'icon-jiagepaixu');
	var xx= (ss[1].trim()=="DESC"?'&#xe657;':'&#xe658;');
	$('th[data-sort]').each(function(){
		var p=$(this);
		p.css('cursor','pointer');
		p.css('color','#a11212');
		p.click(function(){
			var a=$(this).data('sort');
			var dir=$(this).data('dir');
			if(dir=="asc"||dir=="desc")
				dir+="_";
			else
				dir="asc_";
			var c=$(this).children('i');
			if(c.hasClass('icon-xiangxiapaixu'))
				dir="asc_";
			else
				if(c.hasClass('icon-jiagepaixu'))
					dir="desc_";
			$("#mainForm").find('input[name=sort]').remove();
			$("#mainForm").append("<input name='sort' type='hidden' value='"+dir+a+"' /> ");
			$("#mainForm").submit();
		});
		if(field==p.data('sort')){
			var c=p.children('i');
			c.addClass(cls);
	// c.html(xx);
			$("#mainForm").append("<input name='sort' type='hidden' value='"+ss[1].toLowerCase().trim()+"_"+ss[0]+"' /> ");
		}
	});
	
	
}
function j_id(s){
	return "#"+s.replace(".","\\.");
}
function singForm(f){
	 $("#forformsubmit").append(f); 
	
	 $('#forformsubmit form').submit(); 
	 setTimeout(function(){
		 easyDialog.open({
			  container : {
			    content : '<img  width="160" hegiht="120" src="'+g_ctx+'/common/images/loading.gif"/>'
			  },
			 // autoClose : 2000
			});
	 }, 0);
	
	 
}
/**
 * 格式化数字
 * 
 * @param num
 *            需要格式化的数字
 * @param pattern
 *            需要格式化的位数2位就0.00 4位就0.0000
 * @returns
 */
function fmt(num, pattern) {
		if (!isNaN(num)) {
			if (num > 0) {
					// if(pattern.lengh<4)
						num = num + 0.000001;
			}
			if (num < 0) {
				// if(pattern.lengh<4)
					num = num - 0.000001;
			}
			var strarr = num ? parseFloat(num).toFixed(20).toString().split('.')
					: [ '0' ];
			var fmtarr = pattern ? pattern.split('.') : [ '' ];
			var retstr = '';
			// 整数部分
			var str = strarr[0];
			var fmt = fmtarr[0];
			var i = str.length - 1;
			var comma = false;
			for ( var f = fmt.length - 1; f >= 0; f--) {
				switch (fmt.substr(f, 1)) {
				case '#':
					if (i >= 0)
						retstr = str.substr(i--, 1) + retstr;
					break;
				case '0':
					if (i >= 0)
						retstr = str.substr(i--, 1) + retstr;
					else
						retstr = '0' + retstr;
					break;
				case ',':
					comma = true;
					retstr = ',' + retstr;
					break;
				}
			}
			if (i >= 0) {
				if (comma) {
					var l = str.length;
					for (; i >= 0; i--) {
						retstr = str.substr(i, 1) + retstr;
						if (i > 0 && ((l - i) % 3) == 0)
							retstr = ',' + retstr;
					}
				} else
					retstr = str.substr(0, i + 1) + retstr;
			}
			retstr = retstr + '.';
			// 处理小数部分
			str = strarr.length > 1 ? strarr[1].replace(/0+$/, '') : '';
			fmt = fmtarr.length > 1 ? fmtarr[1] : '';
			i = 0;
			for ( var f = 0; f < fmt.length; f++) {
				switch (fmt.substr(f, 1)) {
				case '#':
					if (i < str.length)
						retstr += str.substr(i++, 1);
					break;
				case '0':
					if (i < str.length)
						retstr += str.substr(i++, 1);
					else
						retstr += '0';
					break;
				}
			}
			return retstr.replace(/^,+/, '').replace(/\.$/, '');
		} else {
			return "";
		}
	}
/*
 * ---------------------------------------------------------------------------------------------
 * 功能： str to object
 * ---------------------------------------------------------------------------------------------
 */
function str2obj(str){
	return eval("(" + str+ ")");
}

/*
 * ---------------------------------------------------------------------------------------------
 * 功能： object to str
 * ---------------------------------------------------------------------------------------------
 */
function obj2str(o){   
     var r = [];   
     if(typeof o =="string") return "\""+o.replace(/([\'\"\\])/g,"\\$1").replace(/(\n)/g,"\\n").replace(/(\r)/g,"\\r").replace(/(\t)/g,"\\t")+"\"";   
     if(typeof o =="undefined") return "";   
     if(typeof o == "object"){   
         if(o===null) return "null";   
         else if(!o.sort){   
             for(var i in o)   
                  r.push(i+":"+obj2str(o[i]))   
              r="{"+r.join()+"}"  
          }else{   
             for(var i =0;i<o.length;i++)   
                  r.push(obj2str(o[i]))   
              r="["+r.join()+"]"  
          }   
         return r;   
      }   
     return o.toString();   
}

/*
 * ---------------------------------------------------------------------------------------------
 * 功能： 判断是否为闰年 参数： year(被判断的年份) 返回： 判断结果 创建时间：2011-2-18
 * ---------------------------------------------------------------------------------------------
 */
function isLeapYear(year) { 
	return ((year%4 == 0 && year%100 != 0) || (year%400 == 0));
}

/*
 * ---------------------------------------------------------------------------------------------
 * 功能： 判断字符串是否为空 参数： str 返回： 判断结果 创建时间：2014-11-01
 * ---------------------------------------------------------------------------------------------
 */
function isNull(val) { 
return (val == undefined || val == '' || val == null);
}


/*
 * ---------------------------------------------------------------------------------------------
 * 功能： 去掉前后空格和&nbsp; 参数： str(原字符串) 返回： 去掉前后空格和&nbsp;后的str字符串 创建时间：2011-2-18
 * ---------------------------------------------------------------------------------------------
 */
function trim(str) {
    if (str == null) {
        return str;
    }
    var i;
    var beginIndex = 0;
    var endIndex = str.length - 1;

    for (i=0; i<str.length; i++) {
        if (str.charAt(i) == ' ' || str.charAt(i) == '　') {
            beginIndex++;
        } else {
            break;
        }
    }
    for (i = str.length - 1; i >= 0; i--) {
        if (str.charAt(i) == ' ' || str.charAt(i) == '　') {
            endIndex--;
        } else {
            break;
        }
    }

    if (endIndex < beginIndex) {
        return "";
    }

    return str.substr(beginIndex, endIndex + 1);
}

/*
 * ---------------------------------------------------------------------------------------------
 * 功能： 获取当前日期，格式为（yyyy-mm-dd） 参数: 无 返回： 当天日期的字符串 创建时间：2011-2-18
 * ---------------------------------------------------------------------------------------------
 */
function newDate() {
	var date = new Date();	
	var year = date.getYear();
	var month = date.getMonth() +1 ;
	var day = date.getDate();
		
	if(month < 10)
		month = "0" + month
		
	if(day < 10)
		day = "0" + day
	
	return year + "-" + month + "-" + day;
}

/*----------
	功能：    获取当前日期的前day天的时间
	参数:    无
	返回：    当天日期的字符串
	创建时间：2011-2-18
	
-----	*/
function getDateBeforeToday(day)
{
   var   iDate   =   new   Date();  
   iDate.setDate(parseInt(iDate.getDate().toString())-day);  
   var   year   =   iDate.getYear().toString();        
   var   Month   =   parseInt(iDate.getMonth().toString())+1;  
   var   aDate   =   iDate.getDate().toString();          
   if(parseInt(Month)   <=   9)  
          Month   ="0"+Month;  
   if(parseInt(aDate)   <=   9)  
          aDate   ="0"+aDate;  
   var   value   =   year+"-"+Month+"-"+aDate;  
   return   value;  
}


/*----------
	功能：    获取当前日期的前day天的时间
	参数:    无
	返回：    当天日期的字符串
	创建时间：2011-2-18
	
-----	*/
function getDateAfterToday(day)
{
   var   iDate   =   new   Date();  
   iDate.setDate(parseInt(iDate.getDate().toString())+day);  
   var   year   =   iDate.getYear().toString();        
   var   Month   =   parseInt(iDate.getMonth().toString())+1;  
   var   aDate   =   iDate.getDate().toString();          
   if(parseInt(Month)   <=   9)  
          Month   ="0"+Month;  
   if(parseInt(aDate)   <=   9)  
          aDate   ="0"+aDate;  
   var   value   =    year+"-"+Month+"-"+aDate;  
   return   value;  
}


// day 为负数..则为前day天
// day 为正..为后day天
function getDateBeforeDate(date,day)
{
   var tmpArr=date.split("-");
   var   iDate   =   new   Date(tmpArr[0],(tmpArr[1]-1),tmpArr[2]);  
   iDate.setDate(parseInt(iDate.getDate().toString())+day);  
   var   year   =   iDate.getYear().toString();        
   var   Month   =   parseInt(iDate.getMonth().toString())+1;  
   var   aDate   =   iDate.getDate().toString();          
   if(parseInt(Month)   <=   9)  
          Month   ="0"+Month;  
   if(parseInt(aDate)   <=   9)  
          aDate   ="0"+aDate;  
   var   value   =   year+"-"+Month+"-"+aDate;  
   return   value;  
}



/*
 * ---------------------------------------------------------------------------------------------
 * 功能： 检查字文本录入对象值是否为空(去掉空格) 参数: _str(检验的字符串) 返回： 如果文本录入对象值为空,返回true,否;返回false
 * 创建时间：2011-2-18
 * ---------------------------------------------------------------------------------------------
 */
function isEmpty(_str) {
	return (_str == "" || trim(_str).length == 0 || _str == " ");		
}

/*
 * ---------------------------------------------------------------------------------------------
 * 功能： 检查字文本录入对象值是否为空(去掉空格) 参数: _obj(检验的文本录入对象), errMsg(需要提示的信息) 返回：
 * 如果文本录入对象值为空,返回true,否;返回false 创建时间：2011-2-18
 * ---------------------------------------------------------------------------------------------
 */
function isObjEmpty(_obj, errMsg) {
	if (_obj == null || trim(_obj.value).length == 0) {
		_obj.select();
		alert(errMsg);
		return true;
	}
	else
        return false;
}

/*
 * ---------------------------------------------------------------------------------------------
 * 功能： 检查文本录入对象值是否为整数型值 参数: 参数: _str(检验的字符串) 返回：
 * 如果文本录入对象值为空或全部为数字,返回true;否,返回false 创建时间：2011-2-18
 * ---------------------------------------------------------------------------------------------
 */
function isInt(_str) {
    return (_str == "" || (/^(\-?)(\d+)$/.test(_str)));
}

function isInt2(_str) {
    return (_str == "" || (/^[1-9]\d*$/.test(_str)));
}

function isInt3(_str) {
    return (_str == "" || (/^(0|[1-9]\d*)$/.test(_str)));
}

function onlyInt(obj) {
	 if (!isInt2(obj.value))
	 {
		 obj.value=obj.value.replace(/[^\d]/g,'');
		 alert("必须为正整数");
	 }
}

/*
 * ---------------------------------------------------------------------------------------------
 * 功能： 检查文本录入对象值是否为整数型值 参数: _obj(检验的文本录入对象), errMsg(需要提示的信息) 返回：
 * 如果文本录入对象值为空或全部为数字,返回true;否,返回false 创建时间：2011-2-18
 * ---------------------------------------------------------------------------------------------
 */
function isObjInt(_obj, errMsg) {
    	if(_obj.value == "" || (/^(\-?)(\d+)$/.test(_obj.value))) {
        	return true;   
    	} else {
		alert(errMsg);
		_obj.select();
        	return false;
	}
}

/*
 * ---------------------------------------------------------------------------------------------
 * 功能： 检查文本录入对象值是否为浮点型值 参数: 参数: _str(检验的字符串) 返回：
 * 如果文本录入对象值为空或是浮点型值,返回true;否,返回false 创建时间：2011-2-18
 * ---------------------------------------------------------------------------------------------
 */
function isDouble(_str) {
    return (_str == "" || parseFloat(_str,10)==(_str*1));
}

/*
 * ---------------------------------------------------------------------------------------------
 * 功能： 检查文本录入对象值是否为金额型值 参数: 参数: _str(检验的字符串) 返回：
 * 如果文本录入对象值为空或不是xxxxx.xx格式数字,返回false;否,返回true 创建时间：2014-11-7
 * ---------------------------------------------------------------------------------------------
 */
function isPrice(_str){
	if(isNull(_str) || !(/^(([1-9]\d*)|0)(\.\d{1,2})?$/.test(_str))) {
    	return false;
	}
	return true;
}

/*
 * ---------------------------------------------------------------------------------------------
 * 功能： 返回设置精度的重量数值 参数: 参数: _str(要格式化的重量) 返回： 返回设置精度的浮点数,如_str为空字符串,或为null,则返回0
 * 创建时间：2011-2-18
 * ---------------------------------------------------------------------------------------------
 */
function isWeight(_str) {
	if(isNull(_str) || !(/^(([1-9]\d*)|0)(\.\d{1,4})?$/.test(_str))) {
    	return false;
	}
	return true;
}

/*
 * ---------------------------------------------------------------------------------------------
 * 功能： 返回设置精度的浮点数值 参数: 参数: _str(要转换成浮点数的字符串), _precision(返回浮点数的精度) 返回：
 * 返回设置精度的浮点数,如_str为空字符串,或为null,则返回0 创建时间：2011-2-18
 * ---------------------------------------------------------------------------------------------
 */
function getFloatValue(_str,_precision) {
	if(_str == null || _str == ""){
		return parseFloat("0").toFixed(_precision);
	}
	else if(!isDouble(_str)){
		hiAlert("要转换的字符串格式不正确!");
		return false;
	}
	var tmp=parseFloat(_str).toFixed(_precision)*1;
	return parseFloat(tmp) == 0 ?  parseFloat("0").toFixed(_precision)*1 : tmp;
}

/*
 * ---------------------------------------------------------------------------------------------
 * 功能： 返回设置精度的重量数值 参数: 参数: _str(要格式化的重量) 返回： 返回设置精度的浮点数,如_str为空字符串,或为null,则返回0
 * 创建时间：2011-2-18
 * ---------------------------------------------------------------------------------------------
 */
function getWeightValue(_str) {
	return getFloatValue(_str,4);
}

/*
 * ---------------------------------------------------------------------------------------------
 * 功能： 返回设置精度的金额数值 参数: 参数: _str(要格式化的重量) 返回： 返回设置精度的浮点数,如_str为空字符串,或为null,则返回0
 * 创建时间：2011-2-18
 * ---------------------------------------------------------------------------------------------
 */
function getMoneyValue(_str) {
	return getFloatValue(_str,2);
}

/*
 * ---------------------------------------------------------------------------------------------
 * 功能：得到一个四舍五入的值
 * 创建时间：2017-4-26
 * ---------------------------------------------------------------------------------------------
 */
function getRoundValue(_str,_length) {
	return Math.round((_str*1+0.0000000001)*(Math.pow(10,_length)))/Math.pow(10,_length);
}
/*
 * ---------------------------------------------------------------------------------------------
 * 功能： 返回整型数值 参数: 参数: _str(要转换成整型数的字符串) 返回： 返回整型数,如_str为空字符串,或为null,则返回0
 * 创建时间：2011-2-18
 * ---------------------------------------------------------------------------------------------
 */
function getIntValue(_str) {
	var str = _str+"";
	if (str.indexOf(".") != -1) {
		str = str.substr(0, str.indexOf("."));
		return parseInt(str);
	}else {
		return _str;
	}
}

function getBigMoney(num){
	var strOutput = ""; 
	var num=parseFloat(num);
	  var strUnit = '仟佰拾亿仟佰拾万仟佰拾元角分';  
	  num += "00";  
	  var intPos = num.indexOf('.');  
	  if (intPos >= 0)  
	    num = num.substring(0, intPos) + num.substr(intPos + 1, 2);  
	  strUnit = strUnit.substr(strUnit.length - num.length);  
	  for (var i=0; i < num.length; i++)  
	    strOutput += '零壹贰叁肆伍陆柒捌玖'.substr(num.substr(i,1),1) + strUnit.substr(i,1);  
	    return strOutput.replace(/零角零分$/, '整').replace(/零[仟佰拾]/g, '零').replace(/零{2,}/g, '零').replace(/零([亿|万])/g, '$1').replace(/零+元/, '元').replace(/亿零{0,3}万/, '亿').replace(/^元/, "零元"); 
}
/*
 * ---------------------------------------------------------------------------------------------
 * 功能： 检查文本录入对象值是否为浮点型值 参数: 参数: _str(检验的字符串) 返回：
 * 如果文本录入对象值为空或是浮点型值,返回true;否,返回false 创建时间：2011-2-18
 * ---------------------------------------------------------------------------------------------
 */
function isNumber(_str) {
    return (_str == "" || parseFloat(_str,10)==(_str*1));
}

/*
 * ---------------------------------------------------------------------------------------------
 * 功能： 检查文本录入对象值是否为浮点型值 参数: _obj(检验的文本录入对象), errMsg(需要提示的信息) 返回：
 * 如果文本录入对象值为空或是浮点型值,返回true;否,返回false 创建时间：2011-2-18
 * ---------------------------------------------------------------------------------------------
 */
function isObjDouble(_obj, errMsg) {

    	if(_obj.value == "" || parseFloat(_obj.value,10)==(_obj.value*1)) {	
        	return true;
    	} else {
		alert(errMsg);
		_obj.select();
		return false;
	}
}

/*
 * ---------------------------------------------------------------------------------------------
 * 功能： 检查文本录入对象值是否为Email格式 参数: 参数: _str(检验的字符串) 返回：
 * 如果文本录入对象值为空或是Email格式,返回true;否,返回false 创建时间：2011-2-18
 * ---------------------------------------------------------------------------------------------
 */
function isEmail(_str) {
	return (_str == "" || /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/.test(_str));
}

/*
 * ---------------------------------------------------------------------------------------------
 * 功能： 检查文本录入对象值是否为Email格式 参数: _obj(检验的文本录入对象), errMsg(需要提示的信息) 返回：
 * 如果文本录入对象值为空或是Email格式,返回true;否,返回false 创建时间：2011-2-18
 * ---------------------------------------------------------------------------------------------
 */
function isObjEmail(_obj, errMsg) {
	var pattern = /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/; 
	var flag = pattern.test(_obj.value);

	if (!flag) {
		alert(errMsg);
		_obj.select();
	}

	return flag;
}

/*
 * ---------------------------------------------------------------------------------------------
 * 功能： 检查文本录入对象值是否为电话号码格式 参数: 参数: _str(检验的字符串) 返回：
 * 如果文本录入对象值为空或是电话号码格式,返回true;否,返回false 创建时间：2011-2-18
 * ---------------------------------------------------------------------------------------------
 */
function isPhone(_str) { 	
	for (i = 0; i < _str.length; i++) { 
		if ("0123456789-()# ".indexOf(_str.charAt(i)) == -1)
			return false;
	} 	
	return true; 
} 

/*
 * ---------------------------------------------------------------------------------------------
 * 功能： 检查文本录入对象值是否为手机格式 参数: 参数: _str(检验的字符串) 返回：
 * 如果文本录入对象值为空或是手机格式,返回true;否,返回false 创建时间：2011-2-18
 * ---------------------------------------------------------------------------------------------
 */
function isMobile( s ){
	var regu =/^[1][3,4,5,8][0-9]{9}$/; 
	var re = new RegExp(regu); 
	if (re.test(s)) { 
		return true; 
	}else{ 
		return false; 
	} 
}

/*
 * ---------------------------------------------------------------------------------------------
 * 功能： 检查文本录入对象值是否为电话号码格式 参数: obj(检验的文本录入对象), errMsg(需要提示的信息) 返回：
 * 如果文本录入对象值为空或是电话号码格式,返回true;否,返回false 创建时间：2011-2-18
 * ---------------------------------------------------------------------------------------------
 */
function isObjPhone(_obj, errMsg) { 
	var i, j, strTemp; 
	strTemp = "0123456789-()# "; 

	for (i = 0; i < _obj.value.length; i++) { 
		j = strTemp.indexOf(_obj.value.charAt(i));  

		if ( j== -1) { 
			alert(errMsg);
			_obj.select();
			return false; 
		} 
	} 	
	return true; 
} 

/*
 * ---------------------------------------------------------------------------------------------
 * 功能： 检查文本录入对象值是否为日期型值 参数： obj(检验的文本录入对象), errMsg(需要提示的信息) 返回：
 * 如果文本录入对象值为空或是日期型值,返回true;否则,返回false 创建时间：2011-2-18
 * ----------------------------------------------------------------------------------------------
 */
function isDate(_obj) {
	var reg1 = /^[1-2][0-9]{3}-((0(1|3|5|7|8))|10|12)-((0[1-9])|([1-2][0-9])|(3[0-1]))$/;
	var reg2 = /^[1-2][0-9]{3}-((0(4|6|9))|11)-((0[1-9])|([1-2][0-9])|30)$/;
	var reg3 = /^[1-2][0-9]{3}-(02)-((0[1-9])|([1-2][0-9]))$/;
	var re1 = new RegExp(reg1);
	var re2 = new RegExp(reg2);
	var re3 = new RegExp(reg3);

    if (_obj.value.search(re1) != -1 || _obj.value.search(re2) != -1) {		
		return true;		
	} else if (_obj.value.search(re3) != -1) {		
		date_arr=_obj.value.split("-");
		year=date_arr[0];
	    mon=date_arr[1];
	    day=date_arr[2];

		if(((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) {
			return true;			
		} else {
			var re_ = new RegExp(/^(0?[1-9])|([1[0-9])|(2[0-8])$/);
			if (mon.search(re_) != -1)
		        	return true;
			else
			    	return false;
		}		
	} else {		
		return false;		
	}
}

/*
 * ---------------------------------------------------------------------------------------------
 * 功能： 检查文本录入对象值是否为日期型值 参数: _obj(检验的文本录入对象), errMsg(需要提示的信息) 返回：
 * 如果文本录入对象值为空或是日期型值,返回true;否,返回false 创建时间：2011-2-18
 * ---------------------------------------------------------------------------------------------
 */
function isObjDate(_obj,errMsg) {
	var reg1 = /^[1-2][0-9]{3}-((0(1|3|5|7|8))|10|12)-((0[1-9])|([1-2][0-9])|(3[0-1]))$/;
	var reg2 = /^[1-2][0-9]{3}-((0(4|6|9))|11)-((0[1-9])|([1-2][0-9])|30)$/;
	var reg3 = /^[1-2][0-9]{3}-(02)-((0[1-9])|([1-2][0-9]))$/;
	var re1 = new RegExp(reg1);
	var re2 = new RegExp(reg2);
	var re3 = new RegExp(reg3);

    if (_obj.value.search(re1) != -1 || _obj.value.search(re2) != -1) {		
		return true;		
	} else if (_obj.value.search(re3) != -1) {		
		date_arr=_obj.value.split("-");
		year=date_arr[0];
	    mon=date_arr[1];
	    day=date_arr[2];

		if(((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0)) {
			return true;			
		} else {
			var re_ = new RegExp(/^(0?[1-9])|([1[0-9])|(2[0-8])$/);
			if (mon.search(re_) != -1){
		        return true;
			} else {
				alert(errMsg)
				// _obj.select();
			    return false;
			}
		}		
	} else {		
		alert(errMsg);
		// _obj.select();
		return false;		
	}
}

/*
 * ---------------------------------------------------------------------------------------------
 * 功能： 校验字符串是否为日期型. 参数： str-日期字符串 返回： 如果为空，定义校验通过,返回true; 如果字串为日期型，校验通过,返回true;
 * 如果日期不合法，返回false 创建时间：2011-2-18
 * ---------------------------------------------------------------------------------------------
 */
function checkIsValidDate(str)
{
    // 如果为空，则通过校验
    if(str == ""){
    	return true;
    }
    var pattern = /^((\d{4})|(\d{2}))-(\d{1,2})-(\d{1,2})$/g;
    if(!pattern.test(str)){
    	return false;
    }
    var arrDate = str.split("-");
    if(parseFloat(arrDate[0]) < 1000){
		return false;
	}
	if(parseFloat(arrDate[1]) < 1 || parseFloat(arrDate[1]) > 12){
		return false;
	}
	if(parseFloat(arrDate[2]) < 1 || parseFloat(arrDate[2]) > 31){
		return false;
	}
    return true;
}
/**
 * function checkIsValidDate(str) { //如果为空，则通过校验 if(str == "") return true; var
 * pattern = /^((\d{4})|(\d{2}))-(\d{1,2})-(\d{1,2})$/g; if(!pattern.test(str))
 * return false; var arrDate = str.split("-"); if(parseInt(arrDate[0],10) < 100)
 * arrDate[0] = 2000 + parseInt(arrDate[0],10) + ""; var date = new
 * Date(arrDate[0],(parseInt(arrDate[1],10) -1)+"",arrDate[2]);
 * if(date.getYear() == arrDate[0] && date.getMonth() ==
 * (parseInt(arrDate[1],10) -1)+"" && date.getDate() == arrDate[2]) return true;
 * else return false; }
 */
/*
 * ---------------------------------------------------------------------------------------------
 * 功能： 校验两个日期的先后. 参数： strStart-开始日期;strEnd-结束日期 返回： 如果其中有一个日期为空，校验通过,返回true;
 * 如果起始日期早于终止日期，校验通过,返回true; 如果起始日期晚于或等于终止日期，返回false 创建时间：2011-2-18
 * ---------------------------------------------------------------------------------------------
 */
function checkDateEarlier(strStart,strEnd)
{
    if(checkIsValidDate(strStart) == false || checkIsValidDate(strEnd) == false)
        return false;
    // 如果有一个输入为空，则通过检验
    if (( strStart == "" ) || ( strEnd == "" ))
        return true;
    var arr1 = strStart.split("-");
    var arr2 = strEnd.split("-");
    var date1 = new Date(arr1[0],parseInt(arr1[1].replace(/^0/,""),10) - 1,arr1[2]);
    var date2 = new Date(arr2[0],parseInt(arr2[1].replace(/^0/,""),10) - 1,arr2[2]);
    if(arr1[1].length == 1)
        arr1[1] = "0" + arr1[1];
    if(arr1[2].length == 1)
        arr1[2] = "0" + arr1[2];
    if(arr2[1].length == 1)
        arr2[1] = "0" + arr2[1];
    if(arr2[2].length == 1)
        arr2[2]="0" + arr2[2];
    var d1 = arr1[0] + arr1[1] + arr1[2];
    var d2 = arr2[0] + arr2[1] + arr2[2];
    if(parseInt(d1,10) >= parseInt(d2,10))
       return false;
    else
       return true;
}


/*
 * ---------------------------------------------------------------------------------------------
 * 功能： 校验两个日期的先后. 参数： strStart-开始日期;strEnd-结束日期 返回： 如果其中有一个日期为空，校验通过,返回true;
 * 如果起始日期早于或等于终止日期，校验通过,返回true; 如果起始日期晚于终止日期，返回false 创建时间：2011-2-18
 * ---------------------------------------------------------------------------------------------
 */
function checkDateLate(strStart,strEnd)
{
    if(checkIsValidDate(strStart) == false || checkIsValidDate(strEnd) == false)
        return false;
    // 如果有一个输入为空，则通过检验
    if (( strStart == "" ) || ( strEnd == "" ))
        return true;
    var arr1 = strStart.split("-");
    var arr2 = strEnd.split("-");
    var date1 = new Date(arr1[0],parseInt(arr1[1].replace(/^0/,""),10) - 1,arr1[2]);
    var date2 = new Date(arr2[0],parseInt(arr2[1].replace(/^0/,""),10) - 1,arr2[2]);
    if(arr1[1].length == 1)
        arr1[1] = "0" + arr1[1];
    if(arr1[2].length == 1)
        arr1[2] = "0" + arr1[2];
    if(arr2[1].length == 1)
        arr2[1] = "0" + arr2[1];
    if(arr2[2].length == 1)
        arr2[2]="0" + arr2[2];
    var d1 = arr1[0] + arr1[1] + arr1[2];
    var d2 = arr2[0] + arr2[1] + arr2[2];
    if(parseInt(d1,10) > parseInt(d2,10)) {
       return false;
    } else {
       return true;
    }
}

/*
 * ---------------------------------------------------------------------------------------------
 * 功能： 验证表单对象的字符长度是否指定的长度. 参数： obj-表单对象;len-长度 创建时间：2011-2-18
 * ---------------------------------------------------------------------------------------------
 */
function validateLen(obj, len, str) {	
	if(obj.value != "") {
		if(!limitB(obj.value, len, len)) {
			alert(str+"长度必须为"+ len + "个字符。");
			obj.focus();
		}
	}
}

/*
 * ---------------------------------------------------------------------------------------------
 * 功能： 验证表单对象的字符串长度是否在指定的范围内,如果超出禁止录入. 参数： obj-表单对象;min-最小长度;max-最大长度 返回：
 * int(字节数) 创建时间：2011-2-18
 * ---------------------------------------------------------------------------------------------
 */
function validateStrLen(obj, minLen, maxLen) {	
	if(obj.value != "") {
		if(!limitB(obj.value, minLen, maxLen)) {
			alert("字符长度必须在"+ minLen + "到" + maxLen + "个字符之内(一个汉字为2个字符)");
			obj.focus();
		}
	}
}

/*
 * ---------------------------------------------------------------------------------------------
 * 功能： 验证表单对象的字符串长度是否在指定的范围内,如果超出禁止录入. 参数： obj-表单对象;min-最小长度;max-最大长度 返回：
 * int(字节数) 创建时间：2011-2-18
 * ---------------------------------------------------------------------------------------------
 */
function ckLen(obj, minLen, maxLen, str) {	
	if(obj.value != "") {
		if(!limitB(obj.value, minLen, maxLen)) {
			alert(str+"长度必须在"+ minLen + "到" + maxLen + "个字符之内。");
			obj.focus();
		}
	}
}

/*
 * ---------------------------------------------------------------------------------------------
 * 功能： 校验字符串是否在指定的长度内 参数： len-字符串长度;min-最小值;man-最大值 返回： boolean(如果在范围之内,则返回
 * true;否则，返回 false) 创建时间：2011-2-18
 * ---------------------------------------------------------------------------------------------
 */
function limit(len, minLen,maxLen) {
    return minLen <= len && len <= maxLen;
}

/*
 * ---------------------------------------------------------------------------------------------
 * 功能： 校验字符串是否在指定的长度内(以字节数进行比较) 参数： str-原始字符串;min-最小长度;max-最大长度 返回：
 * boolean(如果在范围之内,则返回 true;否则，返回 false) 创建时间：2011-2-18
 * ---------------------------------------------------------------------------------------------
 */
function limitB(str, minLen,maxLen) {
    return limit(lenB(str),minLen,maxLen);
}


/*
 * ---------------------------------------------------------------------------------------------
 * 功能： 返加字符串的字节数 参数： 字符串 返回： int(字节数) 创建时间：2011-2-18
 * ---------------------------------------------------------------------------------------------
 */
function lenB(str) {
    return str.replace(/[^\x00-\xff]/g,"**").length;
}

/*
 * ---------------------------------------------------------------------------------------------
 * 功能： grid文本框失焦验证 参数： type验证类型，obj验证对象，errmsg验证出错提示信息 返回： void 创建时间：2011-2-18
 * ---------------------------------------------------------------------------------------------
 */
function validate(type,obj,errMsg){

	switch(type){
		case "isInt": isObjInt(obj,errMsg);break;
		case "isDouble": isObjDouble(obj,errMsg);break;
		case "isDate": isObjDate(obj,errMsg);break;
		case "isEmail": isObjEmail(obj,errMsg);break;
		case "isPhone": isObjPhone(obj,errMsg);break;
	}
}
 
/*
 * ---------------------------------------------------------------------------------------------
 * 功能： 导出到Microsoft Excel 参数： obj-被导出的内容Table 返回： （无） 创建时间：2011-2-18
 * ---------------------------------------------------------------------------------------------
 */
function exportExcel(obj) {
	try{
		var oXL = new ActiveXObject("Excel.Application"); 
		var oWB = oXL.Workbooks.Add(); 
		var oSheet = oWB.ActiveSheet; 
		var sel = document.body.createTextRange();
		sel.moveToElementText(obj);
		sel.select();
		sel.execCommand("Copy");
		oSheet.Paste();
		oXL.Visible = true;
	}catch(e){
		alert("导出失败!");
	}
}

/*
 * ---------------------------------------------------------------------------------------------
 * 功能： 打开的窗口不能切换焦点 参数： url_ —— URL 参数： _width —— 编辑窗口的宽度，_height —— 编辑窗口的高度 返回：
 * （无） 创建时间：2011-2-18
 * ---------------------------------------------------------------------------------------------
 */
function openModal(url_, _width, _height) {
	settings = 'dialogHeight:' + _height + 'px;dialogWidth:' + _width
		+ 'px;center:1;edge:1;help:0;resizable:0;scroll:auto;status:0;';

	return window.showModalDialog(url_, window, settings);

}

/*
 * ---------------------------------------------------------------------------------------------
 * 功能： 打开的窗口不能切换焦点 参数： url —— URL 参数： iWidth —— 编辑窗口的宽度，iHeight —— 编辑窗口的高度 返回：
 * （无） 创建时间：2011-2-18
 * ---------------------------------------------------------------------------------------------
 */
function openPrint(url,iWidth,iHeight)
{
	var iWidth;                          // 弹出窗口的宽度;
	var iHeight;                        // 弹出窗口的高度;
	var iTop = (window.screen.availHeight-76-iHeight)/2;       // 获得窗口的垂直位置;
	var iLeft = (window.screen.availWidth-10-iWidth)/2;           // 获得窗口的水平位置;
	window.open(url,'newwindow','height='+iHeight+',innerHeight='+iHeight+',width='+iWidth+',innerWidth='+iWidth+',top='+iTop+',left='+iLeft+',toolbar=no,menubar=no,scrollbars=yes,resizeable=yes,location=no,status=no');
}

// 设置网页打印的页眉页脚为空
function pagesetup_null(){
	try{
		var RegWsh = new ActiveXObject("WScript.Shell")
		RegWsh.RegWrite("HKEY_CURRENT_USER\\Software\\Microsoft\\Internet Explorer\\PageSetup\\header","")
		RegWsh.RegWrite("HKEY_CURRENT_USER\\Software\\Microsoft\\Internet Explorer\\PageSetup\\footer","")
	}catch(e){}
}

// 设置网页打印的页眉页脚为默认值
function pagesetup_default(){
	try{
		var RegWsh = new ActiveXObject("WScript.Shell")		
		RegWsh.RegWrite("HKEY_CURRENT_USER\\Software\\Microsoft\\Internet Explorer\\PageSetup\\header","&w&b页码，&p/&P")		
		RegWsh.RegWrite("HKEY_CURRENT_USER\\Software\\Microsoft\\Internet Explorer\\PageSetup\\footer","&u&b&d")
	}catch(e){}
}

/**
 * 键盘监听事件，只能输入数字
 * 
 * @param obj
 * @param e
 */
function onlynumber(obj,e){
	var isIE = false;

	if ((navigator.userAgent.indexOf("MSIE")>0) && (parseInt(navigator.appVersion) >=4))isIE = true;
	if(navigator.userAgent.indexOf("Firefox")>0)isIE = false;
	if(navigator.userAgent.indexOf("Safari")>0)isIE = false; 
    var iKeyCode = window.event?e.keyCode:e.which;
    if(!((iKeyCode >= 48 && iKeyCode <= 57) || iKeyCode == 0 || iKeyCode == 8) )
    {    
        if (isIE)
            e.returnValue=false;
        else
            e.preventDefault();
    }
}

/*
 * ---------------------------------------------------------------------------------------------
 * 功能： 检查文本框的字数大小 参数: 参数: id(input文本框的id属性), length(input输入的长度) 创建时间：2011-4-25
 * ---------------------------------------------------------------------------------------------
 */
function maxlength(id, length) {
	var value = document.getElementById(id).value;
	
	if (value.length > length) {
		document.getElementById(id).value = value.substr(0, length);
	}
}

// 表单提交时用于检测输入长度通用函数
function maxlength2(id, length) {
	var obj = document.getElementById(id);
	if ((obj.value).length > length) {
		hiAlert(obj.title+"不能超过"+length+"个字符！");
		return false;
	}
	return true;
}


/*
 * ---------------------------------------------------------------------------------------------
 * 功能： 检查付款进度中付款天数大小 参数: 参数: paymentidays(input文本框的name属性，付款天数的name)
 * 创建时间：2011-5-17
 * ---------------------------------------------------------------------------------------------
 */
function validateday(paymentidays) {
	var length = $("input[name="+paymentidays+"]").length;
	var dayvalidate=true;
	for (var i=length-1;i>=0;i--) {
		var last = $("input[name="+paymentidays+"]:eq("+(i)+")").val();
		var previous = -1;
		if (i!=0) {
			previous = $("input[name="+paymentidays+"]:eq("+(i-1)+")").val();
		}		
		if (Number(last)<=Number(previous)) {
			dayvalidate = false;			
		}	
	}
	return dayvalidate;
}
/*
 * ---------------------------------------------------------------------------------------------
 * 功能： 检查付款进度中付款天数大小(页面上有多个Form) 参数: 参数: paymentidays(input文本框的name属性，付款天数的name)
 * 创建时间：2011-5-17
 * ---------------------------------------------------------------------------------------------
 */
function validatepaymentday(formObj) {
	var length = formObj.paymentidays.length;
	var dayvalidate=true;
	for (var i=length-1;i>=0;i--) {
		var last = formObj.paymentidays[i].value;
		var previous = -1;
		if (i!=0) {
			previous = formObj.paymentidays[i-1].value;
		}		
		if (Number(last)<=Number(previous)) {
			dayvalidate = false;			
		}	
	}
	return dayvalidate;
}

/*
 * ---------------------------------------------------------------------------------------------
 * 功能： 重量的截取，如果超过四位，则只取小数点后四位 参数: 参数: obj：在jsp页面中用this代替即可 创建时间：2011-06-07
 * ---------------------------------------------------------------------------------------------
 */
function weightlength(obj) {
	obj.value=obj.value.replace(/[^\.\d]/g,'');
	var value = obj.value;	
	if (value.indexOf(".") != -1) {
		if (value.split(".")[1].length > 4) {
		obj.value = getWeightValue(value.substr(0, value.indexOf(".")+5));
		} else {
			obj.value = getWeightValue(value);
		}
	}
}

/*
 * ---------------------------------------------------------------------------------------------
 * 功能： 价格的截取，如果超过两位，则只取小数点后两位 参数: 参数: obj：在jsp页面中用this代替即可 创建时间：2011-06-07
 * ---------------------------------------------------------------------------------------------
 */
function pricelength(obj) {
	obj.value=obj.value.replace(/[^\.\d]/g,'');
	var value = obj.value;	
	if (value.indexOf(".") != -1) {
		if (value.split(".")[1].length > 2) {
		obj.value = getMoneyValue(value.substr(0, value.indexOf(".")+3));
		} else {
			obj.value = getMoneyValue(value);
		}
	}
}

// 判断商品价格区间
function JudgeCommodityPriceRegion(name,price){
	var aa;
	$.ajax({
		   type: "POST",
		   url: "../base/commodity!JudgeCommodityPriceRegion.action",
		   data: "name="+name+"&price="+price,
		   async:false,
		   success: function(msg){
			   aa=msg;
		   }
	});
	return aa;
}

// 判断金额和数量的小数位
function isRightDecimal(str,length){
	if(str.indexOf(".")!=-1&&str.toString().split(".")[1].length>length)
		return false; 
	else   
		return true;
}

// 判断是否返回登录页面的代码
function isLogonPage(obj){
	if(obj.indexOf("<!DOCTYPE")==-1){
		return false;
	}else{
		return true;
	}
}


/*
 * ---------------------------------------------------------------------------------------------
 * 功能： 数字的截取，只能输入数字，如果有中文则自动替换成空 参数: 参数: obj：在jsp页面中用this代替即可 创建时间：2011-06-07
 * ---------------------------------------------------------------------------------------------
 */
function numberreplace(obj) {
	obj.value=obj.value.replace(/[^\d]/g,'');
}

/*
 * ---------------------------------------------------------------------------------------------
 * 功能： 密码强度判断 参数: 参数: password：密码值 id：展示强度层的ID 创建时间：2011-06-07
 * ---------------------------------------------------------------------------------------------
 */
function passwordStrength(password,id){
 var desc = new Array();
 desc[0] = "非常简单";
 desc[1] = "简单";
 desc[2] = "比较安全";
 desc[3] = "安全";
 desc[4] = "很安全";
 desc[5] = "非常安全";
 var score   = 0;
 if (password.length >= 6) score++;
 if ( ( password.match(/[a-z]/) ) && ( password.match(/[A-Z]/) ) ) score++;
 if (password.match(/d+/)) score++;
 if ( password.match(/.[!,@,#,$,%,^,&,*,?,_,~,-,(,)]/) ) score++;
 if ( password.match(/[<,>,{,},[,],|,\\,;,:,\/]/)) score++;
 if (password.length > 12) score++;
  $("#"+id).attr("class","strength" + score).html(desc[score]);
}

/*
 * ---------------------------------------------------------------------------------------------
 * 功能： 查看资金账号余额 参数: 参数: accountid：资金账号ID；
 * a_balance："查看余额"的a标签ID；balance：显示资金的ID；sbuyerorseller：买方0或卖方1 创建时间：2011-08-03
 * ---------------------------------------------------------------------------------------------
 */
function getAccountBalance(accountid, a_balance, balance, sbuyerorseller) {
	var sbuyeraccountid;
	if (sbuyerorseller == 0) {
		sbuyeraccountid = $("#"+accountid).val();
	} else {
		sbuyeraccountid = $("#"+accountid).val();
		sbuyeraccountid = sbuyeraccountid.split(":")[0];
	}
	$("#"+a_balance).hide();
	$.ajax({
		type:"get",
		url:"../zj/member-fund!getAccountBalance.action?id="+sbuyeraccountid,
		success:function(str){
			if (str == "error") {
				hiAlert("请重新登录！");
			} else {
				$("#"+balance).html(getMoneyValue(parseFloat(str)));
			}
		},
		error:function(e){hiAlert("系统繁忙，请联系管理员！");}
	});
}

/*
 * ---------------------------------------------------------------------------------------------
 * 功能： 改变账号触发的事件 参数: 参数: a_balance：查看余额的a标签ID；balance：显示资金的ID 创建时间：2011-08-03
 * ---------------------------------------------------------------------------------------------
 */
function changebalance(a_balance, balance) {
	$("#"+a_balance).show();
	$("#"+balance).html("");
}

/*
 * ---------------------------------------------------------------------------------------------
 * 功能： 图片按比例缩放 参数: 参数: ImgD：imageid；iwidth：宽度；iheight：高度 创建时间：2011-08-03
 * ---------------------------------------------------------------------------------------------
 */
var _image_flag = false;
function DrawImage(ImgD, iwidth, iheight) {
	// 参数(图片,允许的宽度,允许的高度)
	var image = new Image();
	image.src = ImgD.src;
	if (image.width > 0 && image.height > 0) {
		_image_flag = true;
		if (image.width / image.height >= iwidth / iheight) {
			if (image.width > iwidth) {
				ImgD.width = iwidth;
				ImgD.height = (image.height * iwidth) / image.width;
			} else {
				ImgD.width = image.width;
				ImgD.height = image.height;
			}
			// ImgD.alt = image.width + "×" + image.height;
		} else {
			if (image.height > iheight) {
				ImgD.height = iheight;
				ImgD.width = (image.width * iheight) / image.height;
			} else {
				ImgD.width = image.width;
				ImgD.height = image.height;
			}
			// ImgD.alt = image.width + "×" + image.height;
		}
	}
}

function jumpPage(pageNo) {
	var _pageno=$("#to_page").val();
	
	if(_pageno!=null&&_pageno!=""){$("#pageNo").val(parseInt(_pageno))-1;}
	else{$("#pageNo").val(pageNo);}
	$("#mainForm").submit();
}


function resetForm(){
	$(':input','#mainForm').not(':button, :submit, :reset, :hidden').val('').removeAttr('checked').removeAttr('selected');
}

Array.prototype.contains = function (arr){
	for(var i=0;i<this.length;i++){
		// this指向真正调用这个方法的对象
		if(this[i] == arr){
			return true;
		}
	}
	return false;
}

function GetErrCode(errcode)
{
	var result = '';
	switch (errcode)
	{
		case -2113667072 :
		    result = "读取不到U盾证书(-2113667072)";
			break;
		case -2113667071 :
		    result = "内存分配错误(-2113667071)";
			break;
		case -2113667070 :
		    result = "读私钥设备错误(-2113667070)";
			break;
		case -2113667069:
		    result = "U盾密码错误(-2113667069)";
			break;
		case -2113667017:
			result = "U盾密码错误(-2113667017)";
			break;
		case -2113667068 :
		    result = "读证书链设备错误(-2113667068)";
			break;
		case -2113667067 :
		    result = "证书链密码错误(-2113667067)";
			break;
		case -2113667066 :
		    result = "读证书设备错误(-2113667066)";
			break;
		case -2113667065 :
		    result = "证书密码错误(-2113667065)";
			break;
		case -2113667064 :
		    result = "私钥超时(-2113667064)";
			break;
		case -2113667063 :
		    result = "缓冲区太小(-2113667063)";
			break;
		case -2113667062 :
		    result = "初始化环境错误(-2113667062)";
			break;
		case -2113667061 :
		    result = "清除环境错误(-2113667061)";
			break;
		case -2113667060 :
		    result = "数字签名错误(-2113667060)";
			break;
		case -2113667059 :
		    result = "验证签名错误(-2113667059)";
			break;
		case -2113667058 :
		    result = "摘要错误(-2113667058)";
			break;
		case -2113667057 :
		    result = "证书格式错误(-2113667057)";
			break;
		case -2113667056 :
		    result = "数字信封错误(-2113667056)";
			break;
		case -2113667055 :
		    result = "从LDAP获取证书错误(-2113667055)";
			break;
		case -2113667054 :
		    result = "证书已过期(-2113667054)";
			break;
		case -2113667053 :
		    result = "获取证书链错误(-2113667053)";
			break;
		case -2113667052 :
		    result = "证书链格式错误(-2113667052)";
			break;
		case -2113667051 :
		    result = "验证证书链错误(-2113667051)";
			break;
		case -2113667050 :
		    result = "证书已废除(-2113667050)";
			break;
		case -2113667049 :
		    result = "CRL格式错误(-2113667049)";
			break;
		case -2113667048 :
		    result = "连接OCSP服务器错误(-2113667048)";
			break;
		case -2113667047 :
		    result = "OCSP请求编码错误(-2113667047)";
			break;
		case -2113667046 :
		    result = "OCSP回包错误(-2113667046)";
			break;
		case -2113667045 :
		    result = "OCSP回包格式错误(-2113667045)";
			break;
		case -2113667044 :
		    result = "OCSP回包过期(-2113667044)";
			break;
		case -2113667043 :
		    result = "OCSP回包验证签名错误(-2113667043)";
			break;
		case -2113667042 :
		    result = "证书状态未知(-2113667042)";
			break;
		case -2113667041 :
		    result = "对称加解密错误(-2113667041)";
			break;
		case -2113667040 :
		    result = "获取证书信息错误(-2113667040)";
			break;
		case -2113667039 :
		    result = "获取证书细目错误(-2113667039)";
			break;
		case -2113667038 :
		    result = "获取证书唯一标识错误(-2113667038)";
			break;
		case -2113667037 :
		    result = "获取证书扩展项错误(-2113667037)";
			break;
		case -2113667036 :
		    result = "PEM编码错误(-2113667036)";
			break;
		case -2113667035 :
		    result = "PEM解码错误(-2113667035)";
			break;
		case -2113667034 :
		    result = "产生随机数错误(-2113667034)";
			break;
		case -2113667033 :
		    result = "PKCS12参数错误(-2113667033)";
			break;m
		case -2113667032 :
		    result = "私钥格式错误(-2113667032)";
			break;
		case -2113667031 :
		    result = "公私钥不匹配(-2113667031)";
			break;
		case -2113667030 :
		    result = "PKCS12编码错误(-2113667030)";
			break;
		case -2113667029 :
		    result = "PKCS12格式错误(-2113667029)";
			break;
		case -2113667028 :
		    result = "PKCS12解码错误(-2113667028)";
			break;
		case -2113667027 :
		    result = "非对称加解密错误(-2113667027)";
			break;
		case -2113667026 :
		    result = "OID格式错误(-2113667026)";
			break;
		case -2113667025 :
		    result = "LDAP地址格式错误(-2113667025)";
			break;
		case -2113667024 :
		    result = "LDAP地址错误(-2113667024)";
			break;
		case -2113667023 :
		    result = "连接LDAP服务器错误(-2113667023)";
			break;m
		case -2113667022 :
		    result = "LDAP绑定错误(-2113667022)";
			break;
		case -2113667021 :
		    result = "没有OID对应的扩展项(-2113667021)";
			break;
		case -2113667020 :
		    result = "获取证书级别错误(-2113667020)";
			break;
		case -2113667019 :
		    result = "读取配置文件错误(-2113667019)";
			break;
		case -2113667018 :
		    result = "私钥未载入(-2113667018)";
			break;
	// 以下错误用于登录
		case -2113666824 :
		    result = "无效的登录凭证(-2113666824)";
			break;
		case -2113666823 :
		    result = "参数错误(-2113666823)";
			break;
		case -2113666822 :
		    result = "不是服务器证书(-2113666822)";
			break;
		case -2113666821 :
		    result = "登录错误(-2113666821)";
			break;
		case -2113666820 :
		    result = "证书验证方式错误(-2113666820)";
			break;
		case -2113666819 :
		    result = "随机数验证错误(-2113666819)";
			break;
		case -2113666818 :
		    result = "与单点登录客户端代理通信(-2113666818)";
		break;
	}
  /* result = "数字证书错误：" + result; */
	 
	return result;
}

String.prototype.trim = function () {
	return this .replace(/^\s\s*/, '' ).replace(/\s\s*$/, '' );
}

Date.prototype.format = function(format){ 
	var o = { 
	"M+" : this.getMonth()+1, // month
	"d+" : this.getDate(), // day
	"h+" : this.getHours(), // hour
	"m+" : this.getMinutes(), // minute
	"s+" : this.getSeconds(), // second
	"q+" : Math.floor((this.getMonth()+3)/3), // quarter
	"S" : this.getMilliseconds() // millisecond
	} 

	if(/(y+)/.test(format)) { 
	format = format.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
	} 

	for(var k in o) { 
	if(new RegExp("("+ k +")").test(format)) { 
	format = format.replace(RegExp.$1, RegExp.$1.length==1 ? o[k] : ("00"+ o[k]).substr((""+ o[k]).length)); 
	} 
	} 
	return format; 
	} 
