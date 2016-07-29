function openoder() {
	var url = '/orderform';
	var order = {};
	var DateOption;
	for (var i = Year; i < Year + 12; i++) {
		var singeorder = $api.getStorage('orderData' + '[' + j + ']');
		
		alert(DateOption.Year)
		order[i] = DateOption;
	}
	var username = $api.getStorage('username');
	var location = $api.getStorage('location');
	var totalcash = $api.getStorage('totalcash');
	var bodyParam = {
	username:username,
	money:totalcash,
//	order:ddd
	location:location,
}

ajaxRequest(url, 'post', JSON.stringify(bodyParam), function(ret, err) {
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