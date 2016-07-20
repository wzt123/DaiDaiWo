function delWord(el) {
	var input = $api.prev(el, '.txt');
	input.value = '';
}

//function login() {
//  api.openWin({
//      name: 'user_login_reg',
//      url: 'user_login_reg.html',
//      opaque: true,
//      vScrollBarEnabled: false
//  });
//}

function ensure() {
	api.showProgress({
		title : '正在登录...',
		modal : false
	});
	var email = $api.byId('tel').value;
	var pwd = $api.byId('password').value;

	var loginUlr = '/user/login';
	var bodyParam = {
		email : email,
		password : pwd
	}
	ajaxRequest(loginUlr, 'post', JSON.stringify(bodyParam), function(ret, err) {
		if (ret) {
			$api.setStorage('islogin', 1);
			$api.setStorage('uid', ret.userId);
			$api.setStorage('token', ret.id);
			setTimeout(function() {
				api.closeWin();
			}, 100);
			//			var request = '/user/userId'
			//			var bodyP = {userId:usrId}
			var userId = ret.userId;
			api.alert({
				msg : "登录成功"
			}, function(ret, err) {
				api.sendEvent({
					name : 'reg_login_successEvent',
					extra : {
						key : true
					}
				});
				// 回到首页
				api.closeToWin({
					name : 'root'
				});
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
