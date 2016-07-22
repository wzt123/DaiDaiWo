var inputWrap = $api.domAll('.input-wrap');
var i = 0, len = inputWrap.length;
for (i; i < len; i++) {
	var txt = $api.dom(inputWrap[i], '.txt');
	var del = $api.dom(inputWrap[i], '.del');
	(function(txt, del) {
		$api.addEvt(txt, 'focus', function() {
			if (txt.value) {
				$api.addCls(del, 'show');
			}
			$api.addCls(txt, 'light');
		});
		$api.addEvt(txt, 'blur', function() {
			$api.removeCls(del, 'show');
			$api.removeCls(txt, 'light');
		});
	})(txt, del);

}

function delWord(el) {
	var input = $api.prev(el, '.txt');
	input.value = '';
}

//if ($api.byId('username').value.length == 0 ) {
//		document.getElementById('username').focus();
//		api.toast({
//			msg : '用户名不能为空'
//		});
//		return;
//	} else if ($api.byId('password').value.length == 0) {
//		document.getElementById('password').focus();
//		api.toast({
//			msg : '密码不能为空！'
//		});
//		return;
//	} else if ($api.byId('email').value == null) {
//
//		document.getElementById('email').focus();
//		api.toast({
//			msg : '邮箱不能为空！'
//		});
//		return;
//	}
//	else
//		var t = 1;

function ensure() {
	var email = $api.byId('email').value;
	var uname = $api.byId('userName').value;
	var pwd = $api.byId('userPwd').value;
	var pwd2 = $api.byId('userPwd2').value;
	if (email.length == 0||email.length!=11) {
		api.alert({
			msg : "电话格式不对"
		});
		return;
	} else if (pwd.length == 0||pwd2.length == 0) {
		api.alert({
			msg : "密码不能为空"
		});
		return;
	} else if (pwd !== pwd2) {
		api.alert({
			msg : '两次密码不一致'
		});
		return;
	}
	else if (pwd.length <= 9) {
		api.alert({
			msg : "密码长度不能小于9位"
		});
		return;
	}
	  else if (uname.length == 0) {
		api.alert({
			msg : "用户名不能为空"
		});
		return;
	}
	api.showProgress({
		title : '注册中...',
		modal : false
	});
	var registerUrl = '/user/';
	var bodyParam = {
		username : uname,
		password : pwd2,
		email : email
	}
	ajaxRequest(registerUrl, 'post', JSON.stringify(bodyParam), function(ret, err) {
		if (ret) {
			api.alert({
				msg : '注册成功！'
			}, function() {
				api.closeWin();
			});

		} else {
			api.alert({
				msg : err.msg
			});
		}
		api.hideProgress();
	})
}

apiready = function() {
	var header = $api.byId('header');
	$api.fixIos7Bar(header);
};
