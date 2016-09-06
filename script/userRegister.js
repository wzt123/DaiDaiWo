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

function ensure() {
	var email = $api.byId('email').value;
	var tel = $api.byId('tel').value;
	var uname = $api.byId('userName').value;
	var pwd = $api.byId('userPwd').value;
	var pwd2 = $api.byId('userPwd2').value;
	if (email != "") {
		var reg = /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
		var isok = reg.test(email);
		if (!isok) {
			api.alert({
				msg : "邮箱格式不正确，请重新输入！"
			}, function(ret, err) {
				//coding...
			});
			document.getElementById("email").focus();
			return;
		}
	} else if (email == null) {
		api.alert({
			msg : "邮箱不能为空！"
		}, function(ret, err) {
			//coding...
		});
		document.getElementById("email").focus();
		return;

	} else if (tel != null) {
		var reg = /^1[3|5|7|8][0-9]\d{4,8}$/;
		var isok = reg.test(tel);
		if (!isok) {
			api.alert({
				msg : "手机号格式不正确，请重新输入！"
			}, function(ret, err) {
				//coding...
			});
			document.getElementById("tel").focus();
			return;
		}

	} else if (tel == null) {
		api.alert({
			msg : "手机号不能为空！"
		}, function(ret, err) {
			//coding...
		});
		document.getElementById("tel").focus();
		return;

	} else if (pwd.length == 0 || pwd2.length == 0) {
		api.alert({
			msg : "密码不能为空"
		});
		return;
	} else if (pwd !== pwd2) {
		api.alert({
			msg : '两次密码不一致'
		});
		return;
	} else if (pwd.length <= 9 || pwd2.length <= 9) {
		api.alert({
			msg : "密码长度不能小于9位"
		});
		return;
	} else if (uname.length == 0) {
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
		email : email,
		tel : tel
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
