function openoder() {

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
	});
}