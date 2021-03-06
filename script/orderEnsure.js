Date.prototype.Format = function(fmt) {//author: meizz
	var o = {
		"M+" : this.getMonth() + 1, //月份
		"d+" : this.getDate(), //日
		"h+" : this.getHours(), //小时
		"m+" : this.getMinutes(), //分
		"s+" : this.getSeconds(), //秒
		"q+" : Math.floor((this.getMonth() + 3) / 3), //季度
		"S" : this.getMilliseconds() //毫秒
	};
	if (/(y+)/.test(fmt))
		fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
	for (var k in o)
	if (new RegExp("(" + k + ")").test(fmt))
		fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
	return fmt;
}
var query;
var model;
function openoder() {
	query = api.require('query');
	model = api.require('model');
	var orderid = $api.getStorage('orderid');

	model.config({
		appKey : '7810E5E4-7F54-E1E6-B07F-9ADA6FA49D46',
		host : 'https://d.apicloud.com'
	});
	var username = $api.getStorage('username');
	var userid = $api.getStorage('uid');
	if (userid == null) {
		api.alert({
			msg : "亲，你要先登录哦~"
		}, function(ret, err) {
			if (ret) {
				api.closeToWin({
					name : 'root'
				});
			}
		});
		return;
	}
	if (orderid == null) {
		api.alert({
			msg : "亲，请给我个地址~"
		}, function(ret, err) {

		});
		return;
	}
	api.showProgress({
		title : '正在下单...',
		modal : false
	});
	var url = '/orderform';
	var order = {};
	var length = $api.getStorage('jArray');
	var classpic = $api.getStorage('classpic');
	var classname = $api.getStorage('classname');
	var j = 0;
	for (var i = 0; i <= length; i++) {
		var singleorder = $api.getStorage('orderData' + '[' + i + ']');
		singleorder = JSON.parse(singleorder);
		if (singleorder.amount == 0) {
			continue;
		}
		order[j] = singleorder;
		j += 1;

	}

	//获取地址
	var lon;
	var lat;

	var getUserById = '/userAddress/' + orderid;
	var bodyParam = {
		id : orderid
	}
	ajaxRequest(getUserById, 'get', JSON.stringify(bodyParam), function(ret, err) {
		if (ret) {
			if (ret.lon == null || ret.lat == null) {
				api.alert({
					msg : "没有相关地址，请在设置中设置收货地址"
				}, function(ret, err) {
					//coding...
				});
				api.hideProgress();
				return
			}
			lon = ret.lon;
			lat = ret.lat;
			var usertel = ret.tel;

			var time = new Date().Format("yyyy-MM-dd hh:mm:ss");
			var totalcash = $api.getStorage('totalcash');
			var orderRequest = $api.getStorage('orderRequest');
			var weight = 0;
			for (var pop in order) {
				weight = weight + order[pop].amount;
			}

			var bodyParam = {
				username : username,
				money : totalcash,
				order : order,
				lon : lon,
				lat : lat,
				userid : JSON.stringify(userid),
				classpic : classpic,
				classname : classname,
				creatTime : time,
				rec : false,
				orderRequest : orderRequest,
				usertel : usertel,
				weight : weight
			}

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

		} else {
			api.toast({
				msg : err.msg
			})
		}
	})
}
