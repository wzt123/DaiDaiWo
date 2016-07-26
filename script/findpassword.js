function delWord(el) {
	var input = $api.prev(el, '.txt');
	input.value = '';
}

function ensure() {

	var email = $api.byId('email').value;
	var pwd = $api.byId('userName').value;
	if (email.length == 0) {
		api.alert({
			msg : "手机号不能为空"
		});
		return
	} else if (pwd.length == 0) {
		api.alert({
			msg : "昵称不能为空"
		});
		return
	}
	api.showProgress({
		title : '正在核实...',
		modal : false
	});
	var loginUlr = '/user';
	var bodyParam = {
		email : email,
		password : pwd
	}
	ajaxRequest(loginUlr, 'get', JSON.stringify(bodyParam), function(ret, err) {
		if (ret) {
			//$api.setStorage('islogin', 1);
			//$api.setStorage('uid', ret.userId);
			//$api.setStorage('token', ret.id);
			$api.setStorage('username', ret.username);

			$api.setStorage('email', ret.email);
			//			setTimeout(function() {
			//				api.closeWin();
			//			}, 100);
			//			api.sendEvent({
			//					name : 'reg_login_successEvent',
			//					extra : {
			//						key : true
			//					}
			//				});
			var userId = ret.userId;
			api.alert({
				msg : "成功"
			}, function() {
				api.openWin({
					name : 'findpassword1_head',
					url : '../html/findpassword1_head.html',
					opaque : true,
					vScrollBarEnabled : false
				});
			});
		}
		//				api.closeToWin({
		//					name : 'root'
		//				});

		else {
			api.alert({
				msg : "手机号或昵称错误"
			});
		}
		//api.hideProgress();
	})
}

apiready = function() {
	var header = $api.byId('header');
	$api.fixIos7Bar(header);
};
