var db = null;
apiready = function() {
	localDatabase();
}
function localDatabase() {
	db = api.require('db');
	db.openDatabase({
		name : 'ordertable'
	}, function(ret, err) {
		if (ret.status) {
			api.alert({
				msg : "数据库创建成功或打开成功"
			});
			db.executeSql({
				name : 'ordertable',
				sql : 'create table if not exists orderform (userid text,VG_name varchar(255), VG_price varchar(255),VG_amount double,amountMoney double)'
			}, function(ret, err) {
			});
		} else {
			alert(JSON.stringify(err)+"失败");
		}

	});
}

function VGdata(i,name, price, amount, money) {
//	db.openDatabase({
//		name : 'ordertable'
//	}, function(ret, err) {
//		if (ret) {
			//var sql = "INSERT INTO orderform(VG_name,VG_price,VG_amount,amountMoney) VALUES (name,price,amount,money)"
			db.executeSql({
				name : 'ordertable',
				sql :  "insert into orderform(VG_name,VG_price,VG_amount,amountMoney) values('name','" + price + "','" + amount + "','" + money + "');"
			}, function(ret, err) {
				if (ret) {
					api.alert({
						msg : "本地数据插入成功"
					});
				} else {
					alert(JSON.stringify(err)+"失败");
				}
			});
//		} else {
//			api.alert({
//				msg : "本地数据库打开失败"
//			});
//		}
//	});

}