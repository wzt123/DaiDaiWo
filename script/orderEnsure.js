function openoder() { 
	var username = $api.getStorage('username');
	var userid = $api.getStorage('uid');
	if (username == null) {
		api.alert({
			msg : "亲，找人帮忙要先告诉别人你的名字哦"
		}, function(ret, err) {
			if (ret) {
				api.closeToWin({
					name : 'root'
				});
			}
		});
		return;
	}
	var url = '/orderform';
	var order = {};
	var length = $api.getStorage('jArray');
	var classpic = $api.getStorage('classpic');
	for (var i = 0; i < length; i++) {
		var singleorder = $api.getStorage('orderData' + '[' + i + ']');
		singleorder = JSON.parse(singleorder);
		if (singleorder.amount == 0) {
			continue;
		}
		order[i] = singleorder;
		//		api.alert({
		//		msg:"名字："+ order[i].name+"，单价："+order[i].price+"，重量："+order[i].amount+"，金钱："+order[i].money
		//      });
	}
	var location = $api.getStorage('location');
	var totalcash = $api.getStorage('totalcash');
	var bodyParam = {
		username : username,
		money : totalcash,
		order : order,
		location : location,
		userid:userid,
		classpic:classpic
	}
api.showProgress({
		title : '正在下单...',
		modal : false
	});
	ajaxRequest(url, 'post', JSON.stringify(bodyParam), function(ret, err) {
		if (ret) {
			api.alert({
				msg : '下单成功！'
			}, function() {
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
	});
}