var smsVerify;
apiready = function() {
	smsVerify = api.require('smsVerify');

	// 初始化

	smsVerify.register(function(ret, err) {
		if (ret.status) {
			//api.alert({msg: '注册成功'});
			console.log('注册成功');
		} else {
			api.alert({
				msg : err.code + ' 注册失败'
			});
		}
	});
};

// 发短信验证码
function sms() {
	var phone = document.getElementById("phone").value;
	smsVerify.sms({
		phone : phone,
	}, function(ret, err) {
		if (ret.status) {
			// 新增的安卓智能验证功能
			if (ret.smart == true) {// 安卓版特有功能 智能验证成功
				//				api.alert({
				//					msg : '智能验证成功，开发者可以为用户直接跳转到手机号验证成功之后的操作'
				//				});
			} else {
				api.alert({
					msg : '短信发送成功'
				});
			}
		} else {
			api.alert({
				msg : err.code + ' 短信发送失败'
			});
		}
	});
}

// 发语音验证码
//function voice() {
//	var phone = document.getElementById("phone").value;
//	smsVerify.voice({
//		phone : phone,
//	}, function(ret, err) {
//		if (ret.status) {
//			api.alert({
//				msg : '语音发送成功'
//			});
//		} else {
//			api.alert({
//				msg : err.code + ' 语音发送失败'
//			});
//		}
//	});
//}

// 校验验证码
function verify() {
	var phone = document.getElementById("phone").value;
	var code = document.getElementById("code").value;
	var newpw = $api.byId('newpw');
	var newpw2 = $api.byId('newpw2');
	smsVerify.verify({
		phone : phone,
		code : code,
	}, function(ret, err) {
		if (ret.status) {
			//			api.alert({
			//				msg : '验证成功'
			//			});
			var updatePasswordUlr = '/user/' + uid;
			var bodyParam = {
				password : newpw2
			};
			ajaxRequest(updatePasswordUlr, 'put', JSON.stringify(bodyParam), function(ret, err) {
				if (ret) {
					setTimeout(function() {
						api.alert({
							msg : '修改成功'
						}, function(ret, err) {
							api.closeWin();
						});
					}, 200);
				} else {
					api.alert({
						msg : err.msg
					});
				}
			})
		} else {
			api.alert({
				msg : err.code + ' 验证码错误'
			});
		}
	});
}