function delWord(el) {
	var input = $api.prev(el, '.txt');
	input.value = '';
}

function ensure() {

	var email = $api.byId('email').value;
	var pwd = $api.byId('password').value;
	if (email.length == 0) {
		api.alert({
			msg : "手机号不能为空"
		});
		return
	} else if (pwd.length == 0) {
		api.alert({
			msg : "密码不能为空"
		});
		return
	}
	api.showProgress({
		title : '正在登录...',
		modal : false
	});
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
			var userId = ret.userId;
			var model = api.require('model');
			var query = api.require('query');
			model.config({
				appKey : '7810E5E4-7F54-E1E6-B07F-9ADA6FA49D46'
			});
			model.findById({
				class : 'user',
				id : userId
			}, function(ret, err) {
				//coding...
				if (ret) {
					$api.setStorage('username', ret.username);
					$api.setStorage('usertel', ret.tel);
					$api.setStorage('email', ret.email);
				}
				else
				{
					api.alert({
                    msg:JSON.stringify(err)
                    },function(ret,err){
                    	//coding...
                    });
				}
			});

			setTimeout(function() {
				api.closeWin();
			}, 100);
			api.sendEvent({
				name : 'reg_login_successEvent',
				extra : {
					key : true
				}
			});

			api.alert({
				msg : "登录成功"
			}, function(ret, err) {

				// 回到首页
				api.closeToWin({
					name : 'root'
				});
			});
		} else {
			api.alert({
				msg : "邮箱或密码错误"
			});
		}
		api.hideProgress();
	})
}

apiready = function() {
	var header = $api.byId('header');
	$api.fixIos7Bar(header);
};
