/*!
 * jQuery Validation Plugin 1.11.1
 *
 * http://bassistance.de/jquery-plugins/jquery-plugin-validation/
 * http://docs.jquery.com/Plugins/Validation
 *
 * Copyright 2013 Jörn Zaefferer
 * Released under the MIT license:
 *   http://www.opensource.org/licenses/mit-license.php
 */


jQuery.validator.addMethod("username", function(value, element) {
	return this.optional(element) || /^[a-zA-Z]+[a-zA-Z0-9_]*$/i.test(value);
}, "用户名只能包含字母和数字或 '_',以字母开头!");
jQuery.validator.addMethod("mobile", function(value, element) {
	return this.optional(element) || /^(13[0-9]|15[0-9]|14[7]|17[0-9]|18[0-9])[0-9]{8}$/.test(value);
}, "请输入正确的手机号!");
jQuery.validator.addMethod("qq", function(value, element) {
	return this.optional(element) || /^[0-9]{5,20}$/.test(value);
}, "请输入正确的QQ号!");
jQuery.validator.addMethod("onumber", function(value, element) {
	return this.optional(element) || /^[0-9]{1,10}$/.test(value);
}, "请输入数字!");
jQuery.validator.addMethod("inumber", function(value, element) {
	return this.optional(element) || /^[0-9]{1,10}$/.test(value);
}, "请输入件数!");
jQuery.validator.addMethod("email", function(value, element) {
	return this.optional(element) || /^([\.a-zA-Z0-9_-]){2,30}@([a-zA-Z0-9_-]){2,30}(\.([a-zA-Z0-9]){2,}){1,4}$/.test(value);
}, "请输入正确的邮箱格式!");
jQuery.validator.addMethod("phone", function(value, element) {
	return this.optional(element) || /^(0[0-9]{2,3}\-)?([2-9][0-9]{6,7})+(\-[0-9]{1,5})?$/.test(value);
	}, "请输入正确的电话格式!");
jQuery.validator.addMethod("money", function(value, element) {
	return this.optional(element) || /^(-)?(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,2})?$/.test(value);
	}, "请输入正确的金额!");
jQuery.validator.addMethod("gtzero", function(value, element) {
	return this.optional(element) || /^(?!(0[0-9]{0,}$))[0-9]{1,}[.]{0,}[0-9]{0,}$/.test(value);
	}, "请输入大于0的数字!");
jQuery.validator.addMethod("price", function(value, element) {
	return this.optional(element) || /^([1-9]{1}\d*)$/.test(value);
	}, "请输入正确的价格!");
jQuery.validator.addMethod("weight", function(value, element) {
	return this.optional(element) || /^(-)?(([1-9]{1}\d*)|([0]{1}))(\.(\d){1,4})?$/.test(value);
	}, "请输入正确的数量!");
jQuery.validator.addMethod("bankno", function(value, element) {
	return this.optional(element) || /^[0-9-]{10,30}$/.test(value);
	}, "请输入正确的银行账号!");
jQuery.validator.addMethod("oname", function(value, element) {
	return this.optional(element) || /^[\u4e00-\u9fa5a-z][\u4e00-\u9fa5a-zA-Z0-9- ]*$/.test(value);
	}, "格式不正确!");
jQuery.validator.addMethod("zipcode", function(value, element) {
	return this.optional(element) || /^[1-9][0-9]{5}$/.test(value);
	}, "请输入正确的邮编!");
jQuery.validator.addMethod("passrule", function(value, element) {
	return this.optional(element) || /^[a-zA-Z0-9]{6,18}$/.test(value);
	}, "请输入正确的密码，密码长度为6-18位，不能包含特殊字符!");   
